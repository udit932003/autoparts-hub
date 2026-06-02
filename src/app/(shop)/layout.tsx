import { Suspense } from "react";
import { CartProvider } from "@/lib/cart";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <Suspense fallback={<div className="h-16 border-b border-slate-200 bg-white" />}>
          <Navbar />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </CartProvider>
  );
}
