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
			<LiquidButton text="Home" href="/"/>
			<LiquidButton text="Discord" href="/discord"/>
			<LiquidButton text="Commissions" href="/commissions"/>
			<LiquidButton text="Lore" href="/lore"/>
			<LiquidButton text="Q-and-A" href="/q-and-a"/>
			<LiquidButton text="Social Media" href="/social-media"/>
		</div>
	)
}
