import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { SvgArch } from "./SvgArch";
import { SidebarOverlay } from "../Sidebar/Sidebar";

interface NavButtons {
  label: string;
  path: string;
}

export const navButtons: NavButtons[] = [
  { label: "Home", path: "/home" },
  { label: "Lore", path: "/lore" },
  { label: "Commissions", path: "/commissions" },
  { label: "Twitch", path: "/twitch" },
  { label: "Discord", path: "/discord" },
];

export function NavigationBar() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("DarkMode must be used within a ThemeProvider");
  }
  const { isDarkMode } = themeContext;
    const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div className="navBar__long"
        style={{
          flexDirection: `${scrollY <= 100 ? "column" : "row"}`,
          position: `${scrollY <= 100 ? "absolute" : "fixed"}`,
          }}>
        <Link to="/home"><img src="images/Pillow_Logo.png" alt="pill_logo" className="navBar__long__logo"
          style={{
            width: `${scrollY <= 100 ? "175px" : "150px"}`,
          }} /></Link>
        <div className="navBar__long__content">
          {navButtons.map((button) => (
            <Link
              to={button.path}
              className={
                isDarkMode ? "navBar__long__button__night" : "navBar__long__button"
              }
              key={button.label}
            style={{
              paddingLeft: `${scrollY <= 100 ? "69px" : "69px"}`,
              paddingRight: `${scrollY <= 100 ? "69px" : "69px"}`
            }}
            >
              <span className="navBar__long__button__label">{button.label}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="navBar__short">
        <Link to="/home"><img src="images/Pillow_Logo.png" alt="pill_logo" className="navBar__short__logo" /></Link>

        <SidebarOverlay />
      </div>
      <SvgArch colorMode={isDarkMode} />
    </>
  );
}
