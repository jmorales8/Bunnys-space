"use client";

import React, { useEffect, useRef } from "react";
import styles from "./liquidButton.module.css";

interface LiquidButtonProps {
  text?: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function LiquidButton({
  text = "Liquid Button 💧",
  href = "#",
  onClick,
  disabled = false,
}: LiquidButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (disabled) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pointsA: Point[] = [];
    const pointsB: Point[] = [];

    const points = 8;
    const viscosity = 20;
    const mouseDist = 70;
    const damping = 0.05;

    const colorStart = "#ff007f";
    const colorEnd = "#ff6ec7";
    const fillColor = "rgb(242, 204, 210)";

    let animationId = 0;
    let speedTimer: ReturnType<typeof setTimeout>;

    let mouseX = 0;
    let mouseY = 0;
    let relMouseX = 0;
    let relMouseY = 0;
    let mouseLastX = 0;
    let mouseLastY = 0;
    let mouseDirectionX = 0;
    let mouseDirectionY = 0;
    let mouseSpeedX = 0;
    let mouseSpeedY = 0;

    class Point {
      x: number;
      y: number;
      ix: number;
      iy: number;
      vx = 0;
      vy = 0;
      cx1 = 0;
      cy1 = 0;
      level: number;

      constructor(x: number, y: number, level: number) {
        this.x = this.ix = 50 + x;
        this.y = this.iy = 50 + y;
        this.level = level;
      }

      move() {
        this.vx += (this.ix - this.x) / (viscosity * this.level);
        this.vy += (this.iy - this.y) / (viscosity * this.level);

        const dx = this.ix - relMouseX;
        const dy = this.iy - relMouseY;
        const relDist = 1 - Math.sqrt(dx * dx + dy * dy) / mouseDist;

        if (
          (mouseDirectionX > 0 && relMouseX > this.x) ||
          (mouseDirectionX < 0 && relMouseX < this.x)
        ) {
          if (relDist > 0 && relDist < 1) {
            this.vx = (mouseSpeedX / 4) * relDist;
          }
        }

        this.vx *= 1 - damping;
        this.x += this.vx;

        if (
          (mouseDirectionY > 0 && relMouseY > this.y) ||
          (mouseDirectionY < 0 && relMouseY < this.y)
        ) {
          if (relDist > 0 && relDist < 1) {
            this.vy = (mouseSpeedY / 4) * relDist;
          }
        }

        this.vy *= 1 - damping;
        this.y += this.vy;
      }
    }

    const updateMouseDirection = (e: MouseEvent) => {
      mouseDirectionX = mouseX < e.pageX ? 1 : mouseX > e.pageX ? -1 : 0;
      mouseDirectionY = mouseY < e.pageY ? 1 : mouseY > e.pageY ? -1 : 0;

      mouseX = e.pageX;
      mouseY = e.pageY;

      const rect = container.getBoundingClientRect();

      relMouseX = mouseX - rect.left - window.scrollX + 50;
      relMouseY = mouseY - rect.top - window.scrollY + 50;
    };

    const measureMouseSpeed = () => {
      mouseSpeedX = mouseX - mouseLastX;
      mouseSpeedY = mouseY - mouseLastY;

      mouseLastX = mouseX;
      mouseLastY = mouseY;

      speedTimer = setTimeout(measureMouseSpeed, 50);
    };

    const addPoints = (x: number, y: number) => {
      pointsA.push(new Point(x, y, 1));
      pointsB.push(new Point(x, y, 2));
    };

    const initPoints = () => {
      pointsA.length = 0;
      pointsB.length = 0;

      const width = container.offsetWidth;
      const height = container.offsetHeight;

      canvas.width = width + 100;
      canvas.height = height + 100;

      const x = height / 2;

      for (let j = 1; j < points; j++) {
        addPoints(x + ((width - height) / points) * j, 0);
      }

      addPoints(width - height / 5, 0);
      addPoints(width + height / 10, height / 2);
      addPoints(width - height / 5, height);

      for (let j = points - 1; j > 0; j--) {
        addPoints(x + ((width - height) / points) * j, height);
      }

      addPoints(height / 5, height);
      addPoints(-height / 10, height / 2);
      addPoints(height / 5, 0);
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = fillColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < pointsA.length; i++) {
        pointsA[i].move();
        pointsB[i].move();
      }

      const gradientX = Math.min(Math.max(relMouseX, 0), canvas.width);
      const gradientY = Math.min(Math.max(relMouseY, 0), canvas.height);

      const distance =
        Math.sqrt(
          Math.pow(gradientX - canvas.width / 2, 2) +
            Math.pow(gradientY - canvas.height / 2, 2)
        ) /
        Math.sqrt(
          Math.pow(canvas.width / 2, 2) + Math.pow(canvas.height / 2, 2)
        );

      const gradient = ctx.createRadialGradient(
        gradientX,
        gradientY,
        300 + 300 * distance,
        gradientX,
        gradientY,
        0
      );

      gradient.addColorStop(0, colorStart);
      gradient.addColorStop(1, colorEnd);

      [pointsA, pointsB].forEach((pointSet, j) => {
        ctx.fillStyle = j === 0 ? fillColor : gradient;
        ctx.beginPath();
        ctx.moveTo(pointSet[0].x, pointSet[0].y);

        for (let i = 0; i < pointSet.length; i++) {
          const p = pointSet[i];
          const nextP = pointSet[i + 1] || pointSet[0];

          p.cx1 = (p.x + nextP.x) / 2;
          p.cy1 = (p.y + nextP.y) / 2;

          ctx.bezierCurveTo(p.x, p.y, p.cx1, p.cy1, p.cx1, p.cy1);
        }

        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    document.addEventListener("mousemove", updateMouseDirection);
    window.addEventListener("resize", initPoints);

    initPoints();
    measureMouseSpeed();
    render();

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(speedTimer);
      document.removeEventListener("mousemove", updateMouseDirection);
      window.removeEventListener("resize", initPoints);
    };
  }, [disabled]);

  return (
    <a
      ref={containerRef}
      href={disabled ? undefined : href}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
          return;
        }

        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`${styles.btnLiquid} ${disabled ? styles.disabled : ""}`}
    >
      <span className={styles.inner }>{text}</span>
      <canvas ref={canvasRef} className={styles.canvas} />
    </a>
  );
}
