import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Truck, ShieldCheck, Headphones, Tag } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import CarScene from "@/components/CarScene";
import ScrollReveal from "@/components/ScrollReveal";

const DEMO_VIDEO =
  "https://upload.wikimedia.org/wikipedia/commons/8/8e/FSR_Tarpan_239_D_van_%28driving%29.webm";

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
      <section className="hero-glow bg-slate-900 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-600/20 px-3 py-1 text-sm font-medium text-brand-300">
              <span className="live-dot inline-block h-2 w-2 rounded-full bg-green-400" />
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
          <div className="float-soft hidden md:block">
            <CarScene />
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

      {/* Demo video */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <ScrollReveal className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-400">
              See it in action
            </span>
            <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
              Built for every drive
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
              Quality parts that keep your car running smooth — from city streets to the open road.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={120} className="mt-8">
            <div className="glow-hover mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <video
                className="aspect-video w-full object-cover"
                src={DEMO_VIDEO}
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-slate-900">Shop by category</h2>
        </ScrollReveal>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((c, i) => (
            <ScrollReveal key={c.id} delay={i * 60}>
              <Link
                href={`/products?category=${c.slug}`}
                className="card group glow-hover block overflow-hidden text-center"
              >
                <div className="shine relative aspect-square overflow-hidden bg-slate-100">
                  {c.image && (
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 16vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  )}
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-slate-800">{c.name}</p>
                  <p className="text-xs text-slate-500">{c._count.products} items</p>
                </div>
              </Link>
            </ScrollReveal>
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
          {featured.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 60}>
              <ProductCard product={p} />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
