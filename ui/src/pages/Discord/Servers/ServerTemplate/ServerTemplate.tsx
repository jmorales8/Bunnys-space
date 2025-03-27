import { useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";

export interface DiscordDataProps {
  serverID: number;
  title: string;
  description: string;
  joinLink: string;
}

export function ServerTemplate(props: DiscordDataProps) {
  const { serverID, title, description, joinLink } = props;
  const imageURL = `/discord/img/${serverID}`;
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("DarkMode must be used within a ThemeProvider");
  }
  const { isDarkMode } = themeContext;
  return (
    <div className="server">
      <div className="server__title">{title}</div>
      <div className="server__img">
        <img src={imageURL} alt="server_img" />
      </div>
      <div className="server__desc">{description}</div>
      <div className="server__button__container">
        <a
          className={isDarkMode ? "server__button__night" : "server__button"}
          href={`https://discord.com/invite/${joinLink}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Join here :3
        </a>
      </div>
    </div>
  );
}
