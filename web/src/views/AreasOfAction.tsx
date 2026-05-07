"use client";

import { LandingLayout } from "@/components/layout/LandingLayout";
import { Badge } from "@/components/ui/badge";
import { Box, FileCheck, Landmark, Truck, Radar, FileSearch, ShieldCheck, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AreasOfAction() {
  const areas = [
    {
      title: "Despacho Aduaneiro",
      desc: "Liberação de mercadorias junto à Receita Federal com agilidade e total conformidade legal.",
      icon: Box,
      details: ["Importação e Exportação", "Regimes Especiais", "Análise Documental", "Classificação Fiscal"]
    },
    {
      title: "Logística Internacional",
      desc: "Gestão completa do transporte de carga nos modais aéreo, marítimo e rodoviário.",
      icon: Globe,
      details: ["Frete Internacional", "Seguro de Carga", "Consolidação de Cargas", "Door-to-Door"]
    },
    {
      title: "Consultoria Tributária",
      desc: "Otimização de impostos e orientação sobre benefícios fiscais no comércio exterior.",
      icon: FileSearch,
      details: ["Drawback", "Ex-Tarifário", "Recof-Sped", "Consultoria de Tributos"]
    },
    {
      title: "Habilitação Radar",
      desc: "Processo completo para habilitação de empresas no SISCOMEX para operar legalmente.",
      icon: Radar,
      details: ["Pessoa Física", "Expressa", "Limitada", "Ilimitada"]
    },
    {
      title: "Entreposto Aduaneiro",
      desc: "Armazenagem estratégica com suspensão de impostos para melhor fluxo de caixa.",
      icon: Landmark,
      details: ["Gestão de Estoque", "Prorrogação de Prazos", "Nacionalização Parcial", "Logística Local"]
    },
    {
      title: "Gestão de Projetos",
      desc: "Desenvolvimento de soluções logísticas personalizadas para operações complexas.",
      icon: ShieldCheck,
      details: ["Cargas de Projeto", "Estudos de Viabilidade", "Planejamento Especial", "Escolta e Segurança"]
    }
  ];

  return (
    <LandingLayout>
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(14,72,76,0.1),transparent_70%)] pointer-events-none" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
            <Badge variant="outline" className="px-4 py-1.5 border-primary/30 bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase">
              Onde Atuamos
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Áreas de <span className="text-primary">Atuação</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Oferecemos um portfólio completo de serviços para garantir que sua empresa tenha suporte especializado em cada detalhe da operação internacional.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {areas.map((area, idx) => (
              <Card key={idx} className="card-surface p-8 group hover:border-primary transition-all duration-300 animate-slide-up opacity-0 [animation-delay:${idx * 100}ms]">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <area.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-4">{area.title}</h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {area.desc}
                </p>
                <ul className="space-y-3 pt-6 border-t border-border">
                  {area.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-center gap-2 text-xs font-medium text-foreground/80">
                       <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                       {detail}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary/5">
         <div className="container">
            <div className="card-surface p-12 text-center space-y-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl -mr-32 -mt-32 rounded-full" />
               <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                  <h2 className="text-3xl font-bold">Precisa de uma solução <span className="text-primary">específica</span>?</h2>
                  <p className="text-muted-foreground">Se sua empresa possui um desafio logístico único ou uma operação de grande escala, nossa equipe técnica está pronta para desenhar um projeto sob medida.</p>
                  <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors">
                     Solicitar Análise Técnica
                  </button>
               </div>
            </div>
         </div>
      </section>
    </LandingLayout>
  );
}
