"use client";

import { useTransition } from "react";
import { updateOrderStatus } from "@/app/actions/product";
import { STATUS_COLORS } from "@/lib/utils";

const STATUSES = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

export default function StatusSelect({
  orderId,
  current,
}: {
  orderId: string;
  current: string;
}) {
  const [pending, startTransition] = useTransition();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const status = e.target.value;
    startTransition(() => {
      updateOrderStatus(orderId, status);
    });
  }

  return (
    <select
      defaultValue={current}
      onChange={onChange}
      disabled={pending}
      className={`cursor-pointer rounded-full border-0 px-2.5 py-1 text-xs font-semibold outline-none ring-1 ring-inset ring-slate-200 ${STATUS_COLORS[current]} ${pending ? "opacity-50" : ""}`}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}
