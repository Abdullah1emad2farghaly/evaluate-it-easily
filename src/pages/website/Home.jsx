import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

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
import { useTheme } from "@emotion/react";
import { ColorModeContext, tokens } from "../../theme";
import { logout } from "../../services/authServices";




function WorkflowFlow({ colors }) {
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
            <div className="hidden md:block left-1/2 -translate-x-1/2 absolute top-0 h-full w-1">
                <div className="flow-line" />
                <div className="flow-line-fill bg-green-500" style={{ height: `${flowProgress}%` }} />
            </div>
            <div className="hidden md:block">
                <div className="flow-dot" style={{ top: `${dotPosition}px` }} />
            </div>

            {/* Step 1 */}
            <div className="flow-step relative mb-5 flex items-start gap-6 md:mb-24 md:gap-0 " data-flow-step="0">
                <div data-aos="zoom-in-right" className="grid w-full md:grid-cols-[1fr_auto_1fr] md:items-center  md:gap-8">
                    <div className={`flow-step-card ${activeStep >= 0 ? " is-active" : ""}`} style={{ textAlign: "right", backgroundColor: colors.primary[500], borderColor: "#8B5CF6" }}>
                        <div className="mb-3 flex justify-end gap-2">
                            <span className="label-uppercase rounded-md border border-[#E5E7EB] bg-[#eceffc] px-3 py-1 text-[#8B5CF6]">
                                Step 01
                            </span>
                        </div>
                        <h3 className="font-display mb-2 text-lg font-bold" style={{ color: colors.grey[100] }}>
                            Submit Proposal
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: colors.grey[400] }}>
                            Students upload their graduation project proposal with all required documentation through a guided
                            submission form.
                        </p>
                        <div className="mt-4 flex justify-end gap-2 text-xs" style={{ color: colors.grey[400] }}>
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
            <div className="flow-step relative mb-5 flex items-start gap-6 md:mb-24 md:gap-0" data-flow-step="1">
                <div data-aos="zoom-in-left" className="grid w-full md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
                    <div className="hidden md:block" />
                    <div className="relative hidden justify-center md:flex">
                        <div className={`flow-node${activeStep >= 1 ? " is-active" : ""}`}>
                            <Brain className="flow-node-icon h-5 w-5 text-[#9CA3AF]" />
                            <span className="flow-node-num">2</span>
                        </div>
                    </div>
                    <div className={`flow-step-card${activeStep >= 1 ? " is-active" : ""}`} style={{ backgroundColor: colors.primary[500], borderColor: "#8B5CF6" }}>
                        <div className="mb-3 flex gap-2">
                            <span className="label-uppercase rounded-md border border-[#E5E7EB] bg-[#eceffc] px-3 py-1 text-[#8B5CF6]">
                                Step 02
                            </span>
                        </div>
                        <h3 className="font-display mb-2 text-lg font-bold " style={{ color: colors.grey[100] }}>AI Analysis</h3>
                        <p className="text-sm leading-relaxed" style={{ color: colors.grey[400] }}>
                            Our AI engine scans proposals for similarity against the entire academic database and validates
                            originality with precision scoring.
                        </p>
                        <div className="mt-4 flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2 rounded-md border border-[#BBF7D0] bg-[#F0FDF4] px-2 py-1 text-xs font-medium text-[#16A34A]">
                                <ShieldCheck className="h-3 w-3 shrink-0" /> 98% Accuracy
                            </div>
                            <div className="flex items-center gap-1 text-xs " style={{ color: colors.grey[400] }}>
                                <Zap className="h-3 w-3 shrink-0" /> Real-time
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Step 3 */}
            <div className="flow-step relative mb-5 flex items-start gap-6 md:mb-24 md:gap-0" data-flow-step="2">
                
                <div data-aos="zoom-in-right" className="grid w-full md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
                    <div className={`flow-step-card${activeStep >= 2 ? " is-active" : ""}`} style={{ textAlign: "right", backgroundColor: colors.primary[500], borderColor: "#8B5CF6" }}>
                        <div className="mb-3 flex justify-end gap-2">
                            <span className="label-uppercase rounded-md border border-[#E5E7EB] bg-[#eceffc] px-3 py-1 text-[#8B5CF6]">
                                Step 03
                            </span>
                        </div>
                        <h3 className="font-display mb-2 text-lg font-bold" style={{ color: colors.grey[100] }}>Committee Review</h3>
                        <p className="text-sm leading-relaxed" style={{ color: colors.grey[400] }}>
                            Department committees evaluate the AI-analyzed proposal, provide feedback, and make approval decisions
                            through a structured review flow.
                        </p>
                        <div className="mt-4 flex justify-end gap-2 text-xs" style={{ color: colors.grey[400] }}>
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
            <div className="flow-step relative mb-5 flex items-start gap-6 md:mb-24 md:gap-0" data-flow-step="3">
                <div data-aos="zoom-in-left" className="grid w-full md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
                    <div className="hidden md:block" />
                    <div className="relative hidden justify-center md:flex">
                        <div className={`flow-node${activeStep >= 3 ? " is-active" : ""}`}>
                            <UserCheck className="flow-node-icon h-5 w-5 text-[#9CA3AF]" />
                            <span className="flow-node-num">4</span>
                        </div>
                    </div>
                    <div className={`flow-step-card${activeStep >= 3 ? " is-active" : ""}`} style={{ backgroundColor: colors.primary[500], borderColor: "#8B5CF6" }}>
                        <div className="mb-3 flex gap-2">
                            <span className="label-uppercase rounded-md border border-[#E5E7EB] bg-[#eceffc] px-3 py-1 text-[#8B5CF6]">
                                Step 04
                            </span>
                        </div>
                        <h3 className="font-display mb-2 text-lg font-bold" style={{ color: colors.grey[100] }}>Assign Supervisor</h3>
                        <p className="text-sm leading-relaxed" style={{ color: colors.grey[400] }}>
                            The system intelligently matches approved projects with the most suitable supervisor based on expertise,
                            workload, and research alignment.
                        </p>
                        <div className="mt-4 flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-1.5 rounded-md border border-[#E9D5FF] bg-[#FAF5FF] px-2 py-1 text-xs font-medium text-[#8B5CF6]">
                                <Sparkles className="h-3 w-3 shrink-0" /> Smart Match
                            </div>
                            <div className="flex items-center gap-1.5 text-xs" style={{ color: colors.grey[400] }}>
                                <Scale className="h-3 w-3 shrink-0" /> Load balanced
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Step 5 */}
            <div className="flow-step relative flex items-start gap-6 md:gap-0" data-flow-step="4">
                <div data-aos="zoom-in-right" className="grid w-full md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
                    <div className={`flow-step-card${activeStep >= 4 ? " is-active" : ""}`} style={{ textAlign: "right", backgroundColor: colors.primary[500], borderColor: "#8B5CF6" }}>
                        <div className="mb-3 flex justify-end gap-2">
                            <span className="label-uppercase rounded-md border border-[#E5E7EB] bg-[#eceffc] px-3 py-1 text-[#8B5CF6]">
                                Step 05
                            </span>
                        </div>
                        <h3 className="font-display mb-2 text-lg font-bold" style={{ color: colors.grey[100] }}>Track & Evaluate</h3>
                        <p className="text-sm leading-relaxed" style={{ color: colors.grey[400] }}>
                            Supervisors and students collaborate through the platform — tracking milestones, sharing feedback, and
                            conducting final evaluations seamlessly.
                        </p>
                        <div className="mt-4 flex justify-end gap-2 text-xs" style={{ color: colors.grey[400] }}>
                            <Activity className="h-3 w-3 shrink-0" />
                            <span> Real-time progress dashboards</span>
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
    const [mobileMenu, setMobileMenu] = useState(false);
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const colors = tokens(theme.palette.mode);
    const HERO_SVG_HTML = `
<svg viewBox="0 0 480 420" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
  <line x1="0" y1="105" x2="480" y2="105" stroke=${colors.grey[800]} stroke-width="0.5" opacity="0.85"/>
  <line x1="0" y1="210" x2="480" y2="210" stroke=${colors.grey[800]} stroke-width="0.5" opacity="0.85"/>
  <line x1="0" y1="315" x2="480" y2="315" stroke=${colors.grey[800]} stroke-width="0.5" opacity="0.85"/>
  <line x1="120" y1="0" x2="120" y2="420" stroke=${colors.grey[800]} stroke-width="0.5" opacity="0.5"/>
  <line x1="240" y1="0" x2="240" y2="420" stroke=${colors.grey[800]} stroke-width="0.5" opacity="0.5"/>
  <line x1="360" y1="0" x2="360" y2="420" stroke=${colors.grey[800]} stroke-width="0.5" opacity="0.5"/>
  <rect x="30" y="50" width="160" height="80" rx="12" fill=${colors.primary[500]} stroke=${colors.grey[800]} stroke-width="1"/>
  <rect x="46" y="66" width="32" height="32" rx="8" fill="#F9FAFB"/>
  <text x="62" y="87" font-family="Roboto, sans-serif" font-size="14" fill="#8B5CF6" text-anchor="middle">📄</text>
  <text x="90" y="82" font-family="Roboto, sans-serif" font-size="12" font-weight="600" fill=${colors.grey[100]}>Submit Proposal</text>
  <text x="90" y="100" font-family="Roboto, sans-serif" font-size="10" fill=${colors.grey[300]}>Upload & validate</text>
  <path d="M190 90 C 220 90, 240 60, 270 60" stroke=${colors.greenAccent[700]} stroke-width="1.5" fill="none" stroke-dasharray="4 4" class="flow-dash-animate"/>
  <path d="M190 90 C 220 90, 240 60, 270 60" stroke=${colors.greenAccent[700]} stroke-width="1.5" fill="none" opacity="0.2"/>
  <rect x="270" y="20" width="180" height="80" rx="12" fill=${colors.primary[500]} stroke=${colors.grey[800]} stroke-width="1"/>
  <rect x="286" y="36" width="32" height="32" rx="8" fill="#F9FAFB"/>
  <text x="302" y="57" font-family="Roboto, sans-serif" font-size="14" fill="#8B5CF6" text-anchor="middle">🧠</text>
  <text x="332" y="52" font-family="Roboto, sans-serif" font-size="12" font-weight="600" fill=${colors.grey[100]}>AI Analysis</text>
  <text x="332" y="70" font-family="Roboto, sans-serif" font-size="10" fill=${colors.grey[300]}>Similarity detection</text>
  <path d="M360 100 C 360 140, 320 160, 320 180" stroke=${colors.greenAccent[700]} stroke-width="1.5" fill="none" stroke-dasharray="4 4" class="flow-dash-animate" style="animation-delay: 0.3s"/>
  <path d="M360 100 C 360 140, 320 160, 320 180" stroke=${colors.greenAccent[700]} stroke-width="1.5" fill="none" opacity="0.15"/>
  <rect x="220" y="180" width="180" height="80" rx="12" fill=${colors.primary[500]} stroke=${colors.grey[800]} stroke-width="1"/>
  <rect x="236" y="196" width="32" height="32" rx="8" fill="#EFFCF4"/>
  <text x="252" y="217" font-family="Roboto, sans-serif" font-size="14" fill="#16A34A" text-anchor="middle">✅</text>
  <text x="282" y="212" font-family="Roboto, sans-serif" font-size="12" font-weight="600" fill=${colors.grey[100]}>Committee Review</text>
  <text x="282" y="230" font-family="Roboto, sans-serif" font-size="10" fill=${colors.grey[300]}>Evaluate & approve</text>
  <path d="M260 260 C 230 290, 170 290, 140 310" stroke=${colors.greenAccent[700]} stroke-width="1.5" fill="none" stroke-dasharray="4 4" class="flow-dash-animate" style="animation-delay: 0.6s"/>
  <rect x="30" y="290" width="180" height="80" rx="12" fill=${colors.primary[500]} stroke=${colors.grey[800]} stroke-width="1"/>
  <rect x="46" y="306" width="32" height="32" rx="8" fill="#FFF7ED"/>
  <text x="62" y="327" font-family="Roboto, sans-serif" font-size="14" fill="#D97706" text-anchor="middle">👥</text>
  <text x="92" y="322" font-family="Roboto, sans-serif" font-size="12" font-weight="600" fill=${colors.grey[100]}>Assign Supervisor</text>
  <text x="92" y="340" font-family="Roboto, sans-serif" font-size="10" fill=${colors.grey[300]}>Smart matching</text>
  <path d="M210 340 C 260 350, 290 340, 310 330" stroke=${colors.greenAccent[700]} stroke-width="1.5" fill="none" stroke-dasharray="4 4" class="flow-dash-animate" style="animation-delay: 0.9s"/>
  <rect x="290" y="300" width="170" height="80" rx="12" fill=${colors.primary[500]} stroke=${colors.grey[800]} stroke-width="1"/>
  <rect x="306" y="316" width="32" height="32" rx="8" fill="#F9FAFB"/>
  <text x="322" y="337" font-family="Roboto, sans-serif" font-size="14" fill="#8B5CF6" text-anchor="middle">📊</text>
  <text x="352" y="332" font-family="Roboto, sans-serif" font-size="12" font-weight="600" fill=${colors.grey[100]}>Track Progress</text>
  <text x="352" y="350" font-family="Roboto, sans-serif" font-size="10" fill=${colors.grey[300]}>Real-time analytics</text>
  <path d="M0 380 Q120 350, 240 370 T480 360" stroke=${colors.greenAccent[700]} stroke-width="1" fill="none" opacity="0.5"/>
  <path d="M0 395 Q120 365, 240 385 T480 375" stroke=${colors.greenAccent[700]} stroke-width="0.8" fill="none" opacity="0.5"/>
</svg>
`.trim();


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

    const user = JSON.parse(window.localStorage.getItem("user"));

    return (
        <div ref={landingRef} className="landing-paper scroll-smooth">
            <header
                style={{ backgroundColor: colors.primary[500], borderColor: colors.grey[700] }}
                className={`reveal-header fixed left-0 right-0 top-0 z-50 border-b transition-[padding,box-shadow] duration-200 py-5 px-0`}
            >
                <div className="mx-auto flex sm:max-w-6xl items-center justify-between px-4 sm:px-8">
                    <Link to="/" className="group flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center border justify-center rounded-md bg-[#111111] shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-transform duration-200 group-hover:scale-[1.02]" style={{ borderColor: colors.grey[700] }}>
                            <GraduationCap className="h-5 w-5 text-white" aria-hidden />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-display mb-1 text-base font-bold leading-none tracking-tight" style={{ color: colors.grey[100] }}>
                                Evaluate It Easily
                            </span>
                            <span className="label-uppercase leading-none text-green-500">Minya Academic</span>
                        </div>
                    </Link>



                    <div className="hidden items-center gap-6 md:flex">
                        <Link onClick={logout} to="/auth" className="text-sm font-medium text-red-500 underline transition-colors ">
                            {
                                user ? "Log out" : "Log in"
                            }
                        </Link>
                        <Link to={user?.role === "Admin" ? "/admin" : "/dashboard"} className="btn-primary border px-6! py-2! text-xs!" style={{ borderColor: colors.grey[700] }}>
                            Launch Platform
                        </Link>
                        <IconButton onClick={() => {
                            colorMode.toggleColorMode();
                            localStorage.setItem("theme", theme.palette.mode === "light" ? "dark" : "light");
                        }}>
                            {theme.palette.mode === "dark" ? (
                                <LightModeOutlinedIcon />
                            ) : (
                                <DarkModeOutlinedIcon />
                            )}
                        </IconButton>
                    </div>


                    <div className="md:hidden">
                        <IconButton onClick={() => {
                            colorMode.toggleColorMode();
                            localStorage.setItem("theme", theme.palette.mode === "light" ? "dark" : "light");
                        }}>
                            {theme.palette.mode === "dark" ? (
                                <LightModeOutlinedIcon />
                            ) : (
                                <DarkModeOutlinedIcon />
                            )}
                        </IconButton>
                    </div>
                    <button
                        type="button"
                        style={{ borderColor: colors.grey[700], color: colors.grey[400], backgroundColor: colors.primary[500] }}
                        className="rounded-md border border-transparent p-2 transition-colors hover:border-[#E5E7EB] hover:bg-[#F9FAFB] md:hidden"
                        onClick={() => setMobileMenu((v) => !v)}
                        aria-expanded={mobileMenu}
                        aria-controls="landing-mobile-menu"
                    >
                        {mobileMenu ? <X className="h-6 w-6 " /> : <Menu className="h-6 w-6 " />}
                    </button>
                    
                </div>

                {mobileMenu ? (
                    <div
                        id="landing-mobile-menu"
                        className="paper-surface overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06)] md:hidden"
                        style={{ backgroundColor: colors.primary[500] }}
                        role="navigation"
                        aria-label="Mobile"
                    >
                        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-8 py-8">
                            <div className="flex flex-col gap-3 px-4">
                                <Link to='/auth' onClick={() => logout()} className="py-3 text-center text-sm font-medium text-red-500 underline transition-colors">
                                    Log in
                                </Link>
                                <Link to={user?.role === "Admin" ? "/admin" : "/dashboard"} className="btn-primary w-full py-4" style={{ borderColor: colors.grey[700] }} onClick={() => setMobileMenu(false)}>
                                    Launch Platform
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : null}
            </header>

            <section
                style={{ backgroundColor: colors.primary[500], borderColor: colors.grey[800] }}
                className=" relative overflow-hidden border-b  pb-32 pt-36 lg:pb-32 lg:pt-40">
                <div className="relative z-10 mx-auto max-w-6xl px-8">
                    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                        <div data-aos="fade-right" data-aos-duration="1200" className="space-y-8">
                            <div className="reveal-hero inline-flex items-center gap-2 rounded-md border border-green-500 px-4 py-2 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                                <span className="h-2 w-2 rounded-full bg-green-500" />
                                <span className="label-uppercase text-green-500">AI-Powered Academic Platform</span>
                            </div>
                            <h1 className="reveal-hero reveal-delay-2 font-display text-[40px] font-bold leading-tight tracking-tight lg:text-[40px]" style={{ color: colors.grey[100] }}>
                                Smarter Graduation
                                <br />
                                <span className="text-blue-500">Project Management</span>
                            </h1>
                            <p className="reveal-hero reveal-delay-3 max-w-130 text-lg leading-relaxed" style={{ color: colors.grey[400] }}>
                                An intelligent system that detects proposal similarity, assigns supervisors, and tracks academic progress —{" "}
                                <span className="font-medium " style={{ color: colors.grey[200] }}>built for Egyptian university excellence.</span>
                            </p>
                            <div className="reveal-hero reveal-delay-4 flex flex-wrap gap-4 pt-4">
                                <Link to="/auth" className="btn-primary group px-8 py-4" style={{ borderColor: colors.grey[400] }}>
                                    Get Started Today
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                                </Link>
                            </div>
                        </div>
                        <div className="reveal-hero reveal-delay-6 relative hidden lg:block">
                            <div
                                className="float-gentle"
                                dangerouslySetInnerHTML={{ __html: HERO_SVG_HTML }}
                            />
                        </div>
                    </div>
                </div>
            </section>



            <section id="features" style={{ backgroundColor: colors.blueAccent[800], borderColor: colors.grey[800] }} className="relative overflow-hidden border-b py-16 md:py-24">
                <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-8">
                    <div className="mx-auto mb-16 max-w-xl text-center">
                        <p className="reveal label-uppercase mb-3 text-green-500">Core Modules</p>
                        <h2 className="reveal reveal-delay-1 font-display mb-4 text-[32px] font-bold leading-tight md:text-[32px]" style={{ color: colors.grey[100] }}>
                            Powerful Tools for
                            <br />
                            Academic Excellence
                        </h2>
                        <p className="reveal reveal-delay-2 leading-relaxed" style={{ color: colors.grey[400] }}>
                            Everything your university needs to manage graduation projects — from submission to final evaluation.
                        </p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2">
                        <div data-aos="fade-right" data-aos-duration="1200" className="card group  p-8 rounded-xl border" style={{ backgroundColor: colors.primary[500], borderColor: colors.grey[700] }}>
                            <div className="flex flex-col items-start gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="border h-12 w-12 border-[#E5E7EB] bg-[#dacaff] text-[#6b2efa] flex items-center justify-center rounded-md">
                                        <ScanSearch className="h-5.5 w-5.5" aria-hidden />
                                    </div>
                                    <h3 className={`font-display mb-2 ${theme.palette.mode === "dark" ? "text-white" : ""} text-base font-bold transition-colors group-hover:text-[#8B5CF6]`}>
                                        AI Similarity Detection
                                    </h3>
                                </div>
                                <div>
                                    <p className="text-sm leading-relaxed " style={{ color: colors.grey[300] }}>
                                        Automatically detect duplicate or similar project proposals using advanced NLP algorithms with
                                        high-precision academic matching.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div data-aos="fade-left" data-aos-duration="1200" className="card group p-8 rounded-xl border" style={{ backgroundColor: colors.primary[500], borderColor: colors.grey[700] }}>
                            <div className="flex flex-col items-start gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-[#E5E7EB] bg-[#dacaff] text-[#8B5CF6]">
                                        <Users className="h-5.5 w-5.5" aria-hidden />
                                    </div>
                                    <h3 className={`font-display mb-2 text-base font-bold ${theme.palette.mode === "dark" ? "text-white" : ""} transition-colors group-hover:text-[#8B5CF6]`}>
                                        Smart Supervisor Matching
                                    </h3>
                                </div>
                                <div>
                                    <p className="text-sm leading-relaxed" style={{ color: colors.grey[300] }}>
                                        Match projects to supervisors based on expertise, research interests, workload balance, and
                                        real-time availability.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div data-aos="fade-right" data-aos-duration="1200" className="card group p-8 rounded-xl border" style={{ backgroundColor: colors.primary[500], borderColor: colors.grey[700] }}>
                            <div className="flex flex-col items-start gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-[#E5E7EB] bg-[#a0fac1] text-[#16A34A]">
                                        <ClipboardCheck className="h-5.5 w-5.5" aria-hidden />
                                    </div>
                                    <h3 className={`font-display mb-2 text-base font-bold ${theme.palette.mode === "dark" ? "text-white" : ""} transition-colors group-hover:text-[#16A34A]`}>
                                        Rapid Evaluation System
                                    </h3>
                                </div>
                                <div>
                                    <p className="text-sm leading-relaxed " style={{ color: colors.grey[300] }}>
                                        Streamlined committee workflow for project reviews, graded assessments, and institutional decisions
                                        with full audit trails.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div data-aos="fade-left" data-aos-duration="1200" className="card group p-8 rounded-xl border" style={{ backgroundColor: colors.primary[500], borderColor: colors.grey[700] }}>
                            <div className="flex flex-col items-start gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-[#E5E7EB] bg-[#fff6d0] text-[#D97706]">
                                        <TrendingUp className="h-5.5 w-5.5" aria-hidden />
                                    </div>

                                    <h3 className={`font-display mb-2 text-base font-bold ${theme.palette.mode === "dark" ? "text-white" : ""} transition-colors group-hover:text-[#D97706]`}>
                                        Progress Tracking
                                    </h3>
                                </div>
                                <div>
                                    <p className="text-sm leading-relaxed " style={{ color: colors.grey[300] }}>
                                        Monitor student milestones throughout the entire project lifecycle with detailed analytical dashboards
                                        and automated reports.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="workflow" className="paper-surface relative overflow-hidden py-16 md:py-24">
                <div className="mx-auto max-w-6xl px-8">
                    <div className="mx-auto mb-24 max-w-xl text-center">
                        <p className="reveal label-uppercase mb-3 text-green-500">System Flow</p>
                        <h2 className="reveal reveal-delay-1 font-display mb-4 text-[32px] font-bold leading-tight md:text-[32px]" style={{ color: colors.grey[100] }}>
                            How It Works
                        </h2>
                        <p className="reveal reveal-delay-2 leading-relaxed" style={{ color: colors.grey[400] }}>
                            A structured journey from submission to completion — flowing naturally like the academic process should.
                        </p>
                    </div>
                    <WorkflowFlow colors={colors} />
                </div>
            </section>

            <footer className="relative overflow-hidden bg-[#0d1017] text-white" style={{ borderColor: colors.grey[700] }}>
                <div className="absolute left-0 top-0 h-px w-full bg-[#E5E7EB]" aria-hidden />
                <div className="relative z-10 mx-auto max-w-6xl px-8 pb-8 pt-16">
                    <div className="grid grid-cols-1 gap-12 pb-2 md:grid-cols-12">
                        <div data-aos="fade-left" data-aos-duration="800" className="md:col-span-4">
                            <div className="mb-8 flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                                    <GraduationCap className="h-[18px] w-[18px] text-[#111111]" aria-hidden />
                                </div>
                                <span className="font-display text-lg font-bold tracking-tight text-white">Evaluate It Easily</span>
                            </div>
                            <p className="mb-8 max-w-[320px] text-sm leading-relaxed text-[#9CA3AF]">
                                AI-powered graduation project management for the modern Egyptian university ecosystem. Built in Minya.
                            </p>
                            <p className="mt-3 text-xs text-[#9CA3AF]">Get updates on new features and releases.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:col-span-8">
                            <div data-aos="fade-left" data-aos-duration="1000" data-aos-delay="0">
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
                            <div data-aos="fade-left" data-aos-duration="1000" data-aos-delay="500">
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
                            <div data-aos="fade-left" data-aos-duration="1000" data-aos-delay="1000">
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
                            <div data-aos="fade-left" data-aos-duration="1000" data-aos-delay="1500">
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
                </div>
            </footer>
        </div>
    );
}
