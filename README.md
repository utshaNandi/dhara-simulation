# DHARA — Decentralised Rainwater Infiltration System for Kolkata

**DHARA** is an engineering simulation and hydrological pre-feasibility model for a proposed modular roadside rainwater harvesting, mechanical strata filtration, and soil infiltration system tailored for Kolkata, West Bengal, India.

---

## 1. Project Overview & Identity

Rapid urban surface impermeabilization and heavy monsoonal precipitation frequently overwhelm Kolkata's low-gradient, tidal-locked municipal drainage network. DHARA proposes a modular, roadside decentralised intervention designed to:
- **Reduce surface water accumulation** and local street waterlogging along roadway gutters.
- **Relieve peak hydraulic surcharges** on municipal trunk drains and pumping stations.
- **Encourage diffuse radial and downward subgrade infiltration** where alluvial geotechnical conditions permit.
- **Provide a modular, scalable, and low-cost intervention** for arterial and peri-urban roadway corridors.

> **Status:** Conceptual engineering model. Requires site-specific field validation, infiltration testing, and sediment clean-out scheduling before municipal deployment.

---

## 2. Directory Architecture

```text
dhara-simulation/
├── app/
│   ├── globals.css              # Design tokens, grid background, hand borders
│   ├── layout.tsx               # Root layout, Google fonts (Lora, Inter, Caveat), top navigation
│   ├── page.tsx                 # Main application view (Hero, Schematic, Sandbox, Limitations)
│   └── references/
│       └── page.tsx             # Dedicated full-text Research & References archive
├── components/
│   ├── CrossSectionDiagram.tsx  # Architectural SVG cross-section with interactive layer inspector
│   ├── DharaSimulation.tsx      # Main sandbox controller (Setup, Physical Animation, Results)
│   ├── ModelAssumptions.tsx     # Scientific rigour & geotechnical boundaries section
│   ├── Navbar.tsx               # Minimal scientific sticky navigation bar
│   ├── ReferencesSection.tsx    # Citations grid matching Salmonella field-note cards
│   ├── ResultsComparison.tsx    # "WITHOUT DHARA | WITH DHARA" comparative analysis
│   └── WaterBalanceFlow.tsx     # Mechanism flow chain & dynamic time-series SVG line chart
├── simulation/
│   ├── engine.ts                # Dynamic time-stepping water balance engine (Q = C·I·A, void storage)
│   └── types.ts                 # TypeScript interfaces for inputs, results, strata, and time points
├── references/
│   └── bibliography.ts          # 6 foundational literature sources with DOI links and relevance
├── data/
│   ├── constants.ts             # Default parameters, filter layer strata specifications, input limits
│   └── presets.ts               # Pre-configured Kolkata storm scenarios (Design baseline, Monsoon, Cloudburst, Clay)
├── styles/
│   └── tokens.ts                # Color palette and motion tokens mirroring the Salmonella design family
├── assets/                      # Technical diagrams and vector resources
├── package.json                 # Shared Next.js 16 / React 19 / Tailwind 4 / Framer Motion config
├── tsconfig.json                # TypeScript configuration with `@/*` root path alias
├── next.config.ts               # Next.js configuration
└── README.md                    # Project documentation
```

---

## 3. Engineering Model & Mathematical Formulations

### A. Runoff Generation
Calculated via the Rational Method:
$$V_r = A \times \frac{R}{1000} \times C$$
- $A$ = Catchment area in $\text{m}^2$ (Default: $100\text{ m}^2$)
- $R$ = Rainfall intensity in $\text{mm/hour}$ (Default: $30\text{ mm/hour}$)
- $C$ = Runoff coefficient (Default: $0.90$ for impervious roadway asphalt)
- **Default Output:** $100 \times 0.030 \times 0.90 = 2.7\text{ m}^3\text{/hour} = \mathbf{2,700\text{ Litres/hour}}$.

### B. Usable Media Aggregate Pore Storage
Gross excavation volume ($L \times W \times D = 1\text{m} \times 1\text{m} \times 2\text{m} = 2.0\text{ m}^3 = 2,000\text{ L}$ per pit) does **not** equal usable water storage. Usable storage is governed by media void fractions:

| Stratum Layer | Thickness | Assumed Void Fraction | Storage / Pit |
|---|---:|---:|---:|
| **Water Collection Zone** | 0.25 m | 100% | 250.0 L |
| **Filtration Plate** | 0.05 m | 0% (structural) | 0.0 L |
| **Graded Gravel Layer** | 0.50 m | 35% | 175.0 L |
| **Coarse River Sand** | 0.75 m | 35% | 262.5 L |
| **Pebble / Ballast Base** | 0.45 m | 40% | 180.0 L |
| **Total per Pit** | **2.00 m** | — | **867.5 L (~868 L)** |
| **Combined 5 Pits** | — | — | **4,337.5 L (~4,338 L)** |

*Note: Stated as theoretical estimates based on clean aggregate packing. Real-world compaction and sediment clogging reduce available void volume over operating lifespans.*

### C. Soil Contact Area & Subgrade Infiltration
Each modular pit has 4 unlined vertical sides and 1 unlined base:
$$A_s = 2(L \times D) + 2(W \times D) + (L \times W) = 4(1 \times 2) + (1 \times 1) = \mathbf{9\text{ m}^2\text{ per pit}}$$
For $N = 5$ modular pits:
$$A_{s,total} = 5 \times 9 = \mathbf{45\text{ m}^2}$$

Infiltration capacity is computed as:
$$Q_i = f \times A_{s,total}$$
At the default design assumption of $f = 5\text{ mm/hour}$:
$$Q_i = 5 \times 45 = \mathbf{225\text{ Litres/hour}}$$

### D. Dynamic Time-Step Conservation of Mass
The model discretizes rainfall duration into small time intervals ($\Delta t$), rigorously preserving mass balance:
$$\text{Incoming Runoff} = \text{Infiltrated Water} + \Delta\text{Stored Water} + \text{Overflow}$$
If cumulative storage reaches max media capacity ($4,338\text{ L}$), excess water discharges through the high-level overflow weir into municipal drainage, preventing surface back-flooding.

---

## 4. UI Design System — Adaptation of the Salmonella Style

DHARA adopts the scientific notebook aesthetic established by the Salmonella project:
- **Typography:** Lora (warm academic serif) paired with Inter (technical tracking-widest sans) and Caveat (handwritten field-note annotations).
- **Background:** Warm ivory paper (`#f9f7f1`) with a subtle 24px fixed orthogonal grid.
- **Borders & Dividers:** Subtle organic hand-drawn borders (`.border-hand`), dividers (`.divider-sketch`), and hover link underlines (`.link-underline`).
- **Color Palette:** Muted slate blue (`#6d8ba6`, hydrologic flow), sage green (`#7a8b75`, ecological infiltration), charcoal/graphite (`#2b2b2b`, typography), and rust terracotta (`#a75d50`, alerts & overflow).
- **Simulation Flow:** Three clean stages — *Setup Sandbox* $\to$ *Live Physical Water Routing Animation* $\to$ *Comprehensive Mass-Balance Results*.

---

## 5. Foundational Research References

1. **Mitra, D. & Banerji, S. (2022).** *A feasibility analysis into urban road runoff harvesting in the planned township of New Town, West Bengal, India.* Hydrological Sciences Journal, 67(8), 1272–1286. [DOI: 10.1080/02626667.2022.2079417](https://doi.org/10.1080/02626667.2022.2079417)
2. **Murmu, S. K. & Mardi, M. (2023).** *Simulation and investigation into the pluvial effect on peri-urban unsewered drainage basin of Kolkata due to rapid urbanization.* Environmental Monitoring and Assessment, 195, 654. [DOI: 10.1007/s10661-023-11315-5](https://doi.org/10.1007/s10661-023-11315-5)
3. **Central Ground Water Board (2020).** *Ground Water Scenario of Kolkata City, Ground Water Year 2019–2020.* Ministry of Jal Shakti. [Report PDF](https://cgwb.gov.in/cgwbpnm/public/uploads/documents/1687775190683807351file.pdf)
4. **Central Ground Water Board (2024).** *Ground Water Resource Assessment of West Bengal — 2024.* CGWB Eastern Region. [Report PDF](https://www.cgwb.gov.in/cgwbpnm/public/uploads/documents/1743585231968141554file.pdf)
5. **Central Ground Water Board (2025).** *Ground Water Level Bulletin — West Bengal, January 2025.* CGWB. [Bulletin PDF](https://gwdata.cgwb.gov.in/download/Bulletin/West%20Bengal_GW%20Level%20bulletin_Jan2025.pdf)
6. **Federal Highway Administration (2024).** *Urban Drainage Design Manual — Hydraulic Engineering Circular No. 22, Fourth Edition.* Publication No. FHWA-HIF-24-006. [Manual PDF](https://www.fhwa.dot.gov/engineering/hydraulics/pubs/hif24006.pdf)

---

## 6. How to Run

Dependencies are shared via node_modules junction to minimize footprint:

```bash
# Navigate to the DHARA project directory
cd dhara-simulation

# Start development server on port 3001 (leaving port 3000 free for Salmonella)
npm run dev

# Or build for production
npm run build
npm run start
```

Visit `http://localhost:3001` in your browser.

