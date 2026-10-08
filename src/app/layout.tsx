import type { Metadata, Viewport } from "next";
import { Cinzel, Hanken_Grotesk } from "next/font/google";
import { SITE } from "@/content/site";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Poglio Roberto · Vini di Castelnuovo Calcea, Asti",
    template: "%s · Poglio Roberto",
  },
  description:
    "Barbera, Grignolino, Cortese e Nebbiolo dalla collina ad anfiteatro di Castelnuovo Calcea, nel Monferrato astigiano. Azienda Agricola Vitivinicola Poglio Roberto.",
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "Poglio Roberto",
    title: "Poglio Roberto · Dal primo Ottocento, la stessa collina",
    description: "Vini di famiglia dalle colline di Castelnuovo Calcea, Monferrato astigiano.",
    images: [{ url: "/images/vigna-neve.webp", width: 1200, height: 1600 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#17130F",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="it" className={`${cinzel.variable} ${hanken.variable}`}>
      <body>
        <noscript>
          <style>{`.reveal,.line>span{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
