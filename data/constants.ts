import { SimulationInputs } from "@/simulation/types";

export const DEFAULT_SIMULATION_INPUTS: SimulationInputs = {
  catchmentArea: 100,           // 100 m²
  rainfallIntensity: 30,        // 30 mm/hour
  runoffCoefficient: 0.90,      // 0.90 (impervious urban road/pavement)
  numPits: 5,                   // 5 modular pits
  pitLength: 1.0,               // 1.0 m
  pitWidth: 1.0,                // 1.0 m
  pitDepth: 2.0,                // 2.0 m
  soilInfiltrationRate: 5.0,    // 5.0 mm/hour
  rainfallDuration: 1.0,        // 1.0 hour
};

// Theoretical baseline layer configuration (assumed media void fractions)
export const FILTER_LAYERS_CONFIG = [
  {
    id: "collection-zone",
    name: "Water Collection Zone",
    thickness: 0.25, // meters
    voidFraction: 1.00, // 100%
    description: "Free water entry buffer with sediment settle-out zone beneath the inlet grate.",
    materialColor: "#d2e3fc"
  },
  {
    id: "filtration-plate",
    name: "Filtration Plate",
    thickness: 0.05, // meters
    voidFraction: 0.00, // Not counted in usable storage
    description: "Perforated non-corrosive stainless/composite plate with geotextile mesh to trap trash and large particulates.",
    materialColor: "#4a4a4a"
  },
  {
    id: "gravel",
    name: "Gravel Layer",
    thickness: 0.50, // meters
    voidFraction: 0.35, // 35%
    description: "Clean graded gravel (10–20 mm) providing initial coarse mechanical filtering and structural distribution.",
    materialColor: "#9aa0a6"
  },
  {
    id: "coarse-sand",
    name: "Coarse Sand Layer",
    thickness: 0.75, // meters
    voidFraction: 0.35, // 35%
    description: "Coarse river sand (0.5–2.0 mm) filtering fine suspended silt and particulate matter.",
    materialColor: "#e8c99b"
  },
  {
    id: "pebbles",
    name: "Pebbles (Drainage Base)",
    thickness: 0.45, // meters
    voidFraction: 0.40, // 40%
    description: "Smooth ballast pebbles (20–40 mm) at the base to prevent bed scouring and maximize soil contact area.",
    materialColor: "#b89f82"
  }
];

export const INPUT_LIMITS = {
  catchmentArea: { min: 20, max: 1000, step: 10, unit: "m²" },
  rainfallIntensity: { min: 5, max: 120, step: 5, unit: "mm/h" },
  runoffCoefficient: { min: 0.30, max: 0.95, step: 0.05, unit: "C" },
  numPits: { min: 1, max: 20, step: 1, unit: "pits" },
  pitLength: { min: 0.5, max: 3.0, step: 0.1, unit: "m" },
  pitWidth: { min: 0.5, max: 3.0, step: 0.1, unit: "m" },
  pitDepth: { min: 1.0, max: 4.0, step: 0.1, unit: "m" },
  soilInfiltrationRate: { min: 1.0, max: 50.0, step: 0.5, unit: "mm/h" },
  rainfallDuration: { min: 0.5, max: 12.0, step: 0.5, unit: "hours" }
};

