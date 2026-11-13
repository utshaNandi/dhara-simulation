export interface SimulationInputs {
  catchmentArea: number;          // m² (default 100)
  rainfallIntensity: number;      // mm/hour (default 30)
  runoffCoefficient: number;      // dimensionless, 0 - 1 (default 0.90)
  numPits: number;                // integer count (default 5)
  pitLength: number;              // m (default 1)
  pitWidth: number;               // m (default 1)
  pitDepth: number;               // m (default 2)
  soilInfiltrationRate: number;   // mm/hour (default 5)
  rainfallDuration: number;       // hours (default 1)
}

export interface LayerSpecification {
  id: string;
  name: string;
  thickness: number;     // meters
  voidFraction: number;  // 0.0 to 1.0 (e.g. 0.35 = 35%)
  storagePerPitLiters: number;
  description: string;
  materialColor: string;
}

export interface PitStorageBreakdown {
  collectionZoneLiters: number;
  filtrationPlateLiters: number;
  gravelLiters: number;
  coarseSandLiters: number;
  pebblesLiters: number;
  storagePerPitLiters: number;
  totalSystemStorageLiters: number;
  grossVolumePerPitLiters: number;
  totalGrossVolumeLiters: number;
  soilContactAreaPerPitM2: number;
  totalSoilContactAreaM2: number;
  maxInfiltrationRateLitersPerHour: number;
}

export interface TimeStepPoint {
  timeHours: number;              // elapsed time in hours
  rainfallIntensityMmHr: number;  // rainfall intensity at this step
  runoffInflowRateLitersHr: number;// instantaneous runoff rate
  cumulativeRunoffLiters: number; // total runoff generated so far
  cumulativeInfiltratedLiters: number; // total water percolated into soil
  currentStoredLiters: number;    // water currently filling the media pore space
  cumulativeOverflowLiters: number; // water bypassing to municipal drain
  storageFillPercent: number;     // current storage / max capacity %
}

export interface SimulationResults {
  inputs: SimulationInputs;
  pitStorage: PitStorageBreakdown;
  layers: LayerSpecification[];
  
  // Aggregate totals
  totalRunoffLiters: number;
  totalInfiltratedLiters: number;
  totalStoredLiters: number;
  totalOverflowLiters: number;
  remainingStorageCapacityLiters: number;
  drainageReductionPercent: number; // % runoff diverted from municipal drains
  
  // Dynamic balance check
  dynamicWaterBalanceCheck: boolean; // |Runoff - (Infiltrated + Stored + Overflow)| < 0.05
  waterBalanceErrorLiters: number;
  
  // Time-series array for plotting
  timeSeries: TimeStepPoint[];
}

