"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import GlobalHeader from "../components/GlobalHeader";
import StitchConsultationVault from "../components/StitchConsultationVault";

interface PlanItem {
  id: string;
  title: string;
  planNo: string;
  category: "protection" | "savings" | "child" | "pension" | "ulip";
  categoryLabel: string;
  badgeTone: "gold" | "cyan" | "blue" | "purple";
  description: string;
  coverRange: string;
  policyTerm: string;
  csrMetric: string;
  keyFeature: string;
  taxBenefits: string;
  image: string;
}

export default function PlansPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activePlanModal, setActivePlanModal] = useState<PlanItem | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login?redirect=/plans");
    }
  }, [user, isLoading, router]);

  const plans: PlanItem[] = [
    {
      id: "techterm",
      title: "LIC Tech-Term",
      planNo: "Plan 854 • Pure Protection",
      category: "protection",
      categoryLabel: "Protection",
      badgeTone: "blue",
      description:
        "Highest-tier pure life protection policy offering massive financial security to nominees with lowest per-lakh premium rates and preferential non-smoker rates.",
      coverRange: "₹50 Lakhs – ₹5+ Cr",
      policyTerm: "10 to 40 Years",
      csrMetric: "98.6% Industry Benchmark",
      keyFeature: "Level or Increasing Sum Assured with Accidental Rider option",
      taxBenefits: "Section 80C premium deduction & 100% Tax-Free death claim",
      image: "/images/card_shield.jpg",
    },
    {
      id: "umang",
      title: "LIC Jeevan Umang",
      planNo: "Plan 945 • Whole Life Income",
      category: "savings",
      categoryLabel: "Endowment & Savings",
      badgeTone: "gold",
      description:
        "Guaranteed 8% annual survival payouts every year for life after premium paying term, followed by a massive tax-free maturity lumpsum at age 100.",
      coverRange: "₹2 Lakhs – No Upper Limit",
      policyTerm: "Up to Age 100",
      csrMetric: "Guaranteed 8% P.A.",
      keyFeature: "Annual survival benefit starting immediately after PPT + Reversionary bonuses",
      taxBenefits: "Deduction under 80C & Tax-Free survival payouts under 10(10D)",
      image: "/images/card_umang.jpg",
    },
    {
      id: "utsav",
      title: "LIC Jeevan Utsav",
      planNo: "Plan 871 • Limited Premium",
      category: "savings",
      categoryLabel: "Endowment & Savings",
      badgeTone: "gold",
      description:
        "Guaranteed Additions throughout PPT followed by 10% of Sum Assured annual regular income for life or flexi-income option with compounding interest.",
      coverRange: "₹5 Lakhs – No Upper Limit",
      policyTerm: "Lifelong Whole Life",
      csrMetric: "Guaranteed 10% P.A.",
      keyFeature: "Guaranteed Addition of ₹40 per thousand Sum Assured + 5.5% deferment compounding",
      taxBenefits: "Section 80C deduction & 100% tax-free annual income",
      image: "/images/card_utsav.jpg",
    },
    {
      id: "amritbaal",
      title: "LIC Amritbaal & Jeevan Tarun",
      planNo: "Plans 874 & 834 • Child Milestones",
      category: "child",
      categoryLabel: "Child Future & Edu",
      badgeTone: "gold",
      description:
        "High guaranteed additions of ₹80 per ₹1,000 Sum Assured engineered to fund Ivy-league education, professional degrees, and milestone launches without market risk.",
      coverRange: "₹2 Lakhs – Flexible",
      policyTerm: "Maturity Age 18–25",
      csrMetric: "₹80/₹1k Additions",
      keyFeature: "Premium Waiver Benefit rider ensures fund matures even upon parent demise",
      taxBenefits: "100% Tax-free maturity corpus for educational fees",
      image: "/images/card_education.jpg",
    },
    {
      id: "akshay",
      title: "LIC Jeevan Akshay VII",
      planNo: "Plan 857 • Immediate Annuity",
      category: "pension",
      categoryLabel: "Retirement & Pension",
      badgeTone: "cyan",
      description:
        "Single premium immediate annuity locking in fixed, lifelong pension payouts immune to recession, interest cuts, or inflation shocks, with return of capital.",
      coverRange: "Single Premium Deposit",
      policyTerm: "Lifelong Guaranteed",
      csrMetric: "Immune to Inflation Cuts",
      keyFeature: "Option for single or joint-life pension with 100% capital return to legal heirs",
      taxBenefits: "Section 80CCC deduction on annuity investment",
      image: "/images/card_pension.jpg",
    },
    {
      id: "nivesh",
      title: "LIC SIIP & Nivesh Plus",
      planNo: "Plans 852 & 849 • Unit Linked",
      category: "ulip",
      categoryLabel: "ULIP & Wealth",
      badgeTone: "purple",
      description:
        "Unit Linked insurance and wealth creation portfolio providing market upside with sovereign safety net, flexible fund switching, and life cover protection.",
      coverRange: "₹1 Lakh – Flexible",
      policyTerm: "10 to 25 Years",
      csrMetric: "Guaranteed Additions",
      keyFeature: "4 fund choices (Bond, Secured, Balanced, Growth) with free switching",
      taxBenefits: "Eligible for Section 80C and capital gains exemptions",
      image: "/images/card_shield.jpg",
    },
  ];

  const categories = [
    { id: "all", label: "All (6)" },
    { id: "protection", label: "Protection" },
    { id: "savings", label: "Endowment & Savings" },
    { id: "child", label: "Child Future & Edu" },
    { id: "pension", label: "Retirement & Pension" },
    { id: "ulip", label: "ULIP & Wealth" },
  ];

  const filteredPlans = plans.filter((plan) => {
    const matchesCategory =
      selectedCategory === "all" || plan.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === "" ||
      plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.planNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-[#111317] flex items-center justify-center text-white font-sans">
        <div className="flex flex-col items-center gap-3">
          <span className="inline-block w-8 h-8 border-2 border-[#f2be64] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-mono tracking-widest text-[#f2be64] uppercase">
            Verifying Sovereign Credentials...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#111317] text-[#e2e2e7] font-body selection:bg-[#f2be64] selection:text-black overflow-x-hidden">
      {/* ATMOSPHERIC AMBIENT LIGHTING */}
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
        {/* 1. HEADER CONTEXT STRIP (TRUST BADGES & TARRIF STATUS) */}
        <section className="w-full px-6 lg:px-12 pt-6 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-4 py-2 px-4 rounded-xl bg-[#1a1c1f] border border-white/5 shadow-sm max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-[#282a2e] flex items-center justify-center overflow-hidden border border-white/10 shadow-inner">
                <Image
                  src="/images/lic_logo.png"
                  alt="LIC Emblem"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-label uppercase tracking-widest text-[#f2be64] font-bold">
                  Authorized Portfolio Catalog
                </span>
                <span className="text-[11px] font-headline text-[#c2c7d0]">
                  Regulated Under Section 37 of LIC Act 1956 • Sovereign Assurance
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-label font-medium bg-[#282a2e] text-white border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f2be64] animate-pulse" />
                FY 2025-26 Approved Tariffs
              </span>
              <a
                href="tel:7817929602"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-label uppercase tracking-wider bg-[#314865] text-[#b1c8ea] border border-[#b1c8ea]/30 hover:bg-[#3d5a7d] transition-all font-semibold"
              >
                <span className="material-symbols-outlined text-[14px]">support_agent</span>
                Desk Open
              </a>
            </div>
          </div>
        </section>

        {/* 2. HERO POSITIONING & TRUST GUARANTEE RIBBONS */}
        <section className="w-full px-6 lg:px-12 pt-4 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2be64]/15 border border-[#f2be64]/30 text-[#f2be64] text-xs font-label uppercase tracking-wider mb-3">
                <span className="material-symbols-outlined text-[15px]">verified_user</span>
                Senior Advisor Portfolio Underwriting
              </div>
              <h1 className="text-3xl md:text-5xl font-headline font-bold text-white tracking-tight leading-tight">
                Discover the Best LIC Life Insurance{" "}
                <span className="text-[#f2be64]">& Investment Plans</span>
              </h1>
              <p className="mt-4 text-base md:text-lg font-body text-[#c2c7d0] leading-relaxed max-w-3xl">
                Tailored by Aman Chaudhary to secure your family&apos;s generational future, child&apos;s education milestones, and high-yield tax-shielded retirement vaults with sovereign-backed peace of mind.
              </p>
            </div>

            {/* Trust Guarantee Ribbons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-8">
              <div className="p-4 rounded-xl bg-[#1e2023] border border-white/5 flex items-start gap-3.5 shadow-sm hover:bg-[#282a2e] transition-colors">
                <div className="p-2.5 rounded-lg bg-[#0c0e12] text-[#f2be64] shrink-0 border border-white/5">
                  <span className="material-symbols-outlined text-[22px]">account_balance</span>
                </div>
                <div>
                  <div className="text-xs font-headline font-bold uppercase tracking-wider text-white">
                    100% Sovereign Guarantee
                  </div>
                  <p className="text-xs font-body text-[#c2c7d0] mt-0.5">
                    Sum assured & accrued bonuses guaranteed by Govt. of India (Sec 37 LIC Act).
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#1e2023] border border-white/5 flex items-start gap-3.5 shadow-sm hover:bg-[#282a2e] transition-colors">
                <div className="p-2.5 rounded-lg bg-[#0c0e12] text-[#b1c8ea] shrink-0 border border-white/5">
                  <span className="material-symbols-outlined text-[22px]">shield_lock</span>
                </div>
                <div>
                  <div className="text-xs font-headline font-bold uppercase tracking-wider text-white">
                    Zero Market Volatility Risk
                  </div>
                  <p className="text-xs font-body text-[#c2c7d0] mt-0.5">
                    Guaranteed maturity payouts immune to equity crash, recessions, or index drops.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#1e2023] border border-white/5 flex items-start gap-3.5 shadow-sm hover:bg-[#282a2e] transition-colors">
                <div className="p-2.5 rounded-lg bg-[#0c0e12] text-[#d1c1dd] shrink-0 border border-white/5">
                  <span className="material-symbols-outlined text-[22px]">receipt_long</span>
                </div>
                <div>
                  <div className="text-xs font-headline font-bold uppercase tracking-wider text-white">
                    Sec 80C & Sec 10(10D) Tax Shield
                  </div>
                  <p className="text-xs font-body text-[#c2c7d0] mt-0.5">
                    Tax deductible premiums plus 100% tax-free maturity and death claims under Indian IT Act.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. STICKY SEARCH & FILTER CONTROLS */}
        <section className="w-full px-6 lg:px-12 py-3 sticky top-20 z-30 bg-[#111317]/95 backdrop-blur-md border-y border-white/10">
          <div className="max-w-7xl mx-auto p-3 rounded-2xl bg-[#1a1c1f] border border-white/5 shadow-md flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c2c7d0] text-[20px]">
                search
              </span>
              <input
                id="planSearchInput"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search plan by name, table number (e.g. 945, Tech-Term), or life goal..."
                className="w-full pl-11 pr-4 py-2.5 bg-[#0c0e12] text-white rounded-xl text-xs font-headline placeholder:text-[#c2c7d0]/60 focus:outline-none focus:ring-2 focus:ring-[#f2be64] border border-white/10 transition-all"
              />
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`whitespace-nowrap px-3.5 py-2 rounded-lg text-xs font-label uppercase tracking-wider transition-all shadow-sm ${
                      isActive
                        ? "bg-[#f2be64] text-black font-bold shadow-[0_2px_12px_rgba(242,190,100,0.3)]"
                        : "bg-[#282a2e] text-[#c2c7d0] hover:text-white hover:bg-[#333539] border border-white/5"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. PLANS CATALOG CARDS GRID */}
        <section className="w-full px-6 lg:px-12 py-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-6">
              <div>
                <span className="text-xs font-label uppercase tracking-widest text-[#c2c7d0]">
                  Portfolio Schemes
                </span>
                <h2 className="text-2xl font-headline font-bold text-white mt-1">
                  Recommended Sovereign Asset Plans
                </h2>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs font-label text-[#c2c7d0]">
                <span className="inline-block w-2 h-2 rounded-full bg-[#f2be64]" />
                <span>Endorsed for 2025–26 Financial Milestones</span>
              </div>
            </div>

            {filteredPlans.length === 0 ? (
              <div className="py-16 text-center rounded-2xl bg-[#1a1c1f] border border-white/10">
                <span className="material-symbols-outlined text-4xl text-[#f2be64]">search_off</span>
                <h3 className="font-headline text-lg font-bold text-white mt-2">
                  No Matching Plans Found
                </h3>
                <p className="text-xs text-[#c2c7d0] mt-1">
                  Try searching with a different keyword or reset filters to &quot;All&quot;.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="mt-4 px-4 py-2 rounded-lg bg-[#f2be64] text-black text-xs font-label font-bold uppercase tracking-wider"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlans.map((plan) => (
                  <article
                    key={plan.id}
                    onClick={() => setActivePlanModal(plan)}
                    className="group relative flex flex-col justify-between p-6 rounded-2xl bg-[#1e2023] hover:bg-[#282a2e] border border-white/10 hover:border-[#f2be64]/50 transition-all duration-300 shadow-md hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-label font-bold uppercase tracking-wider bg-[#314865] text-[#b1c8ea] border border-[#b1c8ea]/30">
                            {plan.planNo}
                          </span>
                          <h3 className="text-xl font-headline font-bold text-white mt-2 group-hover:text-[#f2be64] transition-colors">
                            {plan.title}
                          </h3>
                        </div>
                        <div className="p-2.5 rounded-xl bg-[#0c0e12] text-[#f2be64] border border-white/5">
                          <span className="material-symbols-outlined text-[24px]">verified_user</span>
                        </div>
                      </div>

                      <p className="text-xs font-body text-[#c2c7d0] leading-relaxed line-clamp-3">
                        {plan.description}
                      </p>

                      <div className="space-y-2 pt-2">
                        <div className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-[#0c0e12]/60 border border-white/5">
                          <span className="text-[#c2c7d0] font-label">Target Cover Range</span>
                          <span className="font-headline font-bold text-white">{plan.coverRange}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-[#0c0e12]/60 border border-white/5">
                          <span className="text-[#c2c7d0] font-label">Policy Term</span>
                          <span className="font-headline font-semibold text-white">{plan.policyTerm}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-[#0c0e12]/60 border border-white/5">
                          <span className="text-[#c2c7d0] font-label">Actuarial Metric</span>
                          <span className="font-headline font-bold text-[#f2be64]">{plan.csrMetric}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-label uppercase font-bold text-[#f2be64]">
                      <span>View Actuarial Terms</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 5. PLAN DETAILS MODAL DRAWER */}
        {activePlanModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
            onClick={() => setActivePlanModal(null)}
          >
            <div
              className="relative w-full max-w-2xl rounded-3xl border border-[#f2be64]/40 bg-[#111317] p-6 sm:p-8 shadow-2xl text-left space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-label uppercase tracking-widest text-[#f2be64] font-bold">
                    {activePlanModal.planNo}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-headline font-bold text-white mt-1">
                    {activePlanModal.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActivePlanModal(null)}
                  className="rounded-full border border-white/20 p-2 text-white/60 hover:border-white hover:text-white transition-colors"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-xs font-body text-[#c2c7d0] leading-relaxed">
                <p className="text-sm font-normal text-white">{activePlanModal.description}</p>
                <div className="p-4 rounded-xl bg-[#1e2023] border border-white/10 space-y-2">
                  <div className="flex justify-between py-1 border-b border-white/5 font-label">
                    <span className="text-[#c2c7d0]">Primary Architecture:</span>
                    <span className="text-white font-bold">{activePlanModal.keyFeature}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5 font-label">
                    <span className="text-[#c2c7d0]">Coverage Range:</span>
                    <span className="text-white font-bold">{activePlanModal.coverRange}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5 font-label">
                    <span className="text-[#c2c7d0]">Tax Exemption:</span>
                    <span className="text-[#f2be64] font-bold">{activePlanModal.taxBenefits}</span>
                  </div>
                  <div className="flex justify-between py-1 font-label">
                    <span className="text-[#c2c7d0]">Sovereign Protection:</span>
                    <span className="text-emerald-400 font-bold">Backed by Sec. 37 LIC Act</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <a
                  href="tel:7817929602"
                  className="shimmer-mask inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#f2be64] text-black font-headline font-bold text-xs uppercase tracking-wider"
                >
                  <span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
                  <span>Consult Aman Chaudhary</span>
                </a>
                <a
                  href={`https://wa.me/917817929602?text=Hello%20Aman,%20I%20would%20like%20a%20detailed%20premium%20quote%20for%20${encodeURIComponent(
                    activePlanModal.title
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#314865] text-[#b1c8ea] border border-[#b1c8ea]/30 font-headline font-bold text-xs uppercase tracking-wider hover:bg-[#3d5a7d]"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>WhatsApp Quote</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* 6. PRIORITY CONSULTATION VAULT */}
        <StitchConsultationVault />
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
