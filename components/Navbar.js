"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
        scrolled ? "glass border-b border-sand-200/60" : "bg-transparent"
      }`}
    >
      <nav className="container-x flex items-center justify-between px-6 md:px-10 lg:px-16 h-20">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-display font-semibold tracking-tight text-night">
            Djanet
          </span>
          <span className="text-2xl font-display font-light text-ocre italic">
            Étoile
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="px-4 py-2 rounded-full text-sm tracking-wide text-night/75 hover:text-night hover:bg-night/5 transition"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link href="/reservation" className="btn-primary text-sm">
            Réserver
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 rounded-full hover:bg-night/5"
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-sand-200/60 overflow-hidden"
          >
            <ul className="px-6 py-6 flex flex-col gap-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 rounded-xl text-night/80 hover:bg-night/5"
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
