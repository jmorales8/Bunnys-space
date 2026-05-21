"use client";

import Image from "next/image";
import FlowModal from "./components/modal/modal";
import { FirstRow } from "./home/FirstRow";

export default function Home() {
  return (
    <div>
      <div className="fixed inset-0 -z-10">
        <Image
          src="/bg.webp"
          alt="Background"
          fill
          priority
          quality={80}
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <main>
        <div className="w-screen h-screen flex justify-center p-10">
          <FlowModal direction="up" width={1250}>
              <FirstRow />
          </FlowModal>
        </div>
      </main>
    </div>
  );
}
