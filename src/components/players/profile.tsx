"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bookmark,
  Check,
  Gauge,
  GraduationCap,
  Lock,
  MapPin,
  Play,
  Ruler,
  Send,
  ShieldCheck,
  Timer,
  Trophy,
  Zap,
} from "lucide-react";
import type { Player } from "@/lib/players";
import { PlayerCard } from "@/components/players/card";
import { Counter, EASE, Kicker, LineGrow, Reveal } from "@/components/motion";

/* ------------------------------- gate ------------------------------- */

function CoachGate({ player, onUnlock }: { player: Player; onUnlock: () => void }) {
  return (
    <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink pt-[74px]">
      <div className="absolute inset-0">
        <img
          src={player.cover}
          alt=""
          className="h-full w-full scale-105 object-cover opacity-25 blur-[3px]"
          style={{ filter: "saturate(0.7) contrast(1.05) blur(3px)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/80 to-ink" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative z-10 mx-5 w-full max-w-lg"
      >
        <div className="rounded-lg border border-brass/30 bg-pine/80 p-8 text-center text-cream shadow-[0_40px_100px_rgba(0,0,0,0.5)] backdrop-blur-md lg:p-10">
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brass/15 ring-1 ring-brass/50"
          >
            <Lock className="h-6 w-6 text-gold" />
          </motion.span>
          <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.34em] text-gold">
            Members-only profile
          </p>
          <h1 className="mt-4 font-display text-3xl font-medium leading-tight tracking-[-0.01em]">
            {player.name}&rsquo;s page is reserved for{" "}
            <em className="text-gold">subscribing coaches.</em>
          </h1>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-cream/60">
            {player.primary} · {player.age} · {player.city}, {player.state} · Class of{" "}
            {player.gradYear}. Full measurables, video, contact, and coach notes unlock
            with a coach membership — $3/month.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/signup?role=coach"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-gold px-6 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass"
            >
              Subscribe as a coach — $3/mo
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            <button
              onClick={onUnlock}
              className="inline-flex items-center justify-center gap-3 rounded-full border border-cream/20 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-cream/80 transition-all hover:border-gold/60 hover:text-gold"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Continue with demo coach access
            </button>
          </div>
          <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.22em] text-cream/35">
            Never listed publicly · No scraping · No radius blasts
          </p>
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cream/50 transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-3 w-3" /> Back to the registry
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------ profile ----------------------------- */

export function PlayerProfile({ player, similar }: { player: Player; similar: Player[] }) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [saved, setSaved] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setUnlocked(sessionStorage.getItem("nextup_coach") === "1");
  }, []);

  const unlock = () => {
    sessionStorage.setItem("nextup_coach", "1");
    setUnlocked(true);
  };

  if (unlocked === null) {
    return <div className="min-h-[100svh] bg-ink" />;
  }

  if (!unlocked) {
    return <CoachGate player={player} onUnlock={unlock} />;
  }

  const vitals = [
    { label: "Age", value: String(player.age) },
    { label: "Class", value: String(player.gradYear) },
    { label: "Height", value: player.height },
    { label: "Weight", value: `${player.weight} lbs` },
    { label: "B/T", value: `${player.bats} / ${player.throws}` },
    { label: "Base", value: `${player.city}, ${player.state}` },
  ];

  const metrics = [
    player.metrics.maxVelo
      ? { icon: Gauge, label: "Max fastball", value: player.metrics.maxVelo, suffix: " mph", decimals: 0 }
      : null,
    player.metrics.sixty
      ? { icon: Timer, label: "60-yard dash", value: player.metrics.sixty, suffix: " s", decimals: 2 }
      : null,
    player.metrics.popTime
      ? { icon: Zap, label: "Pop time", value: player.metrics.popTime, suffix: " s", decimals: 2 }
      : null,
    player.metrics.exitVelo
      ? { icon: Zap, label: "Exit velocity", value: player.metrics.exitVelo, suffix: " mph", decimals: 0 }
      : null,
    { icon: GraduationCap, label: "GPA", value: player.gpa, suffix: "", decimals: 1 },
  ].filter(Boolean) as { icon: typeof Gauge; label: string; value: number; suffix: string; decimals: number }[];

  return (
    <div className="bg-cream">
      {/* ---------------- hero ---------------- */}
      <section className="relative overflow-hidden bg-ink pt-[74px] text-cream">
        <div className="absolute inset-0">
          <img src={player.cover} alt="" className="img-tint h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-12 lg:px-10 lg:pb-24 lg:pt-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-cream/50"
          >
            <Link href="/search" className="inline-flex items-center gap-1.5 transition-colors hover:text-gold">
              <ArrowLeft className="h-3 w-3" /> Registry
            </Link>
            <span>/</span>
            <span>{player.state}</span>
            <span>/</span>
            <span className="text-gold">{player.pos[0]}</span>
          </motion.div>

          <div className="mt-10 grid items-end gap-12 lg:grid-cols-[1.35fr_1fr]">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="flex flex-wrap items-center gap-2.5"
              >
                <span className="flex items-center gap-1.5 rounded-full bg-brass/15 px-3.5 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.2em] text-gold ring-1 ring-brass/40">
                  <span className="h-1 w-1 rounded-full bg-brass pulse-dot" />
                  {player.status}
                </span>
                {player.pos.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-cream/20 px-3.5 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.2em] text-cream/70"
                  >
                    {p}
                  </span>
                ))}
                <span className="flex items-center gap-1.5 rounded-full border border-cream/20 px-3.5 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.2em] text-cream/70">
                  <BadgeCheck className="h-3 w-3 text-brass" /> Verified measurables
                </span>
              </motion.div>

              <h1 className="mt-7 font-display text-[16vw] font-medium leading-[0.92] tracking-[-0.02em] sm:text-[12vw] lg:text-[6.4rem]">
                {player.name.split(" ").map((w, i) => (
                  <span key={w} className="block overflow-hidden">
                    <motion.span
                      className="block"
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1, delay: 0.18 + i * 0.12, ease: EASE }}
                    >
                      {w}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
                className="mt-6 max-w-xl font-display text-xl font-light italic leading-snug text-gold/90 lg:text-2xl"
              >
                &ldquo;{player.headline}&rdquo;
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.62, ease: EASE }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <a
                  href="#invite"
                  className="group inline-flex items-center gap-3 rounded-full bg-gold px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass"
                >
                  <Send className="h-3.5 w-3.5" />
                  Invite to your roster
                </a>
                <button
                  onClick={() => setSaved((s) => !s)}
                  className={`inline-flex items-center gap-2.5 rounded-full border px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-all ${
                    saved
                      ? "border-gold/70 bg-gold/10 text-gold"
                      : "border-cream/25 text-cream/75 hover:border-gold/60 hover:text-gold"
                  }`}
                >
                  <Bookmark className={`h-3.5 w-3.5 ${saved ? "fill-gold" : ""}`} />
                  {saved ? "Shortlisted" : "Shortlist"}
                </button>
              </motion.div>
            </div>

            {/* portrait stack */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: EASE }}
              className="relative mx-auto w-full max-w-sm lg:max-w-none"
            >
              <div className="absolute -left-3 -top-3 h-full w-full rounded-md border border-brass/40" />
              <img
                src={player.image}
                alt={`${player.name}, ${player.primary}`}
                className="img-tint relative aspect-[3/4] w-full rounded-md object-cover"
              />
              <div className="absolute bottom-5 left-5 right-5 rounded-md border border-white/10 bg-ink/70 px-5 py-4 backdrop-blur-md">
                <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-gold">{player.primary}</p>
                <p className="mt-1.5 flex items-center gap-2 text-[13px] text-cream/75">
                  <MapPin className="h-3.5 w-3.5 text-brass" />
                  {player.school} · {player.travel}
                </p>
              </div>
            </motion.div>
          </div>

          {/* vitals grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
            className="mt-14 grid grid-cols-3 gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 sm:grid-cols-6"
          >
            {vitals.map((v) => (
              <div key={v.label} className="bg-ink/90 px-4 py-5">
                <p className="font-mono text-[8.5px] uppercase tracking-[0.28em] text-cream/40">{v.label}</p>
                <p className="mt-2 font-display text-xl font-medium text-cream">{v.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------------- metrics band ---------------- */}
      <section className="border-b border-line bg-cream">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-line sm:grid-cols-3 lg:grid-cols-5">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.06} className={`border-l border-line first:border-l-0 ${i >= 3 ? "hidden sm:block" : ""}`}>
              <div className="px-6 py-9 lg:px-8">
                <m.icon className="h-4 w-4 text-brass" strokeWidth={1.5} />
                <p className="mt-4 font-mono text-3xl font-medium tracking-tight text-ink lg:text-4xl">
                  <Counter to={m.value} decimals={m.decimals} />
                  <span className="ml-1 text-sm text-ink/40">{m.suffix}</span>
                </p>
                <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.24em] text-ink/50">{m.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- story + invite ---------------- */}
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-20 lg:grid-cols-[1.5fr_1fr] lg:gap-20 lg:px-10 lg:py-28">
        <div>
          <Reveal>
            <Kicker index="01">Scout notes</Kicker>
            <div className="mt-8 space-y-6">
              {player.bio.map((para, i) => (
                <p
                  key={i}
                  className={`leading-relaxed ${
                    i === 0
                      ? "font-display text-2xl font-light leading-[1.35] tracking-[-0.01em] text-ink lg:text-[1.75rem]"
                      : "text-[15.5px] text-ink/65"
                  }`}
                >
                  {i === 0 && (
                    <span className="float-left mr-3 mt-1 font-display text-6xl font-medium leading-[0.8] text-clay">
                      {para.charAt(0)}
                    </span>
                  )}
                  {i === 0 ? para.slice(1) : para}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-14">
              <Kicker index="02">Honors &amp; accolades</Kicker>
              <ul className="mt-8 divide-y divide-line border-y border-line">
                {player.accolades.map((a) => (
                  <li key={a} className="group flex items-center gap-4 py-4">
                    <Trophy className="h-4 w-4 shrink-0 text-brass" strokeWidth={1.5} />
                    <span className="text-[15px] text-ink/80 transition-transform duration-300 group-hover:translate-x-1">
                      {a}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-14 rounded-md border border-line bg-bone/50 p-7 lg:p-9">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-clay">
                From the dugout
              </p>
              <blockquote className="mt-4 font-display text-xl font-light italic leading-snug text-ink/85 lg:text-2xl">
                &ldquo;{player.coachNote.quote}&rdquo;
              </blockquote>
              <p className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink/50">
                {player.coachNote.author} · {player.coachNote.role}
              </p>
            </div>
          </Reveal>
        </div>

        {/* invite panel */}
        <aside id="invite" className="scroll-mt-28">
          <Reveal className="lg:sticky lg:top-28">
            <div className="rounded-lg border border-line bg-ink p-7 text-cream lg:p-8">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                  Coach to player
                </p>
                <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-cream/40">
                  <Lock className="h-3 w-3" /> Private channel
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-medium leading-tight">
                Invite {player.name.split(" ")[0]} to join your roster.
              </h3>
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 rounded-md border border-brass/40 bg-moss/40 p-5 text-center"
                  >
                    <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gold">
                      <Check className="h-5 w-5 text-ink" strokeWidth={3} />
                    </span>
                    <p className="mt-3 font-display text-lg">Invitation sent</p>
                    <p className="mt-1 text-[13px] text-cream/55">
                      {player.name.split(" ")[0]} typically responds within 48 hours. Track replies from your coach portal.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form" exit={{ opacity: 0 }}>
                    <div className="mt-5 space-y-3">
                      <input
                        placeholder="Your program — e.g., Carolina Knights 18U"
                        className="w-full rounded-md border border-white/15 bg-white/[0.05] px-4 py-3 text-sm text-cream placeholder:text-cream/30 outline-none transition-colors focus:border-brass/60"
                      />
                      <select className="dark w-full rounded-md border border-white/15 bg-ink px-4 py-3 text-sm text-cream/80 outline-none transition-colors focus:border-brass/60">
                        <option>Roster invite — Fall 2026</option>
                        <option>Tryout invitation</option>
                        <option>Showcase invitation</option>
                        <option>General introduction</option>
                      </select>
                      <textarea
                        rows={4}
                        placeholder={`Hi ${player.name.split(" ")[0]} — we watched your profile and like what we see…`}
                        className="w-full resize-none rounded-md border border-white/15 bg-white/[0.05] px-4 py-3 text-sm text-cream placeholder:text-cream/30 outline-none transition-colors focus:border-brass/60"
                      />
                    </div>
                    <button
                      onClick={() => setSent(true)}
                      className="group mt-4 flex w-full items-center justify-center gap-3 rounded-full bg-gold py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass"
                    >
                      Send invitation
                      <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
              <LineGrow className="mt-6 h-px bg-brass/30" />
              <p className="mt-5 flex items-start gap-2.5 text-[12.5px] leading-relaxed text-cream/45">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                Delivered to {player.name.split(" ")[0]}&rsquo;s registered inbox. Your contact
                details are shared only after they accept.
              </p>
            </div>

            <div className="mt-5 rounded-lg border border-line bg-bone/50 p-6">
              <p className="font-mono text-[9.5px] uppercase tracking-[0.26em] text-ink/50">
                Registry details
              </p>
              <dl className="mt-4 space-y-3 text-sm">
                {[
                  ["Availability", player.status],
                  ["Member since", player.memberSince],
                  ["School", player.school],
                  ["Travel club", player.travel],
                  ["Academics", `${player.gpa.toFixed(1)} GPA · class of ${player.gradYear}`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-line pb-2.5 last:border-b-0 last:pb-0">
                    <dt className="text-ink/45">{k}</dt>
                    <dd className="text-right font-medium text-ink/85">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </aside>
      </section>

      {/* ---------------- video ---------------- */}
      <section className="relative overflow-hidden bg-ink py-20 text-cream lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Kicker index="03" light>
                Highlight reel
              </Kicker>
              <h2 className="mt-5 font-display text-3xl font-medium tracking-[-0.01em] sm:text-4xl">
                Watch {player.name.split(" ")[0]} work.
              </h2>
            </div>
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-cream/45">
              <Play className="h-3 w-3 text-gold" /> Uploaded by the player · {player.memberSince}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative mt-10 overflow-hidden rounded-lg border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.45)]">
              <video controls playsInline poster={player.cover} className="aspect-video w-full object-cover">
                <source src={player.video} type="video/mp4" />
              </video>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- gallery ---------------- */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <Reveal>
          <Kicker index="04">From the field</Kicker>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {player.gallery.map((g, i) => (
            <Reveal key={g} delay={i * 0.1}>
              <div className="group relative overflow-hidden rounded-md">
                <img
                  src={g}
                  alt={`${player.name} — game photo ${i + 1}`}
                  loading="lazy"
                  className="img-tint aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15" />
                <span className="absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-[0.24em] text-cream/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  Exhibit {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- similar ---------------- */}
      <section className="border-t border-line bg-bone/50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Kicker index="05">Also on the board</Kicker>
              <h2 className="mt-5 font-display text-3xl font-medium tracking-[-0.01em] sm:text-4xl">
                Players like {player.name.split(" ")[0]}.
              </h2>
            </div>
            <Link
              href="/search"
              className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/60 transition-all hover:border-brass/60 hover:text-ink"
            >
              Back to search
              <ArrowRight className="h-3.5 w-3.5 text-clay transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((p, i) => (
              <PlayerCard key={p.id} player={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
