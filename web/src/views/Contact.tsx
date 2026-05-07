"use client";

import { LandingLayout } from "@/components/layout/LandingLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, MessageSquare, Send } from "lucide-react";

export default function Contact() {
  return (
    <LandingLayout>
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(14,72,76,0.1),transparent_70%)] pointer-events-none" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
            <Badge variant="outline" className="px-4 py-1.5 border-primary/30 bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase">
              Contato
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Vamos conversar sobre o <br /> seu <span className="text-primary">projeto?</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nossa equipe técnica está pronta para tirar suas dúvidas e oferecer a melhor assessoria para sua empresa.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Informações de <span className="text-primary">Contato</span></h3>
                <p className="text-muted-foreground">Escolha o canal de sua preferência e entraremos em contato o mais breve possível.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { icon: Phone, title: "Telefone", content: "+55 (11) 4003-1234" },
                  { icon: Mail, title: "E-mail", content: "contato@avantcargo.com.br" },
                  { icon: MapPin, title: "Endereço", content: "Av. Faria Lima, 1234 - SP" },
                  { icon: Clock, title: "Horário", content: "Seg - Sex: 08h às 18h" },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-secondary/10 transition-colors">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card-surface p-8 space-y-6">
                 <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                       <MessageSquare className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                       <h4 className="font-bold">WhatsApp Direto</h4>
                       <p className="text-xs text-muted-foreground">Atendimento imediato via chat</p>
                    </div>
                 </div>
                 <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-12">
                    Iniciar Conversa no WhatsApp
                 </Button>
              </div>
            </div>

            <div className="card-surface p-8 md:p-10 shadow-2xl relative">
              <div className="absolute -top-4 -right-4 h-24 w-24 bg-primary/10 blur-2xl rounded-full" />
              <form className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Nome Completo</label>
                    <Input placeholder="Seu nome" className="bg-background border-border" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">E-mail Corporativo</label>
                    <Input placeholder="email@empresa.com.br" type="email" className="bg-background border-border" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Telefone</label>
                    <Input placeholder="(00) 00000-0000" className="bg-background border-border" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Empresa</label>
                    <Input placeholder="Nome da sua empresa" className="bg-background border-border" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Como podemos ajudar?</label>
                  <Textarea placeholder="Descreva brevemente seu projeto ou dúvida" className="bg-background border-border min-h-[120px]" />
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-14 text-lg">
                  <Send className="mr-2 h-5 w-5" /> Enviar Mensagem
                </Button>
                
                <p className="text-[10px] text-center text-muted-foreground">
                  Ao enviar, você concorda com nossa política de privacidade e termos de uso.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
