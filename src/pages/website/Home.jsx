import LandingFeatures from "../../components/landing/LandingFeatures";
import LandingFooter from "../../components/landing/LandingFooter";
import LandingHeader from "../../components/landing/LandingHeader";
import Hero from "../../components/landing/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020509] text-white">
      <LandingHeader />
      <Hero />
      <LandingFeatures />
      <LandingFooter />
    </div>
  );
}
