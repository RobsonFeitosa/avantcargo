import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Box, FileCheck, Landmark, Truck, Radar, FileSearch } from "lucide-react";

export const Services = () => {
  const services = [
    {
      title: "Logística Eficiente",
      desc: "Representação real de GRU a VCP para quem não pode esperar. Soluções ágeis e controle total.",
      icon: Truck,
      featured: true,
    },
    {
      title: "Exportação Aérea",
      desc: "Seu parceiro estratégico com expertise em cargas perigosas e operações de alta complexidade.",
      icon: Box,
    },
    {
      title: "Desembaraço Aduaneiro",
      desc: "Terceirização especializada em aeroportos que acelera o desembaraço e reduz custos operacionais.",
      icon: FileCheck,
    },
    {
      title: "Inteligência Artificial",
      desc: "Uso de IA para otimizar estoques, reduzir desperdícios e prever sazonalidade nos fretes.",
      icon: Landmark,
    },
    {
      title: "Habilitação Radar",
      desc: "Processo completo para habilitar sua empresa a operar legalmente no comércio exterior.",
      icon: Radar,
    },
    {
      title: "Consultoria Técnica",
      desc: "Análise de impacto de condições climáticas e sazonalidade nos custos de frete internacional.",
      icon: FileSearch,
    },
  ];

  return (
    <section id="servicos" className="py-24 bg-background">
      <div className="container">
        <div className="text-center space-y-4 mb-16 max-w-2xl mx-auto">
          <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 uppercase tracking-widest px-4 py-1">
            Nossa Expertise
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold">Principais <span className="text-primary">Serviços</span></h2>
          <p className="text-muted-foreground">
            Oferecemos soluções completas para integrar sua empresa ao mercado internacional com eficiência e segurança.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, idx) => (
            <Card key={idx} className={`p-8 card-surface group hover:border-primary/50 transition-all duration-300 relative overflow-hidden animate-slide-up [animation-delay:${idx * 100}ms] opacity-0 ${s.featured ? "border-primary/30" : ""}`}>
              {s.featured && (
                <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-primary-foreground text-[10px] font-bold uppercase rounded-bl-lg">
                  Mais procurado
                </div>
              )}
              <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <s.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {s.desc}
              </p>
              <button className="text-sm font-semibold text-primary flex items-center gap-2 hover:gap-3 transition-all">
                Saiba mais <Box className="h-3 w-3" />
              </button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
