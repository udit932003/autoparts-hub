"use client";

import Link from "next/link";
import { ShoppingCart, Wrench, Search } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const { totalItems } = useCart();
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/products?q=${encodeURIComponent(q)}`);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-slate-900">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-white">
            <Wrench size={20} />
          </span>
          <span className="text-lg">
           Udit<span className="text-brand-600">Hub</span>
          </span>
        </Link>

        <form onSubmit={onSearch} className="relative hidden flex-1 md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search parts, brands, part numbers..."
            className="input pl-10"
          />
        </form>

        <nav className="ml-auto flex items-center gap-1">
          <Link href="/products" className="btn-ghost hidden sm:inline-flex">
            All Parts
          </Link>
          <Link href="/cart" className="btn-ghost relative">
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-brand-600 text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
