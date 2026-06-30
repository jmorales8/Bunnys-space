"use client";

import Image from "next/image";
import { EmblaCarousel } from "../components/Carousel/Carousel";
import Link from "next/link";

const pillowHandle = " @pillow_senpai";
const pinHandle = " @pinhhead69696969";
export default function CommissionsPage() {
  return (
    <div className="flex flex-col items-center h-[500px] gap-4 border-4 border-t-0 border-solid border-[#ffc8e9] bg-gradient-to-l from-[#f28989] via-[#f28989] to-[#b8ffc6]">
      <div className="flex flex-col w-[100%] h-[100%] justify-evenly">
        <div className="hidden md:flex justify-around items-center">
          <div className="min-w-30 max-w-100 w-[20%] flex justify-center">
            <Image
              src="/commissions/goblin.png"
              alt="pillbleh"
              width={205}
              height={175}
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="w-[50%] max-w-150 text-black font-bold text-shadow-lg text-wrap">
            Want a commission? Please DM me either in my Discord DM's or message
            me in Twitter
            <Link
              href="https://x.com/peachi_bunnii"
              className="text-blue-700 italic"
            >
              {pillowHandle}
            </Link>
            . If I dont answer, please send a reply to
            <Link
              href="https://x.com/pinhead69696969"
              className="text-blue-700 italic"
            >
              {pinHandle}
            </Link>{" "}
            on twitter or
            <span className="text-gray-700"> pinhead69 </span>
            on discord who is my manager (and the person who designed this
            website) for a faster reply in case I dont answer right away. <br />{" "}
            Trust me, he aint doing nothing xd
          </div>
          <div className="min-w-30 max-w-100 w-[20%] flex justify-center">
            <Image
              src="/commissions/pillbleh.png"
              alt="pillbleh"
              width={175}
              height={175}
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
        <div className="flex w-full justify-center pr-2 pl-2">
          <EmblaCarousel />
        </div>
      </div>
    </div>
  );
}
