"use client";

import { useTransition } from "react";
import { updateEnquiryStatus } from "@/app/actions/enquiry";

const COLORS: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-800",
  CONTACTED: "bg-amber-100 text-amber-800",
  CLOSED: "bg-green-100 text-green-800",
};

export default function LeadStatusSelect({ id, current }: { id: string; current: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <select
      defaultValue={current}
      disabled={pending}
      onChange={(e) => startTransition(() => { updateEnquiryStatus(id, e.target.value); })}
      className={`cursor-pointer rounded-full border-0 px-2.5 py-1 text-xs font-semibold outline-none ring-1 ring-inset ring-slate-200 ${COLORS[current]} ${pending ? "opacity-50" : ""}`}
    >
      <option value="NEW">NEW</option>
      <option value="CONTACTED">CONTACTED</option>
      <option value="CLOSED">CLOSED</option>
    </select>
  );
}
