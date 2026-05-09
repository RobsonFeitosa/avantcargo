"use client";

import { LandingLayout } from "@/components/layout/LandingLayout";
import { Badge } from "@/components/ui/badge";
import { Truck, CheckCircle2, MapPin, Zap, ShieldCheck, ClipboardCheck, MessageCircle } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Image from "next/image";
import exempl1transport from "@/assets/exempl1transport.jpg";
import { FaWhatsapp } from "react-icons/fa";

export default function ServiceTransport() {
  const features = [
    "Transporte rodoviário especializado em Importações e Exportações Aéreas.",
    "Veículo dedicado à sua operação.",
    "Transportes urgentes, veículos despachados imediatamente.",
    "Preparação de cargas para Exportação.",
    "Repesagem e Fotografias.",
    "Follow-up Automatizados.",
    "Pré-cadastro e agendamentos nos aeroportos.",
    "Etiquetagem.",
    "Distribuição das Importações.",
    "Armazenagem.",
    "Reposição de gelo.",
    "Check-list completo de cargas especiais."
  ];

  return (
    <LandingLayout>
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden relative bg-slate-50 border-b border-slate-200">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.05),transparent_70%)] pointer-events-none" />
          <div className="container relative z-10 text-center">
            <ScrollReveal>
              <Badge variant="outline" className="px-4 py-1.5 border-primary/30 bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
                Logística Nacional e Internacional
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-emerald-950 mb-6">
                Transporte <span className="text-primary">Rodoviário</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                transporte nacional, cargas urgentes, transporte importação, transporte exportação. Soluções exclusivas para Agentes de Carga.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-24">
          <div className="container">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 w-full">
                <ScrollReveal direction="left">
                  <div className="relative aspect-video lg:aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl group">
                    <Image
                      src={exempl1transport}
                      alt="Transporte Rodoviário AvantCargo"
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-emerald-950/10" />
                  </div>
                </ScrollReveal>
              </div>
              <div className="flex-1 space-y-8">
                <ScrollReveal direction="right">
                  <h2 className="text-3xl md:text-4xl font-bold text-emerald-950">Estratégia e Crescimento para seu Negócio</h2>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Entendendo a necessidade de nossos clientes, implantamos constantemente serviços estrategicamente desenvolvidos para auxiliar no crescimento da sua empresa através da Avant.
                  </p>
                  <p className="text-slate-600 text-lg leading-relaxed italic border-l-4 border-primary pl-6">
                    "Ofereça soluções aos seus clientes totalmente personalizadas e diferenciadas de seus concorrentes no mercado interno."
                  </p>
                  <p className="text-slate-500 font-medium">
                    Serviços exclusivos aos Agentes de Cargas e Comissarias de Despacho Aduaneiro.
                  </p>
                  <div className="pt-4">
                    <a
                      href="https://wa.me/5511964503217"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-primary/20 text-lg"
                    >
                      <FaWhatsapp className="w-5 h-5" />
                      Saiba Mais
                    </a>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-slate-50">
          <div className="container">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-950">Diferenciais <span className="text-primary">Logísticos</span></h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Soluções completas de transporte e pré-embarque para garantir o sucesso da sua operação.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, idx) => (
                <ScrollReveal key={idx} delay={idx * 0.05}>
                  <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-primary/30 hover:shadow-md transition-all flex items-start gap-4 group h-full">
                    <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all mt-1">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <span className="font-semibold text-slate-700 group-hover:text-emerald-950 transition-colors leading-snug">{feature}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}
