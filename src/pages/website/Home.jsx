import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  ArrowUp,
  BarChart3,
  Brain,
  CheckCircle,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Menu,
  MessageSquare,
  ScanSearch,
  Scale,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Upload,
  UserCheck,
  Users,
  X,
  Zap,
} from "lucide-react";
import "../../styles/landingPaper.css";

const HERO_SVG_HTML = `
<svg viewBox="0 0 480 420" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
  <line x1="0" y1="105" x2="480" y2="105" stroke="#E5E7EB" stroke-width="0.5" opacity="0.85"/>
  <line x1="0" y1="210" x2="480" y2="210" stroke="#E5E7EB" stroke-width="0.5" opacity="0.85"/>
  <line x1="0" y1="315" x2="480" y2="315" stroke="#E5E7EB" stroke-width="0.5" opacity="0.85"/>
  <line x1="120" y1="0" x2="120" y2="420" stroke="#E5E7EB" stroke-width="0.5" opacity="0.5"/>
  <line x1="240" y1="0" x2="240" y2="420" stroke="#E5E7EB" stroke-width="0.5" opacity="0.5"/>
  <line x1="360" y1="0" x2="360" y2="420" stroke="#E5E7EB" stroke-width="0.5" opacity="0.5"/>
  <rect x="30" y="50" width="160" height="80" rx="12" fill="white" stroke="#E5E7EB" stroke-width="1"/>
  <rect x="46" y="66" width="32" height="32" rx="8" fill="#F9FAFB"/>
  <text x="56" y="87" font-family="Roboto, sans-serif" font-size="14" fill="#8B5CF6" text-anchor="middle">📄</text>
  <text x="92" y="82" font-family="Roboto, sans-serif" font-size="12" font-weight="600" fill="#111111">Submit Proposal</text>
  <text x="92" y="100" font-family="Roboto, sans-serif" font-size="10" fill="#6B7280">Upload & validate</text>
  <path d="M190 90 C 220 90, 240 60, 270 60" stroke="#D1D5DB" stroke-width="1.5" fill="none" stroke-dasharray="4 4" class="flow-dash-animate"/>
  <path d="M190 90 C 220 90, 240 60, 270 60" stroke="#8B5CF6" stroke-width="1.5" fill="none" opacity="0.2"/>
  <rect x="270" y="20" width="180" height="80" rx="12" fill="white" stroke="#E5E7EB" stroke-width="1"/>
  <rect x="286" y="36" width="32" height="32" rx="8" fill="#F9FAFB"/>
  <text x="296" y="57" font-family="Roboto, sans-serif" font-size="14" fill="#8B5CF6" text-anchor="middle">🧠</text>
  <text x="332" y="52" font-family="Roboto, sans-serif" font-size="12" font-weight="600" fill="#111111">AI Analysis</text>
  <text x="332" y="70" font-family="Roboto, sans-serif" font-size="10" fill="#6B7280">Similarity detection</text>
  <path d="M360 100 C 360 140, 320 160, 320 180" stroke="#D1D5DB" stroke-width="1.5" fill="none" stroke-dasharray="4 4" class="flow-dash-animate" style="animation-delay: 0.3s"/>
  <path d="M360 100 C 360 140, 320 160, 320 180" stroke="#8B5CF6" stroke-width="1.5" fill="none" opacity="0.15"/>
  <rect x="220" y="180" width="180" height="80" rx="12" fill="white" stroke="#E5E7EB" stroke-width="1"/>
  <rect x="236" y="196" width="32" height="32" rx="8" fill="#EFFCF4"/>
  <text x="246" y="217" font-family="Roboto, sans-serif" font-size="14" fill="#16A34A" text-anchor="middle">✅</text>
  <text x="282" y="212" font-family="Roboto, sans-serif" font-size="12" font-weight="600" fill="#111111">Committee Review</text>
  <text x="282" y="230" font-family="Roboto, sans-serif" font-size="10" fill="#6B7280">Evaluate & approve</text>
  <path d="M260 260 C 230 290, 170 290, 140 310" stroke="#D1D5DB" stroke-width="1.5" fill="none" stroke-dasharray="4 4" class="flow-dash-animate" style="animation-delay: 0.6s"/>
  <rect x="30" y="290" width="180" height="80" rx="12" fill="white" stroke="#E5E7EB" stroke-width="1"/>
  <rect x="46" y="306" width="32" height="32" rx="8" fill="#FFF7ED"/>
  <text x="56" y="327" font-family="Roboto, sans-serif" font-size="14" fill="#D97706" text-anchor="middle">👥</text>
  <text x="92" y="322" font-family="Roboto, sans-serif" font-size="12" font-weight="600" fill="#111111">Assign Supervisor</text>
  <text x="92" y="340" font-family="Roboto, sans-serif" font-size="10" fill="#6B7280">Smart matching</text>
  <path d="M210 340 C 260 350, 290 340, 310 330" stroke="#D1D5DB" stroke-width="1.5" fill="none" stroke-dasharray="4 4" class="flow-dash-animate" style="animation-delay: 0.9s"/>
  <rect x="290" y="300" width="170" height="80" rx="12" fill="white" stroke="#8B5CF6" stroke-width="1"/>
  <rect x="306" y="316" width="32" height="32" rx="8" fill="#F9FAFB"/>
  <text x="316" y="337" font-family="Roboto, sans-serif" font-size="14" fill="#8B5CF6" text-anchor="middle">📊</text>
  <text x="352" y="332" font-family="Roboto, sans-serif" font-size="12" font-weight="600" fill="#111111">Track Progress</text>
  <text x="352" y="350" font-family="Roboto, sans-serif" font-size="10" fill="#6B7280">Real-time analytics</text>
  <path d="M0 380 Q120 350, 240 370 T480 360" stroke="#D1D5DB" stroke-width="1" fill="none" opacity="0.5"/>
  <path d="M0 395 Q120 365, 240 385 T480 375" stroke="#E5E7EB" stroke-width="0.8" fill="none" opacity="0.5"/>
</svg>
`.trim();

function CountStat({ target, increment, intervalMs, suffix, label, revealClass }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || started.current) return;
        started.current = true;
        const timer = window.setInterval(() => {
          setCount((c) => {
            const next = Math.min(c + increment, target);
            if (next >= target) window.clearInterval(timer);
            return next;
          });
        }, intervalMs);
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, increment, intervalMs]);

  return (
    <div ref={ref} className={`text-center ${revealClass}`}>
      <div className="font-display mb-2 tracking-tight text-[#111111] text-4xl font-bold md:text-[32px]">
        <span>{target >= 1000 ? count.toLocaleString() : count}</span>
        <span className="text-[#8B5CF6]">{suffix}</span>
      </div>
      <p className="label-uppercase text-[#6B7280]">{label}</p>
    </div>
  );
}

function WorkflowFlow() {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(-1);
  const [flowProgress, setFlowProgress] = useState(0);
  const [dotPosition, setDotPosition] = useState(0);
  const totalSteps = 5;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const steps = container.querySelectorAll("[data-flow-step]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const stepIndex = parseInt(entry.target.getAttribute("data-flow-step") ?? "-1", 10);
          if (stepIndex < 0) return;
          setActiveStep((prev) => (stepIndex > prev ? stepIndex : prev));
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -25% 0px" }
    );
    steps.forEach((step) => obs.observe(step));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (activeStep < 0) return;
    setFlowProgress(((activeStep + 1) / totalSteps) * 100);
    const container = containerRef.current;
    const stepEl = container?.querySelector(`[data-flow-step="${activeStep}"]`);
    const node = stepEl?.querySelector(".flow-node");
    if (!node || !container) return;
    requestAnimationFrame(() => {
      const cr = container.getBoundingClientRect();
      const nr = node.getBoundingClientRect();
      setDotPosition(nr.top - cr.top + nr.height / 2);
    });
  }, [activeStep]);

  return (
    <div ref={containerRef} className="relative mx-auto max-w-3xl">
      <div className="hidden md:block">
        <div className="flow-line" />
        <div className="flow-line-fill" style={{ height: `${flowProgress}%` }} />
      </div>
      <div className="md:hidden">
        <div className="absolute bottom-0 left-[20px] top-0 w-0.5 bg-[#E5E7EB]" />
        <div
          className="absolute left-[20px] top-0 w-0.5 rounded-sm bg-[#8B5CF6] transition-all duration-700"
          style={{ height: `${flowProgress}%` }}
        />
      </div>
      <div className="hidden md:block">
        <div className="flow-dot" style={{ top: `${dotPosition}px` }} />
      </div>

      {/* Step 1 */}
      <div className="flow-step relative mb-24 flex items-start gap-6 md:mb-24 md:gap-0" data-flow-step="0">
        <div className="shrink-0 md:hidden">
          <div className={`flow-node${activeStep >= 0 ? " is-active" : ""}`}>
            <FileText className="flow-node-icon h-[18px] w-[18px] text-[#9CA3AF]" />
            <span className="flow-node-num">1</span>
          </div>
        </div>
        <div className="grid w-full md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
          <div className={`flow-step-card${activeStep >= 0 ? " is-active" : ""}`} style={{ textAlign: "right" }}>
            <div className="mb-3 flex justify-end gap-2">
              <span className="label-uppercase rounded-md border border-[#E5E7EB] bg-[#FAFAFA] px-3 py-1 text-[#8B5CF6]">
                Step 01
              </span>
            </div>
            <h3 className="font-display mb-2 text-lg font-bold text-[#111111]">Submit Proposal</h3>
            <p className="text-sm leading-relaxed text-[#6B7280]">
              Students upload their graduation project proposal with all required documentation through a guided
              submission form.
            </p>
            <div className="mt-4 flex justify-end gap-2 text-xs text-[#6B7280]">
              <Upload className="h-3 w-3 shrink-0" />
              <span>Upload docs, abstracts & team info</span>
            </div>
          </div>
          <div className="relative hidden justify-center md:flex">
            <div className={`flow-node${activeStep >= 0 ? " is-active" : ""}`}>
              <FileText className="flow-node-icon h-5 w-5 text-[#9CA3AF]" />
              <span className="flow-node-num">1</span>
            </div>
          </div>
          <div className="hidden md:block" />
        </div>
      </div>

      {/* Step 2 */}
      <div className="flow-step relative mb-24 flex items-start gap-6 md:mb-24 md:gap-0" data-flow-step="1">
        <div className="shrink-0 md:hidden">
          <div className={`flow-node${activeStep >= 1 ? " is-active" : ""}`}>
            <Brain className="flow-node-icon h-[18px] w-[18px] text-[#9CA3AF]" />
            <span className="flow-node-num">2</span>
          </div>
        </div>
        <div className="grid w-full md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
          <div className="hidden md:block" />
          <div className="relative hidden justify-center md:flex">
            <div className={`flow-node${activeStep >= 1 ? " is-active" : ""}`}>
              <Brain className="flow-node-icon h-5 w-5 text-[#9CA3AF]" />
              <span className="flow-node-num">2</span>
            </div>
          </div>
          <div className={`flow-step-card${activeStep >= 1 ? " is-active" : ""}`}>
            <div className="mb-3 flex gap-2">
              <span className="label-uppercase rounded-md border border-[#E5E7EB] bg-[#FAFAFA] px-3 py-1 text-[#8B5CF6]">
                Step 02
              </span>
            </div>
            <h3 className="font-display mb-2 text-lg font-bold text-[#111111]">AI Analysis</h3>
            <p className="text-sm leading-relaxed text-[#6B7280]">
              Our AI engine scans proposals for similarity against the entire academic database and validates
              originality with precision scoring.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 rounded-md border border-[#BBF7D0] bg-[#F0FDF4] px-2 py-1 text-xs font-medium text-[#16A34A]">
                <ShieldCheck className="h-3 w-3 shrink-0" /> 98% Accuracy
              </div>
              <div className="flex items-center gap-1 text-xs text-[#6B7280]">
                <Zap className="h-3 w-3 shrink-0" /> Real-time
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 3 */}
      <div className="flow-step relative mb-24 flex items-start gap-6 md:mb-24 md:gap-0" data-flow-step="2">
        <div className="shrink-0 md:hidden">
          <div className={`flow-node${activeStep >= 2 ? " is-active" : ""}`}>
            <CheckCircle className="flow-node-icon h-[18px] w-[18px] text-[#9CA3AF]" />
            <span className="flow-node-num">3</span>
          </div>
        </div>
        <div className="grid w-full md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
          <div className={`flow-step-card${activeStep >= 2 ? " is-active" : ""}`} style={{ textAlign: "right" }}>
            <div className="mb-3 flex justify-end gap-2">
              <span className="label-uppercase rounded-md border border-[#E5E7EB] bg-[#FAFAFA] px-3 py-1 text-[#8B5CF6]">
                Step 03
              </span>
            </div>
            <h3 className="font-display mb-2 text-lg font-bold text-[#111111]">Committee Review</h3>
            <p className="text-sm leading-relaxed text-[#6B7280]">
              Department committees evaluate the AI-analyzed proposal, provide feedback, and make approval decisions
              through a structured review flow.
            </p>
            <div className="mt-4 flex justify-end gap-2 text-xs text-[#6B7280]">
              <MessageSquare className="h-3 w-3 shrink-0" />
              <span>Feedback & approval workflow</span>
            </div>
          </div>
          <div className="relative hidden justify-center md:flex">
            <div className={`flow-node${activeStep >= 2 ? " is-active" : ""}`}>
              <CheckCircle className="flow-node-icon h-5 w-5 text-[#9CA3AF]" />
              <span className="flow-node-num">3</span>
            </div>
          </div>
          <div className="hidden md:block" />
        </div>
      </div>

      {/* Step 4 */}
      <div className="flow-step relative mb-24 flex items-start gap-6 md:mb-24 md:gap-0" data-flow-step="3">
        <div className="shrink-0 md:hidden">
          <div className={`flow-node${activeStep >= 3 ? " is-active" : ""}`}>
            <UserCheck className="flow-node-icon h-[18px] w-[18px] text-[#9CA3AF]" />
            <span className="flow-node-num">4</span>
          </div>
        </div>
        <div className="grid w-full md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
          <div className="hidden md:block" />
          <div className="relative hidden justify-center md:flex">
            <div className={`flow-node${activeStep >= 3 ? " is-active" : ""}`}>
              <UserCheck className="flow-node-icon h-5 w-5 text-[#9CA3AF]" />
              <span className="flow-node-num">4</span>
            </div>
          </div>
          <div className={`flow-step-card${activeStep >= 3 ? " is-active" : ""}`}>
            <div className="mb-3 flex gap-2">
              <span className="label-uppercase rounded-md border border-[#E5E7EB] bg-[#FAFAFA] px-3 py-1 text-[#8B5CF6]">
                Step 04
              </span>
            </div>
            <h3 className="font-display mb-2 text-lg font-bold text-[#111111]">Assign Supervisor</h3>
            <p className="text-sm leading-relaxed text-[#6B7280]">
              The system intelligently matches approved projects with the most suitable supervisor based on expertise,
              workload, and research alignment.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5 rounded-md border border-[#E9D5FF] bg-[#FAF5FF] px-2 py-1 text-xs font-medium text-[#8B5CF6]">
                <Sparkles className="h-3 w-3 shrink-0" /> Smart Match
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                <Scale className="h-3 w-3 shrink-0" /> Load balanced
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 5 */}
      <div className="flow-step relative flex items-start gap-6 md:gap-0" data-flow-step="4">
        <div className="shrink-0 md:hidden">
          <div className={`flow-node${activeStep >= 4 ? " is-active" : ""}`}>
            <BarChart3 className="flow-node-icon h-[18px] w-[18px] text-[#9CA3AF]" />
            <span className="flow-node-num">5</span>
          </div>
        </div>
        <div className="grid w-full md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
          <div className={`flow-step-card${activeStep >= 4 ? " is-active" : ""}`} style={{ textAlign: "right" }}>
            <div className="mb-3 flex justify-end gap-2">
              <span className="label-uppercase rounded-md border border-[#E5E7EB] bg-[#FAFAFA] px-3 py-1 text-[#8B5CF6]">
                Step 05
              </span>
            </div>
            <h3 className="font-display mb-2 text-lg font-bold text-[#111111]">Track & Evaluate</h3>
            <p className="text-sm leading-relaxed text-[#6B7280]">
              Supervisors and students collaborate through the platform — tracking milestones, sharing feedback, and
              conducting final evaluations seamlessly.
            </p>
            <div className="mt-4 flex justify-end gap-2 text-xs text-[#6B7280]">
              <Activity className="h-3 w-3 shrink-0" />
              <span>Real-time progress dashboards</span>
            </div>
          </div>
          <div className="relative hidden justify-center md:flex">
            <div className={`flow-node${activeStep >= 4 ? " is-active" : ""}`}>
              <BarChart3 className="flow-node-icon h-5 w-5 text-[#9CA3AF]" />
              <span className="flow-node-num">5</span>
            </div>
          </div>
          <div className="hidden md:block" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const landingRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenu) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileMenu]);

  useEffect(() => {
    const root = landingRef.current;
    if (!root) return;
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    root.querySelectorAll(".reveal, .reveal-hero, .reveal-header").forEach((el) => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, []);

  const year = new Date().getFullYear();

  return (
    <div ref={landingRef} className="landing-paper scroll-smooth">
      <header
        className={`reveal-header fixed left-0 right-0 top-0 z-50 border-b border-[#E5E7EB] bg-white transition-[padding,box-shadow] duration-200 ${
          scrolled ? "py-3 shadow-[0_1px_3px_rgba(0,0,0,0.06)]" : "py-6"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8">
          <Link to="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#111111] shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-transform duration-200 group-hover:scale-[1.02]">
              <GraduationCap className="h-5 w-5 text-white" aria-hidden />
            </div>
            <div className="flex flex-col">
              <span className="font-display mb-1 text-base font-bold leading-none tracking-tight text-[#111111]">
                Evaluate It Easily
              </span>
              <span className="label-uppercase leading-none text-[#8B5CF6]">Minya Academic</span>
            </div>
          </Link>

          <div className="hidden items-center gap-8 md:flex" role="navigation" aria-label="Main">
            <a href="#features" className="nav-link">
              Features
            </a>
            <a href="#workflow" className="nav-link">
              How It Works
            </a>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </div>

          <div className="hidden items-center gap-6 md:flex">
            <Link to="/auth" className="text-sm font-medium text-[#374151] transition-colors hover:text-[#8B5CF6]">
              Log in
            </Link>
            <Link to="/auth" className="btn-primary !px-6 !py-2 !text-xs">
              Launch Platform
            </Link>
          </div>

          <button
            type="button"
            className="rounded-md border border-transparent p-3 transition-colors hover:border-[#E5E7EB] hover:bg-[#F9FAFB] md:hidden"
            onClick={() => setMobileMenu((v) => !v)}
            aria-expanded={mobileMenu}
            aria-controls="landing-mobile-menu"
          >
            {mobileMenu ? <X className="h-6 w-6 text-[#374151]" /> : <Menu className="h-6 w-6 text-[#374151]" />}
          </button>
        </div>

        {mobileMenu ? (
          <div
            id="landing-mobile-menu"
            className="paper-surface overflow-hidden border-t border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] md:hidden"
            role="navigation"
            aria-label="Mobile"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-2 px-8 py-8">
              <a
                href="#features"
                className="rounded-md border border-transparent px-4 py-4 text-sm font-medium text-[#374151] transition-colors hover:border-[#E5E7EB] hover:bg-[#F9FAFB] hover:text-[#8B5CF6]"
                onClick={() => setMobileMenu(false)}
              >
                Features
              </a>
              <a
                href="#workflow"
                className="rounded-md border border-transparent px-4 py-4 text-sm font-medium text-[#374151] transition-colors hover:border-[#E5E7EB] hover:bg-[#F9FAFB] hover:text-[#8B5CF6]"
                onClick={() => setMobileMenu(false)}
              >
                How It Works
              </a>
              <Link
                to="/about"
                className="rounded-md border border-transparent px-4 py-4 text-sm font-medium text-[#374151] transition-colors hover:border-[#E5E7EB] hover:bg-[#F9FAFB] hover:text-[#8B5CF6]"
                onClick={() => setMobileMenu(false)}
              >
                About
              </Link>
              <hr className="my-6 border-[#E5E7EB]" />
              <div className="flex flex-col gap-3 px-4">
                <Link to="/auth" className="py-3 text-center text-sm font-medium text-[#111111]" onClick={() => setMobileMenu(false)}>
                  Log in
                </Link>
                <Link to="/auth" className="btn-primary w-full py-4" onClick={() => setMobileMenu(false)}>
                  Launch Platform
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <section className="paper-surface relative overflow-hidden border-b border-[#E5E7EB] bg-[#F9FAFB] pb-32 pt-36 lg:pb-32 lg:pt-40">
        <div className="relative z-10 mx-auto max-w-6xl px-8">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-8">
              <div className="reveal-hero inline-flex items-center gap-2 rounded-md border border-[#E5E7EB] bg-white px-4 py-2 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                <span className="h-2 w-2 rounded-full bg-[#8B5CF6]" />
                <span className="label-uppercase text-[#8B5CF6]">AI-Powered Academic Platform</span>
              </div>
              <h1 className="reveal-hero reveal-delay-2 font-display text-[40px] font-bold leading-tight tracking-tight text-[#111111] lg:text-[40px]">
                Smarter Graduation
                <br />
                <span className="text-[#8B5CF6]">Project Management</span>
              </h1>
              <p className="reveal-hero reveal-delay-3 max-w-[520px] text-lg leading-relaxed text-[#6B7280]">
                An intelligent system that detects proposal similarity, assigns supervisors, and tracks academic progress —{" "}
                <span className="font-medium text-[#111827]">built for Egyptian university excellence.</span>
              </p>
              <div className="reveal-hero reveal-delay-4 flex flex-wrap gap-4 pt-4">
                <Link to="/auth" className="btn-primary group px-8 py-4">
                  Get Started Today
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
                <a href="#features" className="btn-secondary px-8 py-4">
                  Explore Platform
                </a>
              </div>
            </div>
            <div className="reveal-hero reveal-delay-6 relative hidden lg:block">
              <div
                className="float-gentle"
                // eslint-disable-next-line react/no-danger -- static hero diagram from landing HTML
                dangerouslySetInnerHTML={{ __html: HERO_SVG_HTML }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="paper-surface relative z-10 border-y border-[#E5E7EB] bg-white py-8 md:py-12">
        <div className="mx-auto max-w-6xl px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <CountStat
              target={15000}
              increment={500}
              intervalMs={25}
              suffix="+"
              label="Projects Analyzed"
              revealClass="reveal"
            />
            <CountStat
              target={500}
              increment={20}
              intervalMs={25}
              suffix="+"
              label="Supervisors Assigned"
              revealClass="reveal reveal-delay-1"
            />
            <CountStat
              target={98}
              increment={2}
              intervalMs={30}
              suffix="%"
              label="AI Accuracy"
              revealClass="reveal reveal-delay-2"
            />
            <CountStat
              target={12}
              increment={1}
              intervalMs={80}
              suffix="+"
              label="Departments"
              revealClass="reveal reveal-delay-3"
            />
          </div>
        </div>
      </section>

      <section id="features" className="relative overflow-hidden border-b border-[#E5E7EB] py-16 md:py-24">
        <div className="relative z-10 mx-auto max-w-6xl px-8">
          <div className="mx-auto mb-16 max-w-xl text-center">
            <p className="reveal label-uppercase mb-3 text-[#8B5CF6]">Core Modules</p>
            <h2 className="reveal reveal-delay-1 font-display mb-4 text-[32px] font-bold leading-tight text-[#111111] md:text-[32px]">
              Powerful Tools for
              <br />
              Academic Excellence
            </h2>
            <p className="reveal reveal-delay-2 leading-relaxed text-[#6B7280]">
              Everything your university needs to manage graduation projects — from submission to final evaluation.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="reveal card group p-8">
              <div className="flex items-start gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-[#E5E7EB] bg-[#FAFAFA] text-[#8B5CF6]">
                  <ScanSearch className="h-[22px] w-[22px]" aria-hidden />
                </div>
                <div>
                  <h3 className="font-display mb-2 text-base font-bold text-[#111111] transition-colors group-hover:text-[#8B5CF6]">
                    AI Similarity Detection
                  </h3>
                  <p className="text-sm leading-relaxed text-[#6B7280]">
                    Automatically detect duplicate or similar project proposals using advanced NLP algorithms with
                    high-precision academic matching.
                  </p>
                </div>
              </div>
            </div>
            <div className="reveal reveal-delay-1 card group p-8">
              <div className="flex items-start gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-[#E5E7EB] bg-[#FAFAFA] text-[#8B5CF6]">
                  <Users className="h-[22px] w-[22px]" aria-hidden />
                </div>
                <div>
                  <h3 className="font-display mb-2 text-base font-bold text-[#111111] transition-colors group-hover:text-[#8B5CF6]">
                    Smart Supervisor Matching
                  </h3>
                  <p className="text-sm leading-relaxed text-[#6B7280]">
                    Match projects to supervisors based on expertise, research interests, workload balance, and
                    real-time availability.
                  </p>
                </div>
              </div>
            </div>
            <div className="reveal reveal-delay-2 card group p-8">
              <div className="flex items-start gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-[#E5E7EB] bg-[#F0FDF4] text-[#16A34A]">
                  <ClipboardCheck className="h-[22px] w-[22px]" aria-hidden />
                </div>
                <div>
                  <h3 className="font-display mb-2 text-base font-bold text-[#111111] transition-colors group-hover:text-[#16A34A]">
                    Rapid Evaluation System
                  </h3>
                  <p className="text-sm leading-relaxed text-[#6B7280]">
                    Streamlined committee workflow for project reviews, graded assessments, and institutional decisions
                    with full audit trails.
                  </p>
                </div>
              </div>
            </div>
            <div className="reveal reveal-delay-3 card group p-8">
              <div className="flex items-start gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-[#E5E7EB] bg-[#FFFBEB] text-[#D97706]">
                  <TrendingUp className="h-[22px] w-[22px]" aria-hidden />
                </div>
                <div>
                  <h3 className="font-display mb-2 text-base font-bold text-[#111111] transition-colors group-hover:text-[#D97706]">
                    Progress Tracking
                  </h3>
                  <p className="text-sm leading-relaxed text-[#6B7280]">
                    Monitor student milestones throughout the entire project lifecycle with detailed analytical dashboards
                    and automated reports.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="workflow" className="paper-surface relative overflow-hidden border-b border-[#E5E7EB] bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-8">
          <div className="mx-auto mb-24 max-w-xl text-center">
            <p className="reveal label-uppercase mb-3 text-[#8B5CF6]">System Flow</p>
            <h2 className="reveal reveal-delay-1 font-display mb-4 text-[32px] font-bold leading-tight text-[#111111] md:text-[32px]">
              How It Works
            </h2>
            <p className="reveal reveal-delay-2 leading-relaxed text-[#6B7280]">
              A structured journey from submission to completion — flowing naturally like the academic process should.
            </p>
          </div>
          <WorkflowFlow />
        </div>
      </section>

      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="relative z-10 mx-auto max-w-2xl px-8 text-center">
          <div className="reveal">
            <h2 className="font-display mb-4 text-[32px] font-bold leading-tight tracking-tight text-[#111111] md:text-[32px]">
              Ready to Transform Your
              <br />
              Academic Workflow?
            </h2>
            <p className="reveal reveal-delay-1 mx-auto mb-8 max-w-lg leading-relaxed text-[#6B7280]">
              Join universities across Egypt already using our platform to streamline graduation project management.
            </p>
            <div className="reveal reveal-delay-2 flex flex-wrap justify-center gap-4">
              <Link to="/auth" className="btn-primary">
                Start Free Trial
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a href="#features" className="btn-secondary">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative overflow-hidden border-t border-[#374151] bg-[#111111] text-white">
        <div className="absolute left-0 top-0 h-px w-full bg-[#E5E7EB]" aria-hidden />
        <div className="relative z-10 mx-auto max-w-6xl px-8 pb-8 pt-16">
          <div className="grid grid-cols-1 gap-12 border-b border-[#374151] pb-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                  <GraduationCap className="h-[18px] w-[18px] text-[#111111]" aria-hidden />
                </div>
                <span className="font-display text-lg font-bold tracking-tight text-white">Evaluate It Easily</span>
              </div>
              <p className="mb-8 max-w-[320px] text-sm leading-relaxed text-[#9CA3AF]">
                AI-powered graduation project management for the modern Egyptian university ecosystem. Built in Minya.
              </p>
              <div className="flex max-w-[320px] items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-md border border-[#4B5563] bg-[#1F2937] px-4 py-3 text-sm text-white placeholder:text-[#9CA3AF] transition-colors focus:border-[#8B5CF6] focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  className="shrink-0 rounded-md bg-[#8B5CF6] px-4 py-3 text-sm font-medium text-white shadow-[0_1px_3px_rgba(0,0,0,0.12)] transition-colors hover:bg-[#7C3AED]"
                >
                  Subscribe
                </button>
              </div>
              <p className="mt-3 text-xs text-[#9CA3AF]">Get updates on new features and releases.</p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:col-span-8">
              <div>
                <h4 className="label-uppercase mb-4 text-[#D1D5DB]">Product</h4>
                <ul className="space-y-4">
                  <li>
                    <a href="#features" className="text-sm text-[#9CA3AF] transition-colors hover:text-white">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#workflow" className="text-sm text-[#9CA3AF] transition-colors hover:text-white">
                      How It Works
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-[#9CA3AF] transition-colors hover:text-white">
                      AI Engine
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-[#9CA3AF] transition-colors hover:text-white">
                      Integrations
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="label-uppercase mb-4 text-[#D1D5DB]">Resources</h4>
                <ul className="space-y-4">
                  <li>
                    <a href="#" className="text-sm text-[#9CA3AF] transition-colors hover:text-white">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-[#9CA3AF] transition-colors hover:text-white">
                      API Reference
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-[#9CA3AF] transition-colors hover:text-white">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-[#9CA3AF] transition-colors hover:text-white">
                      Guides
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="label-uppercase mb-4 text-[#D1D5DB]">Company</h4>
                <ul className="space-y-4">
                  <li>
                    <Link to="/about" className="text-sm text-[#9CA3AF] transition-colors hover:text-white">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-[#9CA3AF] transition-colors hover:text-white">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-[#9CA3AF] transition-colors hover:text-white">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-[#9CA3AF] transition-colors hover:text-white">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="label-uppercase mb-4 text-[#D1D5DB]">Legal</h4>
                <ul className="space-y-4">
                  <li>
                    <a href="#" className="text-sm text-[#9CA3AF] transition-colors hover:text-white">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-[#9CA3AF] transition-colors hover:text-white">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-[#9CA3AF] transition-colors hover:text-white">
                      Cookie Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-[#9CA3AF] transition-colors hover:text-white">
                      Accessibility
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-8 pt-8 md:flex-row">
            <div className="flex flex-col items-center gap-8 sm:flex-row">
              <span className="text-sm text-[#9CA3AF]">
                &copy; {year} Evaluate It Easily. All rights reserved.
              </span>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#16A34A]" />
                <span className="text-xs font-medium text-[#9CA3AF]">All systems operational</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-transparent text-[#9CA3AF] transition-colors hover:border-[#374151] hover:bg-[#1F2937] hover:text-white"
                  aria-label="GitHub"
                >
                  <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-transparent text-[#9CA3AF] transition-colors hover:border-[#374151] hover:bg-[#1F2937] hover:text-white"
                  aria-label="LinkedIn"
                >
                  <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-transparent text-[#9CA3AF] transition-colors hover:border-[#374151] hover:bg-[#1F2937] hover:text-white"
                  aria-label="Twitter"
                >
                  <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-transparent text-[#9CA3AF] transition-colors hover:border-[#374151] hover:bg-[#1F2937] hover:text-white"
                  aria-label="YouTube"
                >
                  <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
              <div className="hidden h-5 w-px bg-[#374151] md:block" />
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group flex items-center gap-3 text-xs text-[#9CA3AF] transition-colors hover:text-white"
                aria-label="Back to top"
              >
                <span className="hidden sm:inline">Back to top</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-md border border-[#374151] bg-[#1F2937] shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-colors group-hover:border-[#4B5563]">
                  <ArrowUp className="h-4 w-4" aria-hidden />
                </div>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
