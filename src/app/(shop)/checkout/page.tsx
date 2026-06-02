"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, Lock } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { placeOrder } from "@/app/actions/order";

export default function CheckoutPage() {
  const { items, totalPrice, clear } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    address: "",
    city: "",
  });

  const shipping = totalPrice >= 2000 ? 0 : 199;

  if (items.length === 0 && !loading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Your cart is empty</h1>
        <button onClick={() => router.push("/products")} className="btn-primary mt-6">
          Browse products
        </button>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await placeOrder(
      form,
      items.map((i) => ({ id: i.id, quantity: i.quantity }))
    );
    if (result.ok) {
      clear();
      router.push(`/order/${result.orderNumber}`);
    } else {
      setError(result.error);
      setLoading(false);
    }
  }

  function update(k: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900">Checkout</h1>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="card space-y-4 p-6">
          <h2 className="text-lg font-semibold text-slate-900">Shipping details</h2>
          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          )}
          <div>
            <label className="label">Full name</label>
            <input className="input" required value={form.customerName} onChange={update("customerName")} placeholder="Rahul Sharma" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Email</label>
              <input className="input" type="email" required value={form.customerEmail} onChange={update("customerEmail")} placeholder="you@example.com" />
            </div>
            <div>
              <label className="label">Phone</label>
              <input className="input" required value={form.customerPhone} onChange={update("customerPhone")} placeholder="9876543210" />
            </div>
          </div>
          <div>
            <label className="label">Address</label>
            <input className="input" required value={form.address} onChange={update("address")} placeholder="House no, street, area" />
          </div>
          <div>
            <label className="label">City</label>
            <input className="input" required value={form.city} onChange={update("city")} placeholder="Pune" />
          </div>
          <p className="flex items-center gap-1.5 text-xs text-slate-500">
            <Lock size={14} /> This is a demo — no real payment is processed.
          </p>
        </div>

        {/* Summary */}
        <div className="card h-fit p-6">
          <h2 className="text-lg font-bold text-slate-900">Your order</h2>
          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded bg-slate-100">
                  <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-800">{item.name}</p>
                  <p className="text-xs text-slate-500">Qty {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
          <dl className="mt-4 space-y-2 border-t border-slate-200 pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Subtotal</dt>
              <dd>{formatPrice(totalPrice)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Shipping</dt>
              <dd>{shipping === 0 ? "FREE" : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-bold">
              <dt>Total</dt>
              <dd>{formatPrice(totalPrice + shipping)}</dd>
            </div>
          </dl>
          <button type="submit" disabled={loading} className="btn-primary mt-6 w-full">
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Placing order...
              </>
            ) : (
              `Place order — ${formatPrice(totalPrice + shipping)}`
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
