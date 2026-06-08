import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getToken, getUserRole } from "../../services/authServices";
import { ROUTES } from "./constants";

function resolvePrimaryHref(token, role) {
  if (!token) return ROUTES.auth;
  if (role === "Admin") return ROUTES.admin;
  return ROUTES.dashboard;
}

function resolvePrimaryLabel(token, role) {
  if (!token) return "Sign in";
  if (role === "Admin") return "Admin";
  return "App";
}

export default function LandingHeader() {
  const { href, label } = useMemo(() => {
    const token = getToken();
    const role = getUserRole();
    return { href: resolvePrimaryHref(token, role), label: resolvePrimaryLabel(token, role) };
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-x-0 top-0 z-50 px-4 py-5 sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8">
        <Link to="/" className="group flex items-center gap-3">
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition group-hover:border-emerald-500/30">
            <img src="/assets/logo1.png" alt="" className="h-6 w-auto opacity-95" />
          </span>
          <span className="text-sm font-medium tracking-tight text-white/95">Evaluate It Easily</span>
        </Link>

        <div role="navigation" aria-label="Primary" className="flex items-center gap-5">
          <Link
            to="/#features"
            className="hidden text-[13px] text-slate-500 transition hover:text-slate-200 sm:inline-block"
          >
            Features
          </Link>
          <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
            <Link
              to={href}
              className="rounded-full border border-white/[0.12] bg-white/[0.06] px-5 py-2 text-[13px] font-medium text-white backdrop-blur-sm transition hover:border-emerald-500/35 hover:bg-emerald-500/10 hover:text-emerald-100"
            >
              {label}
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
