"use client";

import { LandingLayout } from "@/components/layout/LandingLayout";
import { Badge } from "@/components/ui/badge";
import { Plane, Zap, CheckCircle2, Phone } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export default function ServiceExport() {
  const sections = [
    {
      title: "Preparação de Cargas",
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
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.2),transparent_100%)] pointer-events-none" />
          <div className="container relative z-10 text-center">
            <ScrollReveal>
              <Badge variant="outline" className="px-4 py-1.5 border-orange-500/30 bg-orange-500/5 text-orange-600 text-xs font-semibold tracking-wider uppercase mb-6">
                Precisão e Velocidade
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-emerald-950 mb-6">
                Exportações <span className="text-primary">Aéreas</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Transformamos a complexidade da exportação aérea em um processo simples, ágil e confiável para sua empresa.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <div className="bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.05),transparent_100%)]">
          {/* Content Sections */}
          {sections.map((section, idx) => (
            <section key={idx} className="py-24 bg-transparent">
              <div className="container">
                <div className={`flex flex-col lg:flex-row items-center gap-16 ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                  <div className="flex-1 space-y-8">
                    <ScrollReveal direction={idx % 2 === 1 ? "right" : "left"}>
                      <div className="h-14 w-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-600 mb-6">
                        <section.icon className="h-7 w-7" />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-emerald-950 mb-6">{section.title}</h2>
                      <p className="text-slate-600 text-lg leading-relaxed mb-8">
                        {section.desc}
                      </p>
                      <ul className="space-y-4">
                        {section.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-3">
                            <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
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
          <section className="py-24 bg-primary text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -mr-32 -mt-32" />
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
      </div>
    </LandingLayout>
  );
}
