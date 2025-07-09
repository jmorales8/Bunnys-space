import { useContext, useState } from "react";
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
  "YukiShima",
  "Sugie",
];
export function Commissions() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("DarkMode must be used within a ThemeProvider");
  }
  const { isDarkMode } = themeContext;
  const [openedVtuber, setOpenedVtuber] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpenedVtuber = (openedVtuber: string) => {
    setOpenedVtuber(openedVtuber);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <div className="commissions">
      {vtubers.map((vtuber) => (
        <div className={isDarkMode ? "border__night" : "border"} key={vtuber}>
          <img
            className="commissions__vtubers"
            alt={vtuber}
            src={`/images/com-vtubers/${vtuber}.png`}
            onClick={() => handleOpenedVtuber(vtuber)}
          />
        </div>
      ))}
{open && (
        <div className="commissions__modal" onClick={handleClose}>
          <div className="commissions__modal__content" onClick={(e) => e.stopPropagation()}>
            <img
              src={`/images/com-vtubers/${openedVtuber}.png`}
              alt={openedVtuber}
              className="commissions__modal__image"
            />
          </div>
        </div>
      )}
    </div>
  );
}
