import Link from "next/link";
import LiquidButton from "../LiquidButton/LiquidButton";

export function NavBar() {
	return (
		<div className="	flex
				flex-wrap
				justify-around
				gap-4
				max-[1200px]:max-w-[600px]
				mx-auto
				pb-4">
			<LiquidButton text="Home"/>
			<LiquidButton text="Discord"/>
			<LiquidButton text="Commissions"/>
			<LiquidButton text="Lore"/>
			<LiquidButton text="Q-and-A"/>
			<LiquidButton text="Social Media"/>
		</div>
	)
}
