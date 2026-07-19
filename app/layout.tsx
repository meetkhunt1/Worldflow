import type { Metadata } from "next";
import { Figtree, Almarai } from "next/font/google";
import "./globals.css";
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
  title: "WorldFlow | Pipes & Fittings",
  description:
    "The complete WorldFlow range — every pipe engineered to slot seamlessly into the system.",
  openGraph: {
    title: "WorldFlow | Pipes & Fittings",
    type: "website",
    siteName: "WorldFlow",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${figtree.variable} ${almarai.variable}`}>
      <body>
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
