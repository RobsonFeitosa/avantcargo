"use client";

import { useEffect, useState } from "react";
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
  Link as LinkIcon,
  Loader2
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { footerActions } from "@/admin/actions/home-sections.actions";
import { useAuth } from "@/admin/hooks_generic/providers/auth";

export default function FooterConfig() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [description, setDescription] = useState("");
  const [socialLinks, setSocialLinks] = useState<{ icon: string; link: string }[]>([]);
  const [contactInfo, setContactInfo] = useState({
    address: "",
    phone: "",
    email: ""
  });
  const [copyrightText, setCopyrightText] = useState("");
  const [termsLink, setTermsLink] = useState("");
  const [privacyLink, setPrivacyLink] = useState("");

  const { data: configData, isLoading } = useQuery({
    queryKey: ["footer"],
    queryFn: () => footerActions.get(),
    enabled: !!user,
  });

  useEffect(() => {
    if (configData?.result) {
      const { result } = configData;
      setDescription(result.description || "");
      setSocialLinks(result.social_links || []);
      setContactInfo(result.contact_info || { address: "", phone: "", email: "" });
      setCopyrightText(result.copyrightText || "");
      setTermsLink(result.termsLink || "");
      setPrivacyLink(result.privacyLink || "");
    }
  }, [configData]);

  const mutation = useMutation({
    mutationFn: (data: any) => footerActions.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["footer"] });
      toast.success("Configurações salvas com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao salvar configurações.");
    }
  });

  const handleSave = () => {
    mutation.mutate({
      description,
      social_links: socialLinks,
      contact_info: contactInfo,
      copyrightText,
      termsLink,
      privacyLink
    });
  };

  const updateSocialLink = (icon: string, link: string) => {
    const newLinks = [...socialLinks];
    const idx = newLinks.findIndex(l => l.icon === icon);
    if (idx !== -1) {
      newLinks[idx].link = link;
    } else {
      newLinks.push({ icon, link });
    }
    setSocialLinks(newLinks);
  };

  const getSocialLink = (icon: string) => {
    return socialLinks.find(l => l.icon === icon)?.link || "";
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const handlePhoneChange = (value: string) => {
    setContactInfo({ ...contactInfo, phone: formatPhone(value) });
  };

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-emerald-950">Rodapé</h1>
        <p className="text-emerald-900/60 font-medium">
          Configure as informações institucionais, contatos e links exibidos no rodapé do site.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        
        <div className="space-y-8">
          <Card className="border-none shadow-sm overflow-hidden h-fit">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Institucional</CardTitle>
              </div>
              <CardDescription className="text-emerald-800/60 font-medium">
                Breve descrição da empresa exibida na primeira coluna.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Descrição / Resumo</Label>
                <Textarea 
                  maxLength={250} 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)}
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
                Links para os perfis sociais. Deixe em branco para ocultar o ícone no site.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Linkedin size={16} />
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-emerald-900/70 font-semibold text-[10px]">LinkedIn</Label>
                  <Input 
                    maxLength={200} 
                    value={getSocialLink("Linkedin")} 
                    onChange={(e) => updateSocialLink("Linkedin", e.target.value)}
                    className="border-emerald-100 focus-visible:ring-emerald-500 h-8" 
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Instagram size={16} />
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-emerald-900/70 font-semibold text-[10px]">Instagram</Label>
                  <Input 
                    maxLength={200} 
                    value={getSocialLink("Instagram")} 
                    onChange={(e) => updateSocialLink("Instagram", e.target.value)}
                    className="border-emerald-100 focus-visible:ring-emerald-500 h-8" 
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Facebook size={16} />
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-emerald-900/70 font-semibold text-[10px]">Facebook</Label>
                  <Input 
                    maxLength={200} 
                    value={getSocialLink("Facebook")} 
                    onChange={(e) => updateSocialLink("Facebook", e.target.value)}
                    className="border-emerald-100 focus-visible:ring-emerald-500 h-8" 
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Twitter size={16} />
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-emerald-900/70 font-semibold text-[10px]">X (Twitter)</Label>
                  <Input 
                    maxLength={200} 
                    value={getSocialLink("Twitter")} 
                    onChange={(e) => updateSocialLink("Twitter", e.target.value)}
                    className="border-emerald-100 focus-visible:ring-emerald-500 h-8" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

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
                  value={contactInfo.address} 
                  onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                  className="min-h-[80px] border-emerald-100 focus-visible:ring-emerald-500" 
                />
              </div>

              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider flex items-center gap-1">
                  <Phone size={12} /> Telefone Principal (WhatsApp)
                </Label>
                <Input 
                  maxLength={20} 
                  value={contactInfo.phone} 
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="(00) 00000-0000"
                  className="border-emerald-100 focus-visible:ring-emerald-500" 
                />
              </div>

              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider flex items-center gap-1">
                  <Mail size={12} /> E-mail Comercial
                </Label>
                <Input 
                  maxLength={80} 
                  type="email" 
                  value={contactInfo.email} 
                  onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                  className="border-emerald-100 focus-visible:ring-emerald-500" 
                />
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
                <Input 
                  maxLength={120} 
                  value={copyrightText} 
                  onChange={(e) => setCopyrightText(e.target.value)}
                  className="border-emerald-100 focus-visible:ring-emerald-500 text-sm" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Link: Termos de Uso</Label>
                  <Input 
                    maxLength={100} 
                    value={termsLink} 
                    onChange={(e) => setTermsLink(e.target.value)}
                    className="border-emerald-100 focus-visible:ring-emerald-500 h-9" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Link: Privacidade</Label>
                  <Input 
                    maxLength={100} 
                    value={privacyLink} 
                    onChange={(e) => setPrivacyLink(e.target.value)}
                    className="border-emerald-100 focus-visible:ring-emerald-500 h-9" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

      <div className="flex justify-end gap-4 border-t border-emerald-50 pt-8 mt-4">
        <Button 
          variant="outline" 
          className="border-emerald-100 text-emerald-700 hover:bg-emerald-50 px-8"
          onClick={() => queryClient.invalidateQueries({ queryKey: ["footer"] })}
        >
          Descartar
        </Button>
        <Button 
          className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 px-10"
          onClick={handleSave}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
}
