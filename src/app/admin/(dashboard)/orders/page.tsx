import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";
import StatusSelect from "@/components/admin/StatusSelect";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
      <p className="mt-1 text-sm text-slate-500">{orders.length} total orders</p>

      <div className="card mt-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
              <tr>
                <th className="px-6 py-3 font-medium">Order</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Items</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Total</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400">No orders yet</td></tr>
              )}
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-mono text-xs">{o.orderNumber}</td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-800">{o.customerName}</p>
                    <p className="text-xs text-slate-400">{o.city}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {o.items.reduce((s, i) => s + i.quantity, 0)} items
                  </td>
                  <td className="px-6 py-4 text-slate-500">{formatDate(o.createdAt)}</td>
                  <td className="px-6 py-4 font-semibold">{formatPrice(o.total)}</td>
                  <td className="px-6 py-4">
                    <StatusSelect orderId={o.id} current={o.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
