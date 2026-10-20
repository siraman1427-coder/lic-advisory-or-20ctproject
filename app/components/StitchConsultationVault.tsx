"use client";

import { useState } from "react";

export default function StitchConsultationVault() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    objective: "Guaranteed Whole Life (Jeevan Umang)",
    comments: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="consultation-vault" className="relative w-full bg-[#05070B] text-white py-20 lg:py-28 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-[#090C12] border border-white/10 relative overflow-hidden shadow-2xl">
          {/* Subtle gold radial background glow */}
          <div className="pointer-events-none absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-[#F59E0B]/10 blur-[100px]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            {/* Left Column: Heading, Context & Direct Links */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-[#F59E0B]/30 text-[#F59E0B] font-mono text-[10px]">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-ping" />
                <span>LIVE ADVISORY DESK • PRIORITY RESPONSE</span>
              </div>

              <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl text-white">
                Begin Your Sovereign Wealth Consultation
              </h2>

              <p className="text-sm font-light text-white/70 max-w-xl leading-relaxed">
                Connect directly with Aman Chaudhary for zero-fee portfolio review, policy revival, premium quotes, or sovereign term cover structuring.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B]">
                    <span className="material-symbols-outlined text-[20px]">phone_in_talk</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono uppercase text-white/40 tracking-wider">
                      Call Immediately
                    </span>
                    <a
                      href="tel:781792960X"
                      className="text-sm font-semibold text-white hover:text-[#F59E0B] transition-colors"
                    >
                      +91 781792960X
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#38BDF8]/10 flex items-center justify-center text-[#38BDF8]">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono uppercase text-white/40 tracking-wider">
                      Email Dossier
                    </span>
                    <a
                      href="mailto:siraman142@gmail.com"
                      className="text-sm font-semibold text-white hover:text-[#38BDF8] transition-colors"
                    >
                      siraman142@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Dispatch Form */}
            <div className="lg:col-span-5 bg-white/[0.03] border border-white/10 p-6 sm:p-8 rounded-3xl shadow-xl space-y-4">
              <div className="space-y-1">
                <span className="text-sm font-semibold text-white tracking-wide block">
                  Direct Inquiry Dispatch
                </span>
                <p className="text-xs font-mono text-white/50">
                  Aman will return your call within 30 minutes.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-[#00529B]/30 border border-[#38BDF8]/50 text-center space-y-3">
                  <span className="material-symbols-outlined text-4xl text-[#38BDF8]">check_circle</span>
                  <h4 className="font-editorial-serif text-xl text-white">Inquiry Received</h4>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Thank you, <span className="text-[#F59E0B] font-semibold">{formData.name}</span>. Your priority consultation request for <span className="italic">{formData.objective}</span> has been dispatched to Aman Chaudhary.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        phone: "",
                        objective: "Guaranteed Whole Life (Jeevan Umang)",
                        comments: "",
                      });
                    }}
                    className="mt-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono uppercase text-white transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-mono tracking-wider uppercase text-white/60 block mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Chandra"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full bg-black/50 border border-white/15 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-[#F59E0B] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono tracking-wider uppercase text-white/60 block mb-1">
                      Mobile / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full bg-black/50 border border-white/15 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-[#F59E0B] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono tracking-wider uppercase text-white/60 block mb-1">
                      Primary Objective
                    </label>
                    <select
                      value={formData.objective}
                      onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full bg-black/80 border border-white/15 text-white text-xs focus:outline-none focus:border-[#F59E0B] transition-colors"
                    >
                      <option value="Guaranteed Whole Life (Jeevan Umang)">Guaranteed Whole Life (Jeevan Umang)</option>
                      <option value="Guaranteed Annual Payouts (Jeevan Utsav)">Guaranteed Annual Payouts (Jeevan Utsav)</option>
                      <option value="High-Sum Term Shield (Yuva Term / Tech Term)">High-Sum Term Shield (Yuva Term / Tech Term)</option>
                      <option value="Guaranteed Pension & Annuity (Saral Pension)">Guaranteed Pension & Annuity (Saral Pension)</option>
                      <option value="Child Higher Education Provision">Child Higher Education Provision</option>
                      <option value="Existing Policy Servicing / Claim Support">Existing Policy Servicing / Claim Support</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-full bg-[#F59E0B] text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#FBBF24] hover:scale-[1.01] active:scale-[0.99] transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px]">send</span>
                      <span>Request Priority Callback</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
