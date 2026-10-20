"use client";

import GlobalHeader from "../components/GlobalHeader";
import StitchAdvisorDossier from "../components/StitchAdvisorDossier";
import StitchStewardshipAndTestimonials from "../components/StitchStewardshipAndTestimonials";
import StitchConsultationVault from "../components/StitchConsultationVault";

export default function AdvisorPage() {
  return (
    <div className="relative min-h-screen bg-[#05070B] text-white selection:bg-[#F59E0B] selection:text-black">
      <GlobalHeader />

      <main>
        {/* HERO BANNER FOR ADVISOR */}
        <section className="relative w-full pt-16 pb-12 bg-gradient-to-b from-[#090C12] to-[#05070B] border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4">
              <span className="px-3.5 py-1 rounded-full text-[10px] font-mono tracking-[0.25em] text-[#F59E0B] uppercase bg-[#F59E0B]/10 border border-[#F59E0B]/30 font-semibold">
                IRDAI REGISTERED • SECTION 37 SOVEREIGN GUARANTEE
              </span>
              <h1 className="font-editorial-serif text-4xl sm:text-5xl lg:text-6xl text-white">
                Aman Chaudhary
              </h1>
              <p className="font-editorial-sans text-sm sm:text-base text-white/70 font-light max-w-2xl leading-relaxed">
                Authorized Senior LIC Insurance & Pension Advisor providing institutional financial stewardship, multi-generational wealth preservation, and 100% direct claim settlement support.
              </p>
            </div>
          </div>
        </section>

        {/* ADVISOR DOSSIER & METRICS */}
        <StitchAdvisorDossier />

        {/* STEWARDSHIP STANDARDS & REVIEWS */}
        <StitchStewardshipAndTestimonials />

        {/* CONSULTATION VAULT */}
        <StitchConsultationVault />
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-[#030407] py-12 border-t border-white/10 text-center text-xs font-mono text-white/40">
        <p>© 2025 AMAN CHAUDHARY • LIC INDIA AUTHORIZED ADVISORY (AGENCY: LIC-ND-7817929)</p>
        <p className="mt-1 text-[10px] text-white/30 uppercase">
          Insurance is the subject matter of solicitation • Sovereign Guarantee under Sec 37 LIC Act 1956
        </p>
      </footer>
    </div>
  );
}
