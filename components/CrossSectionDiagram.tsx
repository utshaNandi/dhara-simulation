"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, ArrowDown, Droplets, ShieldCheck, Compass } from "lucide-react";

interface LayerDetail {
  id: string;
  title: string;
  thickness: string;
  voidFraction: string;
  storageDefault: string;
  role: string;
  color: string;
}

const LAYER_DETAILS: Record<string, LayerDetail> = {
  inlet: {
    id: "inlet",
    title: "Roadside Cast-Iron Inlet Grate & Silt Trap",
    thickness: "Surface entry",
    voidFraction: "Direct aperture",
    storageDefault: "N/A",
    role: "Collects curb-line runoff, intercepting coarse street debris, leaf litter, and large plastic particles before entering the underground chamber.",
    color: "#2b2b2b",
  },
  collection: {
    id: "collection",
    title: "1. Water Collection Zone",
    thickness: "0.25 m (Depth: 0.00 – 0.25 m)",
    voidFraction: "100% Free Void",
    storageDefault: "250 Litres / pit",
    role: "Unobstructed hydraulic surge volume directly under the curb inlet. Allows high-rate monsoonal inflows to settle energy and deposit heavy suspended solids.",
    color: "#d2e3fc",
  },
  plate: {
    id: "plate",
    title: "2. Perforated Filtration Plate & Geotextile",
    thickness: "0.05 m (Depth: 0.25 – 0.30 m)",
    voidFraction: "0% (Not counted in usable storage)",
    storageDefault: "0 Litres (Structural barrier)",
    role: "Non-corrosive stainless/composite perforated plate layered with permeable geotextile. Distributes water uniformly across media and prevents downward silt migration.",
    color: "#545b62",
  },
  gravel: {
    id: "gravel",
    title: "3. Graded Gravel Layer",
    thickness: "0.50 m (Depth: 0.30 – 0.80 m)",
    voidFraction: "35% Interstitial Pore Void",
    storageDefault: "175 Litres / pit",
    role: "Clean washed angular gravel (10–20 mm). Facilitates rapid downflow distribution while entrapping medium suspended sediments and particulate matter.",
    color: "#9aa0a6",
  },
  sand: {
    id: "sand",
    title: "4. Coarse River Sand Layer",
    thickness: "0.75 m (Depth: 0.80 – 1.55 m)",
    voidFraction: "35% Interstitial Pore Void",
    storageDefault: "262.5 Litres / pit",
    role: "Coarse washed sand (0.5–2.0 mm). Provides deep-bed mechanical filtration of fine silts and organic particulates through tortuous interstitial pathways.",
    color: "#e8c99b",
  },
  pebbles: {
    id: "pebbles",
    title: "5. Pebble / Ballast Base Layer",
    thickness: "0.45 m (Depth: 1.55 – 2.00 m)",
    voidFraction: "40% Interstitial Pore Void",
    storageDefault: "180 Litres / pit",
    role: "Rounded river pebbles (20–40 mm). Stabilizes the base against fluid scour, prevents soil piping, and maximizes horizontal & vertical contact with the subgrade.",
    color: "#b89f82",
  },
  soil: {
    id: "soil",
    title: "Natural Exposed Soil Walls & Base",
    thickness: "Unlined boundary (4 walls + 1 floor)",
    voidFraction: "In-situ geotechnical porosity",
    storageDefault: "9 m² contact area / pit",
    role: "Crucial design principle: the pit is unlined to enable radial and vertical infiltration directly into the Kolkata alluvial stratum. Temporary shoring or porous permeable geogrids provide safety during excavation without sealing the soil.",
    color: "#7a8b75",
  },
  overflow: {
    id: "overflow",
    title: "High-Level Overflow Connection",
    thickness: "Crest elevation at +0.20 m in chamber",
    voidFraction: "Hydraulic bypass pipe",
    storageDefault: "Continuous discharge",
    role: "When extreme storms exceed pit media capacity (4,338 L for 5 pits), water discharges safely into the municipal stormwater drainage network, preventing localized surface back-flooding.",
    color: "#a75d50",
  },
};

export default function CrossSectionDiagram() {
  const [activeLayer, setActiveLayer] = useState<string>("collection");
  const current = LAYER_DETAILS[activeLayer] || LAYER_DETAILS.collection;

  return (
    <section id="cross-section" className="px-4 md:px-6 py-12 md:py-20 max-w-5xl mx-auto w-full relative z-10">
      {/* Section Header */}
      <div className="mb-8 md:mb-12">
        <span className="font-sans text-[10px] tracking-widest uppercase text-accent-blue block mb-2 font-bold border-b border-accent-blue/20 w-fit pb-1">
          Technical Schematic // System Profile
        </span>
        <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-serif leading-tight text-graphite mb-3">
          Cross-Sectional Architecture
        </h2>
        <p className="font-serif text-charcoal/80 max-w-2xl leading-relaxed text-sm md:text-base">
          Engineered multi-stage stratification: surface collection, graded particulate filtration, dynamic media pore storage, and radial soil infiltration into Kolkata alluvial subgrade.
        </p>
      </div>

      {/* Main Diagram Card */}
      <div className="border-hand p-4 md:p-8 bg-paper/70 backdrop-blur-sm">
        
        {/* Layer Selection Pill Bar */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-graphite/10 pb-4">
          <span className="font-sans text-[10px] tracking-widest uppercase text-muted-grey flex items-center gap-1.5 mr-2 self-center font-bold">
            <Compass size={12} /> Inspect:
          </span>
          {Object.entries(LAYER_DETAILS).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setActiveLayer(key)}
              className={`font-sans text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-xs transition-all duration-200 border ${
                activeLayer === key
                  ? "bg-graphite text-paper border-graphite shadow-xs"
                  : "bg-paper/80 text-charcoal border-graphite/15 hover:border-graphite/40"
              }`}
            >
              {val.title.split(".")[0].replace("Layer", "").trim()}
            </button>
          ))}
        </div>

        {/* SVG Diagram and Interactive Explainer Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Architectural SVG Illustration */}
          <div className="lg:col-span-7 bg-[#fbf9f4] border border-graphite/15 p-4 rounded-xs shadow-xs relative overflow-hidden">
            
            <svg
              viewBox="0 0 600 520"
              className="w-full h-auto select-none"
              style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.03))" }}
            >
              <defs>
                {/* Soil hatching pattern */}
                <pattern id="soilHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#8c8275" strokeWidth="0.8" strokeOpacity="0.25" />
                </pattern>
                {/* Gravel pattern */}
                <pattern id="gravelPattern" width="16" height="16" patternUnits="userSpaceOnUse">
                  <circle cx="4" cy="4" r="2.5" fill="#888888" fillOpacity="0.3" />
                  <circle cx="12" cy="11" r="2" fill="#555555" fillOpacity="0.35" />
                  <polygon points="12,3 15,6 10,7" fill="#666666" fillOpacity="0.25" />
                </pattern>
                {/* Sand pattern */}
                <pattern id="sandPattern" width="6" height="6" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="0.75" fill="#b08b58" fillOpacity="0.45" />
                  <circle cx="5" cy="5" r="0.6" fill="#8c6a38" fillOpacity="0.35" />
                </pattern>
                {/* Pebbles pattern */}
                <pattern id="pebblePattern" width="22" height="18" patternUnits="userSpaceOnUse">
                  <ellipse cx="6" cy="6" rx="5" ry="3.5" fill="#786c5e" fillOpacity="0.35" />
                  <ellipse cx="16" cy="12" rx="4.5" ry="3" fill="#9e9182" fillOpacity="0.4" />
                </pattern>
                {/* Arrow markers */}
                <marker id="arrowBlue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#6d8ba6" />
                </marker>
                <marker id="arrowGreen" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#7a8b75" />
                </marker>
                <marker id="arrowRust" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#a75d50" />
                </marker>
              </defs>

              {/* 1. Surrounding Native Soil (Background with soil hatching) */}
              <rect x="10" y="80" width="580" height="420" fill="#ede8df" />
              <rect x="10" y="80" width="580" height="420" fill="url(#soilHatch)" />

              {/* Soil Infiltration Streamlines (Radial & Downward arrows) */}
              <g stroke="#7a8b75" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8">
                {/* Left wall radial seepage */}
                <line x1="160" y1="200" x2="80" y2="200" markerEnd="url(#arrowGreen)" />
                <line x1="160" y1="300" x2="70" y2="300" markerEnd="url(#arrowGreen)" />
                <line x1="160" y1="400" x2="80" y2="410" markerEnd="url(#arrowGreen)" />
                {/* Right wall radial seepage */}
                <line x1="420" y1="200" x2="500" y2="200" markerEnd="url(#arrowGreen)" />
                <line x1="420" y1="300" x2="510" y2="300" markerEnd="url(#arrowGreen)" />
                <line x1="420" y1="400" x2="500" y2="410" markerEnd="url(#arrowGreen)" />
                {/* Base downward seepage */}
                <line x1="220" y1="460" x2="220" y2="505" markerEnd="url(#arrowGreen)" />
                <line x1="290" y1="460" x2="290" y2="510" markerEnd="url(#arrowGreen)" />
                <line x1="360" y1="460" x2="360" y2="505" markerEnd="url(#arrowGreen)" />
              </g>

              {/* Soil Annotation Badge */}
              <g
                className="cursor-pointer"
                onClick={() => setActiveLayer("soil")}
              >
                <rect x="20" y="440" width="125" height="45" rx="3" fill="#ffffff" stroke="#7a8b75" strokeWidth="1" />
                <text x="27" y="457" fontFamily="sans-serif" fontSize="9" fontWeight="bold" letterSpacing="0.05em" fill="#4a4a4a">
                  NATURAL SOIL WALLS
                </text>
                <text x="27" y="472" fontFamily="serif" fontSize="10" fill="#7a8b75" fontStyle="italic">
                  Unlined for Infiltration →
                </text>
              </g>

              {/* 2. Road Surface & Curb */}
              {/* Road Asphalt */}
              <polygon points="10,65 170,75 170,85 10,80" fill="#3a3d40" />
              <line x1="10" y1="65" x2="170" y2="75" stroke="#222" strokeWidth="2" />
              <text x="40" y="60" fontFamily="sans-serif" fontSize="9" letterSpacing="0.08em" fill="#666" fontWeight="bold">
                ROAD SURFACE (SLOPE →)
              </text>
              {/* Runoff arrows on road */}
              <path d="M 60 63 Q 95 68 135 72" fill="none" stroke="#6d8ba6" strokeWidth="2" markerEnd="url(#arrowBlue)" />

              {/* Concrete Curb & Gutter */}
              <rect x="155" y="55" width="20" height="25" fill="#b0b5b9" stroke="#4a4a4a" strokeWidth="1" />
              <rect x="405" y="70" width="180" height="15" fill="#d0d5d8" stroke="#888" strokeWidth="0.8" />
              <text x="430" y="66" fontFamily="sans-serif" fontSize="9" letterSpacing="0.08em" fill="#888">
                PEDESTRIAN WALKWAY / VERGE
              </text>

              {/* 3. The Pit Excavation Void (Width = 260px, Height = 380px) */}
              {/* Boundary: x=165 to 415, y=80 to 460 */}
              <rect
                x="165"
                y="80"
                width="250"
                height="380"
                fill="#ffffff"
                stroke={activeLayer === "soil" ? "#7a8b75" : "#4a4a4a"}
                strokeWidth={activeLayer === "soil" ? 2.5 : 1.2}
                strokeDasharray="4 2"
              />

              {/* High-Level Overflow Pipe (Exiting on right at upper elevation) */}
              <g
                className="cursor-pointer"
                onClick={() => setActiveLayer("overflow")}
              >
                <rect x="415" y="105" width="155" height="24" fill="#f4e8e6" stroke="#a75d50" strokeWidth="1.2" />
                <line x1="425" y1="117" x2="550" y2="117" stroke="#a75d50" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#arrowRust)" />
                <text x="430" y="100" fontFamily="sans-serif" fontSize="8.5" fontWeight="bold" letterSpacing="0.05em" fill="#a75d50">
                  OVERFLOW TO DRAIN →
                </text>
              </g>

              {/* Inlet Grate at top of pit (x=165 to 225) */}
              <g
                className="cursor-pointer"
                onClick={() => setActiveLayer("inlet")}
              >
                <rect x="165" y="73" width="70" height="8" fill="#2b2b2b" rx="1" />
                {/* Grate bars */}
                <line x1="175" y1="73" x2="175" y2="81" stroke="#fff" strokeWidth="1" />
                <line x1="185" y1="73" x2="185" y2="81" stroke="#fff" strokeWidth="1" />
                <line x1="195" y1="73" x2="195" y2="81" stroke="#fff" strokeWidth="1" />
                <line x1="205" y1="73" x2="205" y2="81" stroke="#fff" strokeWidth="1" />
                <line x1="215" y1="73" x2="215" y2="81" stroke="#fff" strokeWidth="1" />
                <text x="175" y="68" fontFamily="sans-serif" fontSize="8" fontWeight="bold" fill="#2b2b2b">
                  INLET GRATE
                </text>
              </g>

              {/* Inflow Water Cascade Vector */}
              <path d="M 185 82 Q 185 110 210 115" fill="none" stroke="#6d8ba6" strokeWidth="3" markerEnd="url(#arrowBlue)" />

              {/* LAYER 1: Collection Chamber (0.25 m, y=80 to 127) */}
              <g
                className="cursor-pointer transition-opacity"
                onClick={() => setActiveLayer("collection")}
                opacity={activeLayer === "collection" ? 1 : 0.85}
              >
                <rect
                  x="166"
                  y="81"
                  width="248"
                  height="47"
                  fill="#eaf2fd"
                  stroke={activeLayer === "collection" ? "#6d8ba6" : "none"}
                  strokeWidth="2"
                />
                {/* Water level ripple indicator */}
                <path d="M 170 100 Q 210 97 250 100 T 330 100 T 410 100" fill="none" stroke="#6d8ba6" strokeWidth="1.2" strokeOpacity="0.6" />
                <text x="290" y="110" textAnchor="middle" fontFamily="sans-serif" fontSize="9.5" fontWeight="bold" fill="#2d527c">
                  1. COLLECTION ZONE (0.25 m) — 100% VOID
                </text>
              </g>

              {/* LAYER 2: Filtration Plate (0.05 m, y=128 to 138) */}
              <g
                className="cursor-pointer"
                onClick={() => setActiveLayer("plate")}
              >
                <rect
                  x="166"
                  y="128"
                  width="248"
                  height="10"
                  fill="#4a4a4a"
                  stroke={activeLayer === "plate" ? "#2b2b2b" : "none"}
                  strokeWidth="2"
                />
                {/* Perforations */}
                {[...Array(11)].map((_, i) => (
                  <circle key={i} cx={178 + i * 22} cy={133} r="1.5" fill="#f9f7f1" />
                ))}
              </g>

              {/* LAYER 3: Gravel Layer (0.50 m, y=138 to 233) */}
              <g
                className="cursor-pointer"
                onClick={() => setActiveLayer("gravel")}
                opacity={activeLayer === "gravel" ? 1 : 0.85}
              >
                <rect
                  x="166"
                  y="138"
                  width="248"
                  height="95"
                  fill="#ebebeb"
                  stroke={activeLayer === "gravel" ? "#2b2b2b" : "none"}
                  strokeWidth="2"
                />
                <rect x="166" y="138" width="248" height="95" fill="url(#gravelPattern)" />
                <text x="290" y="190" textAnchor="middle" fontFamily="sans-serif" fontSize="9.5" fontWeight="bold" fill="#333333">
                  3. GRAVEL LAYER (0.50 m) — 35% VOID
                </text>
              </g>

              {/* LAYER 4: Coarse Sand Layer (0.75 m, y=233 to 375) */}
              <g
                className="cursor-pointer"
                onClick={() => setActiveLayer("sand")}
                opacity={activeLayer === "sand" ? 1 : 0.85}
              >
                <rect
                  x="166"
                  y="233"
                  width="248"
                  height="142"
                  fill="#fdf5ea"
                  stroke={activeLayer === "sand" ? "#a75d50" : "none"}
                  strokeWidth="2"
                />
                <rect x="166" y="233" width="248" height="142" fill="url(#sandPattern)" />
                <text x="290" y="305" textAnchor="middle" fontFamily="sans-serif" fontSize="9.5" fontWeight="bold" fill="#7a5528">
                  4. COARSE SAND LAYER (0.75 m) — 35% VOID
                </text>
                <text x="290" y="322" textAnchor="middle" fontFamily="serif" fontSize="9" fill="#8c6a38" fontStyle="italic">
                  Fine Particulate Mechanical Interception
                </text>
              </g>

              {/* LAYER 5: Pebbles Layer (0.45 m, y=375 to 460) */}
              <g
                className="cursor-pointer"
                onClick={() => setActiveLayer("pebbles")}
                opacity={activeLayer === "pebbles" ? 1 : 0.85}
              >
                <rect
                  x="166"
                  y="375"
                  width="248"
                  height="85"
                  fill="#f1ebe2"
                  stroke={activeLayer === "pebbles" ? "#7a8b75" : "none"}
                  strokeWidth="2"
                />
                <rect x="166" y="375" width="248" height="85" fill="url(#pebblePattern)" />
                <text x="290" y="420" textAnchor="middle" fontFamily="sans-serif" fontSize="9.5" fontWeight="bold" fill="#524536">
                  5. PEBBLES LAYER (0.45 m) — 40% VOID
                </text>
                <text x="290" y="435" textAnchor="middle" fontFamily="serif" fontSize="9" fill="#695947" fontStyle="italic">
                  Scour Protection & Subgrade Contact Base
                </text>
              </g>

              {/* Dimension Brackets on Left */}
              <g stroke="#2b2b2b" strokeWidth="0.8" opacity="0.6">
                <line x1="150" y1="80" x2="150" y2="460" />
                <line x1="145" y1="80" x2="155" y2="80" />
                <line x1="145" y1="460" x2="155" y2="460" />
                <text
                  x="-270"
                  y="140"
                  transform="rotate(-90)"
                  fontFamily="sans-serif"
                  fontSize="9"
                  letterSpacing="0.08em"
                  textAnchor="middle"
                  fill="#2b2b2b"
                >
                  DEPTH: 2.0 METRES
                </text>
              </g>

              {/* Width Bracket at Bottom */}
              <g stroke="#2b2b2b" strokeWidth="0.8" opacity="0.6">
                <line x1="165" y1="475" x2="415" y2="475" />
                <line x1="165" y1="470" x2="165" y2="480" />
                <line x1="415" y1="470" x2="415" y2="480" />
                <text x="290" y="490" textAnchor="middle" fontFamily="sans-serif" fontSize="9" letterSpacing="0.08em" fill="#2b2b2b">
                  WIDTH: 1.0 m × LENGTH: 1.0 m
                </text>
              </g>
            </svg>

            <div className="mt-2 text-center">
              <span className="font-hand text-xs text-muted-grey">
                * Click on any layer or component in the schematic or tabs above to inspect engineering specifications.
              </span>
            </div>
          </div>

          {/* Interactive Specification Note Card */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="border-hand p-5 bg-white/70 backdrop-blur-sm min-h-[340px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-graphite/10 pb-3 mb-4">
                  <span className="font-sans text-[9px] tracking-widest uppercase text-accent-blue font-bold flex items-center gap-1.5">
                    <Info size={12} /> Strata Specification
                  </span>
                  <span className="font-sans text-[9px] uppercase tracking-wider px-2 py-0.5 border border-graphite/20 text-graphite rounded-xs">
                    {current.thickness}
                  </span>
                </div>

                <h3 className="font-serif text-xl text-graphite mb-3 leading-snug">
                  {current.title}
                </h3>

                <div className="grid grid-cols-2 gap-3 my-4 bg-paper/60 p-3 rounded-xs border border-graphite/10 font-sans text-xs">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-muted-grey block">Void Fraction</span>
                    <span className="font-serif text-base text-graphite font-medium">{current.voidFraction}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-muted-grey block">Estimated Storage</span>
                    <span className="font-serif text-base text-graphite font-medium">{current.storageDefault}</span>
                  </div>
                </div>

                <p className="font-serif text-charcoal/90 text-sm leading-relaxed mb-4">
                  {current.role}
                </p>
              </div>

              {/* Engineering callout */}
              <div className="border-t border-graphite/10 pt-3 flex items-start gap-2.5 text-xs text-muted-grey">
                <ShieldCheck size={16} className="text-accent-green shrink-0 mt-0.5" />
                <span className="font-serif leading-snug text-charcoal/80">
                  {activeLayer === "soil"
                    ? "Critical: Excavation walls are not concrete-lined. Shoring during excavation must employ open porous meshing or removable trench boxes to preserve direct soil infiltration."
                    : "Theoretical design assumption based on washed aggregate packing. Field density and media clean-out intervals directly influence effective life."}
                </span>
              </div>
            </div>

            {/* Quick Summary Strip */}
            <div className="border-hand p-4 bg-paper/60 flex items-center justify-between text-center">
              <div>
                <span className="font-sans text-[8px] uppercase tracking-widest text-muted-grey block">Per Pit Storage</span>
                <span className="font-serif text-lg font-bold text-graphite">867.5 L</span>
              </div>
              <div className="h-8 w-px bg-graphite/15" />
              <div>
                <span className="font-sans text-[8px] uppercase tracking-widest text-muted-grey block">5 Pits Storage</span>
                <span className="font-serif text-lg font-bold text-graphite">4,337.5 L</span>
              </div>
              <div className="h-8 w-px bg-graphite/15" />
              <div>
                <span className="font-sans text-[8px] uppercase tracking-widest text-muted-grey block">Soil Contact / Pit</span>
                <span className="font-serif text-lg font-bold text-graphite">9.0 m²</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

