import { Badge } from "@/components/ui/badge";
import { Quote } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Ricardo Santos",
      role: "Diretor de Logística, Autoparts S.A.",
      text: "O atendimento da AvantCargo superou todas as nossas expectativas. Conseguimos reduzir nossos custos de desembaraço em 15% logo no primeiro trimestre.",
      initials: "RS",
    },
    {
      name: "Ana Oliveira",
      role: "Gerente de Importação, TechGlobal",
      text: "Eficiência e transparência em cada etapa. O suporte 24/7 realmente faz a diferença quando lidamos com diferentes fusos horários.",
      initials: "AO",
    },
    {
      name: "Thiago Souza",
      role: "CEO, AgroTech",
      text: "Parceria fundamental para nossa expansão internacional. A expertise técnica da equipe nos deu a segurança necessária para novos mercados.",
      initials: "TS",
    },
    {
      name: "Carlos Mendes",
      role: "Gerente de Exportação, Metalurgia S.A.",
      text: "A AvantCargo não é apenas um prestador de serviço, é uma extensão estratégica do nosso departamento de comércio exterior.",
      initials: "CM",
    },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(14,72,76,0.03),transparent_70%)] pointer-events-none" />
      
      <div className="container relative z-10">
        <div className="text-center space-y-4 mb-16 max-w-2xl mx-auto">
          <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 uppercase tracking-widest px-4 py-1">
            Depoimentos
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold">O que nossos <span className="text-primary">clientes dizem</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className={`card-surface p-8 relative group animate-slide-up [animation-delay:${idx * 200}ms] opacity-0`}>
              <Quote className="absolute top-6 right-8 h-12 w-12 text-primary/10 group-hover:text-primary/20 transition-colors" />
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground italic leading-relaxed relative z-10">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold">
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="font-bold">{t.name}</h4>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
