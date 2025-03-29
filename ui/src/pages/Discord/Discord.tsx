import { useContext, useEffect, useState } from "react";
import { ServerTemplate } from "./Servers/ServerTemplate/ServerTemplate";
import { DiscordDataProps } from "./Servers/ServerTemplate/ServerTemplate";
import { ThemeContext } from "../../context/ThemeContext";
import { useQuery } from "@tanstack/react-query";

export function Discord() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["discServers"],
    queryFn: () => fetch("/discord").then((res) => res.json()),
    staleTime: 1000 * 60 * 5,
  });

  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("DarkMode must be used within a ThemeProvider");
  }

  const { isDarkMode } = themeContext;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;
  return (
    <>
      <div className="discord">
        <div className="discord__servers">
          {data.Discord.map((data: DiscordDataProps) => (
            <div
              className={isDarkMode ? "discord__server__night" : "discord__server"} key={data.serverID}>
              <ServerTemplate
                key={data.serverID}
                serverID={data.serverID}
                title={data.title}
                description={data.description}
                joinLink={data.joinLink}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
