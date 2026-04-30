"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/pics/hero-3.jpg"
          alt="Désert du Sahara — Djanet"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-night/30 via-night/20 to-night/85" />

      <div className="relative z-10 h-full container-x px-6 md:px-10 lg:px-16 flex flex-col justify-end pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex items-center gap-2 text-ivory/80 mb-6"
        >
          <Star size={14} className="text-ocre-light" fill="currentColor" />
          <span className="uppercase text-xs tracking-[0.3em]">
            Sahara Algérien · Tassili n'Ajjer
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-ivory font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] max-w-4xl text-balance"
        >
          Le désert,
          <br />
          <span className="italic text-ocre-light">comme un secret</span>
          <br />
          que l'on vous confie.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-6 text-ivory/80 text-lg md:text-xl max-w-2xl leading-relaxed"
        >
          Expéditions Touaregs au cœur du Sahara algérien. Bivouacs étoilés,
          oasis cachées, peintures rupestres millénaires.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link href="/circuits" className="btn-primary">
            Découvrir les circuits <ArrowRight size={18} />
          </Link>
          <Link
            href="/heritage"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-ivory/40 text-ivory font-medium tracking-wide transition-all duration-300 hover:bg-ivory hover:text-night"
          >
            Notre héritage
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-ivory/70 text-xs tracking-[0.3em] uppercase flex flex-col items-center gap-2"
      >
        <span>Faites défiler</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-10 bg-ivory/40"
        />
      </motion.div>
    </section>
  );
}
