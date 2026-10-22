import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

const GMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const cleanEmail = (email || "").trim().toLowerCase();

    // 1. Validate Email constraint (strictly @gmail.com)
    if (!cleanEmail) {
      return NextResponse.json(
        { success: false, error: "Email is required." },
        { status: 400 }
      );
    }

    if (!GMAIL_REGEX.test(cleanEmail)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid email domain. Only @gmail.com addresses (e.g., yourname@gmail.com) are accepted.",
        },
        { status: 400 }
      );
    }

    // 2. Validate Password
    if (!password || password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          error: "Password must be at least 6 characters long.",
        },
        { status: 400 }
      );
    }

    // 3. Verify via Supabase Authenticator
    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    if (error) {
      console.error("Supabase Login error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Authentication successful.",
        user: {
          id: data.user.id,
          email: data.user.email,
          user_metadata: data.user.user_metadata,
        },
        session: data.session,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Login API exception:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
