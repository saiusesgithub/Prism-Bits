"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type WaveBackgroundProps = React.HTMLAttributes<HTMLDivElement>;

export default function WaveBackground({
  className,
  ...props
}: WaveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationId: number;
    let isAnimating = true;

    function resize() {
      if (!container || !canvas) return;
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    }

    window.addEventListener("resize", resize);
    resize();

    const isMobile = width < 768;
    const rows = isMobile ? 35 : 65;
    const cols = isMobile ? 45 : 85;
    const spacing = isMobile ? 50 : 40;
    const points: { x: number; z: number; y: number }[] = [];

    for (let z = 0; z < rows; z++) {
      for (let x = 0; x < cols; x++) {
        points.push({
          x: (x - cols / 2) * spacing,
          z: (z - rows / 2) * spacing,
          y: 0,
        });
      }
    }

    let time = 0;
    let targetRotX = 1.1;
    let targetRotY = 0;
    let rotX = 1.1;
    let rotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - width / 2;
      const mouseY = e.clientY - rect.top - height / 2;
      targetRotY = mouseX * 0.0002;
      targetRotX = 1.1 + mouseY * 0.0002;
    };

    const handleMouseLeave = () => {
      targetRotY = 0;
      targetRotX = 1.1;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    function animate() {
      if (!isAnimating || !ctx) return;
      ctx.clearRect(0, 0, width, height);
      time += 0.008;

      rotX += (targetRotX - rotX) * 0.02;
      rotY += (targetRotY - rotY) * 0.02;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      const points2D: { x: number; y: number; z: number; h: number }[][] = [];

      for (let z = 0; z < rows; z++) {
        points2D[z] = [];
        for (let x = 0; x < cols; x++) {
          const index = z * cols + x;
          const p = points[index];

          const y =
            Math.sin(p.x * 0.015 + time) * 60 +
            Math.cos(p.z * 0.02 + time) * 50;

          const x1 = p.x * cosY + p.z * sinY;
          const z1 = -p.x * sinY + p.z * cosY;

          const y2 = y * cosX - z1 * sinX;
          const z2 = y * sinX + z1 * cosX;

          const distance = 1200;
          const scale = 1000 / (distance + z2);
          const x3 = x1 * scale + width / 2;
          const y3 = y2 * scale + height / 2 + 150;

          points2D[z].push({ x: x3, y: y3, z: z2, h: y });
        }
      }

      for (let z = 0; z < rows - 1; z++) {
        for (let x = 0; x < cols - 1; x++) {
          const p = points2D[z][x];
          const right = points2D[z][x + 1];
          const down = points2D[z + 1][x];

          const opacity = Math.max(0, 1 - p.z / 800);
          if (opacity <= 0.01) continue;

          const intensity = Math.max(0, Math.min(1, (p.h + 100) / 200));
          const r = 0;
          const g = Math.floor(114 + (210 - 114) * intensity);
          const b = Math.floor(206 + (255 - 206) * intensity);

          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.6})`;
          ctx.lineWidth = intensity > 0.6 ? 2 : 1;

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(right.x, right.y);
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(down.x, down.y);
          ctx.stroke();

          if (intensity > 0.8) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 255, ${opacity})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#00ffff";
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      isAnimating = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full overflow-hidden",
        className
      )}
      style={{ background: "linear-gradient(135deg, #0a0a0f 0%, #0d1117 100%)" }}
      {...props}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%), linear-gradient(to bottom, transparent 65%, rgba(10,10,15,0.9) 98%)",
        }}
      />
    </div>
  );
}
