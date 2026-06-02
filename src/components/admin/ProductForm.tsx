"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, Upload, Link2 } from "lucide-react";
import { createProduct, updateProduct } from "@/app/actions/product";

type Category = { id: string; name: string };
type Product = {
  id: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  stock: number;
  image: string;
  partNumber: string | null;
  featured: boolean;
  categoryId: string;
};

export default function ProductForm({
  categories,
  product,
}: {
  categories: Category[];
  product?: Product;
}) {
  const router = useRouter();
  const [image, setImage] = useState(product?.image ?? "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setImage(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSaving(true);
    const formData = new FormData(e.currentTarget);
    formData.set("image", image);
    const result = product
      ? await updateProduct(product.id, formData)
      : await createProduct(formData);
    if (result.ok) {
      router.push("/admin/products");
      router.refresh();
    } else {
      setError(result.error || "Failed to save");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="card space-y-4 p-6">
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <div>
          <label className="label">Product name</label>
          <input name="name" required defaultValue={product?.name} className="input" placeholder="Premium Ceramic Brake Pads" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Brand</label>
            <input name="brand" required defaultValue={product?.brand} className="input" placeholder="Brembo" />
          </div>
          <div>
            <label className="label">Part number</label>
            <input name="partNumber" defaultValue={product?.partNumber ?? ""} className="input" placeholder="BRM-P85020" />
          </div>
        </div>

        <div>
          <label className="label">Description</label>
          <textarea name="description" required defaultValue={product?.description} rows={4} className="input resize-none" placeholder="Describe the part, fitment, and benefits..." />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="label">Price (₹)</label>
            <input name="price" type="number" step="0.01" required defaultValue={product?.price} className="input" placeholder="3499" />
          </div>
          <div>
            <label className="label">Stock</label>
            <input name="stock" type="number" required defaultValue={product?.stock ?? 0} className="input" placeholder="50" />
          </div>
          <div>
            <label className="label">Category</label>
            <select name="categoryId" required defaultValue={product?.categoryId ?? ""} className="input">
              <option value="" disabled>Select...</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input name="featured" type="checkbox" defaultChecked={product?.featured} className="h-4 w-4 rounded border-slate-300 text-brand-600" />
          Show on homepage (featured)
        </label>
      </div>

      {/* Image panel */}
      <div className="card h-fit space-y-4 p-6">
        <h3 className="font-semibold text-slate-900">Product image</h3>

        <div className="relative aspect-square overflow-hidden rounded-lg border border-dashed border-slate-300 bg-slate-50">
          {image ? (
            <Image src={image} alt="Preview" fill sizes="320px" className="object-cover" />
          ) : (
            <div className="grid h-full place-items-center text-sm text-slate-400">No image yet</div>
          )}
        </div>

        <label className="btn-outline w-full cursor-pointer">
          {uploading ? <><Loader2 size={16} className="animate-spin" /> Uploading...</> : <><Upload size={16} /> Upload image</>}
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
        </label>

        <div className="relative">
          <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="input pl-9"
            placeholder="...or paste an image URL"
          />
        </div>
        <p className="text-xs text-slate-400">Upload a file or paste any image URL. You can change this anytime.</p>

        <button type="submit" disabled={saving || uploading} className="btn-primary w-full">
          {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : product ? "Update product" : "Create product"}
        </button>
      </div>
    </form>
  );
}
