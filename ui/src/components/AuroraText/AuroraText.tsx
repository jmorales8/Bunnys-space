interface AuroraTextProps {
  text: string;
  color1: string;
  color2: string;
  color3: string;
}

export function AuroraText({text, color1, color2, color3}: AuroraTextProps) {
  return (
    <div className="loading-wrapper">
      <div className="loading-text"
        style={{
          background: `linear-gradient(45deg, ${color1}, ${color2}, ${color3}) -100% / 200%`,
          color:  "transparent",
          backgroundClip: "text",
        }}>{text}</div>
    </div>
  );
};
