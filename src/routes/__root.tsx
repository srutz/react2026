import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { createRootRoute, Link, Outlet } from "@tanstack/react-router"
import { queryClient } from "../lib/queryClient"

const navLink =
	"rounded-full px-4 py-1.5 text-sm font-medium text-white/80 transition hover:bg-white/15 hover:text-white [&.active]:bg-white [&.active]:text-violet-700 [&.active]:shadow"

export const Route = createRootRoute({ component: Main })

function Main() {
	return (
		<QueryClientProvider client={queryClient}>
			<div className="grow flex flex-col overflow-y-auto self-stretch">
				<header className="sticky top-0 z-10 flex items-center gap-1 self-stretch border-b border-white/20 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-4 py-3 text-white shadow-lg backdrop-blur">
					<span className="mr-6 text-lg font-extrabold tracking-tight">
						React<span className="text-amber-300">2026</span>
					</span>
					<Link to="/" activeOptions={{ exact: true }} className={navLink}>Home</Link>
					<Link to="/hello" className={navLink}>Hello</Link>
				</header>
				<div className="overflow-y-auto h-1 p-2 grow flex flex-col bg-mauve-200">
					<Outlet />
				</div>
			</div>
			<ReactQueryDevtools />
		</QueryClientProvider>
	)
}
