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
    { label: "Why Aman", href: "/#stewardship" },
    { label: "Contact Desk", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-[#05070B]/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 h-20 flex items-center justify-between gap-4">
        {/* Brand / Advisor Info */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white/95 p-0.5 flex items-center justify-center shrink-0 border border-white/20">
            <Image
              src="/images/lic_logo.png"
              alt="LIC India Logo"
              width={26}
              height={26}
              style={{ width: "auto", height: "auto" }}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-editorial-sans tracking-[0.2em] text-xs font-bold uppercase text-white group-hover:text-[#F59E0B] transition-colors">
              Aman Chaudhary
            </span>
            <span className="text-[9px] font-mono tracking-wider text-[#F59E0B] uppercase">
              Authorized Senior LIC Advisor
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.04] p-1.5 rounded-full border border-white/10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  isActive
                    ? "bg-[#F59E0B] text-black font-semibold shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Links */}
        <div className="flex items-center gap-3">
          <a
            href="tel:7817929602"
            className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-white/80 transition-colors"
          >
            <span className="material-symbols-outlined text-[#F59E0B] text-[16px]">call</span>
            <span>7817929602</span>
          </a>

          <a
            href="https://wa.me/917817929602"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00529B]/40 hover:bg-[#00529B]/70 border border-[#38BDF8]/40 text-[#38BDF8] text-xs font-mono uppercase tracking-wider transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">chat</span>
            <span>WhatsApp</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white"
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
        <div className="md:hidden border-t border-white/10 bg-[#090C12] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider text-white/80 hover:bg-white/10 hover:text-[#F59E0B] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <a
              href="tel:7817929602"
              className="flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#F59E0B] text-black text-xs font-bold uppercase tracking-wider"
            >
              <span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
              <span>Call Advisor: 7817929602</span>
            </a>
            <a
              href="https://wa.me/917817929602"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#00529B] text-white text-xs font-bold uppercase tracking-wider"
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
