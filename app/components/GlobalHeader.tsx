"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GlobalHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Advisor Profile", href: "/advisor" },
    { label: "Insurance Plans", href: "/plans" },
    { label: "Contact Agent", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-[#111317]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-4">
        {/* Brand / Advisor Info with LIC Emblem */}
        <Link href="/" className="group flex items-center gap-3.5 focus:outline-none">
          <div className="relative flex items-center justify-center p-1 rounded-full transition-transform duration-300 group-hover:scale-105">
            <div className="absolute inset-0 rounded-full bg-[#f2be64]/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative w-9 h-9 rounded-full overflow-hidden bg-white/95 p-0.5 flex items-center justify-center shrink-0 border border-white/20 drop-shadow-[0_2px_10px_rgba(242,190,100,0.25)]">
              <Image
                src="/images/lic_logo.png"
                alt="LIC India Logo"
                width={28}
                height={28}
                style={{ width: "auto", height: "auto" }}
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm tracking-wider font-headline font-extrabold uppercase text-white group-hover:text-[#f2be64] transition-colors">
              LIC ADVISORY
            </span>
            <span className="text-[11px] font-headline font-medium text-[#c2c7d0] tracking-normal">
              Aman Chaudhary • Authorized Senior Advisor
            </span>
          </div>
        </Link>

        {/* Desktop Navigation matching Stitch */}
        <nav className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1a1c1f]/80 border border-white/5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-xs font-label uppercase tracking-wider transition-all ${
                  isActive
                    ? "bg-[#1e2023] text-white font-semibold shadow-sm border border-white/10 text-[#f2be64]"
                    : "text-[#c2c7d0] hover:text-white hover:bg-[#282a2e]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Quick Action Suite */}
        <div className="flex items-center gap-3">
          <a
            href="tel:7817929602"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-label uppercase tracking-wider bg-[#314865]/60 hover:bg-[#314865] text-[#b1c8ea] border border-[#b1c8ea]/30 transition-all font-semibold"
          >
            <span className="material-symbols-outlined text-[16px]">call</span>
            <span>Call: 7817929602</span>
          </a>

          <a
            href="https://wa.me/917817929602"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-label uppercase tracking-wider bg-[#f2be64] text-black hover:bg-[#ffdeaa] transition-all font-bold shadow-[0_2px_12px_rgba(242,190,100,0.3)]"
          >
            <span className="material-symbols-outlined text-[16px]">chat</span>
            <span>WhatsApp</span>
          </a>

          <div className="relative w-8 h-8 rounded-full bg-[#282a2e] border border-white/10 flex items-center justify-center text-[#f2be64] shrink-0" title="Senior Advisor Desk Online">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse border-2 border-[#111317]" />
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-xl bg-[#1e2023] border border-white/10 flex items-center justify-center text-white"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#111317] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-label uppercase tracking-wider text-[#c2c7d0] hover:bg-[#1e2023] hover:text-[#f2be64] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <a
              href="tel:7817929602"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#314865] text-[#b1c8ea] border border-[#b1c8ea]/30 text-xs font-label uppercase tracking-wider font-bold"
            >
              <span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
              <span>Call: 7817929602</span>
            </a>
            <a
              href="https://wa.me/917817929602"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#f2be64] text-black text-xs font-label uppercase tracking-wider font-bold"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
