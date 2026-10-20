"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function LICAdvisoryShowcase() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [viewportDims, setViewportDims] = useState({ width: 1440, height: 900 });

  // Lerp smoothing state for buttery 60fps scroll transitions
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const [smoothProgress, setSmoothProgress] = useState(0);

  // Resize handler & scroll listener
  useEffect(() => {
    const updateDimensions = () => {
      setViewportDims({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const trackHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const totalScrollable = trackHeight - viewportHeight;

      if (totalScrollable <= 0) return;

      const rawProgress = -rect.top / totalScrollable;
      const clamped = Math.max(0, Math.min(1, rawProgress));
      targetProgressRef.current = clamped;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Lerp animation loop for silky smooth interpolation
    let animId: number;
    const tick = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0003) {
        currentProgressRef.current += diff * 0.12;
        setSmoothProgress(currentProgressRef.current);
      } else if (currentProgressRef.current !== targetProgressRef.current) {
        currentProgressRef.current = targetProgressRef.current;
        setSmoothProgress(targetProgressRef.current);
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  // SCALING INTERPOLATION: 0 to 0.82 progress
  // Hermite smoothstep curve for buttery non-linear expansion
  const p = Math.min(1, smoothProgress / 0.82);
  const easeProgress = p * p * (3 - 2 * p);

  // Initial portrait 9:16 card dimensions based on viewport
  const isMobile = viewportDims.width < 768;
  const initialWidth = isMobile
    ? Math.min(260, viewportDims.width * 0.72)
    : Math.min(330, viewportDims.width * 0.22);
  const initialHeight = initialWidth * (16 / 9);

  const currentWidth =
    initialWidth + (viewportDims.width - initialWidth) * easeProgress;
  const currentHeight =
    initialHeight + (viewportDims.height - initialHeight) * easeProgress;
  const currentRadius = Math.max(0, 26 * (1 - easeProgress * 1.15));
  const borderOpacity = Math.max(0, 1 - easeProgress * 1.35);

  // DUAL-IMAGE DAY-TO-NIGHT CROSSFADE (between 35% and 82% scroll progress)
  const dayNightRange = Math.max(
    0,
    Math.min(1, (smoothProgress - 0.35) / 0.47)
  );
  const sunsetOpacity = 1 - dayNightRange;
  const nightOpacity = dayNightRange;

  // BADGE EXIT CHOREOGRAPHY: disappear smoothly by 68%-78% progress
  const badgesVisible = smoothProgress < 0.78;
  const badgeExitProgress = Math.min(1, smoothProgress / 0.7);
  const badgeOpacity = Math.max(0, 1 - badgeExitProgress * 1.3);
  const badgeScale = Math.max(0.65, 1 - badgeExitProgress * 0.35);

  // FINALE STATE: 78%–100% progress
  const finaleActive = smoothProgress >= 0.76;
  const finaleOpacity = Math.max(0, Math.min(1, (smoothProgress - 0.76) / 0.16));

  // Asymmetric floating advisory badges configuration
  const floatingBadges = [
    {
      id: "auth-advisor",
      className: "top-[11%] left-[5%] sm:left-[9%] md:left-[13%]",
      vx: -1.2,
      vy: -0.9,
      baseRotate: -2.5,
      content: (
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-full border border-[#F59E0B]/40 bg-[#00529B]/30 backdrop-blur-md shadow-[0_4px_24px_rgba(245,158,11,0.2)]">
          <div className="relative w-6 h-6 rounded-full overflow-hidden bg-white/90 p-0.5 shrink-0 flex items-center justify-center">
            <Image
              src="/images/lic_logo.png"
              alt="LIC India Logo"
              width={22}
              height={22}
              style={{ width: "auto", height: "auto" }}
              className="object-contain"
            />
          </div>
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#F59E0B]">
              Authorized LIC India Advisor
            </p>
            <p className="text-xs font-serif italic text-white/90 tracking-wide">
              Zindagi Ke Saath Bhi, Zindagi Ke Baad Bhi
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "claim-ratio",
      className: "top-[15%] right-[5%] sm:right-[9%] md:right-[14%]",
      vx: 1.4,
      vy: -0.8,
      baseRotate: 3.2,
      content: (
        <div className="px-5 py-3.5 rounded-2xl border border-[#38BDF8]/35 bg-black/65 backdrop-blur-md shadow-[0_8px_32px_rgba(56,189,248,0.22)]">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-white glow-subtle">
              98.6%<span className="text-[#38BDF8] text-xl">+</span>
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#38BDF8] font-semibold">
              IRDAI BENCHMARK
            </span>
          </div>
          <p className="text-xs text-white/70 font-light mt-0.5">
            Claim Settlement Ratio — Sovereign Trust
          </p>
        </div>
      ),
    },
    {
      id: "endowment-plans",
      className: "top-[41%] left-[3%] sm:left-[5%] md:left-[8%]",
      vx: -1.6,
      vy: 0.2,
      baseRotate: -3.8,
      content: (
        <div className="max-w-[270px] p-4 rounded-2xl border border-white/15 bg-[#00529B]/25 backdrop-blur-md shadow-[0_6px_28px_rgba(0,82,155,0.35)]">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
            <span className="text-[10px] tracking-[0.22em] uppercase text-[#F59E0B] font-medium">
              Bespoke Wealth Plans
            </span>
          </div>
          <p className="text-sm font-serif font-medium text-white/95 leading-snug">
            Endowment & Whole Life Plans (Jeevan Umang / Jeevan Utsav)
          </p>
          <p className="text-[11px] text-white/50 mt-1">
            Guaranteed 8%–10% Annual Survival Benefit for Life
          </p>
        </div>
      ),
    },
    {
      id: "tax-freedom",
      className: "top-[43%] right-[3%] sm:right-[5%] md:right-[7%]",
      vx: 1.5,
      vy: 0.1,
      baseRotate: 2.4,
      content: (
        <div className="max-w-[280px] p-4 rounded-2xl border border-white/15 bg-black/65 backdrop-blur-md shadow-xl">
          <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#38BDF8]">
            SECTION 80C & 10(10D)
          </span>
          <p className="text-xs sm:text-sm font-sans font-medium text-white/95 mt-1 leading-snug">
            Tax-Free Maturity & Wealth Optimization
          </p>
          <p className="text-[11px] text-white/50 font-light mt-1">
            100% Tax-Exempt Payouts with Compounded Reversionary Bonuses
          </p>
        </div>
      ),
    },
    {
      id: "child-milestones",
      className: "bottom-[23%] left-[4%] sm:left-[7%] md:left-[11%]",
      vx: -1.3,
      vy: 1.1,
      baseRotate: 1.8,
      content: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-white/20 bg-[#00529B]/35 backdrop-blur-md shadow-lg">
          <span className="text-[#F59E0B] text-sm">✦</span>
          <span className="text-xs font-sans tracking-wide text-white/90">
            Child Higher Education & Marriage Milestones
          </span>
        </div>
      ),
    },
    {
      id: "pension-annuities",
      className: "bottom-[21%] right-[4%] sm:right-[8%] md:right-[12%]",
      vx: 1.3,
      vy: 1.2,
      baseRotate: -2.8,
      content: (
        <div className="p-3.5 rounded-2xl border border-[#F59E0B]/30 bg-black/70 backdrop-blur-md shadow-xl">
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-[#F59E0B]">
            RETIREMENT ASSURANCE
          </span>
          <p className="text-xs sm:text-sm font-serif italic text-white/95 mt-0.5">
            Guaranteed Pension & Annuities (Jeevan Akshay)
          </p>
          <p className="text-[11px] text-white/50 mt-0.5">
            Lifelong Fixed Income with Return of Purchase Price
          </p>
        </div>
      ),
    },
    {
      id: "doorstep-servicing",
      className: "bottom-[10%] left-[6%] sm:left-[16%] md:left-[20%]",
      vx: -0.7,
      vy: 1.4,
      baseRotate: -1.2,
      content: (
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl border border-[#38BDF8]/30 bg-black/75 backdrop-blur-md">
          <span className="inline-block w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
          <p className="text-xs font-light text-white/80">
            Zero-Hassle Doorstep Policy Servicing, Revival & Death Claim Assistance
          </p>
        </div>
      ),
    },
    {
      id: "term-assurance",
      className: "top-[28%] right-[8%] sm:right-[16%] md:right-[20%]",
      vx: 0.9,
      vy: -1.2,
      baseRotate: -1.6,
      content: (
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/15 bg-[#00529B]/25 backdrop-blur-md">
          <span className="text-xs text-[#38BDF8]">🛡</span>
          <span className="text-xs font-medium text-white/85 tracking-wide">
            Term Assurance & High-Cover Family Protection
          </span>
        </div>
      ),
    },
    {
      id: "sovereign-guarantee",
      className: "top-[8%] right-[26%] sm:right-[32%] md:right-[36%]",
      vx: 0.3,
      vy: -1.5,
      baseRotate: 1.2,
      content: (
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 backdrop-blur-sm">
          <span className="text-[9px] tracking-[0.25em] uppercase font-bold text-[#F59E0B]">
            Section 37 LIC Act 1956 — 100% Sovereign Guarantee
          </span>
        </div>
      ),
    },
  ];

  return (
    <section
      ref={trackRef}
      className="relative w-full h-[190vh] bg-[#05070B] text-white selection:bg-[#F59E0B] selection:text-black"
    >
      {/* STICKY 100VH CONTAINER (Pinned during scroll track) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Subtle background luxury ambient glow on obsidian backdrop */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(0,82,155,0.12),transparent_70%)]" />
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(245,158,11,0.06),transparent_60%)]" />

        {/* SECTION HEADER KICKER (visible in initial state, fades out with scroll) */}
        <div
          className="pointer-events-none absolute top-6 sm:top-8 z-30 flex flex-col items-center text-center transition-opacity duration-300 px-4"
          style={{ opacity: Math.max(0, 1 - smoothProgress * 4) }}
        >
          <div className="flex items-center gap-2 text-[10px] tracking-[0.35em] uppercase text-[#F59E0B] font-medium">
            <span className="w-6 h-[1px] bg-[#F59E0B]/50" />
            <span>PREMIER FINANCIAL ARCHITECTURE</span>
            <span className="w-6 h-[1px] bg-[#F59E0B]/50" />
          </div>
          <h2 className="font-editorial-serif text-xl sm:text-2xl text-white/90 mt-1 tracking-wider">
            The Guardian of Family Wealth
          </h2>
          <p className="text-[11px] text-white/40 tracking-[0.2em] uppercase mt-0.5">
            Scroll to expand horizon ↓
          </p>
        </div>

        {/* FLOATING ASYMMETRIC "ORGANIZED CHAOS" ADVISORY ELEMENTS */}
        {badgesVisible && (
          <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
            {floatingBadges.map((badge) => {
              const currentX = badge.vx * badgeExitProgress * 230;
              const currentY = badge.vy * badgeExitProgress * 230;
              const currentRot =
                badge.baseRotate + badge.vx * badgeExitProgress * 6;

              return (
                <div
                  key={badge.id}
                  className={`absolute ${badge.className}`}
                  style={{
                    opacity: badgeOpacity,
                    transform: `translate3d(${currentX}px, ${currentY}px, 0) scale(${badgeScale}) rotate(${currentRot}deg)`,
                    transformOrigin: "center center",
                    willChange: "transform, opacity",
                  }}
                >
                  {badge.content}
                </div>
              );
            })}
          </div>
        )}

        {/* CENTRAL EXPANDING IMAGE CONTAINER (9:16 portrait -> 100vw x 100vh) */}
        <div
          className="relative z-10 overflow-hidden flex items-center justify-center shadow-2xl"
          style={{
            width: `${currentWidth}px`,
            height: `${currentHeight}px`,
            borderRadius: `${currentRadius}px`,
            boxShadow:
              borderOpacity > 0.05
                ? `0 0 50px rgba(0, 82, 155, ${0.45 * borderOpacity}), 0 0 25px rgba(56, 189, 248, ${0.35 * borderOpacity}), 0 0 15px rgba(245, 158, 11, ${0.2 * borderOpacity})`
                : "none",
            border:
              borderOpacity > 0.05
                ? `1px solid rgba(56, 189, 248, ${0.4 * borderOpacity})`
                : "none",
            willChange: "width, height, border-radius",
          }}
        >
          {/* LAYER 1: SUNSET VERSION (BG_IMAGE_2) - Fades out 35% to 82% */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              opacity: sunsetOpacity,
              willChange: "opacity",
            }}
          >
            <img
              src="/images/bg_reveal.jpg"
              alt="Executive overlooking city skyline at sunset"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* LAYER 2: NIGHT VERSION (BG_IMAGE_1) - Cross-fades in 35% to 82% */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              opacity: nightOpacity,
              willChange: "opacity",
            }}
          >
            <img
              src="/images/bg_base.jpg"
              alt="Executive overlooking city skyline at night"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* VIGNETTE GRADIENTS FOR PERFECT CINEMATIC MOOD & TEXT READABILITY */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60 opacity-60" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(5,7,11,0.85)_100%)] opacity-70" />

          {/* DAY-TO-NIGHT STATUS INDICATOR (active between 35% - 82% progress) */}
          {smoothProgress >= 0.32 && smoothProgress <= 0.85 && (
            <div className="pointer-events-none absolute top-6 z-20 flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-[10px] tracking-[0.25em] uppercase text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-ping" />
              <span>
                {smoothProgress < 0.6
                  ? "DAYLIGHT TO TWILIGHT HORIZON"
                  : "NIGHTFALL • 24/7 LIFELONG SOVEREIGN SHIELD"}
              </span>
            </div>
          )}
        </div>

        {/* IMMERSIVE FINALE STATE (78%–100% progress): Bottom Minimalist Glassmorphic Caption */}
        {finaleActive && (
          <div
            className="absolute bottom-8 sm:bottom-12 z-30 w-full px-4 sm:px-6 flex flex-col items-center text-center transition-all duration-300"
            style={{
              opacity: finaleOpacity,
              transform: `translate3d(0, ${(1 - finaleOpacity) * 20}px, 0)`,
            }}
          >
            <div className="relative max-w-2xl px-6 py-5 sm:px-10 sm:py-6 rounded-3xl border border-white/20 bg-black/65 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(0,82,155,0.35)] flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="text-left">
                <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#F59E0B] font-semibold">
                  <span>SOVEREIGN WEALTH PRESERVATION</span>
                  <span>•</span>
                  <span>LIC INDIA</span>
                </div>
                <p className="font-editorial-serif text-lg sm:text-xl text-white font-normal mt-1 leading-snug">
                  Securing Generations. Protecting Legacies.
                </p>
                <p className="text-xs text-white/60 font-light mt-0.5">
                  Book Your Personal LIC Portfolio Review
                </p>
              </div>

              <button
                onClick={() => setConsultModalOpen(true)}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] text-black text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] active:scale-95 shrink-0 cursor-pointer"
              >
                <span>Book Review</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1 font-sans">
                  →
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* PORTFOLIO REVIEW CONSULTATION MODAL */}
      {consultModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 transition-all animate-fadeIn"
          onClick={() => setConsultModalOpen(false)}
        >
          <div
            className="relative w-full max-w-xl rounded-3xl border border-[#F59E0B]/30 bg-[#07090E] p-6 sm:p-8 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#F59E0B] font-semibold">
                  CONFIDENTIAL ADVISORY
                </span>
                <h3 className="font-editorial-serif text-2xl text-white font-medium mt-1">
                  LIC Portfolio Review Session
                </h3>
              </div>
              <button
                onClick={() => setConsultModalOpen(false)}
                className="rounded-full border border-white/20 p-2 text-white/60 hover:text-white hover:border-white transition-colors"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 space-y-4 text-xs font-light text-white/70">
              <p>
                Schedule a one-on-one private review with an Authorized LIC India Advisor to audit existing policies, identify maturity dates, optimize Section 80C & 10(10D) tax benefits, or architect guaranteed lifelong retirement annuities.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03]">
                  <p className="font-medium text-white text-xs">Policy Audit & Revival</p>
                  <p className="text-[11px] text-white/50 mt-1">
                    Revive lapsed policies, update nominations, and claim pending bonuses.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03]">
                  <p className="font-medium text-white text-xs">High-Cover Protection</p>
                  <p className="text-[11px] text-white/50 mt-1">
                    Bespoke family security under sovereign guarantee.
                  </p>
                </div>
              </div>

              <div className="pt-3">
                <label className="block text-[11px] tracking-wider uppercase text-white/50 mb-1.5 font-mono">
                  Direct WhatsApp / Call Request
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    className="flex-1 px-4 py-2.5 rounded-full border border-white/20 bg-black/60 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#F59E0B]"
                  />
                  <button
                    onClick={() => {
                      alert("Thank you. An Authorized LIC Advisor will connect with you shortly.");
                      setConsultModalOpen(false);
                    }}
                    className="px-5 py-2.5 rounded-full bg-[#F59E0B] text-black text-xs font-semibold tracking-wider uppercase hover:bg-[#FBBF24] transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] tracking-wider uppercase text-white/40 font-mono">
              <span>Section 37 Sovereign Guarantee</span>
              <span>Govt. of India Enterprise</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
