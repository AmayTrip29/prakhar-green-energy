// Single source of truth for all business information.
// Pulled directly and exactly from the Prakhar Green Energy Solutions
// preview site. If anything about the business changes (phone, email,
// cities served, etc.), update ONLY this file — every page reads from here.

export const siteConfig = {
  name: "Prakhar Green Energy Solutions",
  shortName: "Prakhar",
  tagline: "Power Smarter. Live Greener.",
  description:
    "Prakhar Green Energy Solutions designs and installs solar panel systems for homes, housing societies and businesses. We are committed to driving the Har Ghar Solar mission, one rooftop at a time.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.prakhargreenenergy.com",
  phone: "+917007629710",
  phoneDisplay: "(+91) 7007629710",
  email: "info.prakhargreenenergy@gmail.com",
  address: {
    locality: "Lucknow",
    pincode: "226022",
    region: "Uttar Pradesh",
    country: "India",
  },
  social: {
    facebook: "https://facebook.com/prakhargreenenergy",
    instagram: "https://instagram.com/prakhargreenenergy",
    linkedin: "https://linkedin.com/company/prakhargreenenergy",
    youtube: "https://youtube.com/@prakhargreenenergy",
  },
  hashtags: [
    "#PrakharGreenEnergy",
    "#SolarIndia",
    "#GoSolar",
    "#RenewableEnergy",
    "#Lucknow",
  ],
  rating: {
    value: 4.8,
    count: 500,
    platform: "Google",
  },
  stats: {
    homesSolarized: "8,500+",
    powerInstalledMw: "42 MW",
    subsidyDeliveredCr: "18 Cr+",
    co2AvoidedTons: "65,000+",
    citiesCount: "25+",
    statesCount: 9,
  },
  offerings: [
    {
      slug: "rooftop",
      label: "Rooftop",
      icon: "Home",
    },
    {
      slug: "on-grid",
      label: "On-Grid",
      icon: "Zap",
    },
    {
      slug: "off-grid",
      label: "Off-Grid",
      icon: "BatteryFull",
    },
    {
      slug: "hybrid",
      label: "Hybrid",
      icon: "Repeat",
    },
    {
      slug: "commercial",
      label: "Commercial",
      icon: "Building2",
    },
  ],
  solutions: [
    {
      slug: "homes",
      title: "Homes",
      shortDescription: "Save up to 90% on your home electricity bills.",
      image: "/images/solutions/homes.svg",
    },
    {
      slug: "housing-societies",
      title: "Housing Societies",
      shortDescription:
        "Reduce common-area power costs and add long-term value.",
      image: "/images/solutions/housing-societies.svg",
    },
    {
      slug: "commercial",
      title: "Commercial",
      shortDescription: "Power your business with green energy and save on costs.",
      image: "/images/solutions/commercial.svg",
    },
  ],
  whyChooseUs: [
    {
      icon: "ShieldCheck",
      title: "Guaranteed Savings",
      description:
        "India's only solar company that offers a Savings Guarantee with a money-back promise.",
    },
    {
      icon: "Sparkles",
      title: "Hassle-free Process",
      description:
        "Installation, subsidy and service — all handled directly by us. Zero middlemen.",
    },
    {
      icon: "Wind",
      title: "Storm-proof Structure",
      description:
        "WindPro Mount tested for 170 kmph storms — built for India's toughest weather.",
    },
    {
      icon: "Wrench",
      title: "Reliable After-sales",
      description:
        "Regular proactive maintenance for steady, year-after-year performance.",
    },
  ],
  prakharShield: {
    name: "PrakharShield",
    eyebrow: "Introducing",
    headline: "India's only Guaranteed Solar Savings Plan",
    description:
      "A money-back promise that protects every unit you generate, year after year.",
    moneyBackRate: 8, // ₹ per unit
    benefits: [
      {
        icon: "ShieldCheck",
        title: "Money-back promise at ₹8/unit",
      },
      {
        icon: "CalendarCheck",
        title: "Regular Proactive maintenance visits",
      },
      {
        icon: "Wrench",
        title: "₹0 Repair & Replacement Cost",
      },
      {
        icon: "Smartphone",
        title: "App to track real-time power generation",
      },
    ],
  },
  howItWorks: [
    {
      step: 1,
      title: "Free Home Visit & Rooftop Survey",
      description:
        "Our team measures your rooftop to design a solar system for maximum generation.",
    },
    {
      step: 2,
      title: "Free 3D Solar Design",
      description:
        "We share a personalised 3D rooftop solar design so you can see how it will look on your home.",
    },
    {
      step: 3,
      title: "Hassle-Free Installation & Subsidy",
      description:
        "Our experts install your solar system and handle all paperwork including the subsidy.",
    },
    {
      step: 4,
      title: "Solar On. You Save. We Maintain.",
      description:
        "Your system starts saving from day one, while we handle maintenance year after year.",
    },
  ],
  monitoringApp: {
    eyebrow: "Real-Time Monitoring App",
    headline: "Track your solar, anywhere, anytime.",
    description:
      "Monitor the performance of your Solar System on the go — from generation to savings and referral rewards.",
    features: [
      "Track your power generation",
      "Get 100% visibility on your savings",
      "Track your referrals & rewards on the go",
      "Full transparency on promised vs. actual generation",
    ],
  },
  faqs: [
    {
      question: "What is Prakhar Green Energy Solutions?",
      answer:
        "Prakhar Green Energy Solutions designs and installs solar panel systems for homes, housing societies and businesses. We are committed to driving the Har Ghar Solar mission, one rooftop at a time.",
    },
    {
      question: "What is a solar rooftop system?",
      answer:
        "A solar rooftop system converts sunlight into usable electricity using solar panels, an inverter, mounting structures, cables and connectors installed on your rooftop.",
    },
    {
      question: "Why should I switch to solar?",
      answer:
        "If you are dealing with high electricity bills, solar is your best way to bring them down, reduce dependency on the grid and shrink your carbon footprint.",
    },
    {
      question: "How much can I actually save with solar?",
      answer:
        "Most homeowners cut their electricity bills by 80–90% from Day 1. And with rising tariffs, your savings only keep growing every year.",
    },
    {
      question: "Do I need to pay a huge amount upfront?",
      answer:
        "No. With flexible EMIs starting low, you can go solar without any initial investment. The government subsidy pays for your down payment and bill savings often cover the EMI.",
    },
    {
      question: "How complicated is the solar subsidy process?",
      answer:
        "We manage the entire subsidy paperwork for you. You won't have to lift a finger.",
    },
    {
      question: "How long does it take to set up the solar system?",
      answer:
        "Once we have visited your home and you've approved the 3D rooftop solar design, the installation is done in 1 day based on availability, space and weather conditions.",
    },
    {
      question: "What is the lifespan of a rooftop solar system?",
      answer:
        "A high-quality rooftop solar system lasts 25 years or more. With our 5-year free maintenance, your system stays in top shape throughout its life.",
    },
    {
      question: "Are there any subsidies provided by the government?",
      answer:
        "Yes. For residential rooftop solar projects, the central government offers ₹30,000/kW up to 2kW and ₹78,000 for systems above 3kW. UP residents get an additional state subsidy.",
    },
    {
      question: "Do solar panels generate electricity during monsoon and winter?",
      answer:
        "Yes, solar panels do produce electricity in cloudy or rainy weather albeit with reduced efficiency.",
    },
  ],
  testimonials: [
    {
      customerName: "Mahendra Thakre",
      city: "Lucknow",
      quote: "Electricity Bills down from ₹4,000 to ₹300!",
      isCustomerStory: true,
      billBefore: 4000,
      billAfter: 300,
    },
    {
      customerName: "Santosh Singh",
      city: "Lucknow",
      quote:
        "My solar journey with Prakhar Solar has been smooth and satisfying. Bills dropped from ₹18,000 to ₹0! Timely cleaning ensures 50–55 units generated daily.",
      billBefore: 18000,
      billAfter: 0,
    },
    {
      customerName: "Dr. Sudhakar Shukla",
      city: "Kanpur",
      quote:
        "From consultation to installation, everything was smooth! My plant generates 22–24 units daily, and I've seen a 70% drop in electricity bills.",
    },
    {
      customerName: "Samir Patil",
      city: "Pune",
      quote:
        "Prakhar Solar truly impressed me. The installation was clean, damage-free, and looked better than others. Overall, a smooth and satisfying experience.",
    },
  ],
  pressMentions: [
    {
      publication: "Forbes",
      date: "12 Dec, 2024",
      headline:
        "How Prakhar Green Energy Solutions is shaping India's home energy future",
    },
    {
      publication: "Economic Times",
      date: "08 Nov, 2024",
      headline: "Cleantech firm Prakhar Solar expands operations to 9 states",
    },
    {
      publication: "Business Today",
      date: "20 Oct, 2024",
      headline: "Prakhar Solar crosses 8,500 home rooftop installations",
    },
  ],
  citiesServed: [
    {
      state: "Uttar Pradesh",
      cities: ["Lucknow", "Kanpur", "Varanasi", "Agra", "Noida", "Ghaziabad"],
    },
    { state: "Rajasthan", cities: ["Jaipur", "Ajmer", "Udaipur"] },
    { state: "Madhya Pradesh", cities: ["Bhopal", "Indore", "Gwalior"] },
    { state: "Maharashtra", cities: ["Mumbai", "Pune", "Nagpur"] },
  ],
  footerLinks: {
    solutions: [
      { label: "Rooftop Solar", href: "/solutions/rooftop" },
      { label: "On-Grid Solar", href: "/solutions/on-grid" },
      { label: "Off-Grid Solar", href: "/solutions/off-grid" },
      { label: "Hybrid Solar", href: "/solutions/hybrid" },
      { label: "Commercial Solar", href: "/solutions/commercial" },
      { label: "Housing Societies", href: "/solutions/housing-societies" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Solar Calculator", href: "/#calculator" },
      { label: "FAQs", href: "/faq" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
