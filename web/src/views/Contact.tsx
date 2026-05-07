"use client";

import { LandingLayout } from "@/components/layout/LandingLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MapPin, Phone, Mail, Clock, Send, Instagram, ChevronRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Contact() {
  const contacts = [
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      value: "(41) 9617-2722",
      desc: "Resposta rápida — seg a sex, 8h-18h",
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      icon: Phone,
      title: "Telefone Fixo",
      value: "(11) 96450-3217",
      desc: "Seg a sex, 8h-18h",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: Mail,
      title: "E-mail",
      value: "comercia@avantcargo.com.br",
      desc: "Resposta em até 24h úteis",
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      icon: Instagram,
      title: "Instagram",
      value: "@avantcargo",
      desc: "Acompanhe nossas novidades",
      color: "text-pink-500",
      bg: "bg-pink-500/10",
    },
  ];

  const faqs = [
    {
      q: "O que é o Ex-Tarifário e como funciona?",
      a: "O Ex-Tarifário é um regime que permite a redução temporária da alíquota do Imposto de Importação de bens de capital (BK) e de informática e telecomunicação (BIT), quando não houver produção nacional equivalente.",
    },
    {
      q: "Qual o prazo para aprovação de um Ex-Tarifário?",
      a: "O prazo médio pode variar entre 60 a 120 dias, dependendo da complexidade do pleito e da agilidade dos órgãos anuentes na análise da inexistência de produção nacional.",
    },
    {
      q: "A consulta inicial é gratuita?",
      a: "Sim, realizamos uma análise preliminar sem custos para identificar a viabilidade do seu pleito e as potenciais economias para sua operação.",
    },
    {
      q: "A AVANTCARGO atende empresas fora de Curitiba?",
      a: "Sim, atendemos empresas em todo o território nacional, com expertise em todos os principais portos, aeroportos e pontos de fronteira do Brasil.",
    },
    {
      q: "Quais documentos são necessários para o Ex-Tarifário?",
      a: "Os principais documentos incluem catálogo técnico detalhado, faturas proforma, e especificações que comprovem a tecnologia e a finalidade do bem a ser importado.",
    },
  ];

  return (
    <LandingLayout>
      <div className="bg-[hsl(184_50%_4%)] min-h-screen">
        {/* Hero Section */}
        <section className="pt-10 pb-10 md:pt-32 md:pb-16 relative overflow-hidden">
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
                    <BreadcrumbPage className="text-white/60">Contato</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="space-y-4 max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                  Fale com a <span className="text-orange-500 uppercase">AvantCargo</span>
                </h1>
                <p className="text-lg text-emerald-100/60 leading-relaxed">
                  Tire suas dúvidas, solicite uma análise gratuita de Ex-Tarifário ou entre em contato para iniciar seu processo de comércio exterior.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Contact Section */}
        <section className="pb-32 pt-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Form Column */}
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-8 md:p-10 rounded-[32px] bg-white/[0.03] border border-white/10 relative overflow-hidden"
                >
                  <div className="space-y-8 relative z-10">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white">Enviar mensagem</h3>
                      <p className="text-emerald-100/40 text-sm">Preencha o formulário e nossa equipe entrará em contato em até 24 horas úteis.</p>
                    </div>

                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-emerald-100/60 uppercase tracking-widest flex items-center gap-1">
                            Nome <span className="text-red-500">*</span>
                          </label>
                          <Input
                            placeholder="Seu nome completo"
                            className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/20 rounded-xl focus:border-orange-500/50 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-emerald-100/60 uppercase tracking-widest">
                            Empresa
                          </label>
                          <Input
                            placeholder="Nome da empresa"
                            className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/20 rounded-xl focus:border-orange-500/50 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-emerald-100/60 uppercase tracking-widest flex items-center gap-1">
                            E-mail <span className="text-red-500">*</span>
                          </label>
                          <Input
                            placeholder="seu@email.com.br"
                            type="email"
                            className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/20 rounded-xl focus:border-orange-500/50 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-emerald-100/60 uppercase tracking-widest flex items-center gap-1">
                            Telefone <span className="text-red-500">*</span>
                          </label>
                          <Input
                            placeholder="(41) 9 9999-9999"
                            className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/20 rounded-xl focus:border-orange-500/50 transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-emerald-100/60 uppercase tracking-widest">
                          Serviço de interesse
                        </label>
                        <Select>
                          <SelectTrigger className="h-12 bg-white/5 border-white/10 text-white rounded-xl focus:border-orange-500/50 transition-all">
                            <SelectValue placeholder="Selecione um serviço..." />
                          </SelectTrigger>
                          <SelectContent className="bg-emerald-950 border-white/10 text-white">
                            <SelectItem value="ex">Ex-Tarifário</SelectItem>
                            <SelectItem value="import">Importação / Exportação</SelectItem>
                            <SelectItem value="radar">Habilitação Radar</SelectItem>
                            <SelectItem value="consult">Consultoria Técnica</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-emerald-100/60 uppercase tracking-widest">
                          Mensagem
                        </label>
                        <Textarea
                          placeholder="Descreva brevemente sua necessidade..."
                          className="min-h-[120px] bg-white/5 border-white/10 text-white placeholder:text-white/20 rounded-xl focus:border-orange-500/50 transition-all resize-none"
                        />
                      </div>

                      <Button className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/20 group">
                        <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        Enviar mensagem
                      </Button>

                      <div className="text-center">
                        <p className="text-[10px] text-emerald-100/20 flex items-center justify-center gap-2">
                          <Clock className="h-3 w-3" />
                          Seus dados estão protegidos e não serão compartilhados.
                        </p>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </div>

              {/* Contacts Column */}
              <div className="lg:col-span-5 space-y-10">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">Nossos contatos</h3>
                  <div className="space-y-4">
                    {contacts.map((contact, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group flex items-center gap-6"
                      >
                        <div className={`h-12 w-12 rounded-xl ${contact.bg} flex items-center justify-center ${contact.color} shrink-0`}>
                          <contact.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-black text-white/40 uppercase tracking-widest">{contact.title}</h4>
                            <ChevronRight className="h-4 w-4 text-white/20 group-hover:translate-x-1 transition-transform" />
                          </div>
                          <p className="text-lg font-bold text-white">{contact.value}</p>
                          <p className="text-xs text-emerald-100/30">{contact.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-orange-500" />
                    Nosso endereço
                  </h3>
                  <div className="p-8 rounded-[32px] bg-white/[0.03] border border-white/10 space-y-6">
                    <div className="space-y-2">
                      <p className="text-white font-medium">Av. República Argentina, 1237 — Sala 415</p>
                      <p className="text-emerald-100/40">Guarulhos, SP — CEP 80620-010</p>
                      <p className="text-[10px] text-emerald-100/20 font-mono mt-4">CNPJ 22.837.692/0001-05</p>
                    </div>
                    <Button variant="outline" className="w-full h-12 bg-transparent border-white/10 text-white hover:bg-white/10 rounded-xl gap-2 font-bold">
                      <MapPin className="h-4 w-4" /> Ver no mapa
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-8 rounded-[32px] bg-white/[0.03] border border-white/10 space-y-6">
                    <div className="flex items-center gap-2 text-white/40 mb-4">
                      <Clock className="h-4 w-4" />
                      <h4 className="text-xs font-bold uppercase tracking-widest">Horário de atendimento</h4>
                    </div>
                    <div className="space-y-3">
                      {[
                        { day: "Segunda — Sexta", hour: "8h às 18h" },
                        { day: "Sábado", hour: "Fechado", inactive: true },
                        { day: "Domingo", hour: "Fechado", inactive: true },
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                          <span className="text-white/60">{item.day}</span>
                          <span className={item.inactive ? "text-red-500/60" : "text-blue-500 font-bold"}>{item.hour}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-32 border-t border-white/5">
          <div className="container">
            <div className="text-center space-y-6 mb-20">
              <Badge variant="outline" className="text-orange-500 border-orange-500/30 bg-orange-500/10 uppercase tracking-widest px-4 py-1 rounded-full text-[10px] font-bold">
                FAQ
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                Perguntas <span className="text-blue-400">frequentes</span>
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`item-${idx}`}
                    className="border border-white/10 bg-white/[0.02] rounded-2xl px-6 overflow-hidden"
                  >
                    <AccordionTrigger className="text-white hover:text-orange-500 text-left py-6 font-bold hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-emerald-100/60 pb-6 leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}
