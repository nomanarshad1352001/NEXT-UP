"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  CircleDollarSign,
  CreditCard,
  Diamond,
  Lock,
  Search,
  ShieldCheck,
} from "lucide-react";
import { POSITION_OPTIONS, US_STATES } from "@/lib/players";
import { EASE } from "@/components/motion";

type Role = "player" | "coach";
type Step = "pay" | "form" | "done";

/* ---------------- shared field kit ---------------- */

const field =
  "w-full rounded-md border border-line bg-[#fbf9f4] px-4 py-3 text-sm text-ink outline-none transition-all duration-300 placeholder:text-ink/30 focus:border-brass/70 focus:ring-2 focus:ring-brass/20";

function Label({
  children,
  required,
  error,
}: {
  children: ReactNode;
  required?: boolean;
  error?: string;
}) {
  return (
    <span className="mb-1.5 flex items-baseline justify-between">
      <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink/55">
        {children}
        {required && <span className="text-clay"> *</span>}
      </span>
      {error && <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-clay">{error}</span>}
    </span>
  );
}

function Select({
  value,
  onChange,
  options,
  placeholder,
  invalid,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  invalid?: boolean;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${field} ${invalid ? "border-clay/60 ring-2 ring-clay/15" : ""} ${
        value ? "text-ink" : "text-ink/35"
      }`}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  invalid,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  invalid?: boolean;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`${field} ${invalid ? "border-clay/60 ring-2 ring-clay/15" : ""}`}
    />
  );
}

/* ---------------- formatting helpers ---------------- */

const fmtCard = (v: string) =>
  v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");

const fmtExp = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 4);
  if (d.length <= 2) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
};

/* ---------------- main flow ---------------- */

export function SignupFlow() {
  const params = useSearchParams();
  const initialRole = (params.get("role") === "coach" ? "coach" : null) as Role | null;

  const [role, setRole] = useState<Role | null>(initialRole ?? (params.get("role") === "player" ? "player" : null));
  const [step, setStep] = useState<Step>(initialRole ? "pay" : "pay");
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);

  // payment state
  const [card, setCard] = useState({ number: "", name: "", exp: "", cvc: "" });

  // player form
  const [pf, setPf] = useState<Record<string, string>>({
    firstName: "", lastName: "", email: "", password: "",
    age: "", gradYear: "", pos: "", pos2: "", bats: "", throws: "",
    heightFt: "", heightIn: "", weight: "",
    state: "", city: "", school: "", travel: "",
    maxVelo: "", sixty: "", exitVelo: "", popTime: "", gpa: "",
    headline: "", bio: "", agree: "",
  });

  // coach form
  const [cf, setCf] = useState<Record<string, string>>({
    name: "", email: "", password: "", role: "", level: "", org: "",
    state: "", phone: "", ageGroup: "", lookingFor: "",
  });

  const [errors, setErrors] = useState<Set<string>>(new Set());
  const set = (obj: typeof pf) => (k: string, v: string) =>
    obj === pf ? setPf((p) => ({ ...p, [k]: v })) : setCf((p) => ({ ...p, [k]: v }));
  const form = role === "coach" ? cf : pf;
  const setForm = role === "coach" ? set(cf) : set(pf);

  const plan = useMemo(
    () =>
      role === "coach"
        ? { name: "Coach membership", price: 3, tag: "Full registry access", icon: Search }
        : { name: "Player membership", price: 1, tag: "Get listed in the registry", icon: Diamond },
    [role]
  );

  const requiredPlayer = [
    "firstName", "lastName", "email", "password", "age", "gradYear", "pos",
    "bats", "throws", "heightFt", "heightIn", "state", "city", "school", "headline",
  ];
  const requiredCoach = ["name", "email", "password", "role", "level", "org", "state"];
  const required = role === "coach" ? requiredCoach : requiredPlayer;

  const submitPayment = () => {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setPaid(true);
      setStep("form");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1400);
  };

  const submitForm = () => {
    const missing = new Set(required.filter((k) => !form[k]?.trim()));
    setErrors(missing);
    if (missing.size === 0) {
      setStep("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (role === "coach") sessionStorage.setItem("nextup_coach", "1");
    } else {
      document.getElementById("form-top")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="mx-auto grid max-w-7xl gap-0 lg:min-h-[calc(100vh-74px)] lg:grid-cols-[420px_1fr]">
      {/* aside */}
      <aside className="relative overflow-hidden bg-ink px-6 py-12 text-cream lg:px-10 lg:py-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(600px 300px at 100% 0%, rgba(195,160,74,0.14), transparent), radial-gradient(500px 400px at 0% 100%, rgba(36,80,61,0.4), transparent)",
          }}
        />
        <div className="relative">
          <p className="font-mono text-[10px] uppercase tracking-[0.36em] text-gold">
            Join the registry
          </p>
          <h1 className="mt-5 font-display text-4xl font-medium leading-[1.05] tracking-[-0.01em]">
            Two steps.<br />
            <em className="text-gold">One book.</em>
          </h1>

          {/* steps */}
          <div className="mt-10 space-y-0">
            {[
              { id: "pay", num: "01", label: "Membership payment", sub: step === "pay" ? "In progress" : "Complete" },
              {
                id: "form",
                num: "02",
                label: role === "coach" ? "Coach questionnaire" : "Player questionnaire",
                sub: step === "done" ? "Complete" : step === "form" ? "In progress" : "Locked",
              },
            ].map((s, i) => (
              <div key={s.id} className={`flex gap-4 py-4 ${i > 0 ? "border-t border-white/[0.08]" : ""}`}>
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-[10px] tracking-[0.1em] ${
                    (s.id === "pay" && paid) || (s.id === "form" && step === "done")
                      ? "bg-brass/25 text-gold ring-1 ring-brass/50"
                      : step === s.id
                        ? "bg-gold text-ink"
                        : "border border-white/15 text-cream/40"
                  }`}
                >
                  {(s.id === "pay" && paid) || (s.id === "form" && step === "done") ? (
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  ) : (
                    s.num
                  )}
                </span>
                <div className="flex flex-1 items-baseline justify-between gap-2">
                  <p className="font-display text-lg font-medium">{s.label}</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-cream/40">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* plan summary */}
          {role && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 rounded-lg border border-brass/35 bg-moss/30 p-5"
            >
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
                  <plan.icon className="h-3.5 w-3.5" />
                  {plan.name}
                </p>
                <p className="font-display text-2xl font-medium">
                  ${plan.price}
                  <span className="ml-1 font-mono text-[9px] uppercase tracking-[0.16em] text-cream/50">/mo</span>
                </p>
              </div>
              <p className="mt-2 text-sm text-cream/55">{plan.tag} · cancel anytime</p>
            </motion.div>
          )}

          <p className="mt-10 flex items-start gap-2.5 text-[13px] leading-relaxed text-cream/45">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
            Payments are processed securely through Stripe. Your own login unlocks
            account management tools immediately after registration.
          </p>
        </div>
      </aside>

      {/* main panel */}
      <div className="px-5 py-12 lg:px-14 lg:py-16">
        <AnimatePresence mode="wait">
          {/* ---------------- STEP 1: PAYMENT ---------------- */}
          {step === "pay" && (
            <motion.div
              key="pay"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {!role ? (
                <>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-clay">Step 01 — choose your door</p>
                  <h2 className="mt-4 font-display text-3xl font-medium tracking-tight lg:text-4xl">
                    Who&rsquo;s joining today?
                  </h2>
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {(
                      [
                        { r: "player" as Role, t: "A player", d: "Post your profile and be found by coaches nationwide.", p: "$1/mo" },
                        { r: "coach" as Role, t: "A coach", d: "Search the registry, contact players, send invites.", p: "$3/mo" },
                      ]
                    ).map((c) => (
                      <button
                        key={c.r}
                        onClick={() => setRole(c.r)}
                        className="group flex flex-col items-start rounded-lg border border-line bg-[#fbf9f4] p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-brass/60 hover:shadow-[0_20px_50px_rgba(10,20,15,0.12)]"
                      >
                        <span className="flex w-full items-center justify-between">
                          <span className="font-display text-2xl font-medium">{c.t}</span>
                          <span className="rounded-full border border-brass/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/70">
                            {c.p}
                          </span>
                        </span>
                        <span className="mt-3 text-sm leading-relaxed text-ink/55">{c.d}</span>
                        <span className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-clay">
                          Continue <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-clay">
                    Step 01 — membership payment
                  </p>
                  <h2 className="mt-4 font-display text-3xl font-medium tracking-tight lg:text-4xl">
                    {plan.name}
                  </h2>

                  {/* order summary */}
                  <div className="mt-8 rounded-lg border border-line bg-[#fbf9f4] p-6">
                    <div className="flex items-center justify-between border-b border-line pb-4">
                      <span className="text-sm text-ink/70">{plan.name} · billed monthly</span>
                      <span className="font-mono text-sm">${plan.price}.00</span>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                        Due today
                      </span>
                      <span className="font-display text-2xl font-medium">${plan.price}.00</span>
                    </div>
                    <p className="mt-3 flex items-center gap-2 text-[12.5px] text-ink/45">
                      <CircleDollarSign className="h-3.5 w-3.5 text-brass" />
                      Recurring ${plan.price}.00/month until cancelled. Demo checkout — no card is charged.
                    </p>
                  </div>

                  {/* card form */}
                  <div className="mt-6 rounded-lg border border-line bg-[#fbf9f4] p-6">
                    <div className="mb-5 flex items-center justify-between">
                      <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-ink/55">
                        <CreditCard className="h-3.5 w-3.5 text-brass" />
                        Card details
                      </p>
                      <p className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/40">
                        <Lock className="h-3 w-3" /> 256-bit · Stripe
                      </p>
                    </div>
                    <div className="grid gap-4">
                      <div>
                        <Label required>Name on card</Label>
                        <Input value={card.name} onChange={(v) => setCard({ ...card, name: v })} placeholder="Jordan Blake" />
                      </div>
                      <div>
                        <Label required>Card number</Label>
                        <Input value={card.number} onChange={(v) => setCard({ ...card, number: fmtCard(v) })} placeholder="4242 4242 4242 4242" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label required>Expiry</Label>
                          <Input value={card.exp} onChange={(v) => setCard({ ...card, exp: fmtExp(v) })} placeholder="08/28" />
                        </div>
                        <div>
                          <Label required>CVC</Label>
                          <Input value={card.cvc} onChange={(v) => setCard({ ...card, cvc: v.replace(/\D/g, "").slice(0, 4) })} placeholder="314" />
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={submitPayment}
                      disabled={paying}
                      className="group mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-ink py-4 font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-cream transition-all duration-300 hover:bg-moss disabled:opacity-70"
                    >
                      {paying ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-cream/30 border-t-gold" />
                          Processing…
                        </>
                      ) : (
                        <>
                          Start membership — ${plan.price}.00/mo
                          <ArrowRight className="h-4 w-4 text-gold transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                    <p className="mt-3 text-center font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/35">
                      Demonstration build — payment is simulated
                    </p>
                  </div>

                  <button
                    onClick={() => setRole(null)}
                    className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45 transition-colors hover:text-clay"
                  >
                    <ArrowLeft className="h-3 w-3" /> Switch role
                  </button>
                </>
              )}
            </motion.div>
          )}

          {/* ---------------- STEP 2: FORM ---------------- */}
          {step === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <div id="form-top" className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-fern">
                    <BadgeCheck className="h-3.5 w-3.5" /> Payment confirmed — Step 02
                  </p>
                  <h2 className="mt-4 font-display text-3xl font-medium tracking-tight lg:text-4xl">
                    {role === "coach" ? "Coach questionnaire" : "Player registration"}
                  </h2>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink/55">
                    {role === "coach"
                      ? "Tell us about your program so players know who's reaching out."
                      : "Most fields are required — standardized answers are what make you searchable to coaches."}
                  </p>
                </div>
                <span className="rounded-full border border-line px-4 py-2 font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/50">
                  {role === "coach" ? requiredCoach.length : requiredPlayer.length} required fields
                </span>
              </div>

              {errors.size > 0 && (
                <div className="mt-6 rounded-md border border-clay/40 bg-clay/[0.06] px-5 py-3.5 text-sm text-clay">
                  {errors.size} required field{errors.size > 1 ? "s" : ""} still need
                  {errors.size > 1 ? "" : "s"} attention — they&rsquo;re marked below.
                </div>
              )}

              <div className="mt-8 grid gap-x-5 gap-y-5 sm:grid-cols-2">
                {role === "coach" ? (
                  <>
                    <div><Label required error={errors.has("name") ? "Required" : undefined}>Full name</Label>
                      <Input invalid={errors.has("name")} value={cf.name} onChange={(v) => setForm("name", v)} placeholder="Dan Whitfield" /></div>
                    <div><Label required error={errors.has("email") ? "Required" : undefined}>Email — your login</Label>
                      <Input type="email" invalid={errors.has("email")} value={cf.email} onChange={(v) => setForm("email", v)} placeholder="coach@knightsbaseball.com" /></div>
                    <div><Label required error={errors.has("password") ? "Required" : undefined}>Password</Label>
                      <Input type="password" invalid={errors.has("password")} value={cf.password} onChange={(v) => setForm("password", v)} placeholder="Minimum 8 characters" /></div>
                    <div><Label required error={errors.has("role") ? "Required" : undefined}>Your role</Label>
                      <Select invalid={errors.has("role")} value={cf.role} onChange={(v) => setForm("role", v)} placeholder="Select role" options={["Head Coach", "Assistant Coach", "Recruiting Coordinator", "Scout", "Program Director"].map(o => ({ value: o, label: o }))} /></div>
                    <div><Label required error={errors.has("level") ? "Required" : undefined}>Program level</Label>
                      <Select invalid={errors.has("level")} value={cf.level} onChange={(v) => setForm("level", v)} placeholder="Select level" options={["Travel / Showcase", "High School Varsity", "Junior College", "NCAA D1", "NCAA D2", "NCAA D3", "NAIA", "Independent / Pro"].map(o => ({ value: o, label: o }))} /></div>
                    <div><Label required error={errors.has("org") ? "Required" : undefined}>Team / organization</Label>
                      <Input invalid={errors.has("org")} value={cf.org} onChange={(v) => setForm("org", v)} placeholder="Carolina Knights 18U" /></div>
                    <div><Label required error={errors.has("state") ? "Required" : undefined}>Home state</Label>
                      <Select invalid={errors.has("state")} value={cf.state} onChange={(v) => setForm("state", v)} placeholder="Select state" options={US_STATES.map(s => ({ value: s.abbr, label: s.name }))} /></div>
                    <div><Label>Phone</Label>
                      <Input value={cf.phone} onChange={(v) => setForm("phone", v)} placeholder="(555) 210-8843" /></div>
                    <div><Label>Primary age group</Label>
                      <Select value={cf.ageGroup} onChange={(v) => setForm("ageGroup", v)} placeholder="Select age group" options={["13U", "14U", "15U", "16U", "17U", "18U", "College"].map(o => ({ value: o, label: o }))} /></div>
                    <div><Label>Currently recruiting</Label>
                      <Select value={cf.lookingFor} onChange={(v) => setForm("lookingFor", v)} placeholder="Any position" options={POSITION_OPTIONS.map(o => ({ value: o, label: o }))} /></div>
                  </>
                ) : (
                  <>
                    <div><Label required error={errors.has("firstName") ? "Required" : undefined}>First name</Label>
                      <Input invalid={errors.has("firstName")} value={pf.firstName} onChange={(v) => setForm("firstName", v)} placeholder="Mason" /></div>
                    <div><Label required error={errors.has("lastName") ? "Required" : undefined}>Last name</Label>
                      <Input invalid={errors.has("lastName")} value={pf.lastName} onChange={(v) => setForm("lastName", v)} placeholder="Cole" /></div>
                    <div><Label required error={errors.has("email") ? "Required" : undefined}>Email — your login</Label>
                      <Input type="email" invalid={errors.has("email")} value={pf.email} onChange={(v) => setForm("email", v)} placeholder="you@email.com" /></div>
                    <div><Label required error={errors.has("password") ? "Required" : undefined}>Password</Label>
                      <Input type="password" invalid={errors.has("password")} value={pf.password} onChange={(v) => setForm("password", v)} placeholder="Minimum 8 characters" /></div>
                    <div><Label required error={errors.has("age") ? "Required" : undefined}>Age</Label>
                      <Select invalid={errors.has("age")} value={pf.age} onChange={(v) => setForm("age", v)} placeholder="Select age" options={[14, 15, 16, 17, 18, 19].map(a => ({ value: String(a), label: String(a) }))} /></div>
                    <div><Label required error={errors.has("gradYear") ? "Required" : undefined}>Graduation year</Label>
                      <Select invalid={errors.has("gradYear")} value={pf.gradYear} onChange={(v) => setForm("gradYear", v)} placeholder="Select class" options={[2025, 2026, 2027, 2028, 2029].map(y => ({ value: String(y), label: `Class of ${y}` }))} /></div>
                    <div><Label required error={errors.has("pos") ? "Required" : undefined}>Primary position</Label>
                      <Select invalid={errors.has("pos")} value={pf.pos} onChange={(v) => setForm("pos", v)} placeholder="Select position" options={POSITION_OPTIONS.map(o => ({ value: o, label: o }))} /></div>
                    <div><Label>Secondary position</Label>
                      <Select value={pf.pos2} onChange={(v) => setForm("pos2", v)} placeholder="Optional" options={POSITION_OPTIONS.map(o => ({ value: o, label: o }))} /></div>
                    <div><Label required error={errors.has("bats") ? "Required" : undefined}>Bats</Label>
                      <Select invalid={errors.has("bats")} value={pf.bats} onChange={(v) => setForm("bats", v)} placeholder="Select" options={[{ value: "R", label: "Right" }, { value: "L", label: "Left" }, { value: "S", label: "Switch" }]} /></div>
                    <div><Label required error={errors.has("throws") ? "Required" : undefined}>Throws</Label>
                      <Select invalid={errors.has("throws")} value={pf.throws} onChange={(v) => setForm("throws", v)} placeholder="Select" options={[{ value: "R", label: "Right" }, { value: "L", label: "Left" }]} /></div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><Label required error={errors.has("heightFt") ? "Required" : undefined}>Height</Label>
                        <Select invalid={errors.has("heightFt")} value={pf.heightFt} onChange={(v) => setForm("heightFt", v)} placeholder="Ft" options={["5", "6"].map(f => ({ value: f, label: `${f} ft` }))} /></div>
                      <div><Label>&nbsp;</Label>
                        <Select invalid={errors.has("heightIn")} value={pf.heightIn} onChange={(v) => setForm("heightIn", v)} placeholder="In" options={Array.from({ length: 12 }, (_, i) => ({ value: String(i), label: `${i} in` }))} /></div>
                    </div>
                    <div><Label>Weight (lbs)</Label>
                      <Input value={pf.weight} onChange={(v) => setForm("weight", v.replace(/\D/g, "").slice(0, 3))} placeholder="185" /></div>
                    <div><Label required error={errors.has("state") ? "Required" : undefined}>State</Label>
                      <Select invalid={errors.has("state")} value={pf.state} onChange={(v) => setForm("state", v)} placeholder="Select state" options={US_STATES.map(s => ({ value: s.abbr, label: s.name }))} /></div>
                    <div><Label required error={errors.has("city") ? "Required" : undefined}>City</Label>
                      <Input invalid={errors.has("city")} value={pf.city} onChange={(v) => setForm("city", v)} placeholder="Dallas" /></div>
                    <div><Label required error={errors.has("school") ? "Required" : undefined}>High school</Label>
                      <Input invalid={errors.has("school")} value={pf.school} onChange={(v) => setForm("school", v)} placeholder="Highland Park HS" /></div>
                    <div><Label>Travel / showcase team</Label>
                      <Input value={pf.travel} onChange={(v) => setForm("travel", v)} placeholder="Texas Scout Team 17U" /></div>
                    <div><Label>Max fastball (mph)</Label>
                      <Input value={pf.maxVelo} onChange={(v) => setForm("maxVelo", v)} placeholder="92" /></div>
                    <div><Label>60-yard dash (sec)</Label>
                      <Input value={pf.sixty} onChange={(v) => setForm("sixty", v)} placeholder="6.71" /></div>
                    <div><Label>Exit velocity (mph)</Label>
                      <Input value={pf.exitVelo} onChange={(v) => setForm("exitVelo", v)} placeholder="94" /></div>
                    <div><Label>GPA</Label>
                      <Input value={pf.gpa} onChange={(v) => setForm("gpa", v)} placeholder="3.8" /></div>
                    <div className="sm:col-span-2">
                      <Label required error={errors.has("headline") ? "Required" : undefined}>Announcement headline</Label>
                      <Input invalid={errors.has("headline")} value={pf.headline} onChange={(v) => setForm("headline", v)} placeholder="Low-90s righty looking for a program that develops two-strike weapons…" />
                    </div>
                    <div className="sm:col-span-2">
                      <Label>Your story — shown on your page</Label>
                      <textarea
                        value={pf.bio}
                        onChange={(e) => setForm("bio", e.target.value)}
                        rows={4}
                        placeholder="Tell coaches who you are, how you play, and what you're looking for in a program…"
                        className={`${field} resize-none`}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label>Photos &amp; video</Label>
                      <div className="flex items-center justify-center rounded-md border border-dashed border-ink/25 bg-[#fbf9f4] px-6 py-8 text-center">
                        <p className="text-sm text-ink/45">
                          After registration, your account portal accepts game film, headshots, and action shots.{" "}
                          <span className="text-clay">You control everything on your page.</span>
                        </p>
                      </div>
                    </div>
                    <label className="flex items-start gap-3 sm:col-span-2">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 accent-[#0a140f]"
                        onChange={(e) => setForm("agree", e.target.checked ? "y" : "")}
                      />
                      <span className="text-[13px] leading-relaxed text-ink/55">
                        I agree to the <Link href="/terms" className="underline decoration-brass/60 underline-offset-2">Terms of Service</Link> and{" "}
                        <Link href="/privacy" className="underline decoration-brass/60 underline-offset-2">Privacy Policy</Link>, and I understand my profile is visible only to subscribing coaches.
                      </span>
                    </label>
                  </>
                )}
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <button
                  onClick={submitForm}
                  className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-cream transition-all duration-300 hover:bg-moss"
                >
                  {role === "coach" ? "Activate coach access" : "Publish my profile"}
                  <ArrowRight className="h-4 w-4 text-gold transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => setStep("pay")}
                  className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45 transition-colors hover:text-clay"
                >
                  <ArrowLeft className="h-3 w-3" /> Back to payment
                </button>
              </div>
            </motion.div>
          )}

          {/* ---------------- DONE ---------------- */}
          {step === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="flex min-h-[60vh] flex-col items-center justify-center py-10 text-center"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-ink"
              >
                <Check className="h-8 w-8 text-gold" strokeWidth={2.5} />
              </motion.span>
              <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.34em] text-clay">
                Registration complete
              </p>
              <h2 className="mt-4 max-w-lg font-display text-4xl font-medium leading-[1.05] tracking-tight">
                {role === "coach" ? (
                  <>The registry is <em className="text-clay">yours to search.</em></>
                ) : (
                  <>Welcome to the book, <em className="text-clay">{form.firstName || "prospect"}.</em></>
                )}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/55">
                {role === "coach"
                  ? "Coach access is live on your account. Every profile, video, and contact line is open to you starting now."
                  : "Your page is queued for review and goes live within 24 hours. Your login manages photos, video, stats, and availability anytime."}
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-4">
                {role === "coach" ? (
                  <Link href="/search" className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-cream hover:bg-moss">
                    Start searching <ArrowRight className="h-4 w-4 text-gold transition-transform group-hover:translate-x-1" />
                  </Link>
                ) : (
                  <Link href={`/players/${"mason-cole"}`} className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-cream hover:bg-moss">
                    Preview a player page <ArrowRight className="h-4 w-4 text-gold transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
                <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-line px-8 py-4 font-mono text-[12px] uppercase tracking-[0.2em] text-ink/60 hover:border-brass/60">
                  Back home
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
