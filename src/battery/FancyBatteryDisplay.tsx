import { BatteryHeader } from './BatteryHeader'
import { BatteryReadout } from './BatteryReadout'
import { PanelDecor } from './PanelDecor'
import { ScaleFooter } from './ScaleFooter'
import { Segments } from './Segments'
import { getTone } from './tone'

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
	const tone = getTone(pct)

	return (
		<div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-br from-white via-slate-50 to-sky-50 p-5 font-mono shadow-[0_10px_40px_-12px_rgba(14,116,144,0.35)]">
			<PanelDecor />
			<div className="relative flex flex-col gap-4">
				<BatteryHeader charging={charging} />
				<BatteryReadout known={known} pct={pct} tone={tone} />
				<Segments count={SEGMENTS} lit={lit} litClass={tone.seg} charging={charging} />
				<ScaleFooter />
			</div>
		</div>
	)
}
