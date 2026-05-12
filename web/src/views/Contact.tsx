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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MapPin, Phone, Mail, Clock, Send, Instagram, ChevronRight, Loader2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { motion } from "framer-motion";
import Link from "next/link";
import { useQuery, useMutation } from "@tanstack/react-query";
import { generalContactActions } from "@/admin/actions/general-contact.actions";
import { contactMessagesActions } from "@/admin/actions/contact-messages.actions";
import { toast } from "sonner";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });

  const { data: configResponse, isLoading } = useQuery({
    queryKey: ["general-contact"],
    queryFn: () => generalContactActions.get(),
  });

  const config = configResponse?.result;

  const mutation = useMutation({
    mutationFn: (data: any) => contactMessagesActions.create(data),
    onSuccess: () => {
      toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        service: "",
        message: ""
      });
    },
    onError: () => {
      toast.error("Erro ao enviar mensagem. Por favor, tente novamente mais tarde.");
    }
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    mutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleServiceChange = (value: string) => {
    setFormData(prev => ({ ...prev, service: value }));
  };

  const contacts = [
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      value: config?.whatsappNumber
        ? config.whatsappNumber.length === 11
          ? `(${config.whatsappNumber.slice(0, 2)}) ${config.whatsappNumber.slice(2, 7)}-${config.whatsappNumber.slice(7)}`
          : `(${config.whatsappNumber.slice(0, 2)}) ${config.whatsappNumber.slice(2, 6)}-${config.whatsappNumber.slice(6)}`
        : "(11) 96450-3217",
      desc: config?.whatsappSubtitle || "Resposta rápida — seg a sex, 8h-18h",
      link: `https://wa.me/55${config?.whatsappNumber?.replace(/\D/g, "") || "11964503217"}`,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      icon: Mail,
      title: "E-mail",
      value: config?.email || "comercial@avantcargo.com.br",
      desc: config?.emailSubtitle || "Resposta em até 24h úteis",
      link: `mailto:${config?.email || "comercial@avantcargo.com.br"}`,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      icon: Instagram,
      title: "Instagram",
      value: config?.instagramUser || "@avantcargo",
      desc: config?.instagramSubtitle || "Acompanhe nossas novidades",
      link: config?.instagramUrl || "https://instagram.com/avantcargo",
      color: "text-pink-500",
      bg: "bg-pink-500/10",
    },
  ];

  const faqs = config?.faqs || [
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
      q: "Quais são os principais documentos necessários?",
      a: "Os principais documentos incluem catálogo técnico detalhado, faturas proforma, e especificações que comprovem a tecnologia e a finalidade do bem a ser importado.",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <LandingLayout>
      <div className="bg-white min-h-screen">
        {/* Hero Section */}

        <section className="pt-10 pb-10 md:pt-32 md:pb-16 relative overflow-hidden border-b-[#009485] border-b-2">
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
                    <BreadcrumbPage className="text-slate-600">Contato</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="space-y-4 max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-bold text-emerald-950 tracking-tight leading-tight">
                  {config?.headerTitleDark || "Fale com a"} <span className="text-orange-500 uppercase">{config?.headerTitleHighlight || "AvantCargo"}</span>
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {config?.headerDescription || "Tire suas dúvidas, solicite uma análise gratuita de Ex-Tarifário ou entre em contato para iniciar seu processo de comércio exterior."}
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
                  className="p-8 md:p-10 rounded-[32px] bg-white border border-slate-200 relative overflow-hidden shadow-sm"
                >
                  <div className="space-y-8 relative z-10">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-emerald-950">{config?.formTitle || "Enviar mensagem"}</h3>
                      <p className="text-slate-500 text-sm">{config?.formDescription || "Preencha o formulário e nossa equipe entrará em contato em até 24 horas úteis."}</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleFormSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="h-5 text-xs font-bold text-slate-600 uppercase tracking-widest flex items-center gap-1">
                            Nome <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Seu nome completo"
                            className="h-12 bg-slate-50 border-slate-200 text-emerald-950 placeholder:text-slate-400 rounded-xl focus:border-orange-500/50 transition-all"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="h-5 text-xs font-bold text-slate-600 uppercase tracking-widest flex items-center">
                            Empresa
                          </label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Nome da empresa"
                            className="h-12 bg-slate-50 border-slate-200 text-emerald-950 placeholder:text-slate-400 rounded-xl focus:border-orange-500/50 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="h-5 text-xs font-bold text-slate-600 uppercase tracking-widest flex items-center gap-1">
                            E-mail <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="seu@email.com.br"
                            type="email"
                            className="h-12 bg-slate-50 border-slate-200 text-emerald-950 placeholder:text-slate-400 rounded-xl focus:border-orange-500/50 transition-all"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="h-5 text-xs font-bold text-slate-600 uppercase tracking-widest flex items-center gap-1">
                            Telefone <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(41) 9 9999-9999"
                            className="h-12 bg-slate-50 border-slate-200 text-emerald-950 placeholder:text-slate-400 rounded-xl focus:border-orange-500/50 transition-all"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                          Serviço de interesse
                        </label>
                        <Select value={formData.service} onValueChange={handleServiceChange}>
                          <SelectTrigger className="h-12 bg-slate-50 border-slate-200 text-emerald-950 rounded-xl focus:border-orange-500/50 transition-all">
                            <SelectValue placeholder="Selecione um serviço..." />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-slate-200 text-emerald-950">
                            <SelectItem value="representacao">Representação</SelectItem>
                            <SelectItem value="cct-importacao">CCT Importação</SelectItem>
                            <SelectItem value="e-awb">E-awb</SelectItem>
                            <SelectItem value="ce-mercante">CE Mercante</SelectItem>
                            <SelectItem value="transporte">Transporte</SelectItem>
                            <SelectItem value="suporte-imediato">Suporte Imediato</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                          Mensagem
                        </label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Descreva brevemente sua necessidade..."
                          className="min-h-[120px] bg-slate-50 border-slate-200 text-emerald-950 placeholder:text-slate-400 rounded-xl focus:border-orange-500/50 transition-all resize-none"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/20 group"
                      >
                        {mutation.isPending ? (
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        ) : (
                          <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        )}
                        {mutation.isPending ? "Enviando..." : "Enviar mensagem"}
                      </Button>

                      <div className="text-center">
                        <p className="text-[10px] text-slate-400 flex items-center justify-center gap-2">
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
                  <h3 className="text-2xl font-bold text-emerald-950">Nossos contatos</h3>
                  <div className="space-y-4">
                    {contacts.map((contact, idx) => (
                      <motion.a
                        key={idx}
                        href={contact.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-primary/20 hover:bg-white hover:shadow-md transition-all group flex items-center gap-6 cursor-pointer"
                      >
                        <div className={`h-12 w-12 rounded-xl ${contact.bg} flex items-center justify-center ${contact.color} shrink-0`}>
                          <contact.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">{contact.title}</h4>
                            <ChevronRight className="h-4 w-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                          </div>
                          <p className="text-lg font-bold text-emerald-900">{contact.value}</p>
                          <p className="text-xs text-slate-500">{contact.desc}</p>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-emerald-950 flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-orange-500" />
                    Nosso endereço
                  </h3>
                  <div className="p-8 rounded-[32px] bg-slate-50 border border-slate-200 space-y-6">
                    <div className="space-y-2">
                      <p className="text-emerald-900 font-medium whitespace-pre-line">{config?.address || "R. Tupi Paulista, 71 - Cidade Industrial Satélite\nGuarulhos, SP — CEP 07222-070"}</p>
                      <p className="text-[10px] text-slate-300 font-mono mt-4">{config?.addressCnpj || "CNPJ: 22.837.582/0001-05"}</p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full h-12 bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-emerald-500/30 hover:text-emerald-700 rounded-xl gap-2 font-bold shadow-sm transition-all">
                          <MapPin className="h-4 w-4 text-primary" /> Ver no mapa
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden border-none rounded-2xl">
                        <DialogHeader className="p-6 pb-2 bg-white">
                          <DialogTitle className="text-emerald-950 font-bold flex items-center gap-2 text-xl">
                            <MapPin className="h-6 w-6 text-orange-500" />
                            Nossa Localização
                          </DialogTitle>
                        </DialogHeader>
                        <div className="w-full h-[450px] bg-slate-100">
                          <iframe
                            src={config?.addressMapsUrl || "https://www.google.com/maps?q=R.+Tupi+Paulista,+71+-+Cidade+Industrial+Satélite+de+São+Paulo,+Guarulhos+-+SP,+07222-070,+Brasil&output=embed"}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          ></iframe>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-8 rounded-[32px] bg-slate-50 border border-slate-200 space-y-6">
                    <div className="flex items-center gap-2 text-slate-400 mb-4">
                      <Clock className="h-4 w-4" />
                      <h4 className="text-xs font-bold uppercase tracking-widest">Horário de atendimento</h4>
                    </div>
                    <div className="space-y-3">
                      {[
                        { day: "Segunda — Sexta", hour: config?.hoursMonFri || "8h às 18h" },
                        { day: "Sábado", hour: config?.hoursSat || "Fechado", inactive: (config?.hoursSat === "Fechado" || !config?.hoursSat) },
                        { day: "Domingo", hour: config?.hoursSun || "Fechado", inactive: (config?.hoursSun === "Fechado" || !config?.hoursSun) },
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                          <span className="text-slate-600">{item.day}</span>
                          <span className={item.inactive ? "text-red-500/60" : "text-primary font-bold"}>{item.hour}</span>
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
        <section className="py-32 border-t border-slate-100">
          <div className="container">
            <div className="text-center space-y-4 mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-emerald-950 tracking-tight">
                {config?.faqTitle?.split(" ")[0] || "Perguntas"} <span className="text-primary">{config?.faqTitle?.split(" ").slice(1).join(" ") || "frequentes"}</span>
              </h2>
              {config?.faqBadge && (
                <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                  {config.faqBadge}
                </p>
              )}
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`item-${idx}`}
                    className="border border-slate-200 bg-slate-50/50 rounded-2xl px-6 overflow-hidden"
                  >
                    <AccordionTrigger className="text-emerald-900 hover:text-orange-600 text-left py-6 font-bold hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 pb-6 leading-relaxed">
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
