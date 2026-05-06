import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarrySky from "@/components/StarrySky";
import ThemeScript from "@/components/ThemeScript";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata = {
  title: "Djanet Étoile — Expéditions Touaregs au Sahara Algérien",
  description:
    "Voyages d'exception au cœur du Sahara algérien. Tassili n'Ajjer, Tadrart, oasis cachées — guides Touaregs, bivouacs étoilés, héritage millénaire.",
  keywords: [
    "Sahara",
    "Algérie",
    "Djanet",
    "Tassili",
    "Tadrart",
    "voyage désert",
    "Touareg",
    "expédition",
  ],
  openGraph: {
    title: "Djanet Étoile — Expéditions au Sahara Algérien",
    description:
      "Plongée immersive dans le Tassili n'Ajjer et la Tadrart. Guides Touaregs, bivouacs étoilés.",
    type: "website",
    images: ["/pics/hero-1.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <ThemeProvider>
          <StarrySky />
          <Navbar />
          <main className="min-h-screen relative">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
