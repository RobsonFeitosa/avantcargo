"use client";

import { LandingLayout } from "@/components/layout/LandingLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useMutation } from "@tanstack/react-query";
import { careersActions } from "@/admin/actions/careers.actions";
import { toast } from "sonner";
import { useState } from "react";
import Image from "next/image";
import { Loader2, Paperclip } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export default function Careers() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });
  const [file, setFile] = useState<File | null>(null);

  const { data: configData, isLoading } = useQuery({
    queryKey: ["careers-config"],
    queryFn: () => careersActions.get(),
  });

  const config = configData?.result || {};

  const mutation = useMutation({
    mutationFn: (data: { formData: any, file: File | null }) => careersActions.submitApplication(data.formData, data.file || undefined),
    onSuccess: () => {
      toast.success("Candidatura enviada com sucesso! Em breve entraremos em contato.");
      setFormData({ name: "", phone: "", email: "", message: "" });
      setFile(null);
    },
    onError: () => {
      toast.error("Erro ao enviar candidatura. Tente novamente mais tarde.");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Por favor, preencha os campos obrigatórios (Nome, E-mail e Telefone).");
      return;
    }
    mutation.mutate({ formData, file });
  };

  if (isLoading) {
    return (
      <LandingLayout>
        <div className="flex h-screen items-center justify-center bg-white">
          <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
        </div>
      </LandingLayout>
    );
  }

  return (
    <LandingLayout>
      <div className="bg-white min-h-screen">
        <section className="pt-32 pb-16 md:pt-48 md:pb-24 relative overflow-hidden border-b-[#009485] border-b-2">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05),transparent_70%)] pointer-events-none" />
          <div className="container relative z-10 text-center max-w-4xl">
            <ScrollReveal direction="up" delay={0.1}>
              <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 tracking-tight leading-tight">
                {config.title || "Programa de Novos Talentos"}
              </h1>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 md:py-32">
          <div className="container max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8 text-slate-600 text-lg leading-relaxed">
                <ScrollReveal direction="up" delay={0.1}>
                  <h2 className="text-2xl font-bold text-emerald-950 mb-6">
                    {config.subtitle || "O nosso jeito de formar profissionais que movem o mundo."}
                  </h2>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.2}>
                  {config.description1 && <p>{config.description1}</p>}
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.3}>
                  {config.description2 && <p>{config.description2}</p>}
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.4}>
                  {config.description3 && <p>{config.description3}</p>}
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.5}>
                  {config.description4 && <p>{config.description4}</p>}
                </ScrollReveal>
              </div>

              <ScrollReveal direction="left" delay={0.3}>
                {config.image ? (
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/files/${config.image}`}
                      alt="Equipe AvantCargo"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-emerald-100 flex items-center justify-center">
                    <p className="text-emerald-800/50 font-medium">Imagem não configurada</p>
                  </div>
                )}
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-slate-50 border-t border-slate-200">
          <div className="container max-w-6xl">
            <div className="mb-16">
              <ScrollReveal direction="up" delay={0.1}>
                <h2 className="text-3xl md:text-4xl font-bold text-emerald-950 tracking-tight">
                  {config.formTitle || "Faça parte da nossa equipe!"}
                </h2>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <ScrollReveal direction="up" delay={0.2}>
                  <p className="whitespace-pre-line">
                    {config.formSubtitle || "Você é apaixonado por inovação, colaboração e busca constante por crescimento? Então o seu lugar é com a gente!\n\nNa Avant, valorizamos talentos que querem fazer a diferença e contribuir para um ambiente de trabalho dinâmico, acolhedor e cheio de oportunidades."}
                  </p>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.3}>
                  <p className="font-bold text-emerald-950 mt-8">
                    venha construir o futuro com a gente!
                  </p>
                </ScrollReveal>
              </div>

              <ScrollReveal direction="left" delay={0.4} className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-200 relative">
                <h3 className="text-xl font-bold text-emerald-950 mb-8">Candidatar-se agora</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      placeholder="Nome"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="border-0 border-b-2 border-slate-200 rounded-none px-0 py-6 h-auto focus-visible:ring-0 focus-visible:border-emerald-600 bg-transparent text-lg"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Telefone"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="border-0 border-b-2 border-slate-200 rounded-none px-0 py-6 h-auto focus-visible:ring-0 focus-visible:border-emerald-600 bg-transparent text-lg"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Email*"
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="border-0 border-b-2 border-slate-200 rounded-none px-0 py-6 h-auto focus-visible:ring-0 focus-visible:border-emerald-600 bg-transparent text-lg"
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Mensagem"
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="border-0 border-b-2 border-slate-200 rounded-none px-0 py-6 min-h-[100px] resize-none focus-visible:ring-0 focus-visible:border-emerald-600 bg-transparent text-lg"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4 pb-2 border-b-2 border-slate-200">
                    <label className="flex items-center gap-2 cursor-pointer text-emerald-700 hover:text-emerald-800 transition-colors font-medium">
                      <Paperclip className="w-5 h-5" />
                      {file ? file.name : "Anexar currículo"}
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                      />
                    </label>
                    <span className="text-xs text-slate-400">
                      {file ? "Anexos (1)" : "Anexos (0)"}
                    </span>
                  </div>

                  <div className="pt-8">
                    <Button
                      type="submit"
                      disabled={mutation.isPending}
                      className="w-full h-14 bg-[#1e4a46] hover:bg-[#153431] text-white rounded-full font-medium text-lg"
                    >
                      {mutation.isPending && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
                      Enviar candidatura
                    </Button>
                    <p className="text-[10px] text-center text-slate-400 mt-4">
                      Este site é protegido por reCAPTCHA. A Política de Privacidade e os Termos de Serviço do Google são aplicáveis.
                    </p>
                  </div>
                </form>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}
