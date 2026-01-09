"use client";

import "./commission/commission.css";
import { useState } from "react";
import { LinkSplit } from "./components/LinkSplit/LinkSplit";

const vtubers = [
  "Pillow",
  "akuma_miko",
  "anime4days",
  "Atlamoon",
  "Azura",
  "BelleCoyote",
  "Cinnafaun",
  "Feyre",
  "Fuoca",
  "Hanakyo",
  "Hazy",
  "Maxxi",
  "Miino",
  "Miss_Maple",
  "Nico",
  "Nikki",
  "Aira",
  "Goro",
  "Sasi",
  "sunnii",
  "YukiShima",
  "Papa_Lemon",
  "Phoenyx",
  "Reila",
];

export default function Commissions() {
  const [openedVtuber, setOpenedVtuber] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenedVtuber = (vtuber: string) => {
    setOpenedVtuber(vtuber);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Apply row */}
      <span className="flex justify-center mb-2">
        <img
          src="/images/erwin_goober.gif"
          alt="erwin"
          className="w-[50px] pr-[10px]"
        />
        <LinkSplit text=" Want a commission? " href="commission" />
        <img
          src="/images/erwin_goober.gif"
          alt="erwin"
          className="w-[50px] pl-[10px]"
        />
      </span>

      {/* Grid */}
      <div
        className="
          grid justify-items-center items-center gap-5 mb-[100px]
          transition-[transform,opacity] duration-[400ms]
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          2xl:grid-cols-4
        "
      >
        {vtubers.map((vtuber) => (
          <div
            key={vtuber}
            className={[
              "com-border", // local CSS for glow hover
              "my-[10px]",
              "border-[3px] border-double border-black",
              "rounded-[70px]",
            ].join(" ")}
          >
            <img
              alt={vtuber}
              src={`/images/com-vtubers/${vtuber}.png`}
              onClick={() => handleOpenedVtuber(vtuber)}
              className="
                block relative z-[1]
                rounded-[60px]
                w-[300px] p-[15px] m-0
                cursor-pointer object-contain
                transition-transform duration-[400ms]
                hover:scale-110
                max-[500px]:w-full max-[500px]:max-w-[325px] max-[500px]:h-auto
              "
            />
          </div>
        ))}

        {/* Modal */}
        {open && (
          <div
            onClick={handleClose}
            className="
              fixed inset-0 z-[1000]
              flex items-center justify-center
              bg-black/60
            "
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="com-modal-content max-h-[90vh] max-w-[90vw]"
            >
              <img
                src={`/images/com-vtubers/${openedVtuber}.png`}
                alt={openedVtuber}
                className="
                  h-[80vh] w-auto
                  rounded-xl
                  shadow-[0_0_20px_rgba(255,255,255,0.2)]
                "
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
