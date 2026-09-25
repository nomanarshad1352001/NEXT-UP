"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, Lock, MapPin } from "lucide-react";
import { useRef } from "react";
import { EASE } from "@/components/motion";

const HERO_VIDEO =
  "https://videos.pexels.com/video-files/33853229/14366383_3840_2160_24fps.mp4";
const HERO_POSTER =
  "https://images.pexels.com/photos/32369040/pexels-photo-32369040.jpeg?auto=compress&cs=tinysrgb&w=1600";

const TICKER = [
  "RHP · Texas · Class of ’26 · 92 mph",
  "SS · Georgia · 6.71 sixty",
  "C · Arizona · 1.89 pop time",
  "LHP · Tennessee · 1.94 ERA",
  "CF · California · 6.58 speed",
  "1B · Illinois · 99 exit velo",
  "3B · North Carolina · 87 across",
  "OF · Washington · switch-hitter",
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink">
      {/* backdrop media */}
      <motion.div style={{ y: mediaY }} className="absolute inset-0 scale-[1.08]">
        <video
          className="img-tint h-full w-full object-cover opacity-70"
          autoPlay
          muted
          loop
          playsInline
          poster={HERO_POSTER}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />
      </motion.div>

      {/* content */}
      <motion.div style={{ y: contentY }} className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-28 pt-40 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.4em] text-gold"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brass pulse-dot" />
          Baseball&rsquo;s private registry · Est. 2025
        </motion.p>

        <h1 className="mt-8 max-w-5xl font-display text-[13.5vw] font-medium leading-[0.95] tracking-[-0.02em] text-cream sm:text-[11vw] lg:text-[6.9rem]">
          {["Looking for", "players?"].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.25 + i * 0.13, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
          <span className="block overflow-hidden pb-2">
            <motion.span
              className="block font-light italic text-gold"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.51, ease: EASE }}
            >
              They&rsquo;re looking for you.
            </motion.span>
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
            className="max-w-xl text-base leading-relaxed text-cream/70 lg:text-lg"
          >
            Next Up is a structured, searchable registry where available players
            post their profiles — and subscribing coaches find exactly who they
            need by position, age, and state. No feeds. No algorithms. Just the book.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.82, ease: EASE }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/search"
              className="group inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:bg-brass"
            >
              Search the registry
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/signup?role=player"
              className="group inline-flex items-center gap-3 rounded-full border border-cream/25 px-7 py-4 font-mono text-[12px] uppercase tracking-[0.2em] text-cream transition-all duration-300 hover:border-gold/70 hover:text-gold"
            >
              Get listed — $1/mo
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.05 }}
          className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-6"
        >
          <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.24em] text-cream/45">
            <Lock className="h-3 w-3 text-brass" />
            Profiles visible to subscribed coaches only
          </span>
          <span className="hidden items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.24em] text-cream/45 sm:flex">
            <MapPin className="h-3 w-3 text-brass" />
            47 states represented
          </span>
          <span className="ml-auto hidden items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.24em] text-cream/45 lg:flex">
            Scroll
            <ArrowDown className="h-3 w-3 animate-bounce text-brass" />
          </span>
        </motion.div>
      </motion.div>

      {/* ticker */}
      <div className="relative z-10 border-t border-white/10 bg-ink/80 py-3.5 backdrop-blur-sm">
        <div className="flex w-max animate-marquee gap-0">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-6 px-6 font-mono text-[10.5px] uppercase tracking-[0.26em] text-cream/50"
            >
              <span className="text-brass">◆</span>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
