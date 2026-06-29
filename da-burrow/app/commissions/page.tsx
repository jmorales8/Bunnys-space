"use client"

import Image from "next/image";
import { EmblaCarousel } from "../components/Carousel/Carousel";

export default function CommissionsPage() {
  return (
    <div className="flex flex-col items-center h-[500px] gap-4 border-4 border-t-0 border-solid border-[#ffc8e9] bg-gradient-to-l from-[#f28989] via-[#f28989] to-[#b8ffc6]">
      <div className="flex flex-col w-[100%] h-[100%]">
        <div className="flex justify-between items-center ml-3 mr-3">
          <div>
            <Image
              src="/commissions/pillbruh.png"
              alt="pillbleh"
              width={205}
              height={175}
              className="object-contain ml-2"
              unoptimized
            />
          </div>
          <div>
            <Image
              src="/commissions/pillbleh.png"
              alt="pillbleh"
              width={175}
              height={175}
              className="object-contain ml-2"
              unoptimized
            />
          </div>
        </div>
        <div className="flex w-full justify-center">
          <EmblaCarousel />
        </div>
      </div>
    </div>
  );
}
