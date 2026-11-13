import { 
  SimulationInputs, 
  SimulationResults, 
  PitStorageBreakdown, 
  LayerSpecification, 
  TimeStepPoint 
} from "./types";
import { FILTER_LAYERS_CONFIG } from "@/data/constants";

/**
 * Calculates theoretical usable pit storage based on individual filter layer void fractions.
 */
export function calculatePitStorage(inputs: SimulationInputs): {
  breakdown: PitStorageBreakdown;
  layers: LayerSpecification[];
} {
  const { numPits, pitLength, pitWidth, pitDepth, soilInfiltrationRate } = inputs;
  const planAreaM2 = pitLength * pitWidth;
  const grossVolumePerPitLiters = planAreaM2 * pitDepth * 1000;
  const totalGrossVolumeLiters = grossVolumePerPitLiters * numPits;

  // Scale layer thicknesses if pit depth is customized away from 2.0 m
  const depthScaleRatio = pitDepth / 2.0;

  let totalPerPitStorage = 0;
  let collectionZoneLiters = 0;
  let filtrationPlateLiters = 0;
  let gravelLiters = 0;
  let coarseSandLiters = 0;
  let pebblesLiters = 0;

  const layers: LayerSpecification[] = FILTER_LAYERS_CONFIG.map((cfg) => {
    const scaledThickness = cfg.thickness * depthScaleRatio;
    const storageLiters = planAreaM2 * scaledThickness * cfg.voidFraction * 1000;
    
    totalPerPitStorage += storageLiters;

    if (cfg.id === "collection-zone") collectionZoneLiters = storageLiters;
    else if (cfg.id === "filtration-plate") filtrationPlateLiters = storageLiters;
    else if (cfg.id === "gravel") gravelLiters = storageLiters;
    else if (cfg.id === "coarse-sand") coarseSandLiters = storageLiters;
    else if (cfg.id === "pebbles") pebblesLiters = storageLiters;

    return {
      id: cfg.id,
      name: cfg.name,
      thickness: scaledThickness,
      voidFraction: cfg.voidFraction,
      storagePerPitLiters: storageLiters,
      description: cfg.description,
      materialColor: cfg.materialColor
    };
  });

  // Exposed soil contact area: 4 vertical walls + 1 base
  // As = 2*(L*D) + 2*(W*D) + (L*W)
  const soilContactAreaPerPitM2 = (2 * pitLength * pitDepth) + (2 * pitWidth * pitDepth) + planAreaM2;
  const totalSoilContactAreaM2 = soilContactAreaPerPitM2 * numPits;

  // Qi = f * As (1 mm/h * 1 m² = 1 L/h)
  const maxInfiltrationRateLitersPerHour = soilInfiltrationRate * totalSoilContactAreaM2;

  const breakdown: PitStorageBreakdown = {
    collectionZoneLiters,
    filtrationPlateLiters,
    gravelLiters,
    coarseSandLiters,
    pebblesLiters,
    storagePerPitLiters: totalPerPitStorage,
    totalSystemStorageLiters: totalPerPitStorage * numPits,
    grossVolumePerPitLiters,
    totalGrossVolumeLiters,
    soilContactAreaPerPitM2,
    totalSoilContactAreaM2,
    maxInfiltrationRateLitersPerHour,
  };

  return { breakdown, layers };
}

/**
 * Executes dynamic time-step simulation enforcing conservation of mass:
 * Incoming Runoff = Infiltrated Water + Change in Stored Water + Overflow
 */
export function runDynamicSimulation(inputs: SimulationInputs): SimulationResults {
  const {
    catchmentArea,
    rainfallIntensity,
    runoffCoefficient,
    rainfallDuration,
    soilInfiltrationRate,
  } = inputs;

  const { breakdown, layers } = calculatePitStorage(inputs);
  const totalStorageCapacity = breakdown.totalSystemStorageLiters;
  const maxInfiltrationCapacityLitersHr = breakdown.maxInfiltrationRateLitersPerHour;

  // Runoff rate: Vr = A * (R / 1000) * C (m³/h) -> * 1000 = Litres/hour
  const runoffRateLitersHr = catchmentArea * rainfallIntensity * runoffCoefficient;

  // Time-step simulation setup
  const totalDurationHours = Math.max(0.5, rainfallDuration);
  const numSteps = 60;
  const dtHours = totalDurationHours / numSteps;

  let currentStored = 0; // Starts empty
  let cumulativeRunoff = 0;
  let cumulativeInfiltrated = 0;
  let cumulativeOverflow = 0;

  const timeSeries: TimeStepPoint[] = [];

  // Initial step at t=0
  timeSeries.push({
    timeHours: 0,
    rainfallIntensityMmHr: rainfallIntensity,
    runoffInflowRateLitersHr: runoffRateLitersHr,
    cumulativeRunoffLiters: 0,
    cumulativeInfiltratedLiters: 0,
    currentStoredLiters: 0,
    cumulativeOverflowLiters: 0,
    storageFillPercent: 0,
  });

  for (let i = 1; i <= numSteps; i++) {
    const t = i * dtHours;

    // Inflow occurs during rainfall duration
    const isInflowActive = t <= rainfallDuration + 1e-6;
    const currentInflowRate = isInflowActive ? runoffRateLitersHr : 0;
    const dInflow = currentInflowRate * dtHours;
    cumulativeRunoff += dInflow;

    // Water available for infiltration
    const availableWater = currentStored + dInflow;

    // Potential infiltration in this dt
    const potentialInfiltration = maxInfiltrationCapacityLitersHr * dtHours;
    const actualInfiltration = Math.min(availableWater, potentialInfiltration);
    cumulativeInfiltrated += actualInfiltration;

    // Water remaining to be stored
    const remainingWater = availableWater - actualInfiltration;

    if (remainingWater > totalStorageCapacity) {
      const dOverflow = remainingWater - totalStorageCapacity;
      cumulativeOverflow += dOverflow;
      currentStored = totalStorageCapacity;
    } else {
      currentStored = remainingWater;
    }

    const fillPercent = totalStorageCapacity > 0 ? (currentStored / totalStorageCapacity) * 100 : 0;

    timeSeries.push({
      timeHours: Number(t.toFixed(2)),
      rainfallIntensityMmHr: isInflowActive ? rainfallIntensity : 0,
      runoffInflowRateLitersHr: currentInflowRate,
      cumulativeRunoffLiters: Math.round(cumulativeRunoff * 10) / 10,
      cumulativeInfiltratedLiters: Math.round(cumulativeInfiltrated * 10) / 10,
      currentStoredLiters: Math.round(currentStored * 10) / 10,
      cumulativeOverflowLiters: Math.round(cumulativeOverflow * 10) / 10,
      storageFillPercent: Math.min(100, Math.round(fillPercent * 10) / 10),
    });
  }

  const remainingStorageCapacity = Math.max(0, totalStorageCapacity - currentStored);

  // Drainage reduction: percentage of runoff diverted from municipal drains
  const drainageReductionPercent = cumulativeRunoff > 0
    ? Math.max(0, Math.min(100, ((cumulativeRunoff - cumulativeOverflow) / cumulativeRunoff) * 100))
    : 100;

  // Water balance consistency check
  const sumComponents = cumulativeInfiltrated + currentStored + cumulativeOverflow;
  const balanceError = Math.abs(cumulativeRunoff - sumComponents);
  const dynamicWaterBalanceCheck = balanceError < 0.1; // Less than 100ml tolerance over entire run

  return {
    inputs,
    pitStorage: breakdown,
    layers,
    totalRunoffLiters: Math.round(cumulativeRunoff),
    totalInfiltratedLiters: Math.round(cumulativeInfiltrated),
    totalStoredLiters: Math.round(currentStored),
    totalOverflowLiters: Math.round(cumulativeOverflow),
    remainingStorageCapacityLiters: Math.round(remainingStorageCapacity),
    drainageReductionPercent: Math.round(drainageReductionPercent * 10) / 10,
    dynamicWaterBalanceCheck,
    waterBalanceErrorLiters: Math.round(balanceError * 1000) / 1000,
    timeSeries,
  };
}

