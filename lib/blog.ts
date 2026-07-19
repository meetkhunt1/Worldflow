/* ------------------------------------------------------------------ *
 * Blog posts — single source of truth for /blog and /blog/[slug].
 * Sections render in order and feed the article's table of contents.
 * ------------------------------------------------------------------ */

export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  sections: BlogSection[];
  faqs: { question: string; answer: string }[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "upvc-vs-cpvc-pipes-which-one-does-your-project-need",
    title: "UPVC vs CPVC Pipes: Which One Does Your Project Need?",
    category: "Plumbing Guide",
    date: "10 July 2026",
    readTime: "6 min read",
    excerpt:
      "Both look similar on the shelf, but they solve different problems. Here's how to pick the right system for your water lines the first time.",
    image: "/apps/01.png",
    sections: [
      {
        heading: "The one-line difference",
        paragraphs: [
          "UPVC (unplasticised PVC) is built for cold-water pressure lines. CPVC (chlorinated PVC) carries the same strengths plus one decisive upgrade: it stays strong with hot water flowing through it, rated for continuous service up to 93°C. Everything else about choosing between them flows from that fact.",
        ],
      },
      {
        heading: "Where UPVC is the right answer",
        paragraphs: [
          "For any line that will never see hot water, UPVC gives you the best value per metre — strong, lead-free, and completely immune to rust.",
        ],
        bullets: [
          "Overhead tank and municipal supply distribution",
          "Bathroom and kitchen cold-water lines",
          "Bore and pump delivery piping",
          "Garden, terrace and agricultural supply",
        ],
      },
      {
        heading: "Where CPVC earns its premium",
        paragraphs: [
          "The moment a geyser, solar heater, or hot-water recirculation loop enters the drawing, CPVC becomes non-negotiable. Run hot water through UPVC and the pipe softens, joints creep, and failures follow — usually inside a wall where repairs hurt the most.",
        ],
        bullets: [
          "Geyser and solar water-heater connections",
          "Hot-water lines in bathrooms and kitchens",
          "Hotels and hospitals with central hot water",
          "Industrial lines with warm process water",
        ],
      },
      {
        heading: "Can you mix both in one house?",
        paragraphs: [
          "Absolutely — and most well-planned homes do. The economical approach is UPVC for every cold line and CPVC only on the hot side. Just keep one rule sacred: each material uses its own solvent cement. UPVC cement on a CPVC joint (or vice versa) is one of the most common causes of early leaks.",
        ],
      },
      {
        heading: "Cost vs lifecycle: the honest math",
        paragraphs: [
          "CPVC costs more per metre, and on a cold-water-only job that premium buys you nothing. But on hot lines the comparison isn't UPVC vs CPVC — it's CPVC vs re-opening tiled walls in three years. Sized and installed correctly, both systems are engineered for decades of service, so the real cost driver is choosing right the first time.",
        ],
      },
      {
        heading: "The WorldFlow take",
        paragraphs: [
          "WorldFlow manufactures both systems as complete families — pipes and matching fittings, made to IS 4985 (UPVC) and IS 15778 (CPVC), batch-tested before dispatch. Tell us what the line carries and how hot it runs, and we'll tell you exactly what to put on the truck.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I use UPVC pipes for hot water if the run is short?",
        answer:
          "No. Even short exposure to hot water softens UPVC and weakens joints over time. Any line that sees water above roughly 45°C should be CPVC.",
      },
      {
        question: "Do UPVC and CPVC use the same fittings and cement?",
        answer:
          "No — each system has its own fittings and its own solvent cement, and they are not interchangeable. Mixing them is a leading cause of joint failure.",
      },
      {
        question: "Which is better for drinking water?",
        answer:
          "Both are lead-free and safe for potable water when made to standard. Use UPVC for cold supply and CPVC wherever the line also carries hot water.",
      },
    ],
  },
  {
    slug: "how-to-choose-the-right-column-pipe-for-your-borewell",
    title: "How to Choose the Right Column Pipe for Your Borewell",
    category: "Borewell Guide",
    date: "2 July 2026",
    readTime: "5 min read",
    excerpt:
      "Your column pipe carries the pump, the water, and the whole cost of a mistake. Four factors decide the right pipe — here they are in plain language.",
    image: "/apps/03.png",
    sections: [
      {
        heading: "What a column pipe actually does",
        paragraphs: [
          "A column pipe does two brutal jobs at once: it suspends the full weight of your submersible pump plus the water column above it, and it carries that water to the surface under pressure — for years, dozens of metres underground, where every repair means pulling the entire assembly out.",
        ],
      },
      {
        heading: "Factor 1: Depth decides the class",
        paragraphs: [
          "The deeper the pump hangs, the more tension and pressure the pipe must carry. Column pipes come in shallow, medium and deep well classes for exactly this reason. Choosing a lighter class than your depth demands is the single most expensive shortcut in the borewell business.",
        ],
      },
      {
        heading: "Factor 2: Match the diameter to the pump",
        paragraphs: [
          "An undersized pipe throttles your pump — it works harder, delivers less, and dies sooner. Match the column diameter to the pump's outlet and rated discharge.",
        ],
        bullets: [
          "1\" – 1¼\" for small domestic pumps",
          "1½\" – 2\" for typical farm submersibles",
          "2½\" – 4\" for high-discharge and community wells",
        ],
      },
      {
        heading: "Factor 3: Threads are where columns fail",
        paragraphs: [
          "Almost every column failure happens at a joint. Look for precision-machined square threads that engage over a long length and lock under tension, with a rubber sealing ring on every joint. If the threads look rough or the rings are an afterthought, walk away.",
        ],
      },
      {
        heading: "Factor 4: UPVC vs GI — no contest anymore",
        paragraphs: [
          "GI columns rust from both sides, gain weight in scale, choke discharge, and eventually shed rust into your water. Modern UPVC columns weigh a fraction as much, install and retrieve faster, never corrode, and keep their smooth bore for life. The market has moved for good reason.",
        ],
      },
      {
        heading: "Before you buy: a 60-second checklist",
        paragraphs: [
          "Have these four answers ready and any good dealer — including ours — can size your column in minutes:",
        ],
        bullets: [
          "Pump depth (metres from ground level)",
          "Pump weight and outlet size",
          "Rated discharge and head",
          "Bore diameter",
        ],
      },
    ],
    faqs: [
      {
        question: "How long do UPVC column pipes last?",
        answer:
          "Sized correctly for depth and discharge, a quality UPVC column outlives the pump it carries — corrosion never enters the picture, so lifespan is decided by mechanical loading, not rust.",
      },
      {
        question: "Can I reuse column pipes when replacing a pump?",
        answer:
          "Usually yes, if the threads and sealing rings are intact and the new pump's weight and discharge match the pipe's class. Inspect every joint during the pull-out.",
      },
      {
        question: "What happens if I choose a lighter class to save money?",
        answer:
          "The joint under highest tension eventually lets go, and the pump plus column drops down the bore. Recovery — if possible at all — costs far more than the class upgrade would have.",
      },
    ],
  },
  {
    slug: "7-signs-its-time-to-replace-your-gi-pipelines",
    title: "7 Signs It's Time to Replace Your Old GI Pipelines",
    category: "Maintenance",
    date: "24 June 2026",
    readTime: "4 min read",
    excerpt:
      "GI pipes don't fail overnight — they warn you for years first. Here are the seven signals your pipeline is asking for retirement.",
    image: "/apps/02.png",
    sections: [
      {
        heading: "Why GI pipes age the way they do",
        paragraphs: [
          "Galvanised iron pipes rely on a thin zinc coating for protection. Once that layer wears through — and it always does — the steel underneath rusts from the inside out. The process is slow, invisible, and absolutely certain. The question is never if, only when.",
        ],
      },
      {
        heading: "The seven warning signs",
        paragraphs: ["If you recognise two or more of these, your pipeline is already telling you its plans:"],
        bullets: [
          "1. Brownish or yellow water after the tap has been closed overnight",
          "2. Falling water pressure at fixtures that used to run strong",
          "3. Metallic taste or staining on sanitaryware and laundry",
          "4. Damp patches or efflorescence on walls along pipe routes",
          "5. Visible rust weeping at joints, elbows and clamps",
          "6. Repairs recurring at different points of the same line",
          "7. The system is 15+ years old — the typical end of a GI line's dependable life",
        ],
      },
      {
        heading: "Why patching stops making sense",
        paragraphs: [
          "Every leak you fix on an old GI line is a preview, not a conclusion — the same corrosion exists along the entire run. Once failures start recurring, the money spent on repeated plumber visits, wall repairs and repainting quietly overtakes the cost of replacing the line outright.",
        ],
      },
      {
        heading: "What to replace it with",
        paragraphs: [
          "Modern practice is simple: UPVC for cold-water lines, CPVC wherever hot water flows. Both are immune to the corrosion that killed your GI system, keep a smooth bore for life, and install faster since solvent joints need no threading. WorldFlow manufactures both as complete pipe-and-fitting families, batch-tested to IS standards.",
        ],
      },
      {
        heading: "Planning the replacement smartly",
        paragraphs: [
          "A full replacement sounds disruptive, but a well-planned swap usually completes room by room in days. Map the existing routes, replace risers first, and take the opportunity to correct old sizing mistakes — the new system will serve for decades, so it's worth drawing it right.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is slightly discoloured morning water actually dangerous?",
        answer:
          "It's a sign of active internal rusting. Beyond taste and staining, corroded pipes shed particles and harbour bacteria in pitted surfaces — replace the line rather than live with it.",
      },
      {
        question: "Can new UPVC/CPVC lines connect to remaining GI sections?",
        answer:
          "Yes — transition fittings (including brass-insert adaptors) join plastic systems to metal threads cleanly. But partial replacement means the remaining GI keeps aging, so plan a full swap where possible.",
      },
      {
        question: "How long will the replacement system last?",
        answer:
          "Quality UPVC and CPVC systems installed to spec are engineered for 50+ years of service — roughly three times the dependable life of the GI line they replace.",
      },
    ],
  },
  {
    slug: "swr-drainage-done-right-planning-a-quiet-leak-free-system",
    title: "SWR Drainage Done Right: Planning a Quiet, Leak-Free System",
    category: "Drainage",
    date: "15 June 2026",
    readTime: "5 min read",
    excerpt:
      "Good drainage is invisible: no smells, no gurgles, no stains on the elevation. Here's how the quiet buildings do it.",
    image: "/apps/04.png",
    sections: [
      {
        heading: "What SWR actually covers",
        paragraphs: [
          "SWR stands for Soil, Waste and Rainwater — the three things a building must move down and out, every day, without drama. Soil lines carry toilet discharge, waste lines carry bath and kitchen water, and rainwater lines drain the terrace. Each has its own rules, and mixing them carelessly is where most drainage problems begin.",
        ],
      },
      {
        heading: "Slope: the whole game in one number",
        paragraphs: [
          "Horizontal drainage works by gravity alone, and gravity is fussy. Too little slope and solids settle; too much and water outruns the solids it should carry. Hold the designed gradient consistently along the run — a sagging middle section will block even a correctly sloped line.",
        ],
      },
      {
        heading: "Ring-fit vs pasting joints",
        paragraphs: [
          "Drainage stacks expand and contract with every season and every hot discharge. Ring-fit joints, sealed with an EPDM rubber ring, absorb that movement and can be opened for maintenance. Pasting (solvent) joints are permanent and economical for concealed short runs. Most good buildings use both — rings on the stacks, pasting where movement is negligible.",
        ],
      },
      {
        heading: "The details that keep a system quiet",
        paragraphs: ["Silence in drainage is engineering, not luck:"],
        bullets: [
          "Vent the stack properly — gurgling is a starving air supply",
          "Clamp at every floor so stacks can't hammer against walls",
          "Use swept bends, not sharp 90° turns, at direction changes",
          "Provide access doors at bends for future cleaning",
          "Choose UV-stabilised pipe for sun-exposed external stacks",
        ],
      },
      {
        heading: "Specifying the right material",
        paragraphs: [
          "Look for pipes manufactured to IS 13592 — Type A for ventilation duty, Type B for soil and waste. WorldFlow's SWR family covers both, in ring-fit and pasting variants, with the full set of bends, tees, traps and cowls, so the entire drainage drawing can be executed from one matched system.",
        ],
      },
    ],
    faqs: [
      {
        question: "What causes gurgling sounds in drainage pipes?",
        answer:
          "Gurgling means the falling water can't pull enough air behind it — usually an unvented or blocked vent stack. Proper venting lets water fall silently and protects trap seals from being siphoned dry.",
      },
      {
        question: "Can rainwater and soil lines share one stack?",
        answer:
          "Best practice keeps them separate. A combined stack can push foul air through rainwater openings and overload the drain during storms. Separate stacks cost a little more and behave far better.",
      },
      {
        question: "Why do external drainage pipes turn brittle and fade?",
        answer:
          "Sunlight degrades unstabilised plastic. UV-stabilised SWR pipe — like WorldFlow's — is compounded specifically to face direct sun without becoming brittle or chalky.",
      },
    ],
  },
];

export const getBlogPost = (slug: string) =>
  BLOG_POSTS.find((p) => p.slug === slug);
