"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  twinkleSpeed: number;
  twinkleDir: 1 | -1;
};

function createStars(width: number, height: number) {
  const starCount = Math.floor((width * height) / 4000);

  return Array.from({ length: starCount }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.1 + 0.1,
    alpha: Math.random(),
    twinkleSpeed: Math.random() * 0.015 + 0.003,
    twinkleDir: Math.random() > 0.5 ? 1 : -1
  })) satisfies Star[];
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;

    if (!canvas || !parent) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let stars: Star[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = createStars(width, height);
    };

    const animate = () => {
      context.clearRect(0, 0, width, height);

      for (const star of stars) {
        star.alpha += star.twinkleSpeed * star.twinkleDir;

        if (star.alpha >= 1) {
          star.alpha = 1;
          star.twinkleDir = -1;
        } else if (star.alpha <= 0.1) {
          star.alpha = 0.1;
          star.twinkleDir = 1;
        }

        context.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        const size = star.radius * 2;
        context.fillRect(star.x - star.radius, star.y - star.radius, size, size);
      }

      animationFrame = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="global-stars" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
