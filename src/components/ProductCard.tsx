import Link from "next/link";
import Image from "next/image";
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
      className="card group overflow-hidden transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.stock === 0 && (
          <span className="absolute left-2 top-2 rounded bg-red-600 px-2 py-0.5 text-xs font-semibold text-white">
            Out of stock
          </span>
        )}
        {product.stock > 0 && product.stock <= 10 && (
          <span className="absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-xs font-semibold text-white">
            Only {product.stock} left
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-brand-600">
          {product.brand}
        </p>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-slate-800 group-hover:text-brand-700">
          {product.name}
        </h3>
        <p className="mt-2 text-lg font-bold text-slate-900">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
