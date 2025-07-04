import { Link } from "react-router-dom";
import { NightModeButton } from "../components/NightModeButton/NightModeButton";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

interface FooterButtons {
  label: string;
  path: string;
}

const footerButtons: FooterButtons[] = [
  { label: "This", path: "/Q-and-A" },
  { label: "part o", path: "/Q-and-A" },
  { label: "Q&A", path: "/Q-and-A" },
];
export function Footer() {
 const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("DarkMode must be used within a ThemeProvider");
  }
  const { isDarkMode } = themeContext;

  return (
    <footer className={isDarkMode ? "footer__night" : "footer"}>
      <Link className="footer__img" to="/home">
        <img src="/images/peachy.png" width="55" height="55" alt="peach"/>
      </Link>
      <div className="footer__group">
        <div className="footer__group__buttons">
          {footerButtons.map((button) => {
            return (
              <Link className={isDarkMode ? "footer__button__night" : "footer__button"} to={button.path} key={button.label}>
                {button.label}
              </Link>
            )
          })}
        </div>
        <NightModeButton />
      </div>
    </footer>
  )
}