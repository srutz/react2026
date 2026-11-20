import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { Product } from "@/data/producttype"
import {
  ProductGallery,
  ProductPrice,
  ProductRating,
  ProductReviews,
  ProductSpecs,
  ProductStock,
  ProductTags,
} from "./products"

export function ProductDisplay({
  product,
  onAddToCart,
}: {
  product: Product
  onAddToCart?: (product: Product) => void
}) {
  const images = product.images.length ? product.images : [product.thumbnail]

  return (
    <article className="mx-auto grid w-full max-w-5xl gap-8 rounded-2xl bg-card p-6 text-card-foreground shadow-sm ring-1 ring-foreground/10 md:grid-cols-2">
      <ProductGallery images={images} title={product.title} />

      <div className="flex flex-col gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">
            {product.brand ?? product.category}
          </div>
          <h1 className="mt-1 text-2xl font-bold leading-tight">{product.title}</h1>
          <div className="mt-2">
            <ProductRating rating={product.rating} count={product.reviews.length} />
          </div>
        </div>

        <ProductPrice price={product.price} discountPercentage={product.discountPercentage} />
        <ProductStock status={product.availabilityStatus} stock={product.stock} />
        <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
        <ProductTags tags={product.tags} />

        <Button
          size="lg"
          disabled={product.availabilityStatus === "Out of Stock"}
          onClick={() => onAddToCart?.(product)}
        >
          <ShoppingCart /> Add to cart
        </Button>

        <Separator />
        <ProductSpecs product={product} />
      </div>

      <section className="flex flex-col gap-3 md:col-span-2">
        <h2 className="text-lg font-semibold">Customer reviews</h2>
        <ProductReviews reviews={product.reviews} />
      </section>
    </article>
  )
}
