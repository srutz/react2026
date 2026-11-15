import { z } from "zod";

export const ProductDimensionsSchema = z.object({
  width: z.number(),
  height: z.number(),
  depth: z.number(),
});

export const ProductReviewSchema = z.object({
  rating: z.number(),
  comment: z.string(),
  date: z.string(),
  reviewerName: z.string(),
  reviewerEmail: z.string(),
});

export const ProductMetaSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
  barcode: z.string(),
  qrCode: z.string(),
});

export const AvailabilityStatusSchema = z.enum([
  "In Stock",
  "Low Stock",
  "Out of Stock",
]);

export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  tags: z.array(z.string()),
  brand: z.string().optional(),
  sku: z.string(),
  weight: z.number(),
  dimensions: ProductDimensionsSchema,
  warrantyInformation: z.string(),
  shippingInformation: z.string(),
  availabilityStatus: AvailabilityStatusSchema,
  reviews: z.array(ProductReviewSchema),
  returnPolicy: z.string(),
  minimumOrderQuantity: z.number(),
  meta: ProductMetaSchema,
  images: z.array(z.string()),
  thumbnail: z.string(),
});

export const ProductsSchema = z.array(ProductSchema);

export type Product = z.infer<typeof ProductSchema>;
