"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "djanet-theme";
const TRANSITION_MS = 1800; // durée totale du crépuscule
const FLIP_AT = 0.55; // moment du basculement (% de la durée)

const ThemeCtx = createContext({
  theme: "light",
  toggling: false,
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeCtx);
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(null);
  const [toggling, setToggling] = useState(false);
  const [direction, setDirection] = useState("toDark"); // "toDark" | "toLight"
  const lockRef = useRef(false);

  // Sync initial theme from <html class="dark"> (set by ThemeScript)
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  // Suivi LIVE de la préférence système (jour/nuit OS) — uniquement
  // tant que l'utilisateur n'a pas explicitement choisi via le toggle.
  // Dès qu'il clique, sa préférence est stockée et prend la priorité.
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    const apply = (matches) => {
      // Si l'utilisateur a déjà cliqué, on respecte son choix manuel
      let stored = null;
      try {
        stored = localStorage.getItem(STORAGE_KEY);
      } catch {}
      if (stored === "light" || stored === "dark") return;

      const next = matches ? "dark" : "light";
      document.documentElement.classList.toggle("dark", next === "dark");
      setTheme(next);
    };

    const handler = (e) => apply(e.matches);

    // Couvre les deux APIs (Safari < 14 utilisait addListener)
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else if (mq.addListener) mq.addListener(handler);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else if (mq.removeListener) mq.removeListener(handler);
    };
  }, []);

  const toggle = useCallback(() => {
    if (lockRef.current || theme === null) return;
    lockRef.current = true;

    const next = theme === "dark" ? "light" : "dark";
    setDirection(next === "dark" ? "toDark" : "toLight");
    setToggling(true);

    // Bascule la classe au milieu de la transition (l'overlay masque le moment de switch)
    const flipAt = TRANSITION_MS * FLIP_AT;
    const flipTimeout = setTimeout(() => {
      document.documentElement.classList.toggle("dark", next === "dark");
      setTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {}
    }, flipAt);

    const endTimeout = setTimeout(() => {
      setToggling(false);
      lockRef.current = false;
    }, TRANSITION_MS);

    return () => {
      clearTimeout(flipTimeout);
      clearTimeout(endTimeout);
    };
  }, [theme]);

  return (
    <ThemeCtx.Provider value={{ theme, toggling, toggle }}>
      {children}
      <CrepusculeOverlay show={toggling} direction={direction} />
    </ThemeCtx.Provider>
  );
}

/**
 * Voile plein-écran, fondu crépuscule (couchant) ou aube (levant).
 * S'estompe au milieu du switch théorique pour masquer le flip.
 */
function CrepusculeOverlay({ show, direction }) {
  const dusk =
    "radial-gradient(ellipse at 50% 80%, rgba(199,123,60,0.55), transparent 55%), linear-gradient(180deg, #1b1428 0%, #4a2818 60%, #c77b3c 100%)";
  const dawn =
    "radial-gradient(ellipse at 50% 75%, rgba(244,181,122,0.55), transparent 55%), linear-gradient(180deg, #f3d8b6 0%, #e29a5a 50%, #2c1c30 100%)";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.85, 0.85, 0],
            transition: {
              duration: TRANSITION_MS / 1000,
              times: [0, 0.45, 0.6, 1],
              ease: [0.4, 0, 0.2, 1],
            },
          }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] pointer-events-none"
          style={{
            background: direction === "toDark" ? dusk : dawn,
            mixBlendMode: "normal",
          }}
        />
      )}
    </AnimatePresence>
  );
}
