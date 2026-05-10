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
  ListChecks, 
  BarChart3, 
  MousePointer2, 
  GripVertical,
  Trash2,
  Plus,
  Loader2
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { mainBannerActions } from "@/admin/actions/main-banner.actions";
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
      className={`group flex items-start gap-3 p-3 rounded-xl border border-transparent transition-all ${
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
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}

export default function MainBannerConfig() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Hero State
  const [heroBadge, setHeroBadge] = useState("");
  const [heroTitle, setHeroTitle] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [heroPrimaryBtn, setHeroPrimaryBtn] = useState("");
  const [heroSecondaryBtn, setHeroSecondaryBtn] = useState("");
  const [servicesSectionTitle, setServicesSectionTitle] = useState("");

  // Dynamic States
  const [features, setFeatures] = useState<{ id: string; text: string }[]>([]);

  const [services, setServices] = useState<{ id: string; title: string; desc: string }[]>([]);

  const [stats, setStats] = useState<{ id: string; value: string; label: string }[]>([]);

  const [secondaryStats, setSecondaryStats] = useState<{ id: string; value: string; label: string }[]>([]);

  const { data: configData, isLoading } = useQuery({
    queryKey: ["main-banner"],
    queryFn: () => mainBannerActions.get(),
    enabled: !!user,
  });

  useEffect(() => {
    if (configData?.result) {
      const { result } = configData;
      setHeroBadge(result.heroBadge || "");
      setHeroTitle(result.heroTitle || "");
      setHeroDescription(result.heroDescription || "");
      setHeroPrimaryBtn(result.heroPrimaryButtonText || "");
      setHeroSecondaryBtn(result.heroSecondaryButtonText || "");
      setServicesSectionTitle(result.servicesSectionTitle || "");
      setFeatures(result.features || []);
      setServices(result.services || []);
      setStats(result.stats || []);
      setSecondaryStats(result.footer_stats || []);
    }
  }, [configData]);

  const mutation = useMutation({
    mutationFn: (data: any) => mainBannerActions.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["main-banner"] });
      toast.success("Configurações salvas com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao salvar configurações.");
    }
  });

  const handleSave = () => {
    mutation.mutate({
      heroBadge,
      heroTitle,
      heroDescription,
      heroPrimaryButtonText: heroPrimaryBtn,
      heroSecondaryButtonText: heroSecondaryBtn,
      servicesSectionTitle,
      features,
      services,
      stats,
      footer_stats: secondaryStats
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

  const handleDragEndServices = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setServices((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDragEndStats = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setStats((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDragEndSecondaryStats = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setSecondaryStats((items) => {
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
        <h1 className="text-3xl font-bold tracking-tight text-emerald-950">Banner Principal</h1>
        <p className="text-emerald-900/60 font-medium">
          Configure e ordene as informações do banner principal da página inicial.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-8">
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <Layout className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Conteúdo Principal (Hero)</CardTitle>
              </div>
              <CardDescription className="text-emerald-800/60 font-medium">Título e subtítulo.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Badge Superior</Label>
                <Input 
                  maxLength={80} 
                  value={heroBadge} 
                  onChange={(e) => setHeroBadge(e.target.value)}
                  className="border-emerald-100 focus-visible:ring-emerald-500" 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Título Principal</Label>
                <Textarea 
                  maxLength={250} 
                  value={heroTitle} 
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="min-h-[80px] border-emerald-100 focus-visible:ring-emerald-500" 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Subtítulo / Descrição</Label>
                <Textarea 
                  maxLength={250} 
                  value={heroDescription} 
                  onChange={(e) => setHeroDescription(e.target.value)}
                  className="min-h-[120px] border-emerald-100 focus-visible:ring-emerald-500" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Botão Primário</Label>
                  <Input 
                    maxLength={80} 
                    value={heroPrimaryBtn} 
                    onChange={(e) => setHeroPrimaryBtn(e.target.value)}
                    className="border-emerald-100 focus-visible:ring-emerald-500" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Botão Secundário</Label>
                  <Input 
                    maxLength={80} 
                    value={heroSecondaryBtn} 
                    onChange={(e) => setHeroSecondaryBtn(e.target.value)}
                    className="border-emerald-100 focus-visible:ring-emerald-500" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <MousePointer2 className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Destaques Inferiores</CardTitle>
              </div>
              <CardDescription className="text-emerald-800/60 font-medium">Arraste para reordenar os 3 itens.</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-2">
              <DndContext id="dnd-features" sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndFeatures}>
                <SortableContext items={features} strategy={verticalListSortingStrategy}>
                  {features.map((item) => (
                    <SortableItem key={item.id} id={item.id}>
                      <Input maxLength={80} value={item.text} 
                        onChange={(e) => {
                          const newFeatures = [...features];
                          const index = newFeatures.findIndex(f => f.id === item.id);
                          newFeatures[index].text = e.target.value;
                          setFeatures(newFeatures);
                        }}
                        className="border-emerald-100 focus-visible:ring-emerald-500 bg-white" 
                      />
                    </SortableItem>
                  ))}
                </SortableContext>
              </DndContext>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <ListChecks className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Seção Lateral de Serviços</CardTitle>
              </div>
              <CardDescription className="text-emerald-800/60 font-medium">Ordene os serviços principais.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2 px-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Título da Seção</Label>
                <Input 
                  maxLength={80} 
                  value={servicesSectionTitle} 
                  onChange={(e) => setServicesSectionTitle(e.target.value)}
                  className="border-emerald-100 focus-visible:ring-emerald-500" 
                />
              </div>
              <Separator className="bg-emerald-50" />
              <div className="space-y-1">
                <DndContext id="dnd-services" sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndServices}>
                  <SortableContext items={services} strategy={verticalListSortingStrategy}>
                    {services.map((item) => (
                      <SortableItem key={item.id} id={item.id}>
                        <div className="grid gap-2 bg-white">
                          <Input maxLength={80} value={item.title} 
                            onChange={(e) => {
                              const newServices = [...services];
                              const index = newServices.findIndex(s => s.id === item.id);
                              newServices[index].title = e.target.value;
                              setServices(newServices);
                            }}
                            placeholder="Título" 
                            className="border-emerald-100 focus-visible:ring-emerald-500 font-bold" 
                          />
                          <Input maxLength={80} value={item.desc} 
                            onChange={(e) => {
                              const newServices = [...services];
                              const index = newServices.findIndex(s => s.id === item.id);
                              newServices[index].desc = e.target.value;
                              setServices(newServices);
                            }}
                            placeholder="Descrição" 
                            className="border-emerald-100 focus-visible:ring-emerald-500 text-xs" 
                          />
                        </div>
                      </SortableItem>
                    ))}
                  </SortableContext>
                </DndContext>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Indicadores (Stats)</CardTitle>
              </div>
              <CardDescription className="text-emerald-800/60 font-medium">Reordene os números de performance.</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-1">
              <DndContext id="dnd-stats" sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndStats}>
                <SortableContext items={stats} strategy={verticalListSortingStrategy}>
                  {stats.map((item) => (
                    <SortableItem key={item.id} id={item.id}>
                      <div className="flex gap-4 items-center bg-white">
                        <Input maxLength={80} value={item.value} 
                          onChange={(e) => {
                            const newStats = [...stats];
                            const index = newStats.findIndex(s => s.id === item.id);
                            newStats[index].value = e.target.value;
                            setStats(newStats);
                          }}
                          className="w-24 text-center font-bold border-emerald-100 focus-visible:ring-emerald-500" 
                        />
                        <Input maxLength={80} value={item.label} 
                          onChange={(e) => {
                            const newStats = [...stats];
                            const index = newStats.findIndex(s => s.id === item.id);
                            newStats[index].label = e.target.value;
                            setStats(newStats);
                          }}
                          className="flex-1 text-[11px] border-emerald-100 focus-visible:ring-emerald-500" 
                        />
                      </div>
                    </SortableItem>
                  ))}
                </SortableContext>
              </DndContext>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Indicadores de Rodapé</CardTitle>
              </div>
              <CardDescription className="text-emerald-800/60 font-medium">Reordene os indicadores que aparecem na parte inferior.</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-1">
              <DndContext id="dnd-secondary-stats" sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndSecondaryStats}>
                <SortableContext items={secondaryStats} strategy={verticalListSortingStrategy}>
                  {secondaryStats.map((item) => (
                    <SortableItem key={item.id} id={item.id}>
                      <div className="flex gap-4 items-center bg-white">
                        <Input maxLength={80} value={item.value} 
                          onChange={(e) => {
                            const newStats = [...secondaryStats];
                            const index = newStats.findIndex(s => s.id === item.id);
                            newStats[index].value = e.target.value;
                            setSecondaryStats(newStats);
                          }}
                          className="w-24 text-center font-bold border-emerald-100 focus-visible:ring-emerald-500" 
                        />
                        <Input maxLength={80} value={item.label} 
                          onChange={(e) => {
                            const newStats = [...secondaryStats];
                            const index = newStats.findIndex(s => s.id === item.id);
                            newStats[index].label = e.target.value;
                            setSecondaryStats(newStats);
                          }}
                          className="flex-1 text-[11px] border-emerald-100 focus-visible:ring-emerald-500" 
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
          onClick={() => queryClient.invalidateQueries({ queryKey: ["main-banner"] })}
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
