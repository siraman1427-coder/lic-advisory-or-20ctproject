"use client";

import GlobalHeader from "../components/GlobalHeader";
import StitchConsultationVault from "../components/StitchConsultationVault";

export default function ContactPage() {
  const offices = [
    {
      city: "New Delhi (Headquarters / Division)",
      address: "LIC Northern Zonal Division, Connaught Place, New Delhi",
      phone: "+91 781792960X",
      type: "Primary Advisory Hub",
    },
    {
      city: "Noida / Greater Noida",
      address: "Sector 18 & Expressway Executive Client Desk",
      phone: "+91 781792960X",
      type: "Doorstep Verification Available",
    },
    {
      city: "Gurugram / Cyber City",
      address: "Golf Course Road & DLF CyberCity Advisory Suite",
      phone: "+91 781792960X",
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
    <div className="relative min-h-screen bg-[#05070B] text-white selection:bg-[#F59E0B] selection:text-black">
      <GlobalHeader />

      <main>
        {/* BANNER HEADER */}
        <section className="relative w-full pt-16 pb-8 bg-gradient-to-b from-[#090C12] to-[#05070B] border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4">
              <span className="px-3.5 py-1 rounded-full text-[10px] font-mono tracking-[0.25em] text-[#F59E0B] uppercase bg-[#F59E0B]/10 border border-[#F59E0B]/30 font-semibold">
                PRIORITY ADVISORY DESK & DOORSTEP SERVICING
              </span>
              <h1 className="font-editorial-serif text-4xl sm:text-5xl lg:text-6xl text-white">
                Contact Aman Chaudhary
              </h1>
              <p className="font-editorial-sans text-sm sm:text-base text-white/70 font-light max-w-2xl leading-relaxed">
                Reach out for immediate telephone advisory, doorstep policy documentation, or instant WhatsApp inquiries.
              </p>
            </div>
          </div>
        </section>

        {/* PRIORITY CONSULTATION FORM */}
        <StitchConsultationVault />

        {/* COVERAGE HUBS & OFFICES */}
        <section className="w-full bg-[#05070B] py-16 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#F59E0B] font-semibold">
                JURISDICTION & SERVICE DESKS
              </span>
              <h3 className="font-editorial-serif text-3xl text-white">
                NCR & Pan-India Service Hubs
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {offices.map((office, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-[#090C12] border border-white/10 space-y-3 hover:border-[#F59E0B]/40 transition-all"
                >
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B]">
                    {office.type}
                  </span>
                  <h4 className="font-editorial-serif text-xl text-white">{office.city}</h4>
                  <p className="text-xs font-light text-white/60">{office.address}</p>
                  <a
                    href={`tel:${office.phone}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#38BDF8] pt-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">call</span>
                    <span>{office.phone}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="w-full bg-[#090C12] py-20 border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6 sm:px-10">
            <div className="text-center mb-12 space-y-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#38BDF8] font-semibold">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h3 className="font-editorial-serif text-3xl text-white">
                Advisory & Servicing Clarifications
              </h3>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#05070B] border border-white/10 space-y-2"
                >
                  <h5 className="font-editorial-serif text-lg text-white flex items-start gap-3">
                    <span className="text-[#F59E0B]">Q.</span>
                    <span>{faq.q}</span>
                  </h5>
                  <p className="text-xs sm:text-sm font-light text-white/70 pl-6 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-[#030407] py-12 border-t border-white/10 text-center text-xs font-mono text-white/40">
        <p>© 2025 AMAN CHAUDHARY • LIC INDIA AUTHORIZED ADVISORY (AGENCY: LIC-ND-7817929)</p>
        <p className="mt-1 text-[10px] text-white/30 uppercase">
          Direct Line: +91 781792960X • Official Email: siraman142@gmail.com
        </p>
      </footer>
    </div>
  );
}
