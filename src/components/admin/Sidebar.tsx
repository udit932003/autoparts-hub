"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Wrench, LogOut, Store, MessageSquare } from "lucide-react";
import { logout } from "@/app/actions/auth";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/leads", label: "Leads", icon: MessageSquare },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-slate-800 bg-slate-900 text-slate-300">
      <div className="flex items-center gap-2 border-b border-slate-800 px-5 py-4 font-extrabold text-white">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600">
          <Wrench size={18} />
        </span>
        <span>AutoParts<span className="text-brand-500">Hub</span></span>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {links.map((l) => {
          const active = l.href === "/admin" ? pathname === "/admin" : pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-brand-600 text-white" : "hover:bg-slate-800 hover:text-white"
              )}
            >
              <l.icon size={18} />
              {l.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-slate-800 p-3">
        <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-slate-800 hover:text-white">
          <Store size={18} /> View store
        </Link>
        <form action={logout}>
          <button type="submit" className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-slate-800">
            <LogOut size={18} /> Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
