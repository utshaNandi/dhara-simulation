"use client";

import Link from "next/link";
import { ExternalLink, BookOpen, Bookmark } from "lucide-react";
import { REFERENCES_DATABASE } from "@/references/bibliography";

export default function ReferencesSection() {
  return (
    <section id="references" className="px-4 md:px-6 py-12 md:py-20 max-w-5xl mx-auto w-full relative z-10">
      
      {/* Header */}
      <div className="mb-8 md:mb-12">
        <span className="font-sans text-[10px] tracking-widest uppercase text-accent-blue block mb-2 font-bold border-b border-accent-blue/20 w-fit pb-1 flex items-center gap-1.5">
          <BookOpen size={12} /> Foundational Literature // Field Data
        </span>
        <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-serif leading-tight text-graphite mb-3">
          Research & References
        </h2>
        <p className="font-serif text-charcoal/80 max-w-2xl leading-relaxed text-sm md:text-base">
          Peer-reviewed hydrology papers, statutory Central Ground Water Board reports, and municipal drainage engineering manuals establishing the scientific basis for DHARA.
        </p>
      </div>

      {/* Grid of 6 Citations matching Salmonella's card styling */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {REFERENCES_DATABASE.map((ref) => (
          <div
            key={ref.id}
            className="border-hand p-5 md:p-7 bg-paper/60 hover:bg-white/90 hover:border-graphite/40 transition-all duration-300 flex flex-col justify-between group shadow-xs"
          >
            <div>
              {/* Header tags */}
              <div className="flex justify-between items-start mb-3 border-b border-graphite/10 pb-2">
                <span className="font-sans text-[10px] md:text-xs font-bold tracking-widest text-graphite flex items-center gap-1.5">
                  <Bookmark size={12} className="text-accent-blue" />
                  REFERENCE [{ref.citationNumber}]
                </span>
                <span className="font-hand text-base text-muted-grey">
                  {ref.year}
                </span>
              </div>

              {/* Category */}
              <span className="font-sans text-[9px] tracking-widest uppercase text-accent-green font-bold block mb-1.5">
                {ref.category}
              </span>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-serif text-graphite group-hover:text-accent-blue transition-colors duration-200 mb-2 leading-snug">
                {ref.title}
              </h3>

              {/* Authors & Source */}
              <p className="font-sans text-xs text-charcoal font-medium mb-1">
                {ref.authors}
              </p>
              <p className="font-serif italic text-xs text-muted-grey mb-4">
                {ref.source}
              </p>

              {/* Relevance paragraph */}
              <div className="bg-paper/70 p-3 rounded-xs border border-graphite/10 text-xs font-serif text-charcoal/85 leading-relaxed mb-4">
                <span className="font-sans text-[8.5px] uppercase tracking-wider text-muted-grey font-bold block mb-1">
                  Relevance to DHARA
                </span>
                {ref.relevance}
              </div>
            </div>

            {/* Clickable Original Source Link */}
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

    </section>
  );
}

