import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

function Icon({ name, size = 22, className = "" }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": true,
  };

  const icons = {
    arrow: <svg {...common}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>,
    shield: <svg {...common}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></svg>,
    zap: <svg {...common}><path d="M13 2 3 14h8l-1 8 10-12h-8l1-8Z" /></svg>,
    sparkles: <svg {...common}><path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" /><path d="m19 14 .8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z" /></svg>,
    card: <svg {...common}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M3 10h18" /><path d="M7 15h3" /></svg>,
    phone: <svg {...common}><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></svg>,
    lock: <svg {...common}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>,
    check: <svg {...common}><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>,
    users: <svg {...common}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    file: <svg {...common}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /><path d="M8 13h8" /><path d="M8 17h5" /></svg>,
  };

  return icons[name] || null;
}

function PrimaryButton({ children, type = "button", className = "", onClick }) {
  return (
    <button type={type} onClick={onClick} className={`inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-6 font-bold text-black transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-black ${className}`}>
      {children}
    </button>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur-xl transition hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-white/10">
      <Icon name={icon} className="mb-5 text-emerald-300" size={30} />
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-400">{text}</p>
    </article>
  );
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

const selfTests = [
  { name: "valid email accepted", pass: isValidEmail("founder@mintbank.in") === true },
  { name: "blank email rejected", pass: isValidEmail("") === false },
  { name: "missing domain rejected", pass: isValidEmail("founder@mintbank") === false },
  { name: "spaces are trimmed", pass: isValidEmail("  hello@mintbank.in  ") === true },
];

export default function MintBankWaitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [position, setPosition] = useState(null);

  const features = useMemo(() => [
    { icon: "zap", title: "Instant Onboarding", text: "A fast digital flow designed for modern India." },
    { icon: "shield", title: "Bank-Level Security", text: "Built around privacy, protection, and trust." },
    { icon: "sparkles", title: "AI Money Insights", text: "Understand spending, saving, and financial habits smarter." },
    { icon: "phone", title: "One Powerful App", text: "Pay, save, track, and manage money in one place." },
  ], []);

  const faqs = [
    ["Is MINT BANK a real bank?", "MINT BANK is an early-stage fintech concept. Banking services would need to be offered through licensed banking or regulated financial partners."],
    ["When will it launch?", "The waitlist is for early access and product updates before beta launch."],
    ["Will my money be safe?", "The final product should use regulated partners, secure infrastructure, encryption, and strong compliance processes."],
    ["Can I join from India?", "Yes. The brand is designed for modern Indian users and the waitlist is focused on India-first early access."],
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(false);

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setSubmitted(true);
    setPosition(Math.floor(1000 + Math.random() * 9000));
    setEmail("");
  };

  const scrollToWaitlist = () => {
    const input = document.getElementById("waitlist-email");
    input?.scrollIntoView({ behavior: "smooth", block: "center" });
    input?.focus();
  };

  return (
    <div className="min-h-screen overflow-hidden bg-black text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute top-40 right-0 h-[500px] w-[500px] rounded-full bg-green-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <nav className="relative z-20 flex items-center justify-between px-6 py-6 md:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300 to-green-500 text-2xl font-black text-black shadow-lg shadow-emerald-500/30">M</div>
          <div>
            <p className="text-xl font-bold tracking-[0.25em]">MINT</p>
            <p className="text-xs tracking-[0.35em] text-emerald-200">BANK</p>
          </div>
        </div>
        <PrimaryButton onClick={scrollToWaitlist} className="hidden rounded-full px-6 sm:inline-flex">Join Waitlist</PrimaryButton>
      </nav>

      <main className="relative z-10">
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-10 md:grid-cols-2 md:px-12 md:pt-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-white/5 px-4 py-2 text-sm text-emerald-200 backdrop-blur-xl">
              <Icon name="sparkles" size={16} /> AI-powered neo banking waitlist
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Banking.
              <span className="block bg-gradient-to-r from-emerald-300 to-green-500 bg-clip-text text-transparent">Reimagined.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300">
              Join early access for MINT BANK — a premium digital banking experience with AI insights, instant onboarding, secure payments, and a futuristic black card.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex max-w-xl flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl sm:flex-row">
              <label htmlFor="waitlist-email" className="sr-only">Email address</label>
              <input id="waitlist-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" className="min-h-12 flex-1 rounded-2xl bg-black/50 px-5 text-white outline-none ring-1 ring-white/10 placeholder:text-zinc-500 focus:ring-emerald-400" />
              <PrimaryButton type="submit">Get Early Access <Icon name="arrow" className="ml-2" size={18} /></PrimaryButton>
            </form>

            {error && <p className="mt-4 text-sm text-red-300">{error}</p>}
            {submitted && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4 text-sm text-emerald-200">
                <div className="flex items-center gap-2 font-bold"><Icon name="check" size={18} /> You’re on the MINT BANK waitlist.</div>
                <p className="mt-2 text-emerald-100/80">Your early access position: #{position}. Invite friends later to move higher.</p>
              </motion.div>
            )}

            <div className="mt-8 grid max-w-xl grid-cols-3 gap-4 text-center">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-2xl font-bold text-emerald-300">100%</p><p className="text-xs text-zinc-400">Digital</p></div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-2xl font-bold text-emerald-300">AI</p><p className="text-xs text-zinc-400">Insights</p></div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-2xl font-bold text-emerald-300">India</p><p className="text-xs text-zinc-400">First</p></div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }} className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-0 rounded-[3rem] bg-emerald-400/20 blur-3xl" />
            <div className="relative rounded-[3rem] border border-white/10 bg-gradient-to-b from-zinc-900 to-black p-5 shadow-2xl shadow-emerald-500/20">
              <div className="rounded-[2.5rem] border border-white/10 bg-black p-5">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2"><div className="h-8 w-8 rounded-xl bg-emerald-400" /><div><p className="text-sm font-bold">MINT BANK</p><p className="text-xs text-zinc-500">Smart account</p></div></div>
                  <Icon name="lock" className="text-emerald-300" size={20} />
                </div>
                <p className="text-sm text-zinc-400">Total Balance</p>
                <p className="mt-2 text-4xl font-black">₹2,45,678</p>
                <p className="mt-1 text-sm text-emerald-300">↑ 3.2% this month</p>
                <div className="mt-6 grid grid-cols-4 gap-3">{["Send", "Save", "Card", "AI"].map((item) => <div key={item} className="rounded-2xl bg-white/5 p-3 text-center text-xs text-zinc-300"><div className="mx-auto mb-2 h-8 w-8 rounded-xl bg-emerald-400/20" />{item}</div>)}</div>
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }} className="mt-6 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-emerald-950 p-5 text-white ring-1 ring-emerald-300/30 shadow-2xl shadow-emerald-500/20">
                  <div className="mb-10 flex items-start justify-between"><p className="font-black tracking-[0.2em] text-emerald-300">MINT</p><Icon name="card" size={24} /></div>
                  <p className="text-sm font-semibold">Premium Black Card</p><p className="mt-1 text-xs text-zinc-400">Launching soon</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10 md:px-12">
          <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-5 text-center backdrop-blur-xl md:grid-cols-3">
            <div><p className="text-3xl font-black text-emerald-300">12,000+</p><p className="text-sm text-zinc-400">target early waitlist users</p></div>
            <div><p className="text-3xl font-black text-emerald-300">2 min</p><p className="text-sm text-zinc-400">planned onboarding experience</p></div>
            <div><p className="text-3xl font-black text-emerald-300">0 branches</p><p className="text-sm text-zinc-400">digital-first banking vision</p></div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 md:px-12">
          <div className="mb-10 text-center"><p className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">Why Mint Bank?</p><h2 className="mt-3 text-3xl font-black md:text-5xl">A smarter way to bank</h2></div>
          <div className="grid gap-5 md:grid-cols-4">{features.map((feature) => <FeatureCard key={feature.title} {...feature} />)}</div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-6 py-16 md:grid-cols-2 md:px-12">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-300">Trust layer</p>
            <h2 className="mt-3 text-3xl font-black">Built for trust before launch.</h2>
            <div className="mt-6 space-y-4 text-zinc-300">
              <p className="flex gap-3"><Icon name="shield" className="shrink-0 text-emerald-300" /> Partner-bank ready compliance messaging.</p>
              <p className="flex gap-3"><Icon name="lock" className="shrink-0 text-emerald-300" /> Privacy-first waitlist collection.</p>
              <p className="flex gap-3"><Icon name="file" className="shrink-0 text-emerald-300" /> Terms, privacy policy, and contact footer included.</p>
            </div>
          </div>
          <div className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/15 to-white/5 p-8">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-300">Referral growth</p>
            <h2 className="mt-3 text-3xl font-black">Move up the waitlist.</h2>
            <p className="mt-5 text-zinc-300">After signup, users can invite friends to unlock priority beta access. This creates a launch loop for Instagram, WhatsApp, and founder-led growth.</p>
            <div className="mt-6 rounded-2xl bg-black/40 p-4 text-sm text-emerald-200">Invite 3 friends → unlock priority access</div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-16 md:px-12">
          <div className="mb-8 text-center"><p className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">FAQ</p><h2 className="mt-3 text-3xl font-black md:text-5xl">Questions before joining?</h2></div>
          <div className="space-y-4">{faqs.map(([q, a]) => <details key={q} className="rounded-2xl border border-white/10 bg-white/5 p-5"><summary className="cursor-pointer font-bold text-white">{q}</summary><p className="mt-3 leading-7 text-zinc-400">{a}</p></details>)}</div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-20 text-center md:px-12">
          <div className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/15 to-white/5 p-8 md:p-14">
            <h2 className="text-4xl font-black md:text-6xl">Be first to enter the future of banking.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-zinc-300">MINT BANK is currently in early-stage development. Join the waitlist and become part of the first community shaping the product.</p>
            <PrimaryButton onClick={scrollToWaitlist} className="mt-8 rounded-full px-8 py-6 text-base">Join Waitlist Now <Icon name="arrow" className="ml-2" size={18} /></PrimaryButton>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-12 text-xs text-zinc-500 md:px-12">
          <details className="rounded-2xl border border-white/10 bg-white/5 p-4"><summary className="cursor-pointer text-zinc-400">Developer self-checks</summary><ul className="mt-3 space-y-1">{selfTests.map((test) => <li key={test.name} className={test.pass ? "text-emerald-300" : "text-red-300"}>{test.pass ? "✓" : "✕"} {test.name}</li>)}</ul></details>
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-black/80 p-3 backdrop-blur-xl sm:hidden">
        <PrimaryButton onClick={scrollToWaitlist} className="w-full rounded-full">Join MINT BANK Waitlist</PrimaryButton>
      </div>

      <footer className="relative z-10 border-t border-white/10 px-6 pb-24 pt-8 text-center text-sm text-zinc-500 md:px-12 md:pb-8">
        <p>© 2026 MINT BANK. Banking. Reimagined. | mintbank.in</p>
        <p className="mt-2">Privacy Policy · Terms · Contact: hello@mintbank.in</p>
        <p className="mx-auto mt-3 max-w-3xl text-xs leading-6 text-zinc-600">MINT BANK is a fintech brand concept. Banking, card, and payment services require licensed partners and regulatory compliance before public launch.</p>
      </footer>
    </div>
  );
}
