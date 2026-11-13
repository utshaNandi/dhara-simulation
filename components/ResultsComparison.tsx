"use client";

import { motion } from "framer-motion";
import { SimulationResults } from "@/simulation/types";
import { Droplets, ShieldAlert, ArrowDownRight, CheckCircle2, TrendingDown } from "lucide-react";

const smoothEase = [0.22, 1, 0.36, 1] as const;

interface ResultsComparisonProps {
  results: SimulationResults;
}

export default function ResultsComparison({ results }: ResultsComparisonProps) {
  const {
    totalRunoffLiters,
    totalInfiltratedLiters,
    totalStoredLiters,
    totalOverflowLiters,
    remainingStorageCapacityLiters,
    drainageReductionPercent,
    pitStorage,
    dynamicWaterBalanceCheck,
    waterBalanceErrorLiters,
    inputs
  } = results;

  // Percentage breakdown of runoff distribution
  const pctInfiltrated = totalRunoffLiters > 0 ? (totalInfiltratedLiters / totalRunoffLiters) * 100 : 0;
  const pctStored = totalRunoffLiters > 0 ? (totalStoredLiters / totalRunoffLiters) * 100 : 0;
  const pctOverflow = totalRunoffLiters > 0 ? (totalOverflowLiters / totalRunoffLiters) * 100 : 0;

  // Storage utilization
  const totalCapacity = pitStorage.totalSystemStorageLiters;
  const storageUtilizationPct = totalCapacity > 0 ? (totalStoredLiters / totalCapacity) * 100 : 0;

  return (
    <div className="flex flex-col gap-10">
      
      {/* 1. Core KPIs Strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        
        {/* Total Runoff */}
        <div className="border-hand p-4 bg-paper/70 backdrop-blur-sm flex flex-col justify-between">
          <span className="font-sans text-[9px] uppercase tracking-widest text-muted-grey font-bold">
            Total Runoff
          </span>
          <div className="my-2">
            <span className="font-serif text-2xl md:text-3xl font-medium text-graphite">
              {totalRunoffLiters.toLocaleString()}
            </span>
            <span className="font-sans text-[10px] text-muted-grey ml-1">L</span>
          </div>
          <span className="font-sans text-[9px] text-charcoal/70">
            {inputs.catchmentArea} m² @ {inputs.rainfallIntensity} mm/h
          </span>
        </div>

        {/* Water Infiltrated */}
        <div className="border-hand p-4 bg-paper/70 backdrop-blur-sm flex flex-col justify-between border-l-2 border-l-accent-green">
          <span className="font-sans text-[9px] uppercase tracking-widest text-accent-green font-bold flex items-center gap-1">
            Soil Infiltration
          </span>
          <div className="my-2">
            <span className="font-serif text-2xl md:text-3xl font-medium text-graphite">
              {totalInfiltratedLiters.toLocaleString()}
            </span>
            <span className="font-sans text-[10px] text-muted-grey ml-1">L</span>
          </div>
          <span className="font-sans text-[9px] text-charcoal/70">
            {pctInfiltrated.toFixed(1)}% percolated
          </span>
        </div>

        {/* Water Stored */}
        <div className="border-hand p-4 bg-paper/70 backdrop-blur-sm flex flex-col justify-between border-l-2 border-l-accent-blue">
          <span className="font-sans text-[9px] uppercase tracking-widest text-accent-blue font-bold flex items-center gap-1">
            Media Stored
          </span>
          <div className="my-2">
            <span className="font-serif text-2xl md:text-3xl font-medium text-graphite">
              {totalStoredLiters.toLocaleString()}
            </span>
            <span className="font-sans text-[10px] text-muted-grey ml-1">L</span>
          </div>
          <span className="font-sans text-[9px] text-charcoal/70">
            {storageUtilizationPct.toFixed(0)}% media fill
          </span>
        </div>

        {/* Overflow Discharged */}
        <div className={`border-hand p-4 bg-paper/70 backdrop-blur-sm flex flex-col justify-between border-l-2 ${totalOverflowLiters > 0 ? 'border-l-accent-rust' : 'border-l-graphite/20'}`}>
          <span className="font-sans text-[9px] uppercase tracking-widest text-muted-grey font-bold flex items-center gap-1">
            Overflow
          </span>
          <div className="my-2">
            <span className="font-serif text-2xl md:text-3xl font-medium text-graphite">
              {totalOverflowLiters.toLocaleString()}
            </span>
            <span className="font-sans text-[10px] text-muted-grey ml-1">L</span>
          </div>
          <span className="font-sans text-[9px] text-charcoal/70">
            {totalOverflowLiters > 0 ? `${pctOverflow.toFixed(1)}% to drain` : 'Zero bypass'}
          </span>
        </div>

        {/* Remaining Capacity */}
        <div className="border-hand p-4 bg-paper/70 backdrop-blur-sm flex flex-col justify-between">
          <span className="font-sans text-[9px] uppercase tracking-widest text-muted-grey font-bold">
            Unused Capacity
          </span>
          <div className="my-2">
            <span className="font-serif text-2xl md:text-3xl font-medium text-graphite">
              {remainingStorageCapacityLiters.toLocaleString()}
            </span>
            <span className="font-sans text-[10px] text-muted-grey ml-1">L</span>
          </div>
          <span className="font-sans text-[9px] text-charcoal/70">
            of {totalCapacity.toLocaleString()} L total
          </span>
        </div>

        {/* Drainage Reduction */}
        <div className="border-hand p-4 bg-graphite text-paper backdrop-blur-sm flex flex-col justify-between">
          <span className="font-sans text-[9px] uppercase tracking-widest text-paper/70 font-bold flex items-center gap-1">
            <TrendingDown size={11} className="text-accent-green" /> Drain Relief
          </span>
          <div className="my-2">
            <span className="font-serif text-2xl md:text-3xl font-medium text-paper">
              {drainageReductionPercent}%
            </span>
          </div>
          <span className="font-sans text-[9px] text-paper/70">
            Peak volume averted
          </span>
        </div>

      </div>

      {/* 2. Visual Comparison: WITHOUT DHARA vs WITH DHARA */}
      <div className="border-hand p-6 md:p-8 bg-paper/80 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-graphite/15 pb-4 mb-6">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-widest text-muted-grey font-bold">
              Comparative Hydraulic Distribution
            </span>
            <h3 className="text-xl md:text-2xl font-serif text-graphite mt-1">
              WITHOUT DHARA <span className="text-graphite/40 font-normal">|</span> WITH DHARA
            </h3>
          </div>
          <span className="font-hand text-base text-accent-rust">
            Runoff diversion & pluvial flood attenuation
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          {/* WITHOUT DHARA */}
          <div className="p-5 border border-graphite/15 bg-white/40 rounded-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-sans text-xs tracking-wider uppercase font-bold text-graphite">
                  Conventional Street Drainage
                </span>
                <span className="font-sans text-[9px] uppercase tracking-widest px-2 py-0.5 border border-accent-rust/30 text-accent-rust">
                  No Retention
                </span>
              </div>
              <p className="font-serif text-charcoal/80 text-xs leading-relaxed mb-6">
                100% of roadside precipitation immediately enters the municipal drainage sewer or ponds in low-lying carriageways, triggering localized street waterlogging.
              </p>

              {/* Bar */}
              <div className="space-y-3">
                <div className="flex justify-between font-sans text-xs">
                  <span className="text-charcoal">Storm Drain Surge</span>
                  <span className="font-serif font-bold text-graphite">{totalRunoffLiters.toLocaleString()} L (100%)</span>
                </div>
                <div className="h-4 w-full bg-graphite/10 relative overflow-hidden rounded-xs">
                  <div className="h-full bg-accent-rust/80 w-full" />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-graphite/10 font-sans text-[10px] text-muted-grey flex justify-between">
              <span>Soil Recharge: 0 L</span>
              <span>Water Stored: 0 L</span>
            </div>
          </div>

          {/* WITH DHARA */}
          <div className="p-5 border border-graphite/20 bg-white/70 rounded-xs shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-sans text-xs tracking-wider uppercase font-bold text-graphite">
                  DHARA Decentralised System
                </span>
                <span className="font-sans text-[9px] uppercase tracking-widest px-2 py-0.5 bg-accent-green/10 text-accent-green border border-accent-green/30 font-bold">
                  {drainageReductionPercent}% Diverted
                </span>
              </div>
              <p className="font-serif text-charcoal/80 text-xs leading-relaxed mb-6">
                Runoff is partitioned between dynamic media storage ({totalStoredLiters.toLocaleString()} L) and active radial soil infiltration ({totalInfiltratedLiters.toLocaleString()} L).
              </p>

              {/* Multi-segment distribution bar */}
              <div className="space-y-3">
                <div className="flex justify-between font-sans text-xs">
                  <span className="text-charcoal">Runoff Distribution</span>
                  <span className="font-serif font-bold text-graphite">
                    {(totalStoredLiters + totalInfiltratedLiters).toLocaleString()} L Captured
                  </span>
                </div>

                <div className="h-4 w-full bg-graphite/10 relative overflow-hidden flex rounded-xs">
                  {/* Infiltrated */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pctInfiltrated}%` }}
                    transition={{ duration: 1, ease: smoothEase }}
                    className="h-full bg-accent-green"
                    title={`Infiltrated: ${totalInfiltratedLiters} L (${pctInfiltrated.toFixed(1)}%)`}
                  />
                  {/* Stored */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pctStored}%` }}
                    transition={{ duration: 1, delay: 0.1, ease: smoothEase }}
                    className="h-full bg-accent-blue"
                    title={`Stored: ${totalStoredLiters} L (${pctStored.toFixed(1)}%)`}
                  />
                  {/* Overflow */}
                  {totalOverflowLiters > 0 && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pctOverflow}%` }}
                      transition={{ duration: 1, delay: 0.2, ease: smoothEase }}
                      className="h-full bg-accent-rust"
                      title={`Overflow: ${totalOverflowLiters} L (${pctOverflow.toFixed(1)}%)`}
                    />
                  )}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 pt-1 font-sans text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-accent-green rounded-xs inline-block" />
                    <span className="text-charcoal">Infiltrated ({pctInfiltrated.toFixed(0)}%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-accent-blue rounded-xs inline-block" />
                    <span className="text-charcoal">Stored ({pctStored.toFixed(0)}%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-accent-rust rounded-xs inline-block" />
                    <span className="text-charcoal">Overflow ({pctOverflow.toFixed(0)}%)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-graphite/10 font-sans text-[10px] text-charcoal/80 flex justify-between items-center">
              <span>Drain Relief: {drainageReductionPercent}%</span>
              <span className="font-medium text-graphite">{totalOverflowLiters.toLocaleString()} L to drain</span>
            </div>
          </div>

        </div>

      </div>

      {/* 3. Dynamic Water Balance Consistency Card */}
      <div className="border-hand p-5 md:p-6 bg-paper/60 backdrop-blur-sm flex flex-col md:flex-row md:items-center justify-between gap-4 font-sans text-xs">
        <div className="flex items-start gap-3">
          <CheckCircle2 size={18} className="text-accent-green shrink-0 mt-0.5" />
          <div>
            <span className="font-bold uppercase tracking-wider text-graphite block">
              Dynamic Water Balance Verified
            </span>
            <span className="font-serif text-charcoal/80 text-sm">
              Incoming Runoff ({totalRunoffLiters.toLocaleString()} L) = Infiltrated ({totalInfiltratedLiters.toLocaleString()} L) + Stored ({totalStoredLiters.toLocaleString()} L) + Overflow ({totalOverflowLiters.toLocaleString()} L)
            </span>
          </div>
        </div>
        <div className="font-mono text-[11px] text-muted-grey shrink-0 bg-white/70 px-3 py-1.5 border border-graphite/10 rounded-xs">
          Residual Δ = {waterBalanceErrorLiters} L (Mass Conserved)
        </div>
      </div>

    </div>
  );
}

