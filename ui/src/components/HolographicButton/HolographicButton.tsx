interface HolograpicButtonProps {
	label: string;
	state: boolean;
}
export function HolograpicButton({label, state}: HolograpicButtonProps) {
	return (
		<div className="holographic__container">
			<div className={state ? "holographic__card__night" : "holographic__card"}>
				<h2>{label}</h2>
			</div>
		</div>
	)
}