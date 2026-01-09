"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SvgArch } from "./SvgArch";

interface NavButton {
  label: string;
  path: string;
}

export const navButtons: NavButton[] = [
  { label: "Twitch", path: "/twitch" },
  { label: "Discord", path: "/discord" },
];

type AuthState = "loading" | "authenticated" | "anonymous";

export default function NavigationBar() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrolled = scrollY > 100;

  return (
    <>
      {/* LONG NAV (>= 1060px) */}
      <div
        className={[
          "max-[1059px]:hidden",
          "z-[3] w-full items-center bg-[var(--bg-secondary)] transition-all duration-[400ms]",
          scrolled ? "fixed top-0 flex flex-row" : "absolute top-0 flex flex-col",
        ].join(" ")}
      >
        <Link href="/">
          <img
            src="/images/Pillow_Logo.png"
            alt="pill_logo"
            className="mt-[10px] cursor-pointer"
            style={{ width: scrolled ? "150px" : "175px" }}
          />
        </Link>

        <div className="flex justify-around">
          {navButtons.map((button, i) => (
            <Link
              key={button.label}
              href={button.path}
              className={[
                "group relative flex flex-col items-center justify-center",
                "py-5 px-[69px]",
                "bg-transparent no-underline",
                "text-lg font-bold text-black [font-family:cursive]",
              ].join(" ")}
            >
              {/* Divider line for all but first */}
              {i !== 0 && (
                <span
                  className={[
                    "pointer-events-none absolute left-0 top-1/2 -translate-y-1/2",
                    "h-[25px] w-px bg-black/60",
                  ].join(" ")}
                />
              )}

              {/* Label hover opacity */}
              <span className="text-[var(--text-secondary)] pointer-events-none transition-opacity duration-[400ms] group-hover:opacity-50">
                {button.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* SHORT NAV (< 1060px) */}
      <div className="min-[1060px]:hidden fixed top-[5px] left-1/2 z-[4] -translate-x-1/2 flex items-center justify-center">

        <Link href="/home">
          <img
            src="/images/Pillow_Logo.png"
            alt="pill_logo"
            className="z-[4] w-[150px] cursor-pointer"
          />
        </Link>
      </div>
      <SvgArch />
    </>
  );
}
