"use client";

import { useEffect, useRef, useState } from "react";
import { Application } from "@splinetool/runtime";

interface SplineRobotProps {
  className?: string;
}

export default function SplineRobot({ className = "" }: SplineRobotProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const splineAppRef = useRef<Application | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const spline = new Application(canvas);
    splineAppRef.current = spline;

    // Load the published Spline GENKUB scene
    spline
      .load("https://prod.spline.design/UIiqk0ZHqhT0f8lt/scene.splinecode")
      .then(() => {
        if (isMounted) {
          setIsLoaded(true);
        }
      })
      .catch((err) => {
        console.error("Spline GENKUB load error:", err);
      });

    // Forward global window mouse events so GENKUB reacts to cursor movement across the screen
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      // Synthesize smooth interaction if needed
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;

      // Only dispatch synthetic event if outside canvas bounds to prevent double triggers
      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        const syntheticEvent = new MouseEvent("mousemove", {
          bubbles: false,
          clientX: clientX,
          clientY: clientY,
          screenX: e.screenX,
          screenY: e.screenY,
        });
        canvas.dispatchEvent(syntheticEvent);
      }
    };

    window.addEventListener("mousemove", handleGlobalMouseMove, { passive: true });

    return () => {
      isMounted = false;
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      try {
        spline.dispose();
      } catch {
        // Safe disposal
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center transition-all duration-1000 ${
        isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
      } ${className}`}
    >
      {/* Subtle Sovereign Glow behind Robot */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#F59E0B]/10 via-[#00529B]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Spline 3D Interactive Canvas */}
      <canvas
        ref={canvasRef}
        className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing outline-none"
        style={{
          width: "100%",
          height: "100%",
          pointerEvents: "auto",
        }}
      />

      {/* Floating Status Badge & AG-UI Trigger */}
      <button
        type="button"
        onClick={() => {
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("open-ag-ui-agent"));
          }
        }}
        className="absolute bottom-2 right-4 md:right-8 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 hover:bg-black border border-[#F59E0B]/40 hover:border-[#F59E0B] backdrop-blur-md text-[10px] font-mono tracking-wider text-white/90 shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:scale-105 active:scale-95 transition-all cursor-pointer pointer-events-auto"
        title="Open AG-UI Conversational Advisor"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[#F59E0B] font-bold">GENKUB</span>
        <span className="text-white/40">|</span>
        <span className="hidden sm:inline">AI AG-UI ADVISOR</span>
        <span className="material-symbols-outlined text-[13px] text-[#F59E0B]">chat</span>
      </button>
    </div>
  );
}
