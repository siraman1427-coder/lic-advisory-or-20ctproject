"use client";

import { useState } from "react";
import Image from "next/image";
import GlobalHeader from "../components/GlobalHeader";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    domain: "Whole Life Regular Income (Jeevan Umang / Utsav)",
    channel: "Phone Call",
    notes: "",
  });
  const [toastVisible, setToastVisible] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 5500);
  };

  const offices = [
    {
      city: "New Delhi (Headquarters / Division)",
      address: "LIC Northern Zonal Division, Connaught Place, New Delhi",
      phone: "+91 7817929602",
      type: "Primary Advisory Hub",
    },
    {
      city: "Noida / Greater Noida",
      address: "Sector 18 & Expressway Executive Client Desk",
      phone: "+91 7817929602",
      type: "Doorstep Verification Available",
    },
    {
      city: "Gurugram / Cyber City",
      address: "Golf Course Road & DLF CyberCity Advisory Suite",
      phone: "+91 7817929602",
      type: "High-Net-Worth Advisory",
    },
  ];

  const faqs = [
    {
      q: "Is there any consultancy or filing charge for booking a consultation?",
      a: "No. All advisory sessions, policy health audits, and doorstep KYC documentation visits provided by Aman Chaudhary are 100% free of charge under official LIC of India guidelines.",
    },
    {
      q: "How does the Section 37 Sovereign Guarantee protect my investment?",
      a: "Under Section 37 of the LIC Act 1956, the Sum Assured and all accrued bonuses declared by the Life Insurance Corporation of India are fully guaranteed as to payment in cash by the Central Government of India.",
    },
    {
      q: "Can Aman assist with an existing policy purchased through another agent?",
      a: "Yes. Aman offers complimentary servicing for existing policies across India, including address changes, nomination updates, ECS registration, policy revival, and priority death/maturity claim processing.",
    },
    {
      q: "How does Doorstep Document Pickup work?",
      a: "Once you schedule an appointment, Aman or an authorized associate visits your residence or office at your preferred hour to verify KYC documents, explain plan terms in detail, and issue official acknowledgement receipts.",
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

      {/* TOAST NOTIFICATION */}
      <div
        className={`fixed bottom-6 right-6 z-50 transform transition-all duration-500 pointer-events-none ${
          toastVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        <div className="flex items-center gap-3.5 px-5 py-4 rounded-xl bg-[#282a2e] border border-[#f2be64]/50 text-white shadow-2xl">
          <span className="material-symbols-outlined text-[#f2be64] text-2xl">check_circle</span>
          <div className="flex flex-col">
            <span className="font-headline font-bold text-sm tracking-wide">
              Callback Dispatched
            </span>
            <span className="text-xs text-[#c2c7d0] font-body">
              Aman Chaudhary will initiate contact shortly within 15 minutes.
            </span>
          </div>
        </div>
      </div>

      <GlobalHeader />

      <main className="relative z-10 w-full">
        {/* 1. HERO & VERIFICATION BANNER */}
        <section className="relative w-full px-6 lg:px-12 pt-6 pb-10 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <span className="flex items-center gap-2 text-xs font-label uppercase tracking-widest text-[#c2c7d0]">
                  <span className="material-symbols-outlined text-sm">home</span>
                  <span>LIC Advisory Desk</span>
                </span>
                <span className="text-white/20 text-xs">/</span>
                <span className="text-xs font-label uppercase tracking-widest text-[#f2be64] font-bold">
                  Contact & Priority Callback
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1a1c1f] border border-white/10 text-white text-xs font-label uppercase tracking-wider">
                <span className="material-symbols-outlined text-[#f2be64] text-sm">verified_user</span>
                <span>IRDAI Regulatory Protection Direct Conduit</span>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-4">
              <div className="max-w-3xl flex flex-col gap-3">
                <div className="inline-flex items-center gap-2 text-[#f2be64] text-xs font-label uppercase tracking-widest font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#f2be64]" />
                  Direct Agency Underwriting Desk
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-extrabold text-white leading-tight tracking-tight">
                  Get in Touch with Your Trusted Advisor{" "}
                  <span className="font-body italic font-normal text-[#f2be64]">Aman Chaudhary</span>
                </h1>
                <p className="text-sm sm:text-base text-[#c2c7d0] font-body leading-relaxed pt-1">
                  Instant response, bespoke actuarial guidance, and institutional claims assistance at zero advisory fee. Backed by sovereign government guarantees under Section 37 of the LIC Act.
                </p>
              </div>

              {/* Quick Sovereign Assurance Card */}
              <div className="p-4 rounded-xl bg-[#1a1c1f] border border-white/10 shadow-sm flex items-center gap-4 self-start lg:self-end min-w-[240px]">
                <div className="w-11 h-11 rounded-lg bg-[#f2be64]/15 flex items-center justify-center text-[#f2be64] shrink-0">
                  <span className="material-symbols-outlined text-2xl">shield_person</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-label uppercase tracking-wider text-[#c2c7d0]">
                    Sovereign Assurance
                  </span>
                  <span className="font-headline font-bold text-sm text-white">
                    100% Capital & Bonus Safety
                  </span>
                </div>
              </div>
            </div>

            {/* Rapid SLA Metric Badges Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pt-4">
              <div className="group p-4 rounded-xl bg-[#1e2023] hover:bg-[#282a2e] border border-white/5 hover:border-[#f2be64]/40 transition-all duration-300 shadow-sm flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[#f2be64]">
                  <span className="text-xs font-label uppercase tracking-wider font-semibold">
                    Rapid Response
                  </span>
                  <span className="material-symbols-outlined text-lg">timer</span>
                </div>
                <span className="font-headline font-bold text-lg sm:text-xl text-white tracking-tight">
                  &lt; 15 Mins
                </span>
                <span className="text-[11px] text-[#c2c7d0] font-body leading-snug">
                  Average phone callback latency
                </span>
              </div>

              <div className="group p-4 rounded-xl bg-[#1e2023] hover:bg-[#282a2e] border border-white/5 hover:border-[#b1c8ea]/40 transition-all duration-300 shadow-sm flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[#b1c8ea]">
                  <span className="text-xs font-label uppercase tracking-wider font-semibold">
                    Consultation
                  </span>
                  <span className="material-symbols-outlined text-lg">currency_rupee</span>
                </div>
                <span className="font-headline font-bold text-lg sm:text-xl text-white tracking-tight">
                  ₹0 Free
                </span>
                <span className="text-[11px] text-[#c2c7d0] font-body leading-snug">
                  No service fee or brokerage markups
                </span>
              </div>

              <div className="group p-4 rounded-xl bg-[#1e2023] hover:bg-[#282a2e] border border-white/5 hover:border-emerald-400/40 transition-all duration-300 shadow-sm flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-emerald-400">
                  <span className="text-xs font-label uppercase tracking-wider font-semibold">
                    Track Record
                  </span>
                  <span className="material-symbols-outlined text-lg">fact_check</span>
                </div>
                <span className="font-headline font-bold text-lg sm:text-xl text-white tracking-tight">
                  99.2% Settled
                </span>
                <span className="text-[11px] text-[#c2c7d0] font-body leading-snug">
                  Assisted death & maturity claim ratio
                </span>
              </div>

              <div className="group p-4 rounded-xl bg-[#1e2023] hover:bg-[#282a2e] border border-white/5 hover:border-[#d1c1dd]/40 transition-all duration-300 shadow-sm flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[#d1c1dd]">
                  <span className="text-xs font-label uppercase tracking-wider font-semibold">
                    Legal Trust
                  </span>
                  <span className="material-symbols-outlined text-lg">policy</span>
                </div>
                <span className="font-headline font-bold text-lg sm:text-xl text-white tracking-tight">
                  Sec. 37 LIC Act
                </span>
                <span className="text-[11px] text-[#c2c7d0] font-body leading-snug">
                  Statutory branch desk validation
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. MAIN SPLIT: ADVISOR DESK CARD & PRIORITY BOOKING FORM */}
        <section className="w-full px-6 lg:px-12 py-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Advisor Desk Profile (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="p-6 rounded-2xl bg-[#1e2023] border border-white/10 shadow-md flex flex-col gap-6 relative overflow-hidden">
                {/* Profile Header */}
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden relative border border-white/15">
                      <Image
                        src="/images/aman_chaudhary.jpg"
                        alt="Aman Chaudhary"
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#111317] border border-white/20 flex items-center justify-center text-[#f2be64]">
                      <span className="material-symbols-outlined text-sm">workspace_premium</span>
                    </div>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="font-headline font-extrabold text-lg sm:text-xl text-white truncate">
                        Aman Chaudhary
                      </h2>
                      <span className="material-symbols-outlined text-[#f2be64] text-lg shrink-0">
                        verified
                      </span>
                    </div>
                    <p className="text-xs text-[#c2c7d0] font-body mt-0.5">
                      Senior Life Insurance & Wealth Advisor
                    </p>
                    <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-[#282a2e] border border-white/10 w-fit">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f2be64] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f2be64]" />
                      </span>
                      <span className="text-[11px] font-label font-medium uppercase tracking-wider text-white">
                        Available for Instant Calls
                      </span>
                    </div>
                  </div>
                </div>

                {/* Live Timings Badge */}
                <div className="p-3.5 rounded-xl bg-[#1a1c1f] border border-white/5 flex items-center justify-between text-xs">
                  <span className="text-[#c2c7d0] font-label uppercase tracking-wider flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#f2be64]">schedule</span>
                    Active Consulting Hours
                  </span>
                  <span className="font-headline font-bold text-white">09:00 - 21:00 IST</span>
                </div>

                {/* Channel 1: Priority Hotline Phone */}
                <div className="p-4 rounded-xl bg-[#282a2e] border border-white/10 hover:bg-[#333539] transition-all flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-[#314865] text-[#b1c8ea] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-xl">phone_in_talk</span>
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-[10px] font-label uppercase tracking-widest text-[#c2c7d0]">
                        Priority Hotline (Direct)
                      </span>
                      <span className="font-headline font-extrabold text-sm sm:text-base text-white tracking-wide">
                        7817929602
                      </span>
                    </div>
                  </div>
                  <a
                    href="tel:7817929602"
                    className="px-3.5 py-2 rounded-lg bg-[#b1c8ea] text-black text-xs font-label uppercase tracking-wider font-bold hover:bg-white transition-colors shrink-0 flex items-center gap-1.5"
                  >
                    <span>Call</span>
                  </a>
                </div>

                {/* Channel 2: WhatsApp Hotline */}
                <div className="p-4 rounded-xl bg-[#282a2e] border border-white/10 hover:bg-[#333539] transition-all flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-emerald-950/70 text-emerald-400 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-xl">chat</span>
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-[10px] font-label uppercase tracking-widest text-[#c2c7d0]">
                        WhatsApp Instant Chat
                      </span>
                      <span className="font-headline font-extrabold text-sm sm:text-base text-white tracking-wide">
                        +91 7817929602
                      </span>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/917817929602"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-lg bg-[#f2be64] text-black text-xs font-label uppercase tracking-wider font-bold hover:bg-[#ffdeaa] transition-colors shrink-0 flex items-center gap-1.5 shadow-[0_2px_10px_rgba(242,190,100,0.3)]"
                  >
                    <span>Message</span>
                  </a>
                </div>

                {/* Channel 3: Email Dispatch */}
                <div className="p-4 rounded-xl bg-[#282a2e] border border-white/10 hover:bg-[#333539] transition-all flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-[#998ba5]/30 text-[#d1c1dd] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-xl">mail</span>
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-[10px] font-label uppercase tracking-widest text-[#c2c7d0]">
                        Official Email
                      </span>
                      <span className="font-headline font-bold text-xs sm:text-sm text-white tracking-wide truncate">
                        siraman142@gmail.com
                      </span>
                    </div>
                  </div>
                  <a
                    href="mailto:siraman142@gmail.com"
                    className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-label uppercase tracking-wider font-bold transition-colors shrink-0"
                  >
                    <span>Write</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Priority Booking Form (7 cols) */}
            <div className="lg:col-span-7 bg-[#1e2023] border border-white/10 p-6 sm:p-10 rounded-3xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-label uppercase tracking-[0.2em] text-[#f2be64] font-bold">
                    Schedule Review
                  </span>
                  <span className="h-px w-8 bg-[#f2be64]/40" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-headline font-bold text-white tracking-tight">
                  Request a Priority Consultation Call
                </h3>
                <p className="text-xs sm:text-sm text-[#c2c7d0] font-body mt-2 leading-relaxed">
                  Provide your details below to receive a personalized actuarial plan projection and callback from Aman within 15 minutes.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-label uppercase tracking-wider text-[#c2c7d0]">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Vikramaditya Singhal"
                        className="w-full px-4 py-3 rounded-xl bg-[#0c0e12] border border-white/10 text-white text-xs font-headline placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#f2be64]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-label uppercase tracking-wider text-[#c2c7d0]">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-[#0c0e12] border border-white/10 text-white text-xs font-headline placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#f2be64]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-label uppercase tracking-wider text-[#c2c7d0]">
                      Preferred Advisory Domain
                    </label>
                    <select
                      value={formData.domain}
                      onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0c0e12] border border-white/10 text-white text-xs font-headline focus:outline-none focus:ring-2 focus:ring-[#f2be64]"
                    >
                      <option>Whole Life Regular Income (Jeevan Umang / Utsav)</option>
                      <option>Child Education & Milestone Fund (Amritbaal)</option>
                      <option>Pure Term Insurance High Sum Assured (Tech-Term)</option>
                      <option>Lifelong Pension & Immediate Annuity (Akshay VII)</option>
                      <option>Existing LIC Policy Audit & Claim Assistance</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-label uppercase tracking-wider text-[#c2c7d0]">
                      Preferred Mode of Communication
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Phone Call", "WhatsApp", "Doorstep Visit"].map((m) => (
                        <button
                          type="button"
                          key={m}
                          onClick={() => setFormData({ ...formData, channel: m })}
                          className={`py-2.5 px-3 rounded-xl text-xs font-label uppercase tracking-wider transition-all border ${
                            formData.channel === m
                              ? "bg-[#f2be64] text-black font-bold border-[#f2be64] shadow-sm"
                              : "bg-[#0c0e12] text-[#c2c7d0] border-white/10 hover:border-white/30"
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-label uppercase tracking-wider text-[#c2c7d0]">
                      Optional Notes / Specific Queries
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Looking for ₹25 Lakh annual retirement pension starting from age 55..."
                      className="w-full px-4 py-3 rounded-xl bg-[#0c0e12] border border-white/10 text-white text-xs font-headline placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#f2be64]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="shimmer-mask w-full py-4 rounded-xl bg-[#f2be64] text-black font-headline font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-[#ffdeaa] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span>Submit & Request Priority Callback</span>
                  </button>
                </form>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-label text-[#c2c7d0]">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-emerald-400 text-sm">lock</span>
                  100% Encrypted & Privacy Protected
                </span>
                <span>Zero Brokerage Markups</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. COVERAGE HUBS & NCR SERVICE DESKS */}
        <section className="w-full bg-[#0c0e12]/80 py-16 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
              <span className="text-[10px] font-label tracking-widest uppercase text-[#f2be64] font-bold">
                JURISDICTION & SERVICE DESKS
              </span>
              <h3 className="font-headline text-3xl font-bold text-white">
                NCR & Pan-India Service Hubs
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {offices.map((office, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-[#1e2023] border border-white/10 space-y-3 hover:border-[#f2be64]/40 transition-all shadow-md group"
                >
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-label uppercase bg-[#f2be64]/10 border border-[#f2be64]/30 text-[#f2be64] font-bold">
                    {office.type}
                  </span>
                  <h4 className="font-headline font-bold text-xl text-white group-hover:text-[#f2be64] transition-colors">
                    {office.city}
                  </h4>
                  <p className="text-xs font-body text-[#c2c7d0] leading-relaxed">
                    {office.address}
                  </p>
                  <a
                    href={`tel:${office.phone}`}
                    className="inline-flex items-center gap-1.5 text-xs font-label uppercase font-bold text-[#b1c8ea] pt-2 hover:text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">call</span>
                    <span>{office.phone}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. ADVISORY FAQS */}
        <section className="w-full px-6 lg:px-12 py-16">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2 mb-8">
              <span className="text-xs font-label uppercase tracking-widest text-[#f2be64] font-bold">
                CLEAR COMPLIANCE
              </span>
              <h2 className="text-2xl sm:text-3xl font-headline font-bold text-white">
                Frequently Addressed Questions
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#1e2023] border border-white/5 overflow-hidden transition-all"
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
