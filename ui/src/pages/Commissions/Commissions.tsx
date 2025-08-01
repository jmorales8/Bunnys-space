import { useContext, useState } from "react";
import "./commissions.scss";
import { ThemeContext } from "../../context/ThemeContext";
const vtubers = [
  "Pillow", "akuma_miko", "anime4days",
  "Atlamoon", "Azura", "BelleCoyote",
  "Cinnafaun", "Feyre", "Fuoca",
  "Hanakyo", "Hazy", "Maxxi",
  "Miino", "Miss_Maple", "Nico",
  "Nikki", "Aira", "Goro",
  "Sasi", "sunnii" , "YukiShima",
  "Papa_Lemon", "Phoenyx", "Reila",
];
export function Commissions() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("DarkMode must be used within a ThemeProvider");
  }
  const { isDarkMode } = themeContext;
  const [openedVtuber, setOpenedVtuber] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
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
          <div
            className="commissions__modal__content"
            onClick={(e) => e.stopPropagation()}
          >
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
