const MARKS = [0, 25, 50, 75, 100]

export function ScaleFooter() {
	return (
		<div className="flex justify-between text-[9px] tracking-widest text-slate-400">
			{MARKS.map(n => (
				<span key={n}>{n}</span>
			))}
		</div>
	)
}
