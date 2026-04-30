"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * <Carousel
 *   slides={[{ src, alt, caption? }, ...]}
 *   aspect="aspect-[4/5]"   // tailwind aspect class
 *   autoplay={true}
 *   interval={5000}
 *   rounded="rounded-3xl"
 * />
 */
export default function Carousel({
  slides = [],
  aspect = "aspect-[4/5]",
  autoplay = true,
  interval = 5000,
  rounded = "rounded-3xl",
  showCaption = false,
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timer = useRef(null);
  const hovered = useRef(false);

  const len = slides.length;

  const goTo = useCallback(
    (i) => {
      setDirection(i > index ? 1 : -1);
      setIndex(((i % len) + len) % len);
    },
    [index, len]
  );

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % len);
  }, [len]);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + len) % len);
  }, [len]);

  useEffect(() => {
    if (!autoplay || len <= 1) return;
    const tick = () => {
      if (!hovered.current) next();
    };
    timer.current = setInterval(tick, interval);
    return () => clearInterval(timer.current);
  }, [autoplay, interval, len, next]);

  if (len === 0) return null;

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60, scale: 1.02 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60, scale: 1.02 }),
  };

  return (
    <div
      className={`relative w-full ${aspect} ${rounded} overflow-hidden bg-sand-200`}
      onMouseEnter={() => (hovered.current = true)}
      onMouseLeave={() => (hovered.current = false)}
    >
      <AnimatePresence custom={direction} initial={false} mode="popLayout">
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) next();
            else if (info.offset.x > 60) prev();
          }}
          className="absolute inset-0"
        >
          <Image
            src={slides[index].src}
            alt={slides[index].alt || ""}
            fill
            sizes="(max-width: 1024px) 100vw, 80vw"
            className="object-cover pointer-events-none select-none"
            priority={index === 0}
          />
          {showCaption && slides[index].caption && (
            <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 bg-gradient-to-t from-night/80 to-transparent text-ivory">
              <p className="font-display text-xl md:text-2xl">
                {slides[index].caption}
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {len > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Précédent"
            className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-ivory/85 hover:bg-ivory text-night flex items-center justify-center shadow-lg backdrop-blur-sm transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Suivant"
            className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-ivory/85 hover:bg-ivory text-night flex items-center justify-center shadow-lg backdrop-blur-sm transition"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Aller à l'image ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-ivory" : "w-1.5 bg-ivory/50 hover:bg-ivory/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
