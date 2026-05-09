"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Save, 
  MapPin, 
  Phone, 
  Mail, 
  Building2,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  Link as LinkIcon
} from "lucide-react";

export default function FooterConfig() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-emerald-950">Rodapé</h1>
        <p className="text-emerald-900/60 font-medium">
          Configure as informações institucionais, contatos e links exibidos no rodapé do site.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        
        {/* Coluna 1: Informações da Empresa & Redes Sociais */}
        <div className="space-y-8">
          
          <Card className="border-none shadow-sm overflow-hidden h-fit">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Institucional</CardTitle>
              </div>
              <CardDescription className="text-emerald-800/60 font-medium">
                Logo e breve descrição da empresa exibidos na primeira coluna.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Logo URL / Arquivo</Label>
                <div className="flex gap-2">
                  <Input maxLength={200} defaultValue="/assets/logo.svg" className="border-emerald-100 focus-visible:ring-emerald-500 font-mono text-sm" />
                  <Button variant="outline" className="border-emerald-100 text-emerald-700 hover:bg-emerald-50 whitespace-nowrap">
                    Fazer Upload
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Descrição / Resumo</Label>
                <Textarea 
                  maxLength={250} 
                  defaultValue="AvantCargo - Logística e Serviços Aduaneiros. Referência em assessoria de comércio exterior, oferecendo soluções estratégicas e operacionais." 
                  className="min-h-[100px] border-emerald-100 focus-visible:ring-emerald-500" 
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm overflow-hidden h-fit">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <Linkedin className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Redes Sociais</CardTitle>
              </div>
              <CardDescription className="text-emerald-800/60 font-medium">
                Links para os perfis sociais. Deixe em branco para ocultar o ícone.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Linkedin size={16} />
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-emerald-900/70 font-semibold text-[10px]">LinkedIn</Label>
                  <Input maxLength={200} defaultValue="https://linkedin.com/company/avantcargo" className="border-emerald-100 focus-visible:ring-emerald-500 h-8" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Instagram size={16} />
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-emerald-900/70 font-semibold text-[10px]">Instagram</Label>
                  <Input maxLength={200} defaultValue="https://instagram.com/avantcargo" className="border-emerald-100 focus-visible:ring-emerald-500 h-8" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Facebook size={16} />
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-emerald-900/70 font-semibold text-[10px]">Facebook</Label>
                  <Input maxLength={200} defaultValue="https://facebook.com/avantcargo" className="border-emerald-100 focus-visible:ring-emerald-500 h-8" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Twitter size={16} />
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-emerald-900/70 font-semibold text-[10px]">X (Twitter)</Label>
                  <Input maxLength={200} defaultValue="https://x.com/avantcargo" className="border-emerald-100 focus-visible:ring-emerald-500 h-8" />
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Coluna 2: Contatos & Links Legais */}
        <div className="space-y-8">
          
          <Card className="border-none shadow-sm overflow-hidden h-fit">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Contatos</CardTitle>
              </div>
              <CardDescription className="text-emerald-800/60 font-medium">
                Informações de atendimento e endereço físico da empresa.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider flex items-center gap-1">
                  <MapPin size={12} /> Endereço Completo
                </Label>
                <Textarea 
                  maxLength={180} 
                  defaultValue="Endereço: R. Tupi Paulista, 71 - Cidade Industrial Satélite de São Paulo, Guarulhos - SP, 07222-070, Brasil" 
                  className="min-h-[80px] border-emerald-100 focus-visible:ring-emerald-500" 
                />
              </div>

              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider flex items-center gap-1">
                  <Phone size={12} /> Telefone Principal
                </Label>
                <Input maxLength={40} defaultValue="(11) 96450-3217" className="border-emerald-100 focus-visible:ring-emerald-500" />
              </div>

              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider flex items-center gap-1">
                  <Mail size={12} /> E-mail Comercial
                </Label>
                <Input maxLength={80} type="email" defaultValue="comercial@avantcargo.com.br" className="border-emerald-100 focus-visible:ring-emerald-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm overflow-hidden h-fit">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Copyright & Legais</CardTitle>
              </div>
              <CardDescription className="text-emerald-800/60 font-medium">
                Rodapé inferior com direitos autorais e políticas.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Texto de Copyright</Label>
                <Input maxLength={120} defaultValue="© 2026 AvantCargo - Logística e Serviços Aduaneiros. Todos os direitos reservados." className="border-emerald-100 focus-visible:ring-emerald-500 text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Link: Termos de Uso</Label>
                  <Input maxLength={100} defaultValue="/termos" className="border-emerald-100 focus-visible:ring-emerald-500 h-9" />
                </div>
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Link: Privacidade</Label>
                  <Input maxLength={100} defaultValue="/privacidade" className="border-emerald-100 focus-visible:ring-emerald-500 h-9" />
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
