import React from "react";
interface AuroraTextProps {
  text: string;
}

export function AuroraText({text}: AuroraTextProps) {
  return (
    <div className="loading-wrapper">
      <div className="loading-text">{text}</div>
    </div>
  );
};
