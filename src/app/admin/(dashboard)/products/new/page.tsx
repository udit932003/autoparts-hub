import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <Link href="/admin/products" className="mb-4 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-brand-600">
        <ArrowLeft size={16} /> Back to products
      </Link>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Add new product</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
