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
  CheckCircle2, 
  Award,
  GripVertical,
  Loader2
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { aboutUsActions } from "@/admin/actions/about-us.actions";
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

export default function AboutUsConfig() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [headerBadge, setHeaderBadge] = useState("QUEM SOMOS");
  const [headerTitle, setHeaderTitle] = useState("Mais de 20 anos de expertise em Comércio Exterior");
  const [headerDescription, setHeaderDescription] = useState("Atuamos com excelência em todos os portos, aeroportos e fronteiras do Brasil, garantindo que sua carga chegue ao destino final sem imprevistos e com o melhor custo-benefício.");
  const [primaryButtonText, setPrimaryButtonText] = useState("Conheça nossa história");
  const [secondaryButtonText, setSecondaryButtonText] = useState("Fale conosco");

  const [features, setFeatures] = useState([
    { 
      id: "feat-1", 
      title: "98% de aprovação no MDIC", 
      desc: "Taxa de sucesso em processos de Ex-Tarifário" 
    },
    { 
      id: "feat-2", 
      title: "Atendimento personalizado", 
      desc: "Especialistas dedicados para cada cliente" 
    },
    { 
      id: "feat-3", 
      title: "Conformidade regulatória total", 
      desc: "Processos 100% legais e auditáveis" 
    },
  ]);

  const [achievements, setAchievements] = useState([
    { 
      id: "ach-1", 
      title: "Ex-Tarifário", 
      desc: "Redução de até 100% no II — alíquota 0%" 
    },
    { 
      id: "ach-2", 
      title: "R$ 480M+ economizados", 
      desc: "Para os nossos clientes" 
    },
    { 
      id: "ach-3", 
      title: "13+ setores", 
      desc: "Indústria, Agro, Tech, Infraestrutura..." 
    },
    { 
      id: "ach-4", 
      title: "Matheus Diniz", 
      desc: "Fundador & Especialista" 
    },
  ]);

  const { data: configData, isLoading } = useQuery({
    queryKey: ["about-us"],
    queryFn: () => aboutUsActions.get(),
    enabled: !!user,
  });

  useEffect(() => {
    if (configData?.result) {
      const { result } = configData;
      setHeaderBadge(result.headerBadge || "QUEM SOMOS");
      setHeaderTitle(result.headerTitle || "Mais de 20 anos de expertise em Comércio Exterior");
      setHeaderDescription(result.headerDescription || "");
      setPrimaryButtonText(result.primaryButtonText || "Conheça nossa história");
      setSecondaryButtonText(result.secondaryButtonText || "Fale conosco");
      setFeatures(result.differentials || []);
      setAchievements(result.achievements || []);
    }
  }, [configData]);

  const mutation = useMutation({
    mutationFn: (data: any) => aboutUsActions.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about-us"] });
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
      primaryButtonText,
      secondaryButtonText,
      differentials: features,
      achievements
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEndFeatures = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setFeatures((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDragEndAchievements = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setAchievements((items) => {
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
        <h1 className="text-3xl font-bold tracking-tight text-emerald-950">Quem Somos</h1>
        <p className="text-emerald-900/60 font-medium">
          Configure a seção de expertise e diferenciais da empresa exibida na página inicial.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-8">
          <Card className="border-none shadow-sm overflow-hidden h-fit">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <Layout className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Conteúdo Principal</CardTitle>
              </div>
              <CardDescription className="text-emerald-800/60 font-medium">
                Textos introdutórios e botões de CTA.
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
                <Textarea 
                  maxLength={250} 
                  value={headerTitle} 
                  onChange={(e) => setHeaderTitle(e.target.value)}
                  className="min-h-[80px] border-emerald-100 focus-visible:ring-emerald-500 text-lg font-semibold" 
                />
              </div>

              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Subtítulo / Descrição</Label>
                <Textarea 
                  maxLength={250} 
                  value={headerDescription} 
                  onChange={(e) => setHeaderDescription(e.target.value)}
                  className="min-h-[120px] border-emerald-100 focus-visible:ring-emerald-500" 
                />
              </div>

              <Separator className="bg-emerald-50 my-2" />

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Botão Primário</Label>
                  <Input 
                    maxLength={80} 
                    value={primaryButtonText} 
                    onChange={(e) => setPrimaryButtonText(e.target.value)}
                    className="border-emerald-100 focus-visible:ring-emerald-500" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Botão Secundário</Label>
                  <Input 
                    maxLength={80} 
                    value={secondaryButtonText} 
                    onChange={(e) => setSecondaryButtonText(e.target.value)}
                    className="border-emerald-100 focus-visible:ring-emerald-500" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm overflow-hidden h-fit">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Lista de Diferenciais</CardTitle>
              </div>
              <CardDescription className="text-emerald-800/60 font-medium">
                Os 3 cards exibidos na coluna da esquerda. Arraste para reordenar.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-1">
              <DndContext id="dnd-about-features" sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndFeatures}>
                <SortableContext items={features} strategy={verticalListSortingStrategy}>
                  {features.map((feature) => (
                    <SortableItem key={feature.id} id={feature.id}>
                      <div className="flex flex-col gap-2 bg-white p-3 border border-emerald-50 rounded-lg shadow-sm">
                        <Input maxLength={80} value={feature.title} 
                          onChange={(e) => {
                            const newFeatures = [...features];
                            const idx = newFeatures.findIndex(f => f.id === feature.id);
                            newFeatures[idx].title = e.target.value;
                            setFeatures(newFeatures);
                          }}
                          placeholder="Título"
                          className="border-emerald-100 focus-visible:ring-emerald-500 font-bold" 
                        />
                        <Input maxLength={80} value={feature.desc} 
                          onChange={(e) => {
                            const newFeatures = [...features];
                            const idx = newFeatures.findIndex(f => f.id === feature.id);
                            newFeatures[idx].desc = e.target.value;
                            setFeatures(newFeatures);
                          }}
                          placeholder="Descrição"
                          className="border-emerald-100 focus-visible:ring-emerald-500 text-xs" 
                        />
                      </div>
                    </SortableItem>
                  ))}
                </SortableContext>
              </DndContext>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="border-none shadow-sm overflow-hidden h-fit">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Conquistas e Marcos</CardTitle>
              </div>
              <CardDescription className="text-emerald-800/60 font-medium">
                Os 4 cards em destaque exibidos na coluna da direita. Arraste para reordenar.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-1">
              <DndContext id="dnd-about-achievements" sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndAchievements}>
                <SortableContext items={achievements} strategy={verticalListSortingStrategy}>
                  {achievements.map((achievement) => (
                    <SortableItem key={achievement.id} id={achievement.id}>
                      <div className="flex flex-col gap-2 bg-white p-3 border border-emerald-50 rounded-lg shadow-sm">
                        <Input maxLength={80} value={achievement.title} 
                          onChange={(e) => {
                            const newAchievements = [...achievements];
                            const idx = newAchievements.findIndex(a => a.id === achievement.id);
                            newAchievements[idx].title = e.target.value;
                            setAchievements(newAchievements);
                          }}
                          placeholder="Título / Marco"
                          className="border-emerald-100 focus-visible:ring-emerald-500 font-bold" 
                        />
                        <Input maxLength={80} value={achievement.desc} 
                          onChange={(e) => {
                            const newAchievements = [...achievements];
                            const idx = newAchievements.findIndex(a => a.id === achievement.id);
                            newAchievements[idx].desc = e.target.value;
                            setAchievements(newAchievements);
                          }}
                          placeholder="Descrição"
                          className="border-emerald-100 focus-visible:ring-emerald-500 text-xs" 
                        />
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
          onClick={() => queryClient.invalidateQueries({ queryKey: ["about-us"] })}
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
