const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })

export function ProductPrice({ price, discountPercentage }: { price: number; discountPercentage: number }) {
  const discounted = price * (1 - discountPercentage / 100)
  const hasDiscount = discountPercentage > 0

  return (
    <div className="flex items-baseline gap-3">
      <span className="text-3xl font-bold tracking-tight">{fmt.format(discounted)}</span>
      {hasDiscount && (
        <>
          <span className="text-base text-muted-foreground line-through">{fmt.format(price)}</span>
          <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-xs font-semibold text-red-600">
            -{Math.round(discountPercentage)}%
          </span>
        </>
      )}
    </div>
  )
}
