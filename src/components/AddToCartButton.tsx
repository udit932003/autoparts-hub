"use client";

import { useState } from "react";
import { ShoppingCart, Check, Minus, Plus } from "lucide-react";
import { useCart, CartItem } from "@/lib/cart";

type Props = {
  product: Omit<CartItem, "quantity">;
  showQuantity?: boolean;
};

export default function AddToCartButton({ product, showQuantity = false }: Props) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const disabled = product.stock === 0;

  function handleAdd() {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {showQuantity && !disabled && (
        <div className="flex items-center rounded-lg border border-slate-300">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-3 py-2.5 text-slate-600 hover:bg-slate-50"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="w-10 text-center text-sm font-semibold">{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
            className="px-3 py-2.5 text-slate-600 hover:bg-slate-50"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>
      )}
      <button
        onClick={handleAdd}
        disabled={disabled}
        className="btn-primary flex-1 sm:flex-none"
      >
        {added ? (
          <>
            <Check size={18} /> Added!
          </>
        ) : (
          <>
            <ShoppingCart size={18} />
            {disabled ? "Out of stock" : "Add to cart"}
          </>
        )}
      </button>
    </div>
  );
}
