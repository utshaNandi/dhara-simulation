// Design tokens for DHARA simulation, mirroring and adapting the Salmonella UI
export const TOKENS = {
  colors: {
    paper: '#f9f7f1',
    paperLight: '#ffffff',
    paperCard: 'rgba(249, 247, 241, 0.75)',
    graphite: '#2b2b2b',
    charcoal: '#4a4a4a',
    mutedGrey: '#888888',
    borderMuted: 'rgba(43, 43, 43, 0.15)',
    borderSubtle: 'rgba(43, 43, 43, 0.08)',
    accentBlue: '#6d8ba6',    // Water, hydrologic flow
    accentGreen: '#7a8b75',   // Ecological infiltration, soil
    accentRust: '#a75d50',    // Warnings, overflow, field notes
    accentAmber: '#c99355',   // Sand, gravel, strata
  },
  animation: {
    smoothEase: [0.22, 1, 0.36, 1] as const,
  }
};

