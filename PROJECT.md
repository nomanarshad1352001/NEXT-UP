# NEXT UP — The Player Registry

> **Project Title:** Next Up — A Private, Searchable Player Registry for Baseball Recruiting
> **Tagline:** "Players announce themselves. Coaches actually find them."
> **Type:** Two-sided sports marketplace / recruiting registry platform
> **Status:** Fully functional front-end product (demo build — no backend, runs entirely on structured dummy data)
> **Design Reference:** sportsmatchbaseball.com (concept) — re-imagined as a modern, luxury-grade product

---

## 1. What This Platform Does

Next Up solves one specific problem in amateur baseball: **players who want to be recruited currently announce themselves on social media — where posts get buried in hours — while coaches have no organized way to find them.**

The platform replaces the group-chat / Facebook-post workflow with a **private, structured, searchable registry**:

| Stakeholder | What they do on the platform |
|---|---|
| **Players** ($1/month) | Create a standardized profile announcing "I am available to join another team," complete with measurables, photos, video, and story. Each player gets their own login, their own public-style page (visible only to coaches), and account management tools. |
| **Coaches** ($3/month) | Subscribe to unlock the full player database. Search by **State, Age, Position** (plus class year, batting side, and combinations of fields), view complete player pages, and **contact/invite players** directly through a private channel. |

**Deliberate product rules (per the business spec):**
- We do **NOT** blast profiles to coaches within a geographic radius — coaches must search the database themselves.
- Player pages are **only visible to paid/subscribing coaches** — never public, never indexed.
- Baseball first; the architecture is designed to expand to softball and other sports.

### The Sign-Up Model (2 Steps, as specified)

1. **Step 1 — Payment.** Stripe-powered subscription checkout ($1/mo player, $3/mo coach). *(Simulated in this demo build.)*
2. **Step 2 — Registration questionnaire.** Standardized, mostly-required fields (position, age, state, measurables) — the standardization is exactly what makes players searchable by coaches.

---

## 2. Pages & Features (Full Scope)

| Route | Feature | Details |
|---|---|---|
| `/` | **Home** | Cinematic autoplay video hero with parallax & staggered serif type; live stat ticker marquee; "Why a registry beats social media" editorial section (4 numbered arguments + sticky imagery); animated metrics band (counters); "Two doors in" How-it-Works for Players & Coaches; Featured Prospects grid; $1/$3 membership cards; coach testimonial; stadium CTA band |
| `/search` | **Search landing + results** | Filter console — Position chips (RHP / LHP / C / 1B / 2B / 3B / SS / OF / UTIL), State dropdown (50 states), Age from/to, Class year, Bats (R/L/S); combinable filters; sort by class / age / max velocity; live result counts; URL query syncing (shareable searches); animated empty state; coach-membership upsell strip when locked |
| `/players/[id]` | **14 individual player profile pages** | Coach-access gate/paywall (with demo unlock); hero with status + verified-measurable badges; staggered name reveal; 6-tile vitals grid (Age, Class, HT, WT, B/T, Base); animated measurable counters (Max FB, 60-yd, Pop time, Exit velo, GPA); drop-cap "Scout Notes" bio; accolades list; dugout quote card; **private Invite channel** (roster invite / tryout / showcase — with sent state); highlight video reel; photo gallery; "Also on the board" similar players |
| `/signup` | **2-step signup flow** | Role selection → Step 1: mock Stripe checkout (order summary, formatted card inputs, processing state) → Step 2: Player or Coach questionnaire with required-field validation, error highlighting, and success screen. Coach completion activates demo coach access (`sessionStorage`) |
| `/faq` | **FAQ & Benefits** | 11-item animated accordion — directly answers "How is this different from social media?", cost, visibility, searchable fields, cancellation, sports roadmap, and the no-radius-blast rule |
| `/privacy` | **Privacy Policy** | Written to match the actual product: members-only visibility, Stripe PCI handling, minor-data protections, user controls, retention |
| `/terms` | **Terms of Service** | Service definition, billing terms, player/coach obligations, acceptable use, no scraping clause, disclaimers |
| Global | **Site chrome** | Fixed dark glass navbar with animated mobile menu (numbered serif links); footer with giant outline wordmark, columns, and legal links; Lucide icon set throughout; custom gold Diamond logo mark; `icon.svg` favicon; per-page SEO metadata |

### Player Database (Dummy Data)

14 fully-authored player records spanning **9 positions, 13 states, ages 15–18, classes 2025–2027** — each with pos/secondary positions, city/state, school, travel team, height/weight, bats/throws, measurables (velo, 60-time, pop time, exit velo), GPA, availability status, headline, two-paragraph bio, accolades, coach quote, portrait, cover photo, 3-photo gallery, and a highlight video. One real filter query: every card, search result, profile, and gate on the site runs off `src/lib/players.ts`.

---

## 3. Tech Stack

### Core
| Technology | Version | Role |
|---|---|---|
| **Next.js** | 16.2.6 | App Router, Static Generation (all 23 routes prerendered; 14 player pages via `generateStaticParams`), per-page metadata/SEO, file-based routing |
| **React** | 19.2.6 | Component architecture — server components for pages, client components for interaction |
| **TypeScript** | 5.9.3 | Fully typed player model, filter engine, and component props (0 `tsc` errors) |
| **Tailwind CSS** | 4.1.17 | Design system via `@theme` tokens (custom colors: ink/pine/moss/brass/gold/cream), utility-first styling |

### Experience Layer
| Library | Role |
|---|---|
| **Framer Motion** | Scroll reveals with blur-in, staggered hero text masks, animated counters, accordion height animation, page-gate entrance, hover micro-interactions, `AnimatePresence` transitions |
| **Lenis** | Buttery inertia smooth-scrolling across the whole site |
| **Lucide React** | Entire icon system (no emojis) — Diamond logo mark, Lock/gate, Search, Send, Trophy, Gauge, etc. |
| **next/font (Google)** | `Fraunces` (luxury serif display), `Inter` (UI sans), `IBM Plex Mono` (scoreboard/label mono) — self-hosted, zero CLS |
| **Pexels CDN** | All photography (~30 curated images) + 2 cinematic videos (hero + profile reels) — remote, URL-based, no binary assets in repo |

### Data & Auth (Demo)
| Approach | Detail |
|---|---|
| Structured dummy data | `src/lib/players.ts` — typed `Player` model + filter helpers (`similarPlayers`, `REGISTRY_STATS`) |
| Demo gate | `sessionStorage`-based coach-access simulation (`nextup_coach`) — unlocks profiles after signup or "demo access" |
| Mock payments | Stripe-styled simulated checkout with input formatting & processing state (no real charges) |

### Production-Ready Stack (when client goes live)
The codebase is structured so the demo layer can be swapped 1:1 with:
- **Stripe Billing** — real subscriptions ($1/$3 recurring) via Checkout + webhooks
- **PostgreSQL + Drizzle ORM** — `src/db/` scaffold already in place for player/coach tables
- **Auth** (NextAuth/Auth.js) — real player & coach logins with role-based access control
- **Hosting** — Vercel (recommended) or any Node host, including the client's existing GoDaddy plan

---

## 4. Target Client — Who Buys This

| Client Segment | Why they buy |
|---|---|
| **Sports-tech entrepreneurs / recruiting-service startups** | Ready-made, market-ready niche marketplace with a proven subscription model ($1 player / $3 coach). Launch baseball, license the registry vertical for softball, soccer, volleyball. |
| **Travel ball & showcase organizations** (e.g., 14U–18U programs) | Give every rostered player a professional, coach-visible page; the organization becomes the registry's curator. |
| **College / JUCO / high-school coaching staffs & recruiting coordinators** | A $3/month tool that replaces hours of social-media scrolling with 10-second filtered searches. |
| **High-school athletes & parents** | For the price of a baseball, a permanent, structured announcement that a coach can find any day of the year — not just the day it was posted. |
| **Scouting / player-development agencies** | A client-management layer: verified measurables, video, and academics in one standardized format. |

---

## 5. Qualities — Why It Stands Out

### Design & Craft
- **Award-tier visual identity:** private-members-club palette (midnight pine, ivory, brushed gold), editorial serif typography, film-grain texture, hairline rules — built to Awwwards standards, not template standards.
- **Cinematic motion:** masked text reveals, parallax hero, blur-in scroll sections, inertial smooth scrolling, count-up statistics, and spring-eased interactions (`ease: [0.16, 1, 0.3, 1]`) throughout.
- **Fully responsive:** mobile-first layouts, animated full-screen menu, adaptive grids (1→2→4 columns).

### Engineering
- **100% statically prerendered** (23 routes) — instant first paint, near-zero hosting cost, deployable anywhere.
- **Type-safe end-to-end:** zero TypeScript errors; single source-of-truth data model.
- **Zero-runtime data dependency:** no database, no API keys, no environment secrets needed for the demo — it cannot "break in the demo meeting."
- **SEO-ready:** semantic HTML, per-page titles/descriptions, player-specific metadata, alt text on all imagery.
- **Accessible touches:** keyboard-focus styles, aria labels, reduced-clutter reading widths, AA-conscious contrast.

### Product / Business
- **Clear recurring revenue model** with two low-friction price points (impulse-buy territory).
- **Privacy as the differentiator:** members-only profiles = coaches stay because exclusivity is the moat.
- **Standardization is the engine:** required, structured questionnaire fields make the search powerful — that's why it beats social media.
- **Expandable by design:** position sets, measurables, and sport metadata are data-driven — adding softball is a config change, not a rebuild.

---

## 6. Suggested Roadmap

1. **Phase 1 (live launch):** Real Stripe subscriptions, auth, PostgreSQL + Drizzle, email notifications for invites (Resend/Postmark).
2. **Phase 2:** Player account portal (photo/video uploads via S3/R2), coach shortlist dashboards, admin verification console.
3. **Phase 3:** Softball expansion, showcase/event listings, coach ratings, iOS/Android companion app.

---

## 7. Repository Map

```
src/
├── app/
│   ├── page.tsx                  # Home
│   ├── search/page.tsx           # Search landing + output
│   ├── players/[id]/page.tsx     # Player profiles (SSG ×14)
│   ├── signup/page.tsx           # 2-step signup
│   ├── faq/page.tsx              # FAQ & benefits
│   ├── privacy/page.tsx          # Privacy policy
│   ├── terms/page.tsx            # Terms of service
│   ├── layout.tsx                # Fonts, chrome, smooth scroll
│   ├── globals.css               # Design tokens & luxe utilities
│   └── icon.svg                  # Diamond logo favicon
├── components/
│   ├── site/                     # Header, footer, smooth scroll
│   ├── home/                     # Hero, sections, featured, pricing
│   ├── search/                   # Filter console + results
│   ├── players/                  # Profile, gate, player card
│   ├── signup/                   # Payment + questionnaire flow
│   ├── faq/                      # Accordion
│   ├── legal/                    # Legal page layout
│   └── motion.tsx                # Reveal, Counter, Kicker, LineGrow
└── lib/
    └── players.ts                # Typed player registry (dummy data)
```

**Validation status:** `next typegen` ✓ · `tsc --noEmit` ✓ (0 errors) · `next build` ✓ (23/23 routes) · production healthcheck ✓
