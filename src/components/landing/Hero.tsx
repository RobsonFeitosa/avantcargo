import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Globe, FileText, Users } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden min-h-screen flex items-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(14,72,76,0.1),transparent_70%)] pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <Badge variant="outline" className="px-4 py-1.5 border-primary/30 bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase">
              Logística Aérea & Serviços Aduaneiros
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              Seu parceiro <span className="text-primary">estratégico</span> <br />
              em Aeroportos GRU | VCP
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Soluções ágeis para agentes de carga e comissárias. Controle a informação, controle o resultado e acelere seu desembaraço aduaneiro.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-12 shadow-glow">
                Ver recursos <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-border hover:bg-secondary h-12 px-8 font-semibold">
                Falar agora
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-[10px] font-bold overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-bold">+500 clientes</span> confiam em nós
              </p>
            </div>
          </div>

          <div className="relative animate-fade-in [animation-delay:200ms]">
            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full opacity-50" />
            <div className="relative card-surface p-6 md:p-8 backdrop-blur-xl border-primary/20">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Shield className="text-primary h-5 w-5" /> Nossos Diferenciais
              </h3>

              <div className="space-y-4">
                {[
                  { icon: Globe, title: "Assessoria Aduaneira", desc: "Expertise global em todos os portos e aeroportos." },
                  { icon: FileText, title: "Consultoria Tributária", desc: "Otimização de impostos e regimes especiais." },
                  { icon: Shield, title: "Segurança Jurídica", desc: "Conformidade total com a legislação vigente." },
                  { icon: Users, title: "Equipe Dedicada", desc: "Suporte especializado em cada etapa do processo." },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-3 rounded-lg hover:bg-primary/5 transition-colors group">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
                <div>
                  <p className="text-2xl font-bold text-primary">500+</p>
                  <p className="text-[10px] text-muted-foreground uppercase">Clientes atendidos</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">20+</p>
                  <p className="text-[10px] text-muted-foreground uppercase">Anos de experiência</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">98%</p>
                  <p className="text-[10px] text-muted-foreground uppercase">Satisfação</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
