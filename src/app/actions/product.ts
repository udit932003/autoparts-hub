"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";
import { productSchema } from "@/lib/validators";

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export type ActionResult = { ok: boolean; error?: string };

function parseForm(formData: FormData) {
  return productSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    brand: formData.get("brand"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    image: formData.get("image"),
    partNumber: formData.get("partNumber") || undefined,
    featured: formData.get("featured") === "on",
    categoryId: formData.get("categoryId"),
  });
}

export async function createProduct(formData: FormData): Promise<ActionResult> {
  if (!isAuthenticated()) return { ok: false, error: "Unauthorized" };
  const parsed = parseForm(formData);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };

  try {
    await prisma.product.create({
      data: {
        ...parsed.data,
        partNumber: parsed.data.partNumber ?? null,
        featured: parsed.data.featured ?? false,
        slug: slugify(parsed.data.name) + "-" + Date.now().toString().slice(-4),
      },
    });
  } catch (e) {
    console.error(e);
    return { ok: false, error: "Failed to create product" };
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  return { ok: true };
}

export async function updateProduct(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  if (!isAuthenticated()) return { ok: false, error: "Unauthorized" };
  const parsed = parseForm(formData);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };

  try {
    await prisma.product.update({
      where: { id },
      data: {
        ...parsed.data,
        partNumber: parsed.data.partNumber ?? null,
        featured: parsed.data.featured ?? false,
      },
    });
  } catch (e) {
    console.error(e);
    return { ok: false, error: "Failed to update product" };
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  return { ok: true };
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  if (!isAuthenticated()) return { ok: false, error: "Unauthorized" };
  try {
    await prisma.product.delete({ where: { id } });
  } catch (e) {
    console.error(e);
    return { ok: false, error: "Failed to delete product (it may have orders)" };
  }
  revalidatePath("/admin/products");
  revalidatePath("/products");
  return { ok: true };
}

export async function updateOrderStatus(
  id: string,
  status: string
): Promise<ActionResult> {
  if (!isAuthenticated()) return { ok: false, error: "Unauthorized" };
  const allowed = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];
  if (!allowed.includes(status)) return { ok: false, error: "Invalid status" };

  try {
    await prisma.order.update({
      where: { id },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: { status: status as any },
    });
  } catch (e) {
    console.error(e);
    return { ok: false, error: "Failed to update status" };
  }
  revalidatePath("/admin/orders");
  return { ok: true };
}
