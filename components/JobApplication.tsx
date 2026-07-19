"use client";

import { useState, type FormEvent } from "react";
import Reveal from "@/components/Reveal";
import { footerContact } from "@/lib/data";
import type { Job } from "@/lib/careers";

/* ------------------------------------------------------------------ *
 * JobApplication — /career/[slug] template: a job-detail card
 * (title, rows, key requirements, responsibilities) followed by an
 * application form card. Submitting opens the visitor's mail client
 * with everything pre-filled, addressed to the company inbox.
 * ------------------------------------------------------------------ */

const inputClasses =
  "w-full rounded-t-md border-b border-knavy/30 bg-soft px-4 py-3 font-book text-[15px] text-knavy placeholder:text-muted/70 outline-none transition-colors focus:border-korange";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-book text-[14px] font-semibold text-knavy">
        {label} : {required && <span className="text-korange">*</span>}
      </span>
      {children}
    </label>
  );
}

export default function JobApplication({ job }: { job: Job }) {
  const [fileName, setFileName] = useState("");

  // No backend — compose a pre-filled email in the visitor's mail
  // client. The resume must be attached there by hand (mailto links
  // cannot carry attachments), so the body reminds them.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Mobile No.: ${data.get("mobile")}`,
      `Position: ${job.title}`,
      `Years of Experience: ${data.get("experience")}`,
      "",
      `Message: ${data.get("message") || "-"}`,
      "",
      fileName
        ? `[Please attach your resume file "${fileName}" to this email before sending.]`
        : "[Please attach your resume to this email before sending.]",
    ].join("\n");

    window.location.href = `mailto:${footerContact.email}?subject=${encodeURIComponent(
      `Application for ${job.title}`
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="bg-soft pb-24 pt-32 md:pb-32 md:pt-44">
      <div className="shell">
        <div className="mx-auto max-w-5xl">
        {/* Job detail card */}
        <Reveal>
          <div className="rounded-2xl bg-white p-8 shadow-[0_4px_14px_-12px_rgba(27,36,49,0.3)] md:p-12">
            <h1 className="font-display text-[clamp(1.7rem,3.4vw,2.5rem)] font-bold uppercase leading-tight tracking-tight text-korange">
              {job.title}
            </h1>
            <p className="mt-4 font-book text-[15px] leading-relaxed text-muted">
              {job.summary}
            </p>

            <div className="mt-5 space-y-2.5 font-book text-[15px] leading-relaxed text-muted">
              <p>
                <strong className="font-semibold text-knavy">
                  Qualification :
                </strong>{" "}
                {job.qualification}
              </p>
              <p>
                <strong className="font-semibold text-knavy">
                  No. of Vacancies :
                </strong>{" "}
                {job.vacancies}
              </p>
              <p>
                <strong className="font-semibold text-knavy">
                  Experience :
                </strong>{" "}
                {job.experience}
              </p>
            </div>

            <div className="mt-6">
              <h2 className="font-book text-[15px] font-bold text-knavy">
                Key Requirements:
              </h2>
              <ul className="mt-1.5 space-y-1 font-book text-[15px] leading-relaxed text-knavy">
                {job.keyRequirements.map((line) => (
                  <li key={line} className="font-semibold">
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            {job.location && (
              <p className="mt-6 font-book text-[15px] font-bold text-knavy">
                Location: {job.location}
              </p>
            )}

            <div className="mt-6">
              <h2 className="font-book text-[15px] font-bold text-knavy">
                Job Responsibilities:
              </h2>
              <ul className="mt-1.5 space-y-1 font-book text-[15px] leading-relaxed text-muted">
                {job.responsibilities.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Application form card */}
        <Reveal delay={0.1}>
          <form
            onSubmit={onSubmit}
            className="mt-8 rounded-2xl bg-white p-8 shadow-[0_4px_14px_-12px_rgba(27,36,49,0.3)] md:p-12"
          >
            <Field label="Name" required>
              <input
                name="name"
                required
                placeholder="Enter your name"
                className={inputClasses}
              />
            </Field>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Field label="Email" required>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Enter email address"
                  className={inputClasses}
                />
              </Field>
              <Field label="Mobile No." required>
                <input
                  name="mobile"
                  type="tel"
                  required
                  placeholder="Enter contact number"
                  className={inputClasses}
                />
              </Field>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Field label="Position" required>
                <input
                  name="position"
                  value={job.title}
                  readOnly
                  className={`${inputClasses} cursor-default`}
                />
              </Field>
              <Field label="Year of Exp." required>
                <input
                  name="experience"
                  required
                  placeholder="Enter your work experience."
                  className={inputClasses}
                />
              </Field>
            </div>

            <div className="mt-6">
              <Field label="Attach File" required>
                <input
                  name="file"
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                  className={`${inputClasses} cursor-pointer file:mr-4 file:rounded-md file:border-0 file:bg-knavy file:px-4 file:py-1.5 file:font-book file:text-[13px] file:font-semibold file:text-white`}
                />
              </Field>
            </div>

            <div className="mt-6">
              <Field label="Message">
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Place your message"
                  className={`${inputClasses} resize-y`}
                />
              </Field>
            </div>

            <button
              type="submit"
              className="btn-fill btn-fill-navy mt-8 rounded-md bg-korange px-8 py-3.5 font-book text-[15px] font-semibold text-white"
            >
              Submit
            </button>
            <p className="mt-4 font-book text-[13px] leading-relaxed text-muted">
              Submitting opens your email app with the application pre-filled —
              attach your resume there and hit send.
            </p>
          </form>
        </Reveal>
        </div>
      </div>
    </section>
  );
}
