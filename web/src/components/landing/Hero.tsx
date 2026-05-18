import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Globe, FileText, Users, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { GoDotFill } from "react-icons/go";
import { FaBuilding } from "react-icons/fa6";


import { FaCheckCircle, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

import { CountUp } from "@/components/animations/CountUp";

interface HeroProps {
  data?: {
    heroBadge: string;
    heroTitle: string;
    heroDescription: string;
    heroPrimaryButtonText: string;
    heroSecondaryButtonText: string;
    features: { id: string; text: string }[];
    servicesSectionTitle: string;
    services: { id: string; title: string; desc: string }[];
    stats: { id: string; value: string; label: string }[];
  }
}

export const Hero = ({ data }: HeroProps) => {
  const icons = [Globe, FileText, Shield, Users];

  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden min-h-screen flex items-center ">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.2),transparent_100%)] pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.7fr] gap-12 items-center">
          <div className="space-y-8">
            <ScrollReveal direction="right" delay={0.1}>
              <Badge variant="outline" className="px-4 gap-2 py-1.5 border-orange-500/30 bg-orange-500/5 text-orange-500 text-xs font-semibold tracking-wider uppercase">
                <GoDotFill />
                {data?.heroBadge || "Logística Aérea & Serviços Aduaneiros"}
              </Badge>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-emerald-950">
                {data?.heroTitle ? (
                  data.heroTitle.split("|").map((part, index) => (
                    <span key={index}>
                      {index > 0 && <span className="text-orange-500">|</span>}
                      {part.split(/(com[eé]rcio exterior)/i).map((subPart, subIndex) => (
                        <span key={subIndex} className={/com[eé]rcio exterior/i.test(subPart) ? "text-orange-500" : ""}>
                          {subPart}
                        </span>
                      ))}
                    </span>
                  ))
                ) : (
                  <>Seu parceiro <span className="text-orange-500">estratégico</span> <br /> em Aeroportos GRU | VCP</>
                )}
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.3}>
              <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                {data?.heroDescription || "Soluções ágeis para agentes de carga e comissárias. Controle a informação, controle o resultado e acelere seu desembaraço aduaneiro."}
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.4}>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-emerald-700 rounded-full text-white font-semibold px-8 h-12 shadow-xl shadow-primary/10">
                  <Link href="/contato">
                    <FaWhatsapp className="mr-1" />
                    {data?.heroPrimaryButtonText || "Falar conosco"}
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-slate-300 rounded-full hover:bg-slate-50 h-12 px-8 font-semibold text-slate-700">
                  <Link href="/quem-somos">
                    <FaBuilding />
                    {data?.heroSecondaryButtonText || "Quem somos"}
                  </Link>
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.5}>
              <div className="flex flex-wrap items-center gap-x-10 gap-y-4 pt-6">
                {(data?.features || [
                  { id: "1", text: "+20 anos de experiência" },
                  { id: "2", text: "Empresa 100% brasileira" },
                  { id: "3", text: "Guarulhos, SP" }
                ]).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3 group whitespace-nowrap">
                    <div className="">
                      <FaCheckCircle className="h-3.5 w-3.5 text-orange-500" />
                    </div>
                    <span className="text-sm font-bold text-slate-600 group-hover:text-emerald-900 transition-colors tracking-tight">{feat.text}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="left" delay={0.3}>
            <div className="relative ">
              <div className="relative p-6 md:p-8 border border-slate-200 bg-white/80 backdrop-blur-sm !rounded-3xl shadow-2xl shadow-primary/5">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 uppercase text-emerald-900">
                  {data?.servicesSectionTitle || "Nossos principais serviços"}
                </h3>

                <div className="space-y-4">
                  {(data?.services || [
                    { id: "1", title: "Assessoria Aduaneira", desc: "Expertise global em todos os portos e aeroportos." },
                    { id: "2", title: "Consultoria Tributária", desc: "Otimização de impostos e regimes especiais." },
                    { id: "3", title: "Segurança Jurídica", desc: "Conformidade total com a legislação vigente." },
                    { id: "4", title: "Equipe Dedicada", desc: "Suporte especializado em cada etapa do processo." },
                  ]).map((item, idx) => {
                    const Icon = icons[idx % icons.length];
                    return (
                      <div key={idx} className="flex border border-slate-100 bg-slate-50/50 gap-4 p-3 rounded-lg group hover:border-primary/20 hover:bg-white transition-all">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-emerald-900">{item.title}</h4>
                          <p className="text-xs text-slate-500">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-3 gap-4 pt-8 ">
                  {(data?.stats || [
                    { id: "1", value: "500+", label: "Clientes atendidos" },
                    { id: "2", value: "20+", label: "Anos de experiência" },
                    { id: "3", value: "98%", label: "Satisfação" }
                  ]).map((stat, idx) => (
                    <div key={idx} className="border border-slate-100 flex justify-center items-center py-4 rounded-lg bg-white shadow-sm">
                      <div>
                        <p className="text-2xl font-bold text-primary text-center">
                          <CountUp value={stat.value} />
                        </p>
                        <p className="text-[10px] text-slate-400 uppercase text-center">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
