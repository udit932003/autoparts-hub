import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  description: z.string().min(10, "Description is too short"),
  brand: z.string().min(1, "Brand is required"),
  price: z.coerce.number().positive("Price must be positive"),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  image: z.string().url("Must be a valid image URL"),
  partNumber: z.string().optional(),
  featured: z.coerce.boolean().optional(),
  categoryId: z.string().min(1, "Category is required"),
});

export const checkoutSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  customerEmail: z.string().email("Valid email required"),
  customerPhone: z.string().min(8, "Valid phone required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
});

export type ProductInput = z.infer<typeof productSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
