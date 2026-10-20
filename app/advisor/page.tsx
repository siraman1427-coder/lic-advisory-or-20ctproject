"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import GlobalHeader from "../components/GlobalHeader";
import StitchStewardshipAndTestimonials from "../components/StitchStewardshipAndTestimonials";
import StitchConsultationVault from "../components/StitchConsultationVault";

export default function AdvisorPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const credentials = [
    {
      icon: "workspace_premium",
      label: "9+ Years Field Advisory",
      detail: "Northern Division Certified",
    },
    {
      icon: "domain_verification",
      label: "Division I / Central Registry",
      detail: "Agency ID: LIC-ND-7817929",
    },
    {
      icon: "military_tech",
      label: "MDRT Accredited",
      detail: "Global Million Dollar Round Table",
    },
    {
      icon: "receipt_long",
      label: "Tax Structuring Specialist",
      detail: "Section 80C & 10(10D) Exemption",
    },
  ];

  const faqs = [
    {
      q: "What makes consulting with Aman Chaudhary different from an online portal?",
      a: "Online aggregators sell algorithmic policies without post-sale accountability. Aman provides personal, lifelong stewardship—from doorstep KYC documentation and underwriting facilitation to direct assistance during critical claim settlements.",
    },
    {
      q: "How does Section 37 Sovereign Guarantee protect my policy payouts?",
      a: "Under Section 37 of the Life Insurance Corporation Act 1956 passed by Parliament, the Sum Assured and all bonuses declared by LIC are explicitly guaranteed by the Central Government of India.",
    },
    {
      q: "Is there any cost for policy portfolio audits or doorstep visits?",
      a: "None. All advisory consultations, retirement cashflow projections, and doorstep servicing across Delhi NCR are 100% complimentary under official LIC agency guidelines.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#111317] text-[#e2e2e7] font-body selection:bg-[#f2be64] selection:text-black overflow-x-hidden">
      {/* ATMOSPHERIC AMBIENT FLOATING LIGHTS */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#314865]/20 blur-3xl animate-mesh" />
        <div
          className="absolute top-1/3 -right-28 w-[30rem] h-[30rem] rounded-full bg-[#f2be64]/10 blur-3xl animate-mesh"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="absolute -bottom-32 left-1/4 w-[28rem] h-[28rem] rounded-full bg-[#998ba5]/15 blur-3xl animate-pulse-slow"
          style={{ animationDelay: "-3s" }}
        />
      </div>

      <GlobalHeader />

      <main className="relative z-10 w-full">
        {/* 1. TOP HERO & EXECUTIVE DOSSIER SECTION */}
        <section className="relative w-full px-6 lg:px-12 py-10 lg:py-16 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Portrait Showcase with Badges */}
            <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
              {/* Glowing Halo Ring behind image */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#f2be64]/25 via-[#314865]/25 to-[#998ba5]/20 blur-2xl opacity-75" />

              {/* Portrait Container */}
              <div className="relative z-10 w-full max-w-[370px] sm:max-w-[420px] aspect-square rounded-3xl bg-[#282a2e] p-2.5 shadow-2xl overflow-visible border border-white/10">
                {/* Interior Framing */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#0c0e12]">
                  <Image
                    src="/images/aman_chaudhary.jpg"
                    alt="Aman Chaudhary - Authorized Senior LIC Insurance & Wealth Advisor"
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover object-top transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12] via-transparent to-transparent opacity-80" />

                  {/* Bottom Overlay Plate on Image */}
                  <div className="absolute bottom-3 left-3 right-3 bg-[#1e2023]/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-lg flex items-center justify-between border border-white/10">
                    <div className="flex items-center gap-2.5">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-[11px] font-label uppercase tracking-widest text-[#e2e2e7] font-semibold">
                        Direct Desk Online
                      </span>
                    </div>
                    <span className="text-[10px] font-label text-[#f2be64] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#f2be64]/10 border border-[#f2be64]/30">
                      IRDAI Validated
                    </span>
                  </div>
                </div>

                {/* Floating Trust Badge 1: Top Right */}
                <div className="badge-float-1 absolute -top-5 -right-4 sm:-right-6 z-20 bg-[#282a2e]/95 border border-white/15 backdrop-blur-lg px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#f2be64]/20 flex items-center justify-center text-[#f2be64]">
                    <span className="material-symbols-outlined text-[17px]">verified</span>
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-label uppercase tracking-widest text-[#f2be64] font-bold">
                      Licensed Authority
                    </div>
                    <div className="text-xs font-headline font-semibold text-white">
                      Certified LIC Advisor
                    </div>
                  </div>
                </div>

                {/* Floating Trust Badge 2: Mid Left */}
                <div className="badge-float-2 absolute top-1/2 -left-4 sm:-left-8 -translate-y-1/2 z-20 bg-[#282a2e]/95 border border-white/15 backdrop-blur-lg px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#314865]/40 flex items-center justify-center text-[#b1c8ea]">
                    <span className="material-symbols-outlined text-[17px]">military_tech</span>
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-label uppercase tracking-widest text-[#b1c8ea] font-bold">
                      Global Benchmark
                    </div>
                    <div className="text-xs font-headline font-semibold text-white">
                      MDRT Accredited
                    </div>
                  </div>
                </div>

                {/* Floating Trust Badge 3: Bottom Right Overlap */}
                <div className="badge-float-3 absolute -bottom-5 -right-3 sm:-right-5 z-20 bg-[#282a2e]/95 border border-white/15 backdrop-blur-lg px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#998ba5]/30 flex items-center justify-center text-[#d1c1dd]">
                    <span className="material-symbols-outlined text-[17px]">shield</span>
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-label uppercase tracking-widest text-[#d1c1dd] font-bold">
                      Govt. Protection
                    </div>
                    <div className="text-xs font-headline font-semibold text-white">
                      Sec. 37 LIC Act Guarantee
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Profile Narrative & Action Suite */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Live Status Pill & Metadata */}
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#282a2e] border border-white/10 mb-4 shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-[11px] font-label uppercase tracking-wider text-white font-semibold">
                  Available for Instant Calls & Desk Consultations
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="text-xs font-label uppercase tracking-[0.22em] text-[#f2be64] font-bold">
                  Authorized Senior LIC Insurance & Wealth Advisor
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-extrabold tracking-tight text-white leading-none uppercase">
                  AMAN CHAUDHARY
                </h1>
              </div>

              <p className="mt-5 text-sm sm:text-base text-[#c2c7d0] font-body leading-relaxed max-w-2xl">
                Empowering Indian households and business enterprises with ironclad financial architecture, customized endowment plans, tax optimization under Section 80C & 10(10D), and generation-spanning retirement corpus backed by sovereign state guarantees.
              </p>

              {/* Direct Contact Telemetrics Bar */}
              <div className="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
                <a
                  href="tel:7817929602"
                  className="group flex items-center gap-3 p-3 rounded-xl bg-[#1a1c1f] hover:bg-[#1e2023] border border-white/5 hover:border-[#f2be64]/40 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#282a2e] group-hover:bg-[#f2be64]/20 flex items-center justify-center text-[#f2be64] transition-colors shrink-0">
                    <span className="material-symbols-outlined text-[20px]">call</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-label uppercase tracking-wider text-[#c2c7d0] font-medium">
                      Direct Advisory Line
                    </span>
                    <span className="text-sm font-headline font-bold text-white tracking-wide truncate">
                      7817929602
                    </span>
                  </div>
                </a>

                <a
                  href="mailto:siraman142@gmail.com"
                  className="group flex items-center gap-3 p-3 rounded-xl bg-[#1a1c1f] hover:bg-[#1e2023] border border-white/5 hover:border-[#b1c8ea]/40 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#282a2e] group-hover:bg-[#314865]/40 flex items-center justify-center text-[#b1c8ea] transition-colors shrink-0">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-label uppercase tracking-wider text-[#c2c7d0] font-medium">
                      Official Dispatch
                    </span>
                    <span className="text-sm font-headline font-bold text-white tracking-wide truncate">
                      siraman142@gmail.com
                    </span>
                  </div>
                </a>
              </div>

              {/* High-Priority CTA Actions */}
              <div className="mt-6 flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
                <a
                  href="tel:7817929602"
                  className="shimmer-mask inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#f2be64] text-black hover:bg-[#ffdeaa] font-headline font-bold text-xs uppercase tracking-wider shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
                  <span>Call Advisor Now</span>
                </a>

                <a
                  href="https://wa.me/917817929602"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#314865] text-[#b1c8ea] hover:bg-[#3d5a7d] border border-[#b1c8ea]/30 font-headline font-bold text-xs uppercase tracking-wider shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>Send WhatsApp Message</span>
                </a>

                <a
                  href="#consultation-vault"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#282a2e] text-white hover:bg-[#37393d] border border-white/10 font-label text-xs uppercase tracking-wider transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                  <span>Schedule Review</span>
                </a>
              </div>

              {/* Trust Credentials Footnote */}
              <div className="mt-6 flex items-center gap-4 text-xs font-label text-[#c2c7d0]">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-emerald-400 text-[16px]">check_circle</span>
                  100% Confidential
                </span>
                <span className="inline-block w-1 h-1 rounded-full bg-white/20" />
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#f2be64] text-[16px]">assured_workload</span>
                  Licensed Under Section 42 IRDAI
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. KEY STATISTICAL IMPACT METRICS (GLOWING BENTO RIBBON) */}
        <section className="w-full px-6 lg:px-12 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative p-6 rounded-2xl bg-[#1a1c1f] hover:bg-[#1e2023] border border-white/5 hover:border-[#f2be64]/40 transition-all duration-300 shadow-md group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-label uppercase tracking-widest text-[#c2c7d0] font-semibold">
                    Client Portfolio
                  </span>
                  <span className="w-9 h-9 rounded-xl bg-[#f2be64]/20 text-[#f2be64] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">groups</span>
                  </span>
                </div>
                <div className="text-3xl lg:text-4xl font-headline font-extrabold text-white tracking-tight group-hover:text-[#f2be64] transition-colors">
                  850+
                </div>
                <p className="text-xs font-body text-[#c2c7d0] mt-1.5">
                  Families Protected across Delhi NCR & North India
                </p>
                <div className="mt-4 w-full h-1 bg-[#333539] rounded-full overflow-hidden">
                  <div className="h-full bg-[#f2be64] rounded-full" style={{ width: "88%" }} />
                </div>
              </div>

              <div className="relative p-6 rounded-2xl bg-[#1a1c1f] hover:bg-[#1e2023] border border-white/5 hover:border-[#b1c8ea]/40 transition-all duration-300 shadow-md group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-label uppercase tracking-widest text-[#c2c7d0] font-semibold">
                    Underwriting Volume
                  </span>
                  <span className="w-9 h-9 rounded-xl bg-[#314865]/30 text-[#b1c8ea] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">account_balance</span>
                  </span>
                </div>
                <div className="text-3xl lg:text-4xl font-headline font-extrabold text-white tracking-tight group-hover:text-[#b1c8ea] transition-colors">
                  ₹45+ Cr
                </div>
                <p className="text-xs font-body text-[#c2c7d0] mt-1.5">
                  Total Sum Assured Managed & Guaranteed
                </p>
                <div className="mt-4 w-full h-1 bg-[#333539] rounded-full overflow-hidden">
                  <div className="h-full bg-[#b1c8ea] rounded-full" style={{ width: "94%" }} />
                </div>
              </div>

              <div className="relative p-6 rounded-2xl bg-[#1a1c1f] hover:bg-[#1e2023] border border-white/5 hover:border-emerald-400/40 transition-all duration-300 shadow-md group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-label uppercase tracking-widest text-[#c2c7d0] font-semibold">
                    Claim Settlement
                  </span>
                  <span className="w-9 h-9 rounded-xl bg-emerald-950/60 text-emerald-400 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">verified_user</span>
                  </span>
                </div>
                <div className="text-3xl lg:text-4xl font-headline font-extrabold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                  100%
                </div>
                <p className="text-xs font-body text-[#c2c7d0] mt-1.5">
                  Direct Claim Support & Timely Documentation
                </p>
                <div className="mt-4 w-full h-1 bg-[#333539] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: "100%" }} />
                </div>
              </div>

              <div className="relative p-6 rounded-2xl bg-[#1a1c1f] hover:bg-[#1e2023] border border-white/5 hover:border-[#d1c1dd]/40 transition-all duration-300 shadow-md group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-label uppercase tracking-widest text-[#c2c7d0] font-semibold">
                    Service SLA
                  </span>
                  <span className="w-9 h-9 rounded-xl bg-[#998ba5]/20 text-[#d1c1dd] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">support_agent</span>
                  </span>
                </div>
                <div className="text-3xl lg:text-4xl font-headline font-extrabold text-white tracking-tight group-hover:text-[#d1c1dd] transition-colors">
                  24/7
                </div>
                <p className="text-xs font-body text-[#c2c7d0] mt-1.5">
                  Emergency Claim & Policy Advisory Availability
                </p>
                <div className="mt-4 w-full h-1 bg-[#333539] rounded-full overflow-hidden">
                  <div className="h-full bg-[#d1c1dd] rounded-full" style={{ width: "96%" }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ABOUT AMAN CHAUDHARY & PERFORMANCE BENCHMARKS */}
        <section className="w-full px-6 lg:px-12 py-14">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Dossier narrative */}
            <div className="lg:col-span-7 flex flex-col justify-between p-8 rounded-3xl bg-[#1a1c1f] border border-white/5 shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-label uppercase tracking-[0.2em] text-[#f2be64] font-bold">
                    Official Dossier
                  </span>
                  <span className="h-px w-8 bg-[#f2be64]/40" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-headline font-bold text-white tracking-tight">
                  Institutional Rigor with High-Touch Family Stewardship
                </h2>
                <p className="text-sm font-body text-[#c2c7d0] leading-relaxed">
                  As an authorized Senior LIC Insurance Advisor, Aman Chaudhary specializes in converting complex financial life goals into guaranteed wealth outcomes. Recognizing that life insurance is an emotional as well as financial compact, his advisory framework bridges the sovereign security of LIC of India with customized, inflation-beating portfolio allocation.
                </p>
                <p className="text-sm font-body text-[#c2c7d0] leading-relaxed">
                  Whether securing top-tier overseas university funds for your children via <em>Amritbaal & Jeevan Labh</em>, or anchoring non-taxable lifelong monthly income through <em>Jeevan Umang & Jeevan Utsav</em>, every recommendation is individually audited against cash-flow resilience and Section 10(10D) tax immunity.
                </p>

                {/* Key Credentials Chips */}
                <div className="pt-4 flex flex-wrap gap-2.5">
                  {credentials.map((cred, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-[#1e2023] border border-white/10 text-xs font-label font-medium text-white flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[#f2be64] text-[16px]">
                        {cred.icon}
                      </span>
                      {cred.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quote Block */}
              <div className="mt-8 pt-6 border-t border-white/10 bg-[#1e2023]/60 p-5 rounded-2xl flex items-start gap-3.5">
                <span className="material-symbols-outlined text-[#f2be64] text-[28px] shrink-0">
                  format_quote
                </span>
                <div className="text-xs sm:text-sm font-body italic text-[#c2c7d0] leading-relaxed">
                  &ldquo;My responsibility doesn&apos;t end with issuing a policy bond. It begins there, remaining active until the day the maturity check or claim settlement reaches your family&apos;s hands.&rdquo;
                  <div className="not-italic font-headline font-bold text-white mt-2 text-xs uppercase tracking-wider">
                    — Aman Chaudhary
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Performance Metrics & Progress Trackers */}
            <div className="lg:col-span-5 p-8 rounded-3xl bg-[#1a1c1f] border border-white/5 shadow-xl flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-label uppercase tracking-widest text-[#b1c8ea] font-bold">
                  Execution Benchmarks
                </span>
                <h3 className="text-xl font-headline font-bold text-white mt-1 mb-6">
                  Audited Performance Rates
                </h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-label uppercase">
                      <span className="text-white font-semibold">Claim Settlement Assistance</span>
                      <span className="text-[#f2be64] font-bold tracking-wider">99.2%</span>
                    </div>
                    <div className="w-full h-2 bg-[#0c0e12] rounded-full overflow-hidden">
                      <div className="h-full bg-[#f2be64] rounded-full" style={{ width: "99.2%" }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-label uppercase">
                      <span className="text-white font-semibold">Doorstep KYC & Service Delivery</span>
                      <span className="text-[#b1c8ea] font-bold tracking-wider">98.7%</span>
                    </div>
                    <div className="w-full h-2 bg-[#0c0e12] rounded-full overflow-hidden">
                      <div className="h-full bg-[#b1c8ea] rounded-full" style={{ width: "98.7%" }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-label uppercase">
                      <span className="text-white font-semibold">Tax Deduction Maxima (80C & 10D)</span>
                      <span className="text-emerald-400 font-bold tracking-wider">100% Compliant</span>
                    </div>
                    <div className="w-full h-2 bg-[#0c0e12] rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full" style={{ width: "100%" }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-label uppercase">
                      <span className="text-white font-semibold">Policy Renewal & Persistence</span>
                      <span className="text-[#d1c1dd] font-bold tracking-wider">96.4%</span>
                    </div>
                    <div className="w-full h-2 bg-[#0c0e12] rounded-full overflow-hidden">
                      <div className="h-full bg-[#d1c1dd] rounded-full" style={{ width: "96.4%" }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#1e2023] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#f2be64] text-lg">shield</span>
                  <span className="text-xs font-label uppercase tracking-wider text-white">
                    Section 37 Sovereign Guarantee
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#f2be64] font-bold">100% CAPITAL BACKED</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CLIENT STEWARDSHIP PILLARS & TESTIMONIALS */}
        <StitchStewardshipAndTestimonials />

        {/* 5. FREQUENTLY ASKED ADVISORY QUESTIONS */}
        <section className="w-full px-6 lg:px-12 py-16 bg-[#0c0e12]/80 border-t border-white/5">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2 mb-8">
              <span className="text-xs font-label uppercase tracking-widest text-[#f2be64] font-bold">
                ADVISORY CLARITY
              </span>
              <h2 className="text-2xl sm:text-3xl font-headline font-bold text-white">
                Frequently Addressed Inquiries
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#1a1c1f] border border-white/5 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-headline text-sm sm:text-base font-semibold text-white hover:text-[#f2be64] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="material-symbols-outlined text-[20px] text-[#f2be64] shrink-0">
                      {activeFaq === idx ? "expand_less" : "expand_more"}
                    </span>
                  </button>
                  {activeFaq === idx && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm font-body text-[#c2c7d0] leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. PRIORITY CONSULTATION VAULT */}
        <div id="consultation-vault">
          <StitchConsultationVault />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-[#0c0e12] py-12 border-t border-white/10 text-center text-xs font-label text-[#c2c7d0]/60">
        <p>© 2026 AMAN CHAUDHARY • AUTHORIZED SENIOR LIC ADVISOR (AGENCY: LIC-ND-7817929)</p>
        <p className="mt-1 text-[10px] uppercase tracking-wider text-[#c2c7d0]/40">
          Insurance is the subject matter of solicitation • Sovereign Guarantee under Section 37 LIC Act 1956
        </p>
      </footer>
    </div>
  );
}
