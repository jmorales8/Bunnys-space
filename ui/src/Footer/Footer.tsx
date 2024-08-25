import { useContext } from "react";
import { NightModeButton } from "../components/NightModeButton/NightModeButton";
import { ThemeContext } from "../context/ThemeContext";
interface FooterButtons {
  label: string;
  path: string;
}

const footerButtons: FooterButtons[] = [{ label: "Q&A", path: "/q-and-a" }];
export function Footer() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("DarkMode must be used within a ThemeProvider");
  }
  const { isDarkMode } = themeContext;
  return (
    <footer className={isDarkMode ? "footer__night" : "footer"}>
      <a className="footer__img" href="/home">
        <img src="/images/peachy.png" width="55" height="55" alt="peach" />
      </a>
      {footerButtons.map((button) => {
        return (
          <a className={isDarkMode ? "footer__buttons__night" : "footer__buttons"} href={button.path} key={button.label}>
            {button.label}
          </a>
        );
      })}

      <NightModeButton />
    </footer>
  )
}
