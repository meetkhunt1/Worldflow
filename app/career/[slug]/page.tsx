import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JobApplication from "@/components/JobApplication";
import { JOBS, getJob } from "@/lib/careers";

export function generateStaticParams() {
  return JOBS.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  return {
    title: job ? `${job.title} | Career | WorldFlow` : "Career | WorldFlow",
    description: job?.summary,
  };
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();
  return <JobApplication job={job} />;
}
