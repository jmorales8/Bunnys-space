import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { SmoothSvgArch } from "./SmoothSvgArch";
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
  return (
    <>
      <div className="navBar__long">
        <Link to="/home"><img src="images/Pillow_Logo.png" alt="pill_logo" className="navBar__long__logo"/></Link>
        <div className="navBar__long__content">
          {navButtons.map((button) => (
            <Link
              to={button.path}
              className={
                isDarkMode ? "navBar__long__button__night" : "navBar__long__button"
              }
              key={button.label}
            >
              <span className="navBar__long__button__label">{button.label}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="navBar__short">
        <Link to="/home"><img src="images/Pillow_Logo.png" alt="pill_logo" className="navBar__short__logo"/></Link>
        <SidebarOverlay />
      
      </div>
      <SmoothSvgArch colorMode={isDarkMode} />
    </>
  );
}
