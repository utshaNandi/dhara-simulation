"use client";

import { motion } from "framer-motion";
import { SimulationResults } from "@/simulation/types";
import { CloudRain, Compass, Droplet, Layers, Waves, AlertTriangle } from "lucide-react";

const smoothEase = [0.22, 1, 0.36, 1] as const;

interface WaterBalanceFlowProps {
  results: SimulationResults;
}

export default function WaterBalanceFlow({ results }: WaterBalanceFlowProps) {
  const { timeSeries, totalRunoffLiters, pitStorage, inputs } = results;

  // Max value for chart Y-axis scaling
  const maxY = Math.max(
    totalRunoffLiters,
    pitStorage.totalSystemStorageLiters,
    100
  );

  const getPoints = (accessor: (d: typeof timeSeries[0]) => number) => {
    if (!timeSeries || timeSeries.length < 2) return "";
    return timeSeries
      .map((pt, i) => {
        const x = (i / (timeSeries.length - 1)) * 100;
        const val = accessor(pt);
        const y = 100 - (val / maxY) * 100;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  };

  const runoffPoints = getPoints((d) => d.cumulativeRunoffLiters);
  const storedPoints = getPoints((d) => d.currentStoredLiters);
  const infiltratedPoints = getPoints((d) => d.cumulativeInfiltratedLiters);
  const overflowPoints = getPoints((d) => d.cumulativeOverflowLiters);

  // Hydraulic mechanism chain adapted from Salmonella's mechanism chain
  const MECHANISM_STEPS = [
    { title: "Precipitation", sub: `${inputs.rainfallIntensity} mm/h Storm`, icon: CloudRain },
    { title: "Surface Runoff", sub: `${inputs.catchmentArea} m² Catchment`, icon: Compass },
    { title: "Inlet & Settle", sub: "Collection Zone (250 L)", icon: Droplet },
    { title: "Media Strata", sub: "Gravel, Sand & Pebbles", icon: Layers },
    { title: "Radial Infiltration", sub: `${inputs.soilInfiltrationRate} mm/h Soil Flux`, icon: Waves },
    { title: "Surcharge Bypass", sub: "Overflow to City Drain", icon: AlertTriangle },
  ];

  return (
    <div className="flex flex-col gap-8">
      
      {/* Hydraulic Mechanism Flow Strip */}
      <div>
        <p className="font-sans text-[10px] tracking-widest uppercase text-graphite font-bold mb-6 border-b border-graphite/20 pb-2">
          Hydraulic Mechanism & Water Routing Chain
        </p>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 relative my-2">
          {MECHANISM_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-3 border border-graphite/10 bg-white/50 rounded-xs"
              >
                <div className="w-9 h-9 rounded-full border border-graphite/20 flex items-center justify-center bg-paper mb-2">
                  <Icon size={16} strokeWidth={1.5} className="text-graphite" />
                </div>
                <span className="font-sans text-[10px] uppercase font-bold tracking-wider text-graphite">
                  {step.title}
                </span>
                <span className="font-sans text-[8.5px] text-muted-grey mt-0.5 leading-tight">
                  {step.sub}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Time-Series Chart */}
      <div className="border-hand p-6 md:p-8 bg-paper/70 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <p className="font-sans text-[10px] tracking-widest uppercase text-muted-grey font-bold">
              Dynamic Hydraulic Evolution
            </p>
            <h4 className="font-serif text-xl text-graphite">
              Cumulative Volume vs Elapsed Time ({inputs.rainfallDuration} hr storm)
            </h4>
          </div>

          {/* Minimal Chart Legend */}
          <div className="flex flex-wrap items-center gap-4 text-[10px] font-sans">
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-0.5 bg-graphite/40" />
              <span className="text-muted-grey">Runoff Inflow</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-0.5 bg-accent-blue" />
              <span className="text-accent-blue font-bold">Pore Stored</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-0.5 bg-accent-green" />
              <span className="text-accent-green font-bold">Soil Infiltrated</span>
            </div>
            {results.totalOverflowLiters > 0 && (
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-0.5 bg-accent-rust" />
                <span className="text-accent-rust font-bold">Overflow</span>
              </div>
            )}
          </div>
        </div>

        {/* SVG Time-Series Canvas */}
        <div className="relative h-56 w-full border-l border-b border-graphite/25 mt-4 pt-2 pr-2">
          
          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
            <div className="w-full border-b border-graphite border-dashed" />
            <div className="w-full border-b border-graphite border-dashed" />
            <div className="w-full border-b border-graphite border-dashed" />
            <div className="w-full border-b border-graphite" />
          </div>

          <svg
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            {/* Runoff Inflow Curve (dashed grey) */}
            <motion.polyline
              points={runoffPoints}
              fill="none"
              stroke="rgba(43, 43, 43, 0.35)"
              strokeWidth="1.2"
              strokeDasharray="2 1"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: smoothEase }}
            />

            {/* Infiltrated Water Curve (Sage Green) */}
            <motion.polyline
              points={infiltratedPoints}
              fill="none"
              stroke="#7a8b75"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, delay: 0.1, ease: smoothEase }}
            />

            {/* Stored Water in Media Curve (Slate Blue) */}
            <motion.polyline
              points={storedPoints}
              fill="none"
              stroke="#6d8ba6"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, delay: 0.2, ease: smoothEase }}
            />

            {/* Overflow Curve (Rust) */}
            {results.totalOverflowLiters > 0 && (
              <motion.polyline
                points={overflowPoints}
                fill="none"
                stroke="#a75d50"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.8, delay: 0.3, ease: smoothEase }}
              />
            )}
          </svg>

          {/* Max Capacity Guide Line */}
          <div
            className="absolute left-0 right-0 border-t border-accent-blue/40 border-dotted pointer-events-none flex justify-end pr-2"
            style={{
              top: `${Math.max(0, Math.min(100, 100 - (pitStorage.totalSystemStorageLiters / maxY) * 100))}%`
            }}
          >
            <span className="font-sans text-[8.5px] uppercase tracking-wider text-accent-blue/70 -mt-3.5 bg-paper/90 px-1">
              Max System Media Capacity ({pitStorage.totalSystemStorageLiters.toLocaleString()} L)
            </span>
          </div>

        </div>

        {/* X-Axis labels */}
        <div className="flex justify-between items-center font-sans text-[9px] text-muted-grey mt-2 px-1">
          <span>0.0 hr (Start of Rain)</span>
          <span>{((inputs.rainfallDuration) / 2).toFixed(1)} hr</span>
          <span>{inputs.rainfallDuration.toFixed(1)} hr (Storm End)</span>
        </div>

      </div>

    </div>
  );
}

