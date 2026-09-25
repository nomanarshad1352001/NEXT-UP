"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { animate, motion, useInView } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function LineGrow({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay, ease: EASE }}
      style={{ transformOrigin: "left" }}
    />
  );
}

export function Kicker({
  index,
  children,
  light = false,
}: {
  index?: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      {index && (
        <span className={`font-mono text-[11px] tracking-[0.2em] ${light ? "text-brass" : "text-clay"}`}>
          {index}
        </span>
      )}
      <span className={`h-px w-10 ${light ? "bg-brass/50" : "bg-ink/25"}`} />
      <span
        className={`font-mono text-[11px] uppercase tracking-[0.34em] ${
          light ? "text-gold" : "text-ink/55"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

export function Counter({
  to,
  decimals = 0,
  suffix = "",
  duration = 2,
}: {
  to: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent =
            v.toLocaleString("en-US", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            }) + suffix;
        }
      },
    });
    return () => controls.stop();
  }, [inView, to, decimals, suffix, duration]);

  return <span ref={ref}>0{suffix}</span>;
}
