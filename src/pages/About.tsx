import { LandingLayout } from "@/components/layout/LandingLayout";
import { Badge } from "@/components/ui/badge";
import { Shield, Target, Users, Award } from "lucide-react";

export default function About() {
  return (
    <LandingLayout>
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(14,72,76,0.1),transparent_70%)] pointer-events-none" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
            <Badge variant="outline" className="px-4 py-1.5 border-primary/30 bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase">
              Sobre Nós
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              A extensão técnica da sua <span className="text-primary">logística internacional</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A AvantCargo é um ecossistema integrado que conecta cada etapa da sua cadeia logística com máxima precisão e eficiência operacional. Somos seu parceiro estratégico em exportações aéreas e serviços aduaneiros nos aeroportos de GRU e VCP.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary/5">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">Nossa <span className="text-primary">Missão</span></h2>
              <p className="text-muted-foreground leading-relaxed italic border-l-4 border-primary pl-6 py-2">
                "Promover a integração de empresas no mercado internacional através de soluções logísticas inovadoras, seguras e transparentes, contribuindo para o crescimento sustentável de nossos clientes."
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: Target, title: "Visão", desc: "Ser referência nacional em consultoria estratégica de comércio exterior." },
                  { icon: Shield, title: "Valores", desc: "Ética, transparência, agilidade e conformidade legal absoluta." },
                ].map((item, idx) => (
                  <div key={idx} className="card-surface p-6">
                    <item.icon className="h-8 w-8 text-primary mb-4" />
                    <h4 className="font-bold mb-2">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="card-surface p-2 rounded-2xl overflow-hidden aspect-video bg-muted/20 flex items-center justify-center border-dashed border-2 border-border">
                <p className="text-muted-foreground font-medium italic">Imagem institucional da equipe ou sede</p>
              </div>
              <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-primary/20 blur-2xl rounded-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold">Por que escolher a <span className="text-primary">AvantCargo</span>?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Nossa trajetória é marcada pelo compromisso com o resultado e pela busca contínua pela excelência técnica.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: "Expertise Técnica", desc: "Equipe altamente qualificada em legislação aduaneira." },
              { icon: Users, title: "Foco no Cliente", desc: "Atendimento personalizado para cada tipo de operação." },
              { icon: Shield, title: "Segurança", desc: "Processos rigorosos para garantir compliance total." },
              { icon: Target, title: "Resultados", desc: "Foco na redução de custos e otimização de prazos." },
            ].map((item, idx) => (
              <div key={idx} className="text-center space-y-4 p-8 card-surface group hover:border-primary transition-all duration-300 animate-slide-up opacity-0 [animation-delay:200ms]">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <item.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground" />
                </div>
                <h4 className="font-bold">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
