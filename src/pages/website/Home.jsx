import LandingHeader from "../../components/landing/LandingHeader";
import Hero from "../../components/landing/Hero";
import LandingFeatures from "../../components/landing/LandingFeatures";
import LandingFooter from "../../components/landing/LandingFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#03060c] text-slate-100 antialiased selection:bg-emerald-500/25 selection:text-emerald-50">
      <LandingHeader />
      <Hero />
      <LandingFeatures />
      <LandingFooter />
    </div>
  );
}
