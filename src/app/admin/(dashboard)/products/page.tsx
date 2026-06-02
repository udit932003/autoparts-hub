import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="mt-1 text-sm text-slate-500">{products.length} products in catalog</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary">
          <Plus size={18} /> Add product
        </Link>
      </div>

      <div className="card mt-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
              <tr>
                <th className="px-6 py-3 font-medium">Product</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Stock</th>
                <th className="px-6 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                        <Image src={p.image} alt={p.name} fill sizes="44px" className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="flex items-center gap-1 font-medium text-slate-800">
                          <span className="truncate">{p.name}</span>
                          {p.featured && <Star size={13} className="shrink-0 fill-amber-400 text-amber-400" />}
                        </p>
                        <p className="text-xs text-slate-400">{p.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-slate-600">{p.category.name}</td>
                  <td className="px-6 py-3 font-semibold">{formatPrice(p.price)}</td>
                  <td className="px-6 py-3">
                    <span className={`rounded px-2 py-0.5 text-xs font-semibold ${p.stock === 0 ? "bg-red-100 text-red-700" : p.stock <= 10 ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/admin/products/${p.id}/edit`} className="text-slate-400 hover:text-brand-600" title="Edit">
                        <Pencil size={16} />
                      </Link>
                      <DeleteProductButton id={p.id} name={p.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
