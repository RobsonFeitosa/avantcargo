"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, Layout, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cubageCalculationActions } from "@/admin/actions/cubage-calculation.actions";
import { useAuth } from "@/admin/hooks_generic/providers/auth";
import { toast } from "sonner";

export default function CubageCalculationConfigPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { data: configData, isLoading } = useQuery({
    queryKey: ["cubage-calculation-config"],
    queryFn: () => cubageCalculationActions.get(),
    enabled: !!user,
  });

  useEffect(() => {
    if (configData?.result) {
      setTitle(configData.result.title || "");
      setDescription(configData.result.description || "");
    }
  }, [configData]);

  const mutation = useMutation({
    mutationFn: (data: any) => cubageCalculationActions.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cubage-calculation-config"] });
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
    });
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
        <h1 className="text-3xl font-bold tracking-tight text-emerald-950">Cálculo de Cubagem</h1>
        <p className="text-emerald-900/60 font-medium">
          Configure o título e o texto de descrição da página de Cálculo de Cubagem.
        </p>
      </div>

      <div className="max-w-4xl">
        <Card className="border-none shadow-sm overflow-hidden">
          <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
            <div className="flex items-center gap-2">
              <Layout className="w-5 h-5 text-emerald-600" />
              <CardTitle className="text-lg font-bold text-emerald-950">Textos Principais</CardTitle>
            </div>
            <CardDescription className="text-emerald-800/60 font-medium">
              Título e explicação detalhada da cubagem mostrados na página.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Título da Página</Label>
              <Input
                maxLength={100}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-emerald-100 focus-visible:ring-emerald-500 font-semibold"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Descrição / Instruções do Cálculo</Label>
              <Textarea
                maxLength={1000}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[200px] border-emerald-100 focus-visible:ring-emerald-500"
              />
            </div>

            <div className="flex justify-end gap-4 pt-4 mt-2 border-t border-emerald-50">
              <Button
                variant="outline"
                className="border-emerald-100 text-emerald-700 hover:bg-emerald-50 px-8"
                onClick={() => queryClient.invalidateQueries({ queryKey: ["cubage-calculation-config"] })}
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
                Salvar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
