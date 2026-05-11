"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, Loader2, Upload, Image as ImageIcon } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { careersActions } from "@/admin/actions/careers.actions";
import { toast } from "sonner";
import { useAuth } from "@/admin/hooks_generic/providers/auth";
import Image from "next/image";

export default function CareersAdmin() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description1: "",
    description2: "",
    description3: "",
    description4: "",
    formTitle: "",
    formSubtitle: "",
    image: ""
  });

  const { data: configData, isLoading } = useQuery({
    queryKey: ["careers-config"],
    queryFn: () => careersActions.get(),
    enabled: !!user,
  });

  useEffect(() => {
    if (configData) {
      setFormData({
        title: configData.title || "Programa de Novos Talentos",
        subtitle: configData.subtitle || "O nosso jeito de formar profissionais que movem o mundo.",
        description1: configData.description1 || "Na Avant Cargo, acreditamos que talento se constrói com oportunidade, aprendizado e prática.",
        description2: configData.description2 || "Com uma cultura dinâmica e colaborativa, valorizamos a iniciativa...",
        description3: configData.description3 || "Nosso programa prepara estagiários para assumirem posições efetivas...",
        description4: configData.description4 || "Buscamos pessoas com ideias novas, diferentes perspectivas e vontade de fazer acontecer.",
        formTitle: configData.formTitle || "Faça parte da nossa equipe!",
        formSubtitle: configData.formSubtitle || "Você é apaixonado por inovação, colaboração e busca constante por crescimento?",
        image: configData.image || ""
      });
    }
  }, [configData]);

  const updateMutation = useMutation({
    mutationFn: (data: any) => careersActions.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["careers-config"] });
      toast.success("Configurações salvas com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao salvar configurações.");
    }
  });

  const uploadMutation = useMutation({
    mutationFn: (file: File) => careersActions.uploadImage(file),
    onSuccess: (data) => {
      const fileName = data.result ? data.result.fileName : data.fileName;
      setFormData(prev => ({ ...prev, image: fileName }));
      updateMutation.mutate({ ...formData, image: fileName });
      toast.success("Imagem vinculada com sucesso!");
    },
    onError: () => toast.error("Erro ao enviar imagem."),
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("A imagem não pode ultrapassar 5MB");
      return;
    }
    uploadMutation.mutate(file);
  };

  if (isLoading) return <div className="p-8">Carregando...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-emerald-950">Carreira / Talentos</h1>
        <p className="text-emerald-900/60 font-medium">
          Configure a página de carreira e atração de talentos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm">
          <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
            <CardTitle className="text-lg font-bold text-emerald-950">Textos Principais</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label>Título da Página</Label>
              <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="border-emerald-100" />
            </div>
            <div className="space-y-2">
              <Label>Subtítulo / Chamada</Label>
              <Input value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} className="border-emerald-100 font-medium" />
            </div>
            <div className="space-y-2">
              <Label>Parágrafo 1</Label>
              <Textarea value={formData.description1} onChange={e => setFormData({...formData, description1: e.target.value})} className="min-h-[80px]" />
            </div>
            <div className="space-y-2">
              <Label>Parágrafo 2</Label>
              <Textarea value={formData.description2} onChange={e => setFormData({...formData, description2: e.target.value})} className="min-h-[80px]" />
            </div>
            <div className="space-y-2">
              <Label>Parágrafo 3</Label>
              <Textarea value={formData.description3} onChange={e => setFormData({...formData, description3: e.target.value})} className="min-h-[80px]" />
            </div>
            <div className="space-y-2">
              <Label>Parágrafo 4</Label>
              <Textarea value={formData.description4} onChange={e => setFormData({...formData, description4: e.target.value})} className="min-h-[80px]" />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="border-none shadow-sm">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <CardTitle className="text-lg font-bold text-emerald-950">Imagem Lateral</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div 
                className={`relative border-2 border-dashed ${formData.image ? 'border-emerald-200' : 'border-emerald-200 hover:bg-emerald-50 cursor-pointer'} rounded-xl p-4 text-center transition-colors group flex flex-col items-center justify-center h-64 overflow-hidden`}
                onClick={() => !formData.image && document.getElementById('careers-image')?.click()}
              >
                {formData.image ? (
                  <div className="absolute inset-0 w-full h-full group">
                    <Image 
                      src={`${process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')}/files/${formData.image}`} 
                      alt="Preview" 
                      fill 
                      className="object-cover" 
                    />
                    <div className="absolute inset-0 bg-emerald-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
                      <Button 
                        type="button"
                        variant="secondary" 
                        size="sm"
                        className="w-40 flex items-center justify-center gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          document.getElementById('careers-image')?.click();
                        }}
                      >
                        <ImageIcon className="w-4 h-4" />
                        Trocar Imagem
                      </Button>
                      <Button 
                        type="button"
                        variant="destructive" 
                        size="sm"
                        className="w-40 flex items-center justify-center gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormData(prev => ({ ...prev, image: "" }));
                          updateMutation.mutate({ ...formData, image: "" });
                        }}
                      >
                        Remover Imagem
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="p-4 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                      <Upload className="w-8 h-8 text-emerald-600" />
                    </div>
                    <span className="text-sm font-medium text-emerald-800 mt-4">Clique para fazer upload (Max 5MB)</span>
                  </>
                )}
                <input 
                  type="file" 
                  id="careers-image" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <CardTitle className="text-lg font-bold text-emerald-950">Textos do Formulário</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label>Título do Formulário</Label>
                <Input value={formData.formTitle} onChange={e => setFormData({...formData, formTitle: e.target.value})} className="border-emerald-100" />
              </div>
              <div className="space-y-2">
                <Label>Texto Auxiliar (lado esquerdo do form)</Label>
                <Textarea value={formData.formSubtitle} onChange={e => setFormData({...formData, formSubtitle: e.target.value})} className="min-h-[120px]" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end gap-4 border-t border-emerald-50 pt-8 mt-4">
        <Button variant="outline" onClick={() => queryClient.invalidateQueries({ queryKey: ["careers-config"] })} className="px-8">
          Descartar
        </Button>
        <Button 
          onClick={() => updateMutation.mutate(formData)}
          disabled={updateMutation.isPending}
          className="bg-emerald-600 hover:bg-emerald-700 px-10"
        >
          {updateMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
}
