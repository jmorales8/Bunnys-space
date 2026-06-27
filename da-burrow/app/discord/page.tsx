"use client";
import Image from "next/image";
import Modal from "../components/modal/modal";
import { useState } from "react";

const buttonStyle = ` relative block rounded-lg px-6 py-2 text-center text-[25px] font-bold text-white bg-[rgb(229,113,229)] shadow-[0px_9px_0px_rgb(192,99,195),0px_9px_25px_rgba(0,0,0,0.7)] transition-all duration-100 ease-in-out w-[200px] h-[75px] hover:bg-[rgb(195,85,160)] hover:top-[6px] hover:shadow-[0px_9px_0px_rgb(125,57,125),0px_9px_25px_rgba(0,0,0,0.7)] hover:cursor-pointer active:bg-[rgb(150,68,150)] active:top-[6px] active:shadow-[0px_9px_0px_rgb(88,41,88),0px_9px_25px_rgba(0,0,0,0.7)]`;
const dialog: string[] = ["Of course!", "Even Better!", "Join here :3"];

export default function DiscordPage() {
  const [dialogOptions, setDialogOptions] = useState(1);
  const handleNextDialog = () => {
    setDialogOptions((prev) => (prev += 1));
  };

  return (
    <div className="flex flex-col items-center h-[500px] gap-4 border-4 border-t-0 border-solid border-[#ffc8e9] bg-gradient-to-l from-[#f28989] via-[#f28989] to-[#b8ffc6]">
      <div className="flex flex-row w-[100%] h-[100%] items-center justify-center">
        {dialogOptions && (
          <>
            <div className="hidden md:flex relative w-full h-full justify-center items-center">
              <div className="flex mb-10 lg:mb-0 justify-center">
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
              <div className="w-1/2 flex -ml-[5%] z-10 flex-col animate-1s items-center">
                <Modal direction="left" width={"100%"} height={250}>
                  <Image
                    src={`/dialogue${dialogOptions}.png`}
                    alt="text"
                    width={490}
                    height={250}
                    className="nonImageHover object-contain"
                    loading="eager"
                  />
                </Modal>
                {dialogOptions !== 4 && (
                  <div className="flex items-center justify-center h-full mt-5">
                    <button
                      onClick={() => handleNextDialog()}
                      className={buttonStyle}
                    >
                      {dialog[dialogOptions - 1]}
                    </button>
                  </div>
                )}
              </div>
              <Image
                src={`/pillcool.png`}
                alt="Discord Logo"
                width={150}
                height={150}
                className="object-contain mr-1"
                unoptimized
              />
            </div>
            <div className="flex md:hidden justify-center">
              <div className="flex flex-col justify-center pl-3 w-full">
                <div className="relative flex justify-center w-full ">
                  <Image
                    src={`/pillvroid${dialogOptions}.png`}
                    alt="Discord Logo"
                    width={600}
                    height={600}
                    className="object-contain mt-[-25px] w-[75vw] max-w-[590px]"
                    unoptimized
                    loading="eager"
                  />
                  <div className="absolute left-[55%] top-[45%] -translate-y-1/2 z-10 animate-1s">
                    <Modal direction="left" width="100%" height={150}>
                      <Image
                        src={`/dialogue${dialogOptions}.png`}
                        alt="text"
                        width={490}
                        height={250}
                        className="nonImageHover object-contain w-full"
                        loading="eager"
                      />
                    </Modal>
                  </div>
                </div>
                <div className="hidden xs:flex items-center justify-center h-full mt-5">
                  {dialogOptions !== 4 && (
                    <button
                      onClick={() => handleNextDialog()}
                      className={buttonStyle}
                    >
                      {dialog[dialogOptions - 1]}
                    </button>
                  )}
                  <Image
                    src={`/pillcool.png`}
                    alt="Discord Logo"
                    width={75}
                    height={75}
                    className="object-contain ml-2"
                    unoptimized
                  />
                </div>
                <div className="flex xs:hidden flex-col justify-center items-center">
                 {dialogOptions !== 4 && (
                    <div className="mt-5">
                      <button
                        onClick={() => handleNextDialog()}
                        className={buttonStyle}
                      >
                        {dialog[dialogOptions - 1]}
                      </button>
                    </div>
                  )}
                  <Image
                    src={`/pillcool.png`}
                    alt="Discord Logo"
                    width={100}
                    height={100}
                    className="object-contain mt-5"
                    unoptimized
                  />
 
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
