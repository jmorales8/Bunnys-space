import { Link } from "react-router-dom";
import { NightModeButton } from "../components/NightModeButton/NightModeButton";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { HolograpicButton } from "../components/HolographicButton/HolographicButton";

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
    <>
      <footer className={isDarkMode ? "footer__long__night" : "footer__long"}>
        <Link className="footer__img__long" to="/home">
          <img src="/images/peachy.png" width="55" height="55" alt="peach" />
        </Link>
        <div className="footer__group__long">
          <div className="footer__group__buttons__long">
            {footerButtons.map((button) => {
              return (
                <Link
                  to={button.path}
                  key={button.label}
                  style={{textDecoration: "none"}}
                >
                  <HolograpicButton label={button.label} state={isDarkMode} />
                </Link>
              )
            })}
          </div>
          <NightModeButton />
        </div>
      </footer>
      <footer className={isDarkMode ? "footer__short__night" : "footer__short"}>
        <span className="footer__row__imgs">
          <Link className="footer__img__short" to="/home">
            <img src="/images/peachy.png" width="55" height="55" alt="peach" />
          </Link>
          <NightModeButton />
        </span>

        {[...Array(Math.ceil(footerButtons.length / 2))].map((_, i) => {
          const group = footerButtons.slice(i * 2, i * 2 + 2);
          return (
            <div className="footer__row__buttons" key={i}>
              {group.map((button) => (
                <Link
                  to={button.path}
                  key={button.label}
                  style={{textDecoration: "none"}}
                >
                  <HolograpicButton label={button.label} state={isDarkMode} />
                </Link>
              ))}
            </div>
          );
        })}
      </footer>
    </>
  )
}