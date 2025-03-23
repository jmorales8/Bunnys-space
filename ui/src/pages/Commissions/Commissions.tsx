import { useContext } from "react";
import "./commissions.scss";
import { ThemeContext } from "../../context/ThemeContext";
const vtubers = [
  "Pillow",
  "AkumaMiko",
  "Anime4Days",
  "Cecilia",
  "BelleCoyote",
  "Celeste",
  "Goro",
  "Liari",
  "Hanakyo",
  "Kyoharu",
  "MissMidgely",
  "MissMaple",
  "KillahOrki",
  "Sprixer",
  "Misti",
  "Yozzy",
  "Natkiki",
  "RelariaStorm",
  "Sugie",
  "YukiShima",
];
export function Commissions() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("DarkMode must be used within a ThemeProvider");
  }
  const { isDarkMode } = themeContext;
  return (
    <div className="commissions">
      {vtubers.map((vtuber) => (
        <div className="border" key={vtuber}>
          <img
            className={isDarkMode ? "commissions__vtubers__night" : "commissions__vtubers"}
            alt={vtuber}
            src={`/images/com-vtubers/${vtuber}.png`}
          />
        </div>
      ))}
    </div>
  );
}
