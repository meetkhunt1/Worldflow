"use client";

import { motion } from "framer-motion";

/* The original loads two heavy lifestyle photos (home-e27 main + product render).
   Replace the gradient panels below with:
   left  -> /media/wysiwyg/ e27 lifestyle hero
   right -> E27 bottle render */
export default function E27Banner() {
  return (
    <section className="relative overflow-hidden about-us">
      <div className="grid min-h-[520px] grid-cols-1 md:grid-cols-2">
        {/* left visual */}
        <div className="relative flex items-center justify-center overflow-hidden bg-[#f2e9df]">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, #f6efe6 0%, #ecdccb 60%, #e2cbb2 100%)",
            }}
          />
          <motion.div
            initial={{ scale: 1.08, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-10 grid h-56 w-56 place-items-center rounded-full bg-white/40 text-center text-xs uppercase tracking-widest text-[#8a6a4b] backdrop-blur"
          >
            E27 lifestyle
            <br />
            image
          </motion.div>
        </div>

        {/* right copy + product */}
        <div className="relative flex flex-col items-center justify-center gap-6 bg-[#efe4d6] px-8 py-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-md font-book text-lg leading-snug text-[#4a3826] md:text-xl"
          >
            Meet the Magic Collagen that will make you look &amp; feel younger with 1 spoon a day.
          </motion.p>
          <div className="flex flex-col items-center gap-3">
            <a
              href="/spoiled-brain?type=sc-supplements&v=sb1&fnl=by&version=1&hr=32304010301000150NA&loc=hpbanner/"
              className="text-sm font-semibold uppercase tracking-[0.14em] text-[#4a3826] underline underline-offset-4 hover:text-brainpink"
            >
              Find my match →
            </a>
            <a
              href="/supplements/e27-extra-strength-liquid-collagen/"
              className="text-sm font-semibold uppercase tracking-[0.14em] text-[#4a3826] underline underline-offset-4 hover:text-brainpink"
            >
              Meet Our Collagen →
            </a>
          </div>
          <div className="absolute bottom-6 right-8 h-40 w-24 rounded-b-[40px] rounded-t-lg bg-gradient-to-b from-[#d9b98f] to-[#b98c5c] opacity-70" aria-hidden />
        </div>
      </div>
    </section>
  );
}
