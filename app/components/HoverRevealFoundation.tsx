"use client";

import { useEffect, useRef, useState } from "react";

export default function HoverRevealFoundation() {
  const [isInsideWindow, setIsInsideWindow] = useState(false);
  const targetPosRef = useRef({ x: -1000, y: -1000 });
  const currentPosRef = useRef({ x: -1000, y: -1000 });
  const [renderPos, setRenderPos] = useState({ x: -1000, y: -1000 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Smooth cursor-following lerp animation loop & global mouse tracking
  useEffect(() => {
    let animationId: number;

    const animate = () => {
      // Smooth easing with lerp factor (0.14)
      const lerp = 0.14;
      currentPosRef.current.x +=
        (targetPosRef.current.x - currentPosRef.current.x) * lerp;
      currentPosRef.current.y +=
        (targetPosRef.current.y - currentPosRef.current.y) * lerp;

      setRenderPos({
        x: Math.round(currentPosRef.current.x * 10) / 10,
        y: Math.round(currentPosRef.current.y * 10) / 10,
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const handleWindowMouseMove = (e: MouseEvent) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY };
      setIsInsideWindow((prev) => {
        if (!prev) {
          currentPosRef.current = { x: e.clientX, y: e.clientY };
          setRenderPos({ x: e.clientX, y: e.clientY });
        }
        return true;
      });
    };

    const handleWindowMouseLeave = () => {
      setIsInsideWindow(false);
    };

    window.addEventListener("mousemove", handleWindowMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleWindowMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleWindowMouseMove);
      document.removeEventListener("mouseleave", handleWindowMouseLeave);
    };
  }, []);

  // Ethereal star dust particles on background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.4 + 0.3,
      alpha: Math.random() * 0.4 + 0.1,
      speedY: -(Math.random() * 0.25 + 0.05),
      speedX: (Math.random() - 0.5) * 0.15,
      pulse: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulse += 0.02;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));

        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const maskStyle = isInsideWindow
    ? `radial-gradient(circle 280px at ${renderPos.x}px ${renderPos.y}px, black 0%, black 140px, rgba(0, 0, 0, 0.65) 205px, transparent 280px)`
    : "radial-gradient(circle 0px at 0px 0px, transparent 0%, transparent 100%)";

  return (
    <>
      {/* 1. FIXED FULL-PAGE BACKGROUND FOUNDATION */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {/* BASE NOCTURNE CITYSCAPE IMAGE */}
        <img
          src="/images/bg_base.jpg"
          alt="LIC Sovereign Nocturne World"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />

        {/* BACKGROUND STAR DUST PARTICLES CANVAS */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full opacity-60"
        />

        {/* VIGNETTE BOUNDARY */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#000000_100%)] opacity-80" />

        {/* CURSOR-FOLLOWING HOVER REVEAL LAYER (TWILIGHT / SUNSET PANORAMA) */}
        <div
          className="absolute inset-0 overflow-hidden transition-opacity duration-300"
          style={{
            opacity: isInsideWindow ? 1 : 0,
            maskImage: maskStyle,
            WebkitMaskImage: maskStyle,
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <img
            src="/images/bg_reveal.jpg"
            alt="LIC Sovereign Twilight Reveal"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 opacity-40" />
        </div>

        {/* SOFT SPOTLIGHT GLOW AMBIENCE ON THE REVEAL RADIUS EDGE */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: isInsideWindow ? 1 : 0,
            background: isInsideWindow
              ? `radial-gradient(circle 280px at ${renderPos.x}px ${renderPos.y}px, rgba(255, 190, 120, 0.12) 0%, rgba(245, 158, 11, 0.05) 190px, transparent 280px)`
              : "transparent",
          }}
        />
      </div>

      {/* 2. FOREGROUND SPECULAR SUNSET ILLUMINATION ON ALL SECTIONS */}
      <div
        className="fixed inset-0 pointer-events-none z-[25] transition-opacity duration-300"
        style={{
          opacity: isInsideWindow ? 1 : 0,
          background: isInsideWindow
            ? `radial-gradient(circle 320px at ${renderPos.x}px ${renderPos.y}px, rgba(245, 158, 11, 0.12) 0%, rgba(255, 190, 120, 0.04) 180px, transparent 320px)`
            : "transparent",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none z-[24] transition-opacity duration-300"
        style={{
          opacity: isInsideWindow ? 0.30 : 0,
          maskImage: maskStyle,
          WebkitMaskImage: maskStyle,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          mixBlendMode: "screen",
        }}
      >
        <img
          src="/images/bg_reveal.jpg"
          alt="LIC Sovereign Reveal Specular"
          className="h-full w-full object-cover object-center"
        />
      </div>
    </>
  );
}
