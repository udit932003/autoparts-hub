import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id: params.id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!product) notFound();

  return (
    <div>
      <Link href="/admin/products" className="mb-4 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-brand-600">
        <ArrowLeft size={16} /> Back to products
      </Link>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Edit product</h1>
      <ProductForm categories={categories} product={product} />
    </div>
  );
}
