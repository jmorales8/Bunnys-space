import React, { useContext, useEffect, useRef } from "react";
import "./liquidButton.scss";
import { ThemeContext } from "../../context/ThemeContext";

interface LiquidButtonProps {
  text?: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
}

interface PointType {
  x: number;
  y: number;
  ix: number;
  iy: number;
  vx: number;
  vy: number;
  cx1: number;
  cy1: number;
  cx2: number;
  cy2: number;
  level: number;
  move: () => void;
}

const LiquidButton: React.FC<LiquidButtonProps> = ({
  text = "Liquid Button 💧",
  href = "#",
  onClick,
  disabled = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLAnchorElement | null>(null);
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("DarkMode must be used within a ThemeProvider");
  }

  const { isDarkMode } = themeContext;
  const colorStart = isDarkMode ? "#2d2990" : "#FF007F";     // dark vs light
  const colorEnd = isDarkMode ? "#4d4aa6" : "#FF6EC7";
  const fillColor = isDarkMode ? "#5F5D92" : "rgb(242, 204, 210)";
  useEffect(() => {
    if (disabled) return;
    let pointsA: PointType[] = [];
    let pointsB: PointType[] = [];
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const points = 8;
    const viscosity = 20;
    const mouseDist = 70;
    const damping = 0.05;

    let mouseX = 0,
      mouseY = 0,
      relMouseX = 0,
      relMouseY = 0,
      mouseLastX = 0,
      mouseLastY = 0,
      mouseDirectionX = 0,
      mouseDirectionY = 0,
      mouseSpeedX = 0,
      mouseSpeedY = 0;

    const updateMouseDirection = (e: MouseEvent) => {
      if (mouseX < e.pageX) mouseDirectionX = 1;
      else if (mouseX > e.pageX) mouseDirectionX = -1;
      else mouseDirectionX = 0;

      if (mouseY < e.pageY) mouseDirectionY = 1;
      else if (mouseY > e.pageY) mouseDirectionY = -1;
      else mouseDirectionY = 0;

      mouseX = e.pageX;
      mouseY = e.pageY;

      const rect = container.getBoundingClientRect();
      relMouseX = mouseX - rect.left - window.scrollX;
      relMouseY = mouseY - rect.top - window.scrollY;
    };

    const measureMouseSpeed = () => {
      mouseSpeedX = mouseX - mouseLastX;
      mouseSpeedY = mouseY - mouseLastY;
      mouseLastX = mouseX;
      mouseLastY = mouseY;
      setTimeout(measureMouseSpeed, 50);
    };

    class Point implements PointType {
      x: number;
      y: number;
      ix: number;
      iy: number;
      vx: number = 0;
      vy: number = 0;
      cx1: number = 0;
      cy1: number = 0;
      cx2: number = 0;
      cy2: number = 0;
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

    const addPoints = (x: number, y: number) => {
      pointsA.push(new Point(x, y, 1));
      pointsB.push(new Point(x, y, 2));
    };

    const initPoints = () => {
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
      requestAnimationFrame(render);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = fillColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < pointsA.length; i++) {
        pointsA[i].move();
        pointsB[i].move();
      }

      const gradientX = Math.min(
        Math.max(mouseX - container.offsetLeft, 0),
        canvas.width
      );
      const gradientY = Math.min(
        Math.max(mouseY - container.offsetTop, 0),
        canvas.height
      );
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

      [pointsA, pointsB].forEach((points, j) => {
        ctx.fillStyle = j === 0 ? fillColor : gradient;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 0; i < points.length; i++) {
          const p = points[i];
          const nextP = points[i + 1] || points[0];
          p.cx1 = (p.x + nextP.x) / 2;
          p.cy1 = (p.y + nextP.y) / 2;
          ctx.bezierCurveTo(p.x, p.y, p.cx1, p.cy1, p.cx1, p.cy1);
        }

        ctx.fill();
      });
    };

    document.addEventListener("mousemove", updateMouseDirection);
    measureMouseSpeed();
    initPoints();
    render();

    return () => {
      document.removeEventListener("mousemove", updateMouseDirection);
    };
  }, [disabled, isDarkMode]);

  return (
    <a
      href={disabled ? undefined : href}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
        } else if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`${isDarkMode ? "btn-liquid__night" : "btn-liquid"} ${disabled ? "disabled" : ""}`}
      ref={containerRef}
    >
      <span className="inner">{text}</span>
      <canvas ref={canvasRef} />
    </a>
  );
};

export default LiquidButton;
