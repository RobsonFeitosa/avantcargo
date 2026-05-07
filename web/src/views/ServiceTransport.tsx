"use client";

import { LandingLayout } from "@/components/layout/LandingLayout";
import { Badge } from "@/components/ui/badge";
import { Truck, MapPin, ClipboardCheck, Tag, FilePlus, Building2 } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export default function ServiceTransport() {
  const steps = [
    {
      title: "Coleta Especializada",
      desc: "Retiramos sua mercadoria com pontualidade e cuidado extremo.",
      icon: Truck,
      color: "text-blue-500"
    },
    {
      title: "Check-list Físico",
      desc: "Conferência rigorosa da integridade e especificações da carga.",
      icon: ClipboardCheck,
      color: "text-emerald-500"
    },
    {
      title: "Etiquetagem",
      desc: "Padronização e identificação precisa para embarque internacional.",
      icon: Tag,
      color: "text-orange-500"
    },
    {
      title: "Pré-cadastro",
      desc: "Agilidade nos sistemas aeroportuários antes mesmo da chegada.",
      icon: FilePlus,
      color: "text-primary"
    },
    {
      title: "Atualização em Tempo Real",
      desc: "Follow-up constante sobre cada movimento do transporte.",
      icon: MapPin,
      color: "text-blue-600"
    },
    {
      title: "Entrega nos Terminais",
      desc: "Finalização ágil e segura nos principais aeroportos (GRU/VCP).",
      icon: Building2,
      color: "text-emerald-600"
    }
  ];

  return (
    <LandingLayout>
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden relative bg-slate-50 border-b border-slate-200">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-5" />
          <div className="container relative z-10 text-center">
            <ScrollReveal>
              <Badge variant="outline" className="px-4 py-1.5 border-primary/30 bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
                Logística de Ponta a Ponta
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-emerald-950 mb-6">
                Transporte e <span className="text-primary">Pré-Embarque</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Antes da carga chegar ao aeroporto, cada detalhe da operação faz diferença no sucesso da exportação.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-bold text-emerald-950">Segurança e Agilidade no Terminal</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  A Avant oferece soluções completas de Transporte, garantindo que sua mercadoria chegue ao terminal aéreo com segurança, agilidade e pronta para o embarque internacional.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Steps Grid */}
        <section className="py-24 bg-slate-50">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {steps.map((step, idx) => (
                <ScrollReveal key={idx} delay={idx * 0.1}>
                  <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
                    <div className={`h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <step.icon className={`h-7 w-7 ${step.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-emerald-950 mb-4">{step.title}</h3>
                    <p className="text-slate-500 leading-relaxed italic">
                      {step.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Detail Section */}
        <section className="py-24">
          <div className="container">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1">
                <ScrollReveal direction="left">
                  <div className="relative rounded-[40px] overflow-hidden shadow-2xl aspect-square lg:aspect-video">
                    <img 
                      src="https://images.unsplash.com/photo-1519003722824-192d9978736b?q=80&w=2070&auto=format&fit=crop" 
                      alt="Transporte AvantCargo"
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-primary/10" />
                  </div>
                </ScrollReveal>
              </div>
              <div className="flex-1 space-y-8">
                <ScrollReveal direction="right">
                  <h2 className="text-3xl md:text-4xl font-bold text-emerald-950">Foco na Prontidão para Embarque</h2>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Cuidamos da coleta, atualizações em tempo real, check-list físico, etiquetagem, pré-cadastro e entrega nos terminais aeroportuários. 
                  </p>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Nosso processo é desenhado para eliminar gargalos e garantir que a carga esteja 100% em conformidade antes de ser entregue à companhia aérea.
                  </p>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}
