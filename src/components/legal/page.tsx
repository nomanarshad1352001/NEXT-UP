import { Kicker, Reveal } from "@/components/motion";

export function LegalPage({
  index,
  title,
  updated,
  intro,
  sections,
}: {
  index: string;
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
}) {
  return (
    <div className="bg-cream pt-[74px]">
      <section className="relative overflow-hidden bg-ink py-20 text-cream lg:py-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(600px 300px at 85% 10%, rgba(195,160,74,0.14), transparent)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-5 lg:px-10">
          <Reveal>
            <Kicker index={index} light>
              Legal
            </Kicker>
            <h1 className="mt-6 font-display text-5xl font-medium leading-[1.02] tracking-[-0.02em] sm:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/60">{intro}</p>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-cream/40">
              Last updated — {updated}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 lg:px-10 lg:py-20">
        {sections.map((s, i) => (
          <Reveal key={s.heading} delay={Math.min(i * 0.03, 0.2)}>
            <div className="grid gap-5 border-t border-line py-10 first:border-t-0 first:pt-0 sm:grid-cols-[64px_1fr]">
              <span className="font-mono text-[11px] tracking-[0.2em] text-clay">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="font-display text-2xl font-medium tracking-[-0.01em]">
                  {s.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {s.body.map((p, j) => (
                    <p key={j} className="text-[15px] leading-relaxed text-ink/60">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
        <div className="mt-8 rounded-lg border border-line bg-bone/50 p-6 text-sm leading-relaxed text-ink/55">
          Questions about this policy? Reach our office at{" "}
          <span className="font-mono text-[13px] text-ink">legal@nextupregistry.com</span> — a
          human answers within two business days.
        </div>
      </section>
    </div>
  );
}
