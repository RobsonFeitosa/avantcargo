import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Globe, FileText, Users, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { GoDotFill } from "react-icons/go";
import { FaBuilding } from "react-icons/fa6";


import { FaCheckCircle, FaWhatsapp } from "react-icons/fa";

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden min-h-screen flex items-center ">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.1),transparent_50%)] pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.7fr] gap-12 items-center">
          <div className="space-y-8">
            <ScrollReveal direction="right" delay={0.1}>
              <Badge variant="outline" className="px-4 gap-2 py-1.5 border-primary/30 bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase">
                <GoDotFill />
                Logística Aérea & Serviços Aduaneiros
              </Badge>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
                Seu parceiro <span className="text-primary">estratégico</span> <br />
                em Aeroportos GRU | VCP
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.3}>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Soluções ágeis para agentes de carga e comissárias. Controle a informação, controle o resultado e acelere seu desembaraço aduaneiro.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.4}>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full text-primary-foreground font-semibold px-8 h-12 shadow-glow">
                  <FaWhatsapp className="mr-1" />
                  Falar conosco
                </Button>
                <Button size="lg" variant="outline" className="border-border rounded-full hover:bg-secondary h-12 px-8 font-semibold">
                  <FaBuilding />
                  Quem somos
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.5}>
              <div className="flex flex-wrap items-center gap-x-10 gap-y-4 pt-6">
                {[
                  "+20 anos de experiência",
                  "Empresa 100% brasileira",
                  "Guarulhos, SP"
                ].map((text, idx) => (
                  <div key={idx} className="flex items-center gap-3 group whitespace-nowrap">
                    <div className="">
                      <FaCheckCircle className="h-3.5 w-3.5 text-orange-500" />
                    </div>
                    <span className="text-sm font-bold text-foreground/90 group-hover:text-foreground transition-colors tracking-tight">{text}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="left" delay={0.3}>
            <div className="relative ">
              <div className="relative  p-6 md:p-8 border   bg-white/40 !rounded-3xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 uppercase">
                  Nossos principais serviços
                </h3>

                <div className="space-y-4">
                  {[
                    { icon: Globe, title: "Assessoria Aduaneira", desc: "Expertise global em todos os portos e aeroportos." },
                    { icon: FileText, title: "Consultoria Tributária", desc: "Otimização de impostos e regimes especiais." },
                    { icon: Shield, title: "Segurança Jurídica", desc: "Conformidade total com a legislação vigente." },
                    { icon: Users, title: "Equipe Dedicada", desc: "Suporte especializado em cada etapa do processo." },
                  ].map((item, idx) => (
                    <div key={idx} className="flex border  bg-white/10 gap-4 p-3 rounded-lg">
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

                <div className="grid grid-cols-3 gap-4 pt-8 ">
                  <div className="border flex justify-center items-center py-4 rounded-lg">
                    <div>
                      <p className="text-2xl font-bold text-primary text-center">500+</p>
                      <p className="text-[10px] text-muted-foreground uppercase text-center">Clientes atendidos</p>
                    </div>
                  </div>
                  <div className="border flex justify-center items-center py-4 rounded-lg">
                    <div>
                      <p className="text-2xl font-bold text-primary text-center">20+</p>
                      <p className="text-[10px] text-muted-foreground uppercase text-center">Anos de experiência</p>
                    </div>
                  </div>
                  <div className="border flex justify-center items-center py-4 rounded-lg">
                    <div>
                      <p className="text-2xl font-bold text-primary text-center">98%</p>
                      <p className="text-[10px] text-muted-foreground uppercase text-center">Satisfação</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
