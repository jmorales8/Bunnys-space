import { ImgsOnNavBar } from "../components/ImgsOnNavBar/ImgsOnNavBar";
import { Link } from "react-router-dom";

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
  return (
    <div className="navBar">
      <span className="navBar__pictures">
        <ImgsOnNavBar />
      </span>
      <span className="navBar__content">
        {navButtons.map((button) => (
          <Link key={button.path} to={button.path} className="navBar__button">
            {button.label}
          </Link>
        ))}
      </span>
    </div>
  );
}
