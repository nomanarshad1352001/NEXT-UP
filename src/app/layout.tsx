import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { SmoothScroll } from "@/components/site/smooth-scroll";

const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display-var",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans-var",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono-var",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NEXT UP — The Player Registry for Baseball",
    template: "%s · NEXT UP",
  },
  description:
    "A private, searchable registry where available baseball players announce themselves — and subscribing coaches find them by position, age, and state.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="bg-cream font-sans text-ink antialiased">
        <SmoothScroll>
          <div className="grain" aria-hidden />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
