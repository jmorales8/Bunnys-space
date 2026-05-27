"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
type BouncingImageProps = {
  src: string;
  alt: string;
  className?: string;
  startX: number;
  startY: number;
  velocityX: number;
  velocityY: number;
};

export default function BouncingImage({
  src,
  alt,
  className = "",
  startX,
  startY,
  velocityX,
  velocityY,
}: BouncingImageProps) {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    const parent = img?.parentElement;
    if (!img || !parent) return;

    let x = startX;
    let y = startY;
    let dx = velocityX;
    let dy = velocityY;
    let animationId: number;

    const keepInside = () => {
      const maxX = Math.max(0, parent.clientWidth - img.clientWidth);
      const maxY = Math.max(0, parent.clientHeight - img.clientHeight);

      if (x <= 0) {
        x = 0;
        dx = Math.abs(dx || velocityX || 2);
      }

      if (x >= maxX) {
        x = maxX;
        dx = -Math.abs(dx || velocityX || 2);
      }

      if (y <= 0) {
        y = 0;
        dy = Math.abs(dy || velocityY || 2);
      }

      if (y >= maxY) {
        y = maxY;
        dy = -Math.abs(dy || velocityY || 2);
      }

      img.style.transform = `translate(${x}px, ${y}px)`;
    };

    const animate = () => {
      x += dx;
      y += dy;

      keepInside();

      animationId = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => {
      const maxX = Math.max(0, parent.clientWidth - img.clientWidth);
      const maxY = Math.max(0, parent.clientHeight - img.clientHeight);

      x = Math.min(Math.max(x, 0), maxX);
      y = Math.min(Math.max(y, 0), maxY);

      if (x === 0) dx = Math.abs(dx || 2);
      if (x === maxX) dx = -Math.abs(dx || 2);

      if (y === 0) dy = Math.abs(dy || 2);
      if (y === maxY) dy = -Math.abs(dy || 2);

      img.style.transform = `translate(${x}px, ${y}px)`;
    });

    resizeObserver.observe(parent);
    resizeObserver.observe(img);

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [startX, startY, velocityX, velocityY]);

  return (
    <div ref={imgRef} className={`absolute ${className}`}>       
        <Image src={src} alt={alt} fill className="object-contain" />
    </div>
  );
}
