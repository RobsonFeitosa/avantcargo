"use client";

import { LandingLayout } from "@/components/layout/LandingLayout";
import { Badge } from "@/components/ui/badge";
import { Radar, Landmark, Truck, CheckCircle2, Plane, Zap, Phone } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export default function ServiceRepresentacao() {
  const importSections = [
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

  const exportSections = [
    {
      title: "Preparação de Cargas (Exportação)",
      desc: "Exportação aérea exige velocidade, precisão e total conformidade. Garantimos que sua operação aconteça com máxima segurança e eficiência nos principais aeroportos do país.",
      features: [
        "Estrutura moderna e equipe altamente qualificada",
        "Know-how profundo em comércio exterior",
        "Respeito rigoroso a prazos críticos",
        "Redução significativa de custos operacionais"
      ],
      icon: Plane,
      image: "https://images.unsplash.com/photo-1570126618983-224422e96cc0?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Operações Urgentes",
      desc: "Seu cliente não pode esperar? Cuidamos disso! Oferecemos soluções rápidas e seguras em exportação aérea com atuação direta em GRU e VCP.",
      features: [
        "Estrutura própria e processos ágeis",
        "Gestão completa: da coleta à entrega na Cia",
        "Entrega de documentos de embarque simplificada",
        "Transformamos urgência em resultados eficientes"
      ],
      icon: Zap,
      image: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <LandingLayout>
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden relative bg-slate-50 border-b border-slate-200">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(14,72,76,0.05),transparent_70%)] pointer-events-none" />
          <div className="container relative z-10 text-center">
            <ScrollReveal>
              <Badge variant="outline" className="px-4 py-1.5 border-primary/30 bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
                Representação Estratégica
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-emerald-950 mb-6">
                Representações <span className="text-primary">Aéreas</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Integramos operações de importação e exportação com foco em agilidade, segurança e conformidade total nos principais aeroportos do Brasil.
              </p>
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
        {importSections.map((section, idx) => (
          <section key={idx} className={`py-20 ${idx % 2 === 1 ? "bg-slate-50" : "bg-white"}`}>
            <div className="container">
              <div className={`flex flex-col lg:flex-row items-center gap-16 ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                <div className="flex-1 space-y-8">
                  <ScrollReveal direction={idx % 2 === 1 ? "right" : "left"}>
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                      <section.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-emerald-950 mb-6">{section.title}</h3>
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

        {/* Export Sections Title */}
        <section className="pt-24 pb-8 bg-emerald-950 text-white">
            <div className="container text-center">
                <ScrollReveal>
                    <h2 className="text-3xl md:text-5xl font-bold">Exportações <span className="text-primary">Aéreas</span></h2>
                </ScrollReveal>
            </div>
        </section>

        {/* Export Content Sections */}
        {exportSections.map((section, idx) => (
          <section key={idx} className={`py-20 ${idx % 2 === 1 ? "bg-slate-900" : "bg-emerald-950"} text-white`}>
            <div className="container">
              <div className={`flex flex-col lg:flex-row items-center gap-16 ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                <div className="flex-1 space-y-8">
                  <ScrollReveal direction={idx % 2 === 1 ? "right" : "left"}>
                    <div className="h-14 w-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-6">
                      <section.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-6">{section.title}</h3>
                    <p className="text-emerald-100/80 text-lg leading-relaxed mb-8">
                      {section.desc}
                    </p>
                    <ul className="space-y-4">
                      {section.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3">
                          <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                          <span className="text-emerald-50 font-medium">{feature}</span>
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
                      <div className="absolute inset-0 bg-black/20" />
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* CTA Section */}
        <section className="py-24 bg-primary text-white relative overflow-hidden">
          <div className="container relative z-10 text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">Operação Urgente? <span className="text-emerald-950">Nós cuidamos!</span></h2>
            <p className="text-emerald-50 max-w-2xl mx-auto text-lg font-medium">
              Não perca prazos. Nossa equipe está pronta para agir agora.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button className="bg-emerald-950 text-white px-10 py-4 rounded-full font-bold hover:bg-emerald-900 transition-all shadow-xl flex items-center gap-3 text-xl group">
                <Phone className="h-6 w-6 text-primary group-hover:animate-bounce" />
                Ligue Agora
              </button>
            </div>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}
