import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// GET /api/products?q=brake&category=brakes&featured=true
// Public read API consumed by the AutoParts mobile app.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? undefined;
  const category = searchParams.get("category") ?? undefined;
  const featured = searchParams.get("featured");

  const where: Prisma.ProductWhereInput = {};
  if (category) where.category = { slug: category };
  if (featured === "true") where.featured = true;
  if (q) {
    where.OR = [
      { name: { contains: q } },
      { brand: { contains: q } },
      { partNumber: { contains: q } },
    ];
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { category: { select: { name: true, slug: true } } },
  });

  return NextResponse.json({ products });
}
