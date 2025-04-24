import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import BarriersSection from "@/components/BarriersSection";
import ResourcesSection from "@/components/ResourcesSection";
import PartnersSection from "@/components/PartnersSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <BarriersSection />
      <ResourcesSection />
      <PartnersSection />
      <CTASection />
      <Footer />
    </main>
  );
}
