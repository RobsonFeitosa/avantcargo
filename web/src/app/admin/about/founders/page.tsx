"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, Users, Upload, MessageSquare, Loader2, Trash2, X, RefreshCw } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { aboutUsActions } from "@/admin/actions/about-us.actions";
import { uploadActions } from "@/admin/actions/upload.actions";
import { useAuth } from "@/admin/hooks_generic/providers/auth";
import { toast } from "sonner";
import Image from "next/image";

export default function AboutFoundersConfig() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const fileInput1Ref = useRef<HTMLInputElement>(null);
  const fileInput2Ref = useRef<HTMLInputElement>(null);

  const [foundersBadge, setFoundersBadge] = useState("");
  const [foundersTitle, setFoundersTitle] = useState("");
  const [foundersTitleHighlight, setFoundersTitleHighlight] = useState("");

  const [founder1Cargo, setFounder1Cargo] = useState("");
  const [founder1Name, setFounder1Name] = useState("");
  const [founder1Subtitle, setFounder1Subtitle] = useState("");
  const [founder1Bio, setFounder1Bio] = useState("");
  const [founder1ButtonText, setFounder1ButtonText] = useState("");
  const [founder1ButtonLink, setFounder1ButtonLink] = useState("");
  const [founder1Image, setFounder1Image] = useState("");

  const [founder2Cargo, setFounder2Cargo] = useState("");
  const [founder2Name, setFounder2Name] = useState("");
  const [founder2Subtitle, setFounder2Subtitle] = useState("");
  const [founder2Bio, setFounder2Bio] = useState("");
  const [founder2ButtonText, setFounder2ButtonText] = useState("");
  const [founder2ButtonLink, setFounder2ButtonLink] = useState("");
  const [founder2Image, setFounder2Image] = useState("");

  const [isUploading1, setIsUploading1] = useState(false);
  const [isUploading2, setIsUploading2] = useState(false);

  const { data: configData, isLoading } = useQuery({
    queryKey: ["about-us-founders"],
    queryFn: () => aboutUsActions.get(),
    enabled: !!user,
  });

  useEffect(() => {
    if (configData?.result) {
      const { result } = configData;
      setFoundersBadge(result.foundersBadge || "");
      setFoundersTitle(result.foundersTitle || "");
      setFoundersTitleHighlight(result.foundersTitleHighlight || "");
      
      setFounder1Cargo(result.founder1Cargo || "");
      setFounder1Name(result.founder1Name || "");
      setFounder1Subtitle(result.founder1Subtitle || "");
      setFounder1Bio(result.founder1Bio || "");
      setFounder1ButtonText(result.founder1ButtonText || "");
      setFounder1ButtonLink(result.founder1ButtonLink || "");
      setFounder1Image(result.founder1Image || "");

      setFounder2Cargo(result.founder2Cargo || "");
      setFounder2Name(result.founder2Name || "");
      setFounder2Subtitle(result.founder2Subtitle || "");
      setFounder2Bio(result.founder2Bio || "");
      setFounder2ButtonText(result.founder2ButtonText || "");
      setFounder2ButtonLink(result.founder2ButtonLink || "");
      setFounder2Image(result.founder2Image || "");
    }
  }, [configData]);

  const mutation = useMutation({
    mutationFn: (data: any) => aboutUsActions.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about-us-founders"] });
      toast.success("Configurações salvas com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao salvar configurações.");
    }
  });

  const handleSave = () => {
    mutation.mutate({
      foundersBadge,
      foundersTitle,
      foundersTitleHighlight,
      founder1Cargo,
      founder1Name,
      founder1Subtitle,
      founder1Bio,
      founder1ButtonText,
      founder1ButtonLink,
      founder1Image,
      founder2Cargo,
      founder2Name,
      founder2Subtitle,
      founder2Bio,
      founder2ButtonText,
      founder2ButtonLink,
      founder2Image
    });
  };

  const validateImage = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        toast.error("A imagem deve ter no máximo 2MB.");
        return resolve(false);
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new (window as any).Image();
        img.onload = () => {
          if (img.naturalWidth > 800 || img.naturalHeight > 800) {
            toast.error("A resolução máxima permitida é 800x800.");
            return resolve(false);
          }
          if (img.naturalWidth < 200 || img.naturalHeight < 200) {
            toast.error("A imagem é muito pequena. Mínimo recomendado: 200x200.");
            return resolve(false);
          }
          resolve(true);
        };
        img.src = e.target?.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, founderNum: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isValid = await validateImage(file);
    if (!isValid) return;

    if (founderNum === 1) setIsUploading1(true);
    else setIsUploading2(true);

    try {
      const response = await uploadActions.upload(file);
      if (founderNum === 1) setFounder1Image(response.result.url);
      else setFounder2Image(response.result.url);
      toast.success("Imagem carregada com sucesso!");
    } catch (error) {
      toast.error("Erro ao fazer upload da imagem.");
    } finally {
      if (founderNum === 1) setIsUploading1(false);
      else setIsUploading2(false);
    }
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const handlePhoneChange = (value: string, setter: (v: string) => void) => {
    setter(formatPhone(value));
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
                <Input 
                  maxLength={40} 
                  value={foundersBadge} 
                  onChange={(e) => setFoundersBadge(e.target.value)}
                  className="border-emerald-100 focus-visible:ring-emerald-500" 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Título (Conheça os)</Label>
                <Input 
                  maxLength={60} 
                  value={foundersTitle} 
                  onChange={(e) => setFoundersTitle(e.target.value)}
                  className="border-emerald-100 focus-visible:ring-emerald-500" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Palavra em Destaque (Verde)</Label>
              <Input 
                maxLength={40} 
                value={foundersTitleHighlight} 
                onChange={(e) => setFoundersTitleHighlight(e.target.value)}
                className="border-emerald-100 focus-visible:ring-emerald-500 text-emerald-600 font-bold" 
              />
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
                <input 
                  type="file" 
                  ref={fileInput1Ref} 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 1)} 
                />
                
                {founder1Image ? (
                  <div className="relative aspect-video rounded-xl overflow-hidden group">
                    <Image 
                      src={founder1Image} 
                      alt="Preview" 
                      fill 
                      className="object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        onClick={() => fileInput1Ref.current?.click()}
                      >
                        <RefreshCw className="w-4 h-4 mr-2" /> Alterar
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => setFounder1Image("")}
                      >
                        <Trash2 className="w-4 h-4 mr-2" /> Remover
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div 
                    onClick={() => fileInput1Ref.current?.click()}
                    className="border-2 border-dashed border-emerald-100 rounded-xl p-4 text-center hover:bg-emerald-50 transition-colors cursor-pointer group"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                        {isUploading1 ? (
                          <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                        ) : (
                          <Upload className="w-4 h-4 text-emerald-600" />
                        )}
                      </div>
                      <span className="text-xs font-medium text-emerald-800">
                        {isUploading1 ? "Carregando..." : "Clique para alterar a foto"}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Cargo (Badge)</Label>
                  <Input 
                    maxLength={40} 
                    value={founder1Cargo} 
                    onChange={(e) => setFounder1Cargo(e.target.value)}
                    className="border-emerald-100 focus-visible:ring-emerald-500" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Nome Completo</Label>
                  <Input 
                    maxLength={60} 
                    value={founder1Name} 
                    onChange={(e) => setFounder1Name(e.target.value)}
                    className="border-emerald-100 focus-visible:ring-emerald-500 font-bold text-emerald-950" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Subtítulo (Especialidade)</Label>
                <Input 
                  maxLength={100} 
                  value={founder1Subtitle} 
                  onChange={(e) => setFounder1Subtitle(e.target.value)}
                  className="border-emerald-100 focus-visible:ring-emerald-500" 
                />
              </div>

              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Biografia</Label>
                <Textarea 
                  maxLength={600} 
                  value={founder1Bio} 
                  onChange={(e) => setFounder1Bio(e.target.value)}
                  className="min-h-[120px] border-emerald-100 focus-visible:ring-emerald-500" 
                />
              </div>

              <div className="space-y-2 pt-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" /> Configuração do Botão WhatsApp
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    maxLength={30} 
                    value={founder1ButtonText} 
                    onChange={(e) => setFounder1ButtonText(e.target.value)}
                    placeholder="Texto do botão" 
                    className="border-emerald-100" 
                  />
                  <Input 
                    maxLength={20} 
                    value={founder1ButtonLink} 
                    onChange={(e) => handlePhoneChange(e.target.value, setFounder1ButtonLink)}
                    placeholder="(00) 00000-0000" 
                    className="border-emerald-100" 
                  />
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
                <input 
                  type="file" 
                  ref={fileInput2Ref} 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 2)} 
                />
                
                {founder2Image ? (
                  <div className="relative aspect-video rounded-xl overflow-hidden group">
                    <Image 
                      src={founder2Image} 
                      alt="Preview" 
                      fill 
                      className="object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        onClick={() => fileInput2Ref.current?.click()}
                      >
                        <RefreshCw className="w-4 h-4 mr-2" /> Alterar
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => setFounder2Image("")}
                      >
                        <Trash2 className="w-4 h-4 mr-2" /> Remover
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div 
                    onClick={() => fileInput2Ref.current?.click()}
                    className="border-2 border-dashed border-emerald-100 rounded-xl p-4 text-center hover:bg-emerald-50 transition-colors cursor-pointer group"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                        {isUploading2 ? (
                          <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                        ) : (
                          <Upload className="w-4 h-4 text-emerald-600" />
                        )}
                      </div>
                      <span className="text-xs font-medium text-emerald-800">
                        {isUploading2 ? "Carregando..." : "Clique para alterar a foto"}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Cargo (Badge)</Label>
                  <Input 
                    maxLength={40} 
                    value={founder2Cargo} 
                    onChange={(e) => setFounder2Cargo(e.target.value)}
                    className="border-emerald-100 focus-visible:ring-emerald-500" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Nome Completo</Label>
                  <Input 
                    maxLength={60} 
                    value={founder2Name} 
                    onChange={(e) => setFounder2Name(e.target.value)}
                    className="border-emerald-100 focus-visible:ring-emerald-500 font-bold text-emerald-950" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Subtítulo (Especialidade)</Label>
                <Input 
                  maxLength={100} 
                  value={founder2Subtitle} 
                  onChange={(e) => setFounder2Subtitle(e.target.value)}
                  className="border-emerald-100 focus-visible:ring-emerald-500" 
                />
              </div>

              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Biografia</Label>
                <Textarea 
                  maxLength={600} 
                  value={founder2Bio} 
                  onChange={(e) => setFounder2Bio(e.target.value)}
                  className="min-h-[120px] border-emerald-100 focus-visible:ring-emerald-500" 
                />
              </div>

              <div className="space-y-2 pt-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" /> Configuração do Botão WhatsApp
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    maxLength={30} 
                    value={founder2ButtonText} 
                    onChange={(e) => setFounder2ButtonText(e.target.value)}
                    placeholder="Texto do botão" 
                    className="border-emerald-100" 
                  />
                  <Input 
                    maxLength={20} 
                    value={founder2ButtonLink} 
                    onChange={(e) => handlePhoneChange(e.target.value, setFounder2ButtonLink)}
                    placeholder="(00) 00000-0000" 
                    className="border-emerald-100" 
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
          onClick={() => queryClient.invalidateQueries({ queryKey: ["about-us-founders"] })}
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
