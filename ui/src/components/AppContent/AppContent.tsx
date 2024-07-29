import { ReactNode, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
export function AppContent({children}: {children: ReactNode}) {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("DarkMode must be used within a ThemeProvider");
  }
  const { isDarkMode } = themeContext;
  console.log(isDarkMode)
  return(
    <div className={isDarkMode ? "app__content__night" : "app"}>
      {children}
    </div>
  )
}