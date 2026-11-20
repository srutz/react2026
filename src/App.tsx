
import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router"

const routes: RouteObject[] = [
  { path: "/", element: <Main></Main>},
  { path: "/hello", element: <div>Hello</div>}  
]

const router = createBrowserRouter(routes);

export function App() {
  return <RouterProvider router={router} />
}

function Main() {
	return (
  	<div className="flex flex-col overflow-y-auto items-start">
      <div>Hello World</div>
		</div>
	);
}
