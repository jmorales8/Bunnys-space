import { useContext, useEffect, useState } from "react";
import { ServerTemplate } from "./Servers/ServerTemplate/ServerTemplate";
import { DiscordDataProps } from "./Servers/ServerTemplate/ServerTemplate";
import { ThemeContext } from "../../context/ThemeContext";

export function Discord() {
  const [loading, setLoading] = useState(true);
  const [discordData, setDiscordData] = useState<DiscordDataProps[]>([]);
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("DarkMode must be used within a ThemeProvider");
  }
  const { isDarkMode } = themeContext;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/discord");
        const result = await response.json();
        console.log(result.Discord.length)
        setDiscordData(result.Discord);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {!loading ? (
        <div className="discord">
          <div className="discord__servers">
            {discordData.map((data) => (
              <div className={isDarkMode ? "discord__server__night" : "discord__server"}>
                <ServerTemplate key={data.serverID} serverID={data.serverID} title={data.title} description={data.description} joinLink={data.joinLink}/>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
