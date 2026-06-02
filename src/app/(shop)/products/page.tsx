import Link from "next/link";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

type SearchParams = {
  q?: string;
  category?: string;
  sort?: string;
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { q, category, sort } = searchParams;

  const where: Prisma.ProductWhereInput = {};
  if (category) where.category = { slug: category };
  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { brand: { contains: q, mode: "insensitive" } },
      { partNumber: { contains: q, mode: "insensitive" } },
    ];
  }

  const orderBy: Prisma.ProductOrderByWithRelationInput =
    sort === "price-asc"
      ? { price: "asc" }
      : sort === "price-desc"
        ? { price: "desc" }
        : { createdAt: "desc" };

  const [products, categories] = await Promise.all([
    prisma.product.findMany({ where, orderBy }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  const activeCategory = categories.find((c) => c.slug === category);

  function buildQuery(overrides: Partial<SearchParams>) {
    const merged = { ...searchParams, ...overrides };
    const params = new URLSearchParams();
    Object.entries(merged).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    const s = params.toString();
    return s ? `/products?${s}` : "/products";
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900">
        {activeCategory ? activeCategory.name : q ? `Results for "${q}"` : "All Parts"}
      </h1>
      <p className="mt-1 text-sm text-slate-500">{products.length} products found</p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[220px_1fr]">
        {/* Sidebar filters */}
        <aside className="space-y-6">
          <div>
            <h3 className="mb-2 text-sm font-semibold text-slate-900">Categories</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link
                  href={buildQuery({ category: undefined })}
                  className={`block rounded px-2 py-1.5 ${!category ? "bg-brand-50 font-semibold text-brand-700" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  All categories
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    href={buildQuery({ category: c.slug })}
                    className={`block rounded px-2 py-1.5 ${category === c.slug ? "bg-brand-50 font-semibold text-brand-700" : "text-slate-600 hover:bg-slate-100"}`}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold text-slate-900">Sort by</h3>
            <ul className="space-y-1 text-sm">
              {[
                { key: "newest", label: "Newest" },
                { key: "price-asc", label: "Price: Low to High" },
                { key: "price-desc", label: "Price: High to Low" },
              ].map((s) => (
                <li key={s.key}>
                  <Link
                    href={buildQuery({ sort: s.key })}
                    className={`block rounded px-2 py-1.5 ${(sort ?? "newest") === s.key ? "bg-brand-50 font-semibold text-brand-700" : "text-slate-600 hover:bg-slate-100"}`}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Grid */}
        <div>
          {products.length === 0 ? (
            <div className="card grid place-items-center p-16 text-center">
              <p className="text-lg font-semibold text-slate-700">No products found</p>
              <p className="mt-1 text-sm text-slate-500">Try a different search or category.</p>
              <Link href="/products" className="btn-primary mt-4">
                View all products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
