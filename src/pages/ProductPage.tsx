import { useNavigate, useParams, type LoaderFunctionArgs } from "react-router"
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
// staleTime); otherwise it resolves instantly from the cache. Returns null
// because the data is consumed via useQuery, not useLoaderData.
export async function productLoader(loaderArgs: LoaderFunctionArgs) {
  const { pid } = loaderArgs.params
  // Must use the same queryKey as useProduct so both share one cache entry
  await queryClient.ensureQueryData({ // <- in den cache laden
    queryKey: [ "product", pid],
    queryFn: () => loadProduct(pid || "1"),
  })
  return null;
}

export function ProductPage() {
  const { pid } = useParams();
  const navigate = useNavigate();
  const { data: product } = useProduct(pid || "1");
  console.log("render page", product?.id)
  if (product == null) return <div>Kein produkt</div>
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Button onClick={() => navigate("/products/"
          + (Number.parseInt(pid||"1") - 1))}>Prev</Button>
        <Button onClick={() => navigate("/products/"
          + (Number.parseInt(pid||"1") + 1))}>Next</Button>
        </div>
      <ProductDisplay product={product} />
    </div>
  )
}

export default ProductPage;
