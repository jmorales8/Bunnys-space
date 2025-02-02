import { Link } from "react-router-dom";
import { NightModeButton } from "../components/NightModeButton/NightModeButton";
interface FooterButtons {
  label: string;
  path: string;
}

const footerButtons: FooterButtons[] = [
  { label: "Q&A", path: "/Q-and-A" },
  { label: "Q&A", path: "/Q-and-A" },
  { label: "Q&A", path: "/Q-and-A" },
  { label: "Q&A", path: "/Q-and-A" },
  { label: "Q&A", path: "/Q-and-A" },
  { label: "Q&A", path: "/Q-and-A" },
];
export function Footer() {
  return (
    <footer className="footer">
      <Link className="footer__img" to="/home">
        <img src="/images/peachy.png" width="55" height="55" alt="peach"/>
      </Link>
      <div className="footer__group">
        <div className="footer__group__buttons">
          {footerButtons.map((button) => {
            return (
              <Link className="footer__button" to={button.path} key={button.label}>
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