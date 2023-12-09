interface NavButtons {
  label: string;
  path: string;
}

const navButtons: NavButtons[] = [
  { label: "Home", path: "/home" },
  { label: "Twitch", path: "/twitch" },
  { label: "Discord", path: "/discord" },
  { label: "Pornhub", path: "/pornhub" },
];

export function NavigationBar() {
  return (
    <div className="navBar">
      {navButtons.map((button) => {
        return (
          <a href={button.path} className="navBar__button" key={button.label}>
            {button.label}
          </a>
        )
      })}
    </div>
  )
}
