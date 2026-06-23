"use client";
import Image from "next/image";
import Modal from "../components/Modal/modal";
import { useState } from "react";

const buttonStyle = ` relative block rounded-lg px-6 py-2
                text-center text-[25px] font-bold text-white
                bg-[rgb(229,113,229)]
                shadow-[0px_9px_0px_rgb(192,99,195),0px_9px_25px_rgba(0,0,0,0.7)]
                transition-all duration-100 ease-in-out

                hover:bg-[rgb(195,85,160)]
                hover:top-[6px]
                hover:shadow-[0px_9px_0px_rgb(125,57,125),0px_9px_25px_rgba(0,0,0,0.7)]
                hover:cursor-pointer
                active:bg-[rgb(150,68,150)]
                active:top-[6px]
                active:shadow-[0px_9px_0px_rgb(88,41,88),0px_9px_25px_rgba(0,0,0,0.7)]`;

export default function DiscordPage() {
  const [dialogOptions, setDialogOptions] = useState(1);

  const bruh = () => {
    setDialogOptions((prev) => (prev += 1));
    console.log(dialogOptions);
  };
  return (
    <div className="flex flex-col items-center h-[500px] gap-4 border-4 border-t-0 border-solid border-[#ffc8e9] bg-gradient-to-l from-[#f28989] via-[#f28989] to-[#b8ffc6]">
      <div className="flex flex-row w-[100%] h-[100%] items-center justify-center">
        {dialogOptions && (
          <>
          <div className="hidden lg:flex relative w-full h-full justify-center items-center">
            <div className="flex justify-center pl-3 ">
              <Image
                src={`/pillvroid${dialogOptions}.png`}
                alt="Discord Logo"
                width={611}
                height={600}
                className="object-contain"
                unoptimized
                loading="eager"
              />
            </div>
            <div className="w-1/2 flex -ml-[5%] z-10 flex-col mr-15 md:mt-15 sm:mt-20 animate-1s">
              <Modal direction="left" width={"100%"} height={250}>
                <Image
                  src={`/pixeldialogue${dialogOptions}.png`}
                  alt="text"
                  width={490}
                  height={250}
                  className="nonImageHover object-contain"
                  loading="eager"
                />
              </Modal>
              <div className="flex items-center justify-center h-full mt-4 ">
                <button onClick={() => bruh()} className={buttonStyle}>
                  Join here :3
                </button>
              </div>
            </div>
          </div>
          <div className="flex lg:hidden">
            bruh
          </div>
          </>

        )}

      </div>
    </div>
  );
}
