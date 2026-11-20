export function PanelDecor() {
	return (
		<>
			{/* grid backdrop */}
			<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(14,116,144,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,116,144,0.07)_1px,transparent_1px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_at_center,black_40%,transparent_85%)]" />

			{/* corner brackets */}
			<span className="pointer-events-none absolute top-2 left-2 size-3 border-t-2 border-l-2 border-cyan-500/70" />
			<span className="pointer-events-none absolute top-2 right-2 size-3 border-t-2 border-r-2 border-cyan-500/70" />
			<span className="pointer-events-none absolute bottom-2 left-2 size-3 border-b-2 border-l-2 border-cyan-500/70" />
			<span className="pointer-events-none absolute right-2 bottom-2 size-3 border-r-2 border-b-2 border-cyan-500/70" />
		</>
	)
}
