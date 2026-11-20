import { createBrowserRouter, Link, Outlet, RouterProvider, type RouteObject } from "react-router"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools} from "@tanstack/react-query-devtools"
import { queryClient } from "./lib/queryClient"
import { HomePage } from "./pages/HomePage"
import { HelloPage } from "./pages/HelloPage"
import { ProductPage, productLoader } from "./pages/ProductPage"

const routes: RouteObject[] = [
  { path: "/", element: <Main></Main>, children: [
    { path: "/", element: <HomePage/>},
    { path: "/hello", element: <HelloPage/>},
    { path: "/products/:pid", element: <ProductPage/>, loader: productLoader },
  ]},
]
const router = createBrowserRouter(routes);

export function App() { return <RouterProvider router={router}/> }


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
