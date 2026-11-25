import { createFileRoute, Link } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { ProductPrice, ProductRating } from "../components/products"
import type { Product } from "../data/productschema"
import { queryClient } from "../lib/queryClient"

async function loadProducts() {
	const res = await fetch("https://dummyjson.com/products?limit=30")
	const json = (await res.json()) as { products: Product[] }
	return json.products
}

const productsQuery = { queryKey: ["products"], queryFn: loadProducts }

export const Route = createFileRoute("/")({
	loader: async () => {
		await queryClient.ensureQueryData(productsQuery)
	},
	component: HomePage,
})

function HomePage() {
	const { data: products } = useQuery(productsQuery)
	if (!products) return <div>No products</div>
	return (
		<div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(14rem,1fr))]">
			{products.map((p) => (
				<Link
					key={p.id}
					to="/products/$pid"
					params={{ pid: String(p.id) }}
					className="group flex flex-col gap-2 rounded-2xl bg-card p-3 text-card-foreground shadow-sm ring-1 ring-foreground/10 transition hover:-translate-y-1 hover:shadow-lg"
				>
					<div className="aspect-square overflow-hidden rounded-xl bg-muted">
						<img
							src={p.thumbnail}
							alt={p.title}
							loading="lazy"
							className="size-full object-contain transition group-hover:scale-105"
						/>
					</div>
					<div className="text-xs font-semibold uppercase tracking-widest text-primary">
						{p.brand ?? p.category}
					</div>
					<h2 className="line-clamp-2 font-semibold leading-tight">{p.title}</h2>
					<ProductRating rating={p.rating} count={p.reviews.length} />
					<ProductPrice price={p.price} discountPercentage={p.discountPercentage} />
				</Link>
			))}
		</div>
	)
}
