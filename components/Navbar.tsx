"use client";

import Link from "next/link";
import { Droplets, BookOpen, Layers, BarChart3, ShieldAlert } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 px-4 md:px-8 py-3 backdrop-blur-md bg-paper/90 border-b border-graphite/10 font-sans text-[10px] md:text-xs tracking-widest uppercase flex justify-between items-center text-charcoal shadow-xs transition-all duration-300">
      <div className="flex items-center gap-3">
        <Link href="/" className="font-bold text-graphite flex items-center gap-2 hover:text-accent-blue transition-colors duration-300">
          <Droplets size={16} className="text-accent-blue" />
          <span>DHARA</span>
          <span className="hidden sm:inline text-muted-grey font-normal font-serif text-[11px] normal-case tracking-normal">
            | Kolkata Rainwater Infiltration
          </span>
        </Link>
      </div>

      <div className="flex gap-4 md:gap-7 overflow-x-auto no-scrollbar items-center pr-1">
        <Link href="/#overview" className="hover:text-graphite transition-colors whitespace-nowrap py-1 link-underline">
          Concept
        </Link>
        <Link href="/#cross-section" className="hover:text-graphite transition-colors whitespace-nowrap py-1 link-underline">
          Cross-Section
        </Link>
        <Link href="/#simulation" className="hover:text-graphite transition-colors whitespace-nowrap py-1 link-underline">
          Simulation
        </Link>
        <Link href="/#water-balance" className="hover:text-graphite transition-colors whitespace-nowrap py-1 link-underline">
          Water Balance
        </Link>
        <Link href="/#assumptions" className="hover:text-graphite transition-colors whitespace-nowrap py-1 link-underline">
          Assumptions
        </Link>
        <Link href="/references" className="hover:text-graphite transition-colors whitespace-nowrap py-1 link-underline font-semibold text-accent-blue">
          References [6]
        </Link>
      </div>
    </nav>
  );
}

