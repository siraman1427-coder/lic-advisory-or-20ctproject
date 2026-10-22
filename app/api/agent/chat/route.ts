import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_INSTRUCTION = `You are GENKUB (AG-UI v2.4), the elite AI Sovereign Financial Advisory Intelligence representing Life Insurance Corporation of India (LIC) and Authorized Senior Advisor Aman Chaudhary (MDRT Accredited).

YOUR EXPERTISE & KNOWLEDGE:
1. Sovereign Guarantee: Under Section 37 of the LIC Act 1956, the Government of India provides an absolute sovereign guarantee on the Sum Assured and declared bonuses.
2. Tax Law:
   - Section 10(10D) of Income Tax Act: 100% tax-free maturity payouts and death benefits.
   - Section 80C: Tax deduction up to ₹1,50,000 per financial year under the Old Tax Regime.
3. Signature LIC Plans:
   - Jeevan Utsav (Plan 871): Guaranteed 10% of Sum Assured paid out every single year for life, plus guaranteed additions of ₹40/thousand.
   - Jeevan Labh (Plan 936): High-return limited premium endowment plan with strong bonus additions.
   - SIIP (Plan 852): Unit-linked sovereign market plan with 100% refund of mortality charges.
   - Pension & Annuity Plans (Jeevan Shanti / Jeevan Akshay): Guaranteed lifelong pensions with deferred or immediate payout options.
4. Advisor Aman Chaudhary:
   - MDRT (Million Dollar Round Table) Accredited Senior Wealth Advisor.
   - 98.6%+ IRDAI-benchmarked claim settlement track record.
   - Over ₹500 Cr+ assets secured for 10,000+ families and NRIs.
   - Direct helpline: +91 78179 29602.

GUIDELINES:
- Answer ANY question freely, thoughtfully, and accurately based on user requirements.
- Use clear markdown, concise paragraphs, and bullet points.
- Adapt to user language (English, Hindi, Hinglish, etc.).
- When calculating or explaining financial options, provide structured, actionable breakdowns.
- Maintain a warm, highly intelligent, and authoritative advisory tone.`;

const MODELS = [
  "gemini-3.5-flash",
  "gemini-3.1-flash-lite",
  "gemini-3-flash-preview",
  "gemini-3.8-flash",
  "gemini-flash-latest"
];

export async function POST(req: NextRequest) {
  try {
    const { message, history, userEmail } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || "";

    let reply = "";
    let actions: { label: string; url?: string; action?: string }[] = [];

    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);

        // Format history for multi-turn conversational context
        const formattedContents: { role: string; parts: { text: string }[] }[] = [];

        if (Array.isArray(history)) {
          for (const item of history.slice(-6)) {
            if (item && item.content && (item.role === "user" || item.role === "assistant")) {
              formattedContents.push({
                role: item.role === "user" ? "user" : "model",
                parts: [{ text: item.content }],
              });
            }
          }
        }

        // Add user info and current query
        const userContextPrompt = userEmail
          ? `[User Email: ${userEmail}] ${message}`
          : message;

        formattedContents.push({
          role: "user",
          parts: [{ text: userContextPrompt }],
        });

        // Try primary model with fallback across available models
        let generationSuccess = false;

        for (const modelName of MODELS) {
          try {
            const model = genAI.getGenerativeModel({
              model: modelName,
              systemInstruction: SYSTEM_INSTRUCTION,
            });

            const result = await model.generateContent({
              contents: formattedContents,
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1024,
              },
            });

            const text = result.response.text();
            if (text && text.trim().length > 0) {
              reply = text.trim();
              generationSuccess = true;
              break;
            }
          } catch (modelErr) {
            console.warn(`Model ${modelName} attempt error:`, modelErr);
          }
        }

        if (!generationSuccess) {
          throw new Error("Generative models currently busy.");
        }
      } catch (geminiErr) {
        console.error("Gemini API invocation failed:", geminiErr);
        // Fallback to knowledge base if API is unavailable
        reply = getFallbackResponse(message, userEmail);
      }
    } else {
      reply = getFallbackResponse(message, userEmail);
    }

    // Contextual Action Chips based on query content
    const lower = (message + " " + reply).toLowerCase();
    if (lower.includes("plan") || lower.includes("utsav") || lower.includes("labh") || lower.includes("siip")) {
      actions.push({ label: "Explore Sovereign Plans", url: "/plans" });
    }
    if (lower.includes("tax") || lower.includes("10(10d)") || lower.includes("80c")) {
      actions.push({ label: "Tax Exemption Audit", url: "/contact" });
    }
    if (lower.includes("consult") || lower.includes("book") || lower.includes("aman") || lower.includes("advisor") || lower.includes("meeting")) {
      actions.push({ label: "Schedule with Aman Chaudhary", url: "/contact" });
    }
    if (lower.includes("claim") || lower.includes("settlement")) {
      actions.push({ label: "Priority Claim Desk", url: "/contact" });
    }

    if (actions.length === 0) {
      actions = [
        { label: "Explore Plans", url: "/plans" },
        { label: "Book Consultation", url: "/contact" }
      ];
    }

    return NextResponse.json({
      success: true,
      role: "assistant",
      content: reply,
      actions,
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal AG-UI processing error";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

function getFallbackResponse(message: string, userEmail?: string): string {
  const query = message.toLowerCase();
  if (query.includes("10(10d)") || query.includes("tax") || query.includes("80c")) {
    return (
      "**Tax Optimization Under Sovereign Law:**\n\n" +
      "1. **Section 10(10D) Exemption**: All maturity payouts and death benefits received from LIC policies are **100% tax-free** in the hands of the policyholder or nominees.\n" +
      "2. **Section 80C Deduction**: Premiums paid up to **₹1,50,000 per financial year** are eligible for tax deductions under the Old Tax Regime.\n" +
      "3. **Guaranteed Sovereign Capital**: Backed by Section 37 of the LIC Act 1956, ensuring absolute sovereign guarantee on Sum Assured and declared bonuses."
    );
  }
  if (query.includes("utsav") || query.includes("income")) {
    return (
      "**LIC Jeevan Utsav (Plan No. 871) — Highlights:**\n\n" +
      "• **Guaranteed Annual Cash Flow**: Provides guaranteed **10% of Sum Assured** paid out every single year for life after the premium term.\n" +
      "• **Limited Premium Term**: Flexible options to pay for 5, 8, 10, or 12 years only.\n" +
      "• **Guaranteed Additions**: ₹40 per thousand Sum Assured added every year during premium term."
    );
  }
  return (
    `Greetings! I am **GENKUB**, your AG-UI Sovereign Financial Intelligence Agent.\n\n` +
    `I can assist you with custom policy structuring, Section 10(10D) tax compliance, guaranteed lifelong annuities, and direct consultations with Senior Advisor **Aman Chaudhary**.\n\n` +
    `How may I assist your family's portfolio today?`
  );
}
