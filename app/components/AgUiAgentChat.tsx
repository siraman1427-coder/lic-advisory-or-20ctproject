"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export interface MessageAction {
  label: string;
  url?: string;
  action?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  actions?: MessageAction[];
  timestamp: string;
}

const DEFAULT_WELCOME_MESSAGE: ChatMessage = {
  id: "welcome-1",
  role: "assistant",
  content:
    "**Greetings! I am GENKUB**, your AG-UI Sovereign Intelligence Agent.\n\n" +
    "I can assist you with real-time actuarial calculations, policy comparisons, sovereign tax compliance (Section 10(10D) & 80C), or direct consultations with **Aman Sharma**.\n\n" +
    "How may I assist your portfolio today?",
  actions: [
    { label: "Tax Exemption (Sec 10(10D))", action: "tax" },
    { label: "Jeevan Utsav (10% Income)", action: "utsav" },
    { label: "98.6% Claim Settlement", action: "claim" },
    { label: "Book Consultation", url: "/contact" },
  ],
  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
};

const SUGGESTIONS = [
  "How does Section 10(10D) make my returns 100% tax-free?",
  "Explain LIC Jeevan Utsav 10% guaranteed lifelong income",
  "What is the claim settlement record of LIC and Aman?",
  "How can I book a confidential portfolio audit?",
];

export default function AgUiAgentChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([DEFAULT_WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  // Listen to custom event to open chat (e.g. from robot click)
  useEffect(() => {
    const handleOpenAgentChat = () => setIsOpen(true);
    window.addEventListener("open-ag-ui-agent", handleOpenAgentChat);
    return () => window.removeEventListener("open-ag-ui-agent", handleOpenAgentChat);
  }, []);

  const sendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isLoading) return;

    const userMsg: ChatMessage = {
      id: "usr-" + Date.now(),
      role: "user",
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageContent,
          userEmail: user?.email,
          history: messages.slice(-4),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "AG-UI service error");
      }

      const botMsg: ChatMessage = {
        id: "bot-" + Date.now(),
        role: "assistant",
        content: data.content,
        actions: data.actions || [],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: "err-" + Date.now(),
        role: "assistant",
        content:
          "My sovereign neural uplink encountered a momentary delay. You may reach Aman Sharma directly at `+91 78179 29602` or book via our priority contact desk.",
        actions: [{ label: "Open Priority Desk", url: "/contact" }],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (action: MessageAction) => {
    if (action.url) {
      router.push(action.url);
      setIsOpen(false);
    } else if (action.action) {
      if (action.action === "tax") {
        sendMessage("Explain Section 10(10D) and Section 80C tax benefits in detail");
      } else if (action.action === "utsav") {
        sendMessage("Tell me about LIC Jeevan Utsav and its 10% guaranteed lifelong payout");
      } else if (action.action === "claim") {
        sendMessage("What is LIC's claim settlement ratio and how does Aman assist?");
      }
    }
  };

  return (
    <>
      {/* 1. FLOATING AG-UI TRIGGER DOCK (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-[#07090E]/95 via-[#00529B]/80 to-[#07090E]/95 border border-[#F59E0B]/40 shadow-[0_0_25px_rgba(245,158,11,0.25)] hover:shadow-[0_0_35px_rgba(245,158,11,0.45)] hover:border-[#F59E0B] text-white transition-all duration-300 active:scale-95 cursor-pointer backdrop-blur-md"
            aria-label="Open AG-UI Agent"
          >
            {/* Glowing Pulse Dot */}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#F59E0B]" />
            </span>

            {/* Robot Icon */}
            <div className="w-7 h-7 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-[#F59E0B]">
              <span className="material-symbols-outlined text-[17px]">smart_toy</span>
            </div>

            {/* Label */}
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-mono tracking-wider font-bold text-[#F59E0B] uppercase">
                GENKUB AG-UI
              </span>
              <span className="text-[9px] font-sans text-white/70 tracking-wide">
                AI Advisory Assistant
              </span>
            </div>
          </button>
        )}
      </div>

      {/* 2. SLIDE-OUT AG-UI CONVERSATIONAL CONSOLE */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[440px] max-h-[85vh] h-[640px] flex flex-col rounded-3xl bg-[#080B10]/95 border border-[#F59E0B]/30 shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-300">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 bg-gradient-to-r from-[#00529B]/20 via-[#07090E] to-transparent flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-2xl bg-black/80 border border-[#F59E0B]/40 flex items-center justify-center text-[#F59E0B] shadow-inner">
                <span className="material-symbols-outlined text-2xl">smart_toy</span>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-black" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-editorial-serif text-lg text-white font-medium">GENKUB</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#F59E0B]/20 text-[#F59E0B] font-bold">
                    AG-UI v2.4
                  </span>
                </div>
                <p className="text-[10px] font-mono text-white/50 tracking-wide uppercase">
                  Sovereign Wealth Intelligence
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages([DEFAULT_WELCOME_MESSAGE])}
                title="Reset conversation"
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">refresh</span>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
          </div>

          {/* Chat Message Scrollable Area */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 text-xs font-sans">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.role === "user" ? "items-end" : "items-start"
                }`}
              >
                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                    m.role === "user"
                      ? "bg-[#F59E0B] text-black font-medium shadow-md rounded-tr-xs"
                      : "bg-white/[0.06] border border-white/10 text-white/90 rounded-tl-xs backdrop-blur-md"
                  }`}
                >
                  <div className="whitespace-pre-wrap space-y-1">
                    {m.content.split("\n").map((line, i) => {
                      if (line.startsWith("•") || line.startsWith("-") || line.startsWith("1.") || line.startsWith("2.") || line.startsWith("3.")) {
                        return (
                          <div key={i} className="pl-2">
                            {line}
                          </div>
                        );
                      }
                      return <p key={i}>{line}</p>;
                    })}
                  </div>

                  {/* Actions / Suggestion Pills inside Bot Message */}
                  {m.actions && m.actions.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                      {m.actions.map((act, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleActionClick(act)}
                          className="px-2.5 py-1 rounded-full bg-[#00529B]/40 hover:bg-[#00529B] border border-[#38bdf8]/30 hover:border-[#38bdf8] text-[#38bdf8] hover:text-white text-[10px] font-mono tracking-wide transition-all active:scale-95 cursor-pointer flex items-center gap-1"
                        >
                          <span>{act.label}</span>
                          <span className="material-symbols-outlined text-[11px]">arrow_outward</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Timestamp */}
                <span className="text-[9px] font-mono text-white/40 mt-1 px-1">
                  {m.timestamp}
                </span>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="p-3 rounded-2xl bg-white/[0.06] border border-white/10 text-white/60 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#F59E0B] animate-ping" />
                  <span className="text-[11px] font-mono">GENKUB is calculating sovereign metrics...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Chips */}
          <div className="px-4 py-2 border-t border-white/5 bg-black/40 overflow-x-auto flex gap-1.5 no-scrollbar">
            {SUGGESTIONS.map((sug, i) => (
              <button
                key={i}
                disabled={isLoading}
                onClick={() => sendMessage(sug)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white text-[10px] font-mono transition-colors disabled:opacity-40"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="p-3.5 bg-black/80 border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask GENKUB about plans, Sec 10(10D), claims..."
              disabled={isLoading}
              className="flex-1 bg-white/[0.06] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#F59E0B] transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 rounded-xl bg-[#F59E0B] text-black flex items-center justify-center hover:bg-[#ffdeaa] transition-colors disabled:opacity-40 active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
