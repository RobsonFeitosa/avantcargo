"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, Users, Upload, MessageSquare } from "lucide-react";

export default function AboutFoundersConfig() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-emerald-950">Fundadores</h1>
        <p className="text-emerald-900/60 font-medium">
          Configure a seção "Conheça os fundadores" e os dados de cada perfil.
        </p>
      </div>

      <div className="grid gap-8">
        {/* Cabeçalho da Seção */}
        <Card className="border-none shadow-sm overflow-hidden h-fit">
          <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600" />
              <CardTitle className="text-lg font-bold text-emerald-950">Textos Principais</CardTitle>
            </div>
            <CardDescription className="text-emerald-800/60 font-medium">
              Título e subtítulo da área de fundadores.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Badge (Pílula)</Label>
                <Input maxLength={40} defaultValue="A Equipe por Trás do Sucesso" className="border-emerald-100 focus-visible:ring-emerald-500" />
              </div>
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Título (Conheça os)</Label>
                <Input maxLength={60} defaultValue="Conheça os" className="border-emerald-100 focus-visible:ring-emerald-500" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Palavra em Destaque (Verde)</Label>
              <Input maxLength={40} defaultValue="fundadores" className="border-emerald-100 focus-visible:ring-emerald-500 text-emerald-600 font-bold" />
            </div>
          </CardContent>
        </Card>

        {/* Perfis dos Fundadores */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          
          {/* Fundador 1 */}
          <Card className="border-orange-500/20 shadow-sm overflow-hidden h-fit">
            <CardHeader className="bg-orange-50/50 border-b border-orange-100/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <CardTitle className="text-lg font-bold text-emerald-950">Perfil 1 (Esquerda)</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Foto do Perfil</Label>
                <div className="border-2 border-dashed border-emerald-100 rounded-xl p-4 text-center hover:bg-emerald-50 transition-colors cursor-pointer group">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                      <Upload className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-xs font-medium text-emerald-800">Clique para alterar a foto</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Cargo (Badge)</Label>
                  <Input maxLength={40} defaultValue="Fundador & CEO" className="border-emerald-100 focus-visible:ring-emerald-500" />
                </div>
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Nome Completo</Label>
                  <Input maxLength={60} defaultValue="Matheus Diniz" className="border-emerald-100 focus-visible:ring-emerald-500 font-bold text-emerald-950" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Subtítulo (Especialidade)</Label>
                <Input maxLength={100} defaultValue="Especialista em Comércio Exterior — +20 anos de experiência" className="border-emerald-100 focus-visible:ring-emerald-500" />
              </div>

              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Biografia</Label>
                <Textarea maxLength={600} defaultValue="Com quase 30 anos de atuação no comércio exterior brasileiro, Matheus Diniz é referência nacional em Importação, Exportação e assessoria aduaneira. Sua trajetória é marcada pelo profundo conhecimento das normas do MDIC e Receita Federal." className="min-h-[120px] border-emerald-100 focus-visible:ring-emerald-500" />
              </div>

              <div className="space-y-2 pt-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" /> Configuração do Botão WhatsApp
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input maxLength={30} defaultValue="Fale com Matheus" placeholder="Texto do botão" className="border-emerald-100" />
                  <Input maxLength={100} defaultValue="https://wa.me/5511964503217" placeholder="Link do WhatsApp" className="border-emerald-100" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fundador 2 */}
          <Card className="border-emerald-500/20 shadow-sm overflow-hidden h-fit">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Perfil 2 (Direita)</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Foto do Perfil</Label>
                <div className="border-2 border-dashed border-emerald-100 rounded-xl p-4 text-center hover:bg-emerald-50 transition-colors cursor-pointer group">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                      <Upload className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-xs font-medium text-emerald-800">Clique para alterar a foto</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Cargo (Badge)</Label>
                  <Input maxLength={40} defaultValue="Sócio / Fundador" className="border-emerald-100 focus-visible:ring-emerald-500" />
                </div>
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Nome Completo</Label>
                  <Input maxLength={60} defaultValue="Nome do Sócio" className="border-emerald-100 focus-visible:ring-emerald-500 font-bold text-emerald-950" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Subtítulo (Especialidade)</Label>
                <Input maxLength={100} defaultValue="Especialista Operacional — +15 anos de experiência" className="border-emerald-100 focus-visible:ring-emerald-500" />
              </div>

              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Biografia</Label>
                <Textarea maxLength={600} defaultValue="Com ampla experiência na gestão operacional aduaneira e logística internacional, coordena todas as etapas do processo garantindo segurança, compliance e agilidade de ponta a ponta para os clientes." className="min-h-[120px] border-emerald-100 focus-visible:ring-emerald-500" />
              </div>

              <div className="space-y-2 pt-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" /> Configuração do Botão WhatsApp
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input maxLength={30} defaultValue="Falar com o Sócio" placeholder="Texto do botão" className="border-emerald-100" />
                  <Input maxLength={100} defaultValue="https://wa.me/5511964503217" placeholder="Link do WhatsApp" className="border-emerald-100" />
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
