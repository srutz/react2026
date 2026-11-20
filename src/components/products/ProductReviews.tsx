import type { ProductReview } from "@/data/producttype"
import { ProductRating } from "./ProductRating"

export function ProductReviews({ reviews }: { reviews: ProductReview[] }) {
  if (reviews.length === 0) return <p className="text-sm text-muted-foreground">No reviews yet.</p>

  return (
    <ul className="flex flex-col gap-3">
      {reviews.map((r) => (
        <li key={`${r.reviewerEmail}-${r.date}`} className="rounded-lg border p-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium">{r.reviewerName}</span>
            <span className="text-xs text-muted-foreground">
              {new Date(r.date).toLocaleDateString()}
            </span>
          </div>
          <ProductRating rating={r.rating} />
          <p className="mt-1 text-sm text-muted-foreground">{r.comment}</p>
        </li>
      ))}
    </ul>
  )
}
