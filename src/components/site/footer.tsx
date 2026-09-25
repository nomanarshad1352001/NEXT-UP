import Link from "next/link";
import { ArrowUpRight, Diamond } from "lucide-react";

const COLS = [
  {
    title: "Platform",
    links: [
      { href: "/search", label: "Search the registry" },
      { href: "/#featured", label: "Featured prospects" },
      { href: "/#pricing", label: "Membership" },
      { href: "/signup?role=player", label: "For players" },
      { href: "/signup?role=coach", label: "For coaches" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/#why", label: "Why a registry" },
      { href: "/#how", label: "How it works" },
      { href: "/faq", label: "FAQ & benefits" },
      { href: "/signup", label: "Create an account" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy policy" },
      { href: "/terms", label: "Terms of service" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass/60 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-20 lg:px-10 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brass/15 ring-1 ring-brass/40">
                <Diamond className="h-4 w-4 text-brass" strokeWidth={1.75} />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl font-semibold tracking-[0.08em]">
                  NEXT&nbsp;UP
                </span>
                <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.32em] text-cream/50">
                  The Player Registry
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm font-display text-2xl font-light leading-snug text-cream/85">
              Players announce themselves.{" "}
              <em className="text-gold">Coaches actually find them.</em>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/50">
              A private, structured, searchable registry for available baseball
              talent. Profiles are visible only to subscribing coaches — never
              the public feed.
            </p>
            <Link
              href="/signup"
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass"
            >
              Join the registry
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {COLS.map((col) => (
              <div key={col.title}>
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-brass">
                  {col.title}
                </p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="ed-underline text-sm text-cream/65 transition-colors hover:text-cream"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 select-none overflow-hidden" aria-hidden>
          <p className="text-outline-cream whitespace-nowrap font-display text-[16vw] font-semibold leading-[0.85] tracking-tight lg:text-[11rem]">
            NEXT&nbsp;UP&nbsp;·&nbsp;BASEBALL
          </p>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cream/40">
            © 2026 Next Up Registry LLC · Baseball first, more sports soon
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cream/40">
            Profiles visible to subscribed coaches only
          </p>
        </div>
      </div>
    </footer>
  );
}
