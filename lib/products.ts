/* ------------------------------------------------------------------ *
 * Product pages — single source of truth for /products/[slug].
 * Each entry drives the hero, feature tabs, dark story band and FAQ
 * accordion on the product detail template.
 * ------------------------------------------------------------------ */

export type ProductTab = {
  label: string;
  /** Orange feature bars shown for this tab (rendered in a 2-col grid). */
  items: string[];
};

export type ProductFaq = { question: string; answer: string };

export type ProductPage = {
  slug: string;
  title: string;
  image: string;
  /** Hero intro paragraphs (rendered in order). */
  intro: string[];
  tabs: ProductTab[];
  /** Dark full-width story band. */
  story: { title: string; paragraphs: string[] };
  faqs: ProductFaq[];
  /**
   * Public path to the product's catalogue PDF. Omit while a catalogue is
   * still being prepared — the hero button then renders disabled with a
   * "Coming soon" tooltip instead of opening the request modal.
   */
  brochure?: string;
};

export const PRODUCT_PAGES: ProductPage[] = [
  {
    slug: "cpvc-plumbing-pipes",
    title: "CPVC Plumbing Pipes",
    image: "/products/cpvc-pipes-fittings.jpg",
    brochure: "/brochures/cpvc-plumbing-pipes.pdf",
    intro: [
      "WorldFlow CPVC Pipes and Fittings are designed to provide efficient, reliable, and long-lasting solutions for hot and cold water applications. Manufactured using advanced Chlorinated Polyvinyl Chloride (CPVC) material, these products are known for their high thermal resistance, durability, and ability to withstand extreme temperatures and pressures. With compliance to Indian and international standards, our CPVC systems are ideal for both residential and commercial plumbing.",
      "Being one of the emerging brands of CPVC pipes & fittings, we never compromise on quality. Every batch of material we use meets ISI standards, so the finished pipe performs exactly as engineered across multiple uses. Our products are available in different sizes, thicknesses, and radii to cater to the varied demands of our customers.",
    ],
    tabs: [
      {
        label: "High Performance",
        items: [
          "Withstands hot water service up to 93°C without deformation",
          "High pressure ratings across SDR 11 and SDR 13.5 classes",
          "Smooth inner bore keeps friction loss to a minimum",
          "Excellent resistance to corrosion, scaling and chemicals",
          "Self-extinguishing material that does not support combustion",
          "Designed for a 50+ year service life under rated conditions",
        ],
      },
      {
        label: "Use of Products",
        items: [
          "Hot & cold water distribution in homes and apartments",
          "Hotels, hospitals and commercial building plumbing",
          "Solar water heater and geyser connections",
          "Industrial process and utility water lines",
          "Swimming pool and clubhouse plumbing",
          "Replacement of old, corroding GI pipelines",
        ],
      },
      {
        label: "Sizes & Range",
        items: [
          "Sizes from ½\" to 2\" (15 mm – 50 mm) as per CTS dimensions",
          "SDR 11 and SDR 13.5 pressure classes",
          "Standard lengths of 3 m and 5 m",
          "Complete fittings range — elbows, tees, couplers, unions",
          "Brass-insert FTA / MTA transition fittings",
          "Matching CPVC solvent cement available",
        ],
      },
      {
        label: "Quality & Standards",
        items: [
          "Manufactured to IS 15778 specifications",
          "ISO 9001:2015 certified production process",
          "Batch-wise hydrostatic pressure testing",
          "Lead-free, potable-water-safe CPVC compound",
          "In-line dimensional monitoring on every run",
          "Full traceability from raw material to dispatch",
        ],
      },
      {
        label: "Safety Tips",
        items: [
          "Use CPVC solvent cement only — never UPVC cement",
          "Cut the pipe square and deburr before jointing",
          "Apply solvent cement evenly to pipe and fitting",
          "Allow full curing time before pressure testing",
          "Support horizontal runs at recommended intervals",
          "Leave expansion allowance on long hot-water runs",
        ],
      },
    ],
    story: {
      title: "CPVC Plumbing Pipes",
      paragraphs: [
        "CPVC plumbing pipes are widely recognised for their superior performance in both residential and industrial applications. They offer excellent resistance to corrosion, scaling, and chemical degradation, making them ideal for long-term use. Unlike metal pipes, CPVC does not rust or react with most chemicals, ensuring a clean and safe water supply.",
        "Their smooth inner surface reduces friction loss, resulting in improved flow efficiency and lower energy consumption. CPVC pipes are also lightweight, easy to install, and require minimal maintenance, reducing overall project costs.",
        "Engineered for durability, CPVC pipes handle high pressure and temperature conditions without deformation or failure. They deliver a long service life and maintain structural integrity even under harsh environmental conditions.",
      ],
    },
    faqs: [
      {
        question:
          "What are CPVC pipes commonly used for in residential, commercial, and industrial applications?",
        answer:
          "CPVC pipes are primarily used for hot and cold water distribution — in homes, apartments, hotels, hospitals, and commercial buildings — as well as solar heater connections and industrial process water lines where temperature and pressure resistance matter.",
      },
      {
        question:
          "How durable and long-lasting are CPVC pipes compared to other piping materials?",
        answer:
          "Installed and operated within their rated conditions, CPVC systems are engineered for a service life of 50+ years. Unlike metal pipes they never rust, scale, or pit, so flow capacity and joint strength stay consistent over decades.",
      },
      {
        question:
          "Can CPVC pipes safely handle high-temperature hot water systems without damage?",
        answer:
          "Yes. CPVC is rated for continuous hot-water service up to 93°C, which comfortably covers geysers, solar water heaters, and commercial hot-water circulation systems.",
      },
      {
        question:
          "Do CPVC pipes corrode or rust over time like traditional metal pipes?",
        answer:
          "No. CPVC is completely immune to rust and electrolytic corrosion, and resists most acids, bases, and salts found in water supply systems — one of the main reasons it replaces GI piping.",
      },
      {
        question:
          "Are CPVC pipes safe and suitable for carrying drinking (potable) water?",
        answer:
          "Yes. WorldFlow CPVC is made from a lead-free compound that complies with potable-water standards, does not leach harmful substances, and keeps the water supply clean and taste-free.",
      },
    ],
  },
  {
    slug: "upvc-plumbing-pipes",
    title: "UPVC Plumbing Pipes & Fittings",
    image: "/products/upvc-pipes-fittings.jpg",
    brochure: "/brochures/upvc-plumbing-pipes.pdf",
    intro: [
      "WorldFlow UPVC Pipes and Fittings deliver dependable cold-water plumbing for homes, buildings, and agriculture. Manufactured from unplasticised PVC with high impact strength, they are lead-free, corrosion-proof, and built to carry pressure reliably year after year. Full compliance with Indian standards makes them a safe choice for potable water supply.",
      "Our complete range of pipes and matching fittings is engineered to slot together seamlessly — no leaks, no guesswork. Multiple sizes and pressure classes are produced on modern extrusion lines with batch-level testing, so every length that leaves our facility performs exactly as specified.",
    ],
    tabs: [
      {
        label: "High Performance",
        items: [
          "High impact strength — resists site handling damage",
          "Pressure classes from 4 kgf/cm² to 16 kgf/cm²",
          "Mirror-smooth bore for maximum flow efficiency",
          "100% corrosion, rust and scale proof",
          "Unaffected by water-borne chemicals and salts",
          "Lightweight — faster installation at lower cost",
        ],
      },
      {
        label: "Use of Products",
        items: [
          "Cold water plumbing in homes and high-rises",
          "Underground and terrace water distribution",
          "Bore and pump delivery lines",
          "Agricultural and landscape water supply",
          "Industrial cold-water utility lines",
          "Complete fitting range for every joint on site",
        ],
      },
      {
        label: "Sizes & Range",
        items: [
          "Sizes from ½\" to 4\" across the plumbing range",
          "Pressure classes from 4 to 16 kgf/cm²",
          "Standard lengths of 3 m and 6 m",
          "Plain and threaded fitting variants",
          "Elbows, tees, couplers, unions, end caps and more",
          "Matching UPVC solvent cement available",
        ],
      },
      {
        label: "Quality & Standards",
        items: [
          "Manufactured to IS 4985 specifications",
          "ISO 9001:2015 certified production process",
          "Lead-free compound safe for drinking water",
          "Every batch dimension-checked and pressure-tested",
          "UV-stabilised for exposed installations",
          "Full traceability from raw material to dispatch",
        ],
      },
      {
        label: "Safety Tips",
        items: [
          "Use the recommended UPVC solvent cement for joints",
          "Chamfer pipe ends before solvent jointing",
          "Do not over-apply cement inside small fittings",
          "Store pipes on flat ground away from direct heat",
          "Use proper clamps — never bend pipe to meet a fitting",
          "Pressure-test the line before concealing it",
        ],
      },
    ],
    story: {
      title: "UPVC Plumbing Pipes & Fittings",
      paragraphs: [
        "UPVC piping is the workhorse of modern cold-water plumbing. It combines the strength to handle sustained line pressure with total immunity to rust and corrosion, keeping water clean from source to tap.",
        "Because UPVC is light and joints are made with fast solvent welding, installation time drops sharply compared to metal systems — and the smooth bore keeps pumping costs low for the life of the line.",
        "WorldFlow manufactures pipes and their matching fittings as one engineered system, so every elbow, tee, and coupler fits precisely and stays leak-free under pressure.",
      ],
    },
    faqs: [
      {
        question: "Where are UPVC pipes typically used?",
        answer:
          "UPVC is the standard choice for cold-water plumbing — building water distribution, underground supply lines, pump delivery, and agricultural water networks. It is not intended for hot-water service; CPVC covers that duty.",
      },
      {
        question: "Are UPVC pipes safe for drinking water?",
        answer:
          "Yes. WorldFlow UPVC uses a lead-free compound compliant with IS 4985, making it completely safe for potable water supply.",
      },
      {
        question: "How are UPVC pipes joined on site?",
        answer:
          "Joints are made by solvent-cement welding with matching UPVC fittings — a fast, permanent, leak-proof method that needs no threading, welding, or special tools.",
      },
      {
        question: "Will UPVC pipes corrode or scale over time?",
        answer:
          "No. UPVC is immune to rust, electrolytic corrosion, and scale build-up, so flow capacity remains essentially unchanged over the pipe's service life.",
      },
      {
        question: "What sizes and pressure ratings are available?",
        answer:
          "WorldFlow UPVC pipes are produced in a wide range of diameters and pressure classes from 4 to 16 kgf/cm² per IS 4985, with a complete range of matching fittings.",
      },
    ],
  },
  {
    slug: "swr-drainage-system",
    title: "SWR Drainage System",
    image: "/products/swr-fittings-2.jpg",
    brochure: "/brochures/swr-drainage-system.pdf",
    intro: [
      "WorldFlow SWR (Soil, Waste & Rainwater) pipes and fittings form a complete above-ground drainage system for modern buildings. Manufactured to IS 13592, they carry soil, waste, and rainwater quietly and reliably — with high impact strength, UV stabilisation for exposed stacks, and chemical resistance for everyday household effluents.",
      "The system is available in both pasting (solvent) and ring-fit (rubber seal) variants, with a full range of bends, tees, traps, and cowls, so every stack and branch on the drawing can be built from one matched product family.",
    ],
    tabs: [
      {
        label: "High Performance",
        items: [
          "High impact strength for site handling and service",
          "UV-stabilised for sun-exposed external stacks",
          "Smooth bore prevents blockages and build-up",
          "Resistant to household chemicals and effluents",
          "Ring-fit joints absorb thermal movement",
          "Quiet drainage performance in high-rise stacks",
        ],
      },
      {
        label: "Use of Products",
        items: [
          "Soil and waste discharge stacks in buildings",
          "Rainwater down-take pipes from terraces",
          "Kitchen and bathroom waste connections",
          "Ventilation stacks with matching cowls",
          "High-rise residential and commercial towers",
          "Complete traps, bends and access fittings range",
        ],
      },
      {
        label: "Sizes & Range",
        items: [
          "Pipe sizes of 75 mm, 90 mm and 110 mm",
          "Type A (ventilation) and Type B (drainage) classes",
          "Ring-fit and pasting-type joint variants",
          "Standard lengths of 3 m and 6 m",
          "Bends, tees, Y-branches, traps, cowls and access pieces",
          "EPDM rubber rings supplied with ring-fit range",
        ],
      },
      {
        label: "Quality & Standards",
        items: [
          "Manufactured to IS 13592 specifications",
          "Type A and Type B pipes for ventilation and drainage duty",
          "ISO 9001:2015 certified production process",
          "EPDM rubber rings tested for long-term sealing",
          "Batch-level dimensional and impact testing",
          "Full traceability from raw material to dispatch",
        ],
      },
      {
        label: "Safety Tips",
        items: [
          "Maintain the designed slope on horizontal runs",
          "Lubricate ring-fit joints — never force the spigot",
          "Provide access doors at bends for cleaning",
          "Clamp stacks at every floor level",
          "Do not connect hot discharge lines directly",
          "Cap open stacks during construction to avoid debris",
        ],
      },
    ],
    story: {
      title: "SWR Drainage System",
      paragraphs: [
        "A building's drainage has to work silently, every day, for decades — and stay sealed through seasons of expansion and contraction. WorldFlow SWR systems are engineered exactly for that duty.",
        "The smooth inner bore keeps waste moving without build-up, while UV-stabilised material lets external stacks face the sun without becoming brittle. Ring-fit joints with EPDM seals accommodate thermal movement and make maintenance simple.",
        "With a complete family of pipes, bends, tees, traps, and cowls manufactured to IS 13592, the entire drainage drawing can be executed with components that are made for each other.",
      ],
    },
    faqs: [
      {
        question: "What does SWR stand for and what is the system used for?",
        answer:
          "SWR stands for Soil, Waste & Rainwater. The system handles above-ground building drainage — toilet soil lines, kitchen and bathroom waste, ventilation stacks, and rainwater down-takes.",
      },
      {
        question: "What is the difference between pasting type and ring-fit SWR pipes?",
        answer:
          "Pasting-type joints are solvent-welded and permanent, while ring-fit joints use an EPDM rubber seal that allows thermal movement and easy dismantling for maintenance. WorldFlow supplies both variants.",
      },
      {
        question: "Can WorldFlow SWR pipes be used on sun-exposed external walls?",
        answer:
          "Yes. The material is UV-stabilised specifically so external stacks and rainwater pipes can face direct sunlight without cracking or fading prematurely.",
      },
      {
        question: "Are SWR pipes suitable for high-rise buildings?",
        answer:
          "Yes. With Type A and Type B classes per IS 13592, proper floor-level clamping, and ring-fit joints to absorb stack movement, the system is regularly used in multi-storey residential and commercial towers.",
      },
      {
        question: "How do I keep an SWR drainage system blockage-free?",
        answer:
          "Maintain the designed slope on horizontal runs, use access fittings at direction changes, and keep stacks capped during construction. The smooth UPVC bore itself resists deposits far better than cast-iron alternatives.",
      },
    ],
  },
  {
    slug: "column-pipes",
    title: "Column Pipes",
    image: "/products/column-pipes.png",
    // No catalogue yet — the hero button shows "Coming soon".
    intro: [
      "WorldFlow Column Pipes are engineered to suspend submersible pumps deep inside borewells and carry water to the surface under continuous pressure. Precision square threads, high tensile load capacity, and rubber sealing rings make every joint strong, leak-proof, and quick to install or retrieve.",
      "Produced from high-grade UPVC with strict batch testing, our column pipes resist corrosion, scale, and sand abrasion far better than GI alternatives — protecting the pump investment and delivering consistent output for years.",
    ],
    tabs: [
      {
        label: "High Performance",
        items: [
          "High tensile strength carries pump plus water column load",
          "Precision square threads for firm, self-locking joints",
          "Sealing rings keep every joint 100% leak-proof",
          "Corrosion and scale proof — unlike GI column pipe",
          "Smooth bore maximises discharge from the pump",
          "Handles pressure surges and pump start/stop cycles",
        ],
      },
      {
        label: "Use of Products",
        items: [
          "Submersible pump installations in borewells",
          "Agricultural irrigation borewells",
          "Domestic and community water supply wells",
          "Industrial groundwater extraction",
          "Replacement of corroded GI column assemblies",
          "Available in multiple diameters and pressure classes",
        ],
      },
      {
        label: "Sizes & Range",
        items: [
          "Diameters from 1\" to 4\" for all common pump sizes",
          "Shallow, medium and deep well classes",
          "Standard length of 3 m per pipe",
          "Precision square threads on both ends",
          "Sealing rings supplied with every pipe",
          "Bottom and top adaptors available",
        ],
      },
      {
        label: "Quality & Standards",
        items: [
          "High-grade UPVC compound with batch verification",
          "ISO 9001:2015 certified production process",
          "Every pipe pressure- and load-tested",
          "Threads machined to close tolerances for easy make-up",
          "Food-safe material for potable groundwater",
          "Full traceability from raw material to dispatch",
        ],
      },
      {
        label: "Safety Tips",
        items: [
          "Match pipe class to pump depth and head",
          "Use the supplied sealing ring on every joint",
          "Tighten joints by hand plus strap wrench — no pipe wrench",
          "Lower the assembly slowly and vertically",
          "Use a safety rope rated for the full column weight",
          "Never rest the column load on the well cap alone",
        ],
      },
    ],
    story: {
      title: "Column Pipes",
      paragraphs: [
        "A column pipe does two hard jobs at once: it hangs the full weight of a submersible pump and the water column above it, while carrying that water to the surface under pressure — day after day, metres below ground where maintenance is expensive.",
        "WorldFlow column pipes are built for exactly this duty. Precision-machined square threads lock joints firmly under load, rubber seals keep them leak-proof, and the UPVC body shrugs off the corrosion and scaling that slowly destroys GI columns.",
        "The result is higher sustained discharge, easier installation and retrieval, and a far longer service life for the entire borewell assembly.",
      ],
    },
    faqs: [
      {
        question: "What are column pipes and where are they used?",
        answer:
          "Column pipes (riser pipes) suspend a submersible pump inside a borewell and carry the pumped water to the surface. They are used in agricultural, domestic, and industrial borewells.",
      },
      {
        question: "Why choose UPVC column pipes over GI pipes?",
        answer:
          "UPVC columns never rust or scale, weigh a fraction of GI, install and retrieve faster, and keep their smooth bore for life — maintaining discharge and protecting the pump. GI columns corrode from both sides and lose capacity year on year.",
      },
      {
        question: "How much load can WorldFlow column pipes carry?",
        answer:
          "Each diameter and class is rated for a specified pump-plus-column depth. Every pipe is load- and pressure-tested; our team can recommend the right class from your pump weight, depth, and head details.",
      },
      {
        question: "Are the joints strong enough for deep borewells?",
        answer:
          "Yes. Precision square threads engage over a long length and are self-locking under tension, while the rubber sealing ring keeps the joint leak-proof through pressure surges and start/stop cycles.",
      },
      {
        question: "Is the material safe for drinking water borewells?",
        answer:
          "Yes. WorldFlow column pipes use a food-safe, lead-free UPVC compound suitable for potable groundwater supply.",
      },
    ],
  },
];

export const getProductPage = (slug: string) =>
  PRODUCT_PAGES.find((p) => p.slug === slug);
