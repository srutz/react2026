export function BatteryHeader({ charging }: { charging: boolean | null }) {
	return (
		<div className="flex items-center justify-between text-[10px] tracking-[0.3em] text-slate-500 uppercase">
			<span>Core&nbsp;Power&nbsp;Cell</span>
			<span className={`rounded-full border px-2 py-0.5 tracking-widest ${charging ? 'border-emerald-300 bg-emerald-50 text-emerald-600' : 'border-slate-300 bg-white text-slate-500'}`}>
				<span className={`mr-1.5 inline-block size-1.5 rounded-full align-middle ${charging ? 'animate-pulse bg-emerald-500' : 'bg-slate-400'}`} />
				{charging ? 'Charging' : 'Discharging'}
			</span>
		</div>
	)
}
