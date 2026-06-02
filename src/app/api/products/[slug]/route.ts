import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/products/:slug  — single product + related items
export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { category: { select: { name: true, slug: true } } },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const related = await prisma.product.findMany({
    where: { categoryId: product.categoryId, NOT: { id: product.id } },
    take: 6,
    include: { category: { select: { name: true, slug: true } } },
  });

  return NextResponse.json({ product, related });
}
