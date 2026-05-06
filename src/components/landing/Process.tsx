import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

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
    <section className="py-24 bg-secondary/5 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center space-y-4 mb-20 max-w-2xl mx-auto">
          <ScrollReveal>
            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 uppercase tracking-widest px-4 py-1">
              Como Trabalhamos
            </Badge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold">Nossa abordagem em <span className="text-primary">4 etapas</span></h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-muted-foreground">
              Um fluxo de trabalho transparente e eficiente desenhado para mitigar riscos e maximizar resultados.
            </p>
          </ScrollReveal>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-8 top-8 bottom-24 w-[2px] bg-primary/20 -translate-x-1/2" />
          
          <div className="space-y-16 relative">
            {steps.map((step, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.15} direction="up" distance={30}>
                <div className="flex items-start gap-8 md:gap-16 group">
                  <div className="relative z-10 shrink-0">
                    <div className="h-16 w-16 rounded-full bg-background border-4 border-primary/30 flex items-center justify-center text-xl font-bold text-primary shadow-elegant group-hover:scale-110 group-hover:border-primary transition-all duration-500">
                      {step.number}
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          
          <ScrollReveal delay={0.6} className="mt-16 flex justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 h-14 text-base shadow-glow rounded-full group">
              <MessageSquare className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Falar com um especialista
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
