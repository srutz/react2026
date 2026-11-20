import { Package, RotateCcw, ShieldCheck, Truck } from "lucide-react"
import type { ReactNode } from "react"
import type { Product } from "@/data/producttype"

function Spec({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
      <div className="mt-0.5 text-primary [&>svg]:size-4">{icon}</div>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </div>
  )
}

export function ProductSpecs({ product }: { product: Product }) {
  const { dimensions: d } = product
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <Spec icon={<Truck />} label="Shipping" value={product.shippingInformation} />
      <Spec icon={<ShieldCheck />} label="Warranty" value={product.warrantyInformation} />
      <Spec icon={<RotateCcw />} label="Returns" value={product.returnPolicy} />
      <Spec
        icon={<Package />}
        label="Dimensions / Weight"
        value={`${d.width} × ${d.height} × ${d.depth} cm · ${product.weight} kg`}
      />
    </div>
  )
}
