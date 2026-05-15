"use client";

import { LandingLayout } from "@/components/layout/LandingLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { DynamicIcon } from "@/components/ui/DynamicIcon";

import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { airRepresentationActions } from "@/admin/actions/air-representation.actions";

export default function ServiceRepresentacao() {
  const { data: configData, isLoading } = useQuery({
    queryKey: ["air-representation-config"],
    queryFn: () => airRepresentationActions.get(),
  });

  const config = configData?.result;

  if (isLoading) {
    return (
      <LandingLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      </LandingLayout>
    );
  }

  const importSections = config?.importSections || [];
  const exportSections = config?.exportSections || [];


  return (
    <LandingLayout>
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden relative border-b-[#009485] border-b-2">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.2),transparent_100%)] pointer-events-none" />
          <div className="container relative z-10 text-center">
            <ScrollReveal>
              <Badge variant="outline" className="px-4 py-1.5 border-primary/30 bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
                {config?.headerBadge || "Representação Estratégica"}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-emerald-950 mb-6">
                {config?.headerTitleDark || "Representações"} <span className="text-primary">{config?.headerTitleHighlight || "Aéreas"}</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                {config?.headerDescription || "Integramos operações de importação e exportação com foco em agilidade, segurança e conformidade total nos principais aeroportos do Brasil."}
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-10">
                <Button
                  asChild
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 h-14 rounded-full shadow-lg shadow-orange-500/20 transition-all hover:scale-105 text-lg cursor-pointer"
                >
                  <a href={config?.heroWhatsappNumber ? `https://wa.me/55${config.heroWhatsappNumber.replace(/\D/g, '')}` : "https://wa.me/5511964503217"} target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp className="w-5 h-5 mr-2" />
                    {config?.heroWhatsappText || "Falar com especialista"}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-emerald-900 text-emerald-900 hover:bg-emerald-50 font-bold px-8 h-14 rounded-full transition-all text-lg cursor-pointer"
                >
                  <a href={config?.heroMessageLink || "/contato"}>
                    <Mail className="w-5 h-5 mr-2" />
                    {config?.heroMessageText || "Enviar mensagem"}
                  </a>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Import Sections Title */}
        <section className="pt-24 pb-8 bg-white">
          <div className="container text-center">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-bold text-emerald-950">Importações <span className="text-primary">Aéreas</span></h2>
            </ScrollReveal>
          </div>
        </section>

        {/* Import Content Sections */}
        {importSections.map((section: any, idx: number) => (
          <section key={idx} className={`py-20 ${idx % 2 === 1 ? "bg-slate-50" : "bg-white"}`}>
            <div className="container">
              <div className={`flex flex-col lg:flex-row items-center gap-16 ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                <div className="flex-1 space-y-8">
                  <ScrollReveal direction={idx % 2 === 1 ? "right" : "left"}>
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                      <DynamicIcon name={section.icon} className="h-7 w-7" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-emerald-950 mb-6">{section.title}</h3>
                    <p className="text-slate-600 text-lg leading-relaxed mb-8">
                      {section.desc}
                    </p>
                    <ul className="space-y-4">
                      {section.topics?.split("\n").map((feature: string, fIdx: number) => (
                        <li key={fIdx} className="flex items-start gap-3">
                          <CheckCircle2 className="h-6 w-6 text-orange-500 shrink-0 mt-0.5" />
                          <span className="text-slate-700 font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </ScrollReveal>
                </div>
                <div className="flex-1 w-full">
                  <ScrollReveal direction={idx % 2 === 1 ? "left" : "right"}>
                    <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl">
                      <Image
                        width={1000}
                        height={1000}
                        src={section.image ? `${process.env.NEXT_PUBLIC_API_URL}/files/${section.image}` : "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop"}
                        alt={section.title}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-emerald-950/10" />
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </section>
        ))}

        {exportSections.length > 0 && (
          <>
            {/* Export Sections Title */}
            <section className="pt-24 pb-8 bg-white border-t border-slate-100 ">
              <div className="container text-center">
                <ScrollReveal>
                  <h2 className="text-3xl md:text-5xl font-bold text-emerald-950">Exportações <span className="text-primary">Aéreas</span></h2>
                </ScrollReveal>
              </div>
            </section>

            {/* Export Content Sections */}
            {exportSections.map((section: any, idx: number) => (
              <section key={idx} className={`py-20 ${idx % 2 === 1 ? "bg-slate-50" : "bg-white"}`}>
                <div className="container">
                  <div className={`flex flex-col lg:flex-row items-center gap-16 ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                    <div className="flex-1 space-y-8">
                      <ScrollReveal direction={idx % 2 === 1 ? "right" : "left"}>
                        <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                          <DynamicIcon name={section.icon} className="h-7 w-7" />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-emerald-950 mb-6">{section.title}</h3>
                        <p className="text-slate-600 text-lg leading-relaxed mb-8">
                          {section.desc}
                        </p>
                        <ul className="space-y-4">
                          {section.topics?.split("\n").map((feature: string, fIdx: number) => (
                            <li key={fIdx} className="flex items-start gap-3">
                              <CheckCircle2 className="h-6 w-6 text-orange-500 shrink-0 mt-0.5" />
                              <span className="text-slate-700 font-medium">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </ScrollReveal>
                    </div>
                    <div className="flex-1 w-full">
                      <ScrollReveal direction={idx % 2 === 1 ? "left" : "right"}>
                        <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl">
                          <Image
                            width={1000}
                            height={1000}
                            src={section.image ? `${process.env.NEXT_PUBLIC_API_URL}/files/${section.image}` : "https://images.unsplash.com/photo-1436450412740-6b988f486c6b?q=80&w=1000&auto=format&fit=crop"}
                            alt={section.title}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute inset-0 bg-emerald-950/10" />
                        </div>
                      </ScrollReveal>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </>
        )}

        {/* CTA Section */}

        <section className="py-24 border-t border-slate-100">
          <div className="container">
            <div className="p-12 md:p-16 rounded-[48px] bg-gradient-to-br from-primary/5 to-orange-500/5 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-emerald-950 tracking-tight leading-tight">
                  {config.footerCtaTitleDark || "Operação Urgente?"} <span className="text-orange-500">{config.footerCtaTitleHighlight || "Nós cuidamos!"}</span>
                </h2>
                <p className="text-slate-600 max-w-xl text-lg whitespace-pre-wrap">
                  {config.footerCtaDescription || "Não perca prazos. Nossa equipe está pronta para agir agora."}
                </p>
              </div>
              <div className="flex flex-col gap-4 w-full md:w-auto">
                <Button
                  asChild
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold h-14 px-10 rounded-full shadow-lg shadow-orange-500/20 text-lg gap-2"
                >
                  <a href={config.footerWhatsappNumber ? `https://wa.me/55${config.footerWhatsappNumber.replace(/\\D/g, '')}` : "https://wa.me/5511964503217"} target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp className="w-5 h-5" /> {config.footerWhatsappText || "Ligue Agora"}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50 h-14 px-10 rounded-full text-lg gap-2"
                >
                  <a href={config.footerMessageLink || "/contato"}>
                    <Mail className="h-4 w-4 text-primary" /> {config.footerMessageText || "Enviar mensagem"}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}
