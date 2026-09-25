import type { Metadata } from "next";
import { FAQAccordion } from "@/components/faq/accordion";
import { Kicker, Reveal } from "@/components/motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ & Benefits",
  description:
    "Why a structured, searchable player registry beats posting to social media — and everything else coaches and players ask about Next Up.",
};

const ITEMS = [
  {
    q: "How is this different from posting on social media?",
    a: "Social media is a feed — your announcement competes with memes, ads, and an algorithm that decides who sees it. Next Up is a database: your profile is permanent, standardized, and surfaces the moment a coach filters for exactly what you are. Nothing gets buried. Nothing expires.",
  },
  {
    q: "Who can see my player profile?",
    a: "Only verified, subscribing coaches. Player pages are never public, never indexed by search engines, and never visible to other players. Your season stats, video, and contact line stay behind the coach membership wall.",
  },
  {
    q: "What fields can coaches search by?",
    a: "State, age range, graduation class, position (primary and secondary), batting side, and more — alone or in any combination. Coaches search; we never blast profiles to coaches within a radius or push unsolicited recommendations.",
  },
  {
    q: "What does the player questionnaire include?",
    a: "The standardized fields coaches actually filter for: age, class year, positions, bats/throws, height and weight, state and city, school, travel program, fastball velocity, 60-yard time, exit velocity, GPA, plus a headline and your story. Most fields are required — that's what makes the registry reliable.",
  },
  {
    q: "Can I add photos, video, and updates later?",
    a: "Yes. Every player gets their own login and account portal. Upload action shots, swap highlight reels, refresh measurables, and toggle your availability status at any point in the season — your page updates instantly.",
  },
  {
    q: "How does coach contact work?",
    a: "Coaches send a contact request or roster invitation through your private channel. You see their program details first and decide whether to accept. Your email and phone are shared only after you approve — no cold exposure.",
  },
  {
    q: "How much does it cost?",
    a: "Players: $1/month recurring. Coaches: $3/month recurring. Both are billed monthly through Stripe with no contracts — cancel anytime and keep access through the end of the billing period.",
  },
  {
    q: "Why charge anything at all?",
    a: "The small subscription is the quality filter. It verifies that every profile belongs to a real, committed player, and every search belongs to a real program. Free platforms fill with ghosts; a registry works only when everyone in it is serious.",
  },
  {
    q: "Which sports are supported?",
    a: "We're starting with baseball — positions, measurables, and showcases are built around the diamond. Softball is next, and the registry architecture is designed to expand to additional sports once the baseball book is established.",
  },
  {
    q: "Do you send my profile to coaches automatically?",
    a: "No. We do not market players within a geographic radius or pitch profiles to anyone. Coaches use the search console to find matches themselves — which means every contact you receive came from someone who specifically chose you.",
  },
  {
    q: "Can I pause or take down my profile?",
    a: "Anytime. Switch your status from 'Actively looking' to 'Committed' or remove the profile entirely from your account portal. Cancellation stops future billing immediately.",
  },
];

export default function FAQPage() {
  return (
    <div className="bg-cream pt-[74px]">
      <section className="relative overflow-hidden bg-ink py-20 text-cream lg:py-28">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(700px 320px at 80% 0%, rgba(195,160,74,0.15), transparent)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal>
            <Kicker index="?" light>
              FAQ &amp; benefits
            </Kicker>
            <h1 className="mt-6 max-w-3xl font-display text-5xl font-medium leading-[1.0] tracking-[-0.02em] sm:text-6xl">
              Everything the industry already <em className="text-gold">quietly asks.</em>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/60">
              The short version: a feed forgets you by Friday. A registry works
              for you every single day. The longer version is below.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 lg:px-10 lg:py-24">
        <FAQAccordion items={ITEMS} />

        <Reveal className="mt-16">
          <div className="flex flex-col items-start justify-between gap-6 rounded-lg border border-brass/40 bg-bone/50 p-8 sm:flex-row sm:items-center">
            <div>
              <p className="font-display text-2xl font-medium">Still weighing it?</p>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/55">
                One dollar puts a player in the book. Three puts the book in a
                coach&rsquo;s hands. Both take under five minutes.
              </p>
            </div>
            <Link
              href="/signup"
              className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-ink px-7 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-cream transition-colors hover:bg-moss"
            >
              Join the registry
              <ArrowRight className="h-3.5 w-3.5 text-gold transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
