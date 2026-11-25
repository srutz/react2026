import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { ProductDisplay } from "../components/ProductDisplay"
import { Button } from "../components/ui/button"
import type { Product } from "../data/productschema"
import { queryClient } from "../lib/queryClient"

async function loadProduct(pid: string) {
  const res = await fetch("https://dummyjson.com/products/"
    + encodeURIComponent(pid || "1"))
  const product = (await res.json()) as Product;
  return product
}

// Component-side read: useQuery reads from the same cache the loader fills,
// so data is available immediately on first render (no loading state) and
// stays reactive (refetch/invalidation updates the page).
function useProduct(pid: string) {
  return useQuery({
    queryKey: [ "product", pid],
    queryFn: () => loadProduct(pid),
  })
}

// Route loader: runs before the route renders (also on Prev/Next navigation).
// ensureQueryData fetches only if the key isn't cached (or is stale per
// staleTime). Data is consumed via useQuery, not Route.useLoaderData.
export const Route = createFileRoute("/products/$pid")({
  // Same queryKey as useProduct so both share one cache entry
  loader: async ({ params: { pid } }) => {
    await queryClient.ensureQueryData({
      queryKey: ["product", pid],
      queryFn: () => loadProduct(pid),
    })
  },
  // component is code-split automatically by the vite plugin
  component: ProductPage,
})

export function ProductPage() {
  const { pid } = Route.useParams();
  const navigate = useNavigate();
  const { data: product } = useProduct(pid);
  console.log("render page", product?.id)
  if (product == null) return <div>Kein produkt</div>
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Button onClick={() => navigate({ to: "/products/$pid",
          params: { pid: String(Number.parseInt(pid) - 1) } })}>Prev</Button>
        <Button onClick={() => navigate({ to: "/products/$pid",
          params: { pid: String(Number.parseInt(pid) + 1) } })}>Next</Button>
        </div>
      <ProductDisplay product={product} />
    </div>
  )
}
