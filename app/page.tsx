"use client";

import { motion } from "framer-motion";
import { 
  Droplets, 
  Layers, 
  Waves, 
  ArrowDown, 
  ChevronRight, 
  ShieldCheck, 
  FileText, 
  SlidersHorizontal,
  Compass,
  AlertTriangle
} from "lucide-react";
import Link from "next/link";
import CrossSectionDiagram from "@/components/CrossSectionDiagram";
import DharaSimulation from "@/components/DharaSimulation";
import ModelAssumptions from "@/components/ModelAssumptions";
import ReferencesSection from "@/components/ReferencesSection";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: smoothEase }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

export default function Home() {
  return (
    <main className="min-h-screen pb-24 relative w-full overflow-hidden">
      
      {/* ========================================================
          1. HERO SECTION
          ======================================================== */}
      <section id="overview" className="px-4 md:px-6 pt-12 pb-10 md:pt-28 md:pb-20 max-w-5xl mx-auto flex flex-col items-start relative w-full">
        
        {/* Subtle decorative background water droplet vector */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 1.5, ease: smoothEase }}
          className="absolute top-8 right-[-20px] md:right-10 pointer-events-none"
        >
          <Droplets className="w-56 h-56 md:w-80 md:h-80 text-graphite" strokeWidth={0.5} />
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="w-full relative z-10"
        >
          <motion.span variants={fadeUp} className="font-hand text-lg md:text-xl text-accent-rust mb-3 block rotate-[-1.5deg] -ml-1">
            Hydrological Research Proposal // Kolkata Basin
          </motion.span>
          
          <motion.h1 variants={fadeUp} className="text-[clamp(2.5rem,8vw,4.5rem)] font-serif font-medium leading-[1.08] mb-6 text-graphite">
            DHARA<br />
            <span className="italic text-charcoal/90 text-[clamp(1.5rem,5vw,2.75rem)] font-normal block mt-1">
              Decentralised Rainwater Infiltration System
            </span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-base md:text-xl font-serif text-charcoal/80 max-w-3xl leading-relaxed mb-8">
            An engineered concept for roadside stormwater runoff collection, aggregate strata mechanical filtration, dynamic pore detention, and radial soil percolation across Kolkata's urban subgrade.
          </motion.p>
        </motion.div>

        {/* The Central Concept Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: smoothEase }}
          className="w-full mt-4 border-hand p-6 md:p-10 bg-paper/80 backdrop-blur-sm relative z-10"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4 border-b border-graphite/10 pb-3">
            <span className="font-sans text-xs tracking-widest uppercase text-muted-grey font-bold">
              Engineering Purpose & Core Objectives
            </span>
            <span className="font-hand text-sm text-accent-rust">
              A proposed concept — requires site-specific field validation
            </span>
          </div>

          <p className="text-lg md:text-2xl font-serif leading-snug text-graphite mb-8">
            How can roadside runoff be detained and filtered at source to relieve municipal drainage distress?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-4 border border-graphite/10 bg-white/50 rounded-xs flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-accent-blue font-bold block mb-1">01</span>
                <h4 className="font-serif font-bold text-sm text-graphite mb-1">Surface Relief</h4>
                <p className="font-serif text-xs text-charcoal/80 leading-relaxed">
                  Reduce pluvial surface water accumulation on impervious carriage roadways.
                </p>
              </div>
            </div>

            <div className="p-4 border border-graphite/10 bg-white/50 rounded-xs flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-accent-green font-bold block mb-1">02</span>
                <h4 className="font-serif font-bold text-sm text-graphite mb-1">Drainage Offload</h4>
                <p className="font-serif text-xs text-charcoal/80 leading-relaxed">
                  Reduce peak-hour pressure and hydraulic surcharge on Kolkata's aged trunk sewer network.
                </p>
              </div>
            </div>

            <div className="p-4 border border-graphite/10 bg-white/50 rounded-xs flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-accent-amber font-bold block mb-1">03</span>
                <h4 className="font-serif font-bold text-sm text-graphite mb-1">Subgrade Infiltration</h4>
                <p className="font-serif text-xs text-charcoal/80 leading-relaxed">
                  Encourage diffuse unlined soil percolation where geological conditions permit.
                </p>
              </div>
            </div>

            <div className="p-4 border border-graphite/10 bg-white/50 rounded-xs flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-graphite font-bold block mb-1">04</span>
                <h4 className="font-serif font-bold text-sm text-graphite mb-1">Modular Scalability</h4>
                <p className="font-serif text-xs text-charcoal/80 leading-relaxed">
                  Provide an affordable, modular roadside unit that scales along arterial highway corridors.
                </p>
              </div>
            </div>

          </div>

          <div className="mt-8 pt-4 border-t border-graphite/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-sans text-muted-grey">
              <span>Standard Baseline: 5 Pits</span>
              <span>•</span>
              <span>4,338 L Combined Storage</span>
              <span>•</span>
              <span>45 m² Soil Contact Area</span>
            </div>

            <Link
              href="#simulation"
              className="inline-flex items-center gap-2 font-sans text-[11px] font-bold tracking-widest uppercase text-graphite hover:text-accent-blue transition-colors link-underline"
            >
              <span>Launch Interactive Model</span>
              <ChevronRight size={13} />
            </Link>
          </div>

        </motion.div>

      </section>

      {/* Subtle Divider */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 my-6">
        <div className="divider-sketch" />
      </div>

      {/* ========================================================
          2. CROSS-SECTION SCHEMATIC
          ======================================================== */}
      <CrossSectionDiagram />

      {/* Subtle Divider */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 my-6">
        <div className="divider-sketch" />
      </div>

      {/* ========================================================
          3. DYNAMIC SIMULATION
          ======================================================== */}
      <DharaSimulation />

      {/* Subtle Divider */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 my-6">
        <div className="divider-sketch" />
      </div>

      {/* ========================================================
          4. MODEL ASSUMPTIONS & LIMITATIONS
          ======================================================== */}
      <ModelAssumptions />

      {/* Subtle Divider */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 my-6">
        <div className="divider-sketch" />
      </div>

      {/* ========================================================
          5. RESEARCH & REFERENCES
          ======================================================== */}
      <ReferencesSection />

    </main>
  );
}

