import Link from "next/link";
import {
  IndianRupee,
  Package,
  ShoppingCart,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate, STATUS_COLORS } from "@/lib/utils";
import RevenueChart from "@/components/admin/RevenueChart";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [orders, productCount, lowStock, recentOrders] = await Promise.all([
    prisma.order.findMany({ select: { total: true, createdAt: true, status: true } }),
    prisma.product.count(),
    prisma.product.findMany({ where: { stock: { lte: 10 } }, orderBy: { stock: "asc" }, take: 5 }),
    prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const totalRevenue = orders
    .filter((o) => o.status !== "CANCELLED")
    .reduce((s, o) => s + o.total, 0);
  const pendingCount = orders.filter((o) => o.status === "PENDING").length;

  // Build last-6-months revenue series
  const now = new Date();
  const months: { label: string; revenue: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = d.toLocaleString("en-IN", { month: "short" });
    const revenue = orders
      .filter((o) => {
        const od = new Date(o.createdAt);
        return od.getFullYear() === d.getFullYear() && od.getMonth() === d.getMonth() && o.status !== "CANCELLED";
      })
      .reduce((s, o) => s + o.total, 0);
    months.push({ label, revenue });
  }

  const stats = [
    { label: "Total Revenue", value: formatPrice(totalRevenue), icon: IndianRupee, tint: "bg-green-50 text-green-600" },
    { label: "Total Orders", value: orders.length.toString(), icon: ShoppingCart, tint: "bg-blue-50 text-blue-600" },
    { label: "Products", value: productCount.toString(), icon: Package, tint: "bg-brand-50 text-brand-600" },
    { label: "Pending Orders", value: pendingCount.toString(), icon: AlertTriangle, tint: "bg-amber-50 text-amber-600" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500">Welcome back — here&apos;s your store at a glance.</p>

      {/* Stat cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card p-5">
            <div className="flex items-center justify-between">
              <span className={`grid h-10 w-10 place-items-center rounded-lg ${s.tint}`}>
                <s.icon size={20} />
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-slate-900">{s.value}</p>
            <p className="text-sm text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Chart */}
        <div className="card p-6">
          <h2 className="font-semibold text-slate-900">Revenue (last 6 months)</h2>
          <div className="mt-4">
            <RevenueChart data={months} />
          </div>
        </div>

        {/* Low stock */}
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Low stock alerts</h2>
            <Link href="/admin/products" className="text-xs font-semibold text-brand-600">Manage →</Link>
          </div>
          <ul className="mt-4 space-y-3">
            {lowStock.length === 0 && <li className="text-sm text-slate-500">All products well stocked 🎉</li>}
            {lowStock.map((p) => (
              <li key={p.id} className="flex items-center justify-between text-sm">
                <span className="truncate pr-2 text-slate-700">{p.name}</span>
                <span className={`shrink-0 rounded px-2 py-0.5 text-xs font-semibold ${p.stock === 0 ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>
                  {p.stock} left
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent orders */}
      <div className="card mt-6 overflow-hidden">
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="font-semibold text-slate-900">Recent orders</h2>
          <Link href="/admin/orders" className="flex items-center gap-1 text-xs font-semibold text-brand-600">
            View all <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
              <tr>
                <th className="px-6 py-3 font-medium">Order</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentOrders.map((o) => (
                <tr key={o.id}>
                  <td className="px-6 py-3 font-mono text-xs">{o.orderNumber}</td>
                  <td className="px-6 py-3 text-slate-700">{o.customerName}</td>
                  <td className="px-6 py-3 text-slate-500">{formatDate(o.createdAt)}</td>
                  <td className="px-6 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_COLORS[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right font-semibold">{formatPrice(o.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
