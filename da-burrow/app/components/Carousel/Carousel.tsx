"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { createPortal } from "react-dom";
import { useState } from "react";
import FlowModal from "../modal/modal";
import "./carousel.css";

const images = [
  "/head.png",
  "/necoarc_pillow.png",
  "/pillmurder.png",
  "/Pillow.png",
  "/pillpadoru.png",
];

export function EmblaCarousel() {
  const [openedVtuber, setOpenedVtuber] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    loop: true,
  });

  const handleOpenedVtuber = (image: string) => {
    setOpenedVtuber(image);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <div className="embla hidden md:flex">
      <div className="embla__controls">
        <button
          type="button"
          className="embla__button"
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous image"
        >
          <Image
            src="/left_skip.png"
            alt="left"
            width={75}
            height={100}
            className="nonImageHover"
          />
        </button>
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {images.map((src, index) => (
              <div className="embla__slide" key={`${src}-${index}`}>
                <Image
                  src={src}
                  alt={`Carousel image ${index + 1}`}
                  width={500}
                  height={250}
                  className="embla__slideImage w-[100%]"
                  onClick={() => handleOpenedVtuber(src)}
                />
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          className="embla__button"
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next image"
        >
          <Image
            src="/right_skip.png"
            alt="left"
            width={75}
            height={100}
            className="nonImageHover"
          />
        </button>
      </div>

      {open &&
        createPortal(
          <div className="commissions__modal" onClick={handleClose}>
            <div
              onClick={(event) => event.stopPropagation()}
            >
              <FlowModal direction="down" width={"auto"}>
                <Image
                  src={openedVtuber}
                  alt="Opened carousel image"
                  width={600}
                  height={600}
                  className=" nonImageHover rounded-xl flex justify-center align-center items-center hover:cursor-pointer"
                />
              </FlowModal>
            </div>
          </div>
          ,
          document.body,
        )}
    </div>
  );
}
