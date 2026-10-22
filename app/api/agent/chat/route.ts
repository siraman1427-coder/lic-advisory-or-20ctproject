import { NextRequest, NextResponse } from "next/server";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { message, history, userEmail } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const query = message.trim().toLowerCase();

    // Comprehensive Sovereign LIC & Wealth Knowledge Base
    let reply = "";
    let actions: { label: string; url?: string; action?: string }[] = [];

    if (query.includes("10(10d)") || query.includes("tax") || query.includes("80c") || query.includes("exemption")) {
      reply = `**Tax Optimization Under Sovereign Law:**\n\n` +
        `1. **Section 10(10D) Exemption**: All maturity payouts and death benefits received from LIC policies are **100% tax-free** in the hands of the policyholder or nominees, provided premium is within statutory thresholds.\n` +
        `2. **Section 80C Deduction**: Premiums paid up to **₹1,50,000 per financial year** are eligible for tax deductions under the Old Tax Regime.\n` +
        `3. **Guaranteed Sovereign Capital**: Backed by Section 37 of the LIC Act 1956, ensuring absolute sovereign guarantee on both Sum Assured and declared bonuses.`;
      actions = [
        { label: "Explore Tax-Efficient Plans", url: "/plans" },
        { label: "Book Portfolio Tax Audit", url: "/contact" }
      ];
    } else if (query.includes("utsav") || query.includes("jeevan utsav") || query.includes("guaranteed income")) {
      reply = `**LIC Jeevan Utsav (Plan No. 871) — Highlights:**\n\n` +
        `• **Guaranteed Annual Cash Flow**: Provides guaranteed **10% of Sum Assured** paid out every single year for life after premium payment term.\n` +
        `• **Limited Premium Term**: Flexible options to pay for 5, 8, 10, or 12 years only.\n` +
        `• **Guaranteed Additions**: ₹40 per thousand Sum Assured added every year during the premium paying term.\n` +
        `• **Liquidity Choice**: Flexi-income benefit allowing delayed withdrawal with compound interest at 5.5% p.a.`;
      actions = [
        { label: "View Jeevan Utsav Details", url: "/plans#utsav" },
        { label: "Calculate Lifelong Cashflow", url: "/contact" }
      ];
    } else if (query.includes("claim") || query.includes("settlement") || query.includes("record")) {
      reply = `**Sovereign Settlement Credentials:**\n\n` +
        `• **Settlement Ratio**: Over **98.6%+ claim settlement benchmark** audited by IRDAI.\n` +
        `• **Turnaround**: Priority processing with digital NEFT settlement directly into registered accounts.\n` +
        `• **Dedicated Aman Desk**: Aman Sharma provides personal stewardship to ensure expedited zero-hassle documentation for families.`;
      actions = [
        { label: "Submit Priority Claim Inquiry", url: "/contact" }
      ];
    } else if (query.includes("aman") || query.includes("advisor") || query.includes("who is")) {
      reply = `**About Aman Sharma — Premier Sovereign Wealth Advisor:**\n\n` +
        `• **MDRT-Recognized Leader**: Decades of elite financial stewardship representing LIC of India.\n` +
        `• **Over ₹500 Cr+ Assets Secured**: Trusted by high-net-worth families, NRI professionals, and business owners.\n` +
        `• **Custom Wealth Structuring**: Specializing in family estate planning, tax-free generational vaults, and child education trusts.`;
      actions = [
        { label: "View Advisor Dossier", url: "/advisor" },
        { label: "Request Private Consultation", url: "/contact" }
      ];
    } else if (query.includes("book") || query.includes("meeting") || query.includes("contact") || query.includes("consultation")) {
      reply = `I would be pleased to schedule a priority confidential consultation with **Aman Sharma** for ${userEmail || "you"}.\n\n` +
        `We provide one-on-one portfolio audits, retirement gap analysis, and personalized policy structuring.`;
      actions = [
        { label: "Go to Priority Booking Desk", url: "/contact" }
      ];
    } else {
      reply = `Greetings! I am **GENKUB**, your AG-UI Sovereign Financial Intelligence Agent.\n\n` +
        `I can provide immediate verified guidance on:\n` +
        `• **Guaranteed Lifelong Income** (e.g. Jeevan Utsav 10% annual annuity)\n` +
        `• **Tax Exemption Strategy** (Sec. 10(10D) & Sec. 80C compliance)\n` +
        `• **98.6%+ IRDAI Claim Settlement Records**\n` +
        `• **Private Wealth & Portfolio Audits** with Advisor Aman Sharma.\n\n` +
        `What area of your wealth or family assurance would you like to review?`;
      actions = [
        { label: "Compare Insurance Plans", url: "/plans" },
        { label: "Tax Exemption (Sec 10(10D))", action: "tax" },
        { label: "Book Consultation", url: "/contact" }
      ];
    }

    return NextResponse.json({
      success: true,
      role: "assistant",
      content: reply,
      actions,
      timestamp: new Date().toISOString()
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal AG-UI processing error";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
