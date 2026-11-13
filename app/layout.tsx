import type { Metadata } from "next";
import { Inter, Lora, Caveat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DHARA | Decentralised Rainwater Infiltration System for Kolkata",
  description: "A proposed scientific simulation and engineering model for road-runoff harvesting, filtration strata, dynamic storage, and soil infiltration in Kolkata.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable} ${caveat.variable}`}>
      <body className="antialiased min-h-screen selection:bg-accent-blue/20 overflow-x-hidden flex flex-col">
        <Navbar />
        <div className="flex-grow">
          {children}
        </div>
        
        {/* Subtle engineering notebook footer */}
        <footer className="border-t border-graphite/10 py-10 px-4 md:px-8 mt-24 text-center font-sans text-[11px] tracking-widest uppercase text-muted-grey">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <span className="font-serif text-sm text-graphite normal-case tracking-normal block md:inline font-medium">
                DHARA Simulation Model
              </span>
              <span className="hidden md:inline mx-2 text-graphite/30">•</span>
              <span>Kolkata Urban Hydrology Pre-Feasibility Study</span>
            </div>
            <div className="font-hand text-base normal-case text-accent-rust">
              A conceptual engineering proposal — requires site-specific field validation
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

