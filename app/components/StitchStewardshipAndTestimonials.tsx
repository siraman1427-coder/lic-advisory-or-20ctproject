"use client";

export default function StitchStewardshipAndTestimonials() {
  const pillars = [
    {
      icon: "tune",
      color: "gold",
      title: "Personalized Plan Recommendation",
      badge: "Tailored Structuring",
      description:
        "Every portfolio is custom-engineered using rigorous actuarial calculators based on exact income streams, inflation metrics, and retirement timelines.",
    },
    {
      icon: "home_pin",
      color: "blue",
      title: "Doorstep Document Pickup",
      badge: "Zero Queue Hassle",
      description:
        "Complete physical and digital onboarding handled right at your residence or executive office with absolute data confidentiality.",
    },
    {
      icon: "handshake",
      color: "cyan",
      title: "Lifetime Policy Servicing",
      badge: "Perpetual Governance",
      description:
        "Continuous address modifications, ECS setup, nomination revisions, bonus ledger tracking, and priority death/maturity claim settlement assistance.",
    },
    {
      icon: "money_off",
      color: "gold",
      title: "Zero Consultancy Fee",
      badge: "Pure Sovereign Advisory",
      description:
        "Comprehensive actuarial plan evaluations and consultation sessions are 100% complimentary, statutory, and backed by LIC of India regulations.",
    },
  ];

  const testimonials = [
    {
      initials: "RK",
      name: "Rajesh Khanna",
      role: "Business Owner • Gurugram",
      accent: "#F59E0B",
      content:
        "“Aman guided our joint family through comprehensive Jeevan Umang and pension planning. He visited our residence in person, simplified the compound bonus mechanics, and completed KYC without us having to stand in branch lines.”",
    },
    {
      initials: "PS",
      name: "Pooja Sharma",
      role: "Senior Software Architect • Noida",
      accent: "#38BDF8",
      content:
        "“When my father passed away, handling paperwork felt overwhelming. Aman personally prepared the claim file, walked me through the branch formalities, and expedited the full settlement within 11 working days. Truly irreplaceable.”",
    },
    {
      initials: "VM",
      name: "Vikramaditya Mehta",
      role: "Chartered Accountant • New Delhi",
      accent: "#F59E0B",
      content:
        "“I wanted an education fund for my two daughters that could not be impacted by market crashes. Aman structured an ideal child endowment model guaranteed by Sec 37. His honesty and transparency set him completely apart.”",
    },
  ];

  return (
    <section id="stewardship" className="relative w-full bg-[#05070B]/80 backdrop-blur-sm text-white py-20 lg:py-28 overflow-hidden border-t border-white/5 z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        {/* PILLARS HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#F59E0B] uppercase font-bold">
              CLIENT STEWARDSHIP STANDARD
            </span>
          </div>
          <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl text-white">
            Why Choose Aman as your LIC Advisor
          </h2>
          <p className="text-xs sm:text-sm font-light text-white/70">
            Experience private wealth standard insurance structuring without administrative friction or hidden fees.
          </p>
        </div>

        {/* 4 PILLARS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-[#090C12]/90 border border-white/10 hover:border-[#F59E0B]/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(245,158,11,0.15)]"
            >
              <div className="space-y-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                    pillar.color === "gold"
                      ? "bg-[#F59E0B]/10 text-[#F59E0B] group-hover:bg-[#F59E0B] group-hover:text-black"
                      : pillar.color === "cyan"
                      ? "bg-[#38BDF8]/10 text-[#38BDF8] group-hover:bg-[#38BDF8] group-hover:text-black"
                      : "bg-[#00529B]/20 text-[#a6c8ff] group-hover:bg-[#00529B] group-hover:text-white"
                  }`}
                >
                  <span className="material-symbols-outlined text-[24px]">{pillar.icon}</span>
                </div>
                <h3 className="font-editorial-serif text-xl sm:text-2xl text-white group-hover:text-[#F59E0B] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm font-light text-white/60 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#F59E0B]">
                <span className="uppercase tracking-wider text-[10px]">{pillar.badge}</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* TESTIMONIALS SECTION */}
        <div id="testimonials" className="mt-28 pt-16 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#F59E0B] uppercase font-bold">
                CLIENT ENDORSEMENTS
              </span>
              <h2 className="font-editorial-serif text-3xl sm:text-4xl text-white">
                Protected Families Speak
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-white font-mono text-xs">
              <span className="material-symbols-outlined text-[#F59E0B] text-[18px]">star</span>
              <span className="font-bold text-[#F59E0B]">4.98 / 5.0</span>
              <span className="text-white/40">VERIFIED RATING</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#090C12]/90 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-[#F59E0B]">
                    {[...Array(5)].map((_, s) => (
                      <span key={s} className="material-symbols-outlined text-[18px]">
                        star
                      </span>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm font-light text-white/80 italic leading-relaxed">
                    {t.content}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs"
                    style={{ backgroundColor: `${t.accent}20`, color: t.accent }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <span className="font-semibold text-sm text-white block">{t.name}</span>
                    <span className="text-xs font-mono text-white/40">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
