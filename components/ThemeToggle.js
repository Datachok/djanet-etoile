"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

/**
 * Switch Jour/Nuit — pill segmenté à 2 cases, indicateur glissant.
 * Layout grid 2 colonnes pour un centrage millimétrique.
 *
 * Mode nuit : tout le fond du toggle devient un ciel étoilé scintillant.
 * Mode jour : voile doré sur tout le fond.
 */
const TRACK_W = 72;
const TRACK_H = 34;
const PAD = 2;
const CELL = (TRACK_W - PAD * 2) / 2; // 34

// Étoiles réparties sur toute la surface du toggle (mode nuit)
const TOGGLE_STARS = [
  { x: 6, y: 7, d: 0 },
  { x: 12, y: 18, d: 0.4 },
  { x: 22, y: 9, d: 0.9 },
  { x: 30, y: 22, d: 1.3 },
  { x: 40, y: 6, d: 1.7 },
  { x: 50, y: 17, d: 0.2 },
  { x: 56, y: 8, d: 1.1 },
  { x: 62, y: 23, d: 0.6 },
];

export default function ThemeToggle({ className = "" }) {
  const { theme, toggle, toggling } = useTheme();

  if (theme === null) {
    return (
      <span
        aria-hidden
        className={`block rounded-full opacity-30 ${className}`}
        style={{ width: TRACK_W, height: TRACK_H }}
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      disabled={toggling}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Activer le mode jour" : "Activer le mode nuit"}
      className={`relative grid grid-cols-2 items-center rounded-full disabled:cursor-wait focus:outline-none focus-visible:ring-2 focus-visible:ring-ocre/40 transition-colors duration-700 overflow-hidden ${className}`}
      style={{
        width: TRACK_W,
        height: TRACK_H,
        background: isDark
          ? "radial-gradient(ellipse at 50% 50%, #15102b 0%, #08051a 100%)"
          : "color-mix(in srgb, var(--fg) 6%, transparent)",
        border: "1px solid color-mix(in srgb, var(--ocre) 35%, transparent)",
        boxShadow:
          "inset 0 1px 2px color-mix(in srgb, var(--fg) 8%, transparent)",
      }}
    >
      {/* Voile doré qui couvre tout le fond en mode jour */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: isDark ? 0 : 1,
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(255,233,176,0.5), transparent 75%)",
        }}
      />

      {/* Étoiles scintillantes — couvrent tout le toggle en mode nuit */}
      {TOGGLE_STARS.map((s, i) => (
        <span
          key={i}
          aria-hidden
          className="pointer-events-none absolute rounded-full bg-white"
          style={{
            width: 1.6,
            height: 1.6,
            top: s.y,
            left: s.x,
            opacity: isDark ? 1 : 0,
            transition: "opacity 0.7s ease",
            animation: isDark
              ? `toggle-twinkle 2.6s ease-in-out infinite ${s.d}s`
              : "none",
            boxShadow: "0 0 4px rgba(255,255,255,0.95), 0 0 8px rgba(255,231,194,0.5)",
          }}
        />
      ))}

      {/* Indicateur qui glisse */}
      <motion.span
        layout
        initial={false}
        aria-hidden
        animate={{ x: isDark ? CELL : 0 }}
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
        className="absolute top-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: PAD,
          width: CELL,
          height: TRACK_H - PAD * 2,
          background:
            "linear-gradient(135deg, var(--ocre-light) 0%, var(--ocre) 100%)",
          boxShadow:
            "0 2px 8px color-mix(in srgb, var(--ocre) 35%, transparent), inset 0 1px 1px rgba(255,248,225,0.4)",
        }}
      />

      {/* Cellule SOLEIL */}
      <span
        className="relative z-10 flex items-center justify-center transition-colors duration-500"
        style={{
          height: TRACK_H,
          color: isDark ? "rgba(245,235,217,0.45)" : "#fff8e1",
        }}
      >
        <SunGlyph />
      </span>

      {/* Cellule LUNE */}
      <span
        className="relative z-10 flex items-center justify-center transition-colors duration-500"
        style={{
          height: TRACK_H,
          color: isDark ? "#fff8e1" : "var(--fg-muted)",
        }}
      >
        <MoonGlyph />
      </span>

      <style jsx>{`
        @keyframes toggle-twinkle {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.5); }
        }
      `}</style>
    </button>
  );
}

function SunGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" style={{ display: "block" }}>
      <circle cx="12" cy="12" r="3.5" fill="currentColor" stroke="none" />
      {[
        [12, 2.5, 12, 4.5], [12, 19.5, 12, 21.5],
        [2.5, 12, 4.5, 12], [19.5, 12, 21.5, 12],
        [5.4, 5.4, 6.8, 6.8], [17.2, 17.2, 18.6, 18.6],
        [5.4, 18.6, 6.8, 17.2], [17.2, 6.8, 18.6, 5.4],
      ].map(([x1, y1, x2, y2], i) => <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />)}
    </svg>
  );
}

function MoonGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style={{ display: "block" }}>
      <path d="M 19 14.5 A 8.5 8.5 0 1 1 9.5 5 A 6.5 6.5 0 0 0 19 14.5 Z" />
    </svg>
  );
}
