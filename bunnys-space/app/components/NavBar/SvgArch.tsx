"use client";

import { useEffect, useState, useMemo } from "react";

export function useWindowWidth(): number {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return width;
}

export function useWindowScale(): number {
  const width = useWindowWidth();

  // your formula: 0.005 * width - 0.4
  return 0.005 * width - 0.4;
}
export function SvgArch() {
  const scale = useWindowScale();
  const width = useWindowWidth();

  const height = useMemo(() => {
    if (!width) return 200; // initial render safety
    return width < 1060 ? scale + 200 : 15 * scale + 200;
  }, [scale, width]);

  return (
    <>
      {/* LONG curved background (hidden <1060) */}
      <svg
        viewBox="0 0 100 25"
        preserveAspectRatio="none"
        style={{ width: "100%", height }}
        className="header__svg__long max-[1059px]:hidden"
      >
        <path
          className="transition-[fill] duration-[400ms] fill-[var(--bg-secondary)]"
          d="M0,25 Q50,15 100,25 L100,0 L0,0 Z"
        />
      </svg>

      {/* LONG fixed top arch (always there but hidden <1060) */}
      <svg
        viewBox="0 0 100 25"
        preserveAspectRatio="none"
        className="fixed left-0 top-0 w-full h-[125px] z-[2] max-[1059px]:hidden"
      >
        <path
          className="transition-[fill] duration-[400ms] fill-[var(--bg-secondary)]"
          d="M0,25 Q50,-25 100,25 L100,0 L0,0 Z"
        />
      </svg>

      {/* SHORT curved background (hidden >=1060) */}
      <svg
        viewBox="0 0 100 25"
        preserveAspectRatio="none"
        style={{ width: "100%", height }}
        className="header__svg__short min-[1060px]:hidden"
      >
        <path
          className="transition-[fill] duration-[400ms] fill-[var(--bg-secondary)]"
          d="M0,25 Q50,10 100,25 L100,0 L0,0 Z"
        />
      </svg>

      {/* SHORT moveable bar background (hidden >=1060) */}
      <div
        className="min-[1060px]:hidden fixed left-0 top-0 z-[2] h-[120px] w-full bg-[var(--bg-secondary)] transition-[background-color] duration-[400ms]"
      />
      {/* SHORT fixed top arch (hidden >=1060) */}
      <svg
        viewBox="0 0 100 25"
        preserveAspectRatio="none"
        className="header__svg__short min-[1060px]:hidden fixed left-0 top-0 w-full h-[125px] z-[2]"
      >
        <path
          className="transition-[fill] duration-[400ms] fill-[var(--bg-secondary)]"
          d="M0,25 Q50,-25 100,25 L100,5 L0,0 Z"
        />
      </svg>
    </>
  );
}