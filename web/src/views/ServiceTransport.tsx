"use client";

import { LandingLayout } from "@/components/layout/LandingLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck, CheckCircle2, MapPin, Zap, ShieldCheck, ClipboardCheck, Mail, Award } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Image from "next/image";
import exempl1transport from "@/assets/exempl1transport.jpg";
import { FaWhatsapp } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { transportActions } from "@/admin/actions/transport.actions";
import * as LucideIcons from "lucide-react";

const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
  const Icon = (LucideIcons as any)[name];
  return Icon ? <Icon className={className} /> : <Award className={className} />;
};


export default function ServiceTransport() {
  const features = [
    "Transporte rodoviário especializado em Importações e Exportações Aéreas.",
    "Veículo dedicado à sua operação.",
    "Transportes urgentes, veículos despachados imediatamente.",
    "Preparação de cargas para Exportação.",
    "Repesagem e Fotografias.",
    "Follow-up Automatizados.",
    "Pré-cadastro e agendamentos nos aeroportos.",
    "Etiquetagem.",
    "Distribuição das Importações.",
    "Armazenagem.",
    "Reposição de gelo.",
    "Check-list completo de cargas especiais."
  ];

  const { data: configData } = useQuery({
    queryKey: ["transport-config"],
    queryFn: () => transportActions.get(),
  });

  const config = configData?.result || {};



  const currentDifferentials: any[] = config ? config?.differentials : [];

  return (
    <LandingLayout>
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden relative border-b-[#009485] border-b-2">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.05),transparent_70%)] pointer-events-none" />
          <div className="container relative z-10 text-center">
            <ScrollReveal>
              <Badge variant="outline" className="px-4 py-1.5 border-primary/30 bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
                {config.headerBadge || "Logística Nacional e Internacional"}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-emerald-950 mb-6">
                {config.headerTitleDark || "Transporte"} <span className="text-primary">{config.headerTitleHighlight || "Rodoviário"}</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                {config.headerDescription || "transporte nacional, cargas urgentes, transporte importação, transporte exportação. Soluções exclusivas para Agentes de Carga."}
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-10">
                <Button
                  asChild
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 h-14 rounded-full shadow-lg shadow-orange-500/20 transition-all hover:scale-105 text-lg cursor-pointer"
                >
                  <a href={config.heroWhatsappNumber ? `https://wa.me/55${config.heroWhatsappNumber.replace(/\\D/g, '')}` : "https://wa.me/5511964503217"} target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp className="w-5 h-5 mr-2" />
                    {config.heroWhatsappText || "Falar com especialista"}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-emerald-900 text-emerald-900 hover:bg-emerald-50 font-bold px-8 h-14 rounded-full transition-all text-lg cursor-pointer"
                >
                  <a href={config.heroMessageLink || "/contato"}>
                    <Mail className="w-5 h-5 mr-2" />
                    {config.heroMessageText || "Enviar mensagem"}
                  </a>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-24">
          <div className="container">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 w-full">
                <ScrollReveal direction="left">
                  <div className="relative aspect-video lg:aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl group">
                    {config.highlightImage && (
                      <Image
                        src={config.highlightImage ? `${process.env.NEXT_PUBLIC_API_URL}/files/${config.highlightImage}` : ""}
                        alt="Transporte Rodoviário AvantCargo"
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                        priority
                        width={1000}
                        height={1000}
                      />
                    )}
                    <div className="absolute inset-0 bg-emerald-950/10" />
                  </div>
                </ScrollReveal>
              </div>
              <div className="flex-1 space-y-8">
                <ScrollReveal direction="right">
                  <h2 className="text-3xl md:text-4xl font-bold text-emerald-950">{config.highlightTitle || "Estratégia e Crescimento para seu Negócio"}</h2>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    {config.highlightText1 || "Entendendo a necessidade de nossos clientes, implantamos constantemente serviços estrategicamente desenvolvidos para auxiliar no crescimento da sua empresa através da Avant."}
                  </p>
                  <p className="text-slate-600 text-lg leading-relaxed italic border-l-4 border-primary pl-6">
                    {config.highlightQuote || ""}
                  </p>
                  <p className="text-slate-500 font-medium">
                    {config.highlightText2 || "Serviços exclusivos aos Agentes de Cargas e Comissarias de Despacho Aduaneiro."}
                  </p>
                  <div className="pt-4">
                    <a
                      href={config.buttonLink ? `https://wa.me/55${config.buttonLink.replace(/\D/g, '')}` : "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-primary/20 text-lg"
                    >
                      <FaWhatsapp className="w-5 h-5" />
                      {config.buttonText || "Saiba Mais"}
                    </a>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-slate-50">
          <div className="container">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-950">{config.diffsSectionTitle || "Diferenciais"} <span className="text-primary">{config.diffsSectionHighlight || "Logísticos"}</span></h2>
              <p className="text-slate-600 max-w-2xl mx-auto">{config.diffsSectionDescription || ""}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {config && currentDifferentials?.map((feature, idx) => (
                <ScrollReveal key={idx} delay={idx * 0.05}>
                  <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-primary/30 hover:shadow-md transition-all flex items-start gap-4 group h-full">
                    <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all mt-1">
                      {/* Garanta que o nome do ícone existe, ou passe uma string fixa para teste */}
                      <DynamicIcon name={feature.icon || "Award"} className="h-5 w-5" />
                    </div>
                    {/* Aqui você precisa acessar a propriedade de texto, ex: feature.title ou feature.text */}
                    <span className="font-semibold text-slate-700 group-hover:text-emerald-950 transition-colors leading-snug">
                      {feature.title || feature.text || "Diferencial sem texto"}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
        {/* Footer CTA */}
        <section className="py-24 border-t border-slate-100">
          <div className="container">
            <div className="p-12 md:p-16 rounded-[48px] bg-gradient-to-br from-primary/5 to-orange-500/5 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-emerald-950 tracking-tight leading-tight">
                  {config.footerCtaTitleDark || "Sua carga em"} <span className="text-orange-500">{config.footerCtaTitleHighlight || "boas mãos?"}</span>
                </h2>
                <p className="text-slate-600 max-w-xl text-lg whitespace-pre-wrap">
                  {config.footerCtaDescription || "Otimize seu transporte rodoviário com uma frota dedicada e agilidade total no pré-embarque internacional."}
                </p>
              </div>
              <div className="flex flex-col gap-4 w-full md:w-auto">
                <Button
                  asChild
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold h-14 px-10 rounded-full shadow-lg shadow-orange-500/20 text-lg gap-2"
                >
                  <a href={config.footerWhatsappNumber ? `https://wa.me/55${config.footerWhatsappNumber.replace(/\\D/g, '')}` : "https://wa.me/5511964503217"} target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp className="w-5 h-5" /> {config.footerWhatsappText || "Falar conosco"}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50 h-14 px-10 rounded-full text-lg gap-2"
                >
                  <a href={config.footerMessageLink || "/contato"}>
                    <Mail className="h-4 w-4 text-primary" /> {config.footerMessageText || "Enviar mensagem"}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}
