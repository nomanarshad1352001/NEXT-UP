"use client";

import Link from "next/link";
import { ArrowRight, Check, Lock } from "lucide-react";
import { Kicker, LineGrow, Reveal } from "@/components/motion";
import { PlayerCard } from "@/components/players/card";
import { players } from "@/lib/players";

export function FeaturedProspects() {
  const featured = players.filter((p) => p.featured);

  return (
    <section id="featured" className="bg-cream py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <Kicker index="03">On the board this week</Kicker>
            <h2 className="mt-7 max-w-xl font-display text-4xl font-medium leading-[1.02] tracking-[-0.01em] sm:text-5xl">
              A sample from the <em className="text-clay">registry.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col items-start gap-4">
              <p className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink/50">
                <Lock className="h-3.5 w-3.5 text-brass" />
                Full profiles reserved for subscribing coaches
              </p>
              <Link
                href="/search"
                className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-cream transition-colors duration-300 hover:bg-moss"
              >
                Search the full registry
                <ArrowRight className="h-3.5 w-3.5 text-gold transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <PlayerCard key={p.id} player={p} index={i} locked />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const PLANS = [
  {
    name: "Player",
    price: "$1",
    tag: "Get announced",
    desc: "Your own page in the registry — structured, searchable, and seen only by coaches who subscribe.",
    features: [
      "Individual player profile page",
      "Photo gallery & highlight video",
      "Standardized, searchable measurables",
      "Direct invites from subscribing coaches",
      "Own login & account portal",
      "Cancel anytime",
    ],
    cta: "Announce yourself",
    href: "/signup?role=player",
    dark: false,
  },
  {
    name: "Coach",
    price: "$3",
    tag: "Find them first",
    desc: "Full registry access. Search by state, age, class, position, and more — then contact players directly.",
    features: [
      "Unlimited registry search",
      "Advanced filters & combinations",
      "View every full player profile",
      "Contact & invite players directly",
      "Shortlist & watchlist tools",
      "Cancel anytime",
    ],
    cta: "Unlock the registry",
    href: "/signup?role=coach",
    dark: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-line bg-bone/60 py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Kicker index="04">Membership</Kicker>
          </div>
          <h2 className="mt-7 font-display text-4xl font-medium leading-[1.02] tracking-[-0.01em] sm:text-5xl">
            Serious prices for <em className="text-clay">serious people.</em>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/60">
            The low monthly fee isn&rsquo;t the product — it&rsquo;s the door. It
            keeps every profile real, every coach verifiable, and the entire
            registry free of noise.
          </p>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-4xl gap-6 lg:grid-cols-2">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.1}>
              <div
                className={`relative flex h-full flex-col rounded-lg border p-8 lg:p-10 ${
                  plan.dark
                    ? "border-brass/50 bg-ink text-cream shadow-[0_30px_80px_rgba(10,20,15,0.35)]"
                    : "border-line bg-cream"
                }`}
              >
                {plan.dark && (
                  <span className="absolute -top-3 left-8 rounded-full bg-gold px-3 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.2em] text-ink">
                    Full access
                  </span>
                )}
                <div className="flex items-baseline justify-between">
                  <p
                    className={`font-mono text-[11px] uppercase tracking-[0.32em] ${
                      plan.dark ? "text-gold" : "text-clay"
                    }`}
                  >
                    {plan.tag}
                  </p>
                  <p className={`font-mono text-[10px] uppercase tracking-[0.2em] ${plan.dark ? "text-cream/45" : "text-ink/45"}`}>
                    {plan.name}
                  </p>
                </div>
                <div className="mt-6 flex items-end gap-2">
                  <span className="font-display text-6xl font-medium tracking-tight lg:text-7xl">
                    {plan.price}
                  </span>
                  <span className={`pb-2 font-mono text-[11px] uppercase tracking-[0.2em] ${plan.dark ? "text-cream/50" : "text-ink/50"}`}>
                    / month
                  </span>
                </div>
                <p className={`mt-5 text-[15px] leading-relaxed ${plan.dark ? "text-cream/60" : "text-ink/60"}`}>
                  {plan.desc}
                </p>
                <LineGrow className={`mt-7 h-px ${plan.dark ? "bg-brass/40" : "bg-line"}`} />
                <ul className="mt-6 space-y-3.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span
                        className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full ${
                          plan.dark ? "bg-brass/20" : "bg-ink/[0.06]"
                        }`}
                      >
                        <Check className={`h-2.5 w-2.5 ${plan.dark ? "text-gold" : "text-fern"}`} strokeWidth={3} />
                      </span>
                      <span className={plan.dark ? "text-cream/75" : "text-ink/75"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`group mt-9 inline-flex items-center justify-center gap-2.5 rounded-full py-4 font-mono text-[11.5px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                    plan.dark
                      ? "bg-gold text-ink hover:bg-brass"
                      : "bg-ink text-cream hover:bg-moss"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-10 text-center">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.26em] text-ink/45">
            Secure payments via Stripe · No contracts · Cancel anytime
          </p>
        </Reveal>
      </div>
    </section>
  );
}
