export interface SolutionDetail {
  slug: string;
  title: string;
  category: "offering" | "solution-type";
  heroImage: string;
  tagline: string;
  description: string;
  benefits: string[];
  idealFor: string;
}

export const solutionDetails: Record<string, SolutionDetail> = {
  homes: {
    slug: "homes",
    title: "Homes",
    category: "offering",
    heroImage: "/images/solutions/homes-hero.svg",
    tagline: "Save up to 90% on your home electricity bills.",
    description:
      "Residential rooftop solar is the fastest way to take control of your electricity bills. We design a system sized to your household's real consumption, manage the entire subsidy process, and install it in as little as a day.",
    benefits: [
      "Cut your monthly electricity bill by up to 90%",
      "Eligible for central + Uttar Pradesh state subsidy",
      "Free 3D rooftop design before you commit to anything",
      "5-year free maintenance, 25-year system lifespan",
    ],
    idealFor: "Independent houses, villas, and bungalows looking to cut household electricity costs.",
  },
  rooftop: {
    slug: "rooftop",
    title: "Rooftop Solar",
    category: "offering",
    heroImage: "/images/solutions/rooftop-hero.svg",
    tagline: "Turn unused roof space into a 25-year power plant.",
    description:
      "Rooftop solar is the foundation of everything we do at Prakhar. We design every system around your roof's orientation, shading, and sanctioned load to maximise generation — then handle the entire installation and subsidy process end-to-end.",
    benefits: [
      "Free rooftop survey and 3D design before you commit",
      "WindPro Mount structure tested for 170 kmph storms",
      "Installation completed in a single day",
      "5-year free maintenance included",
    ],
    idealFor: "Independent houses, bungalows, and villas with usable rooftop area.",
  },
  "on-grid": {
    slug: "on-grid",
    title: "On-Grid Solar",
    category: "solution-type",
    heroImage: "/images/solutions/on-grid-hero.svg",
    tagline: "The most affordable way to cut your electricity bill.",
    description:
      "On-grid (grid-tied) systems stay connected to the public electricity grid. Excess power you generate is exported to the grid and credited via net metering, while you draw from the grid when your panels aren't producing enough — at night, for example.",
    benefits: [
      "Lowest upfront cost of any solar system type",
      "Eligible for full central + state subsidy under PM Surya Ghar",
      "Net metering credits excess generation against your bill",
      "No battery required, lower maintenance",
    ],
    idealFor: "Homes and businesses with reliable grid power that mainly want to cut bills.",
  },
  "off-grid": {
    slug: "off-grid",
    title: "Off-Grid Solar",
    category: "solution-type",
    heroImage: "/images/solutions/off-grid-hero.svg",
    tagline: "Complete independence from the grid, powered by batteries.",
    description:
      "Off-grid systems store generated power in batteries for use anytime, including during outages, and don't rely on the public grid at all. They're ideal for locations with unreliable grid access or for customers who want full energy independence.",
    benefits: [
      "Works during grid outages and load-shedding",
      "No dependency on grid stability",
      "Scalable battery storage based on your needs",
      "Ideal for remote properties and farmhouses",
    ],
    idealFor: "Remote properties, farmhouses, and areas with unreliable grid supply.",
  },
  hybrid: {
    slug: "hybrid",
    title: "Hybrid Solar",
    category: "solution-type",
    heroImage: "/images/solutions/hybrid-hero.svg",
    tagline: "The best of both grid-tied and battery backup systems.",
    description:
      "Hybrid systems combine the cost-efficiency of grid-tied solar with battery backup for essential loads. You get net metering credits during the day and seamless backup power during outages — without oversizing your battery bank.",
    benefits: [
      "Net metering savings plus battery backup for outages",
      "Smart switching between grid, solar, and battery",
      "Protects essential appliances during power cuts",
      "Future-proof — add more battery capacity later",
    ],
    idealFor: "Homes and businesses in areas with frequent but short power outages.",
  },
  commercial: {
    slug: "commercial",
    title: "Commercial Solar",
    category: "offering",
    heroImage: "/images/solutions/commercial-hero.svg",
    tagline: "Power your business with green energy and save on costs.",
    description:
      "From small offices to large manufacturing units, commercial solar can offset a significant share of operating costs. We handle load analysis, structural engineering for larger arrays, and compliance with commercial net-metering regulations.",
    benefits: [
      "Significant reduction in operational electricity costs",
      "Accelerated depreciation benefits for businesses",
      "Custom-engineered for factory roofs, warehouses, and office buildings",
      "Dedicated account manager for ongoing maintenance",
    ],
    idealFor: "Offices, factories, warehouses, schools, and other commercial establishments.",
  },
  "housing-societies": {
    slug: "housing-societies",
    title: "Housing Societies",
    category: "offering",
    heroImage: "/images/solutions/housing-societies-hero.svg",
    tagline: "Reduce common-area power costs and add long-term value.",
    description:
      "Housing societies spend significantly on common-area electricity — lifts, lighting, pumps, and security systems. A society-scale solar installation cuts these recurring costs and adds long-term asset value for every resident.",
    benefits: [
      "Reduces common-area maintenance charges for all residents",
      "Single installation serves the entire society's shared load",
      "We manage RWA approvals and documentation",
      "Increases overall property value",
    ],
    idealFor: "Apartment complexes and gated communities with shared common-area loads.",
  },
};

export const solutionSlugs = Object.keys(solutionDetails);
