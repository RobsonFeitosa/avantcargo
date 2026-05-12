import { Badge } from "@/components/ui/badge";
import { Users, Shield, Globe, Zap, Clock, Box, Landmark, Truck, Radar, Pickaxe, Sparkles, Pill } from "lucide-react";
import { FaIndustry } from "react-icons/fa";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import * as LucideIcons from "lucide-react";
import { HelpCircle } from "lucide-react";

interface SectorsProps {
  data?: {
    headerBadge: string;
    headerTitle: string;
    headerDescription: string;
    sectors: { id: string; title: string; iconName: string }[];
  }
}

const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
  const Icon = (LucideIcons as any)[name];
  return Icon ? <Icon className={className} /> : <HelpCircle className={className} />;
};

export const Sectors = ({ data }: SectorsProps) => {
  const defaultSectors = [
    { title: "Agentes de Carga", iconName: "Users" },
    { title: "Comissárias", iconName: "Shield" },
    { title: "Cargas Aéreas", iconName: "Globe" },
    { title: "Cargas Perigosas", iconName: "Zap" },
    { title: "Cargas Urgentes", iconName: "Clock" },
    { title: "Cargas de Projeto", iconName: "Box" },
    { title: "Importadores", iconName: "Landmark" },
    { title: "Exportadores", iconName: "Truck" },
    { title: "GRU Airport", iconName: "Radar" },
    { title: "Viracopos (VCP)", iconName: "Radar" },
    { title: "Operações Complexas", iconName: "Pickaxe" },
    { title: "Logística Reversa", iconName: "Sparkles" },
    { title: "Pharma", iconName: "Pill" },
  ];

  // Garantindo que use os dados do banco se o objeto data existir
  const currentSectors = data?.sectors || defaultSectors;


  return (
    <section className="py-32 bg-emerald-50/10 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="text-center space-y-6 mb-20">
          <ScrollReveal direction="up" delay={0.1}>
            <div>
              <Badge variant="outline" className="gap-2 text-orange-600 border-orange-500/20 bg-orange-500/5 uppercase tracking-widest px-6 py-2 rounded-full font-bold">
                <FaIndustry className="h-4 w-4" />
                {data?.headerBadge || "Segmentos"}
              </Badge>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <h2 className="text-4xl md:text-6xl font-bold text-emerald-950 tracking-tight">
              {data?.headerTitle ? (
                data.headerTitle.split(" ").map((word, i) => (
                  <span key={i}>
                    {i > 0 && " "}
                    {word.toLowerCase() === "atendemos" ? <span className="text-primary">{word}</span> : word}
                  </span>
                ))
              ) : (
                <>Setores que <span className="text-primary">atendemos</span></>
              )}
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              {data?.headerDescription || "Soluções logísticas integradas e personalizadas para as demandas mais exigentes do mercado global."}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {currentSectors.map((sector: any, idx: number) => (
            <ScrollReveal key={sector.id || idx} direction="up" delay={0.1 * (idx + 1)} className="h-full">
              <div
                className="p-8 flex flex-col items-center justify-center gap-5 rounded-2xl bg-white border border-emerald-100 hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/5 transition-all group relative cursor-default h-full"
              >
                <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />

                <div className="h-7 w-7 text-primary group-hover:text-orange-500 transition-colors">
                  <DynamicIcon name={sector.iconName} />
                </div>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-center text-slate-400 group-hover:text-emerald-900 transition-colors">
                  {sector.title}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
