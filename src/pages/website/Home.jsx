import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const containerStagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemFade = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

const features = [
  {
    title: "AI Similarity Detection",
    description:
      "Automatically detect duplicate or similar project proposals using advanced NLP matching.",
  },
  {
    title: "Smart Supervisor Matching",
    description:
      "Match projects with supervisors by expertise, interest, and workload balance.",
  },
  {
    title: "Rapid Evaluation System",
    description:
      "Streamlined committee workflow for project reviews and institutional decisions.",
  },
  {
    title: "Progress Tracking",
    description:
      "Track milestones, feedback, and outcomes throughout the full project lifecycle.",
  },
];

const flowSteps = [
  "Submit Proposal",
  "AI Analysis",
  "Committee Review",
  "Assign Supervisor",
  "Track & Evaluate",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <motion.header
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="text-lg font-bold tracking-tight text-indigo-600">
            Evaluate It Easily
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            <a href="#features" className="text-sm text-slate-600 hover:text-indigo-600">
              Features
            </a>
            <a href="#workflow" className="text-sm text-slate-600 hover:text-indigo-600">
              How It Works
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/auth" className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600">
              Log in
            </Link>
            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/auth"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Launch Platform
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <section className="relative overflow-hidden px-6 pb-24 pt-24">
        <motion.div
          animate={{ x: [0, 18, 0], y: [0, -14, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-16 top-10 h-64 w-64 rounded-full bg-indigo-200/40 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-violet-200/40 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <motion.div variants={containerStagger} initial="hidden" animate="show">
            <motion.p variants={itemFade} className="mb-4 inline-flex rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700">
              AI-Powered Academic Platform
            </motion.p>
            <motion.h1 variants={itemFade} className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl">
              Smarter Graduation
              <span className="block bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Project Management
              </span>
            </motion.h1>
            <motion.p variants={itemFade} className="mt-5 max-w-xl text-lg text-slate-600">
              An intelligent system that detects proposal similarity, assigns supervisors, and tracks academic progress.
            </motion.p>
            <motion.div variants={itemFade} className="mt-8 flex flex-wrap gap-3">
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link to="/auth" className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
                  Get Started Today
                </Link>
              </motion.div>
              <motion.a whileHover={{ y: -2 }} href="#features" className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                Explore Platform
              </motion.a>
            </motion.div>
            <motion.div
              variants={itemFade}
              className="mt-8 grid max-w-md grid-cols-3 gap-3"
            >
              {[
                { value: "15K+", label: "Analyzed" },
                { value: "500+", label: "Supervisors" },
                { value: "98%", label: "Accuracy" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -3 }}
                  className="rounded-lg border border-slate-200 bg-white p-3 text-center shadow-sm"
                >
                  <p className="text-sm font-bold text-indigo-600">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.12 }}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={containerStagger}
              className="space-y-4"
            >
              {flowSteps.map((step, i) => (
                <motion.div
                  key={step}
                  variants={itemFade}
                  whileHover={{ x: 3 }}
                  className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3"
                >
                  <motion.span
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.2 }}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700"
                  >
                    {i + 1}
                  </motion.span>
                  <p className="text-sm font-medium text-slate-700">{step}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-6 py-20">
        <motion.div {...fadeUp} className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Core Modules</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Powerful Tools for Academic Excellence</h2>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerStagger}
          className="grid gap-4 md:grid-cols-2"
        >
          {features.map((item) => (
            <motion.article
              key={item.title}
              variants={itemFade}
              whileHover={{ y: -5, boxShadow: "0 12px 30px rgba(15,23,42,0.08)" }}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section id="workflow" className="border-y border-slate-200 bg-white px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div {...fadeUp} className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">System Flow</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">How It Works</h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={containerStagger}
            className="space-y-4"
          >
            {flowSteps.map((step, i) => (
              <motion.div
                key={step}
                variants={itemFade}
                whileHover={{ scale: 1.01 }}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4"
              >
                <span className="text-sm font-bold text-indigo-600">Step {String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm text-slate-700">{step}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-20">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Ready to Transform Your Academic Workflow?
          </h2>
          <p className="mt-4 text-slate-600">
            Join universities already using our platform to streamline graduation project management.
          </p>
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/auth"
              className="mt-8 inline-block rounded-xl bg-indigo-600 px-7 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Start Free Trial
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-950 px-6 py-8 text-slate-400">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm md:flex-row">
          <p>Evaluate It Easily</p>
          <p>AI-powered graduation project management</p>
        </div>
      </footer>
    </div>
  );
}
