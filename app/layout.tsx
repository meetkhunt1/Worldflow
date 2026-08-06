import type { Metadata } from "next";
import { Figtree, Almarai } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ButtonFx from "@/components/ButtonFx";

// Body font: Figtree.  Headline font: Almarai (trial — was Roboto Condensed).
const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-book",
  display: "swap",
});
const almarai = Almarai({
  weight: ["700", "800"],
  subsets: ["arabic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Leading Pipes & Fittings Manufacturers, India | WorldFlow",
  description:
    "WorldFlow is India's leading pipes & fittings manufacturer, offering premium CPVC, UPVC, SWR drainage and borewell column pipes for residential, commercial and industrial applications.",
  openGraph: {
    title: "WorldFlow | Pipes & Fittings",
    type: "website",
    siteName: "WorldFlow",
  },
  /*
   * Search Console / Webmaster Tools verification.
   *
   * Google supplies a tag like:
   *   <meta name="google-site-verification" content="AbC123..." />
   * Paste ONLY the content value below and uncomment the block — Next
   * renders the meta tag into <head> automatically.
   *
   * Tracking scripts do NOT go here. They belong in
   * components/Analytics.tsx.
   */
  // verification: {
  //   google: "PASTE_THE_CONTENT_VALUE_HERE",
  // },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${figtree.variable} ${almarai.variable}`}>
      <body>
        {/* Kept first in <body> — GTM's <noscript> fallback must appear
            as early as possible. See components/Analytics.tsx. */}
        <Analytics />
        <Preloader />
        <ButtonFx />
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
