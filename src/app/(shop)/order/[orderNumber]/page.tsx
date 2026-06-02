import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function OrderConfirmationPage({
  params,
}: {
  params: { orderNumber: string };
}) {
  const order = await prisma.order.findUnique({
    where: { orderNumber: params.orderNumber },
    include: { items: true },
  });

  if (!order) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="card p-8 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-100 text-green-600">
          <CheckCircle2 size={36} />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Order confirmed!</h1>
        <p className="mt-1 text-slate-500">
          Thank you, {order.customerName}. We&apos;ve received your order.
        </p>
        <p className="mt-4 inline-block rounded-lg bg-slate-100 px-4 py-2 font-mono text-sm font-semibold text-slate-700">
          {order.orderNumber}
        </p>
      </div>

      <div className="card mt-6 p-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <p className="text-sm text-slate-500">Order date</p>
            <p className="font-medium">{formatDate(order.createdAt)}</p>
          </div>
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
            {order.status}
          </span>
        </div>

        <div className="mt-4 space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-slate-700">
                {item.name} <span className="text-slate-400">× {item.quantity}</span>
              </span>
              <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-between border-t border-slate-200 pt-4 text-lg font-bold">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </div>

        <div className="mt-6 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-800">Shipping to</p>
          <p className="mt-1">{order.customerName}</p>
          <p>{order.address}, {order.city}</p>
          <p>{order.customerPhone}</p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link href="/products" className="btn-primary">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
