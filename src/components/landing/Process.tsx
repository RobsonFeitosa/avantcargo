import { Badge } from "@/components/ui/badge";

export const Process = () => {
  const steps = [
    {
      number: "01",
      title: "Análise e Diagnóstico",
      desc: "Avaliamos as necessidades específicas do seu negócio para traçar a melhor estratégia de comércio exterior.",
    },
    {
      number: "02",
      title: "Planejamento Estratégico",
      desc: "Definimos as rotas, modais e a melhor otimização tributária para garantir a viabilidade da sua operação.",
    },
    {
      number: "03",
      title: "Execução e Acompanhamento",
      desc: "Gerenciamos cada detalhe do processo aduaneiro com transparência e atualizações em tempo real.",
    },
    {
      number: "04",
      title: "Entrega e Pós-Operação",
      desc: "Finalizamos o processo com entrega segura, relatório detalhado e análise de performance operacional.",
    },
  ];

  return (
    <section className="py-24 bg-secondary/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(14,72,76,0.05),transparent_50%)]" />
      
      <div className="container relative z-10">
        <div className="text-center space-y-4 mb-20 max-w-2xl mx-auto">
          <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 uppercase tracking-widest px-4 py-1">
            Como Trabalhamos
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold">Nossa abordagem em <span className="text-primary">4 etapas</span></h2>
          <p className="text-muted-foreground">
            Um fluxo de trabalho transparente e eficiente desenhado para mitigar riscos e maximizar resultados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-12 left-0 w-full h-[2px] bg-border border-dashed border-t-2" />
          
          {steps.map((step, idx) => (
            <div key={idx} className="relative space-y-6 group animate-slide-up [animation-delay:${idx * 150}ms] opacity-0">
              <div className="h-16 w-16 rounded-full bg-background border-4 border-primary/20 flex items-center justify-center text-xl font-bold text-primary group-hover:scale-110 group-hover:border-primary transition-all duration-300 relative z-20 mx-auto lg:mx-0">
                {step.number}
              </div>
              <div className="space-y-3 text-center lg:text-left">
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
