"use client";

import { LandingLayout } from "@/components/layout/LandingLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Users,
  Award,
  Handshake,
  Zap,
  Lightbulb,
  MessageSquare,
  Search,
  MapPin,
  TrendingUp,
  RefreshCw,
  CheckCircle2,
  Star,
  Clock,
  Loader2
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { aboutUsActions } from "@/admin/actions/about-us.actions";

const iconMap: Record<string, any> = {
  Shield,
  Users,
  Award,
  Handshake,
  Zap,
  Lightbulb,
  MessageSquare,
  Search,
  MapPin,
  TrendingUp,
  RefreshCw,
  CheckCircle2,
  Star,
  Clock
};

export default function About() {
  const { data: configData, isLoading } = useQuery({
    queryKey: ["about-us-public"],
    queryFn: () => aboutUsActions.get(),
  });

  const config = configData?.result;

  const timeline = config?.historyTimeline || [
    { year: "2003", text: "Fundação da AVANTCARGO em Curitiba por especialistas do setor." },
    { year: "2008", text: "Expansão para atendimento nacional com equipe especializada." },
    { year: "2015", text: "Marca de 200+ processos de Ex-Tarifário aprovados no MDIC." },
    { year: "2020", text: "R$ 300M+ em economia gerada para clientes." },
    { year: "Hoje", text: "500+ processos aprovados / R$ 480M+ economizados / 98% aprovação." },
  ];

  const values = (config?.valuesList || [
    {
      icon: "Shield",
      title: "Integridade",
      desc: "Atuamos sempre dentro da legalidade, garantindo que todos os processos sejam transparentes, auditáveis e em conformidade com a legislação vigente.",
    },
    {
      icon: "Search",
      title: "Excelência Técnica",
      desc: "Nossa equipe se mantém constantemente atualizada com as mudanças regulatórias, garantindo as melhores estratégias para cada cliente.",
    },
    {
      icon: "Handshake",
      title: "Parceria de Longo Prazo",
      desc: "Não somos apenas prestadores de serviço — somos parceiros estratégicos que crescem junto com nossos clientes ao longo do tempo.",
    },
    {
      icon: "Zap",
      title: "Agilidade",
      desc: "Entendemos que tempo é dinheiro. Trabalhamos com processos rigorosos e processos eficientes para garantir respostas rápidas e resultados ágeis.",
    },
    {
      icon: "Lightbulb",
      title: "Inovação",
      desc: "Buscamos continuamente novas formas de otimizar processos e encontrar oportunidades de redução tributária para nossos clientes.",
    },
    {
      icon: "MessageSquare",
      title: "Comunicação Clara",
      desc: "Simplificamos a complexidade do comércio exterior, mantendo nossos clientes informados em linguagem acessível em cada etapa do processo.",
    },
  ]).map((v: any) => ({
    ...v,
    icon: iconMap[v.icon] || Shield
  }));

  const differentials = (config?.differentialsList || [
    {
      num: "01",
      icon: "Star",
      title: "Especialistas em Ex-Tarifário",
      desc: "Somos referência nacional no mecanismo do Ex-Tarifário, com profundo conhecimento das normas do MDIC e histórico comprovado de 98% de aprovação.",
    },
    {
      num: "02",
      icon: "Users",
      title: "Equipe multidisciplinar",
      desc: "Advogados tributaristas, especialistas em comércio exterior, engenheiros e economistas trabalhando em conjunto para oferecer a melhor solução.",
    },
    {
      num: "03",
      icon: "MapPin",
      title: "Presença nacional",
      desc: "Sediada em Curitiba, atendemos empresas em todo o território nacional com a mesma qualidade e dedicação, independente do porto ou setor.",
    },
    {
      num: "04",
      icon: "TrendingUp",
      title: "Resultados mensuráveis",
      desc: "Trabalhamos com metas claras e relatórios detalhados, para que você saiba exatamente quanto está economizando com nossa assessoria.",
    },
    {
      num: "05",
      icon: "RefreshCw",
      title: "Acompanhamento contínuo",
      desc: "Monitoramos cada processo do início ao fim, respondendo a exigências, atualizando documentações e garantindo o melhor desfecho para cada caso.",
    },
    {
      num: "06",
      icon: "CheckCircle2",
      title: "Conformidade total",
      desc: "Todos os processos são 100% legais, homologados pelos órgãos competentes, protegendo sua empresa de riscos fiscais e regulatórios.",
    },
  ]).map((d: any, idx: number) => ({
    ...d,
    num: (idx + 1).toString().padStart(2, '0'),
    icon: iconMap[d.icon] || Star
  }));

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <LandingLayout>
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-24 relative overflow-hidden bg-slate-50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,72,76,0.05),transparent_70%)] pointer-events-none" />
          <div className="container relative z-10">
            <div className="space-y-6">
              <Breadcrumb className="text-slate-400">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-slate-600">Quem Somos</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="space-y-4 max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-bold text-emerald-950 tracking-tight leading-tight">
                  {config?.historyHeroTitleDark || "Conheça a"} <span className="text-orange-500 uppercase">{config?.historyHeroTitleOrange || "AvantCargo"}</span>
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {config?.historyHeroDescription || "Mais de 20 anos de expertise em comércio exterior, ajudando empresas brasileiras a crescer de forma inteligente e competitiva no mercado global."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* History & Timeline */}
        <section className="pb-32 pt-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <Badge variant="outline" className="text-orange-600 border-orange-500/20 bg-orange-500/5 uppercase tracking-widest px-4 py-1 rounded-full text-[10px] font-bold">
                  Nossa História
                </Badge>
                <h2 className="text-4xl font-bold text-emerald-950 leading-tight">
                  {config?.historyTitle || "Duas décadas de excelência em Comércio Exterior"}
                </h2>
                <div className="space-y-6 text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {config?.historyText || `A AVANTCARGO nasceu em Curitiba, no Paraná, com uma missão clara: tornar o comércio exterior mais acessível, inteligente e rentável para as empresas brasileiras. Desde 2003, nossa assessoria vem construindo um histórico de resultados sólidos e relacionamentos de longo prazo com nossos clientes.

Especializamo-nos nos mecanismos mais estratégicos do comércio exterior brasileiro — em especial no Ex-Tarifário, ferramenta que permite a redução de até 100% no imposto de importação para máquinas e equipamentos sem similar nacional.

Nossa equipe tem formação técnica multidisciplinar — direito, economia, engenharia, comércio exterior — cada um trazendo conhecimento da legislação aduaneira brasileira e das exigências dos órgãos reguladores.`}
                </div>
              </div>

              <div className="p-8 md:p-12 rounded-[40px] bg-slate-50 border border-slate-200 relative overflow-hidden">
                <div className="space-y-10 relative z-10">
                  {timeline.map((item: any, idx: number) => (
                    <div key={idx} className="flex gap-6 group">
                      <div className="shrink-0 pt-1">
                        <span className="text-sm font-black text-slate-400 group-hover:text-orange-500 transition-colors">{item.year}</span>
                      </div>
                      <p className="text-sm text-slate-600 group-hover:text-emerald-950 transition-colors">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founders Section */}
        <section className="py-32 bg-slate-50/50 border-y border-slate-100">
          <div className="container">
            <div className="text-center space-y-4 mb-20">
              <Badge variant="outline" className="text-orange-600 border-orange-500/20 bg-orange-500/5 uppercase tracking-widest px-4 py-1 rounded-full text-[10px] font-bold">
                {config?.foundersBadge || "A Equipe por Trás do Sucesso"}
              </Badge>
              <h2 className="text-4xl font-bold text-emerald-950">{config?.foundersTitle || "Conheça os"} <span className="text-primary">{config?.foundersTitleHighlight || "fundadores"}</span></h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Founder 1 */}
              <div className="space-y-8 flex flex-col">
                <div className="relative aspect-video lg:aspect-[4/3] rounded-[40px] overflow-hidden border border-slate-200 bg-white">
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 to-transparent z-10" />
                  {config?.founder1Image ? (
                    <Image 
                      src={config.founder1Image} 
                      alt={config.founder1Name || "Matheus Diniz"} 
                      fill 
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-slate-100 flex items-center justify-center text-slate-300 italic">
                      [Foto: {config?.founder1Name || "Matheus Diniz"}]
                    </div>
                  )}
                </div>

                <div className="p-8 md:p-10 rounded-[32px] border border-orange-500/20 bg-white space-y-6 shadow-sm flex-1 flex flex-col">
                  <div className="space-y-2">
                    <Badge className="bg-orange-500 text-white hover:bg-orange-500 uppercase tracking-widest text-[10px] font-bold">{config?.founder1Cargo || "Fundador & CEO"}</Badge>
                    <h3 className="text-3xl font-bold text-emerald-950">{config?.founder1Name || "Matheus Diniz"}</h3>
                    <p className="text-orange-600 font-bold">{config?.founder1Subtitle || "Especialista em Comércio Exterior — +20 anos de experiência"}</p>
                  </div>

                  <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base flex-1">
                    <p>
                      {config?.founder1Bio || "Com quase 30 anos de atuação no comércio exterior brasileiro, Matheus Diniz é referência nacional em Importação, Exportação e assessoria aduaneira. Sua trajetória é marcada pelo profundo conhecimento das normas do MDIC e Receita Federal."}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-auto">
                    {config?.founder1ButtonLink && (
                      <Button 
                        asChild
                        className="bg-primary hover:bg-emerald-700 text-white rounded-xl h-12 px-6 font-bold gap-2 w-full sm:w-auto"
                      >
                        <Link 
                          href={`https://wa.me/55${config.founder1ButtonLink.replace(/\D/g, "")}`} 
                          target="_blank"
                        >
                          <FaWhatsapp /> {config?.founder1ButtonText || "Fale com Matheus"}
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Founder 2 */}
              <div className="space-y-8 flex flex-col">
                <div className="relative aspect-video lg:aspect-[4/3] rounded-[40px] overflow-hidden border border-slate-200 bg-white">
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 to-transparent z-10" />
                  {config?.founder2Image ? (
                    <Image 
                      src={config.founder2Image} 
                      alt={config.founder2Name || "Nome do Sócio"} 
                      fill 
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-slate-100 flex items-center justify-center text-slate-300 italic">
                      [Foto: {config?.founder2Name || "Nome do Sócio"}]
                    </div>
                  )}
                </div>

                <div className="p-8 md:p-10 rounded-[32px] border border-emerald-500/20 bg-white space-y-6 shadow-sm flex-1 flex flex-col">
                  <div className="space-y-2">
                    <Badge className="bg-emerald-600 text-white hover:bg-emerald-600 uppercase tracking-widest text-[10px] font-bold">{config?.founder2Cargo || "Sócio / Fundador"}</Badge>
                    <h3 className="text-3xl font-bold text-emerald-950">{config?.founder2Name || "Nome do Sócio"}</h3>
                    <p className="text-emerald-600 font-bold">{config?.founder2Subtitle || "Especialista Operacional — +15 anos de experiência"}</p>
                  </div>

                  <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base flex-1">
                    <p>
                      {config?.founder2Bio || "Com ampla experiência na gestão operacional aduaneira e logística internacional, coordena todas as etapas do processo garantindo segurança, compliance e agilidade de ponta a ponta para os clientes."}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-auto">
                    {config?.founder2ButtonLink && (
                      <Button 
                        asChild
                        className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-12 px-6 font-bold gap-2 w-full sm:w-auto"
                      >
                        <Link 
                          href={`https://wa.me/55${config.founder2ButtonLink.replace(/\D/g, "")}`} 
                          target="_blank"
                        >
                          <FaWhatsapp /> {config?.founder2ButtonText || "Falar com o Sócio"}
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-32">
          <div className="container text-center space-y-20">
            <div className="space-y-6">
              <Badge variant="outline" className="text-orange-600 border-orange-500/20 bg-orange-500/5 uppercase tracking-widest px-4 py-1 rounded-full text-[10px] font-bold">
                {config?.valuesBadge || "Nossos Valores"}
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-emerald-950 tracking-tight">
                {config?.valuesTitle1 || "O que nos"} <span className="text-primary">{config?.valuesTitleHighlight || "guia"}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((v: any, idx: number) => (
                <div key={idx} className="p-10 rounded-[32px] bg-white border border-slate-200 hover:border-primary/30 shadow-sm hover:shadow-md transition-all group text-center space-y-6">
                  <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto text-primary group-hover:scale-110 transition-transform">
                    <v.icon className="h-7 w-7" />
                  </div>
                  <h4 className="text-xl font-bold text-emerald-900">{v.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Differentials Section */}
        <section className="py-32 bg-slate-50/50">
          <div className="container text-center space-y-20">
            <div className="space-y-6">
              <Badge variant="outline" className="text-orange-600 border-orange-500/20 bg-orange-500/5 uppercase tracking-widest px-4 py-1 rounded-full text-[10px] font-bold">
                {config?.differentialsBadge || "Por que a AVANTCARGO?"}
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-emerald-950 tracking-tight">
                {config?.differentialsTitle1 || "Nossos"} <span className="text-primary">{config?.differentialsTitleHighlight || "diferenciais"}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {differentials.map((d: any, idx: number) => (
                <div key={idx} className="p-8 rounded-3xl bg-white border border-slate-200 hover:bg-slate-50 transition-all group text-left relative overflow-hidden shadow-sm">
                  <div className="flex items-start gap-6 relative z-10">
                    <div className="text-4xl font-black text-slate-100 group-hover:text-primary/10 transition-colors">
                      {d.num}
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-orange-600">
                        <d.icon className="h-4 w-4" />
                        <h4 className="font-bold text-emerald-900">{d.title}</h4>
                      </div>
                      <p className="text-slate-500 text-xs leading-relaxed">{d.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-24 border-t border-slate-100">
          <div className="container">
            <div className="p-12 md:p-16 rounded-[48px] bg-gradient-to-br from-primary/5 to-orange-500/5 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="space-y-4 text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-bold text-emerald-950 tracking-tight leading-tight">
                  {config?.ctaTitleDark || "Vamos trabalhar"} <span className="text-orange-500">{config?.ctaTitleHighlight || "juntos?"}</span>
                </h2>
                <p className="text-slate-600 max-w-xl text-lg">
                  {config?.ctaDescription || "Descubra como a AVANTCARGO pode ajudar sua empresa a reduzir custos de importação e operar com mais eficiência no comércio exterior."}
                </p>
              </div>
              <div className="flex flex-col gap-4 w-full md:w-auto">
                {config?.ctaPrimaryButtonLink && (
                  <Button 
                    asChild
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold h-14 px-10 rounded-full shadow-lg shadow-orange-500/20 text-lg gap-2"
                  >
                    <Link 
                      href={`https://wa.me/55${config.ctaPrimaryButtonLink.replace(/\D/g, "")}`} 
                      target="_blank"
                    >
                      <FaWhatsapp /> {config?.ctaPrimaryButtonText || "Falar conosco"}
                    </Link>
                  </Button>
                )}
                {config?.ctaSecondaryButtonLink && (
                  <Button 
                    asChild
                    variant="outline" 
                    className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50 h-14 px-10 rounded-full text-lg gap-2"
                  >
                    <Link href={config?.ctaSecondaryButtonLink || "/contato"}>
                      <MessageSquare className="h-4 w-4 text-primary" /> {config?.ctaSecondaryButtonText || "Enviar mensagem"}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}
