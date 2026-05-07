"use client";

import { LandingLayout } from "@/components/layout/LandingLayout";
import { Badge } from "@/components/ui/badge";
import { Monitor, FileJson, Zap, ShieldCheck } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export default function ServiceComex() {
  return (
    <LandingLayout>
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden relative bg-slate-50 border-b border-slate-200">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05),transparent_70%)] pointer-events-none" />
          <div className="container relative z-10 text-center">
            <ScrollReveal>
              <Badge variant="outline" className="px-4 py-1.5 border-primary/30 bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
                Tecnologia e Conformidade
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-emerald-950 mb-6">
                Sistemas <span className="text-primary">Comex</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Mais velocidade, menos burocracia: terceirize seus lançamentos e foque no seu cliente!
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-24">
          <div className="container">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 space-y-8">
                <ScrollReveal direction="left">
                  <h2 className="text-3xl md:text-4xl font-bold text-emerald-950">E-awb e Lançamentos no Portal Único</h2>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    A exportação aérea exige precisão documental e total conformidade com os órgãos reguladores. Oferecemos suporte especializado para os lançamentos que estão sob responsabilidade do Agente de Carga.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 group hover:border-primary/50 transition-all">
                      <FileJson className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="font-bold text-emerald-950 mb-2">Precisão Documental</h3>
                      <p className="text-sm text-slate-500">Garantia de que cada dado inserido segue rigorosamente as normas vigentes.</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 group hover:border-primary/50 transition-all">
                      <Zap className="h-10 w-10 text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="font-bold text-emerald-950 mb-2">Agilidade Digital</h3>
                      <p className="text-sm text-slate-500">Lançamentos rápidos no Portal Único para evitar atrasos no embarque.</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 group hover:border-primary/50 transition-all">
                      <ShieldCheck className="h-10 w-10 text-emerald-600 mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="font-bold text-emerald-950 mb-2">Conformidade Total</h3>
                      <p className="text-sm text-slate-500">Total alinhamento com os órgãos reguladores e legislação aduaneira.</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 group hover:border-primary/50 transition-all">
                      <Monitor className="h-10 w-10 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="font-bold text-emerald-950 mb-2">Suporte Especializado</h3>
                      <p className="text-sm text-slate-500">Equipe focada na responsabilidade do Agente de Carga.</p>
                    </div>
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
                      <h3 className="text-2xl font-bold">Por que terceirizar?</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                          </div>
                          <span>Foco total no atendimento ao seu cliente</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                          </div>
                          <span>Redução de erros operacionais e multas</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                          </div>
                          <span>Escalabilidade para picos de demanda</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Info Box */}
        <section className="py-24 bg-slate-50">
          <div className="container">
            <div className="bg-white border border-slate-200 rounded-[32px] p-12 text-center max-w-4xl mx-auto shadow-sm">
              <ScrollReveal>
                <h2 className="text-3xl font-bold text-emerald-950 mb-6">Eficiência que impulsiona seu <span className="text-primary">negócio</span></h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Não deixe que a burocracia documental atrase sua logística. Com a AvantCargo, seus lançamentos são tratados com a prioridade e a precisão que o comércio exterior moderno exige.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}
