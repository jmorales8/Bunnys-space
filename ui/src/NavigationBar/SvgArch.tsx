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

    window.addEventListener("resize", updateScale);
    updateScale(); // initial call

    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return scale;
}
interface SmoothSvgArch {
  colorMode: boolean;
}
export const SvgArch = ({ colorMode }: SmoothSvgArch) => {
  const scale = useWindowScale();

  let height;
  if (window.innerWidth < 1060) {
    height = scale + 200;
  } else {
    height = 15 * scale + 200;
  }
  return (
    <>
      <svg
        viewBox="0 0 100 25"
        preserveAspectRatio="none"
        style={{width: "100%", height: height}}
        className="header__svg__long"
      >
        <path
          className={
            colorMode
              ? "navBar__long__background__night"
              : "navBar__long__background"
          }
          d={`M0,25 Q50,15 100,25 L100,0 L0,0 Z`}
        />
      </svg>
      <svg
        viewBox="0 0 100 25"
        preserveAspectRatio="none"
        style={{width: "100%", height: "125px", position: "fixed"}}
      >
        <path
          className={
            colorMode
              ? "navBar__long__background__night"
              : "navBar__long__background"
          }
          d={`M0,25 Q50,-25 100,25 L100,0 L0,0 Z`}
        />
      </svg>
      <svg
        viewBox="0 0 100 25"
        preserveAspectRatio="none"
        style={{width: "100%",height: height}}
        className="header__svg__short"
      >
        <path
          className={
            colorMode
              ? "navBar__short__background__night"
              : "navBar__short__background"
          }
          d={`M0,25 Q50,10 100,25 L100,0 L0,0 Z`}
        />
      </svg>
      <svg
        viewBox="0 0 100 25"
        preserveAspectRatio="none"
        style={{width: "100%", height: "290px", position: "fixed", zIndex: "2"}}
        className="header__svg__short"
      >
        <path
          className={
            colorMode
              ? "navBar__short__background__night"
              : "navBar__short__background"
          }
          d="M0,10 L100,10 L100,0 L0,0 Z"
        />
      </svg>
      <svg
        viewBox="0 0 100 25"
        preserveAspectRatio="none"
        style={{width: "100%", height: "125px", position: "fixed", zIndex: "2"}}
        className="header__svg__short"
      >
        <path
          className={
            colorMode
              ? "navBar__short__background__night"
              : "navBar__short__background"
          }
          d={`M0,25 Q50,-25 100,25 L100,5 L0,0 Z`}
        />
      </svg>
    </>
  );
};
