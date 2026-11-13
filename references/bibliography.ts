export interface ReferenceItem {
  id: string;
  citationNumber: string;
  title: string;
  authors: string;
  year: string;
  source: string;
  doiOrUrl: string;
  category: string;
  relevance: string;
  tags: string[];
}

export const REFERENCES_DATABASE: ReferenceItem[] = [
  {
    id: "ref-01",
    citationNumber: "01",
    title: "A feasibility analysis into urban road runoff harvesting in the planned township of New Town, West Bengal, India",
    authors: "Mitra, D. & Banerji, S.",
    year: "2022",
    source: "Hydrological Sciences Journal, 67(8), 1272–1286",
    doiOrUrl: "https://doi.org/10.1080/02626667.2022.2079417",
    category: "Primary Road Runoff Research",
    relevance: "Primary foundational reference for DHARA. Discusses urban road runoff harvesting feasibility, New Town's specific subsurface clay-silt lithology, runoff coefficients, water retention storage, and infiltration constraints in eastern peri-urban Kolkata.",
    tags: ["Road Runoff", "New Town Kolkata", "Infiltration Feasibility", "Urban Hydrology"]
  },
  {
    id: "ref-02",
    citationNumber: "02",
    title: "Simulation and investigation into the pluvial effect on peri-urban unsewered drainage basin of Kolkata due to rapid urbanization",
    authors: "Murmu, S. K. & Mardi, M.",
    year: "2023",
    source: "Environmental Monitoring and Assessment, 195, 654",
    doiOrUrl: "https://doi.org/10.1007/s10661-023-11315-5",
    category: "Urban Flooding & Drainage",
    relevance: "Provides the hydro-meteorological baseline for Kolkata's pluvial waterlogging vulnerability. Evaluates the impact of rapid surface impermeabilization and drainage basin saturation during high-intensity monsoonal precipitation events.",
    tags: ["Pluvial Flooding", "Peri-Urban Drainage", "Kolkata Monsoons", "Hydrological Simulation"]
  },
  {
    id: "ref-03",
    citationNumber: "03",
    title: "Ground Water Scenario of Kolkata City, Ground Water Year 2019–2020",
    authors: "Central Ground Water Board (CGWB)",
    year: "2020",
    source: "Ministry of Jal Shakti, Government of India Technical Report",
    doiOrUrl: "https://cgwb.gov.in/cgwbpnm/public/uploads/documents/1687775190683807351file.pdf",
    category: "Hydrogeology & Aquifer Dynamics",
    relevance: "Details Kolkata's multi-layered alluvial aquifer architecture, confining clay aquitards, piezometric depression cones in south-central zones, and geotechnical limitations regarding artificial recharge and subsurface percolation.",
    tags: ["Kolkata Aquifer", "Lithology", "Piezometric Levels", "CGWB"]
  },
  {
    id: "ref-04",
    citationNumber: "04",
    title: "Ground Water Resource Assessment of West Bengal — 2024",
    authors: "Central Ground Water Board (CGWB)",
    year: "2024",
    source: "State Assessment Report, CGWB Eastern Region, Kolkata",
    doiOrUrl: "https://www.cgwb.gov.in/cgwbpnm/public/uploads/documents/1743585231968141554file.pdf",
    category: "Regional Groundwater Assessment",
    relevance: "Quantifies regional extractable groundwater resources, seasonal stage of extraction across Kolkata and adjacent South/North 24 Parganas districts, and the imperative for decentralized urban stormwater conservation.",
    tags: ["Resource Assessment", "West Bengal", "Aquifer Recharge", "Water Balance"]
  },
  {
    id: "ref-05",
    citationNumber: "05",
    title: "Ground Water Level Bulletin — West Bengal, January 2025",
    authors: "Central Ground Water Board (CGWB)",
    year: "2025",
    source: "CGWB Ministry of Jal Shakti Regional Bulletin",
    doiOrUrl: "https://gwdata.cgwb.gov.in/download/Bulletin/West%20Bengal_GW%20Level%20bulletin_Jan2025.pdf",
    category: "Groundwater Monitoring",
    relevance: "Provides empirical depth-to-water-table data and post-monsoon aquifer replenishment trends in the lower Gangetic delta plain, informing the unsaturated zone thickness required above the seasonal high water table.",
    tags: ["Water Table Bulletin", "Gangetic Delta", "Depth Monitoring", "Seasonal Trends"]
  },
  {
    id: "ref-06",
    citationNumber: "06",
    title: "Urban Drainage Design Manual — Hydraulic Engineering Circular No. 22, Fourth Edition",
    authors: "Federal Highway Administration (FHWA)",
    year: "2024",
    source: "U.S. Department of Transportation, Publication No. FHWA-HIF-24-006",
    doiOrUrl: "https://www.fhwa.dot.gov/engineering/hydraulics/pubs/hif24006.pdf",
    category: "Stormwater Engineering Manual",
    relevance: "Provides the engineering methodology for Rational Method runoff estimation (Q = C·I·A), roadside curb-inlet hydraulic capture efficiency, infiltration basin design, aggregate void ratios, and overflow weir sizing.",
    tags: ["HEC-22", "Rational Method", "Inlet Design", "Stormwater Hydraulics"]
  }
];

