import { createClient } from "@supabase/supabase-js";
import { Database, InquiryInsert } from "../types/supabase";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://mjvjyewluwylysvzikob.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qdmp5ZXdsdXd5bHlzdnppa29iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI1NTM2NTMsImV4cCI6MjEwODEyOTY1M30.PV3Q1F3Q5jzcOLt2HXfGyioOFiw4B7kdzSpO145lFlQ";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
});

export async function submitInquiry(inquiry: InquiryInsert) {
  try {
    const id = inquiry.id || (typeof crypto !== "undefined" ? crypto.randomUUID() : undefined);
    const payload = id ? { ...inquiry, id } : inquiry;

    const { error } = await supabase
      .from("inquiries")
      .insert([payload]);

    if (error) {
      console.error("Supabase insert error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, id };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Supabase submission error:", message);
    return { success: false, error: message };
  }
}
