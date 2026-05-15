"use client";

import { LandingLayout } from "@/components/layout/LandingLayout";
import { Badge } from "@/components/ui/badge";
import { Radar, Landmark, Truck, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export default function ServiceImport() {
  const sections = [
    {
      title: "Representação em Aeroportos",
      desc: "Sendo a extensão da sua empresa, atuamos como uma ponte estratégica, assumindo de forma profissional as operações nos aeroportos GRU (Guarulhos) e VCP (Viracopos).",
      features: [
        "Soluções ágeis, seguras e personalizadas",
        "Vasto conhecimento técnico e operacional",
        "Atendimento exclusivo e dedicado",
        "Parceiro estratégico preparado para complexidade"
      ],
      icon: Radar,
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "CCT Importação e CE Mercante",
      desc: "Somos referência no segmento, com atuação ativa desde o período de implantação do CCT Importação.",
      features: [
        "Rastreabilidade em cada etapa do processo",
        "Follow-up atualizado em tempo real",
        "Operações 24 horas por dia, 7 dias por semana",
        "Equipe pronta para lançamentos em finais de semana e feriados"
      ],
      icon: Landmark,
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Distribuição de Cargas",
      desc: "Na Avant, entendemos que a eficiência na distribuição é decisiva para o sucesso das operações de importação.",
      features: [
        "Frota credenciada e parceiros estratégicos",
        "Processos padronizados de alta qualidade",
        "Segurança, agilidade e rastreabilidade total",
        "Redução de custos e otimização de prazos"
      ],
      icon: Truck,
      image: "https://images.unsplash.com/photo-1519003722824-192d9978736b?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <LandingLayout>
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden relative bg-slate-50 border-b border-slate-200">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.2),transparent_100%)] pointer-events-none" />
          <div className="container relative z-10 text-center">
            <ScrollReveal>
              <Badge variant="outline" className="px-4 py-1.5 border-primary/30 bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
                Logística Internacional
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-emerald-950 mb-6">
                Importações <span className="text-primary">Aéreas</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Soluções completas e personalizadas para que a carga do seu cliente chegue ao destino final com máxima segurança e agilidade.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Content Sections */}
        {sections.map((section, idx) => (
          <section key={idx} className={`py-24 ${idx % 2 === 1 ? "bg-slate-50" : "bg-white"}`}>
            <div className="container">
              <div className={`flex flex-col lg:flex-row items-center gap-16 ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                <div className="flex-1 space-y-8">
                  <ScrollReveal direction={idx % 2 === 1 ? "right" : "left"}>
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                      <section.icon className="h-7 w-7" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-emerald-950 mb-6">{section.title}</h2>
                    <p className="text-slate-600 text-lg leading-relaxed mb-8">
                      {section.desc}
                    </p>
                    <ul className="space-y-4">
                      {section.features.map((feature, fIdx) => (
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
                      <img 
                        src={section.image} 
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

        {/* CTA Section */}
        <section className="py-24 bg-emerald-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
          <div className="container relative z-10 text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">Pronto para otimizar sua <span className="text-primary">importação</span>?</h2>
            <p className="text-emerald-100/80 max-w-2xl mx-auto text-lg">
              Nossa equipe está preparada 24/7 para garantir que sua operação não pare e seus resultados cresçam.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-primary/20 text-lg">
                Falar com Especialista
              </button>
            </div>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}
