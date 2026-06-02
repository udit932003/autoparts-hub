import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Package, ShieldCheck, Truck } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "@/components/AddToCartButton";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });

  if (!product) notFound();

  const related = await prisma.product.findMany({
    where: { categoryId: product.categoryId, NOT: { id: product.id } },
    take: 4,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-slate-500">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <ChevronRight size={14} />
        <Link href={`/products?category=${product.category.slug}`} className="hover:text-brand-600">
          {product.category.name}
        </Link>
        <ChevronRight size={14} />
        <span className="text-slate-700">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-brand-600">
            {product.brand}
          </p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">{product.name}</h1>
          {product.partNumber && (
            <p className="mt-2 text-sm text-slate-500">
              Part No: <span className="font-mono">{product.partNumber}</span>
            </p>
          )}

          <p className="mt-4 text-3xl font-extrabold text-slate-900">
            {formatPrice(product.price)}
          </p>
          <p className="mt-1 text-sm">
            {product.stock > 0 ? (
              <span className="font-medium text-green-600">● In stock ({product.stock} available)</span>
            ) : (
              <span className="font-medium text-red-600">● Out of stock</span>
            )}
          </p>

          <p className="mt-5 leading-relaxed text-slate-600">{product.description}</p>

          <div className="mt-6">
            <AddToCartButton
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                stock: product.stock,
              }}
              showQuantity
            />
          </div>

          <div className="mt-8 grid gap-3 border-t border-slate-200 pt-6 text-sm text-slate-600">
            <div className="flex items-center gap-2"><Truck size={18} className="text-brand-600" /> Free delivery on orders over ₹2000</div>
            <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-brand-600" /> 100% genuine — manufacturer warranty</div>
            <div className="flex items-center gap-2"><Package size={18} className="text-brand-600" /> Easy 7-day returns</div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold text-slate-900">Related parts</h2>
          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
