import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Truck, ShieldCheck, Headphones, Tag } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    prisma.product.findMany({
      where: { featured: true },
      take: 8,
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-block rounded-full bg-brand-600/20 px-3 py-1 text-sm font-medium text-brand-300">
              🚗 100% Genuine Parts
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
              Quality car parts,{" "}
              <span className="text-brand-500">delivered fast.</span>
            </h1>
            <p className="mt-4 max-w-md text-slate-300">
              From brake pads to batteries — find the right part for your car at
              unbeatable prices. Trusted by thousands of mechanics across India.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary">
                Shop all parts <ArrowRight size={18} />
              </Link>
              <Link
                href="/products?category=brakes"
                className="btn border border-white/20 text-white hover:bg-white/10"
              >
                Browse brakes
              </Link>
            </div>
          </div>
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl md:block">
            <Image
              src="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=900&q=80"
              alt="Car engine bay"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 md:grid-cols-4">
          {[
            { icon: Truck, title: "Free shipping", sub: "On orders over ₹2000" },
            { icon: ShieldCheck, title: "Genuine parts", sub: "100% authentic" },
            { icon: Tag, title: "Best prices", sub: "Price match guarantee" },
            { icon: Headphones, title: "Expert support", sub: "7 days a week" },
          ].map((b) => (
            <div key={b.title} className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
                <b.icon size={22} />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">{b.title}</p>
                <p className="text-xs text-slate-500">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-900">Shop by category</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/products?category=${c.slug}`}
              className="card group overflow-hidden text-center"
            >
              <div className="relative aspect-square overflow-hidden bg-slate-100">
                {c.image && (
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 16vw"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-slate-800">{c.name}</p>
                <p className="text-xs text-slate-500">{c._count.products} items</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Featured parts</h2>
          <Link href="/products" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
            View all →
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
