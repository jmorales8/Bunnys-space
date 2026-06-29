"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import "./carousel.css";

const images = [
  "/head.png",
  "/head.png",
  "/head.png",
  "/head.png",
  "/head.png",
];

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    loop: true,
  });

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {images.map((src, index) => (
            <div className="embla__slide" key={`${src}-${index}`}>
              <Image
                src={src}
                alt={`Carousel image ${index + 1}`}
                width={200}
                height={100}
              />
            </div>
          ))}
        </div>
      </div>

      <button type="button" onClick={() => emblaApi?.scrollPrev()}>
        Previous
      </button>

      <button type="button" onClick={() => emblaApi?.scrollNext()}>
        Next
      </button>
    </div>
  );
}
