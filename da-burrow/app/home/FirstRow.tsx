import Image from "next/image";
import BouncingImage from "../components/BouncingImage/BouncingImage";
import styles from "./firstRow.module.css"

export function FirstRow() {
	
  return (
    <div className="flex border-2 border-solid border-[#ffc8e9] h-[350px] overflow-hidden bg-gradient-to-l from-[#f28989] via-[#f28989] to-[#b8ffc6]">
      <div className="relative flex-1 overflow-hidden">
        <BouncingImage
          src="/head.png"
          alt="left head"
          className="
            w-[70px] h-[70px]
            sm:w-[100px] sm:h-[100px]
            md:w-[150px] md:h-[150px]

          "
          startX={20}
          startY={40}
          velocityX={-0.5}
          velocityY={0.5}
        />
      </div>
      <div className="flex items-center justify-center shrink-0 w-[150px]">
        <Image
          src="/necoarc_pillow.png"
          alt="pillow"
          width={150}
          height={150}
          priority
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