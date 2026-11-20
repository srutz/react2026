
import { createBrowserRouter, Link, Outlet, RouterProvider, useLoaderData, useParams, type RouteObject } from "react-router"
import { ProductDisplay } from "./components/ProductDisplay";
import type { Product } from "./data/productschema";
import { useEffect, useState } from "react";

const routes: RouteObject[] = [
  { path: "/", element: <Main></Main>, children: [
    { path: "/", element: <div>Nested Main</div>},
    { path: "/hello", element: <div>Hello</div>},
    { path: "/products/:pid", element: <ProductPage/>,
      loader: async (loaderArgs) => {
        const { pid } = loaderArgs.params
        await delay(3_000)
        const res = await fetch("https://dummyjson.com/products/" 
          + encodeURIComponent(pid || "1"))
        const product = (await res.json()) as Product;
        return product;
      }
    }
  ]},
]
const router = createBrowserRouter(routes);

function ProductPage() {
  const product = useLoaderData<Product>()
  console.log("productpage", product?.id)
  /*
  const [ product, setProduct] = useState<Product|null>(null)
  const params = useParams<{ pid: string }>();
  useEffect(() => {
    (async () => {
      await delay(3_000)
      const res = await fetch("https://dummyjson.com/products/" 
        + encodeURIComponent(params.pid || "1"))
      const product = (await res.json()) as Product;
      setProduct(product);
    })()
  }, [ params.pid ])
  */
  if (product == null) return <div>Kein produkt</div>
  return <ProductDisplay product={product} />
}

export function App() { return <RouterProvider router={router}/> }
function delay(ms: number) { return new Promise((resolve) => 
  setTimeout(resolve, ms)
)}

function Main() {
	return (
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
	);
}
