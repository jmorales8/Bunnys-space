import Image from "next/image";
import BouncingImage from "../components/BouncingImage/BouncingImage";

export function FirstRow() {
	
  return (
    <div className="flex border-4 border-solid border-[#ffc8e9] h-[250px] overflow-hidden bg-gradient-to-l from-[#f28989] via-[#f28989] to-[#b8ffc6]">
      <div className="relative flex-1 overflow-hidden">
        <BouncingImage
          src="/head.png"
          alt="left head"
          className={`
            w-[70px] h-[70px]
            sm:w-[100px] sm:h-[100px]
            md:w-[150px] md:h-[150px]
						`}
          startX={20}
          startY={40}
          velocityX={-0.5}
          velocityY={0.5}
        />
      </div>
      <div className="flex items-center justify-center w-[180px] sm:w-[300px]">
        <Image
          src="/giphy.gif"
          alt="pillow"
          width={75}
          height={150}
          priority
          className="rounded-[20px] sm:w-[300px] w-[175px] object-cover"
        />
      </div>

      <div className="relative flex-1 overflow-hidden">
        <BouncingImage
          src="/head.png"
          alt="right head"
          className="
            w-[70px] h-[70px]
            sm:w-[100px] sm:h-[100px]
            md:w-[150px] md:h-[150px]
          "
          startX={20}
          startY={80}
          velocityX={-0.5}
          velocityY={-0.5}
        />
      </div>
    </div>
  );
}