"use client";

import { useEffect, useState } from "react";

let hasAnimatedOnce = false;

type FlowDirection = "up" | "down" | "left" | "right";

type FlowPanelProps = {
  direction?: FlowDirection;
  delay?: number;
  children: React.ReactNode;
  width?: number;
  height?: number;
};

export default function FlowModal({
  direction = "down",
  delay = 300,
  children,
  width = 150,
  height = 150,
}: FlowPanelProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (hasAnimatedOnce) {
      setVisible(true);
      return;
    }

    const timer = setTimeout(() => {
      hasAnimatedOnce = true;
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
      style={{
        width: `${width}px`,
        minHeight: `${height}px`,
      }}
      className={`
        transition-all duration-700 ease-out
        overflow-y-auto max-h-none
        ${
          visible
            ? "translate-x-0 translate-y-0 opacity-100"
            : hiddenClass[direction]
        }
      `}
    >
      {children}
    </div>
  );
}
