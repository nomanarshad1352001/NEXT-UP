"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Diamond, Menu, Search, X } from "lucide-react";

const LINKS = [
  { href: "/#why", label: "Why a registry" },
  { href: "/#how", label: "How it works" },
  { href: "/#pricing", label: "Membership" },
  { href: "/faq", label: "FAQ" },
];

export function Wordmark({ light = true }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-[7px] bg-brass/15 ring-1 ring-brass/40">
        <Diamond className="h-3.5 w-3.5 text-brass" strokeWidth={1.75} />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[17px] font-semibold tracking-[0.08em] ${
            light ? "text-cream" : "text-ink"
          }`}
        >
          NEXT&nbsp;UP
        </span>
        <span
          className={`mt-1 font-mono text-[9px] uppercase tracking-[0.32em] ${
            light ? "text-cream/50" : "text-ink/50"
          }`}
        >
          The Player Registry
        </span>
      </span>
    </span>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/[0.07] bg-ink/95 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-md"
            : "border-b border-transparent bg-ink/85 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-5 lg:px-10">
          <Link href="/" aria-label="Next Up — home">
            <Wordmark />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="ed-underline font-mono text-[11.5px] uppercase tracking-[0.22em] text-cream/65 transition-colors hover:text-gold"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/search"
              className="group flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 font-mono text-[11.5px] uppercase tracking-[0.18em] text-cream/80 transition-all duration-300 hover:border-gold/60 hover:text-gold"
            >
              <Search className="h-3.5 w-3.5" />
              Search players
            </Link>
            <Link
              href="/signup"
              className="group flex items-center gap-1.5 rounded-full bg-gold px-4.5 py-2 pr-3.5 font-mono text-[11.5px] font-medium uppercase tracking-[0.18em] text-ink transition-all duration-300 hover:bg-brass"
            >
              Get listed
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center text-cream lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[80] flex flex-col bg-ink lg:hidden"
          >
            <div className="flex h-[74px] items-center justify-between px-5">
              <Wordmark />
              <button
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center text-cream"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
              {[{ href: "/", label: "Home" }, ...LINKS, { href: "/search", label: "Search players" }, { href: "/signup", label: "Sign up" }].map(
                (l, i) => (
                  <motion.div
                    key={l.href + l.label}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={l.href}
                      className="group flex items-baseline gap-4 border-b border-white/[0.07] py-4"
                    >
                      <span className="font-mono text-[10px] tracking-[0.3em] text-brass">
                        0{i + 1}
                      </span>
                      <span className="font-display text-3xl font-medium text-cream transition-colors group-hover:text-gold">
                        {l.label}
                      </span>
                    </Link>
                  </motion.div>
                )
              )}
            </nav>
            <div className="px-8 pb-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/40">
                Players $1/mo · Coaches $3/mo
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
