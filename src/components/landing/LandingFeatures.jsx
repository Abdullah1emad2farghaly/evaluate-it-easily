import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

const TILES = [
  {
    span: "md:col-span-7",
    hue: "from-emerald-500/20 via-emerald-500/0 to-transparent",
    title: "Proposal pipeline",
    subtitle: "CreateProposal",
    line: "Title, abstract, and PDF—with presigned upload and progress—not ad-hoc attachments.",
    Decor: ProposalDecor,
  },
  {
    span: "md:col-span-5",
    hue: "from-cyan-500/15 via-sky-500/0",
    title: "Similarity readout",
    subtitle: "/dashboard/similarity",
    line: "See evaluation-linked similarity signals before the committee dives into the PDF.",
    Decor: WavesDecor,
  },
  {
    span: "md:col-span-4",
    hue: "from-violet-500/15",
    title: "Groups & invites",
    subtitle: "CreateGroup",
    line: "Build a cohort from available students; route invites through My and Group invitations.",
    Decor: NodesDecor,
  },
  {
    span: "md:col-span-4",
    hue: "from-amber-500/12",
    title: "Live status bar",
    subtitle: "ProjectStatusTracker",
    line: "Pending to UnderReview to outcomes—including Rejected and FinalDecision when they apply.",
    Decor: StepsDecor,
  },
  {
    span: "md:col-span-4",
    hue: "from-rose-500/12",
    title: "In-app signals",
    subtitle: "Notifications",
    line: "Route updates through the Notifications surface under the guarded dashboard.",
    Decor: PulseDecor,
  },
  {
    span: "md:col-span-12",
    hue: "from-white/10 via-transparent",
    wide: true,
    title: "Committee consoles",
    subtitle: "/admin",
    line: "Same proposal payloads fuel Pending projects, Accepted and Rejected pipelines, Analyze, SubmissionPeriods, Statistics.",
    Decor: ShieldDecor,
  },
];

export default function LandingFeatures() {
  return (
    <section id="features" className="scroll-mt-28 border-t border-white/6 bg-[#020509] px-4 py-[4.5rem] sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease }}
        >
          <p className="font-mono text-[11px] text-emerald-500/75">capabilities</p>
          <h2 className="mt-2 text-[1.65rem] font-light tracking-tight text-white sm:text-3xl">What Evaluate It Easily ships</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            Mapped to routes and screens in your codebase—as a collage, not marketing filler.
          </p>
        </motion.div>

        <div className="grid auto-rows-fr gap-4 md:grid-cols-12">
          {TILES.map((tile, i) => {
            const Decor = tile.Decor;
            return (
              <motion.article
                key={tile.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: Math.min(i * 0.05, 0.35), duration: 0.5, ease }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className={`group relative overflow-hidden rounded-[1.35rem] border border-white/[0.06] bg-white/[0.02] p-6 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.85)] sm:p-7 ${tile.span} ${tile.wide ? "md:flex md:items-center md:gap-10 md:p-9" : ""}`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-[0.55] blur-3xl transition duration-500 group-hover:opacity-[0.85] ${tile.hue}`}
                />

                <div className={`relative ${tile.wide ? "flex min-w-0 flex-1 flex-col md:flex-row md:items-center md:gap-10" : ""}`}>
                  <div
                    className={`mb-6 flex shrink-0 items-center justify-center text-emerald-200/85 ${tile.wide ? "md:mb-0 md:w-[200px]" : ""}`}
                  >
                    <Decor />
                  </div>
                  <div className={`min-w-0 ${tile.wide ? "md:flex-1" : ""}`}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">{tile.subtitle}</p>
                    <h3 className="mt-2 text-lg font-medium tracking-tight text-white">{tile.title}</h3>
                    <p className="mt-2 text-[0.9rem] leading-relaxed text-slate-400">{tile.line}</p>
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-px rounded-[1.28rem] ring-1 ring-inset ring-white/[0.04]" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProposalDecor() {
  return (
    <motion.svg viewBox="0 0 120 96" className="h-24 w-32 sm:h-[5.75rem] sm:w-40" aria-hidden initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
      <rect x="12" y="10" width="96" height="76" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(148,163,184,0.25)" strokeWidth="1.2" />
      <path d="M28 34h52M28 52h76M28 70h56" stroke="rgba(148,163,184,0.35)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="88" cy="28" r="12" fill="rgba(0,188,138,0.45)" opacity={0.9} />
      <motion.path
        d="M82 29l6 6 14-13"
        stroke="#020509"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease }}
      />
    </motion.svg>
  );
}

function WavesDecor() {
  return (
    <svg viewBox="0 0 120 96" className="h-24 w-32 text-cyan-400/65 sm:h-[5.75rem] sm:w-40" aria-hidden>
      {[26, 40, 54].map((y, i) => (
        <motion.path
          key={y}
          d={`M8 ${y} Q 38 ${y - (i === 1 ? 10 : 6)} 60 ${y} T 112 ${y}`}
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.25, 0.95, 0.25], y: [0, -2, 0] }}
          transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
        />
      ))}
      <circle cx="60" cy="48" r="22" stroke="rgba(56,189,248,0.25)" strokeWidth="1" fill="rgba(56,189,248,0.06)" />
    </svg>
  );
}

function NodesDecor() {
  return (
    <motion.svg viewBox="0 0 120 96" className="h-24 w-32 text-violet-300/65 sm:h-[5.75rem] sm:w-40" aria-hidden animate={{ rotate: [0, 3, 0] }} transition={{ duration: 14, repeat: Infinity }}>
      <circle cx="36" cy="48" r="10" fill="rgba(139,92,246,0.38)" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
      <circle cx="86" cy="34" r="9" fill="rgba(167,139,250,0.26)" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
      <circle cx="86" cy="62" r="9" fill="rgba(167,139,250,0.26)" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
      <line x1="45" y1="42" x2="78" y2="36" stroke="rgba(148,163,184,0.42)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="45" y1="54" x2="78" y2="60" stroke="rgba(148,163,184,0.42)" strokeWidth="1.5" strokeLinecap="round" />
    </motion.svg>
  );
}

function StepsDecor() {
  const nodes = [
    { y: 30, active: false },
    { y: 48, active: true },
    { y: 66, active: false },
  ];
  return (
    <svg viewBox="0 0 120 96" className="h-24 w-32 sm:h-[5.75rem] sm:w-40" aria-hidden>
      <line x1="34" x2="34" y1="24" y2="74" stroke="rgba(148,163,184,0.3)" strokeWidth="2.5" strokeLinecap="round" />
      {nodes.map(({ y, active }, idx) => (
        <motion.circle
          key={y}
          cx="34"
          cy={y}
          r="8"
          fill={active ? "rgba(56,189,248,0.85)" : idx === 0 ? "rgba(234,179,8,0.7)" : "rgba(34,197,94,0.7)"}
          animate={active ? { opacity: [0.55, 1, 0.55] } : {}}
          transition={{ duration: 1.8, repeat: active ? Infinity : 0 }}
        />
      ))}
      <rect x="58" y="38" width="48" height="22" rx="8" fill="rgba(34,211,238,0.12)" stroke="rgba(148,163,184,0.2)" strokeWidth="1" />
      <text x="66" y="53" fill="rgba(148,163,184,0.75)" fontSize="10" fontFamily="ui-monospace, monospace">
        status
      </text>
    </svg>
  );
}

function PulseDecor() {
  return (
    <svg viewBox="0 0 120 96" className="h-24 w-32 text-rose-400/65 sm:h-[5.75rem] sm:w-40" aria-hidden>
      <motion.rect x="54" y="42" width="14" height="14" rx="4" fill="rgba(244,114,182,0.45)" animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.12, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
      <motion.circle cx="60" cy="48" r="34" stroke="rgba(244,114,182,0.22)" strokeWidth="1" fill="none" animate={{ opacity: [0.2, 0.55, 0.2] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.path d="M16 74h94" stroke="rgba(251,113,133,0.35)" strokeWidth="3" strokeLinecap="round" animate={{ opacity: [0.35, 0.92, 0.35] }} transition={{ duration: 2.4, repeat: Infinity }} />
    </svg>
  );
}

function ShieldDecor() {
  return (
    <motion.svg viewBox="0 0 120 72" className="h-16 w-40 shrink-0 text-slate-400/45 sm:h-[4.75rem]" aria-hidden initial={{ opacity: 0.6 }} animate={{ opacity: [0.5, 0.92, 0.5] }} transition={{ duration: 3.2, repeat: Infinity }}>
      <path d="M60 8 L102 26 V58 Q60 92 18 58 V26 Z" stroke="currentColor" strokeWidth="1.75" fill="rgba(148,163,184,0.07)" strokeLinejoin="round" />
      <motion.path
        d="M44 42 L54 54 L78 34"
        stroke="rgba(94,234,212,0.85)"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, ease }}
      />
      <rect x="32" y="18" width="56" height="8" rx="2" fill="rgba(148,163,184,0.18)" opacity="0.9" />
    </motion.svg>
  );
}
