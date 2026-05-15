"use client";

import Image from "next/image";

import { useState } from "react";
import FlowModal from "./components/modal/modal";
export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const items = ["Card One", "Card Two", "Card Three"];

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
      <main className="p-8">
        <FlowModal direction="up">
          <>
          I fardedd
          </>
        </FlowModal>
      </main>
    </div>
  );
}
