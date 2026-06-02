import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

type Props = {
  product: {
    slug: string;
    name: string;
    brand: string;
    price: number;
    stock: number;
    image: string;
  };
};

export default function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="card group relative overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.stock === 0 ? (
          <span className="absolute left-2 top-2 rounded-full bg-red-600 px-2.5 py-0.5 text-xs font-semibold text-white">
            Out of stock
          </span>
        ) : product.stock <= 10 ? (
          <span className="absolute left-2 top-2 rounded-full bg-amber-500 px-2.5 py-0.5 text-xs font-semibold text-white">
            Only {product.stock} left
          </span>
        ) : null}

        {/* hover overlay */}
        <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/40 to-transparent p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 shadow">
            View <ArrowUpRight size={14} />
          </span>
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
          {product.brand}
        </p>
        <h3 className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-slate-800 group-hover:text-brand-700">
          {product.name}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg font-extrabold text-slate-900">{formatPrice(product.price)}</p>
          {product.stock > 0 && (
            <span className="text-xs font-medium text-green-600">In stock</span>
          )}
        </div>
      </div>
    </Link>
  );
}
