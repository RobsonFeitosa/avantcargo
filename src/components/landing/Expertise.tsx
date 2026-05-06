import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ChevronRight } from "lucide-react";

export const Expertise = () => {
  const items = [
    { title: "GRU | VCP Expertise", desc: "Representação real e ágil nos principais aeroportos do país." },
    { title: "Cargas Perigosas", desc: "Segurança absoluta na exportação aérea de materiais complexos." },
    { title: "Checklist de Segurança", desc: "Processos rigorosos para evitar que sua carga seja barrada." },
    { title: "Impacto Climático", desc: "Monitoramento constante de condições que afetam fretes aéreos." },
    { title: "Digitalização", desc: "Controle da informação para garantir resultados previsíveis." },
    { title: "Logística Sustentável", desc: "Parcerias com startups para rastreamento sustentável." },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 uppercase tracking-widest px-4 py-1">
              Diferencial Competitivo
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Mais de <span className="text-primary">20 anos</span> de expertise em Comércio Exterior
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Atuamos com excelência em todos os portos, aeroportos e fronteiras do Brasil, garantindo que sua carga chegue ao destino final sem imprevistos e com o melhor custo-benefício.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8">
                Conheça nossa história <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="ghost" className="hover:bg-secondary text-foreground font-semibold px-8">
                Ver certificados
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {items.map((item, idx) => (
              <div key={idx} className={`card-surface p-6 hover:translate-y-[-4px] transition-all duration-300`}>
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle2 className="text-primary h-5 w-5 shrink-0" />
                  <h4 className="font-bold text-sm">{item.title}</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
