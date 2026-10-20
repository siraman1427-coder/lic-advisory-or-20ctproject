"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const HeroModel = dynamic(() => import("./components/HeroModel"), {
  ssr: false,
});

const LICAdvisoryShowcase = dynamic(
  () => import("./components/LICAdvisoryShowcase"),
  {
    ssr: false,
  }
);

const LICPortfolioArchive = dynamic(
  () => import("./components/LICPortfolioArchive"),
  {
    ssr: false,
  }
);

export default function Home() {
  const [soundActive, setSoundActive] = useState(false);
  const [creaturesModalOpen, setCreaturesModalOpen] = useState(false);
  const [exploreModalOpen, setExploreModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Hero container reference for mouse tracking
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [isInsideHero, setIsInsideHero] = useState(false);
  const targetPosRef = useRef({ x: -1000, y: -1000 });
  const currentPosRef = useRef({ x: -1000, y: -1000 });
  const [renderPos, setRenderPos] = useState({ x: -1000, y: -1000 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Smooth cursor-following lerp animation loop
  useEffect(() => {
    let animationId: number;

    const animate = () => {
      // Smooth easing with lerp factor (0.12)
      const lerp = 0.12;
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
    return () => cancelAnimationFrame(animationId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    targetPosRef.current = { x, y };

    if (!isInsideHero) {
      setIsInsideHero(true);
      // Snap position immediately on first entry to avoid floating in from offscreen
      currentPosRef.current = { x, y };
      setRenderPos({ x, y });
    }
  };

  const handleMouseLeave = () => {
    setIsInsideHero(false);
  };

  // Ethereal subtle star dust particles on background
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

  // Web Audio ambient drone soundscape
  const toggleSound = () => {
    if (soundActive) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(
          0.0001,
          audioCtxRef.current.currentTime,
          0.6
        );
        setTimeout(() => {
          oscillatorsRef.current.forEach((osc) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {
              // ignore
            }
          });
          oscillatorsRef.current = [];
          setSoundActive(false);
        }, 700);
      }
    } else {
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 2);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        const freqs = [108, 162, 216, 324, 432];
        const oscs: OscillatorNode[] = [];

        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();

          osc.type = idx % 2 === 0 ? "sine" : "triangle";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.setValueAtTime(0.08 + idx * 0.03, ctx.currentTime);
          lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency);
          lfo.start();

          oscGain.gain.setValueAtTime(0.2 / (idx + 1), ctx.currentTime);
          osc.connect(oscGain);
          oscGain.connect(masterGain);

          osc.start();
          oscs.push(osc);
        });

        oscillatorsRef.current = oscs;
        setSoundActive(true);
      } catch (e) {
        console.error("Audio initialization error:", e);
      }
    }
  };

  const licPlans = [
    {
      name: "LIC Jeevan Umang",
      genus: "Plan 945 // Whole Life",
      habitat: "Lifelong Guaranteed Income",
      description:
        "Provides annual survival benefits of 8% of Sum Assured every single year after premium paying term until age 99, followed by 100% tax-free maturity and life cover.",
      status: "Guaranteed 8% P.A.",
    },
    {
      name: "LIC Jeevan Utsav",
      genus: "Plan 871 // Limited Premium",
      habitat: "Lifelong Regular Income",
      description:
        "Guaranteed additions throughout premium paying term, followed by 10% of Sum Assured regular annual income for life or flexi-income option with compounding.",
      status: "Guaranteed 10% P.A.",
    },
    {
      name: "LIC Jeevan Akshay VII",
      genus: "Plan 857 // Immediate Annuity",
      habitat: "Immediate Guaranteed Pension",
      description:
        "Single premium immediate annuity offering fixed lifelong pension rates immune to market fluctuations, with return of purchase price to nominees.",
      status: "Sovereign Pension",
    },
    {
      name: "LIC Tech Term",
      genus: "Plan 854 // Pure Protection",
      habitat: "High-Cover Family Shield",
      description:
        "Comprehensive pure term insurance offering substantial financial security for your family at highly affordable premium rates with special non-smoker rates.",
      status: "High Sum Assured",
    },
  ];

  const licPillars = [
    {
      chapter: "I",
      name: "Sovereign Guarantee (Sec. 37)",
      coordinate: "LIC Act 1956",
      summary:
        "Every sum assured and guaranteed bonus declared by LIC is backed by the Government of India under Section 37 of the Life Insurance Corporation Act 1956.",
    },
    {
      chapter: "II",
      name: "98.6%+ Claim Settlement Record",
      coordinate: "IRDAI Benchmark",
      summary:
        "Decades of unbroken reliability and prompt claim settlement, establishing unparalleled peace of mind for policyholders and their families.",
    },
    {
      chapter: "III",
      name: "Tax-Free Maturity under Sec. 10(10D)",
      coordinate: "Income Tax Act",
      summary:
        "Tax deduction on premiums under Section 80C, tax-free accumulation, and 100% tax-free maturity payout under Section 10(10D) of the Income Tax Act.",
    },
  ];

  // Radial gradient mask for spotlight reveal with 260px radius and soft feathered edge
  const maskStyle = isInsideHero
    ? `radial-gradient(circle 260px at ${renderPos.x}px ${renderPos.y}px, black 0%, black 135px, rgba(0, 0, 0, 0.65) 195px, transparent 260px)`
    : "radial-gradient(circle 0px at 0px 0px, transparent 0%, transparent 100%)";

  return (
    <div className="relative w-full bg-[#000000] overflow-x-clip selection:bg-[#F59E0B] selection:text-black">
      {/* 1. EXISTING HERO SECTION (PRESERVED EXACTLY AS IT IS) */}
      <div
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative min-h-screen w-full bg-[#000000] text-white flex flex-col justify-between selection:bg-white selection:text-black overflow-hidden font-sans cursor-default"
      >
      {/* 1. BASE IMAGE (BG_IMAGE_1) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <img
          src="/images/bg_base.jpg"
          alt="LIC Sovereign Nocturne World"
          className="h-full w-full object-cover object-center"
        />
        {/* Subtle dark gradient overlay to preserve minimal mysterious depth & typography contrast */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
      </div>

      {/* 2. BACKGROUND STAR DUST CANVAS */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full opacity-60"
      />

      {/* 3. VIGNETTE BOUNDARY */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,transparent_40%,#000000_100%)] opacity-80" />

      {/* 4. REVEAL LAYER (REVEAL_IMAGE / BG_IMAGE_2) WITH CURSOR-FOLLOWING SPOTLIGHT MASK */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] overflow-hidden transition-opacity duration-300"
        style={{
          opacity: isInsideHero ? 1 : 0,
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
        {/* Subtle ambient lighting blend matching the hero */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 opacity-40" />
      </div>

      {/* 5. SOFT SPOTLIGHT GLOW AMBIENCE ON THE REVEAL RADIUS EDGE */}
      <div
        className="pointer-events-none absolute inset-0 z-[3] transition-opacity duration-300"
        style={{
          opacity: isInsideHero ? 1 : 0,
          background: isInsideHero
            ? `radial-gradient(circle 260px at ${renderPos.x}px ${renderPos.y}px, rgba(255, 190, 120, 0.08) 0%, rgba(255, 140, 60, 0.04) 180px, transparent 260px)`
            : "transparent",
        }}
      />

      {/* 6. 3D CHARACTER MODEL (CENTER OF SECTION) - HEAD & EYES FOLLOW CURSOR */}
      <HeroModel />

      {/* HEADER / NAVIGATION BAR (z-30: strictly above reveal and 3D layers) */}
      <header className="relative z-30 flex w-full items-center justify-between px-6 py-6 md:px-14 md:py-8">
        {/* Left: LIC India Brand Identity */}
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="group flex items-center gap-3 tracking-[0.25em] text-xs uppercase font-medium text-white/90 hover:text-white transition-colors"
          >
            <div className="relative w-7 h-7 rounded-full overflow-hidden bg-white/90 p-0.5 shrink-0 flex items-center justify-center">
              <Image
                src="/images/lic_logo.png"
                alt="LIC India Logo"
                width={24}
                height={24}
                style={{ width: "auto", height: "auto" }}
                className="object-contain"
              />
            </div>
            <span className="font-editorial-sans tracking-[0.3em] font-semibold text-white">
              LIC <span className="text-[#F59E0B]">INDIA</span>
            </span>
          </a>
          <span className="hidden sm:inline-block text-[10px] tracking-[0.3em] uppercase text-white/40 border-l border-white/15 pl-4">
            GOVT. OF INDIA ENTERPRISE
          </span>
        </div>

        {/* Center: Editorial Navigation Links */}
        <nav className="hidden md:flex items-center gap-9 text-xs tracking-[0.25em] uppercase text-white/70 font-light">
          <button
            onClick={() => setCreaturesModalOpen(true)}
            className="hover:text-[#F59E0B] transition-colors duration-300 cursor-pointer"
          >
            Sovereign Plans
          </button>
          <button
            onClick={() => setCreaturesModalOpen(true)}
            className="hover:text-[#F59E0B] transition-colors duration-300 cursor-pointer"
          >
            Key Portfolios
          </button>
          <button
            onClick={() => setExploreModalOpen(true)}
            className="hover:text-[#F59E0B] transition-colors duration-300 cursor-pointer"
          >
            Pillars of Trust
          </button>
          <button
            onClick={() => setExploreModalOpen(true)}
            className="hover:text-[#F59E0B] transition-colors duration-300 cursor-pointer"
          >
            Claim Support
          </button>
        </nav>

        {/* Right: Audio toggle & Index/Menu CTA */}
        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={toggleSound}
            aria-label="Toggle ambient atmosphere audio"
            className="flex items-center gap-2.5 rounded-full border border-white/15 px-3.5 py-1.5 text-[11px] tracking-[0.2em] uppercase text-white/80 hover:border-white/40 hover:text-white transition-all bg-white/[0.02] backdrop-blur-sm"
          >
            <span
              className={`inline-block w-1.5 h-1.5 rounded-full ${
                soundActive ? "bg-emerald-400 animate-pulse" : "bg-white/40"
              }`}
            />
            <span className="hidden sm:inline">
              {soundActive ? "Sound ON" : "Sound OFF"}
            </span>
            <span className="sm:hidden">{soundActive ? "ON" : "OFF"}</span>
          </button>

          <button
            onClick={() => setExploreModalOpen(true)}
            className="hidden sm:flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#F59E0B] hover:text-white transition-colors"
          >
            <span>[ EST. 1956 ]</span>
          </button>
        </div>
      </header>

      {/* HERO SECTION: DOMINANT "LIC" HEADLINE (z-10: strictly above reveal layer) */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-8 md:py-16 text-center select-none pointer-events-none">
        {/* Subtle decorative chapter badge above headline */}
        <div className="mb-4 md:mb-6 flex items-center gap-3 text-[11px] tracking-[0.35em] uppercase text-[#F59E0B]/80 font-medium drop-shadow-md">
          <span className="w-8 h-[1px] bg-[#F59E0B]/40" />
          <span>EST. 1956 // YOGAKSHEMAM VAHAMYAHAM</span>
          <span className="w-8 h-[1px] bg-[#F59E0B]/40" />
        </div>

        {/* THE OVERSIZED HERO HEADLINE: LIC */}
        <h1
          className="font-editorial-serif text-[22vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] font-normal leading-none tracking-[0.16em] uppercase text-white glow-subtle transition-all duration-700 hover:tracking-[0.2em] drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)]"
          style={{ letterSpacing: "0.18em", textIndent: "0.18em" }}
        >
          LIC
        </h1>

        {/* Editorial Subtitle Marker */}
        <div className="mt-4 md:mt-6 flex items-center gap-2 text-xs tracking-[0.28em] uppercase text-white/70 drop-shadow-md">
          <span className="inline-block w-1.5 h-1.5 bg-[#F59E0B] rotate-45" />
          <span>LIFE INSURANCE CORPORATION OF INDIA • ZINDAGI KE SAATH BHI, ZINDAGI KE BAAD BHI</span>
          <span className="inline-block w-1.5 h-1.5 bg-[#F59E0B] rotate-45" />
        </div>
      </main>

      {/* BOTTOM SECTION: SUPPORTING TEXT, DESCRIPTION, AND CTAs (z-30: strictly above reveal and 3D layers) */}
      <footer className="relative z-30 w-full px-6 pb-8 pt-4 md:px-14 md:pb-12 md:pt-6">
        {/* Top subtle dividing hairline */}
        <div className="w-full h-[1px] bg-white/15 mb-8 md:mb-10 backdrop-blur-xs" />

        {/* Grid layout matching reference: Left Text Area & Right CTAs */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 md:gap-12">
          {/* LEFT: Supporting text & Description */}
          <div className="max-w-xl flex flex-col gap-3">
            {/* Supporting Text */}
            <p className="text-sm md:text-base font-light tracking-[0.12em] uppercase text-white/95 font-editorial-sans drop-shadow-md">
              Zindagi Ke Saath Bhi, Zindagi Ke Baad Bhi
            </p>

            {/* Description */}
            <p className="text-sm md:text-base font-light leading-relaxed text-white/70 max-w-lg drop-shadow-md">
              India&apos;s premier sovereign wealth and protection institution, securing over 250 million families with guaranteed lifelong financial assurance.
            </p>
          </div>

          {/* RIGHT: CTAs matching placement and styling */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* Primary CTA: Explore LIC Plans → */}
            <button
              onClick={() => setCreaturesModalOpen(true)}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-white text-black text-xs md:text-sm font-medium tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[#F59E0B] hover:text-black hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] active:scale-[0.98] cursor-pointer"
            >
              <span>Explore LIC Plans</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1 font-sans">
                →
              </span>
            </button>

            {/* Secondary CTA: View Sovereign Portfolios → */}
            <button
              onClick={() => setExploreModalOpen(true)}
              className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full border border-white/30 bg-black/40 backdrop-blur-sm text-white text-xs md:text-sm font-light tracking-[0.15em] uppercase transition-all duration-300 hover:border-[#F59E0B] hover:bg-white/10 hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] active:scale-[0.98] cursor-pointer"
            >
              <span>View Sovereign Portfolios</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1 font-sans">
                →
              </span>
            </button>
          </div>
        </div>

        {/* Extra Bottom Editorial Metadata Bar */}
        <div className="mt-8 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[10px] tracking-[0.25em] uppercase text-white/50 gap-2 border-t border-white/10">
          <div className="flex items-center gap-4">
            <span>SOVEREIGN GUARANTEE: SECTION 37 LIC ACT</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">CLAIM SETTLEMENT: 98.6%+</span>
          </div>
          <div className="flex items-center gap-4">
            <span>GOVT. OF INDIA ENTERPRISE</span>
            <span>© 2026 LIC INDIA ADVISORY</span>
          </div>
        </div>
      </footer>

      {/* MEET THE CREATURES MODAL / EXPEDITION DRAWER (z-50) */}
      {/* LIC PREMIER PLANS MODAL / EXPEDITION DRAWER (z-50) */}
      {creaturesModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 transition-all"
          onClick={() => setCreaturesModalOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl border border-[#F59E0B]/30 bg-[#07090E] p-6 sm:p-10 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-white/10 pb-5">
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#F59E0B] font-semibold">
                  LIC PORTFOLIO AUDIT
                </span>
                <h3 className="font-editorial-serif text-2xl sm:text-3xl font-light tracking-[0.08em] text-white mt-1">
                  Premier Sovereign Plans
                </h3>
              </div>
              <button
                onClick={() => setCreaturesModalOpen(false)}
                className="rounded-full border border-white/20 p-2 text-white/60 hover:border-white hover:text-white transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="flex gap-2 overflow-x-auto py-4 border-b border-white/10 no-scrollbar">
              {licPlans.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setActiveTab(i)}
                  className={`px-4 py-2 rounded-full text-xs tracking-[0.15em] uppercase whitespace-nowrap transition-all ${
                    activeTab === i
                      ? "bg-[#F59E0B] text-black font-semibold shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                      : "border border-white/15 text-white/60 hover:text-white hover:border-white/40"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <h4 className="font-editorial-serif text-3xl text-white">
                    {licPlans[activeTab].name}
                  </h4>
                  <p className="text-xs italic tracking-widest text-[#F59E0B]/90 mt-1">
                    {licPlans[activeTab].genus}
                  </p>
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full border border-[#F59E0B]/40 bg-[#F59E0B]/10 text-[#F59E0B] font-medium">
                  {licPlans[activeTab].status}
                </span>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs tracking-wider uppercase text-white/70 flex items-center justify-between">
                <span>Objective: {licPlans[activeTab].habitat}</span>
                <span>Section 37 Sovereign Backing</span>
              </div>

              <p className="text-sm font-light leading-relaxed text-white/80 mt-2">
                {licPlans[activeTab].description}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] tracking-[0.2em] uppercase text-white/40">
                PLAN 0{activeTab + 1} / 0{licPlans.length}
              </span>
              <button
                onClick={() => setCreaturesModalOpen(false)}
                className="px-6 py-2.5 rounded-full bg-white text-black text-xs tracking-[0.15em] uppercase font-medium hover:bg-[#F59E0B] transition-all"
              >
                Close Portfolio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PILLARS OF SOVEREIGN SECURITY MODAL (z-50) */}
      {exploreModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 transition-all"
          onClick={() => setExploreModalOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl border border-[#38BDF8]/30 bg-[#07090E] p-6 sm:p-10 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-white/10 pb-5">
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#38BDF8] font-semibold">
                  SOVEREIGN ARCHITECTURE
                </span>
                <h3 className="font-editorial-serif text-2xl sm:text-3xl font-light tracking-[0.08em] text-white mt-1">
                  The Three Pillars of Financial Security
                </h3>
              </div>
              <button
                onClick={() => setExploreModalOpen(false)}
                className="rounded-full border border-white/20 p-2 text-white/60 hover:border-white hover:text-white transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-4">
              {licPillars.map((pillar) => (
                <div
                  key={pillar.name}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:border-[#38BDF8]/40 transition-all group"
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-editorial-serif text-lg text-[#38BDF8]">
                        {pillar.chapter}
                      </span>
                      <h4 className="font-editorial-serif text-xl text-white group-hover:text-[#38BDF8] transition-colors">
                        {pillar.name}
                      </h4>
                    </div>
                    <span className="text-[10px] tracking-[0.2em] text-[#F59E0B] uppercase">
                      {pillar.coordinate}
                    </span>
                  </div>
                  <p className="text-xs font-light leading-relaxed text-white/70">
                    {pillar.summary}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              <p className="text-[11px] tracking-[0.2em] uppercase text-white/40">
                GOVERNMENT OF INDIA BACKED
              </p>
              <button
                onClick={() => setExploreModalOpen(false)}
                className="px-6 py-2.5 rounded-full bg-white text-black text-xs tracking-[0.15em] uppercase font-medium hover:bg-[#38BDF8] transition-all"
              >
                Close Advisory
              </button>
            </div>
          </div>
        </div>
      )}
      {/* End of Hero Section */}
      </div>

      {/* 2. CINEMATIC SCROLL-DRIVEN LIC ADVISORY SHOWCASE SECTION */}
      <LICAdvisoryShowcase />

      {/* 3. LIC PORTFOLIO ARCHIVE (CURATED PROTECTION & PRIVATE WEALTH VAULT) */}
      <LICPortfolioArchive />
    </div>
  );
}
