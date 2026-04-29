"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Users, Activity } from "lucide-react";

export default function CircuitCard({ circuit, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link href={`/circuits/${circuit.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
          <Image
            src={circuit.hero}
            alt={circuit.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-[1.4s] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/20 to-transparent" />

          <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-ivory/90">
            <span className="text-xs tracking-[0.25em] uppercase">
              Expédition · {circuit.difficulty}
            </span>
            <span className="text-xs tracking-[0.25em] uppercase">
              dès {circuit.priceFrom}€
            </span>
          </div>

          <div className="absolute bottom-0 inset-x-0 p-8">
            <h3 className="font-display text-3xl md:text-4xl text-ivory leading-tight">
              {circuit.title}
            </h3>
            <p className="mt-2 text-ivory/75 text-sm md:text-base max-w-md">
              {circuit.tagline}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-ivory/85 text-sm">
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} /> {circuit.duration}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users size={14} /> {circuit.group}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Activity size={14} /> {circuit.difficulty}
              </span>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 text-ivory group-hover:text-ocre-light transition">
              Voir le circuit
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
