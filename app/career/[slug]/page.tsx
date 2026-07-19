import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JobApplication from "@/components/JobApplication";
import { JOBS, getJob } from "@/lib/careers";

export function generateStaticParams() {
  return JOBS.map((job) => ({ slug: job.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const job = getJob(params.slug);
  return {
    title: job ? `${job.title} | Career | WorldFlow` : "Career | WorldFlow",
    description: job?.summary,
  };
}

export default function JobPage({ params }: { params: { slug: string } }) {
  const job = getJob(params.slug);
  if (!job) notFound();
  return <JobApplication job={job} />;
}
