"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, ExternalLink, Bookmark, CheckCircle2 } from "lucide-react";
import { REFERENCES_DATABASE } from "@/references/bibliography";

export default function ReferencesPage() {
  return (
    <main className="min-h-screen pb-24 px-4 md:px-6 pt-10 max-w-5xl mx-auto w-full">
      
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-muted-grey hover:text-graphite transition-colors link-underline"
        >
          <ArrowLeft size={14} /> Back to DHARA Simulation
        </Link>
      </div>

      {/* Header */}
      <div className="mb-12 border-b border-graphite/10 pb-8">
        <span className="font-hand text-lg text-accent-rust block -rotate-1 mb-2">
          Academic Foundations // Field Bulletins
        </span>
        <h1 className="text-[clamp(2.2rem,6vw,3.5rem)] font-serif font-medium leading-[1.15] text-graphite mb-4">
          Research & References Archive
        </h1>
        <p className="font-serif text-charcoal/80 text-base md:text-lg max-w-3xl leading-relaxed">
          The DHARA decentralised rainwater management concept relies on empirical hydrological field studies from New Town Kolkata, Central Ground Water Board (CGWB) aquifer bulletins, and FHWA urban drainage engineering standards.
        </p>
      </div>

      {/* Primary Reference 01 Spotlight Card */}
      {(() => {
        const primary = REFERENCES_DATABASE[0];
        return (
          <div className="border-hand p-6 md:p-10 bg-white/80 backdrop-blur-sm mb-12 shadow-xs border-l-4 border-l-accent-blue">
            <div className="flex justify-between items-start mb-3 border-b border-graphite/10 pb-3">
              <span className="font-sans text-[11px] font-bold tracking-widest uppercase text-accent-blue flex items-center gap-2">
                <Bookmark size={14} /> Primary Foundation // Reference [{primary.citationNumber}]
              </span>
              <span className="font-hand text-lg text-muted-grey">{primary.year}</span>
            </div>

            <span className="font-sans text-[10px] tracking-widest uppercase text-accent-green font-bold block mb-2">
              {primary.category}
            </span>

            <h2 className="text-xl md:text-2xl font-serif text-graphite mb-3 leading-snug">
              {primary.title}
            </h2>

            <p className="font-sans text-xs md:text-sm text-charcoal font-medium mb-1">
              {primary.authors}
            </p>
            <p className="font-serif italic text-xs md:text-sm text-muted-grey mb-6">
              {primary.source}
            </p>

            <div className="bg-paper p-4 md:p-5 rounded-xs border border-graphite/10 text-xs md:text-sm font-serif text-charcoal/90 leading-relaxed mb-6">
              <span className="font-sans text-[9px] uppercase tracking-wider text-muted-grey font-bold block mb-1.5">
                Core Relevance to the DHARA Architecture
              </span>
              {primary.relevance}
            </div>

            <a
              href={primary.doiOrUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-xs tracking-wider uppercase font-bold text-graphite hover:text-accent-blue transition-colors px-4 py-2 border-hand bg-paper hover:bg-white"
            >
              <span>Read Original Publication (DOI)</span>
              <ExternalLink size={13} className="text-accent-blue" />
            </a>
          </div>
        );
      })()}

      {/* Grid for References 02 through 06 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {REFERENCES_DATABASE.slice(1).map((ref) => (
          <div
            key={ref.id}
            className="border-hand p-5 md:p-7 bg-paper/60 hover:bg-white/90 hover:border-graphite/40 transition-all duration-300 flex flex-col justify-between group shadow-xs"
          >
            <div>
              <div className="flex justify-between items-start mb-3 border-b border-graphite/10 pb-2">
                <span className="font-sans text-[10px] md:text-xs font-bold tracking-widest text-graphite flex items-center gap-1.5">
                  <Bookmark size={12} className="text-accent-blue" />
                  REFERENCE [{ref.citationNumber}]
                </span>
                <span className="font-hand text-base text-muted-grey">
                  {ref.year}
                </span>
              </div>

              <span className="font-sans text-[9px] tracking-widest uppercase text-accent-green font-bold block mb-1.5">
                {ref.category}
              </span>

              <h3 className="text-base md:text-lg font-serif text-graphite group-hover:text-accent-blue transition-colors duration-200 mb-2 leading-snug">
                {ref.title}
              </h3>

              <p className="font-sans text-xs text-charcoal font-medium mb-1">
                {ref.authors}
              </p>
              <p className="font-serif italic text-xs text-muted-grey mb-4">
                {ref.source}
              </p>

              <div className="bg-paper/70 p-3 rounded-xs border border-graphite/10 text-xs font-serif text-charcoal/85 leading-relaxed mb-4">
                <span className="font-sans text-[8.5px] uppercase tracking-wider text-muted-grey font-bold block mb-1">
                  Relevance to DHARA
                </span>
                {ref.relevance}
              </div>
            </div>

            <div className="pt-2 border-t border-graphite/10">
              <a
                href={ref.doiOrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-sans text-[10px] tracking-wider uppercase font-bold text-graphite group-hover:text-accent-blue transition-colors"
              >
                <span>Access Original Source</span>
                <ExternalLink size={12} className="text-accent-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}

