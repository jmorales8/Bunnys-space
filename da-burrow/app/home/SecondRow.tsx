import Image from "next/image";

export function SecondRow() {
	return (
		<div className="flex border-4 border-t-0 border-solid border-[#ffc8e9] h-[350px] bg-gradient-to-l from-[#f28989] via-[#f28989] to-[#b8ffc6]">
			<div className="ml-3 mt-3">
				<Image
					src="/Pillow.png"
					alt="pillow"
					width={300}
					height={50}
					priority
				/>
			</div>			
			<div className="flex bg-gradient-to-r 
			from-red-600 via-[darkgreen] to-[darkgreen] bg-clip-text 
			text-transparent
			w-[100%] h-8 justify-center text-shadow-lg text-2xl">Pillow is my name, freakyness is my game</div>

		</div>
	)
}
