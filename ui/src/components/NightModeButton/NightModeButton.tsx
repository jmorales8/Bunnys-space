import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export function NightModeButton() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("DarkMode must be used within a ThemeProvider");
  }
  const { isDarkMode, toggleDarkMode } = themeContext;
  return (
    <img
      onClick={toggleDarkMode}
      className="night__mode__button"
      src={`/images/${isDarkMode ? "The_Sun_SE" : "The_Moon_SE"}.png`}
      alt="nightmodeButton"
    />
  );
}
