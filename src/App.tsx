
import { createBrowserRouter, Link, Outlet, RouterProvider, type RouteObject } from "react-router"

const routes: RouteObject[] = [
  { path: "/", element: <Main></Main>, children: [
    { path: "/", element: <div>Nested Main</div>},
    { path: "/hello", element: <div>Hello</div>}  
  ]},
]
const router = createBrowserRouter(routes);
export function App() { return <RouterProvider router={router}/> }

function Main() {
	return (
  	<div className="grow flex flex-col overflow-y-auto self-stretch">
      <header className="flex bg-blue-200 gap-2 self-stretch p-2">
        {/*
        <a href="/">Home</a><a href="/hello">Hello</a>
        */}
        <Link to="/">Home</Link><Link to="/hello">Hello</Link>
      </header>
      <div className="p-2 grow flex flex-col bg-mauve-200">
        <Outlet></Outlet>
      </div>
		</div>
	);
}
