import { ImgsOnNavBar } from "../components/ImgsOnNavBar/ImgsOnNavBar";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
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
    <div className="navBar">
      <span className="navBar__pictures">
        <ImgsOnNavBar />
      </span>
      <span className={isDarkMode ? "navBar__content__night" : "navBar__content"}>
        {navButtons.map((button) => {
          return (
            <Link
              to={button.path}
              className={isDarkMode ? "navBar__button__night" : "navBar__button"}
              key={button.label}
            >
              {button.label}
            </Link>
          );
        })}
      </span>
    </div>
  );
}
