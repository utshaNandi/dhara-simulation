import { SimulationInputs } from "@/simulation/types";

export interface ScenarioPreset {
  id: string;
  name: string;
  tagline: string;
  description: string;
  inputs: SimulationInputs;
}

export const SCENARIO_PRESETS: ScenarioPreset[] = [
  {
    id: "default-design",
    name: "Design Baseline",
    tagline: "Standard Kolkata Pre-Feasibility Scenario",
    description: "Standard design storm of 30 mm/h over a 100 m² roadside catchment served by 5 modular DHARA pits in typical alluvial silt-loam.",
    inputs: {
      catchmentArea: 100,
      rainfallIntensity: 30,
      runoffCoefficient: 0.90,
      numPits: 5,
      pitLength: 1.0,
      pitWidth: 1.0,
      pitDepth: 2.0,
      soilInfiltrationRate: 5.0,
      rainfallDuration: 1.0,
    }
  },
  {
    id: "monsoon-downpour",
    name: "Monsoon Downpour",
    tagline: "Sustained Monsoon Inflow (2 Hours)",
    description: "A prolonged tropical downpour typical of the southwest monsoon season in Kolkata, testing dynamic media storage accumulation.",
    inputs: {
      catchmentArea: 100,
      rainfallIntensity: 45,
      runoffCoefficient: 0.90,
      numPits: 5,
      pitLength: 1.0,
      pitWidth: 1.0,
      pitDepth: 2.0,
      soilInfiltrationRate: 5.0,
      rainfallDuration: 2.0,
    }
  },
  {
    id: "cloudburst-stress",
    name: "Cloudburst Stress Test",
    tagline: "Extreme Pluvial Event (75 mm/h)",
    description: "High-intensity short-duration cloudburst exceeding local storage capacity, activating high-level overflow discharge into municipal stormwater sewers.",
    inputs: {
      catchmentArea: 150,
      rainfallIntensity: 75,
      runoffCoefficient: 0.90,
      numPits: 5,
      pitLength: 1.0,
      pitWidth: 1.0,
      pitDepth: 2.0,
      soilInfiltrationRate: 5.0,
      rainfallDuration: 1.0,
    }
  },
  {
    id: "clay-restricted",
    name: "Eastern Kolkata Clay",
    tagline: "Restricted Infiltration Rate (2 mm/h)",
    description: "Simulating heavy alluvial silty-clay strata characteristic of eastern and southern peri-urban Kolkata with limited percolation capacity.",
    inputs: {
      catchmentArea: 100,
      rainfallIntensity: 30,
      runoffCoefficient: 0.90,
      numPits: 5,
      pitLength: 1.0,
      pitWidth: 1.0,
      pitDepth: 2.0,
      soilInfiltrationRate: 2.0,
      rainfallDuration: 1.5,
    }
  },
  {
    id: "expanded-system",
    name: "Expanded 8-Pit Node",
    tagline: "Larger Road Corridor Catchment",
    description: "An extended installation along a major arterial road corridor (200 m² catchment) with 8 interconnected DHARA infiltration pits.",
    inputs: {
      catchmentArea: 200,
      rainfallIntensity: 35,
      runoffCoefficient: 0.90,
      numPits: 8,
      pitLength: 1.0,
      pitWidth: 1.0,
      pitDepth: 2.0,
      soilInfiltrationRate: 6.0,
      rainfallDuration: 1.0,
    }
  }
];

