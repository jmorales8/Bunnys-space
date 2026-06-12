"use client";

import Image from "next/image";
import FlowModal from "../components/modal/modal";
import { FirstRow } from "./FirstRow";
import { NavBar } from "../components/NavBar/NavBar";
import { SecondRow } from "./SecondRow";

export default function Home() {
  return (
    <div>
      <div className="fixed inset-0 -z-10">
        <Image
          src="/bg.webp"
          alt="Background"
          fill
          priority
          quality={75}
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <main>
        <div className="flex justify-center p-10">
          <FlowModal direction="down" width={1250}>
            <NavBar />
            <FirstRow />
            <SecondRow />
          </FlowModal>
        </div>
      </main>
    </div>
  );
}
