"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Save, 
  Layout, 
  ListOrdered, 
  GripVertical,
  Loader2
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { workStepsActions } from "@/admin/actions/work-steps.actions";
import { useAuth } from "@/admin/hooks_generic/providers/auth";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

function SortableItem({ id, children }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-start gap-3 p-4 rounded-xl border border-transparent transition-all ${
        isDragging ? "bg-emerald-50 border-emerald-200 shadow-lg scale-[1.02]" : "hover:border-emerald-50 hover:bg-emerald-50/30"
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="mt-2 cursor-grab active:cursor-grabbing text-emerald-900/20 group-hover:text-emerald-600 transition-colors"
      >
        <GripVertical size={20} />
      </div>
      <div className="flex-1 w-full">
        {children}
      </div>
    </div>
  );
}

export default function WorkStepsConfig() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [headerBadge, setHeaderBadge] = useState("COMO TRABALHAMOS");
  const [headerTitle, setHeaderTitle] = useState("Nossa abordagem em 4 etapas");
  const [headerDescription, setHeaderDescription] = useState("Um fluxo de trabalho transparente e eficiente desenhado para mitigar riscos e maximizar resultados.");
  const [ctaText, setCtaText] = useState("Falar com um especialista");

  const [steps, setSteps] = useState<{ id: string; title: string; desc: string }[]>([
    { 
      id: "step-1", 
      title: "Análise e Diagnóstico", 
      desc: "Avaliamos a situação da empresa, os produtos e os objetivos para identificar as melhores oportunidades e regimes aduaneiros aplicáveis." 
    },
    { 
      id: "step-2", 
      title: "Planejamento e Estratégia", 
      desc: "Definimos a estratégia mais adequada para cada operação, com foco em redução de custos, conformidade legal e agilidade no processo." 
    },
    { 
      id: "step-3", 
      title: "Execução e Acompanhamento", 
      desc: "Realizamos todos os procedimentos junto aos órgãos competentes (Receita Federal, MDIC, Siscomex), monitorando cada etapa e respondendo às exigências com agilidade." 
    },
    { 
      id: "step-4", 
      title: "Resultado e Continuidade", 
      desc: "Entregamos o resultado esperado e mantemos o relacionamento ativo, garantindo que sua empresa esteja sempre em conformidade e aproveitando os benefícios disponíveis." 
    },
  ]);

  const { data: configData, isLoading } = useQuery({
    queryKey: ["work-steps"],
    queryFn: () => workStepsActions.get(),
    enabled: !!user,
  });

  useEffect(() => {
    if (configData?.result) {
      const { result } = configData;
      setHeaderBadge(result.headerBadge || "COMO TRABALHAMOS");
      setHeaderTitle(result.headerTitle || "Nossa abordagem em 4 etapas");
      setHeaderDescription(result.headerDescription || "Um fluxo de trabalho transparente e eficiente desenhado para mitigar riscos e maximizar resultados.");
      setCtaText(result.ctaText || "Falar com um especialista");
      setSteps(result.steps || []);
    }
  }, [configData]);

  const mutation = useMutation({
    mutationFn: (data: any) => workStepsActions.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["work-steps"] });
      toast.success("Configurações salvas com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao salvar configurações.");
    }
  });

  const handleSave = () => {
    mutation.mutate({
      headerBadge,
      headerTitle,
      headerDescription,
      ctaText,
      steps
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEndSteps = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setSteps((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
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
        <h1 className="text-3xl font-bold tracking-tight text-emerald-950">Etapas de Trabalho</h1>
        <p className="text-emerald-900/60 font-medium">
          Configure a seção de abordagem (Como trabalhamos) da página inicial.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-8">
          <Card className="border-none shadow-sm overflow-hidden h-fit">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <Layout className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Cabeçalho da Seção</CardTitle>
              </div>
              <CardDescription className="text-emerald-800/60 font-medium">
                Textos introdutórios e botão de CTA.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Badge Superior</Label>
                <Input 
                  maxLength={80} 
                  value={headerBadge} 
                  onChange={(e) => setHeaderBadge(e.target.value)}
                  className="border-emerald-100 focus-visible:ring-emerald-500" 
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Título Principal</Label>
                <Input 
                  maxLength={80} 
                  value={headerTitle} 
                  onChange={(e) => setHeaderTitle(e.target.value)}
                  className="border-emerald-100 focus-visible:ring-emerald-500 text-lg font-semibold" 
                />
              </div>

              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Subtítulo / Descrição</Label>
                <Textarea 
                  maxLength={250} 
                  value={headerDescription} 
                  onChange={(e) => setHeaderDescription(e.target.value)}
                  className="min-h-[80px] border-emerald-100 focus-visible:ring-emerald-500" 
                />
              </div>

              <Separator className="bg-emerald-50 my-2" />

              <div className="space-y-2 pt-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Botão Inferior (CTA)</Label>
                <Input 
                  maxLength={80} 
                  value={ctaText} 
                  onChange={(e) => setCtaText(e.target.value)}
                  className="border-emerald-100 focus-visible:ring-emerald-500" 
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <ListOrdered className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Passo a Passo</CardTitle>
              </div>
              <CardDescription className="text-emerald-800/60 font-medium">
                Edite e arraste para reordenar as etapas do processo. Os números (01, 02...) são gerados automaticamente pela ordem.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-1">
              <DndContext id="dnd-work-steps" sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndSteps}>
                <SortableContext items={steps} strategy={verticalListSortingStrategy}>
                  {steps.map((step, index) => (
                    <SortableItem key={step.id} id={step.id}>
                      <div className="flex flex-col gap-3 bg-white p-4 border border-emerald-50 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                            {String(index + 1).padStart(2, '0')}
                          </div>
                          <Input maxLength={80} value={step.title} 
                            onChange={(e) => {
                              const newSteps = [...steps];
                              const idx = newSteps.findIndex(s => s.id === step.id);
                              newSteps[idx].title = e.target.value;
                              setSteps(newSteps);
                            }}
                            className="border-emerald-100 focus-visible:ring-emerald-500 font-bold flex-1" 
                          />
                        </div>

                        <div className="space-y-2 pl-11">
                          <Label className="text-emerald-900/70 font-semibold text-[10px]">Descrição da Etapa</Label>
                          <Textarea maxLength={300} value={step.desc} 
                            onChange={(e) => {
                              const newSteps = [...steps];
                              const idx = newSteps.findIndex(s => s.id === step.id);
                              newSteps[idx].desc = e.target.value;
                              setSteps(newSteps);
                            }}
                            className="min-h-[80px] border-emerald-100 focus-visible:ring-emerald-500 text-sm resize-none" 
                          />
                        </div>
                      </div>
                    </SortableItem>
                  ))}
                </SortableContext>
              </DndContext>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end gap-4 border-t border-emerald-50 pt-8 mt-4">
        <Button 
          variant="outline" 
          className="border-emerald-100 text-emerald-700 hover:bg-emerald-50 px-8"
          onClick={() => queryClient.invalidateQueries({ queryKey: ["work-steps"] })}
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
