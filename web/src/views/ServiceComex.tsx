"use client";

import { LandingLayout } from "@/components/layout/LandingLayout";
import { Badge } from "@/components/ui/badge";
import { Monitor, ShieldCheck, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export default function ServiceComex() {
  const features = [
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
    "Atualizações Sistemáticas."
  ];

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
              <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                A base sólida por trás dos líderes do mercado! Deixe a responsabilidade técnica conosco e foque no crescimento do seu negócio.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Main Value Proposition */}
        <section className="py-24">
          <div className="container">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 space-y-8">
                <ScrollReveal direction="left">
                  <h2 className="text-3xl md:text-4xl font-bold text-emerald-950">Prioridade Máxima em Lançamentos</h2>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Quando o assunto é impulsionar seu negócio através dos nossos serviços, tratamos com prioridade máxima. Deixar a responsabilidade de lançamentos com a Avant te garante tranquilidade e a certeza da excelência em cada etapa da operação.
                  </p>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Nossa equipe dedicada 24x7 cuida de todo o processo com estratégia, precisão e compromisso com resultados, para que você possa focar no que realmente importa: crescer e escalar com segurança.
                  </p>
                  <div className="pt-4">
                    <button className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-primary/20 text-lg">
                      Saiba Mais
                    </button>
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
                      <h3 className="text-2xl font-bold">Por que Avant?</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-1" />
                          <span>Atendimento direto - sem burocracia</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-1" />
                          <span>Precisão técnica em cada lançamento</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-1" />
                          <span>Escalabilidade com segurança operacional</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Features Grid */}
        <section className="py-24 bg-slate-50">
          <div className="container">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-950">Diferenciais e <span className="text-primary">Capacidades</span></h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Excelência técnica e suporte contínuo para garantir a fluidez da sua operação internacional.</p>
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
      </div>
    </LandingLayout>
  );
}
