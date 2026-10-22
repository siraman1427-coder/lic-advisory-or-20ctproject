"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/app/lib/supabaseClient";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: (redirectPath?: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  requireAuth: (targetPath?: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const GMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 1. Get initial active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // 2. Listen to real-time auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();

    // Client-side validation constraint: strictly @gmail.com
    if (!GMAIL_REGEX.test(cleanEmail)) {
      return {
        success: false,
        error: "Access restricted: Only @gmail.com accounts (e.g., yourname@gmail.com) are accepted.",
      };
    }

    try {
      // Send authentication request to the backend route
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return {
          success: false,
          error: data.error || "Authentication failed. Please verify credentials.",
        };
      }

      // Sync Supabase client session in browser
      if (data.session) {
        await supabase.auth.setSession(data.session);
      } else {
        // Fallback direct sign-in sync
        await supabase.auth.signInWithPassword({ email: cleanEmail, password });
      }

      return { success: true };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Network error during sign-in";
      return { success: false, error: message };
    }
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    const cleanEmail = email.trim().toLowerCase();

    // Client-side validation constraint: strictly @gmail.com
    if (!GMAIL_REGEX.test(cleanEmail)) {
      return {
        success: false,
        error: "Registration restricted: Only @gmail.com email addresses are allowed.",
      };
    }

    if (password.length < 6) {
      return {
        success: false,
        error: "Password must be at least 6 characters long.",
      };
    }

    try {
      // Send sign-up request to backend
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, password, full_name: fullName }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return {
          success: false,
          error: data.error || "Registration failed.",
        };
      }

      if (data.session) {
        await supabase.auth.setSession(data.session);
      } else {
        // Automatically sign in the freshly created user
        const loginRes = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });
        if (loginRes.data.session) {
          setSession(loginRes.data.session);
          setUser(loginRes.data.user);
        }
      }

      return { success: true };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Network error during sign-up";
      return { success: false, error: message };
    }
  };

  const signInWithGoogle = async (redirectPath = "/") => {
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const redirectTo = `${origin}/auth/callback?next=${encodeURIComponent(redirectPath)}`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Google OAuth initialization error";
      return { success: false, error: message };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    router.push("/");
  };

  const requireAuth = (targetPath?: string) => {
    if (isLoading) return true;
    if (!user) {
      const destination = targetPath || (typeof window !== "undefined" ? window.location.pathname : "/");
      router.push(`/login?redirect=${encodeURIComponent(destination)}`);
      return false;
    }
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        requireAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
