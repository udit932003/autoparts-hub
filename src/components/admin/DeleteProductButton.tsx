"use client";

import { useState, useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteProduct } from "@/app/actions/product";

export default function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  function handleDelete() {
    startTransition(async () => {
      await deleteProduct(id);
      setConfirming(false);
    });
  }

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-2">
        <button onClick={handleDelete} disabled={pending} className="text-xs font-semibold text-red-600 hover:underline">
          {pending ? <Loader2 size={14} className="animate-spin" /> : "Confirm"}
        </button>
        <button onClick={() => setConfirming(false)} className="text-xs text-slate-500 hover:underline">
          Cancel
        </button>
      </span>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      title={`Delete ${name}`}
      className="text-slate-400 hover:text-red-600"
    >
      <Trash2 size={16} />
    </button>
  );
}
