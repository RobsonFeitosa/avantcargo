"use client";

import { Hero } from "@/components/landing/Hero";
import { StatsBar } from "@/components/landing/StatsBar";
import { Services } from "@/components/landing/Services";
import { Process } from "@/components/landing/Process";
import { Expertise } from "@/components/landing/Expertise";
import { Sectors } from "@/components/landing/Sectors";
import { Testimonials } from "@/components/landing/Testimonials";
import { ContactCTA } from "@/components/landing/ContactCTA";
import { LandingLayout } from "@/components/layout/LandingLayout";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export default function Landing() {
  return (
    <LandingLayout>
      <div className="bg-gradient-to-br from-primary/20 via-background to-[#0e484c]/30">
        <Hero />
        <StatsBar />
      </div>
      <Services />
      <Process />
      <Expertise />
      <Sectors />
      <Testimonials />
      <ContactCTA />
    </LandingLayout>
  );
}
