import type { LandingPage } from "@/lib/landing-types";
import { page as oemPipeManufacturer } from "@/app/oem-pipe-manufacturers-from-india/content";
import { page as industrialPipeFittings } from "@/app/industrial-pipe-fittings/content";
import { page as pipeFittingsExporter } from "@/app/pipe-fittings-exporter-from-india/content";
import { page as brassPipesFittings } from "@/app/brass-pipes-fittings/content";
import { page as waterPipeFitting } from "@/app/water-pipe-fitting/content";
import { page as certifiedCpvcPipesFittings } from "@/app/certified-cpvc-pipes-fittings/content";
import { page as drainagePipe } from "@/app/drainage-pipe/content";
import { page as bulkPipeFittingsExporter } from "@/app/bulk-pipe-fittings-exporter/content";
import { page as pvcPipe } from "@/app/pvc-pipe/content";
import { page as plumbingPipeExporter } from "@/app/plumbing-pipe-exporter/content";
import { page as bestBrassPipesFittings } from "@/app/best-brass-pipes-fittings/content";
import { page as swrFitting } from "@/app/swr-fitting/content";

/* ------------------------------------------------------------------ *
 * Registry of every standalone landing page (see lib/landing-types.ts).
 * Used only to keep them in the sitemap — they are not linked from any
 * nav menu. Add a new import + entry here whenever a new landing page
 * folder is created under app/.
 * ------------------------------------------------------------------ */

export const LANDING_PAGES: LandingPage[] = [
  oemPipeManufacturer,
  industrialPipeFittings,
  pipeFittingsExporter,
  brassPipesFittings,
  waterPipeFitting,
  certifiedCpvcPipesFittings,
  drainagePipe,
  bulkPipeFittingsExporter,
  pvcPipe,
  plumbingPipeExporter,
  bestBrassPipesFittings,
  swrFitting,
];
