"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CreditCard,
  Database,
  Megaphone,
  MessagesSquare,
  Search,
  ShieldCheck,
  UserRoundPen,
} from "lucide-react";
import { Counter, EASE, Kicker, LineGrow, Reveal } from "@/components/motion";
import { REGISTRY_STATS } from "@/lib/players";

/* ------------------------------------------------------------------ */
/*  WHY A REGISTRY                                                      */
/* ------------------------------------------------------------------ */

const WHY_POINTS = [
  {
    icon: Database,
    num: "01",
    title: "Structured, not scattered",
    body: "Every profile answers the same questions — position, age, state, measurables, video — in the same order. Coaches compare players in seconds instead of decoding five different post formats.",
  },
  {
    icon: Search,
    num: "02",
    title: "Search, don't scroll",
    body: "Coaches filter the registry by position, age, class year, state and more — combinations included. A 17-year-old lefty in Texas surfaces instantly. A Facebook post from March never does.",
  },
  {
    icon: MessagesSquare,
    num: "03",
    title: "A direct line, on the record",
    body: "Invites and contact requests happen inside the platform. No cold DMs buried under group-chat noise, no screenshot chains, no wondering who actually saw it.",
  },
  {
    icon: ShieldCheck,
    num: "04",
    title: "Private by design",
    body: "Profiles are visible only to verified, subscribing coaches. Not to the public, not to other players, not to an algorithm deciding who deserves reach today.",
  },
];

export function WhyRegistry() {
  return (
    <section id="why" className="relative bg-cream py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Kicker index="01">Why not social media</Kicker>
              <h2 className="mt-7 font-display text-4xl font-medium leading-[1.02] tracking-[-0.01em] sm:text-5xl lg:text-[3.4rem]">
                The group chat was never built for{" "}
                <em className="text-clay">recruiting.</em>
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-ink/60">
                The industry already does this dance — a text post, a tagged
                video, a prayer. It works until the feed moves on. A registry is
                what that process becomes when you give it structure: permanent,
                searchable, and built for the two people who matter.
              </p>
              <div className="relative mt-9 overflow-hidden rounded-md border border-line">
                <img
                  src="https://images.pexels.com/photos/12783350/pexels-photo-12783350.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Vintage baseballs resting in a leather glove by a chain-link fence"
                  className="img-tint aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                <p className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.28em] text-cream/90">
                  Fig. 01 — Talent deserves a filing system
                </p>
              </div>
            </Reveal>
          </div>

          <div>
            {WHY_POINTS.map((p, i) => (
              <Reveal key={p.num} delay={i * 0.08}>
                <div className="group grid gap-5 border-t border-line py-9 first:border-t-0 first:pt-0 sm:grid-cols-[56px_1fr_auto] sm:gap-8">
                  <span className="font-mono text-xs tracking-[0.2em] text-clay">{p.num}</span>
                  <div>
                    <h3 className="flex items-center gap-3 font-display text-2xl font-medium tracking-[-0.01em] lg:text-[1.7rem]">
                      <p.icon className="h-5 w-5 text-brass" strokeWidth={1.6} />
                      {p.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink/60">
                      {p.body}
                    </p>
                  </div>
                  <ArrowUpRight className="mt-1 hidden h-5 w-5 text-ink/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brass sm:block" />
                </div>
                {i < WHY_POINTS.length - 1 && <div className="h-px bg-line" />}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  METRICS BAND                                                        */
/* ------------------------------------------------------------------ */

export function MetricsBand() {
  const items = [
    { label: "Players listed", value: REGISTRY_STATS.players, suffix: "+" },
    { label: "Coaches subscribed", value: REGISTRY_STATS.coaches, suffix: "" },
    { label: "States represented", value: REGISTRY_STATS.states, suffix: "" },
    { label: "Invites delivered", value: REGISTRY_STATS.invitesSent, suffix: "+" },
  ];
  return (
    <section className="border-y border-white/[0.07] bg-pine text-cream">
      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {items.map((s, i) => (
          <div
            key={s.label}
            className={`px-6 py-12 lg:px-10 lg:py-16 ${i > 0 ? "border-l border-white/[0.07]" : ""} ${
              i >= 2 ? "border-t border-white/[0.07] lg:border-t-0" : ""
            }`}
          >
            <p className="font-display text-4xl font-medium tracking-tight text-gold lg:text-[3.2rem]">
              <Counter to={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.26em] text-cream/50">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  HOW IT WORKS                                                        */
/* ------------------------------------------------------------------ */

const PATHS = [
  {
    tag: "For players",
    price: "$1 / month",
    headline: "Put your name in the book.",
    accent: false,
    steps: [
      {
        icon: CreditCard,
        num: "01",
        title: "Start your membership",
        body: "A one-dollar monthly subscription keeps the registry clean and verifies you're serious. Cancel anytime.",
      },
      {
        icon: Megaphone,
        num: "02",
        title: "Build your announcement",
        body: "A standardized questionnaire — position, age, state, measurables — plus your photos, video, and story. Live in minutes.",
      },
      {
        icon: UserRoundPen,
        num: "03",
        title: "Manage it from your portal",
        body: "Own login, own page. Update film, stats, and availability whenever the season changes.",
      },
    ],
  },
  {
    tag: "For coaches",
    price: "$3 / month",
    headline: "Search like a front office.",
    accent: true,
    steps: [
      {
        icon: CreditCard,
        num: "01",
        title: "Activate coach access",
        body: "Your subscription unlocks the full registry — every profile, photo, and video in the book.",
      },
      {
        icon: Search,
        num: "02",
        title: "Search by what you need",
        body: "Filter by state, age, class year, position, and more — alone or combined. No radius blasts. Pure search.",
      },
      {
        icon: MessagesSquare,
        num: "03",
        title: "Contact & invite directly",
        body: "Open a private line to the player, send a roster invite, and track your shortlist from your portal.",
      },
    ],
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative overflow-hidden bg-ink py-24 text-cream lg:py-36">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "radial-gradient(800px 400px at 85% 0%, rgba(195,160,74,0.35), transparent), radial-gradient(700px 500px at 0% 100%, rgba(36,80,61,0.5), transparent)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
        <Reveal className="max-w-2xl">
          <Kicker index="02" light>
            How it works
          </Kicker>
          <h2 className="mt-7 font-display text-4xl font-medium leading-[1.02] tracking-[-0.01em] sm:text-5xl lg:text-[3.4rem]">
            Two doors in.{" "}
            <em className="text-gold">One standard of quality.</em>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {PATHS.map((path, pi) => (
            <Reveal key={path.tag} delay={pi * 0.12}>
              <div
                className={`relative h-full rounded-lg border p-8 lg:p-10 ${
                  path.accent
                    ? "border-brass/50 bg-moss/40 shadow-[0_0_80px_rgba(195,160,74,0.08)]"
                    : "border-white/[0.09] bg-white/[0.03]"
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-brass">
                    {path.tag}
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/50">
                    {path.price}
                  </p>
                </div>
                <h3 className="mt-5 font-display text-3xl font-medium tracking-[-0.01em]">
                  {path.headline}
                </h3>
                <div className="mt-9 space-y-0">
                  {path.steps.map((s, i) => (
                    <div
                      key={s.num}
                      className={`flex gap-5 py-5 ${i > 0 ? "border-t border-white/[0.08]" : ""}`}
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brass/40 bg-brass/10">
                        <s.icon className="h-4 w-4 text-gold" strokeWidth={1.6} />
                      </span>
                      <div>
                        <p className="font-display text-lg font-medium">
                          <span className="mr-2 font-mono text-[10px] tracking-[0.2em] text-brass">
                            {s.num}
                          </span>
                          {s.title}
                        </p>
                        <p className="mt-1.5 max-w-md text-sm leading-relaxed text-cream/55">
                          {s.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  href={path.accent ? "/signup?role=coach" : "/signup?role=player"}
                  className={`group mt-8 inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                    path.accent
                      ? "bg-gold text-ink hover:bg-brass"
                      : "border border-cream/25 text-cream hover:border-gold/60 hover:text-gold"
                  }`}
                >
                  {path.accent ? "Start as a coach" : "Start as a player"}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  BIG QUOTE                                                           */
/* ------------------------------------------------------------------ */

export function BigQuote() {
  return (
    <section className="relative bg-cream py-24 lg:py-36">
      <div className="mx-auto max-w-5xl px-5 text-center lg:px-10">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-clay">
            From the coaches&rsquo; dugout
          </p>
          <blockquote className="mt-8 font-display text-3xl font-light leading-[1.18] tracking-[-0.01em] text-ink sm:text-4xl lg:text-[3.1rem]">
            &ldquo;We stopped scrolling recruiting groups. Two filters, three
            emails, and a forty-man watchlist became{" "}
            <em className="text-clay">four roster spots</em> — in one
            weekend.&rdquo;
          </blockquote>
          <LineGrow className="mx-auto mt-10 h-px w-24 bg-brass" />
          <p className="mt-6 font-mono text-[11.5px] uppercase tracking-[0.26em] text-ink/55">
            Dan Whitfield — Head Coach, Carolina Knights 18U
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA BAND                                                            */
/* ------------------------------------------------------------------ */

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/34087592/pexels-photo-34087592.jpeg?auto=compress&cs=tinysrgb&w=1800"
          alt="Twilight over a baseball stadium"
          className="img-tint h-full w-full object-cover opacity-35"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/75 to-ink" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-gold">
            The book is open
          </p>
          <h2 className="mt-6 font-display text-4xl font-medium leading-[1.03] tracking-[-0.01em] text-cream sm:text-5xl lg:text-6xl">
            Announce yourself, or come{" "}
            <em className="text-gold">find the next one.</em>
          </h2>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2">
          {[
            {
              href: "/signup?role=player",
              role: "I&rsquo;m a player",
              price: "$1/mo",
              copy: "Create your searchable profile with photos, video, and verified measurables.",
            },
            {
              href: "/signup?role=coach",
              role: "I&rsquo;m a coach",
              price: "$3/mo",
              copy: "Unlock the full registry — search, contact, and invite players directly.",
            },
          ].map((c, i) => (
            <motion.div
              key={c.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
            >
              <Link
                href={c.href}
                className="group flex h-full flex-col justify-between rounded-lg border border-cream/15 bg-ink/60 p-8 backdrop-blur-sm transition-all duration-500 hover:border-gold/60 hover:bg-ink/80"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <p className="font-display text-2xl font-medium text-cream">{c.role}</p>
                    <p className="rounded-full border border-brass/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                      {c.price}
                    </p>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-cream/60">{c.copy}</p>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-gold">
                  Continue
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
