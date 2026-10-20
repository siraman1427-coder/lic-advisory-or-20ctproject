"use client";

import Image from "next/image";
import Link from "next/link";

export default function StitchAdvisorDossier() {
  return (
    <section id="advisor" className="relative w-full bg-[#05070B] text-white py-20 lg:py-28 overflow-hidden border-t border-white/5">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-40 right-0 w-[550px] h-[550px] rounded-full bg-[#F59E0B]/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-10 w-[450px] h-[450px] rounded-full bg-[#00529B]/20 blur-[130px]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        {/* SECTION HEADER KICKER */}
        <div className="flex flex-col items-start gap-2 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10">
            <span className="material-symbols-outlined text-[#F59E0B] text-[16px]">shield</span>
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#F59E0B] uppercase font-bold">
              AUTHORIZED SENIOR ADVISORY DOSSIER
            </span>
          </div>
          <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide">
            Aman Chaudhary
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[#F59E0B] uppercase tracking-[0.2em]">
            Senior LIC Insurance & Pension Advisor • MDRT Accredited
          </p>
        </div>

        {/* PROFILE SHOWCASE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Portrait Card & Credentials */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
            <div className="relative w-full max-w-[420px] aspect-square rounded-3xl p-3 bg-gradient-to-b from-white/10 to-white/[0.02] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] group">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#090C12]">
                <Image
                  src="/images/aman_chaudhary.jpg"
                  alt="Aman Chaudhary - Authorized LIC Senior Advisor"
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090C12] via-transparent to-transparent opacity-85" />
              </div>

              {/* Verified Pill Overlay */}
              <div className="absolute -bottom-4 left-4 right-4 bg-[#090C12]/95 border border-white/15 backdrop-blur-md rounded-full py-2 px-4 shadow-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#F59E0B] text-[18px]">verified</span>
                  <span className="text-xs font-semibold text-white tracking-wide">
                    Certified LIC Financial Advisor
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
                  <span className="text-[10px] font-mono text-[#F59E0B]">SEC. 37 IRDAI</span>
                </div>
              </div>
            </div>

            {/* Sub-cards: Agency ID & Credential */}
            <div className="mt-8 w-full max-w-[420px] grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col">
                <span className="text-[10px] font-mono tracking-wider text-white/40 uppercase">
                  Agency ID
                </span>
                <span className="font-mono text-sm text-white font-bold mt-1">
                  LIC-ND-7817929
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-[#F59E0B]/30 flex flex-col">
                <span className="text-[10px] font-mono tracking-wider text-[#F59E0B]/70 uppercase">
                  Credential
                </span>
                <span className="font-mono text-sm text-[#F59E0B] font-bold mt-1">
                  MDRT Accredited
                </span>
              </div>
            </div>
          </div>

          {/* Right: Narrative, Direct Communication & Action Links */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            <div className="space-y-3">
              <p className="text-sm sm:text-base font-light text-white/80 leading-relaxed max-w-2xl">
                Delivering statutory, government-guaranteed financial security for families across India. Providing bespoke term protection, high-yield guaranteed endowment policies, and sovereign-backed retirement plans with seamless, end-to-end doorstep claim governance.
              </p>
            </div>

            {/* Direct Line Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href="tel:781792960X"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#F59E0B]/50 hover:bg-white/[0.06] transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B] group-hover:bg-[#F59E0B] group-hover:text-black transition-colors shrink-0">
                  <span className="material-symbols-outlined text-[20px]">call</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-mono uppercase text-white/40 tracking-wider">
                    Direct Advisory Line
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white tracking-wide truncate">
                    +91 781792960X
                  </span>
                </div>
              </a>

              <a
                href="mailto:siraman142@gmail.com"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#38BDF8]/50 hover:bg-white/[0.06] transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-[#38BDF8]/10 flex items-center justify-center text-[#38BDF8] group-hover:bg-[#38BDF8] group-hover:text-black transition-colors shrink-0">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-mono uppercase text-white/40 tracking-wider">
                    Official Mailbox
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white tracking-wide truncate">
                    siraman142@gmail.com
                  </span>
                </div>
              </a>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="tel:781792960X"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F59E0B] text-black font-semibold text-xs tracking-wider uppercase shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:bg-[#FBBF24] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
                <span>Call Advisor</span>
              </a>

              <a
                href="https://wa.me/91781792960X"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-white font-semibold text-xs tracking-wider uppercase hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span className="material-symbols-outlined text-[18px] text-[#38BDF8]">chat</span>
                <span>WhatsApp Message</span>
              </a>

              <Link
                href="/advisor"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-white/70 hover:text-white font-mono text-xs tracking-wider uppercase transition-colors"
              >
                <span>Full Advisor Dossier →</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ACTUARIAL METRICS STAT BAR */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-6 rounded-3xl bg-[#090C12]/90 border border-white/10 hover:border-[#F59E0B]/40 transition-all group">
              <div className="w-10 h-10 rounded-full bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B] mb-4">
                <span className="material-symbols-outlined text-[22px]">family_restroom</span>
              </div>
              <span className="font-editorial-serif text-3xl sm:text-4xl text-white block">
                850+
              </span>
              <span className="text-xs font-semibold text-[#F59E0B] tracking-wider uppercase mt-1 block">
                Families Protected
              </span>
              <p className="text-[11px] font-light text-white/60 mt-1">
                Multi-generational portfolio coverage under LIC statutory net.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#090C12]/90 border border-white/10 hover:border-[#38BDF8]/40 transition-all group">
              <div className="w-10 h-10 rounded-full bg-[#00529B]/30 flex items-center justify-center text-[#38BDF8] mb-4">
                <span className="material-symbols-outlined text-[22px]">account_balance</span>
              </div>
              <span className="font-editorial-serif text-3xl sm:text-4xl text-white block">
                ₹45+ Cr
              </span>
              <span className="text-xs font-semibold text-[#38BDF8] tracking-wider uppercase mt-1 block">
                Sum Assured Managed
              </span>
              <p className="text-[11px] font-light text-white/60 mt-1">
                Active capital stewardship backed by Sovereign Guarantee Sec 37.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#090C12]/90 border border-white/10 hover:border-[#38BDF8]/40 transition-all group">
              <div className="w-10 h-10 rounded-full bg-[#38BDF8]/10 flex items-center justify-center text-[#38BDF8] mb-4">
                <span className="material-symbols-outlined text-[22px]">assignment_turned_in</span>
              </div>
              <span className="font-editorial-serif text-3xl sm:text-4xl text-white block">
                100%
              </span>
              <span className="text-xs font-semibold text-[#38BDF8] tracking-wider uppercase mt-1 block">
                Claim Support Record
              </span>
              <p className="text-[11px] font-light text-white/60 mt-1">
                Personal door-step settlement filing & actuarial liaison.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#090C12]/90 border border-white/10 hover:border-[#F59E0B]/40 transition-all group">
              <div className="w-10 h-10 rounded-full bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B] mb-4">
                <span className="material-symbols-outlined text-[22px]">support_agent</span>
              </div>
              <span className="font-editorial-serif text-3xl sm:text-4xl text-white block">
                24/7
              </span>
              <span className="text-xs font-semibold text-[#F59E0B] tracking-wider uppercase mt-1 block">
                Advisory Availability
              </span>
              <p className="text-[11px] font-light text-white/60 mt-1">
                Round-the-clock emergency assistance and premium support.
              </p>
            </div>
          </div>
        </div>

        {/* DETAILED TRACK RECORD & METERS */}
        <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-[#090C12]/80 border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#F59E0B] font-semibold">
                [DOSSIER // PROFESSIONAL RECORD]
              </span>
              <h3 className="font-editorial-serif text-2xl sm:text-3xl text-white">
                5+ Years of Dedicated Sovereign Life Advisory
              </h3>
              <p className="text-xs sm:text-sm font-light text-white/70 leading-relaxed">
                Aman maintains one of Northern Division's highest client retention benchmarks. His advisory practice pairs mathematical rigor in Section 80C and 10(10D) tax structuring with compassionate, doorstep family claim settlement.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase bg-white/[0.04] border border-white/10 text-white/80">
                  MDRT Certified Advisor
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase bg-[#00529B]/20 border border-[#38BDF8]/30 text-[#38BDF8]">
                  Division Honor Roll
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B]">
                  Statutory Sec. 37 Backed
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5 bg-white/[0.02] p-6 sm:p-8 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#F59E0B] text-[20px]">analytics</span>
                  <span className="text-xs font-semibold text-white tracking-wider uppercase">
                    Audited Actuarial Metrics
                  </span>
                </div>
                <span className="text-[10px] font-mono text-white/40">OFFICIAL 2025 RECORD</span>
              </div>

              {/* Progress 1 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white/80">Claim Settlement Assistance Ratio</span>
                  <span className="text-[#F59E0B] font-bold">99.2%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] rounded-full" style={{ width: "99.2%" }} />
                </div>
              </div>

              {/* Progress 2 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white/80">Family Retention & Policy Renewal</span>
                  <span className="text-[#38BDF8] font-bold">96.8%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#00529B] to-[#38BDF8] rounded-full" style={{ width: "96.8%" }} />
                </div>
              </div>

              {/* Progress 3 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white/80">Guaranteed Retirement Portfolios</span>
                  <span className="text-emerald-400 font-bold">94.5%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: "94.5%" }} />
                </div>
              </div>

              {/* Direct Treasury Note */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#F59E0B] text-[18px]">lock</span>
                  <span className="text-xs text-white/80">
                    Zero Intermediary Risk: Premiums paid directly to official LIC Treasury
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#F59E0B] font-bold px-2 py-0.5 rounded bg-[#F59E0B]/10 border border-[#F59E0B]/30">
                  100% DIRECT
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
