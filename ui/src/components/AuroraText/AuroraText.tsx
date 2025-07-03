import React from "react";
interface AuroraTextProps {
  text: string;
  color1: string;
  color2: string;
  color3: string;
}
  // background: linear-gradient(90deg, $light-bg-color14, $light-bg-color7, $light-bg-color14) -100% / 200%;

export function AuroraText({text, color1, color2, color3}: AuroraTextProps) {
  return (
    <div className="loading-wrapper">
      <div className="loading-text"
      style={{
        background: `linear-gradient(45deg, ${color1}, ${color2}, ${color3}) -100% / 200%`,
        color:  "transparent",
        backgroundClip: "text",
      }}
      >{text}</div>
    </div>
  );
};
