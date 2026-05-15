"use client";

import { LandingLayout } from "@/components/layout/LandingLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Monitor, ShieldCheck, CheckCircle2, Mail } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { FaWhatsapp } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { comexSystemsActions } from "@/admin/actions/comex-systems.actions";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import Image from "next/image";

export default function ServiceComex() {
  const { data: configData } = useQuery({
    queryKey: ["comex-systems-config"],
    queryFn: () => comexSystemsActions.get(),
  });

  const config = configData?.result || {};
  const sections: any[] = config.sections || [];

  const features: string[] = config.differentials?.map((d: any) => d.text).filter(Boolean) || [
    "Equipe dedicada 24 horas por 7 dias por semana.",
    "Know-How de excelência.",
    "Atendimento direto - sem burocracia.",
    "CCT Importação.",
    "MRUC nas exportações.",
    "CE Mercante (futuro CCT Marítimo).",
    "Pucomex.",
    "Sistemas Aeroportuários.",
    "Follow-up automatizados.",
    "Acompanhamento em tempo real.",
    "Lançamentos ágeis.",
    "Envio de extratos atualizados.",
    "Bloqueio + Desbloqueio de cargas.",
    "Atualizações Sistemáticas.",
  ];

  return (
    <LandingLayout>
      <div className="bg-white min-h-screen">
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden relative border-b-[#009485] border-b-2">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.2),transparent_100%)] pointer-events-none" />
          <div className="container relative z-10 text-center">
            <ScrollReveal>
              <Badge variant="outline" className="px-4 py-1.5 border-primary/30 bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
                {config.headerBadge || "Tecnologia e Conformidade"}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-emerald-950 mb-6">
                {config.headerTitleDark || "Sistemas"} <span className="text-primary">{config.headerTitleHighlight || "Comex"}</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                {config.headerDescription || "A base sólida por trás dos líderes do mercado! Deixe a responsabilidade técnica conosco e foque no crescimento do seu negócio."}
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-10">
                <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 h-14 rounded-full shadow-lg shadow-orange-500/20 transition-all hover:scale-105 text-lg cursor-pointer">
                  <a href={config.heroWhatsappNumber ? `https://wa.me/55${config.heroWhatsappNumber.replace(/\D/g, "")}` : "https://wa.me/5511964503217"} target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp className="w-5 h-5 mr-2" />
                    {config.heroWhatsappText || "Falar com especialista"}
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-emerald-900 text-emerald-900 hover:bg-emerald-50 font-bold px-8 h-14 rounded-full transition-all text-lg cursor-pointer">
                  <a href={config.heroMessageLink || "/contato"}>
                    <Mail className="w-5 h-5 mr-2" />
                    {config.heroMessageText || "Enviar mensagem"}
                  </a>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <div className="bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.05),transparent_100%)]">
          <section className="py-24">
            <div className="container">
              <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1 space-y-8">
                  <ScrollReveal direction="left">
                    <h2 className="text-3xl md:text-4xl font-bold text-emerald-950">
                      {config.highlightTitle || "Prioridade Máxima em Lançamentos"}
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-wrap">
                      {config.highlightText || "Quando o assunto é impulsionar seu negócio através dos nossos serviços, tratamos com prioridade máxima."}
                    </p>
                    <div className="pt-4">
                      <a
                        href={config.buttonLink ? `https://wa.me/55${config.buttonLink.replace(/\D/g, "")}` : "https://wa.me/5511964503217"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-primary/20 text-lg"
                      >
                        <FaWhatsapp className="w-5 h-5" />
                        {config.buttonText || "Saiba Mais"}
                      </a>
                    </div>
                  </ScrollReveal>
                </div>
                <div className="flex-1 w-full max-w-lg">
                  <ScrollReveal direction="right">
                    <div className="relative p-8 bg-emerald-950 rounded-[40px] shadow-2xl overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
                      <div className="relative z-10 space-y-6 text-white">
                        <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center">
                          <Monitor className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold">{config.cardTitle || "Por que Avant?"}</h3>
                        <ul className="space-y-4">
                          {(config.cardTopics || "Atendimento direto - sem burocracia\nPrecisão técnica em cada lançamento\nEscalabilidade com segurança operacional")
                            .split("\n")
                            .filter(Boolean)
                            .map((topic: string, i: number) => (
                              <li key={i} className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-1" />
                                <span>{topic}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </section>

          {sections.length > 0 && (
            <>
              <section className="pt-16 pb-0 border-t border-slate-100">
                <div className="container text-center">
                  <ScrollReveal>
                    <h2 className="text-3xl md:text-5xl font-bold text-emerald-950">
                      Terceirização <span className="text-primary">Especializada</span>
                    </h2>
                  </ScrollReveal>
                </div>
              </section>

              {sections.map((section: any, idx: number) => (
                <section key={section.id || idx} className="py-14">
                  <div className="container">
                    <div className={`flex flex-col lg:flex-row items-center gap-16 ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                      <div className="flex-1 space-y-8">
                        <ScrollReveal direction={idx % 2 === 1 ? "right" : "left"}>
                          <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                            <DynamicIcon name={section.icon} className="h-7 w-7" />
                          </div>
                          <h3 className="text-3xl md:text-4xl font-bold text-emerald-950 mb-6">{section.title}</h3>
                          <p className="text-slate-600 text-lg leading-relaxed mb-8">{section.desc}</p>
                          {section.topics && (
                            <ul className="space-y-4">
                              {section.topics.split("\n").filter(Boolean).map((topic: string, tIdx: number) => (
                                <li key={tIdx} className="flex items-start gap-3">
                                  <CheckCircle2 className="h-6 w-6 text-orange-500 shrink-0 mt-0.5" />
                                  <span className="text-slate-700 font-medium">{topic}</span>
                                </li>
                              ))}
                            </ul>
                          )}
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
            </>
          )}

          <section className={`py-24 ${sections.length > 0 ? "border-t border-slate-100" : ""}`}>
            <div className="container">
              <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-emerald-950">
                  {config.diffsSectionTitle || "Diferenciais e"} <span className="text-primary">{!config.diffsSectionTitle ? "Capacidades" : ""}</span>
                </h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  {config.diffsSectionSubtitle || "Excelência técnica e suporte contínuo para garantir a fluidez da sua operação internacional."}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, idx) => (
                  <ScrollReveal key={idx} delay={idx * 0.05}>
                    <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-primary/30 hover:shadow-md transition-all flex items-center gap-4 group">
                      <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <span className="font-semibold text-slate-700 group-hover:text-emerald-950 transition-colors">{feature}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          <section className="py-24 border-t border-slate-100">
            <div className="container">
              <div className="p-12 md:p-16 rounded-[48px] bg-gradient-to-br from-primary/5 to-orange-500/5 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-bold text-emerald-950 tracking-tight leading-tight">
                    {config.footerCtaTitleDark || "Pronto para"} <span className="text-orange-500">{config.footerCtaTitleHighlight || "otimizar seus processos?"}</span>
                  </h2>
                  <p className="text-slate-600 max-w-xl text-lg whitespace-pre-wrap">
                    {config.footerCtaDescription || "Descubra como nossa expertise técnica em Sistemas Comex pode reduzir burocracia e acelerar seus resultados operacionais."}
                  </p>
                </div>
                <div className="flex flex-col gap-4 w-full md:w-auto">
                  <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white font-bold h-14 px-10 rounded-full shadow-lg shadow-orange-500/20 text-lg gap-2">
                    <a href={config.footerWhatsappNumber ? `https://wa.me/55${config.footerWhatsappNumber.replace(/\D/g, "")}` : "https://wa.me/5511964503217"} target="_blank" rel="noopener noreferrer">
                      <FaWhatsapp className="w-5 h-5" /> {config.footerWhatsappText || "Falar conosco"}
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50 h-14 px-10 rounded-full text-lg gap-2">
                    <a href={config.footerMessageLink || "/contato"}>
                      <Mail className="h-4 w-4 text-primary" /> {config.footerMessageText || "Enviar mensagem"}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </LandingLayout>
  );
}
