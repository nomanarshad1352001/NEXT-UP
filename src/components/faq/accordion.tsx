"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { EASE, Reveal } from "@/components/motion";

export function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={item.q} delay={Math.min(i * 0.04, 0.3)}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="group flex w-full items-center gap-5 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="w-8 shrink-0 font-mono text-[10px] tracking-[0.16em] text-clay">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`flex-1 font-display text-xl font-medium tracking-[-0.01em] transition-colors duration-300 lg:text-[1.45rem] ${
                  isOpen ? "text-clay" : "text-ink group-hover:text-fern"
                }`}
              >
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                  isOpen ? "border-clay/50 bg-clay/5" : "border-line group-hover:border-brass/60"
                }`}
              >
                <Plus className={`h-4 w-4 ${isOpen ? "text-clay" : "text-ink/60"}`} strokeWidth={1.75} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 pl-13 pr-14 text-[15px] leading-relaxed text-ink/60">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        );
      })}
    </div>
  );
}
