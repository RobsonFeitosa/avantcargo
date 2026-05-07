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
  Clock
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

export default function About() {
  const timeline = [
    { year: "2003", text: "Fundação da AVANTCARGO em Curitiba por especialistas do setor." },
    { year: "2008", text: "Expansão para atendimento nacional com equipe especializada." },
    { year: "2015", text: "Marca de 200+ processos de Ex-Tarifário aprovados no MDIC." },
    { year: "2020", text: "R$ 300M+ em economia gerada para clientes." },
    { year: "Hoje", text: "500+ processos aprovados / R$ 480M+ economizados / 98% aprovação." },
  ];

  const values = [
    {
      icon: Shield,
      title: "Integridade",
      desc: "Atuamos sempre dentro da legalidade, garantindo que todos os processos sejam transparentes, auditáveis e em conformidade com a legislação vigente.",
    },
    {
      icon: Search,
      title: "Excelência Técnica",
      desc: "Nossa equipe se mantém constantemente atualizada com as mudanças regulatórias, garantindo as melhores estratégias para cada cliente.",
    },
    {
      icon: Handshake,
      title: "Parceria de Longo Prazo",
      desc: "Não somos apenas prestadores de serviço — somos parceiros estratégicos que crescem junto com nossos clientes ao longo do tempo.",
    },
    {
      icon: Zap,
      title: "Agilidade",
      desc: "Entendemos que tempo é dinheiro. Trabalhamos com processos rigorosos e processos eficientes para garantir respostas rápidas e resultados ágeis.",
    },
    {
      icon: Lightbulb,
      title: "Inovação",
      desc: "Buscamos continuamente novas formas de otimizar processos e encontrar oportunidades de redução tributária para nossos clientes.",
    },
    {
      icon: MessageSquare,
      title: "Comunicação Clara",
      desc: "Simplificamos a complexidade do comércio exterior, mantendo nossos clientes informados em linguagem acessível em cada etapa do processo.",
    },
  ];

  const differentials = [
    {
      num: "01",
      icon: Star,
      title: "Especialistas em Ex-Tarifário",
      desc: "Somos referência nacional no mecanismo do Ex-Tarifário, com profundo conhecimento das normas do MDIC e histórico comprovado de 98% de aprovação.",
    },
    {
      num: "02",
      icon: Users,
      title: "Equipe multidisciplinar",
      desc: "Advogados tributaristas, especialistas em comércio exterior, engenheiros e economistas trabalhando em conjunto para oferecer a melhor solução.",
    },
    {
      num: "03",
      icon: MapPin,
      title: "Presença nacional",
      desc: "Sediada em Curitiba, atendemos empresas em todo o território nacional com a mesma qualidade e dedicação, independente do porto ou setor.",
    },
    {
      num: "04",
      icon: TrendingUp,
      title: "Resultados mensuráveis",
      desc: "Trabalhamos com metas claras e relatórios detalhados, para que você saiba exatamente quanto está economizando com nossa assessoria.",
    },
    {
      num: "05",
      icon: RefreshCw,
      title: "Acompanhamento contínuo",
      desc: "Monitoramos cada processo do início ao fim, respondendo a exigências, atualizando documentações e garantindo o melhor desfecho para cada caso.",
    },
    {
      num: "06",
      icon: CheckCircle2,
      title: "Conformidade total",
      desc: "Todos os processos são 100% legais, homologados pelos órgãos competentes, protegendo sua empresa de riscos fiscais e regulatórios.",
    },
  ];

  return (
    <LandingLayout>
      <div className="bg-[hsl(184_50%_4%)] min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,72,76,0.15),transparent_70%)] pointer-events-none" />
          <div className="container relative z-10">
            <div className="space-y-6">
              <Breadcrumb className="text-white/40">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-white/60">Quem Somos</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="space-y-4 max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                  Conheça a <span className="text-orange-500 uppercase">AvantCargo</span>
                </h1>
                <p className="text-lg text-emerald-100/60 leading-relaxed">
                  Mais de 20 anos de expertise em comércio exterior, ajudando empresas brasileiras a crescer de forma inteligente e competitiva no mercado global.
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
                <Badge variant="outline" className="text-orange-500 border-orange-500/30 bg-orange-500/10 uppercase tracking-widest px-4 py-1 rounded-full text-[10px] font-bold">
                  Nossa História
                </Badge>
                <h2 className="text-4xl font-bold text-white leading-tight">
                  Duas décadas de <span className="text-orange-500">excelência</span> em Comércio Exterior
                </h2>
                <div className="space-y-6 text-emerald-100/60 leading-relaxed">
                  <p>
                    A AVANTCARGO nasceu em Curitiba, no Paraná, com uma missão clara: tornar o comércio exterior mais acessível, inteligente e rentável para as empresas brasileiras. Desde 2003, nossa assessoria vem construindo um histórico de resultados sólidos e relacionamentos de longo prazo com nossos clientes.
                  </p>
                  <p>
                    Especializamo-nos nos mecanismos mais estratégicos do comércio exterior brasileiro — em especial no <span className="text-white font-bold">Ex-Tarifário</span>, ferramenta que permite a redução de até 100% no imposto de importação para máquinas e equipamentos sem similar nacional.
                  </p>
                  <p>
                    Nossa equipe tem formação técnica multidisciplinar — direito, economia, engenharia, comércio exterior — cada um trazendo conhecimento da legislação aduaneira brasileira e das exigências dos órgãos reguladores.
                  </p>
                </div>
              </div>

              <div className="p-8 md:p-12 rounded-[40px] bg-white/[0.03] border border-white/10 relative overflow-hidden">
                <div className="space-y-10 relative z-10">
                  {timeline.map((item, idx) => (
                    <div key={idx} className="flex gap-6 group">
                      <div className="shrink-0 pt-1">
                        <span className="text-sm font-black text-white/40 group-hover:text-orange-500 transition-colors">{item.year}</span>
                      </div>
                      <p className="text-sm text-emerald-100/70 group-hover:text-white transition-colors">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-32 bg-white/[0.02] border-y border-white/5">
          <div className="container">
            <div className="text-center space-y-4 mb-20">
              <Badge variant="outline" className="text-orange-500 border-orange-500/30 bg-orange-500/10 uppercase tracking-widest px-4 py-1 rounded-full text-[10px] font-bold">
                A Equipe por Trás do Sucesso
              </Badge>
              <h2 className="text-4xl font-bold text-white">Conheça o <span className="text-blue-400">fundador</span></h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden border border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 to-transparent z-10" />
                  <div className="absolute inset-0 bg-emerald-900/20 flex items-center justify-center text-white/20 italic">
                    [Foto: Matheus Diniz]
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-8">
                <div className="p-8 rounded-[32px] border border-orange-500/30 bg-orange-500/5 space-y-6">
                  <div className="space-y-2">
                    <Badge className="bg-orange-500 text-white hover:bg-orange-500 uppercase tracking-widest text-[10px] font-bold">Fundador & CEO</Badge>
                    <h3 className="text-3xl font-bold text-white">Matheus Diniz</h3>
                    <p className="text-orange-500 font-bold">Especialista em Comércio Exterior — +20 anos de experiência</p>
                  </div>

                  <div className="space-y-4 text-emerald-100/60 leading-relaxed">
                    <p>
                      Com quase 30 anos de atuação no comércio exterior brasileiro, Matheus Diniz é referência nacional em Importação, Exportação e assessoria aduaneira. Sua trajetória é marcada pelo profundo conhecimento das normas do MDIC, Receita Federal e demais órgãos intervenientes.
                    </p>
                    <p>
                      Formado em Comércio Exterior, com especializações em Direito Aduaneiro e Tributário, construiu ao longo de duas décadas um relacionamento institucional sólido que se traduz em resultados concretos para os clientes da AVANTCARGO.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
                    <div>
                      <p className="text-2xl font-bold text-white">20+</p>
                      <p className="text-[10px] text-emerald-100/40 uppercase tracking-widest">Anos de exp.</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">3500+</p>
                      <p className="text-[10px] text-emerald-100/40 uppercase tracking-widest">Importações</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">+200M</p>
                      <p className="text-[10px] text-emerald-100/40 uppercase tracking-widest">Ex-Tarifário</p>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 px-8 font-bold gap-2">
                      <FaWhatsapp /> Fale com Matheus
                    </Button>
                    <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10 rounded-xl h-12 px-8 font-bold gap-2">
                      <MessageSquare className="h-4 w-4" /> Enviar mensagem
                    </Button>
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
              <Badge variant="outline" className="text-orange-500 border-orange-500/30 bg-orange-500/10 uppercase tracking-widest px-4 py-1 rounded-full text-[10px] font-bold">
                Nossos Valores
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                O que nos <span className="text-blue-400">guia</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((v, idx) => (
                <div key={idx} className="p-10 rounded-[32px] bg-white/[0.03] border border-white/10 hover:border-blue-400/30 transition-all group text-center space-y-6">
                  <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center mx-auto text-blue-400 group-hover:scale-110 transition-transform">
                    <v.icon className="h-7 w-7" />
                  </div>
                  <h4 className="text-xl font-bold text-white">{v.title}</h4>
                  <p className="text-emerald-100/40 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Differentials Section */}
        <section className="py-32 bg-white/[0.01]">
          <div className="container text-center space-y-20">
            <div className="space-y-6">
              <Badge variant="outline" className="text-orange-500 border-orange-500/30 bg-orange-500/10 uppercase tracking-widest px-4 py-1 rounded-full text-[10px] font-bold">
                Por que a AVANTCARGO?
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                Nossos <span className="text-blue-400">diferenciais</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {differentials.map((d, idx) => (
                <div key={idx} className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-all group text-left relative overflow-hidden">
                  <div className="flex items-start gap-6 relative z-10">
                    <div className="text-4xl font-black text-white/5 group-hover:text-blue-400/20 transition-colors">
                      {d.num}
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-orange-500">
                        <d.icon className="h-4 w-4" />
                        <h4 className="font-bold text-white">{d.title}</h4>
                      </div>
                      <p className="text-emerald-100/40 text-xs leading-relaxed">{d.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-24 border-t border-white/5">
          <div className="container">
            <div className="p-12 md:p-16 rounded-[48px] bg-gradient-to-br from-blue-900/20 to-emerald-900/10 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="space-y-4 text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                  Vamos trabalhar <span className="text-orange-500">juntos?</span>
                </h2>
                <p className="text-emerald-100/60 max-w-xl text-lg">
                  Descubra como a AVANTCARGO pode ajudar sua empresa a reduzir custos de importação e operar com mais eficiência no comércio exterior.
                </p>
              </div>
              <div className="flex flex-col gap-4 w-full md:w-auto">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold h-14 px-10 rounded-full shadow-lg shadow-orange-500/20 text-lg gap-2">
                  <FaWhatsapp /> Falar conosco
                </Button>
                <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10 h-14 px-10 rounded-full text-lg gap-2">
                  <MessageSquare className="h-4 w-4" /> Enviar mensagem
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}
