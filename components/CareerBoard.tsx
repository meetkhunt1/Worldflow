"use client";

import Reveal from "@/components/Reveal";
import SplitReveal from "@/components/SplitReveal";
import { footerContact } from "@/lib/data";
import { JOBS } from "@/lib/careers";

/* ------------------------------------------------------------------ *
 * CareerBoard — careers page: intro card (headline left, blurb
 * right), then a two-column grid of job openings. Each card lists
 * qualification / vacancies / experience rows and an Apply Now
 * button that opens a pre-filled email.
 * ------------------------------------------------------------------ */

/** Label + value row inside a job card. */
function JobRow({ label, value }: { label: string; value: string }) {
  return (
    <p className="font-book text-[14px] leading-relaxed text-muted">
      <strong className="inline-block w-[130px] shrink-0 align-top font-semibold text-knavy">
        {label}
      </strong>
      <span className="text-knavy/50">:&nbsp;</span>
      {value}
    </p>
  );
}

export default function CareerBoard() {
  return (
    <section className="bg-soft pb-24 pt-32 md:pb-32 md:pt-44">
      <div className="shell">
        {/* Intro card */}
        <Reveal>
          <div className="grid gap-8 rounded-2xl bg-white p-8 shadow-[0_4px_14px_-12px_rgba(27,36,49,0.3)] md:grid-cols-2 md:gap-12 md:p-12">
            <SplitReveal className="font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-bold uppercase leading-[1.12] tracking-tight text-knavy">
              Join the <span className="text-korange">WorldFlow</span> team
              and help build the future.
            </SplitReveal>
            <p className="self-center font-book text-[15px] leading-relaxed text-muted md:text-[16px]">
              Explore current career opportunities with us and become part of
              a team driven by engineering excellence and quality
              manufacturing. Browse the openings listed below, or share your
              resume directly with us at{" "}
              <a
                href={`mailto:${footerContact.email}`}
                className="font-semibold text-korange transition-colors hover:text-korangeDark"
              >
                {footerContact.email}
              </a>
              .
            </p>
          </div>
        </Reveal>

        {/* Openings grid */}
        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2">
          {JOBS.map((job, i) => (
            <Reveal key={job.title} delay={(i % 2) * 0.08} className="h-full">
              <article className="flex h-full flex-col rounded-2xl border border-knavy/10 bg-white p-7 md:p-8">
                <h2 className="font-book text-[21px] font-bold tracking-tight text-korange md:text-[23px]">
                  {job.title}
                </h2>
                <p className="mt-3 font-book text-[14px] leading-relaxed text-muted md:text-[15px]">
                  {job.summary}
                </p>

                <div className="mt-4 space-y-2">
                  <JobRow label="Qualification" value={job.qualification} />
                  <JobRow label="No. of Vacancies" value={String(job.vacancies)} />
                  <JobRow label="Experience" value={job.experience} />
                </div>

                <div className="mt-auto pt-6">
                  <a
                    href={`/career/${job.slug}`}
                    className="btn-fill btn-fill-orange inline-block rounded-md bg-knavy px-6 py-3 font-book text-[14px] font-semibold text-white"
                  >
                    Apply Now
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
