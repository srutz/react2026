interface SegmentsProps {
	count: number
	lit: number
	/** tailwind classes for a lit segment */
	litClass: string
	charging: boolean | null
}

export function Segments({ count, lit, litClass, charging }: SegmentsProps) {
	return (
		<div className="flex items-center">
			<div className="relative flex h-14 flex-1 gap-0.75 rounded-lg border border-slate-300 bg-white/70 p-1.5 shadow-inner backdrop-blur">
				{Array.from({ length: count }, (_, i) => {
					const on = i < lit
					const head = on && i === lit - 1
					return (
						<div
							key={i}
							className={`h-full flex-1 rounded-xs transition-all duration-500 ${on ? litClass : 'bg-slate-200/80'} ${head && charging ? 'animate-pulse' : ''}`}
						/>
					)
				})}
				{/* glass sheen */}
				<div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-lg bg-linear-to-b from-white/60 to-transparent" />
			</div>
			{/* terminal */}
			<div className="h-6 w-2 rounded-r-md border border-l-0 border-slate-300 bg-slate-200" />
		</div>
	)
}
