"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SplitReveal from "@/components/SplitReveal";
import Reveal from "@/components/Reveal";

export default function SpoiledSmart() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#111] text-white">
      <motion.div
        style={{ y: bgY }}
        aria-hidden
        className="absolute inset-0 opacity-40"
      >
        <div
          className="h-full w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/spoiled%20are%20smary.jpeg')" }}
        />
      </motion.div>

      <div className="shell relative py-24 md:py-32">
        <div className="max-w-xl">
          <SplitReveal className="display-title text-[clamp(2.4rem,6vw,75px)]">
            Built for
            <br />
            every flow.
          </SplitReveal>

          <Reveal delay={0.15}>
            <div className="mt-8 space-y-4 font-book text-white/85">
              <p className="font-semibold">
                From homes and commercial buildings to agricultural fields and
                industrial facilities, WorldFlow piping systems are designed to
                deliver consistent performance in every environment.
              </p>
              <p className="text-white/70">
                Our commitment to engineering excellence ensures reliable flow
                where it matters most.
              </p>
            </div>

            <a
              href="/products"
              className="btn-fill btn-fill-navy mt-8 inline-flex items-center justify-center rounded-full bg-korange px-8 py-4 text-[15px] font-semibold text-white transition-transform duration-300 ease-sc hover:-translate-y-0.5"
            >
              Explore Products
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
