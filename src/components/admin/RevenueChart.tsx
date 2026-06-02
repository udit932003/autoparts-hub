"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Point = { label: string; revenue: number };

export default function RevenueChart({ data }: { data: Point[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ea580c" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#ea580c" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
        <Tooltip
          formatter={(v: number) => [`₹${v.toLocaleString("en-IN")}`, "Revenue"]}
          contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 13 }}
        />
        <Area type="monotone" dataKey="revenue" stroke="#ea580c" strokeWidth={2} fill="url(#rev)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
