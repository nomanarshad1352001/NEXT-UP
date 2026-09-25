import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchConsole } from "@/components/search/console";
import { Kicker } from "@/components/motion";

export const metadata: Metadata = {
  title: "Search the Registry",
  description:
    "Search available baseball players by state, age, class year, and position. Full profiles are visible to subscribing coaches.",
};

function ConsoleFallback() {
  return <div className="h-40 animate-pulse rounded-lg border border-line bg-bone/50" />;
}

export default function SearchPage() {
  return (
    <div className="bg-cream">
      {/* dark hero band */}
      <section className="relative overflow-hidden bg-ink pt-40 pb-16 text-cream lg:pt-48 lg:pb-20">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/16547083/pexels-photo-16547083.jpeg?auto=compress&cs=tinysrgb&w=1800"
            alt="A packed baseball stadium under the lights"
            className="img-tint h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <Kicker index="⌕" light>
            Coach search console
          </Kicker>
          <h1 className="mt-6 max-w-3xl font-display text-5xl font-medium leading-[1.0] tracking-[-0.02em] sm:text-6xl">
            Find your next <em className="text-gold">difference-maker.</em>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/65">
            Filter by position, state, age, class year, and more — alone or in
            combination. We never blast profiles by radius; coaches search, and
            coach members see everything.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-10 pb-24 lg:px-10">
        <Suspense fallback={<ConsoleFallback />}>
          <SearchConsole />
        </Suspense>
      </section>
    </div>
  );
}
