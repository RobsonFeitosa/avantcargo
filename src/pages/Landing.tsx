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
      <Hero />
      <ScrollReveal delay={0.2}><StatsBar /></ScrollReveal>
      <ScrollReveal><Services /></ScrollReveal>
      <Process />
      <ScrollReveal><Expertise /></ScrollReveal>
      <ScrollReveal><Sectors /></ScrollReveal>
      <ScrollReveal><Testimonials /></ScrollReveal>
      <ScrollReveal><ContactCTA /></ScrollReveal>
    </LandingLayout>
  );
}
