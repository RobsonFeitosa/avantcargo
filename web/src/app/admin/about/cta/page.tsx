"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, Handshake, MousePointerClick } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function AboutCTAConfig() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-emerald-950">Chamada para Ação (Final)</h1>
        <p className="text-emerald-900/60 font-medium">
          Configure a seção de rodapé da página Quem Somos ("Vamos trabalhar juntos?").
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Textos Principais */}
        <div className="space-y-8">
          <Card className="border-none shadow-sm overflow-hidden h-fit">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <Handshake className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Textos do Banner</CardTitle>
              </div>
              <CardDescription className="text-emerald-800/60 font-medium">
                O convite final exibido antes do rodapé do site.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Título (Parte Escura)</Label>
                  <Input maxLength={60} defaultValue="Vamos trabalhar" className="border-emerald-100 focus-visible:ring-emerald-500 font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Palavra em Destaque (Laranja)</Label>
                  <Input maxLength={40} defaultValue="juntos?" className="border-emerald-100 focus-visible:ring-emerald-500 font-bold text-orange-600" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Descrição Convidativa</Label>
                <Textarea maxLength={200} defaultValue="Descubra como a AVANTCARGO pode ajudar sua empresa a reduzir custos de importação e operar com mais eficiência no comércio exterior." className="min-h-[100px] border-emerald-100 focus-visible:ring-emerald-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Botões */}
        <div className="space-y-8">
          <Card className="border-none shadow-sm overflow-hidden h-fit">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <MousePointerClick className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Botões de Ação</CardTitle>
              </div>
              <CardDescription className="text-emerald-800/60 font-medium">
                Links exibidos ao lado direito do banner CTA.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              
              {/* Botão Principal */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  <Label className="font-bold text-emerald-950">Botão Principal (Laranja)</Label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-emerald-900/70 font-semibold text-[10px]">Texto</Label>
                    <Input maxLength={40} defaultValue="Falar conosco" className="border-emerald-100 focus-visible:ring-emerald-500" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-emerald-900/70 font-semibold text-[10px]">Link (WhatsApp/URL)</Label>
                    <Input maxLength={100} defaultValue="https://wa.me/5511964503217" className="border-emerald-100 focus-visible:ring-emerald-500" />
                  </div>
                </div>
              </div>

              <Separator className="bg-emerald-50" />

              {/* Botão Secundário */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-300" />
                  <Label className="font-bold text-emerald-950">Botão Secundário (Branco)</Label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-emerald-900/70 font-semibold text-[10px]">Texto</Label>
                    <Input maxLength={40} defaultValue="Enviar mensagem" className="border-emerald-100 focus-visible:ring-emerald-500" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-emerald-900/70 font-semibold text-[10px]">Link (Página)</Label>
                    <Input maxLength={100} defaultValue="/contato" className="border-emerald-100 focus-visible:ring-emerald-500" />
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end gap-4 border-t border-emerald-50 pt-8 mt-4">
        <Button variant="outline" className="border-emerald-100 text-emerald-700 hover:bg-emerald-50 px-8">
          Descartar
        </Button>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 px-10">
          <Save className="w-4 h-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
}
