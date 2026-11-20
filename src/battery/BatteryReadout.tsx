import type { Tone } from './tone'

interface BatteryReadoutProps {
	known: boolean
	pct: number
	tone: Tone
}

export function BatteryReadout({ known, pct, tone }: BatteryReadoutProps) {
	return (
		<div className="flex items-end justify-between">
			<div className={`text-6xl leading-none font-bold tracking-tight tabular-nums ${known ? tone.text : 'text-slate-400'}`}>
				{known ? pct : '--'}
				<span className="ml-1 text-2xl font-normal text-slate-400">%</span>
			</div>
			<div className={`rounded border px-2 py-1 text-[10px] tracking-widest uppercase ${known ? tone.chip : 'border-slate-300 bg-white text-slate-500'}`}>
				{known ? tone.label : 'No signal'}
			</div>
		</div>
	)
}
