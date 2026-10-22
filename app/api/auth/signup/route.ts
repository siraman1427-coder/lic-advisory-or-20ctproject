import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

const GMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;

export async function POST(req: NextRequest) {
  try {
    const { email, password, full_name } = await req.json();

    const cleanEmail = (email || "").trim().toLowerCase();

    // 1. Enforce strict @gmail.com constraint
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
            "Registration restricted. Only personal @gmail.com addresses (e.g. user@gmail.com) are accepted.",
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

    // 3. Register user with Supabase Authenticator
    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        data: {
          full_name: full_name?.trim() || cleanEmail.split("@")[0],
        },
      },
    });

    if (error) {
      console.error("Supabase SignUp error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Account successfully created in Supabase Authenticator.",
        user: data.user,
        session: data.session,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error("SignUp API exception:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
