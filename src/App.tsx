
import { createBrowserRouter, Link, Outlet, RouterProvider, type RouteObject } from "react-router"
import { ProductDisplay } from "./components/ProductDisplay";
import type { Product } from "./data/productschema";
import { useEffect, useState } from "react";

const routes: RouteObject[] = [
  { path: "/", element: <Main></Main>, children: [
    { path: "/", element: <div>Nested Main</div>},
    { path: "/hello", element: <div>Hello</div>},
    { path: "/products/:id", element: <ProductPage/>}
  ]},
]
const router = createBrowserRouter(routes);
export function App() { return <RouterProvider router={router}/> }

function ProductPage() {
  const [ product, setProduct] = useState<Product|null>(null)
  useEffect(() => {
    (async () => {
      const res = await fetch("https://dummyjson.com/products/" + 17)
      const product = (await res.json()) as Product;
      setProduct(product);
    })()
  }, [])
  if (product == null) return <div>Kein produkt</div>
  return <ProductDisplay product={product} />
}

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
