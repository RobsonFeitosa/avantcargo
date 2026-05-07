"use client";

import { LandingLayout } from "@/components/layout/LandingLayout";
import { Badge } from "@/components/ui/badge";
import { Radar, Landmark, Truck, CheckCircle2, Plane, Zap, Phone, Monitor } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

import exempl1Import from "@/assets/exempl1.jpg";
import exempl2Import from "@/assets/exempl2.jpg";
import exempl3Import from "@/assets/exempl3.jpg";
import exempl1Export from "@/assets/exempl1export.jpg";
import exempl2Export from "@/assets/exempl2export.jpg";
import exempl3Export from "@/assets/exempl3export.jpg";
import exempl4Export from "@/assets/exempl4export.jpg";

import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";

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
      image: exempl1Import
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
      image: exempl2Import
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
      image: exempl3Import
    }
  ];

  const exportSections = [
    {
      title: "Preparação de cargas",
      desc: "Exportação aérea exige velocidade, precisão e total conformidade. Oferecemos um serviço completo de preparação de cargas para exportações aéreas, garantindo que sua operação aconteça com máxima segurança e eficiência nos principais aeroportos do país. Com estrutura moderna, equipe altamente qualificada e know-how em comércio exterior, transformamos a complexidade da exportação aérea em um processo simples, ágil e confiável. Nosso compromisso é que sua carga esteja pronta para embarcar sem imprevistos, respeitando prazos críticos e reduzindo custos operacionais.",
      features: [
        "Velocidade e precisão documental",
        "Máxima segurança e eficiência",
        "Know-how em comércio exterior",
        "Redução de custos operacionais"
      ],
      icon: Plane,
      image: exempl1Export
    },
    {
      title: "Operações Urgentes",
      desc: "Seu cliente não pode esperar? Cuidamos disso! Oferecemos soluções rápidas, especializadas e seguras em exportação aérea com atuação direta em Guarulhos (GRU) e Viracopos (VCP). Com estrutura própria, equipe especializada e processos ágeis, cuidamos de toda a operação — da coleta à entrega dos documentos de embarque na Cia. Transformamos a urgência do seu negócio em resultados rápidos, seguros e eficientes.",
      features: [
        "Atuação direta nos principais aeroportos",
        "Estrutura própria e equipe especializada",
        "Processos ágeis da coleta ao embarque",
        "Resultados seguros e eficientes"
      ],
      icon: Zap,
      image: exempl2Export
    },
    {
      title: "Sistemas comércio exterior",
      desc: "A exportação aérea exige precisão documental e total conformidade com os órgãos reguladores. Oferecemos suporte especializado para os lançamentos que estão sob responsabilidade do Agente de Carga (E-awb e lançamentos no Portal Único). Mais velocidade, menos burocracia: terceirize seus lançamentos e foque no seu cliente!",
      features: [
        "Precisão documental e conformidade",
        "Lançamentos no Portal Único",
        "E-awb especializado",
        "Terceirização ágil e segura"
      ],
      icon: Monitor,
      image: exempl3Export
    },
    {
      title: "Transporte e Pré-Embarque",
      desc: "Antes da carga chegar ao aeroporto, cada detalhe da operação faz diferença no sucesso da exportação. A Avant oferece soluções completas de Transporte, garantindo que sua mercadoria chegue ao terminal aéreo pronta para o embarque internacional. Cuidamos da coleta, atualizações em tempo real, check-list físico, etiquetagem, pré-cadastro e entrega nos terminais.",
      features: [
        "Soluções completas de transporte",
        "Check-list físico e etiquetagem",
        "Pré-cadastro nos terminais",
        "Atualizações em tempo real"
      ],
      icon: Truck,
      image: exempl4Export
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
                      <Image
                        width={1000}
                        height={1000}
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
        <section className="pt-24 pb-8 bg-white border-t border-slate-100">
          <div className="container text-center">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-bold text-emerald-950">Exportações <span className="text-primary">Aéreas</span></h2>
            </ScrollReveal>
          </div>
        </section>

        {/* Export Content Sections */}
        {exportSections.map((section, idx) => (
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
                      <Image
                        width={1000}
                        height={1000}
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
        <section className="py-24 bg-primary text-white relative overflow-hidden">
          <div className="container relative z-10 text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">Operação Urgente? <span className="text-emerald-950">Nós cuidamos!</span></h2>
            <p className="text-emerald-50 max-w-2xl mx-auto text-lg font-medium">
              Não perca prazos. Nossa equipe está pronta para agir agora.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button className="bg-emerald-950 text-white px-10 py-4 rounded-full font-bold hover:bg-emerald-900 transition-all shadow-xl flex items-center gap-3 text-xl group">
                <FaWhatsapp className="h-6 w-6 text-primary group-hover:animate-bounce" />
                Ligue Agora
              </button>
            </div>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}
