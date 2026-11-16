import { useBattery } from '@uidotdev/usehooks';
import { FancyBatteryDisplay } from './FancyBatteryDisplay';

export function App() {
  const { charging, level } = useBattery(); // reaktives listening
  return (
	<FancyBatteryDisplay charging={charging} level={level} />
  )
}

