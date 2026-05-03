import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { getToken, getUserRole } from "../../services/authServices";
import { ROUTES } from "./constants";

function primaryCta() {
  const token = getToken();
  const role = getUserRole();
  if (!token) return { to: ROUTES.auth, label: "Enter the app" };
  if (role === "Admin") return { to: ROUTES.admin, label: "Admin" };
  return { to: ROUTES.dashboard, label: "Dashboard" };
}

function PipelineArtifact({ reduceMotion }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute right-[-8%] top-1/2 hidden -translate-y-1/2 lg:block xl:right-0 xl:translate-x-0"
      style={{ width: "min(52vw, 520px)", height: "420px" }}
    >
      <svg viewBox="0 0 400 340" fill="none" className="h-full w-full text-white/10">
        <defs>
          <linearGradient id="pipe" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#00bc8a" stopOpacity="0.65" />
            <stop offset="1" stopColor="#22d3ee" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <motion.path
          d="M20 280 C 80 100, 120 240, 200 140 S 280 60, 360 160"
          stroke="url(#pipe)"
          strokeWidth="1.75"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: reduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduceMotion ? 0 : 1.35, ease: [0.22, 1, 0.36, 1] }}
        />
        {[
          { cx: 20, cy: 280, delay: 0 },
          { cx: 200, cy: 140, delay: 0.25 },
          { cx: 360, cy: 160, delay: 0.5 },
        ].map((n, i) => (
          <motion.circle
            key={i}
            cx={n.cx}
            cy={n.cy}
            r="6"
            className="fill-[color:var(--primary-color,#00bc8a)]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: reduceMotion ? 0 : 0.4 + n.delay, duration: 0.45 }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const cta = useMemo(() => primaryCta(), []);

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden pb-24 pt-[5.75rem] sm:pt-24">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[#03060c]" />
      <div
        className="pointer-events-none absolute inset-[-20%] -z-10 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 20%, rgb(0,188,138) 0%, transparent 45%),
          radial-gradient(circle at 70% 60%, rgb(56,189,248) 0%, transparent 40%)`,
        }}
      />
      {/* subtle grain */}
      <div
        className="pointer-events-none absolute inset-0 -z-[8] opacity-[0.04]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <PipelineArtifact reduceMotion={reduceMotion} />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <motion.p
          className="text-[11px] font-medium uppercase tracking-[0.45em] text-emerald-400/90"
          initial={reduceMotion ? false : { opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, letterSpacing: "0.45em" }}
          transition={{ duration: 0.65 }}
        >
          Evaluate It Easily
        </motion.p>

        <motion.h1
          className="mt-8 max-w-[14ch] font-light leading-[1.02] tracking-[-0.04em] text-white"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0 : 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "clamp(2.5rem, 6vw + 1rem, 4.35rem)",
          }}
        >
          Graduation projects,
          <span className="mt-2 block bg-gradient-to-r from-white via-white to-emerald-200/85 bg-clip-text font-light text-transparent">
            one steady line
          </span>
        </motion.h1>

        <motion.p
          className="mt-8 max-w-md text-[0.9375rem] leading-[1.65] text-slate-400"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduceMotion ? 0 : 0.22, duration: 0.55 }}
        >
          Upload proposal PDFs, read similarity scores, track committee status—same routes and guards as the rest of your app.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-wrap items-center gap-5"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0 : 0.3 }}
        >
          <Link
            to={cta.to}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[color:var(--primary-color,#00bc8a)] px-8 py-[0.72rem] text-sm font-semibold text-[#02120c] shadow-[0_0_0_1px_rgba(255,255,255,0.12)] transition hover:brightness-[1.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70"
          >
            <span>{cta.label}</span>
            <span className="-mr-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/15 text-lg transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </Link>

          <Link
            to="/#features"
            className="text-sm font-medium text-slate-400 underline decoration-white/15 underline-offset-4 transition hover:text-emerald-200/90 hover:decoration-emerald-500/60"
          >
            Explore features →
          </Link>
        </motion.div>

        <motion.div
          className="mt-20 grid grid-cols-3 gap-6 border-t border-white/[0.07] pt-12 sm:max-w-lg"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduceMotion ? 0 : 0.45 }}
        >
          {[
            ["Group + invites", "CreateGroup"],
            ["Proposal PDF • 10MB", "Proposal"],
            ["Same pipeline", "Status"],
          ].map(([a, b], i) => (
            <div key={i} className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-600">{b}</p>
              <p className="mt-2 text-[13px] leading-snug text-slate-300">{a}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
