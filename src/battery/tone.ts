export interface Tone {
	seg: string
	text: string
	chip: string
	label: string
}

export function getTone(pct: number): Tone {
	if (pct <= 20)
		return { seg: 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.55)]', text: 'text-rose-600', chip: 'border-rose-300 bg-rose-50 text-rose-600', label: 'Critical' }
	if (pct <= 50)
		return { seg: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]', text: 'text-amber-600', chip: 'border-amber-300 bg-amber-50 text-amber-600', label: 'Reduced' }
	return { seg: 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.55)]', text: 'text-cyan-600', chip: 'border-cyan-300 bg-cyan-50 text-cyan-600', label: 'Nominal' }
}
