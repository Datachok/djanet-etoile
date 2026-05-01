"use client";

import { motion } from "framer-motion";

/**
 * Croix d'Agadez (Croix du Sud Touarègue) — pendentif vertical fidèle.
 *
 * Géométrie (viewBox 120×240, ratio 1:2) :
 *   - Lance pointue au sommet, surmontée d'un triangle gravé
 *   - 2 cornes latérales avec bulbes (les "antennes" de la croix)
 *   - Anneau central avec triangle inscrit (cœur du pendentif)
 *   - Corps ovoïde allongé, gravé d'un losange
 *   - 2 bras horizontaux à terminaison "club" (massue arrondie)
 *   - Pointe inférieure avec deux perles pendantes
 *
 * Animation : tracé séquentiel ~2.4s, s'arrête à l'état final (pas de boucle).
 * Couleur : currentColor → s'adapte au thème.
 */
export default function AgadezCross({
  size = 28,
  className = "",
  animateIn = true,
  strokeWidth = 2,
}) {
  // Largeur ratio 1:2 (vertical) — on ajuste la width
  const width = size * (120 / 240);
  const height = size * (240 / 240);

  const draw = animateIn
    ? { hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 1 } }
    : { hidden: { pathLength: 1, opacity: 1 }, show: { pathLength: 1, opacity: 1 } };

  const pop = animateIn
    ? { hidden: { scale: 0, opacity: 0 }, show: { scale: 1, opacity: 1 } }
    : { hidden: { scale: 1, opacity: 1 }, show: { scale: 1, opacity: 1 } };

  return (
    <motion.svg
      viewBox="0 0 120 240"
      width={width}
      height={height}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`text-ocre ${className}`}
      initial="hidden"
      animate="show"
      whileHover={{ scale: 1.04 }}
      transition={{ scale: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
      style={{ overflow: "visible" }}
    >
      <defs>
        <radialGradient id="agadez-glow-v" cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.14" />
          <stop offset="70%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Halo doux derrière */}
      <motion.ellipse
        cx="60"
        cy="130"
        rx="70"
        ry="115"
        fill="url(#agadez-glow-v)"
        stroke="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.8 }}
      />

      <motion.g
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.08, when: "beforeChildren" }}
      >
        {/* === HAUT — lance + triangle de base === */}
        {/* Lance pointue */}
        <motion.path
          d="M 60 6 L 56 30 L 64 30 Z"
          variants={draw}
          transition={{ duration: 0.9 }}
        />
        {/* Triangle sous la lance */}
        <motion.path
          d="M 48 30 L 72 30 L 60 56 Z"
          variants={draw}
          transition={{ duration: 1.1 }}
        />
        {/* Mini-losange engravé dans le triangle (détail forge) */}
        <motion.path
          d="M 60 38 L 64 44 L 60 50 L 56 44 Z"
          variants={draw}
          transition={{ duration: 0.7 }}
        />

        {/* === CORNES LATÉRALES avec bulbes === */}
        <motion.path
          d="M 50 36 L 32 50"
          variants={draw}
          transition={{ duration: 0.8 }}
        />
        <motion.circle cx="29" cy="51" r="3.4" fill="currentColor" stroke="none" variants={pop} />
        <motion.path
          d="M 70 36 L 88 50"
          variants={draw}
          transition={{ duration: 0.8 }}
        />
        <motion.circle cx="91" cy="51" r="3.4" fill="currentColor" stroke="none" variants={pop} />

        {/* === ANNEAU CENTRAL === */}
        <motion.circle
          cx="60"
          cy="80"
          r="18"
          variants={draw}
          transition={{ duration: 1.4 }}
        />
        {/* Triangle inscrit dans l'anneau (signature) */}
        <motion.path
          d="M 60 70 L 71 92 L 49 92 Z"
          variants={draw}
          transition={{ duration: 1.0 }}
        />

        {/* === CORPS OVOÏDE allongé === */}
        <motion.path
          d="M 60 98
             C 48 100, 42 116, 42 138
             C 42 158, 50 175, 60 192
             C 70 175, 78 158, 78 138
             C 78 116, 72 100, 60 98 Z"
          variants={draw}
          transition={{ duration: 1.8 }}
        />
        {/* Mini-losange engravé dans le corps */}
        <motion.path
          d="M 60 130 L 66 145 L 60 160 L 54 145 Z"
          variants={draw}
          transition={{ duration: 0.8 }}
        />
        {/* Petits points latéraux (ciselures) */}
        <motion.circle cx="50" cy="120" r="0.9" fill="currentColor" stroke="none" variants={pop} />
        <motion.circle cx="70" cy="120" r="0.9" fill="currentColor" stroke="none" variants={pop} />
        <motion.circle cx="48" cy="155" r="0.9" fill="currentColor" stroke="none" variants={pop} />
        <motion.circle cx="72" cy="155" r="0.9" fill="currentColor" stroke="none" variants={pop} />

        {/* === BRAS HORIZONTAUX avec terminaison "club" === */}
        {/* Bras gauche : tige courbée + tête bulbeuse */}
        <motion.path
          d="M 44 140 C 28 138, 16 144, 8 156"
          variants={draw}
          transition={{ duration: 1.0 }}
        />
        <motion.path
          d="M 8 156 C 4 162, 6 170, 14 172 C 22 174, 28 168, 30 160 C 30 154, 38 150, 44 148"
          variants={draw}
          transition={{ duration: 1.2 }}
        />
        {/* Bras droit : miroir */}
        <motion.path
          d="M 76 140 C 92 138, 104 144, 112 156"
          variants={draw}
          transition={{ duration: 1.0 }}
        />
        <motion.path
          d="M 112 156 C 116 162, 114 170, 106 172 C 98 174, 92 168, 90 160 C 90 154, 82 150, 76 148"
          variants={draw}
          transition={{ duration: 1.2 }}
        />

        {/* === BAS — pointe et perles pendantes === */}
        {/* Petite arche au bas du corps */}
        <motion.path
          d="M 54 196 Q 60 204 66 196"
          variants={draw}
          transition={{ duration: 0.7 }}
        />
        {/* Deux perles pendantes */}
        <motion.circle cx="54" cy="212" r="3" fill="currentColor" stroke="none" variants={pop} />
        <motion.circle cx="66" cy="212" r="3" fill="currentColor" stroke="none" variants={pop} />
        {/* Petit losange final entre les perles */}
        <motion.path
          d="M 60 222 L 63 226 L 60 230 L 57 226 Z"
          variants={draw}
          transition={{ duration: 0.5 }}
        />
      </motion.g>
    </motion.svg>
  );
}
