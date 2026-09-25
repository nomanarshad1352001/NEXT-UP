"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import type { Player } from "@/lib/players";
import { EASE } from "@/components/motion";

export function PlayerCard({
  player,
  index = 0,
  locked,
}: {
  player: Player;
  index?: number;
  locked?: boolean;
}) {
  const metricLine = [
    player.metrics.maxVelo ? `${player.metrics.maxVelo} FB` : null,
    player.metrics.popTime ? `${player.metrics.popTime} POP` : null,
    player.metrics.sixty ? `${player.metrics.sixty.toFixed(2)} 60` : null,
    player.metrics.exitVelo ? `${player.metrics.exitVelo} EV` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.85, delay: (index % 4) * 0.08, ease: EASE }}
    >
      <Link href={`/players/${player.id}`} className="group block">
        <div className="relative overflow-hidden rounded-md bg-ink">
          <img
            src={player.image}
            alt={`${player.name}, ${player.primary} from ${player.city}, ${player.state}`}
            loading="lazy"
            className="aspect-[3/4] w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.045]"
            style={{ filter: "saturate(0.82) contrast(1.04)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/10" />

          <div className="absolute left-3.5 top-3.5 flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-ink/70 px-3 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-gold backdrop-blur-sm">
              <span className="h-1 w-1 rounded-full bg-brass pulse-dot" />
              {player.status}
            </span>
          </div>
          {locked && (
            <span className="absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-ink/70 backdrop-blur-sm">
              <Lock className="h-3.5 w-3.5 text-gold" />
            </span>
          )}

          <div className="absolute inset-x-4 bottom-4">
            <p className="font-display text-[1.65rem] font-medium leading-none text-cream">
              {player.name}
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-cream/70">
              {player.primary.split(" (")[0].replace("Right-Handed Pitcher", "RHP").replace("Left-Handed Pitcher", "LHP")}{" "}
              · {player.age} · {player.city}, {player.state}
            </p>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
        </div>

        <div className="flex items-center justify-between pt-3.5">
          <div className="flex items-center gap-2.5">
            <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/60">
              Class of {player.gradYear}
            </span>
            <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-brass">
              {metricLine}
            </span>
          </div>
          <ArrowUpRight className="h-4 w-4 text-ink/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brass" />
        </div>
      </Link>
    </motion.div>
  );
}
