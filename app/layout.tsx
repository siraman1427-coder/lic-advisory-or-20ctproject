import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "LIC — Life Insurance Corporation of India | Premier Wealth & Protection Advisory",
  description:
    "Authorized LIC India Advisor. Securing generations, protecting legacies, and delivering guaranteed sovereign financial assurance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full bg-[#000000] text-white antialiased`}
    >
      <body className="min-h-full bg-[#000000] text-white font-sans selection:bg-white selection:text-black overflow-x-clip">
        {children}
      </body>
    </html>
  );
}
