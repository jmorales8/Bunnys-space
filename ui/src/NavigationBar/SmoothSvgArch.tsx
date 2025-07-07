import { useEffect, useState } from "react";

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
  const [view, setView] = useState(false);
  const scale = useWindowScale();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      const newHeight = Math.max(250, Math.min(500, width / 4));
      setSvgHeight(newHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  let height;
  if(window.innerWidth < 1060) {
    height = scale + 200
  } else {
    height = 15 * scale + 200
  }
  return (
    <svg
      viewBox="0 0 100 25"
      preserveAspectRatio="none"
      style={{
        width: "100%",
        height: height
      }}
    >
      <path className={colorMode ? "navBar__long__background__night" : "navBar__long__background"} d={`M0,25 Q50,10 100,25 L100,0 L0,0 Z`} />
      <path className={colorMode ? "navBar__short__background__night" : "navBar__short__background"} d={`M0,25 Q50,3 100,25 L100,0 L0,0 Z`} />
    </svg>
  );
};
