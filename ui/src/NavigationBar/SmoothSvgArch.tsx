import React, { useEffect, useState } from "react";

export function useWindowScale(): number {
  const [scale, setScale] = useState(0);

  const calculateScale = (width: number): number => {
    return 0.005 * width - 0.4;
  };

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      setScale(calculateScale(width));
    };

    window.addEventListener('resize', updateScale);
    updateScale(); // initial call

    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return scale;
}
interface SmoothSvgArch {
  colorMode: boolean
}
export const SmoothSvgArch = ({colorMode}: SmoothSvgArch) => {
  const [svgHeight, setSvgHeight] = useState(500);
  const scale = useWindowScale();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      // Example mapping: wider screens → taller arch
      const newHeight = Math.max(250, Math.min(500, width / 4));
      setSvgHeight(newHeight);
    };

    handleResize(); // Initial set
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const height = 15 * scale + 250
  return (
    <svg
      viewBox="0 0 100 25"
      preserveAspectRatio="none"
      style={{
        width: "100%",
        height: height
      }}
    >
      <path className={colorMode ? "navBar__background__night" : "navBar__background"} d={`M0,25 Q50,5 100,25 L100,0 L0,0 Z`} />
    </svg>
  );
};
