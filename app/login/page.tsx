"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth, GMAIL_REGEX } from "@/app/context/AuthContext";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const { signIn, signUp, signInWithGoogle, user, signOut, isLoading } = useAuth();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [googleSetupNeeded, setGoogleSetupNeeded] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Live Gmail validation check
  const isGmailValid = email.length > 0 && GMAIL_REGEX.test(email.trim().toLowerCase());
  const isNonGmailDomain = email.includes("@") && !isGmailValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const cleanEmail = email.trim().toLowerCase();

    // 1. Enforce strict @gmail.com check
    if (!GMAIL_REGEX.test(cleanEmail)) {
      setError("Registration restricted: Only @gmail.com email addresses (e.g. name@gmail.com) are accepted.");
      return;
    }

    if (password.length < 6) {
      setError("Security requirement: Password must be at least 6 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === "signin") {
        const res = await signIn(cleanEmail, password);
        if (!res.success) {
          setError(res.error || "Invalid Gmail credentials or password. Please try again.");
          setIsSubmitting(false);
          return;
        }

        setSuccessMessage("Authenticated successfully! Redirecting...");
        setTimeout(() => {
          router.push(redirectPath);
        }, 800);
      } else {
        const res = await signUp(cleanEmail, password, fullName);
        if (!res.success) {
          setError(res.error || "Account creation failed.");
          setIsSubmitting(false);
          return;
        }

        setSuccessMessage("Sovereign account created and verified! Redirecting...");
        setTimeout(() => {
          router.push(redirectPath);
        }, 1000);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication error occurred.";
      setError(msg);
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError(null);
    setGoogleSetupNeeded(false);
    setIsGoogleLoading(true);
    const res = await signInWithGoogle(redirectPath);
    if (!res.success) {
      if (res.isProviderDisabled) {
        setGoogleSetupNeeded(true);
      } else {
        setError(res.error || "Failed to initiate Google sign-in.");
      }
      setIsGoogleLoading(false);
    }
  };

  // If user is already logged in
  if (!isLoading && user) {
    return (
      <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#07090E]/90 border border-[#F59E0B]/30 shadow-[0_10px_40px_rgba(0,0,0,0.8)] text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B]">
          <span className="material-symbols-outlined text-3xl">verified_user</span>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#F59E0B] uppercase font-bold">
            CURRENTLY AUTHENTICATED
          </span>
          <h2 className="font-editorial-serif text-2xl text-white">Active Sovereign Session</h2>
          <p className="text-xs text-white/70 font-mono mt-1 break-all">{user.email}</p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <Link
            href={redirectPath}
            className="w-full py-3 rounded-full bg-[#F59E0B] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#ffdeaa] transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2"
          >
            <span>Proceed to {redirectPath === "/" ? "Home" : redirectPath.replace("/", "").toUpperCase()}</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>

          <button
            onClick={() => signOut()}
            className="w-full py-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-white/30 text-xs uppercase tracking-wider transition-all font-mono"
          >
            Sign Out of Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md relative z-10">
      {/* Decorative Outer Glow */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-[#F59E0B]/20 via-[#00529B]/20 to-transparent blur-xl pointer-events-none" />

      <div className="relative rounded-3xl bg-[#090C12]/95 border border-white/10 p-7 sm:p-10 shadow-2xl backdrop-blur-xl">
        {/* Header Branding */}
        <div className="flex flex-col items-center text-center space-y-2 mb-8">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white/95 p-1 flex items-center justify-center shadow-md border border-white/20 mb-1">
            <Image
              src="/images/lic_logo.png"
              alt="LIC India Logo"
              width={34}
              height={34}
              className="object-contain"
            />
          </div>
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#F59E0B] font-bold">
            SOVEREIGN ADVISORY VAULT
          </span>
          <h1 className="font-editorial-serif text-3xl sm:text-4xl text-white tracking-wide">
            {mode === "signin" ? "Sign In to Access" : "Create Sovereign Account"}
          </h1>
          <p className="text-xs font-light text-white/60 max-w-xs leading-relaxed">
            {redirectPath !== "/"
              ? "Sign in with your Gmail to access all advisory tabs, confidential portfolio audits, and private wealth tools."
              : "Authentication required to browse advisor dossiers, policy calculators, and sovereign claim desks."}
          </p>
        </div>

        {/* Tab Switcher: Sign In vs Sign Up */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-black/60 border border-white/10 mb-6 text-xs font-mono uppercase tracking-wider">
          <button
            type="button"
            onClick={() => {
              setMode("signin");
              setError(null);
            }}
            className={`py-2.5 rounded-lg transition-all ${
              mode === "signin"
                ? "bg-[#F59E0B] text-black font-bold shadow-md"
                : "text-white/60 hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setError(null);
            }}
            className={`py-2.5 rounded-lg transition-all ${
              mode === "signup"
                ? "bg-[#F59E0B] text-black font-bold shadow-md"
                : "text-white/60 hover:text-white"
            }`}
          >
            Register
          </button>
        </div>

        {/* Direct Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={isGoogleLoading}
          className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-neutral-100 text-neutral-800 font-headline font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-3 active:scale-[0.99] disabled:opacity-60 cursor-pointer mb-6"
        >
          {isGoogleLoading ? (
            <span className="inline-block w-4 h-4 border-2 border-neutral-700 border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          )}
          <span>Continue with Google</span>
        </button>

        {/* Google Setup Guide if provider is not yet enabled in Supabase */}
        {googleSetupNeeded && (
          <div className="mb-6 p-4 rounded-2xl bg-[#00529B]/20 border border-[#00529B]/50 text-white text-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#F59E0B] font-bold">
                <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                <span className="uppercase tracking-wider font-mono text-[11px]">
                  Google Provider Setup Needed
                </span>
              </div>
              <button
                type="button"
                onClick={() => setGoogleSetupNeeded(false)}
                className="text-white/40 hover:text-white"
                aria-label="Close"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            <p className="text-white/80 leading-relaxed text-[11px]">
              Supabase backend is connected, but the Google OAuth provider has not yet been toggled ON in your Supabase project dashboard.
            </p>

            <div className="bg-black/50 rounded-xl p-3 text-[10px] font-mono text-white/70 space-y-1.5 border border-white/5">
              <div className="text-[#F59E0B] font-bold uppercase tracking-wider text-[9px]">
                To activate direct Google 1-Click login:
              </div>
              <div>
                1. Open{" "}
                <a
                  href="https://supabase.com/dashboard/project/mjvjyewluwylysvzikob/auth/providers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F59E0B] underline font-bold"
                >
                  Supabase Auth Providers ↗
                </a>
              </div>
              <div>2. Toggle <span className="text-white font-bold">Enable Google</span> ON</div>
              <div>3. Enter Google OAuth Client ID &amp; Secret</div>
            </div>

            <div className="pt-1 flex gap-2">
              <a
                href="https://supabase.com/dashboard/project/mjvjyewluwylysvzikob/auth/providers"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-[#F59E0B] text-black font-bold text-[10px] uppercase tracking-wider text-center hover:bg-[#ffdeaa] transition-all flex items-center justify-center gap-1.5"
              >
                <span>Open Supabase Settings</span>
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
            </div>

            <div className="text-[10px] text-emerald-400 font-mono text-center pt-1.5 border-t border-white/10 flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-[13px]">check</span>
              <span>You can register or sign in instantly with Gmail &amp; Password below!</span>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="relative flex items-center justify-center my-6">
          <div className="w-full border-t border-white/10" />
          <span className="absolute bg-[#090C12] px-3 text-[10px] font-mono uppercase tracking-widest text-white/40">
            or with verified gmail
          </span>
        </div>

        {/* Error / Success Banners */}
        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5 leading-snug">
            <span className="material-symbols-outlined text-red-400 text-[18px] shrink-0 mt-0.5">error</span>
            <span>{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2.5">
            <span className="material-symbols-outlined text-emerald-400 text-[18px] shrink-0">check_circle</span>
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-white/60 block">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Ramesh Chandra"
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-[#F59E0B] transition-colors"
              />
            </div>
          )}

          {/* Email Input with Gmail Constraint Indicator */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-mono uppercase tracking-wider text-white/60">
                Gmail Address <span className="text-[#F59E0B]">*</span>
              </label>
              <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/50">
                Strictly @gmail.com
              </span>
            </div>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="username@gmail.com"
                className={`w-full px-4 py-3 pr-10 rounded-xl bg-black/60 border text-white text-xs placeholder:text-white/30 focus:outline-none transition-colors ${
                  isGmailValid
                    ? "border-emerald-500/60 focus:border-emerald-400"
                    : isNonGmailDomain
                    ? "border-amber-500/70 focus:border-amber-400"
                    : "border-white/15 focus:border-[#F59E0B]"
                }`}
              />
              <div className="absolute right-3 top-3 text-white/50 pointer-events-none">
                {isGmailValid ? (
                  <span className="material-symbols-outlined text-[18px] text-emerald-400">check_circle</span>
                ) : isNonGmailDomain ? (
                  <span className="material-symbols-outlined text-[18px] text-amber-400" title="Must be @gmail.com">warning</span>
                ) : (
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                )}
              </div>
            </div>
            {isNonGmailDomain && (
              <p className="text-[10px] text-amber-300/90 font-mono mt-1 flex items-center gap-1">
                <span>⚠️ Only @gmail.com accounts are accepted for access.</span>
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-mono uppercase tracking-wider text-white/60">
                Password <span className="text-[#F59E0B]">*</span>
              </label>
              <span className="text-[9px] font-mono text-white/40">Min 6 characters</span>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-10 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-[#F59E0B] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-white/40 hover:text-white transition-colors"
                aria-label="Toggle password visibility"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !isGmailValid}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#f2be64] to-[#f59e0b] text-black font-headline font-bold text-xs uppercase tracking-wider hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Verifying with Supabase Authenticator...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">
                  {mode === "signin" ? "login" : "how_to_reg"}
                </span>
                <span>{mode === "signin" ? "Verify & Sign In" : "Register with Gmail"}</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Navigation Back */}
        <div className="mt-6 pt-5 border-t border-white/10 text-center">
          <Link
            href="/"
            className="text-[11px] font-mono text-white/50 hover:text-[#F59E0B] transition-colors inline-flex items-center gap-1.5"
          >
            <span>←</span>
            <span>Return to Sovereign Portal Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="relative min-h-screen w-full bg-[#05070B] text-white flex items-center justify-center p-4 sm:p-6 overflow-hidden selection:bg-[#F59E0B] selection:text-black font-sans">
      {/* Background Ambience Layers matching portal */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <img
          src="/images/bg_base.jpg"
          alt="LIC Sovereign Base"
          className="h-full w-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#00529B]/25 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-[#F59E0B]/15 blur-[120px]" />
      </div>

      <Suspense
        fallback={
          <div className="flex items-center gap-3 text-sm text-[#F59E0B] font-mono">
            <span className="inline-block w-4 h-4 border-2 border-[#F59E0B] border-t-transparent rounded-full animate-spin" />
            <span>Loading Sovereign Vault...</span>
          </div>
        }
      >
        <LoginFormContent />
      </Suspense>
    </div>
  );
}
