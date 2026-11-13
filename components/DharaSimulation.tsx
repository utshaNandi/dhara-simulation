"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Droplets, 
  CloudRain, 
  ChevronRight, 
  RotateCcw, 
  Sliders, 
  Layers, 
  Waves, 
  ArrowRight, 
  AlertTriangle, 
  ShieldCheck,
  Check,
  Zap
} from "lucide-react";
import { SimulationInputs, SimulationResults } from "@/simulation/types";
import { DEFAULT_SIMULATION_INPUTS, INPUT_LIMITS } from "@/data/constants";
import { SCENARIO_PRESETS } from "@/data/presets";
import { runDynamicSimulation } from "@/simulation/engine";
import ResultsComparison from "./ResultsComparison";
import WaterBalanceFlow from "./WaterBalanceFlow";

const smoothEase = [0.22, 1, 0.36, 1] as const;

export default function DharaSimulation() {
  const [inputs, setInputs] = useState<SimulationInputs>(DEFAULT_SIMULATION_INPUTS);
  const [selectedPreset, setSelectedPreset] = useState<string>("default-design");
  
  // Simulation workflow stages: 'setup' | 'simulating' | 'results'
  const [step, setStep] = useState<"setup" | "simulating" | "results">("setup");
  const [simPhase, setSimPhase] = useState<number>(0);

  // Pre-calculate results based on current inputs
  const currentResults = useMemo(() => {
    return runDynamicSimulation(inputs);
  }, [inputs]);

  // Handle preset application
  const applyPreset = (presetId: string) => {
    const found = SCENARIO_PRESETS.find((p) => p.id === presetId);
    if (found) {
      setInputs({ ...found.inputs });
      setSelectedPreset(presetId);
    }
  };

  // Run simulation workflow sequence
  const startSimulation = () => {
    setStep("simulating");
    setSimPhase(0);

    // Dynamic sequence timing matching user specification:
    // 1. Rain falling on road (0.0s - 1.2s)
    // 2. Runoff flows to inlet (1.2s - 2.4s)
    // 3. Water enters collection chamber (2.4s - 3.6s)
    // 4. Passes through filtration layers (3.6s - 5.0s)
    // 5. Infiltration into soil & overflow check (5.0s - 6.5s)
    // 6. Final results view (6.8s)
    const t1 = setTimeout(() => setSimPhase(1), 1300);
    const t2 = setTimeout(() => setSimPhase(2), 2600);
    const t3 = setTimeout(() => setSimPhase(3), 3900);
    const t4 = setTimeout(() => setSimPhase(4), 5200);
    const t5 = setTimeout(() => setStep("results"), 6700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  };

  const handleInputChange = (field: keyof SimulationInputs, value: number) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
    setSelectedPreset(""); // Deselect preset once custom values are entered
  };

  return (
    <section id="simulation" className="px-4 md:px-6 py-12 md:py-24 max-w-5xl mx-auto w-full relative z-10">
      
      {/* Header */}
      <div className="mb-10 md:mb-14">
        <span className="font-sans text-[10px] tracking-widest uppercase text-accent-blue block mb-2 font-bold border-b border-accent-blue/20 w-fit pb-1">
          Hydrological Sandbox // Mathematical Model
        </span>
        <h2 className="text-[clamp(2rem,5vw,2.75rem)] font-serif leading-tight text-graphite mb-3">
          DHARA Dynamic Simulation
        </h2>
        <p className="font-serif text-charcoal/80 max-w-2xl leading-relaxed text-sm md:text-base">
          Evaluate runoff capture, media aggregate storage, and soil infiltration under Kolkata precipitation scenarios.
        </p>
      </div>

      <AnimatePresence mode="wait">
        
        {/* ========================================================
            STAGE 1: SETUP
            ======================================================== */}
        {step === "setup" && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: smoothEase }}
            className="flex flex-col gap-10"
          >
            {/* 1A. Scenario Presets Selector */}
            <div className="border-hand p-6 bg-paper/60 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4 border-b border-graphite/10 pb-2">
                <span className="font-sans text-[10px] tracking-widest uppercase text-muted-grey font-bold flex items-center gap-1.5">
                  <Zap size={12} className="text-accent-amber" /> Select Pre-Configured Scenario
                </span>
                <span className="font-hand text-sm text-accent-rust">
                  Kolkata hydrological benchmarks
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {SCENARIO_PRESETS.map((preset) => {
                  const isSelected = selectedPreset === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => applyPreset(preset.id)}
                      className={`text-left p-3.5 border-hand transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? "bg-graphite text-paper shadow-md scale-[1.01]"
                          : "bg-transparent hover:bg-white/60 text-graphite"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-serif font-bold text-sm leading-tight">
                            {preset.name}
                          </span>
                          {isSelected && <Check size={14} className="text-accent-green" />}
                        </div>
                        <span className={`font-sans text-[9px] uppercase tracking-wider block leading-tight ${isSelected ? "text-paper/70" : "text-muted-grey"}`}>
                          {preset.tagline}
                        </span>
                      </div>
                      <span className={`font-mono text-[9px] mt-3 block ${isSelected ? "text-paper/60" : "text-charcoal/60"}`}>
                        {preset.inputs.rainfallIntensity} mm/h • {preset.inputs.numPits} pits
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 1B. Parameter Controls Card */}
            <div className="border-hand p-6 md:p-10 bg-paper/70 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-8 border-b border-graphite/15 pb-3">
                <div>
                  <span className="font-sans text-[10px] tracking-widest uppercase text-graphite font-bold flex items-center gap-2">
                    <Sliders size={13} /> Hydraulic & Design Variables
                  </span>
                  <span className="font-serif text-xs text-charcoal/70">
                    Adjust parameters to recalculate mass-balance in real time
                  </span>
                </div>
                <button
                  onClick={() => applyPreset("default-design")}
                  className="font-sans text-[10px] uppercase tracking-widest text-muted-grey hover:text-graphite flex items-center gap-1 transition-colors"
                >
                  <RotateCcw size={11} /> Reset Defaults
                </button>
              </div>

              {/* Parameter Inputs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                
                {/* Column 1: Catchment & Storm */}
                <div className="flex flex-col gap-6">
                  <p className="font-sans text-[10px] tracking-widest uppercase text-muted-grey font-bold border-b border-graphite/20 pb-1.5">
                    1. Storm & Catchment
                  </p>

                  {/* Catchment Area */}
                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <label className="font-serif text-sm text-graphite font-medium">Catchment Area (A)</label>
                      <span className="font-mono text-xs font-bold text-graphite">{inputs.catchmentArea} m²</span>
                    </div>
                    <input
                      type="range"
                      min={INPUT_LIMITS.catchmentArea.min}
                      max={INPUT_LIMITS.catchmentArea.max}
                      step={INPUT_LIMITS.catchmentArea.step}
                      value={inputs.catchmentArea}
                      onChange={(e) => handleInputChange("catchmentArea", Number(e.target.value))}
                      className="w-full accent-graphite cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] font-sans text-muted-grey mt-0.5">
                      <span>20 m²</span>
                      <span>Default: 100 m²</span>
                      <span>1000 m²</span>
                    </div>
                  </div>

                  {/* Rainfall Intensity */}
                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <label className="font-serif text-sm text-graphite font-medium">Rainfall Intensity (R)</label>
                      <span className="font-mono text-xs font-bold text-graphite">{inputs.rainfallIntensity} mm/h</span>
                    </div>
                    <input
                      type="range"
                      min={INPUT_LIMITS.rainfallIntensity.min}
                      max={INPUT_LIMITS.rainfallIntensity.max}
                      step={INPUT_LIMITS.rainfallIntensity.step}
                      value={inputs.rainfallIntensity}
                      onChange={(e) => handleInputChange("rainfallIntensity", Number(e.target.value))}
                      className="w-full accent-graphite cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] font-sans text-muted-grey mt-0.5">
                      <span>5 mm/h (Drizzle)</span>
                      <span>30 (Standard)</span>
                      <span>120 (Cloudburst)</span>
                    </div>
                  </div>

                  {/* Runoff Coefficient */}
                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <label className="font-serif text-sm text-graphite font-medium">Runoff Coefficient (C)</label>
                      <span className="font-mono text-xs font-bold text-graphite">{inputs.runoffCoefficient.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min={INPUT_LIMITS.runoffCoefficient.min}
                      max={INPUT_LIMITS.runoffCoefficient.max}
                      step={INPUT_LIMITS.runoffCoefficient.step}
                      value={inputs.runoffCoefficient}
                      onChange={(e) => handleInputChange("runoffCoefficient", Number(e.target.value))}
                      className="w-full accent-graphite cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] font-sans text-muted-grey mt-0.5">
                      <span>0.30 (Permeable)</span>
                      <span>0.90 (Asphalt)</span>
                      <span>0.95 (Concrete)</span>
                    </div>
                  </div>
                </div>

                {/* Column 2: Modular Pit Sizing */}
                <div className="flex flex-col gap-6">
                  <p className="font-sans text-[10px] tracking-widest uppercase text-muted-grey font-bold border-b border-graphite/20 pb-1.5">
                    2. Modular Pit Dimensions
                  </p>

                  {/* Number of Pits */}
                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <label className="font-serif text-sm text-graphite font-medium">Number of Pits (N)</label>
                      <span className="font-mono text-xs font-bold text-graphite">{inputs.numPits} pits</span>
                    </div>
                    <input
                      type="range"
                      min={INPUT_LIMITS.numPits.min}
                      max={INPUT_LIMITS.numPits.max}
                      step={INPUT_LIMITS.numPits.step}
                      value={inputs.numPits}
                      onChange={(e) => handleInputChange("numPits", Number(e.target.value))}
                      className="w-full accent-graphite cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] font-sans text-muted-grey mt-0.5">
                      <span>1 pit</span>
                      <span>Default: 5</span>
                      <span>20 pits</span>
                    </div>
                  </div>

                  {/* Pit Dimensions (L x W) */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex justify-between items-baseline mb-1">
                        <label className="font-serif text-xs text-graphite font-medium">Length (L)</label>
                        <span className="font-mono text-xs font-bold text-graphite">{inputs.pitLength} m</span>
                      </div>
                      <input
                        type="range"
                        min={INPUT_LIMITS.pitLength.min}
                        max={INPUT_LIMITS.pitLength.max}
                        step={INPUT_LIMITS.pitLength.step}
                        value={inputs.pitLength}
                        onChange={(e) => handleInputChange("pitLength", Number(e.target.value))}
                        className="w-full accent-graphite cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-baseline mb-1">
                        <label className="font-serif text-xs text-graphite font-medium">Width (W)</label>
                        <span className="font-mono text-xs font-bold text-graphite">{inputs.pitWidth} m</span>
                      </div>
                      <input
                        type="range"
                        min={INPUT_LIMITS.pitWidth.min}
                        max={INPUT_LIMITS.pitWidth.max}
                        step={INPUT_LIMITS.pitWidth.step}
                        value={inputs.pitWidth}
                        onChange={(e) => handleInputChange("pitWidth", Number(e.target.value))}
                        className="w-full accent-graphite cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Pit Depth */}
                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <label className="font-serif text-sm text-graphite font-medium">Pit Depth (D)</label>
                      <span className="font-mono text-xs font-bold text-graphite">{inputs.pitDepth.toFixed(1)} m</span>
                    </div>
                    <input
                      type="range"
                      min={INPUT_LIMITS.pitDepth.min}
                      max={INPUT_LIMITS.pitDepth.max}
                      step={INPUT_LIMITS.pitDepth.step}
                      value={inputs.pitDepth}
                      onChange={(e) => handleInputChange("pitDepth", Number(e.target.value))}
                      className="w-full accent-graphite cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] font-sans text-muted-grey mt-0.5">
                      <span>1.0 m</span>
                      <span>Default: 2.0 m</span>
                      <span>4.0 m</span>
                    </div>
                  </div>
                </div>

                {/* Column 3: Soil & Duration */}
                <div className="flex flex-col gap-6">
                  <p className="font-sans text-[10px] tracking-widest uppercase text-muted-grey font-bold border-b border-graphite/20 pb-1.5">
                    3. Geotechnical & Duration
                  </p>

                  {/* Soil Infiltration Rate */}
                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <label className="font-serif text-sm text-graphite font-medium">Soil Infiltration Rate (f)</label>
                      <span className="font-mono text-xs font-bold text-graphite">{inputs.soilInfiltrationRate} mm/h</span>
                    </div>
                    <input
                      type="range"
                      min={INPUT_LIMITS.soilInfiltrationRate.min}
                      max={INPUT_LIMITS.soilInfiltrationRate.max}
                      step={INPUT_LIMITS.soilInfiltrationRate.step}
                      value={inputs.soilInfiltrationRate}
                      onChange={(e) => handleInputChange("soilInfiltrationRate", Number(e.target.value))}
                      className="w-full accent-graphite cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] font-sans text-muted-grey mt-0.5">
                      <span>1 mm/h (Heavy clay)</span>
                      <span>5 (Loam)</span>
                      <span>50 (Sand)</span>
                    </div>
                  </div>

                  {/* Rainfall Duration */}
                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <label className="font-serif text-sm text-graphite font-medium">Storm Duration (T)</label>
                      <span className="font-mono text-xs font-bold text-graphite">{inputs.rainfallDuration} hour{inputs.rainfallDuration > 1 ? "s" : ""}</span>
                    </div>
                    <input
                      type="range"
                      min={INPUT_LIMITS.rainfallDuration.min}
                      max={INPUT_LIMITS.rainfallDuration.max}
                      step={INPUT_LIMITS.rainfallDuration.step}
                      value={inputs.rainfallDuration}
                      onChange={(e) => handleInputChange("rainfallDuration", Number(e.target.value))}
                      className="w-full accent-graphite cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] font-sans text-muted-grey mt-0.5">
                      <span>0.5 hr</span>
                      <span>Default: 1.0 hr</span>
                      <span>12.0 hrs</span>
                    </div>
                  </div>

                  {/* Live Engineering Calculation Summary Badge */}
                  <div className="mt-2 p-3 bg-white/60 border border-graphite/15 rounded-xs font-sans text-[11px] flex flex-col gap-1.5">
                    <div className="flex justify-between">
                      <span className="text-muted-grey">Runoff Generation:</span>
                      <span className="font-mono font-bold text-graphite">
                        {Math.round(inputs.catchmentArea * inputs.rainfallIntensity * inputs.runoffCoefficient).toLocaleString()} L/h
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-grey">Usable Pit Media Storage:</span>
                      <span className="font-mono font-bold text-accent-blue">
                        {Math.round(currentResults.pitStorage.totalSystemStorageLiters).toLocaleString()} L
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-grey">Soil Contact Area ({inputs.numPits} pits):</span>
                      <span className="font-mono font-bold text-accent-green">
                        {currentResults.pitStorage.totalSoilContactAreaM2} m²
                      </span>
                    </div>
                  </div>

                </div>

              </div>

              {/* Run Simulation Button */}
              <div className="flex flex-col items-center justify-center mt-12 pt-8 border-t border-graphite/15">
                <button
                  onClick={startSimulation}
                  className="group relative px-12 py-4 border-hand bg-graphite text-paper overflow-hidden transition-transform duration-300 hover:scale-[1.02] active:scale-95 flex items-center gap-3 shadow-md"
                >
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="font-sans text-xs tracking-widest uppercase font-bold relative z-10">
                    Run Simulation
                  </span>
                  <ChevronRight className="relative z-10" size={16} />
                </button>
                <span className="font-hand text-xs text-muted-grey mt-2">
                  * Triggers physical water-balance routing through road, grate, media & soil
                </span>
              </div>

            </div>
          </motion.div>
        )}

        {/* ========================================================
            STAGE 2: SIMULATING (PHYSICAL ANIMATION)
            ======================================================== */}
        {step === "simulating" && (
          <motion.div
            key="simulating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="border-hand p-8 md:p-14 bg-graphite text-paper flex flex-col items-center justify-center min-h-[460px] relative overflow-hidden"
          >
            {/* Animated background concentric rings adapted from Salmonella */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="absolute inset-0 pointer-events-none flex justify-center items-center opacity-10"
            >
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border border-paper border-dashed" />
              <div className="absolute w-96 h-96 md:w-[480px] md:h-[480px] rounded-full border border-paper border-dotted" />
            </motion.div>

            {/* Skip button in top-right */}
            <button
              onClick={() => setStep("results")}
              className="absolute top-4 right-4 text-[10px] uppercase tracking-widest text-paper/50 hover:text-paper font-sans transition-colors z-20"
            >
              Skip Animation →
            </button>

            {/* Sequence Phases */}
            <AnimatePresence mode="wait">
              {simPhase === 0 && (
                <motion.div
                  key="v0"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center text-center relative z-10 max-w-md"
                >
                  <CloudRain size={36} strokeWidth={1.2} className="text-paper mb-4 animate-pulse" />
                  <p className="font-sans text-[10px] tracking-widest uppercase text-paper/60 mb-2">Phase I // Precipitation</p>
                  <h3 className="text-2xl font-serif text-paper tracking-wide mb-2">Rainfall on Roadway</h3>
                  <p className="font-serif text-sm text-paper/70 leading-relaxed">
                    Storm intensity of <span className="text-paper font-bold">{inputs.rainfallIntensity} mm/h</span> strikes the {inputs.catchmentArea} m² road surface (C = {inputs.runoffCoefficient}).
                  </p>
                  <span className="font-mono text-xs text-accent-blue mt-3">
                    Runoff generated: ~{Math.round(inputs.catchmentArea * inputs.rainfallIntensity * inputs.runoffCoefficient)} L/h
                  </span>
                </motion.div>
              )}

              {simPhase === 1 && (
                <motion.div
                  key="v1"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center text-center relative z-10 max-w-md"
                >
                  <Droplets size={36} strokeWidth={1.2} className="text-accent-blue mb-4" />
                  <p className="font-sans text-[10px] tracking-widest uppercase text-paper/60 mb-2">Phase II // Surface Inflow</p>
                  <h3 className="text-2xl font-serif text-paper tracking-wide mb-2">Flow Towards DHARA Inlet</h3>
                  <p className="font-serif text-sm text-paper/70 leading-relaxed">
                    Roadside slope conveys sheet runoff toward curb-line cast iron grates, trapping debris while directing fluid into underground modules.
                  </p>
                  <span className="font-mono text-xs text-accent-blue mt-3">
                    Inlet capture rate: 100% designed capacity
                  </span>
                </motion.div>
              )}

              {simPhase === 2 && (
                <motion.div
                  key="v2"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center text-center relative z-10 max-w-md"
                >
                  <Layers size={36} strokeWidth={1.2} className="text-paper mb-4" />
                  <p className="font-sans text-[10px] tracking-widest uppercase text-paper/60 mb-2">Phase III // Settling & Chamber</p>
                  <h3 className="text-2xl font-serif text-paper tracking-wide mb-2">Water Enters Collection Zone</h3>
                  <p className="font-serif text-sm text-paper/70 leading-relaxed">
                    Runoff fills upper 0.25 m collection buffer (250 L per pit). Coarse silts settle prior to contacting the perforated filtration plate.
                  </p>
                  <span className="font-mono text-xs text-accent-blue mt-3">
                    Collection volume: {250 * inputs.numPits} Litres total
                  </span>
                </motion.div>
              )}

              {simPhase === 3 && (
                <motion.div
                  key="v3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center text-center relative z-10 max-w-md"
                >
                  <Waves size={36} strokeWidth={1.2} className="text-accent-amber mb-4" />
                  <p className="font-sans text-[10px] tracking-widest uppercase text-paper/60 mb-2">Phase IV // Strata Filtration</p>
                  <h3 className="text-2xl font-serif text-paper tracking-wide mb-2">Filtration & Media Pore Storage</h3>
                  <p className="font-serif text-sm text-paper/70 leading-relaxed">
                    Gravity draws water through gravel (0.5m), coarse sand (0.75m), and bottom pebbles (0.45m), filling interstitial pores.
                  </p>
                  <span className="font-mono text-xs text-accent-amber mt-3">
                    Total media pore capacity: {Math.round(currentResults.pitStorage.totalSystemStorageLiters).toLocaleString()} Litres
                  </span>
                </motion.div>
              )}

              {simPhase === 4 && (
                <motion.div
                  key="v4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center text-center relative z-10 max-w-md"
                >
                  <ShieldCheck size={36} strokeWidth={1.2} className="text-accent-green mb-4" />
                  <p className="font-sans text-[10px] tracking-widest uppercase text-paper/60 mb-2">Phase V // Infiltration & Balance</p>
                  <h3 className="text-2xl font-serif text-paper tracking-wide mb-2">Soil Percolation & Overflow</h3>
                  <p className="font-serif text-sm text-paper/70 leading-relaxed">
                    Water percolates radially and downward into surrounding subgrade at {inputs.soilInfiltrationRate} mm/h across {currentResults.pitStorage.totalSoilContactAreaM2} m² contact area.
                  </p>
                  <span className="font-mono text-xs text-accent-green mt-3">
                    {currentResults.totalOverflowLiters > 0 
                      ? `Storage exceeded: ${currentResults.totalOverflowLiters} L safely bypassing to municipal drain`
                      : "Zero overflow: 100% runoff detained & infiltrated"}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dynamic Progress Line matching Salmonella */}
            <div className="absolute bottom-10 w-64 h-px bg-paper/20 overflow-hidden">
              <motion.div
                className="h-full bg-paper"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 6.7, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}

        {/* ========================================================
            STAGE 3: RESULTS
            ======================================================== */}
        {step === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: smoothEase }}
            className="flex flex-col gap-12"
          >
            {/* Top Summary & Reset Bar */}
            <div className="border-hand p-6 md:p-8 bg-paper/70 flex flex-col md:flex-row md:items-end justify-between gap-6 backdrop-blur-sm">
              <div>
                <p className="font-sans text-[10px] tracking-widest uppercase text-muted-grey mb-2 font-bold flex items-center gap-2">
                  <ShieldCheck size={13} className="text-accent-green" /> Simulation Complete // Mass Balance Reconciled
                </p>
                <h3 className="text-2xl md:text-3xl font-serif text-graphite leading-none">
                  {selectedPreset ? SCENARIO_PRESETS.find(p => p.id === selectedPreset)?.name : "Custom Hydraulic Scenario"}
                </h3>
                <p className="font-serif text-charcoal/70 mt-2 text-sm">
                  {inputs.catchmentArea} m² Catchment • {inputs.rainfallIntensity} mm/h Storm • {inputs.rainfallDuration} hr • {inputs.numPits} Modular Pits ({inputs.pitLength}×{inputs.pitWidth}×{inputs.pitDepth} m)
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setStep("setup")}
                  className="font-sans text-[11px] uppercase tracking-widest px-4 py-2 border-hand bg-white hover:bg-paper text-graphite transition-all flex items-center gap-2"
                >
                  <Sliders size={12} /> Modify Parameters
                </button>
                <button
                  onClick={startSimulation}
                  className="font-sans text-[11px] uppercase tracking-widest px-4 py-2 border-hand bg-graphite text-paper hover:bg-charcoal transition-all flex items-center gap-2"
                >
                  <RotateCcw size={12} /> Re-Run
                </button>
              </div>
            </div>

            {/* Core Results & Without vs With DHARA Comparison */}
            <ResultsComparison results={currentResults} />

            {/* Dynamic Water Balance & Time-Series Chart */}
            <WaterBalanceFlow results={currentResults} />

            {/* Key Engineering Observations Adapted from Salmonella Field Notes */}
            <div>
              <p className="font-sans text-[10px] tracking-widest uppercase text-graphite font-bold mb-6 border-b border-graphite/20 pb-2">
                Hydrological Observations & Engineering Insights
              </p>
              
              <div className="flex flex-col gap-6">
                
                {/* Observation 01 */}
                <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-start">
                  <div className="shrink-0 mt-1 flex flex-col gap-1 w-44">
                    <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-graphite/60">
                      01 — Drainage Relief
                    </span>
                    <span className="inline-block px-1.5 py-0.5 border border-graphite/20 text-[7px] tracking-widest uppercase text-accent-green font-bold rounded-xs w-fit">
                      MASS BALANCE
                    </span>
                  </div>
                  <p className="font-serif text-charcoal/90 text-[14px] leading-relaxed">
                    Under this scenario, DHARA captured <span className="font-bold text-graphite">{currentResults.drainageReductionPercent}%</span> of total roadside runoff ({((currentResults.totalStoredLiters + currentResults.totalInfiltratedLiters)).toLocaleString()} L of {currentResults.totalRunoffLiters.toLocaleString()} L generated), significantly reducing instantaneous pluvial ponding on the carriage surface.
                  </p>
                </div>

                {/* Observation 02 */}
                <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-start">
                  <div className="shrink-0 mt-1 flex flex-col gap-1 w-44">
                    <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-graphite/60">
                      02 — Media Void Utilization
                    </span>
                    <span className="inline-block px-1.5 py-0.5 border border-graphite/20 text-[7px] tracking-widest uppercase text-accent-blue font-bold rounded-xs w-fit">
                      PORE STORAGE
                    </span>
                  </div>
                  <p className="font-serif text-charcoal/90 text-[14px] leading-relaxed">
                    The stratified media configuration (gravel, coarse sand, and pebbles) detained <span className="font-bold text-graphite">{currentResults.totalStoredLiters.toLocaleString()} L</span> in interstitial pores ({Math.round((currentResults.totalStoredLiters / currentResults.pitStorage.totalSystemStorageLiters) * 100)}% of theoretical aggregate capacity of {currentResults.pitStorage.totalSystemStorageLiters.toLocaleString()} L).
                  </p>
                </div>

                {/* Observation 03 */}
                <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-start">
                  <div className="shrink-0 mt-1 flex flex-col gap-1 w-44">
                    <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-graphite/60">
                      03 — Subgrade Infiltration
                    </span>
                    <span className="inline-block px-1.5 py-0.5 border border-graphite/20 text-[7px] tracking-widest uppercase text-accent-amber font-bold rounded-xs w-fit">
                      GEOTECHNICAL
                    </span>
                  </div>
                  <p className="font-serif text-charcoal/90 text-[14px] leading-relaxed">
                    With an exposed unlined contact area of {currentResults.pitStorage.totalSoilContactAreaM2} m² across {inputs.numPits} pits, continuous soil percolation accounted for <span className="font-bold text-graphite">{currentResults.totalInfiltratedLiters.toLocaleString()} L</span> over {inputs.rainfallDuration} hr. Actual site percolation must be verified using in-situ double-ring infiltrometer testing in Kolkata alluvial silt.
                  </p>
                </div>

                {/* Observation 04 (if overflow occurred) */}
                {currentResults.totalOverflowLiters > 0 && (
                  <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-start">
                    <div className="shrink-0 mt-1 flex flex-col gap-1 w-44">
                      <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-accent-rust">
                        04 — Overflow Bypass
                      </span>
                      <span className="inline-block px-1.5 py-0.5 border border-accent-rust/30 text-[7px] tracking-widest uppercase text-accent-rust font-bold rounded-xs w-fit">
                        SAFETY HYDRAULICS
                      </span>
                    </div>
                    <p className="font-serif text-charcoal/90 text-[14px] leading-relaxed">
                      Because precipitation volume exceeded combined aggregate pore storage and soil percolation capacity, the high-level crest overflow safely routed <span className="font-bold text-graphite">{currentResults.totalOverflowLiters.toLocaleString()} L</span> to the municipal drain, preventing localized surface back-flooding.
                    </p>
                  </div>
                )}

              </div>
            </div>

            {/* Reference Citation Footnote */}
            <div className="mt-4 pt-6 border-t border-graphite/10 text-center flex flex-col items-center">
              <span className="font-sans text-[9px] uppercase tracking-widest text-muted-grey">
                Methodology based on FHWA HEC-22 (2024) [06] & Mitra & Banerji (2022) [01]
              </span>
            </div>

          </motion.div>
        )}

      </AnimatePresence>

    </section>
  );
}

