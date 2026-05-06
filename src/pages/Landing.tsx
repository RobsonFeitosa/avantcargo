import { Hero } from "@/components/landing/Hero";
import { StatsBar } from "@/components/landing/StatsBar";
import { Services } from "@/components/landing/Services";
import { Process } from "@/components/landing/Process";
import { Expertise } from "@/components/landing/Expertise";
import { Sectors } from "@/components/landing/Sectors";
import { Testimonials } from "@/components/landing/Testimonials";
import { ContactCTA } from "@/components/landing/ContactCTA";
import { LandingLayout } from "@/components/layout/LandingLayout";

export default function Landing() {
  return (
    <LandingLayout>
      <Hero />
      <StatsBar />
      <Services />
      <Process />
      <Expertise />
      <Sectors />
      <Testimonials />
      <ContactCTA />
    </LandingLayout>
  );
}
