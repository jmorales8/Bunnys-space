import Image from "next/image";

export function SecondRow() {
	return (
		<div className="flex border-4 border-t-0 border-solid border-[#ffc8e9] h-[550px] bg-gradient-to-l from-[#f28989] via-[#f28989] to-[#b8ffc6]">

			<div className="flex-1 flex pl-5 pt-3">
				<div className="relative w-[300px] h-[300px]">
					<div className="flex justify-center text-center text-black text-xl font-bold italic text-shadow-lg">
						Pillow is my name, <br /> freakyness is my game
					</div>
					<div>

						<Image
							src="/Pillow.png"
							alt="pillow"
							width={896}
							height={1195}
							priority
							className="rounded-[30px]"
						/>
					</div>
				</div>
			</div>

			<div className="flex-1 flex flex-col justify-center items-center column-1">
				<div className="flex items-center text-2xl font-bold italic">
					<Image
						src="/happy_goober.gif"
						alt="pillow"
						width={50}
						height={50}
						className="pl-2 rotate-y-180"
					/>
					<div className="flex text-center text-shadow-lg">Hiya New Friends!</div>
					<Image
						src="/happy_goober.gif"
						alt="pillow"
						width={50}
						height={50}
						className="pl-2"
					/>
				</div>
				<div className="flex text-center justify-center items-end text-shadow-lg">
					<Image
						src="/erwin_goober.gif"
						alt="pillow"
						width={50}
						height={50}
						className="pr-2" />
					<>
						Mahh imporstant stuff!
					</>
				</div>
			</div>
		</div>
	);
}