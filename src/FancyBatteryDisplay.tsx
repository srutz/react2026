interface FancyBatteryDisplayProps {
	charging: boolean | null
	/** 0..1 as delivered by the Battery API */
	level: number | null
}

const SEGMENTS = 20

export function FancyBatteryDisplay({ charging, level }: FancyBatteryDisplayProps) {
	const known = level !== null
	const pct = known ? Math.round(Math.min(1, Math.max(0, level)) * 100) : 0
	const lit = Math.round((pct / 100) * SEGMENTS)

	const tone =
		pct <= 20
			? { seg: 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.55)]', text: 'text-rose-600', chip: 'border-rose-300 bg-rose-50 text-rose-600' }
			: pct <= 50
				? { seg: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]', text: 'text-amber-600', chip: 'border-amber-300 bg-amber-50 text-amber-600' }
				: { seg: 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.55)]', text: 'text-cyan-600', chip: 'border-cyan-300 bg-cyan-50 text-cyan-600' }

	return (
		<div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-br from-white via-slate-50 to-sky-50 p-5 font-mono shadow-[0_10px_40px_-12px_rgba(14,116,144,0.35)]">
			{/* grid backdrop */}
			<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(14,116,144,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,116,144,0.07)_1px,transparent_1px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_at_center,black_40%,transparent_85%)]" />

			{/* corner brackets */}
			<span className="pointer-events-none absolute top-2 left-2 size-3 border-t-2 border-l-2 border-cyan-500/70" />
			<span className="pointer-events-none absolute top-2 right-2 size-3 border-t-2 border-r-2 border-cyan-500/70" />
			<span className="pointer-events-none absolute bottom-2 left-2 size-3 border-b-2 border-l-2 border-cyan-500/70" />
			<span className="pointer-events-none absolute right-2 bottom-2 size-3 border-r-2 border-b-2 border-cyan-500/70" />

			<div className="relative flex flex-col gap-4">
				{/* header */}
				<div className="flex items-center justify-between text-[10px] tracking-[0.3em] text-slate-500 uppercase">
					<span>Core&nbsp;Power&nbsp;Cell</span>
					<span className={`rounded-full border px-2 py-0.5 tracking-widest ${charging ? 'border-emerald-300 bg-emerald-50 text-emerald-600' : 'border-slate-300 bg-white text-slate-500'}`}>
						<span className={`mr-1.5 inline-block size-1.5 rounded-full align-middle ${charging ? 'animate-pulse bg-emerald-500' : 'bg-slate-400'}`} />
						{charging ? 'Charging' : 'Discharging'}
					</span>
				</div>

				{/* readout */}
				<div className="flex items-end justify-between">
					<div className={`text-6xl leading-none font-bold tracking-tight tabular-nums ${known ? tone.text : 'text-slate-400'}`}>
						{known ? pct : '--'}
						<span className="ml-1 text-2xl font-normal text-slate-400">%</span>
					</div>
					<div className={`rounded border px-2 py-1 text-[10px] tracking-widest uppercase ${known ? tone.chip : 'border-slate-300 bg-white text-slate-500'}`}>
						{!known ? 'No signal' : pct <= 20 ? 'Critical' : pct <= 50 ? 'Reduced' : 'Nominal'}
					</div>
				</div>

				{/* cell */}
				<div className="flex items-center">
					<div className="relative flex h-14 flex-1 gap-0.75 rounded-lg border border-slate-300 bg-white/70 p-1.5 shadow-inner backdrop-blur">
						{Array.from({ length: SEGMENTS }, (_, i) => {
							const on = i < lit
							const head = on && i === lit - 1
							return (
								<div
									key={i}
									className={`h-full flex-1 rounded-xs transition-all duration-500 ${on ? tone.seg : 'bg-slate-200/80'} ${head && charging ? 'animate-pulse' : ''}`}
								/>
							)
						})}
						{/* glass sheen */}
						<div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-lg bg-linear-to-b from-white/60 to-transparent" />
					</div>
					{/* terminal */}
					<div className="h-6 w-2 rounded-r-md border border-l-0 border-slate-300 bg-slate-200" />
				</div>

				{/* footer scale */}
				<div className="flex justify-between text-[9px] tracking-widest text-slate-400">
					{[0, 25, 50, 75, 100].map(n => (
						<span key={n}>{n}</span>
					))}
				</div>
			</div>
		</div>
	)
}
