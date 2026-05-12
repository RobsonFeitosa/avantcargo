import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BsFillPeopleFill } from "react-icons/bs";
import { CheckCircle2, Star, TrendingUp, Globe, Handshake, Scale, Award, Users, HelpCircle } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

interface ExpertiseProps {
  data?: {
    headerBadge: string;
    headerTitle: string;
    headerDescription: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    primaryButtonLink?: string;
    secondaryButtonLink?: string;
    differentials: { id: string; icon: string; title: string; desc: string }[];
    achievements: { id: string; icon: string; title: string; desc: string }[];
  }
}

const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
  const Icon = (LucideIcons as any)[name];
  return Icon ? <Icon className={className} /> : <Award className={className} />;
};

export const Expertise = ({ data }: ExpertiseProps) => {
  const leftIcons = [Award, Handshake, Scale];
  const rightIcons = [Star, TrendingUp, Globe, Users];

  const defaultDifferentials = [
    { icon: "Award", title: "98% de aprovação no MDIC", desc: "Taxa de sucesso em processos de Ex-Tarifário" },
    { icon: "Handshake", title: "Atendimento personalizado", desc: "Especialistas dedicados para cada cliente" },
    { icon: "Scale", title: "Conformidade regulatória total", desc: "Processos 100% legais e auditáveis" },
  ];

  const defaultAchievements = [
    { icon: "Star", title: "Ex-Tarifário", desc: "Redução de até 100% no II — alíquota 0%" },
    { icon: "TrendingUp", title: "R$ 480M+ economizados", desc: "Para os nossos clientes" },
    { icon: "Globe", title: "13+ setores", desc: "Indústria, Agro, Tech, Infraestrutura..." },
    { icon: "User", title: "Matheus Diniz", desc: "Fundador & Especialista" },
  ];

  const currentDifferentials = data?.differentials || defaultDifferentials;
  const currentAchievements = data?.achievements || defaultAchievements;

  // Split achievements to separate the founder box (usually the last one if there are 4)
  const mainAchievements = currentAchievements.length >= 4 
    ? currentAchievements.slice(0, currentAchievements.length - 1) 
    : currentAchievements;
  
  const founderAchievement = currentAchievements.length >= 4 
    ? currentAchievements[currentAchievements.length - 1] 
    : null;

  return (
    <section id="sobre" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-primary/5 pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-10">
            <div className="space-y-6">
              <ScrollReveal direction="up" delay={0.1}>
                <Badge variant="outline" className="gap-2 text-orange-600 border-orange-500/20 bg-orange-500/5 uppercase tracking-widest px-4 py-1.5 rounded-full font-bold">
                  <BsFillPeopleFill className="h-4 w-4" />
                  {data?.headerBadge || "Quem somos"}
                </Badge>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.2}>
                <h2 className="text-4xl md:text-6xl font-bold leading-tight text-emerald-950">
                  {data?.headerTitle ? (
                    data.headerTitle.split(" ").map((word, i) => {
                      const isOrange = word.toLowerCase().includes("anos") || (i > 0 && data.headerTitle.split(" ")[i-1].toLowerCase().includes("20"));
                      // Heuristic: if it's "20 anos" or similar
                      const prevWord = i > 0 ? data.headerTitle.split(" ")[i-1] : "";
                      const isNumber = !isNaN(parseInt(word));
                      const isNextAnos = i < data.headerTitle.split(" ").length - 1 && data.headerTitle.split(" ")[i+1].toLowerCase().includes("anos");
                      
                      if (isNumber && isNextAnos) return <span key={i} className="text-orange-500">{word} </span>;
                      if (word.toLowerCase().includes("anos") && !isNaN(parseInt(prevWord))) return <span key={i} className="text-orange-500">{word} </span>;
                      
                      return word + " ";
                    })
                  ) : (
                    <>Mais de <span className="text-orange-500">20 anos</span> de expertise em Comércio Exterior</>
                  )}
                </h2>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.3}>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {data?.headerDescription || "Atuamos com excelência em todos os portos, aeroportos e fronteiras do Brasil, garantindo que sua carga chegue ao destino final sem imprevistos e com o melhor custo-benefício."}
                </p>
              </ScrollReveal>
            </div>

            <div className="space-y-4">
              {currentDifferentials.map((item, idx) => {
                const Icon = leftIcons[idx % leftIcons.length];
                return (
                  <ScrollReveal key={idx} direction="up" delay={0.4 + (idx * 0.1)}>
                    <div className="flex items-center gap-6 p-6 rounded-2xl bg-white border border-slate-200 hover:border-primary/30 shadow-sm hover:shadow-md transition-all group">
                      <div className={`h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform`}>
                        <DynamicIcon name={item.icon} className="h-6 w-6" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-emerald-900 text-lg">{item.title}</h4>
                        <p className="text-sm text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            <ScrollReveal direction="up" delay={0.7}>
              <div className="flex flex-wrap gap-6 pt-4">
                <Button 
                  asChild
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 h-16 rounded-full shadow-lg shadow-orange-500/20 transition-all hover:scale-105 text-lg cursor-pointer"
                >
                  <a href="/quem-somos">
                    {data?.primaryButtonText || "Conheça nossa história"}
                  </a>
                </Button>
                <Button 
                  asChild
                  variant="outline" 
                  className="bg-transparent border-slate-300 text-slate-700 hover:bg-slate-100 font-bold px-10 h-16 rounded-full transition-all text-lg cursor-pointer"
                >
                  <a href="/contato">
                    {data?.secondaryButtonText || "Fale conosco"}
                  </a>
                </Button>
              </div>
            </ScrollReveal>
          </div>

          <div className="space-y-4">
            {mainAchievements.map((item, idx) => {
              const Icon = rightIcons[idx % rightIcons.length];
              return (
                <ScrollReveal key={idx} direction="up" delay={0.2 + (idx * 0.15)}>
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-primary/40 hover:bg-slate-50/50 shadow-sm transition-all group relative overflow-hidden">
                    <div className="flex items-center gap-6">
                      <div className={`h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform`}>
                        <DynamicIcon name={item.icon} className="h-6 w-6" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-lg text-emerald-900">{item.title}</h4>
                        <p className="text-sm text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}

            {founderAchievement && (
              <ScrollReveal direction="up" delay={0.2 + (mainAchievements.length * 0.15)}>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/20 hover:border-primary/40 transition-all group relative overflow-hidden bg-white">
                  <div className="flex items-center gap-6">
                    <div className="h-12 w-12 rounded-full border-2 border-orange-500 p-1 group-hover:scale-110 transition-transform shrink-0">
                      <div className="h-full w-full rounded-full bg-orange-500/10 flex items-center justify-center text-orange-600 font-bold text-sm">
                        {founderAchievement.title.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-lg text-emerald-900">{founderAchievement.title}</h4>
                      <p className="text-sm text-slate-500">{founderAchievement.desc}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
