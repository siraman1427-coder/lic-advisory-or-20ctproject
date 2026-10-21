import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      full_name,
      name,
      phone,
      email,
      objective,
      communication_channel,
      channel,
      notes,
      comments,
      source_page,
    } = body;

    const resolvedName = (full_name || name || "").trim();
    const resolvedPhone = (phone || "").trim();

    if (!resolvedName || !resolvedPhone) {
      return NextResponse.json(
        {
          success: false,
          error: "Full Name and Phone Number are required fields.",
        },
        { status: 400 }
      );
    }

    const clientIp =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";
    const inquiryId = crypto.randomUUID();

    const { error } = await supabase
      .from("inquiries")
      .insert([
        {
          id: inquiryId,
          full_name: resolvedName,
          phone: resolvedPhone,
          email: email?.trim() || null,
          objective: objective || "General Consultation",
          communication_channel: communication_channel || channel || "Phone Call",
          notes: notes || comments || null,
          source_page: source_page || "Website Lead",
          status: "new",
          metadata: {
            ip: clientIp,
            user_agent: userAgent,
            submitted_at: new Date().toISOString(),
          },
        },
      ]);

    if (error) {
      console.error("Supabase API insert error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry successfully recorded in Supabase backend.",
        inquiry_id: inquiryId,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    console.error("API /api/inquiries error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Return connection status and table health check
    const { count, error } = await supabase
      .from("inquiries")
      .select("*", { count: "exact", head: true });

    if (error) {
      return NextResponse.json(
        { status: "error", message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: "connected",
      project: "lic-advisory-portal",
      table: "public.inquiries",
      total_inquiries: count || 0,
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { status: "error", error: message },
      { status: 500 }
    );
  }
}
