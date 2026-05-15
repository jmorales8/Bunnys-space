"use client";

import { useEffect, useState } from "react";

type FlowDirection = "up" | "down" | "left" | "right";

type FlowPanelProps = {
  direction?: FlowDirection;
  delay?: number;
  children: React.ReactNode;
};

export default function FlowPanel({
  direction = "up",
  delay = 300,
  children,
}: FlowPanelProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const hiddenClass = {
    up: "translate-y-16 opacity-0",
    down: "-translate-y-16 opacity-0",
    left: "translate-x-16 opacity-0",
    right: "-translate-x-16 opacity-0",
  };

  return (
    <div
      className={`
        transition-all duration-700 ease-out
        ${visible ? "translate-x-0 translate-y-0 opacity-100" : hiddenClass[direction]}
      `}
    >
      {children}
    </div>
  );
}
