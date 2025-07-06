import { ImgsOnNavBar } from "../components/ImgsOnNavBar/ImgsOnNavBar";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useEffect, useState } from "react";
import { SmoothSvgArch } from "./SmoothSvgArch";

interface NavButtons {
  label: string;
  path: string;
}

const navButtons: NavButtons[] = [
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
      <div className="navBar">
        <div className="navBar__content">
          {navButtons.map((button) => (
            <Link
              to={button.path}
              className={isDarkMode ? "navBar__button__night" : "navBar__button"}
              key={button.label}
            >
              <span className="navBar__button__label">
                {button.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <SmoothSvgArch colorMode={isDarkMode}/>
    </>
  );
}
