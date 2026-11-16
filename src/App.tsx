import { useEffect, useState } from "react"


export function App() {
	return (
  	<div className="m-8 flex flex-col overflow-y-auto items-start">
			<Area></Area>
		</div>
	)
}

function Area() {
	const { width, height } = useWindowSize();
	return <div>{width * height} m²</div>
}

function useWindowSize() {
	const [ size, setSize ] = useState({
		width: window.innerWidth, height: window.innerHeight
	})
	useEffect(() => {
		const l = () => {
			setSize({ width: window.innerWidth, height: window.innerHeight })
		};
		window.addEventListener("resize", l)
		return () => {
			window.removeEventListener("resize", l);
		}		
	}, [])
	return size;
}

