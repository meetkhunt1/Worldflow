"use client";

import { motion } from "framer-motion";

const CAPSULE_VIDEO = "https://files.ilmakiage.com/videos/capsule_vid_launch.mp4";

const points = [
  "SpoiledChild gives you control of your future and impact on the planet. Our products have been designed to be refillable reusable or recyclable.",
  "By joining our auto-refill subscription you become part of our mission to reduce waste produced by our industry.",
  "When you commit to SpoiledChild, you are choosing change as consistency is the key to transformative results.",
  "Stay youth-full and waste less.",
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="shell grid grid-cols-1 items-center gap-14 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="overflow-hidden rounded-3xl bg-soft"
        >
          <video
            className="h-full w-full object-cover"
            width={640}
            height={640}
            autoPlay
            muted
            playsInline
            loop
            poster=""
          >
            <source src={CAPSULE_VIDEO} type="video/mp4" />
          </video>
        </motion.div>

        <div>
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="display-title text-[clamp(2rem,5vw,3.6rem)]"
          >
            Welcome to
            <br />
            capsule culture
          </motion.h3>

          <ol className="mt-8 space-y-6">
            {points.map((p, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="flex gap-4 font-book text-muted"
              >
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold ${
                    i === points.length - 1 ? "bg-brainpink text-white" : "border border-black/20 text-ink"
                  }`}
                >
                  {i === points.length - 1 ? "♻" : i + 1}
                </span>
                <span className={i === points.length - 1 ? "font-display text-lg uppercase text-ink" : ""}>{p}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
