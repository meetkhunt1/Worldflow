/* ------------------------------------------------------------------ *
 * Career openings — single source of truth for the /career board and
 * the /career/[slug] detail + apply pages. Add or edit jobs here.
 * ------------------------------------------------------------------ */

export type Job = {
  slug: string;
  title: string;
  summary: string;
  qualification: string;
  vacancies: number;
  experience: string;
  /** Bold "Key Requirements" lines on the detail page. */
  keyRequirements: string[];
  /** "Job Responsibilities" lines on the detail page. */
  responsibilities: string[];
  location?: string;
};

export const JOBS: Job[] = [
  {
    slug: "production-manager-extrusion",
    title: "Production Manager – Extrusion",
    summary:
      "Hands-on experience running UPVC / CPVC extrusion lines, with strong planning and team-handling skills.",
    qualification:
      "BE / Diploma in Mechanical, Polymer or Plastics Engineering",
    vacancies: 1,
    experience: "Minimum 8+ Years of Experience Required",
    keyRequirements: [
      "Proven track record managing multi-line extrusion production",
      "Strong knowledge of UPVC / CPVC processing parameters",
      "Production planning, manpower handling and shift management",
      "Exposure to ISI / ISO documentation and audits",
    ],
    responsibilities: [
      "Planning and monitoring daily production across extrusion lines.",
      "Optimising line output, rejection rates and material consumption.",
      "Coordinating with quality, maintenance and dispatch teams.",
      "Driving continuous improvement on the shop floor.",
    ],
    location:
      "Only local candidates from Rajkot or nearby areas will be considered.",
  },
  {
    slug: "qa-qc-engineer",
    title: "QA / QC Engineer",
    summary:
      "Must have proven experience in quality systems for pipes & fittings manufacturing (ISI / ISO standards).",
    qualification:
      "BE / B.Tech / Diploma in Mechanical or Polymer Engineering",
    vacancies: 2,
    experience: "Minimum 5+ Years of Experience Required",
    keyRequirements: [
      "Working knowledge of IS 4985 / IS 15778 and related standards",
      "Internal audit exposure under ISO 9001",
      "Customer complaint handling and NC closure",
      "8D, CAPA and root-cause problem solving",
    ],
    responsibilities: [
      "Managing and maintaining the Quality Management System (QMS).",
      "Conducting internal audits and ensuring compliance with standards.",
      "Overseeing in-process and final quality assurance for every batch.",
      "Driving continuous improvement and root cause analysis.",
    ],
  },
  {
    slug: "quality-inspector",
    title: "Quality Inspector",
    summary:
      "Experience in in-process and final inspection of pipes and fittings.",
    qualification:
      "ITI / Diploma / BE in Mechanical Engineering or relevant field",
    vacancies: 4,
    experience: "Minimum 1+ Years of Experience Required",
    keyRequirements: [
      "Hands-on with measuring instruments (vernier, micrometer, gauges)",
      "Understanding of dimensional tolerances and visual defects",
      "Basic documentation and inspection-report skills",
    ],
    responsibilities: [
      "Carrying out in-process inspection on running extrusion lines.",
      "Performing final inspection and hydrostatic test verification.",
      "Recording inspection results and flagging deviations immediately.",
    ],
  },
  {
    slug: "extrusion-machine-operator",
    title: "Extrusion Machine Operator",
    summary: "Experience operating UPVC / HDPE extrusion machines preferred.",
    qualification: "ITI / Diploma in Mechanical Engineering or relevant trade",
    vacancies: 6,
    experience: "Minimum 2+ Years of Experience Required",
    keyRequirements: [
      "Machine start-up, changeover and shutdown experience",
      "Ability to hold dimensional tolerances during the run",
      "Willingness to work in rotational shifts",
    ],
    responsibilities: [
      "Operating extrusion lines to the set process parameters.",
      "Monitoring output quality and adjusting settings within limits.",
      "Keeping the machine area clean, safe and audit-ready.",
    ],
  },
  {
    slug: "maintenance-engineer",
    title: "Maintenance Engineer (Electrical / Mechanical)",
    summary:
      "Strong knowledge of extrusion plant machinery and utility maintenance.",
    qualification:
      "Diploma / BE in Mechanical or Electrical Engineering, or ITI with relevant experience",
    vacancies: 3,
    experience: "Minimum 2+ Years of Experience Required",
    keyRequirements: [
      "Breakdown and preventive maintenance of extrusion machinery",
      "Knowledge of gearboxes, heaters, drives and control panels",
      "Utility maintenance — compressors, chillers, cooling towers",
    ],
    responsibilities: [
      "Attending breakdowns and minimising machine downtime.",
      "Executing the preventive maintenance schedule.",
      "Maintaining spare inventory and maintenance records.",
    ],
  },
  {
    slug: "sales-executive-dealer-network",
    title: "Sales Executive – Dealer Network",
    summary:
      "Build and support the dealer & distributor network across the region.",
    qualification: "Any Graduate; MBA in Marketing preferred",
    vacancies: 5,
    experience: "Minimum 2+ Years of Experience Required",
    keyRequirements: [
      "Field sales experience in pipes, building materials or hardware",
      "Existing dealer / distributor relationships preferred",
      "Two-wheeler and willingness to travel within the territory",
    ],
    responsibilities: [
      "Appointing and servicing dealers and distributors.",
      "Achieving monthly primary and secondary sales targets.",
      "Tracking market feedback and competitor activity.",
    ],
  },
  {
    slug: "dispatch-logistics-supervisor",
    title: "Dispatch & Logistics Supervisor",
    summary:
      "Plan loading, manage stock, and keep every order dispatched on time.",
    qualification: "Any Graduate",
    vacancies: 2,
    experience: "Minimum 1+ Years of Experience Required",
    keyRequirements: [
      "Experience with loading planning and vehicle coordination",
      "Basic computer skills — stock registers, dispatch notes",
      "Ability to manage loading manpower",
    ],
    responsibilities: [
      "Planning daily dispatches against pending orders.",
      "Maintaining finished-goods stock accuracy.",
      "Coordinating transporters and ensuring on-time delivery.",
    ],
  },
];

export const getJob = (slug: string) => JOBS.find((j) => j.slug === slug);
