"use client";

import { AlertTriangle, ShieldAlert, CheckCircle, Scale, Droplets } from "lucide-react";

export default function ModelAssumptions() {
  const ASSUMPTIONS = [
    {
      title: "Heterogeneous Kolkata Lithology",
      text: "Soil infiltration varies widely across the Kolkata metropolitan area. Clay-rich alluvial strata in eastern and southern zones (e.g., East Kolkata Wetlands periphery and parts of New Town) may severely restrict infiltration rates to less than 2–5 mm/hour.",
    },
    {
      title: "Mandatory In-Situ Permeability Testing",
      text: "The soil infiltration rate (defaulting to 5 mm/hour) is an illustrative design assumption. Exact hydraulic conductivity must be empirically measured via in-situ double-ring infiltrometer or borehole falling-head tests at each specific roadside installation site.",
    },
    {
      title: "Assumed Aggregate Void Fractions",
      text: "Filter media void fractions (100% collection zone, 35% gravel, 35% sand, 40% pebbles) represent theoretical estimates for clean, well-sorted, newly placed aggregates. Over time, compaction and sediment entrapment will diminish available interstitial pore space.",
    },
    {
      title: "Dissolved Contaminant Limitations",
      text: "Basic gravel, sand, and pebble stratification provides mechanical filtration for larger suspended particles and coarse sediment. It does NOT guarantee the removal of dissolved hydrocarbons, heavy metals, pesticides, or microbial pathogens present in urban road runoff.",
    },
    {
      title: "Runoff Water Quality & Non-Potability",
      text: "Road runoff typically carries petroleum residues, tire wear particles, brake lining dust, and toxic urban wash-off. Infiltrated or collected water is strictly non-potable and must not be injected directly into potable drinking aquifers without tertiary polishing.",
    },
    {
      title: "Necessity of Municipal Overflow Connection",
      text: "An active high-level overflow pipe connected to the existing municipal stormwater drainage network is mandatory. During extreme monsoonal downpours or cloudburst events exceeding media capacity, excess runoff must safely bypass the pit to prevent local street flooding.",
    },
    {
      title: "Pre-Feasibility Conceptual Model",
      text: "This simulation is an engineering conceptual model intended for pre-feasibility planning and educational demonstration. Physical pilot testing, sediment clean-out scheduling, and structural excavation safety must be validated prior to field construction.",
    },
  ];

  return (
    <section id="assumptions" className="px-4 md:px-6 py-12 md:py-20 max-w-5xl mx-auto w-full relative z-10">
      
      {/* Header */}
      <div className="mb-8 md:mb-12">
        <span className="font-sans text-[10px] tracking-widest uppercase text-accent-rust block mb-2 font-bold border-b border-accent-rust/20 w-fit pb-1 flex items-center gap-1.5">
          <AlertTriangle size={12} /> Scientific Rigour & Geotechnical Boundaries
        </span>
        <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-serif leading-tight text-graphite mb-3">
          Model Assumptions & Limitations
        </h2>
        <p className="font-serif text-charcoal/80 max-w-2xl leading-relaxed text-sm md:text-base">
          DHARA is a proposed decentralised rainwater management concept, not a validated municipal panacea. It does not claim to completely eliminate urban waterlogging or guarantee deep aquifer recharge.
        </p>
      </div>

      {/* Assumptions Grid */}
      <div className="border-hand p-6 md:p-10 bg-paper/70 backdrop-blur-sm">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {ASSUMPTIONS.map((item, idx) => (
            <div key={idx} className="flex gap-4 items-start p-4 bg-white/40 border border-graphite/10 rounded-xs">
              <span className="font-mono text-xs font-bold text-accent-rust shrink-0 mt-0.5">
                0{idx + 1}
              </span>
              <div>
                <h4 className="font-serif text-base font-bold text-graphite mb-1.5 leading-snug">
                  {item.title}
                </h4>
                <p className="font-serif text-xs md:text-sm text-charcoal/85 leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer Warning Box */}
        <div className="mt-8 pt-6 border-t border-graphite/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-paper p-4 rounded-xs border border-graphite/10">
          <div className="flex items-center gap-3">
            <Scale size={20} className="text-accent-blue shrink-0" />
            <span className="font-serif text-xs text-charcoal leading-relaxed">
              Engineering models provide mathematical bounds based on input parameters. Unforeseen silting, high seasonal water tables, or subgrade clay compaction can substantially reduce performance.
            </span>
          </div>
          <span className="font-sans text-[9px] uppercase tracking-widest text-muted-grey shrink-0">
            Field Testing Required
          </span>
        </div>

      </div>

    </section>
  );
}

