"use client";

import GlobalHeader from "../components/GlobalHeader";
import LICPortfolioArchive from "../components/LICPortfolioArchive";

export default function PlansPage() {
  return (
    <div className="relative min-h-screen bg-[#05070B] text-white selection:bg-[#F59E0B] selection:text-black">
      <GlobalHeader />

      <main>
        {/* BANNER HEADER */}
        <section className="relative w-full pt-16 pb-8 bg-gradient-to-b from-[#090C12] to-[#05070B] border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4">
              <span className="px-3.5 py-1 rounded-full text-[10px] font-mono tracking-[0.25em] text-[#38BDF8] uppercase bg-[#00529B]/20 border border-[#38BDF8]/30 font-semibold">
                CURATED LIFE COVER & STATUTORY ASSET VAULT
              </span>
              <h1 className="font-editorial-serif text-4xl sm:text-5xl lg:text-6xl text-white">
                LIC Insurance Plans Archive
              </h1>
              <p className="font-editorial-sans text-sm sm:text-base text-white/70 font-light max-w-2xl leading-relaxed">
                Explore sovereign-backed whole life income, high-sum term assurance, guaranteed pension annuities, and child milestone funds.
              </p>
            </div>
          </div>
        </section>

        {/* FULL PORTFOLIO ARCHIVE */}
        <LICPortfolioArchive />
      </main>
    </div>
  );
}
