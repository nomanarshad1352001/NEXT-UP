"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Diamond,
  Lock,
  LockOpen,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { POSITION_FILTERS, US_STATES, players, type Player } from "@/lib/players";
import { PlayerCard } from "@/components/players/card";
import { EASE } from "@/components/motion";

type SortKey = "grad" | "age" | "velo";

const inputCls =
  "w-full rounded-md border border-line bg-cream px-4 py-3 text-sm text-ink outline-none transition-all duration-300 focus:border-brass/70 focus:ring-2 focus:ring-brass/20";

export function SearchConsole() {
  const router = useRouter();
  const params = useSearchParams();

  const [pos, setPos] = useState<string[]>(() => params.getAll("pos"));
  const [state, setState] = useState(params.get("state") ?? "");
  const [ageMin, setAgeMin] = useState(params.get("ageMin") ?? "");
  const [ageMax, setAgeMax] = useState(params.get("ageMax") ?? "");
  const [grad, setGrad] = useState(params.get("grad") ?? "");
  const [bats, setBats] = useState(params.get("bats") ?? "");
  const [sort, setSort] = useState<SortKey>("grad");
  const [coachAccess, setCoachAccess] = useState(false);
  const [searched, setSearched] = useState(params.toString().length > 0);

  useEffect(() => {
    setCoachAccess(sessionStorage.getItem("nextup_coach") === "1");
  }, []);

  const results = useMemo(() => {
    const filtered = players.filter((p: Player) => {
      if (pos.length > 0 && !pos.some((x) => p.pos.includes(x))) return false;
      if (state && p.state !== state) return false;
      if (ageMin && p.age < Number(ageMin)) return false;
      if (ageMax && p.age > Number(ageMax)) return false;
      if (grad && p.gradYear !== Number(grad)) return false;
      if (bats && p.bats !== bats) return false;
      return true;
    });
    return [...filtered].sort((a, b) => {
      if (sort === "grad") return a.gradYear - b.gradYear || a.name.localeCompare(b.name);
      if (sort === "age") return a.age - b.age || a.name.localeCompare(b.name);
      return (b.metrics.maxVelo ?? 0) - (a.metrics.maxVelo ?? 0);
    });
  }, [pos, state, ageMin, ageMax, grad, bats, sort]);

  const activeFilters =
    pos.length + (state ? 1 : 0) + (ageMin || ageMax ? 1 : 0) + (grad ? 1 : 0) + (bats ? 1 : 0);

  const runSearch = () => {
    setSearched(true);
    const q = new URLSearchParams();
    pos.forEach((p) => q.append("pos", p));
    if (state) q.set("state", state);
    if (ageMin) q.set("ageMin", ageMin);
    if (ageMax) q.set("ageMax", ageMax);
    if (grad) q.set("grad", grad);
    if (bats) q.set("bats", bats);
    router.replace(`/search?${q.toString()}`, { scroll: false });
    document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const reset = () => {
    setPos([]);
    setState("");
    setAgeMin("");
    setAgeMax("");
    setGrad("");
    setBats("");
    setSearched(false);
    router.replace("/search", { scroll: false });
  };

  const togglePos = (p: string) =>
    setPos((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));

  return (
    <>
      {/* filter console */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
        className="relative z-10 -mt-2 rounded-lg border border-line bg-cream p-6 shadow-[0_30px_70px_rgba(10,20,15,0.16)] lg:p-8"
      >
        <div className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50">
          <SlidersHorizontal className="h-3.5 w-3.5 text-brass" />
          Search filters — combine any fields
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {POSITION_FILTERS.map((p) => {
            const active = pos.includes(p);
            return (
              <button
                key={p}
                onClick={() => togglePos(p)}
                className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-all duration-300 ${
                  active
                    ? "border-ink bg-ink text-gold shadow-[0_6px_18px_rgba(10,20,15,0.25)]"
                    : "border-line bg-transparent text-ink/60 hover:border-brass/60 hover:text-ink"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <label className="block">
            <span className="mb-1.5 block font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink/50">
              State
            </span>
            <select value={state} onChange={(e) => setState(e.target.value)} className={inputCls}>
              <option value="">All states</option>
              {US_STATES.map((s) => (
                <option key={s.abbr} value={s.abbr}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink/50">
              Age from
            </span>
            <select value={ageMin} onChange={(e) => setAgeMin(e.target.value)} className={inputCls}>
              <option value="">Any</option>
              {[14, 15, 16, 17, 18, 19].map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink/50">
              Age to
            </span>
            <select value={ageMax} onChange={(e) => setAgeMax(e.target.value)} className={inputCls}>
              <option value="">Any</option>
              {[14, 15, 16, 17, 18, 19].map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink/50">
              Class year
            </span>
            <select value={grad} onChange={(e) => setGrad(e.target.value)} className={inputCls}>
              <option value="">Any</option>
              {[2025, 2026, 2027, 2028].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink/50">
              Bats
            </span>
            <select value={bats} onChange={(e) => setBats(e.target.value)} className={inputCls}>
              <option value="">Any</option>
              <option value="R">Right</option>
              <option value="L">Left</option>
              <option value="S">Switch</option>
            </select>
          </label>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={runSearch}
            className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-cream transition-colors duration-300 hover:bg-moss"
          >
            <Search className="h-3.5 w-3.5 text-gold" />
            Search the registry
          </button>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55 transition-all duration-300 hover:border-clay/50 hover:text-clay"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
          <span className="ml-auto flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">
            {coachAccess ? (
              <>
                <LockOpen className="h-3.5 w-3.5 text-fern" /> Coach access active
              </>
            ) : (
              <>
                <Lock className="h-3.5 w-3.5 text-brass" /> Preview mode — coach membership unlocks profiles
              </>
            )}
          </span>
        </div>
      </motion.div>

      {/* results */}
      <div id="results" className="scroll-mt-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${results.length}-${searched ? "s" : "a"}-${activeFilters}-${sort}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="mt-14 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
              <div>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.3em] text-clay">
                  {searched ? "Search results" : "Full registry"}
                </p>
                <p className="mt-2 font-display text-3xl font-medium tracking-tight">
                  {results.length}{" "}
                  <span className="text-ink/40">
                    player{results.length === 1 ? "" : "s"} found
                  </span>
                </p>
              </div>
              <label className="flex items-center gap-3">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink/50">
                  Sort by
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="rounded-md border border-line bg-cream px-4 py-2.5 text-sm outline-none focus:border-brass/70"
                >
                  <option value="grad">Class year</option>
                  <option value="age">Age</option>
                  <option value="velo">Max velocity</option>
                </select>
              </label>
            </div>

            {results.length > 0 ? (
              <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                {results.map((p, i) => (
                  <PlayerCard key={p.id} player={p} index={i} locked={!coachAccess} />
                ))}
              </div>
            ) : (
              <div className="mt-16 flex flex-col items-center rounded-lg border border-dashed border-ink/20 bg-bone/40 px-8 py-20 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-line">
                  <Diamond className="h-5 w-5 text-brass" strokeWidth={1.5} />
                </span>
                <p className="mt-6 font-display text-2xl font-medium">No players match those filters</p>
                <p className="mt-2 max-w-sm text-sm text-ink/55">
                  Widen the state or age range — or clear a position — and new names will surface.
                </p>
                <button
                  onClick={reset}
                  className="group mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-cream transition-colors hover:bg-moss"
                >
                  Clear all filters
                  <ArrowRight className="h-3.5 w-3.5 text-gold transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )}

            {results.length > 0 && !coachAccess && (
              <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-lg border border-brass/40 bg-bone/50 p-6 sm:flex-row sm:items-center lg:p-7">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink">
                    <Lock className="h-4 w-4 text-gold" />
                  </span>
                  <div>
                    <p className="font-display text-lg font-medium">
                      Profiles open fully for subscribing coaches — $3/month.
                    </p>
                    <p className="mt-1 text-sm text-ink/55">
                      Contact details, video, and coach notes are private to members. Players never appear publicly.
                    </p>
                  </div>
                </div>
                <a
                  href="/signup?role=coach"
                  className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-6 py-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-cream transition-colors hover:bg-moss"
                >
                  Become a coach member
                  <ArrowRight className="h-3.5 w-3.5 text-gold transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
