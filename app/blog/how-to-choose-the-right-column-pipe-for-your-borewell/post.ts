import type { BlogPost } from "@/lib/blog-types";

export const post: BlogPost = {
  slug: "how-to-choose-the-right-column-pipe-for-your-borewell",
  title: "How to Choose the Right Column Pipe for Your Borewell",
  category: "Borewell Guide",
  date: "2026-07-02",
  readTime: "5 min read",
  excerpt:
    "Your column pipe carries the pump, the water, and the whole cost of a mistake. Four factors decide the right pipe — here they are in plain language.",
  image: "/apps/03.webp",
  imageAlt: "UPVC column pipes being lowered into a borewell with a submersible pump",
  keywords: [
    "column pipe for borewell",
    "UPVC column pipe",
    "borewell column pipe size",
    "submersible pump column pipe",
    "GI vs UPVC column pipe",
  ],
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
};
