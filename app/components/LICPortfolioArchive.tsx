"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface PlanCardData {
  id: string;
  title: string;
  planNo: string;
  category: string;
  badgeColor: "gold" | "cyan" | "blue";
  description: string;
  image: string;
  telemetry: string[];
  keyHighlights: string[];
  eligibility: string;
  taxBenefits: string;
}

export default function LICPortfolioArchive() {
  const [selectedPlan, setSelectedPlan] = useState<PlanCardData | null>(null);

  const planCards: PlanCardData[] = [
    {
      id: "utsav",
      title: "Jeevan Utsav",
      planNo: "Plan 771",
      category: "WHOLE LIFE GUARANTEED INCOME",
      badgeColor: "gold",
      description:
        "Lifetime 10% guaranteed annual survival benefits starting just years after premium completion, backed by lifelong risk cover.",
      image: "/images/card_utsav.jpg",
      telemetry: [
        "10% P.A. Guaranteed for Life",
        "Sec 10(10D) Tax-Free Maturity",
        "Flexi-Income Compounding Option",
      ],
      keyHighlights: [
        "Guaranteed Addition of ₹40 per thousand Sum Assured throughout PPT",
        "Option to defer regular income and earn 5.5% compounded interest yearly",
        "Lifelong financial protection with full death benefit payable to nominee",
        "Loan facility available immediately after completion of 2 policy years",
      ],
      eligibility: "Age: 90 days to 65 years • PPT: 5 to 16 years • Min SA: ₹5,00,000",
      taxBenefits: "Deduction under 80C up to ₹1.5L • 100% Tax-Free Payouts under Sec 10(10D)",
    },
    {
      id: "umang",
      title: "Jeevan Umang",
      planNo: "Plan 745",
      category: "100-YEAR LEGACY & WEALTH",
      badgeColor: "blue",
      description:
        "A tax-free annual survival payout of 8% of Sum Assured every year until age 100, paired with a massive maturity corpus for your family.",
      image: "/images/card_umang.jpg",
      telemetry: [
        "8% Guaranteed Annual Income",
        "Accrued Reversionary Bonus",
        "100-Year Life Cover",
      ],
      keyHighlights: [
        "Annual guaranteed payouts begin immediately after premium paying term",
        "Accumulated Simple Reversionary Bonuses + Final Additional Bonus at age 100",
        "Ideal generational wealth transmission vehicle with sovereign protection",
        "Comprehensive accidental death and disability rider options",
      ],
      eligibility: "Age: 90 days to 55 years • PPT: 15, 20, 25, 30 years • Min SA: ₹2,00,000",
      taxBenefits: "Sec 80C Deduction • Guaranteed 8% payouts & maturity 100% Tax-Free (10D)",
    },
    {
      id: "amritbaal",
      title: "Amritbaal & Jeevan Tarun",
      planNo: "Plans 874 & 834",
      category: "CHILD EDUCATION & MILESTONES",
      badgeColor: "gold",
      description:
        "Guaranteed additions and structured money-back payouts engineered to fund Ivy-league ambitions and milestone celebrations without market risk.",
      image: "/images/card_education.jpg",
      telemetry: [
        "₹80 per ₹1000 Guaranteed Additions",
        "Staged Educational Payouts",
        "Premium Waiver Benefit",
      ],
      keyHighlights: [
        "Guaranteed Addition of ₹80 per thousand Sum Assured for every policy year",
        "Tailored payout stages between age 20 to 25 coinciding with university degrees",
        "Premium Waiver Rider ensures policy continues even in unfortunate parental demise",
        "Sovereign guarantee protects children from economic downturns",
      ],
      eligibility: "Child Age: 30 days to 12 years • Maturity Age: 18 to 25 years",
      taxBenefits: "Full exemption under Section 10(10D) on educational corpus disbursements",
    },
    {
      id: "akshay",
      title: "Jeevan Akshay VII & New Jeevan Shanti",
      planNo: "Plans 857 & 858",
      category: "IMMEDIATE & DEFERRED PENSION",
      badgeColor: "cyan",
      description:
        "Lock in guaranteed, unwavering lifetime annuity rates today—ensuring complete financial independence throughout your golden years.",
      image: "/images/card_pension.jpg",
      telemetry: [
        "Fixed Lifelong Pension Rate",
        "100% Return of Purchase Price",
        "Joint-Life Survivorship Option",
      ],
      keyHighlights: [
        "Annuity rates are locked in for life and cannot be decreased by economic shifts",
        "Option for single-life or joint-life annuity with spouse continuation",
        "Full return of initial capital / purchase price to legal heirs or nominees",
        "Immediate monthly, quarterly, half-yearly, or annual pension frequencies",
      ],
      eligibility: "Age: 30 to 85+ years • Single Premium Lumpsum Investment",
      taxBenefits: "Section 80CCC deduction eligible • Steady monthly income stream",
    },
    {
      id: "techterm",
      title: "New Tech-Term / Yuva Term",
      planNo: "Plans 854 & 875",
      category: "HIGH-VALUE PURE RISK SHIELD",
      badgeColor: "cyan",
      description:
        "Uncompromising multi-crore financial security for your loved ones at highly optimized premiums.",
      image: "/images/card_shield.jpg",
      telemetry: [
        "Multi-Crore Risk Cover",
        "Non-Smoker Preferential Rates",
        "Level / Increasing Sum Assured",
      ],
      keyHighlights: [
        "Pure risk protection ensuring utmost capital defense for high-net-worth families",
        "Special subsidized premium brackets for healthy non-smokers and female lives",
        "Option to choose increasing Sum Assured to hedge against future inflation",
        "Optional Accidental Benefit Rider & critical illness accelerators",
      ],
      eligibility: "Age: 18 to 65 years • Policy Term: 10 to 40 years • Min SA: ₹50,00,000+",
      taxBenefits: "Section 80C premium deduction up to ₹1.5L • Tax-Free death claim payout",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative w-full bg-[#05070B]/80 backdrop-blur-sm text-white selection:bg-[#F59E0B] selection:text-black overflow-hidden py-24 sm:py-32 z-10">
      {/* BACKGROUND FLOATING LOW-OPACITY WATERMARKS */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
        <div className="absolute top-[8%] -left-[10%] text-[13vw] font-editorial-serif font-black tracking-widest text-white/[0.015] whitespace-nowrap">
          YOGAKSHEMAM VAHAMYAHAM
        </div>
        <div className="absolute top-[42%] -right-[15%] text-[15vw] font-sans font-black tracking-widest text-[#00529B]/[0.025] whitespace-nowrap">
          SOVEREIGN TRUST
        </div>
        <div className="absolute bottom-[12%] -left-[5%] text-[12vw] font-editorial-serif font-bold tracking-widest text-[#F59E0B]/[0.02] whitespace-nowrap">
          ESTABLISHED 1956
        </div>
        <div className="absolute top-[75%] right-[5%] text-[10vw] font-sans font-bold tracking-widest text-white/[0.015]">
          98.6% CSR
        </div>
      </div>

      {/* AMBIENT RADIAL LIGHTING ACCENTS */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(0,82,155,0.08)_0%,transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/3 right-10 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(245,158,11,0.05)_0%,transparent_70%)] blur-3xl" />

      {/* MAIN CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        {/* SECTION HEADER & TECHNICAL METADATA MARGINS */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-white/10 pb-12 mb-16 gap-8">
          <div className="max-w-2xl">
            {/* Top metadata tags */}
            <div className="flex flex-wrap items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4 font-mono">
              <span className="px-2.5 py-1 rounded border border-white/10 bg-white/[0.02]">
                [IRDAI REGD: 512]
              </span>
              <span className="px-2.5 py-1 rounded border border-[#F59E0B]/30 bg-[#F59E0B]/10 text-[#F59E0B]">
                [SECTION 37 SOVEREIGN GUARANTEE]
              </span>
              <span className="px-2.5 py-1 rounded border border-white/10 bg-white/[0.02]">
                [SEC 80C & 10(10D) ELIGIBLE]
              </span>
            </div>

            <p className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-[#F59E0B] font-semibold">
              CURATED PROTECTION // PRIVATE WEALTH DOSSIER
            </p>

            <h2 className="font-editorial-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-[0.06em] text-white mt-2 leading-[1.05]">
              The Legacy Vault
            </h2>

            <p className="text-sm sm:text-base font-light text-white/60 leading-relaxed mt-4 max-w-xl">
              Architecting generational wealth, guaranteed lifetime income, and
              unshakable family security. A curated financial exhibition of India&apos;s
              benchmark sovereign-backed instruments.
            </p>
          </div>

          {/* Right margin metrics */}
          <div className="flex md:flex-col items-start gap-4 md:gap-3 text-right">
            <div className="px-4 py-2 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm text-left">
              <span className="block text-[10px] tracking-[0.25em] uppercase text-white/40 font-mono">
                CLAIM RATIO
              </span>
              <span className="text-xl sm:text-2xl font-bold text-white font-sans">
                98.6%<span className="text-[#38BDF8]">+</span>
              </span>
            </div>

            <div className="px-4 py-2 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm text-left">
              <span className="block text-[10px] tracking-[0.25em] uppercase text-white/40 font-mono">
                SOVEREIGN BACKING
              </span>
              <span className="text-sm font-medium text-[#F59E0B]">
                100% Capital Safety
              </span>
            </div>
          </div>
        </div>

        {/* ASYMMETRIC EDITORIAL GRID (5 BESPOKE LIC PLAN CARDS) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* CARD 01: LARGE VERTICAL FEATURE CARD (5 cols, tall) */}
          <div
            onClick={() => setSelectedPlan(planCards[0])}
            className="group relative md:col-span-5 rounded-3xl border border-white/10 bg-[#090C12]/80 backdrop-blur-xl overflow-hidden p-6 sm:p-8 transition-all duration-500 hover:border-[#F59E0B]/70 hover:shadow-[0_0_40px_rgba(245,158,11,0.22)] hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between min-h-[540px] lg:min-h-[620px]"
          >
            {/* Background Visual */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src={planCards[0].image}
                alt={planCards[0].title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-35"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090C12] via-[#090C12]/80 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.1),transparent_60%)]" />
            </div>

            {/* Top Card Info */}
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.22em] uppercase font-bold text-[#F59E0B] border border-[#F59E0B]/40 bg-[#F59E0B]/10">
                  {planCards[0].category}
                </span>
                <p className="text-xs font-mono text-white/40 mt-2">
                  ACTUARIAL REFERENCE // {planCards[0].planNo}
                </p>
              </div>
              <span className="text-xs font-mono text-white/30 group-hover:text-[#F59E0B] transition-colors">
                [ 01 ]
              </span>
            </div>

            {/* Bottom Content & Micro-Telemetry */}
            <div className="relative z-10 mt-28">
              <h3 className="font-editorial-serif text-3xl sm:text-4xl text-white group-hover:text-[#F59E0B] transition-colors duration-300 leading-tight">
                {planCards[0].title}
              </h3>

              <p className="text-sm font-light leading-relaxed text-white/70 mt-3">
                {planCards[0].description}
              </p>

              {/* Sliding Micro-Telemetry Pills */}
              <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-2">
                {planCards[0].telemetry.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono tracking-wide text-white/80 bg-white/[0.04] border border-white/10 group-hover:border-[#F59E0B]/40 transition-colors"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#F59E0B]" />
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between text-xs text-[#F59E0B] font-medium tracking-wider uppercase font-mono">
                <span>View Full Actuarial Terms</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (7 cols) - CONTAINS CARDS 02, 03, 05 */}
          <div className="md:col-span-7 flex flex-col gap-6 lg:gap-8">
            {/* CARD 02: WIDE HORIZONTAL CARD */}
            <div
              onClick={() => setSelectedPlan(planCards[1])}
              className="group relative rounded-3xl border border-white/10 bg-[#090C12]/80 backdrop-blur-xl overflow-hidden p-6 sm:p-8 transition-all duration-500 hover:border-[#38BDF8]/70 hover:shadow-[0_0_40px_rgba(56,189,248,0.22)] hover:-translate-y-1.5 cursor-pointer min-h-[300px] flex flex-col justify-between"
            >
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={planCards[1].image}
                  alt={planCards[1].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#090C12] via-[#090C12]/85 to-transparent" />
              </div>

              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.22em] uppercase font-bold text-[#38BDF8] border border-[#38BDF8]/40 bg-[#38BDF8]/10">
                    {planCards[1].category}
                  </span>
                  <p className="text-xs font-mono text-white/40 mt-1.5">
                    {planCards[1].planNo}
                  </p>
                </div>
                <span className="text-xs font-mono text-white/30 group-hover:text-[#38BDF8] transition-colors">
                  [ 02 ]
                </span>
              </div>

              <div className="relative z-10 mt-8">
                <h3 className="font-editorial-serif text-2xl sm:text-3xl text-white group-hover:text-[#38BDF8] transition-colors duration-300">
                  {planCards[1].title}
                </h3>
                <p className="text-xs sm:text-sm font-light text-white/70 mt-2 max-w-xl">
                  {planCards[1].description}
                </p>

                <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-2">
                  {planCards[1].telemetry.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-mono text-white/80 bg-white/[0.04] border border-white/10"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* SPLIT ROW: CARD 03 & CARD 05 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {/* CARD 03: COMPACT SQUARE EDITORIAL CARD */}
              <div
                onClick={() => setSelectedPlan(planCards[2])}
                className="group relative rounded-3xl border border-white/10 bg-[#090C12]/80 backdrop-blur-xl overflow-hidden p-6 transition-all duration-500 hover:border-[#F59E0B]/70 hover:shadow-[0_0_35px_rgba(245,158,11,0.2)] hover:-translate-y-1.5 cursor-pointer min-h-[300px] flex flex-col justify-between"
              >
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image
                    src={planCards[2].image}
                    alt={planCards[2].title}
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-25"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090C12] via-[#090C12]/90 to-transparent" />
                </div>

                <div className="relative z-10 flex items-start justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[9px] font-mono tracking-[0.2em] uppercase font-bold text-[#F59E0B] border border-[#F59E0B]/30 bg-[#F59E0B]/10">
                    {planCards[2].category}
                  </span>
                  <span className="text-xs font-mono text-white/30">
                    [ 03 ]
                  </span>
                </div>

                <div className="relative z-10 mt-6">
                  <h4 className="font-editorial-serif text-xl sm:text-2xl text-white group-hover:text-[#F59E0B] transition-colors">
                    {planCards[2].title}
                  </h4>
                  <p className="text-xs font-light text-white/60 mt-2 line-clamp-3">
                    {planCards[2].description}
                  </p>
                  <p className="text-[10px] font-mono text-[#F59E0B] mt-3">
                    {planCards[2].telemetry[0]}
                  </p>
                </div>
              </div>

              {/* CARD 05: MEDIUM ASYMMETRIC CARD */}
              <div
                onClick={() => setSelectedPlan(planCards[4])}
                className="group relative rounded-3xl border border-white/10 bg-[#090C12]/80 backdrop-blur-xl overflow-hidden p-6 transition-all duration-500 hover:border-[#38BDF8]/70 hover:shadow-[0_0_35px_rgba(56,189,248,0.2)] hover:-translate-y-1.5 cursor-pointer min-h-[300px] flex flex-col justify-between"
              >
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image
                    src={planCards[4].image}
                    alt={planCards[4].title}
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-25"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090C12] via-[#090C12]/90 to-transparent" />
                </div>

                <div className="relative z-10 flex items-start justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[9px] font-mono tracking-[0.2em] uppercase font-bold text-[#38BDF8] border border-[#38BDF8]/30 bg-[#38BDF8]/10">
                    {planCards[4].category}
                  </span>
                  <span className="text-xs font-mono text-white/30">
                    [ 05 ]
                  </span>
                </div>

                <div className="relative z-10 mt-6">
                  <h4 className="font-editorial-serif text-xl sm:text-2xl text-white group-hover:text-[#38BDF8] transition-colors">
                    {planCards[4].title}
                  </h4>
                  <p className="text-xs font-light text-white/60 mt-2 line-clamp-3">
                    {planCards[4].description}
                  </p>
                  <p className="text-[10px] font-mono text-[#38BDF8] mt-3">
                    {planCards[4].telemetry[0]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 04: TALL OFFSET PENSION VAULT CARD (Full-width horizontal layout with distinct offset) */}
        <div className="mt-6 lg:mt-8">
          <div
            onClick={() => setSelectedPlan(planCards[3])}
            className="group relative rounded-3xl border border-white/10 bg-[#090C12]/80 backdrop-blur-xl overflow-hidden p-6 sm:p-10 transition-all duration-500 hover:border-[#F59E0B]/70 hover:shadow-[0_0_40px_rgba(245,158,11,0.2)] hover:-translate-y-1.5 cursor-pointer"
          >
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src={planCards[3].image}
                alt={planCards[3].title}
                fill
                sizes="100vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#090C12] via-[#090C12]/90 to-[#090C12]/40" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-xl">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-[#F59E0B] border border-[#F59E0B]/30 bg-[#F59E0B]/10">
                    {planCards[3].category}
                  </span>
                  <span className="text-xs font-mono text-white/40">
                    {planCards[3].planNo}
                  </span>
                </div>

                <h3 className="font-editorial-serif text-2xl sm:text-4xl text-white group-hover:text-[#F59E0B] transition-colors mt-3">
                  {planCards[3].title}
                </h3>

                <p className="text-sm font-light text-white/70 mt-2">
                  {planCards[3].description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
                {planCards[3].telemetry.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-full text-xs font-mono text-white/90 bg-white/[0.04] border border-white/10 text-center"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* HELP DESK REDIRECTION */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#F59E0B] uppercase font-semibold block">
              ADVISORY & POLICY HELP DESK
            </span>
            <p className="text-xs text-white/60 font-light mt-0.5">
              Need personalized actuarial structuring or doorstep policy servicing? Connect with our Help Desk.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.06] hover:bg-[#F59E0B] hover:text-black border border-white/15 hover:border-[#F59E0B] text-white text-xs font-mono tracking-wider uppercase transition-all duration-300 shadow-[0_0_25px_rgba(245,158,11,0.15)] shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">support_agent</span>
            <span>Go to Help Desk →</span>
          </Link>
        </div>
      </div>

      {/* =========================================================================
          MONUMENTAL ART-BOOK FOOTER (LUXURY ARCHITECTURAL MONOGRAPH SIGNATURE)
      ========================================================================= */}
      <footer className="relative z-10 w-full mt-32 border-t border-white/10 pt-20 pb-12 bg-black/60">
        {/* OVERSIZED TYPOGRAPHIC CENTERPIECE */}
        <div className="w-full overflow-hidden text-center px-4 select-none mb-16">
          <div className="font-editorial-serif text-[11vw] sm:text-[10vw] font-bold leading-none tracking-[0.08em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white/90 via-white/30 to-white/5 opacity-85 transition-opacity hover:opacity-100">
            SECURING GENERATIONS
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          {/* CURATED EDITORIAL COLUMNS */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-10 pb-16 border-b border-white/10">
            {/* Col 1: Emblem & Credo */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white/90 p-0.5 shrink-0 flex items-center justify-center">
                  <Image
                    src="/images/lic_logo.png"
                    alt="LIC India Logo"
                    width={28}
                    height={28}
                    style={{ width: "auto", height: "auto" }}
                    className="object-contain"
                  />
                </div>
                <div>
                  <span className="font-editorial-sans tracking-[0.25em] text-xs font-semibold uppercase text-white block">
                    LIC INDIA
                  </span>
                  <span className="text-[9px] font-mono tracking-wider text-white/40 block">
                    GOVT. OF INDIA ENTERPRISE
                  </span>
                </div>
              </div>

              <p className="text-xs font-serif italic text-white/60 leading-relaxed">
                &ldquo;योगक्षेमं वहाम्यहम् — Your Welfare is Our Responsibility. Zindagi Ke Saath Bhi, Zindagi Ke Baad Bhi.&rdquo;
              </p>
            </div>

            {/* Col 2: Life & Legacy Plans */}
            <div>
              <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#F59E0B] font-semibold mb-4">
                WEALTH & LEGACY
              </p>
              <ul className="space-y-2.5 text-xs text-white/60 font-light">
                <li className="hover:text-white transition-colors cursor-pointer">
                  Jeevan Utsav (Plan 771)
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Jeevan Umang (Plan 745)
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Bima Ratna & Dhan Rekha
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Endowment & Whole Life
                </li>
              </ul>
            </div>

            {/* Col 3: Pension & Annuities */}
            <div>
              <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#38BDF8] font-semibold mb-4">
                RETIREMENT VAULT
              </p>
              <ul className="space-y-2.5 text-xs text-white/60 font-light">
                <li className="hover:text-white transition-colors cursor-pointer">
                  Jeevan Akshay VII
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  New Jeevan Shanti
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Saral Pension
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Immediate Lifelong Annuity
                </li>
              </ul>
            </div>

            {/* Col 4: Child Future & Term */}
            <div>
              <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/70 font-semibold mb-4">
                FAMILY & PROTECTION
              </p>
              <ul className="space-y-2.5 text-xs text-white/60 font-light">
                <li className="hover:text-white transition-colors cursor-pointer">
                  Amritbaal (Plan 874)
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Jeevan Tarun (Plan 834)
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  New Tech-Term (Plan 854)
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Yuva Term & Pure Shield
                </li>
              </ul>
            </div>

            {/* Col 5: Priority Direct Desk */}
            <div>
              <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#F59E0B] font-semibold mb-4">
                PRIORITY DESK
              </p>
              <ul className="space-y-2.5 text-xs text-white/60 font-light">
                <li className="text-white hover:text-[#F59E0B] transition-colors cursor-pointer flex items-center gap-1.5">
                  <span>✦</span> WhatsApp Direct Desk
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Doorstep Policy Revival
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Death Claim Expedited Desk
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Tax Exemption Audit (10D)
                </li>
              </ul>
            </div>
          </div>

          {/* BOTTOM BAR: COPYRIGHT & BACK TO TOP */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>© 2026 LIC INDIA AUTHORIZED ADVISORY.</span>
              <span>AGENCY CODE: LIC-0849201X</span>
              <span>IRDAI REG: 512</span>
              <span>BRANCH 883</span>
            </div>

            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 hover:text-white transition-colors text-white/60 cursor-pointer"
            >
              <span>Back to Top</span>
              <span className="transition-transform duration-300 group-hover:-translate-y-1">
                ↑
              </span>
            </button>
          </div>
        </div>
      </footer>

      {/* PLAN DETAIL MODAL */}
      {selectedPlan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 transition-all"
          onClick={() => setSelectedPlan(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl border border-white/20 bg-[#0A0D14] p-6 sm:p-10 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-white/10 pb-5">
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#F59E0B] font-bold">
                  {selectedPlan.category}
                </span>
                <h3 className="font-editorial-serif text-3xl sm:text-4xl text-white mt-1">
                  {selectedPlan.title}
                </h3>
                <p className="text-xs font-mono text-white/40 mt-1">
                  {selectedPlan.planNo} // Sovereign Backed
                </p>
              </div>
              <button
                onClick={() => setSelectedPlan(null)}
                className="rounded-full border border-white/20 p-2 text-white/60 hover:text-white hover:border-white transition-colors"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <p className="text-sm font-light leading-relaxed text-white/80">
                {selectedPlan.description}
              </p>

              <div>
                <h4 className="text-xs font-mono tracking-wider uppercase text-white/50 mb-2">
                  Key Actuarial Highlights
                </h4>
                <ul className="space-y-2">
                  {selectedPlan.keyHighlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="text-xs text-white/75 flex items-start gap-2"
                    >
                      <span className="text-[#F59E0B] mt-0.5">✦</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
                  <span className="text-[10px] font-mono uppercase text-white/40 block">
                    Eligibility Parameters
                  </span>
                  <p className="text-xs text-white/90 mt-1">
                    {selectedPlan.eligibility}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
                  <span className="text-[10px] font-mono uppercase text-[#38BDF8] block">
                    Tax Advantages
                  </span>
                  <p className="text-xs text-white/90 mt-1">
                    {selectedPlan.taxBenefits}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[11px] font-mono text-white/40">
                SECTION 37 SOVEREIGN GUARANTEE
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link
                  href="/contact"
                  onClick={() => setSelectedPlan(null)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#F59E0B] text-black text-xs font-semibold tracking-wider uppercase hover:bg-[#FBBF24] transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                >
                  <span className="material-symbols-outlined text-[16px]">support_agent</span>
                  <span>Go to Help Desk</span>
                  <span className="font-sans">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
