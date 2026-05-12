import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaBriefcase } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";


import { Box, Truck, Radar, Monitor } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

interface ServicesProps {
  data?: {
    headerBadge: string;
    headerTitle: string;
    headerDescription: string;
    services: { id: string; badge?: string; title: string; desc: string }[];
  }
}

export const Services = ({ data }: ServicesProps) => {
  const icons = [Radar, Monitor, Truck];

  const defaultServices = [
    {
      title: "Representação",
      desc: "Soluções completas de Importação e Exportação com foco em agilidade, segurança e conformidade total em GRU e VCP.",
      icon: Radar,
      featured: true,
    },
    {
      title: "Sistemas Comex",
      desc: "Suporte especializado em E-awb e lançamentos no Portal Único, reduzindo burocracia e acelerando processos digitais.",
      icon: Monitor,
    },
    {
      title: "Transporte & Logística",
      desc: "Coleta, etiquetagem, pré-cadastro e entrega nos terminais com segurança e agilidade no pré-embarque internacional.",
      icon: Truck,
    },
  ];

  const currentServices = data?.services.map((s, idx) => ({
    ...s,
    icon: icons[idx % icons.length],
    featured: s.badge ? true : false,
    badgeText: s.badge
  })) || defaultServices.map(s => ({ ...s, badgeText: s.featured ? "Mais popular" : "" }));

  return (
    <section id="servicos" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10">
        <div className="text-center space-y-4 mb-20 max-w-2xl mx-auto">
          <ScrollReveal direction="up" delay={0.1}>
            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 uppercase tracking-widest px-4 py-1 gap-2 rounded-full">
              <FaBriefcase />
              <span>{data?.headerBadge || "O que fazemos"}</span>
            </Badge>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-950">
              {data?.headerTitle ? (
                data.headerTitle.split(" ").map((word, i) => (
                  <span key={i}>
                    {i > 0 && " "}
                    {i === data.headerTitle.split(" ").length - 1 ? <span className="text-primary">{word}</span> : word}
                  </span>
                ))
              ) : (
                <>Principais <span className="text-primary">Serviços</span></>
              )}
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-slate-600 text-lg">
              {data?.headerDescription || "Oferecemos soluções completas para integrar sua empresa ao mercado internacional com eficiência e segurança."}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentServices.map((s, idx) => (
            <ScrollReveal key={idx} direction="up" delay={0.2 * (idx + 1)} className="h-full">
              <Card
                className={`p-10 border-slate-200 bg-white group hover:border-primary/50 transition-all duration-500 relative overflow-hidden flex flex-col h-full hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 ${s.featured ? "border-orange-500/30 shadow-xl shadow-orange-500/5 ring-1 ring-orange-500/5" : "shadow-sm"}`}
              >
                <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {s.featured && (
                  <div className="mb-6">
                    <Badge variant="outline" className="bg-orange-500 text-white border-none text-[10px] uppercase font-bold px-4 py-1 rounded-full tracking-widest shadow-lg">
                      {s.badgeText || "Mais popular"}
                    </Badge>
                  </div>
                )}

                <div className="h-16 w-16 rounded-[20px] bg-slate-50 border border-slate-100 flex items-center justify-center mb-10 group-hover:scale-110 transition-all duration-500">
                  <s.icon className="h-8 w-8 text-primary group-hover:text-orange-500 group-hover:-rotate-12 transition-all duration-500" />
                </div>

                <h3 className="text-2xl font-bold mb-4 text-emerald-900 group-hover:text-primary transition-colors duration-300">{s.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-10 flex-grow">
                  {s.desc}
                </p>

                <Link 
                  href={
                    s.title.toLowerCase().includes("representação") ? "/servicos/representacao" :
                    s.title.toLowerCase().includes("sistemas") ? "/servicos/sistemas-comex" :
                    "/servicos/transporte"
                  }
                  className="text-sm font-bold text-primary flex items-center gap-2 group/btn hover:translate-x-1 transition-all duration-300"
                >
                  Saiba mais <FaArrowRightLong className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
