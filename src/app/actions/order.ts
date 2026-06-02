"use server";

import { prisma } from "@/lib/prisma";
import { checkoutSchema } from "@/lib/validators";
import { generateOrderNumber } from "@/lib/utils";

export type PlaceOrderResult =
  | { ok: true; orderNumber: string }
  | { ok: false; error: string };

type IncomingItem = { id: string; quantity: number };

export async function placeOrder(
  customer: unknown,
  items: IncomingItem[]
): Promise<PlaceOrderResult> {
  const parsed = checkoutSchema.safeParse(customer);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message };
  }
  if (!items || items.length === 0) {
    return { ok: false, error: "Your cart is empty" };
  }

  // Re-fetch products server-side so prices/stock can't be tampered with
  const productIds = items.map((i) => i.id);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });

  const orderItems: { productId: string; name: string; price: number; quantity: number }[] = [];
  for (const item of items) {
    const product = products.find((p) => p.id === item.id);
    if (!product) return { ok: false, error: "A product is no longer available" };
    if (item.quantity < 1) return { ok: false, error: "Invalid quantity" };
    if (product.stock < item.quantity) {
      return { ok: false, error: `Only ${product.stock} of "${product.name}" in stock` };
    }
    orderItems.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
    });
  }

  const total = orderItems.reduce((s, i) => s + i.price * i.quantity, 0);

  try {
    const order = await prisma.$transaction(async (tx) => {
      const created = await tx.order.create({
        data: {
          orderNumber: generateOrderNumber(),
          ...parsed.data,
          total,
          items: { create: orderItems },
        },
      });
      // Decrement stock
      for (const item of orderItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }
      return created;
    });

    return { ok: true, orderNumber: order.orderNumber };
  } catch (e) {
    console.error("placeOrder failed:", e);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}
