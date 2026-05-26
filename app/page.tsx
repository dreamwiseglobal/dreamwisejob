import AboutSection from "@/components/landing/AboutSection";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorks";
import JobsSection from "@/components/landing/JobsSection";
import TestimonialsSection from "@/components/landing/TestimonialSection";
import TrustSection from "@/components/landing/TrustSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustSection />
      <JobsSection />
      <HowItWorksSection />
      <AboutSection />
      <TestimonialsSection />
    </main>
  );
}
