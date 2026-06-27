import Image from "next/image";

export function SecondRow() {
	return (
		<div className="
		flex flex-col md:flex-row
		border-4 border-t-0 border-solid border-[#ffc8e9]
		bg-gradient-to-l from-[#f28989] via-[#f28989] to-[#b8ffc6]
		h-[1000px] md:h-[600px] lg:h-[500px]
		">

			<div className="flex-1 flex pt-3 justify-center">
				<div className="relative w-[300px] h-[300px]">
					<div className="flex justify-center text-center text-black text-xl font-bold italic text-shadow-lg">
						Pillow is my name, <br /> freakyness is mah game
					</div>
					<div>
						<div className="	flex flex-col lg:flex-row
							items-center justify-center
							gap-5 pt-5">
							<Image
								src="/Pillow.png"
								alt="pillow"
								width={280}
								height={350}
								priority
								className="rounded-[30px]
								xl:h-[350px]
								lg:h-[275px]
								md:h-[225px]
								object-cover"
							/>
							<Image
								src="/necoarc_pillow.png"
								alt="pillow"
								width={270}
								height={350}
								priority
								className="hidden md:block
								object-cover
								width-auto
								height-auto
								xl:h-[350px]
								lg:h-[275px]
								md:h-[260px]"
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="flex-1 flex flex-col justify-start pt-3 items-center column-1 ">
				<div className="flex items-center text-2xl font-bold italic">
					<Image
						src="/happy_goober.gif"
						alt="pillow"
						width={50}
						height={50}
						className="pl-2 rotate-y-180"
						unoptimized
					/>
					<div className="flex text-center text-shadow-lg">Hiya New Friends!</div>
					<Image
						src="/happy_goober.gif"
						alt="pillow"
						width={50}
						height={50}
						unoptimized
						className="pl-2"
					/>
				</div>
				<Image
					src="/erwin_goober.gif"
					alt="pillow"
					width={50}
					height={50}
					unoptimized
					className="pr-2" />
				<div className="flex text-center justify-center items-end text-shadow-lg font-bold italic text-lg md:text-xl text-black pl-3 pr-3">
					<ul>
						<li>We have a lot of fun here, <br /> so make sure to check out the rules and guidelines in both the server and in stream!</li>
						<li className="pt-2">When streaming, please be respectful to the streamer and the community as to make it a safe space for them!</li>
						<li className="pt-2">Schedules will be posted usually but if there is a hiccup or change up, i will be sure to let you guys know!</li>
						<li className="pt-2">Any art commissions will be done in vgen or in twitter DM's</li>
						<li className="pt-2">Don't forget to be respectful and have a great time!</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
