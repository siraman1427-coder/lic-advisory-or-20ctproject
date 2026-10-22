"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function GlobalHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Advisor Profile", href: "/advisor" },
    { label: "Insurance Plans", href: "/plans" },
    { label: "Contact Agent", href: "/contact" },
  ];

  const handleProtectedClick = (e: React.MouseEvent, href: string) => {
    if (href !== "/" && !user) {
      e.preventDefault();
      router.push(`/login?redirect=${encodeURIComponent(href)}`);
    }
  };

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

        {/* Desktop Navigation matching Stitch (Protected with Auth) */}
        <nav className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1a1c1f]/80 border border-white/5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleProtectedClick(e, link.href)}
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

        {/* Right: Sovereign Login Tab / User Account Suite */}
        <div className="flex items-center gap-3">
          {!user ? (
            <Link
              href={`/login?redirect=${encodeURIComponent(pathname)}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#f2be64] to-[#f59e0b] text-black text-xs font-headline font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(242,190,100,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px]">lock_open</span>
              <span>Login / Sign Up</span>
            </Link>
          ) : (
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1e2023] border border-[#f2be64]/30 text-xs font-mono text-white/90">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="hidden sm:inline max-w-[140px] truncate">{user.email}</span>
                <span className="sm:hidden">Active</span>
              </div>
              <button
                onClick={() => signOut()}
                className="px-3 py-1.5 rounded-full border border-white/20 hover:border-red-400/50 hover:bg-red-950/20 text-white/70 hover:text-red-300 text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer"
                title="Sign out of account"
              >
                Sign Out
              </button>
            </div>
          )}

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
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleProtectedClick(e, link.href);
                }}
                className="px-4 py-2.5 rounded-xl text-xs font-label uppercase tracking-wider text-[#c2c7d0] hover:bg-[#1e2023] hover:text-[#f2be64] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            {!user ? (
              <Link
                href={`/login?redirect=${encodeURIComponent(pathname)}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#f2be64] to-[#f59e0b] text-black text-xs font-headline font-bold uppercase tracking-wider shadow-md"
              >
                <span className="material-symbols-outlined text-[18px]">lock_open</span>
                <span>Login / Sign Up</span>
              </Link>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="p-3 rounded-xl bg-[#1e2023] border border-[#f2be64]/30 text-xs font-mono text-white/90 flex items-center justify-between">
                  <span className="truncate max-w-[200px]">{user.email}</span>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase">Active</span>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut();
                  }}
                  className="py-2.5 rounded-xl bg-red-950/30 border border-red-500/30 text-red-300 text-xs font-mono uppercase tracking-wider"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
