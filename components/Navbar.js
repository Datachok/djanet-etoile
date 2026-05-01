"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AgadezCross from "@/components/AgadezCross";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/circuits", label: "Circuits" },
  { href: "/heritage", label: "Héritage" },
  { href: "/humanitaire", label: "Humanitaire" },
  { href: "/about", label: "À propos" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b"
          : "bg-transparent border-b border-transparent"
      }`}
      style={scrolled ? { borderColor: "var(--border-soft)" } : undefined}
    >
      <nav className="container-x flex items-center justify-between px-6 md:px-10 lg:px-16 h-24">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="text-ocre">
            <AgadezCross size={64} strokeWidth={2.6} />
          </span>
          <span className="flex items-baseline gap-1.5">
            <span className="text-2xl md:text-3xl font-display font-semibold tracking-tight" style={{ color: "var(--fg)" }}>
              Djanet
            </span>
            <span className="text-2xl md:text-3xl font-display font-light italic" style={{ color: "var(--ocre)" }}>
              Étoile
            </span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="px-4 py-2 rounded-full text-sm tracking-wide transition"
                style={{ color: "var(--fg-soft)" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Link href="/reservation" className="btn-primary text-sm">
            Réserver
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-1">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-full transition hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Menu"
            style={{ color: "var(--fg)" }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t overflow-hidden"
            style={{ borderColor: "var(--border-soft)" }}
          >
            <ul className="px-6 py-6 flex flex-col gap-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 rounded-xl transition hover:bg-black/5 dark:hover:bg-white/10"
                    style={{ color: "var(--fg-soft)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/reservation"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full mt-2"
                >
                  Réserver
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
