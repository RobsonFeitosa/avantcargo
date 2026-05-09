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
import { useQuery } from "@tanstack/react-query";
import { mainBannerActions } from "@/admin/actions/main-banner.actions";
import { mainServicesActions } from "@/admin/actions/main-services.actions";
import { workStepsActions } from "@/admin/actions/work-steps.actions";
import { aboutUsActions } from "@/admin/actions/about-us.actions";
import { sectorsActions, testimonialsActions, homeContactActions } from "@/admin/actions/home-sections.actions";

export default function Landing() {
  const { data: bannerData } = useQuery({
    queryKey: ["main-banner"],
    queryFn: () => mainBannerActions.get(),
  });

  const { data: servicesData } = useQuery({
    queryKey: ["main-services"],
    queryFn: () => mainServicesActions.get(),
  });

  const { data: workStepsData } = useQuery({
    queryKey: ["work-steps"],
    queryFn: () => workStepsActions.get(),
  });

  const { data: aboutUsData } = useQuery({
    queryKey: ["about-us"],
    queryFn: () => aboutUsActions.get(),
  });

  const { data: sectorsData } = useQuery({
    queryKey: ["sectors"],
    queryFn: () => sectorsActions.get(),
  });

  const { data: testimonialsData } = useQuery({
    queryKey: ["testimonials"],
    queryFn: () => testimonialsActions.get(),
  });

  const { data: homeContactData } = useQuery({
    queryKey: ["home-contact"],
    queryFn: () => homeContactActions.get(),
  });

  const { data: footerData } = useQuery({
    queryKey: ["footer"],
    queryFn: () => footerActions.get(),
  });

  return (
    <LandingLayout footerData={footerData?.result}>
      <div className="bg-gradient-to-br from-primary/5 via-slate-50 to-orange-500/5">
        <Hero data={bannerData?.result} />
        <StatsBar stats={bannerData?.result?.footer_stats} />
      </div>
      <Services data={servicesData?.result} />
      <Process data={workStepsData?.result} />
      <Expertise data={aboutUsData?.result} />
      <Sectors data={sectorsData?.result} />
      <Testimonials data={testimonialsData?.result} />
      <ContactCTA data={homeContactData?.result} />
    </LandingLayout>
  );
}
