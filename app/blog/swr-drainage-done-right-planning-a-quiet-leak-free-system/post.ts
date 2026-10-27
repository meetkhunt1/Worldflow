import type { BlogPost } from "@/lib/blog-types";

export const post: BlogPost = {
  slug: "swr-drainage-done-right-planning-a-quiet-leak-free-system",
  title: "SWR Drainage Done Right: Planning a Quiet, Leak-Free System",
  category: "Drainage",
  date: "2026-06-15",
  readTime: "5 min read",
  excerpt:
    "Good drainage is invisible: no smells, no gurgles, no stains on the elevation. Here's how the quiet buildings do it.",
  image: "/apps/04.webp",
  imageAlt: "SWR drainage stack with ring-fit joints and clamps in a multi-storey building",
  keywords: [
    "SWR drainage pipes",
    "soil waste rainwater pipe system",
    "ring-fit SWR pipes",
    "IS 13592 SWR pipes",
    "quiet drainage system",
  ],
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
};
