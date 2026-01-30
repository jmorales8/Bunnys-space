"use client";

export function SvgArch() {
  return (
    <>
      {/* LONG curved background (hidden <1060) */}
      <svg
        viewBox="0 0 100 25"
        preserveAspectRatio="none"
        className="header__svg__long max-[1059px]:hidden w-full h-[calc(7.5vw+194px)]"
      >
        <path
          className="transition-[fill] duration-[400ms] fill-[var(--bg-secondary)]"
          d="M0,25 Q50,15 100,25 L100,0 L0,0 Z"
        />
      </svg>

      {/* LONG fixed top arch (hidden <1060) */}
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
        className="header__svg__short min-[1060px]:hidden w-full h-[calc(0.5vw+199.6px)]"
      >
        <path
          className="transition-[fill] duration-[400ms] fill-[var(--bg-secondary)]"
          d="M0,25 Q50,10 100,25 L100,0 L0,0 Z"
        />
      </svg>

      {/* SHORT moveable bar background (hidden >=1060) */}
      <div className="min-[1060px]:hidden fixed left-0 top-0 z-[2] h-[120px] w-full bg-[var(--bg-secondary)] transition-[background-color] duration-[400ms]" />

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
