
import { createBrowserRouter, Link, Outlet, RouterProvider, useNavigate, useParams, type RouteObject } from "react-router"
import { ProductDisplay } from "./components/ProductDisplay";
import type { Product } from "./data/productschema";
import { QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query"
import { ReactQueryDevtools} from "@tanstack/react-query-devtools"
import { Button } from "./components/ui/button";

const queryClient = new QueryClient() // << cache objekt

async function loadProduct(pid: string) {
  const res = await fetch("https://dummyjson.com/products/" 
    + encodeURIComponent(pid || "1"))
  const product = (await res.json()) as Product;
  return product
}

function useProduct(pid: string) {
  return useQuery({
    queryKey: [ "product", pid],
    queryFn: () => loadProduct(pid),
    staleTime: 5_000,
  })
}

const routes: RouteObject[] = [
  { path: "/", element: <Main></Main>, children: [
    { path: "/", element: <div>Nested Main</div>},
    { path: "/hello", element: <div>Hello</div>},
    { path: "/products/:pid", element: <ProductPage/>,
      loader: async (loaderArgs) => {
        const { pid } = loaderArgs.params
        await queryClient.ensureQueryData({ // <- in den cache laden
          queryKey: [ "product", pid],
          queryFn: () => loadProduct(pid || "1"),
          staleTime: 5_000,
        })
        return null;
      }
    }
  ]},
]
const router = createBrowserRouter(routes);

function ProductPage() {
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

export function App() { return <RouterProvider router={router}/> }
function delay(ms: number) { return new Promise((resolve) => 
  setTimeout(resolve, ms)
)}


function Main() {
	return (
    <QueryClientProvider client={queryClient}>
      <div className="grow flex flex-col overflow-y-auto self-stretch">
        <header className="flex bg-blue-200 gap-2 self-stretch p-2">
          {/*
          <a href="/">Home</a><a href="/hello">Hello</a>
          */}
          <Link to="/">Home</Link><Link to="/hello">Hello</Link>
        </header>
        <div className="overflow-y-auto h-1 p-2 grow flex flex-col bg-mauve-200">
          <Outlet></Outlet>
        </div>
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
	);
}
