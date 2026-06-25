"use client";

import Image from "next/image";
import FlowModal from "../Modal/modal";
import { NavBar } from "../NavBar/NavBar";
import { FirstRow } from "../../home/FirstRow";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed inset-0 -z-10">
        <Image
          src="/cloud_bg.png"
          alt="Background"
          fill
          priority
          quality={75}
          sizes="100vw"
          className="object-cover nonImageHover"
        />
      </div>

      <main>
        <div className="flex justify-center p-10">
          <FlowModal direction="down" width={1250}>
            <NavBar />
            <FirstRow />
            {children}
          </FlowModal>
        </div>
      </main>
    </>
  );
}
