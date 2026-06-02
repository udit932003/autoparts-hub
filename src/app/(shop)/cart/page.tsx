"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, setQuantity, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-slate-100 text-slate-400">
          <ShoppingBag size={36} />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-slate-900">Your cart is empty</h1>
        <p className="mt-2 text-slate-500">Looks like you haven&apos;t added any parts yet.</p>
        <Link href="/products" className="btn-primary mt-6">
          Start shopping <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  const shipping = totalPrice >= 2000 ? 0 : 199;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900">Shopping Cart</h1>
      <p className="mt-1 text-sm text-slate-500">{totalItems} item(s)</p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="card flex gap-4 p-4">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col">
                <Link href="/cart" className="font-semibold text-slate-800">{item.name}</Link>
                <p className="mt-1 text-sm text-slate-500">{formatPrice(item.price)} each</p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-slate-300">
                    <button onClick={() => setQuantity(item.id, item.quantity - 1)} className="px-2.5 py-1.5 text-slate-600 hover:bg-slate-50" aria-label="Decrease">
                      <Minus size={14} />
                    </button>
                    <span className="w-9 text-center text-sm font-semibold">{item.quantity}</span>
                    <button onClick={() => setQuantity(item.id, item.quantity + 1)} className="px-2.5 py-1.5 text-slate-600 hover:bg-slate-50" aria-label="Increase">
                      <Plus size={14} />
                    </button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700">
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </div>
              <div className="text-right font-bold text-slate-900">
                {formatPrice(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="card h-fit p-6">
          <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Subtotal</dt>
              <dd className="font-medium">{formatPrice(totalPrice)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Shipping</dt>
              <dd className="font-medium">{shipping === 0 ? "FREE" : formatPrice(shipping)}</dd>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-amber-600">
                Add {formatPrice(2000 - totalPrice)} more for free shipping
              </p>
            )}
            <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-bold">
              <dt>Total</dt>
              <dd>{formatPrice(totalPrice + shipping)}</dd>
            </div>
          </dl>
          <Link href="/checkout" className="btn-primary mt-6 w-full">
            Proceed to checkout <ArrowRight size={18} />
          </Link>
          <Link href="/products" className="btn-ghost mt-2 w-full">
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
