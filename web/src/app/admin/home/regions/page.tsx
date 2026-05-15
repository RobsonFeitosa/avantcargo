"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Save,
  Layout,
  Loader2,
  Image as ImageIcon,
  Upload,
  Trash2
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { regionsActions } from "@/admin/actions/home-sections.actions";
import { uploadActions } from "@/admin/actions/upload.actions";
import { useAuth } from "@/admin/hooks_generic/providers/auth";
import Image from "next/image";

const getImageUrl = (url: any) => {
  if (!url) return "";
  if (typeof url !== "string") return url;
  if (url.includes("/api/files/")) return url;
  if (url.includes("/files/")) {
    return url.replace("/files/", "/api/files/");
  }
  return url;
};

export default function RegionsConfig() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mapImageUrl, setMapImageUrl] = useState("");
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { data: configData, isLoading } = useQuery({
    queryKey: ["regions", "home"],
    queryFn: () => regionsActions.get("home"),
    enabled: !!user,
  });

  useEffect(() => {
    if (configData?.result) {
      const { result } = configData;
      setTitle(result.title || "");
      setDescription(result.description || "");
      setMapImageUrl(result.mapImageUrl || "");
    }
  }, [configData]);

  const mutation = useMutation({
    mutationFn: (data: any) => regionsActions.update("home", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["regions", "home"] });
      toast.success("Configurações salvas com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao salvar configurações.");
    }
  });

  const handleSave = () => {
    mutation.mutate({
      title,
      description,
      mapImageUrl,
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local preview for immediate feedback
    const previewUrl = URL.createObjectURL(file);
    setLocalPreview(previewUrl);

    try {
      setIsUploading(true);
      const res = await uploadActions.upload(file);

      // Verificação robusta da URL na resposta
      const url = res?.url || res?.result?.url || res?.data?.url;

      if (url) {
        setMapImageUrl(url);
        toast.success("Imagem enviada com sucesso!");
      } else {
        console.error("Formato de resposta inesperado:", res);
        throw new Error("URL não encontrada na resposta do servidor");
      }
    } catch (error) {
      console.error("Erro no upload:", error);
      toast.error("Erro ao enviar imagem.");
      // Não limpamos o preview local para que o usuário veja o que selecionou
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setMapImageUrl("");
    setLocalPreview(null);
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
        <h1 className="text-3xl font-bold tracking-tight text-emerald-950">Regiões de Atuação</h1>
        <p className="text-emerald-900/60 font-medium">Configure a seção do mapa de regiões logísticas da página inicial.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-8">
          <Card className="border-none shadow-sm overflow-hidden h-fit">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <Layout className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Textos da Seção</CardTitle>
              </div>
              <CardDescription className="text-emerald-800/60 font-medium">
                Edite o título e a descrição. Use **texto** para negrito.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">
                  Título Principal
                </Label>
                <Textarea
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="min-h-[100px] border-emerald-100 focus-visible:ring-emerald-500 font-semibold"
                  placeholder="Ex: Nossa atuação se concentra nas principais regiões logísticas..."
                />
              </div>

              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">
                  Descrição / Detalhes
                </Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[150px] border-emerald-100 focus-visible:ring-emerald-500"
                  placeholder="Ex: Essas regiões representam muito mais do que pontos no mapa..."
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="border-none shadow-sm overflow-hidden h-fit">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-emerald-600" />
                  <CardTitle className="text-lg font-bold text-emerald-950">Mapa Ilustrativo</CardTitle>
                </div>
                {(mapImageUrl || localPreview) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={handleRemoveImage}
                  >
                    <Trash2 size={14} className="mr-1" /> Remover
                  </Button>
                )}
              </div>
              <CardDescription className="text-emerald-800/60 font-medium">
                Upload da imagem do mapa (PNG preferencialmente).
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-emerald-100 rounded-xl p-8 bg-emerald-50/10 gap-4">
                {mapImageUrl || localPreview ? (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-emerald-100 bg-white">
                    <img
                      src={localPreview || getImageUrl(mapImageUrl)}
                      alt="Preview do Mapa"
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Label
                        htmlFor="map-upload"
                        className="cursor-pointer bg-white text-emerald-600 px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg"
                      >
                        <Upload size={16} /> Alterar Imagem
                      </Label>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 py-8 text-emerald-900/40">
                    <ImageIcon size={48} strokeWidth={1} />
                    <p className="font-medium">Nenhuma imagem selecionada</p>
                    <Label htmlFor="map-upload" className="mt-2 cursor-pointer bg-emerald-600 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg hover:bg-emerald-700 transition-colors">
                      <Upload size={16} /> Escolher Arquivo
                    </Label>
                  </div>
                )}
                <input
                  id="map-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isUploading}
                />
                {isUploading && (
                  <div className="flex items-center gap-2 text-emerald-600 font-medium animate-pulse">
                    <Loader2 size={16} className="animate-spin" />
                    Enviando imagem...
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end gap-4 border-t border-emerald-50 pt-8 mt-4">
        <Button
          variant="outline"
          className="border-emerald-100 text-emerald-700 hover:bg-emerald-50 px-8"
          onClick={() => queryClient.invalidateQueries({ queryKey: ["regions"] })}
        >
          Descartar
        </Button>
        <Button
          className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 px-10"
          onClick={handleSave}
          disabled={mutation.isPending || isUploading}
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
