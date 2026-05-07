import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { BiSolidDirections } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";


export const Process = () => {
  const steps = [
    {
      number: "01",
      title: "Análise e Diagnóstico",
      desc: "Avaliamos a situação da empresa, os produtos e os objetivos para identificar as melhores oportunidades e regimes aduaneiros aplicáveis.",
    },
    {
      number: "02",
      title: "Planejamento e Estratégia",
      desc: "Definimos a estratégia mais adequada para cada operação, com foco em redução de custos, conformidade legal e agilidade no processo.",
    },
    {
      number: "03",
      title: "Execução e Acompanhamento",
      desc: "Realizamos todos os procedimentos junto aos órgãos competentes (Receita Federal, MDIC, Siscomex), monitorando cada etapa e respondendo às exigências com agilidade.",
    },
    {
      number: "04",
      title: "Resultado e Continuidade",
      desc: "Entregamos o resultado esperado e mantemos o relacionamento ativo, garantindo que sua empresa esteja sempre em conformidade e aproveitando os benefícios disponíveis.",
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10">
        <div className="text-center space-y-4 mb-20 mx-auto">
          <ScrollReveal>
            <Badge variant="outline" className="text-primary gap-2 border-primary/20 bg-primary/5 uppercase tracking-widest px-4 py-1 rounded-full">
              <BiSolidDirections />
              Como Trabalhamos
            </Badge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-5xl font-bold text-emerald-950">Nossa abordagem em <span className="text-primary">4 etapas</span></h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2} className="flex justify-center">
            <p className="text-slate-600 max-w-2xl text-lg">
              Um fluxo de trabalho transparente e eficiente desenhado para mitigar riscos e maximizar resultados.
            </p>
          </ScrollReveal>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-8 top-8 bottom-24 w-[2px] bg-slate-200 -translate-x-1/2" />

          <div className="space-y-16 relative">
            {steps.map((step, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.15} direction="up" distance={30}>
                <div className="flex items-start gap-8 md:gap-16 group">
                  <div className="relative z-10 shrink-0 h-16 w-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 rounded-full border-[3px] border-slate-100 group-hover:border-orange-500/30 transition-colors duration-500" />
                    <div className="h-[3.25rem] w-[3.25rem] rounded-full bg-primary flex items-center justify-center text-lg font-bold text-white group-hover:bg-orange-500 transition-colors duration-500 shadow-lg shadow-primary/20 group-hover:shadow-orange-500/20">
                      {step.number}
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <h3 className="text-2xl font-bold text-emerald-900 group-hover:text-primary transition-colors duration-300">{step.title}</h3>
                    <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.6} className="mt-16 flex justify-center">
            <Button className="bg-primary hover:bg-emerald-700 text-white font-bold text-base shadow-xl shadow-primary/10 rounded-full group transition-all duration-300 hover:scale-105">
              <FaWhatsapp className=" h-5 w-5 group-hover:scale-110 transition-transform" />
              Falar com um especialista
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
