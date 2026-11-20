import { cn } from "cn"
import type { AvailabilityStatus } from "@/data/producttype"

const styles: Record<AvailabilityStatus, string> = {
  "In Stock": "bg-emerald-500/10 text-emerald-600",
  "Low Stock": "bg-amber-500/10 text-amber-600",
  "Out of Stock": "bg-red-500/10 text-red-600",
}

export function ProductStock({ status, stock }: { status: AvailabilityStatus; stock: number }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium", styles[status])}>
      <span className="size-1.5 rounded-full bg-current" />
      {status}
      {status !== "Out of Stock" && <span className="opacity-70">· {stock} left</span>}
    </span>
  )
}
