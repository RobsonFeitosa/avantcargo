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
  Layers, 
  GripVertical,
  Loader2
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { mainServicesActions } from "@/admin/actions/main-services.actions";
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

export default function MainServicesConfig() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [headerBadge, setHeaderBadge] = useState("O QUE FAZEMOS");
  const [headerTitle, setHeaderTitle] = useState("Principais Serviços");
  const [headerDescription, setHeaderDescription] = useState("Oferecemos soluções completas para integrar sua empresa ao mercado internacional com eficiência e segurança.");

  const [cards, setCards] = useState<{ id: string; badge: string; title: string; desc: string }[]>([
    { 
      id: "card-1", 
      badge: "MAIS POPULAR", 
      title: "Representação", 
      desc: "Soluções completas de Importação e Exportação com foco em agilidade, segurança e conformidade total em GRU e VCP." 
    },
    { 
      id: "card-2", 
      badge: "", 
      title: "Sistemas Comex", 
      desc: "Suporte especializado em E-awb e lançamentos no Portal Único, reduzindo burocracia e acelerando processos digitais." 
    },
    { 
      id: "card-3", 
      badge: "", 
      title: "Transporte & Logística", 
      desc: "Coleta, etiquetagem, pré-cadastro e entrega nos terminais com segurança e agilidade no pré-embarque internacional." 
    },
  ]);

  const { data: configData, isLoading } = useQuery({
    queryKey: ["main-services"],
    queryFn: () => mainServicesActions.get(),
    enabled: !!user,
  });

  useEffect(() => {
    if (configData?.result) {
      const { result } = configData;
      setHeaderBadge(result.headerBadge || "");
      setHeaderTitle(result.headerTitle || "");
      setHeaderDescription(result.headerDescription || "");
      setCards(result.services || []);
    }
  }, [configData]);

  const mutation = useMutation({
    mutationFn: (data: any) => mainServicesActions.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["main-services"] });
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
      services: cards
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEndCards = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setCards((items) => {
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
        <h1 className="text-3xl font-bold tracking-tight text-emerald-950">Principais Serviços</h1>
        <p className="text-emerald-900/60 font-medium">
          Configure a seção de serviços em destaque exibida logo abaixo do banner principal.
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
                Textos introdutórios exibidos acima dos cards.
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
                  className="min-h-[100px] border-emerald-100 focus-visible:ring-emerald-500" 
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Cards de Serviço</CardTitle>
              </div>
              <CardDescription className="text-emerald-800/60 font-medium">
                Edite e arraste para reordenar os 3 serviços em destaque.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-1">
              <DndContext id="dnd-service-cards" sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndCards}>
                <SortableContext items={cards} strategy={verticalListSortingStrategy}>
                  {cards.map((card, index) => (
                    <SortableItem key={card.id} id={card.id}>
                      <div className="flex flex-col gap-3 bg-white p-4 border border-emerald-50 rounded-lg shadow-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">Card {index + 1}</span>
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-emerald-900/70 font-semibold text-[10px]">Badge (Opcional)</Label>
                          <Input maxLength={80} value={card.badge} 
                            placeholder="Ex: MAIS POPULAR"
                            onChange={(e) => {
                              const newCards = [...cards];
                              const idx = newCards.findIndex(c => c.id === card.id);
                              newCards[idx].badge = e.target.value;
                              setCards(newCards);
                            }}
                            className="border-emerald-100 focus-visible:ring-emerald-500 text-xs" 
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-emerald-900/70 font-semibold text-[10px]">Título do Serviço</Label>
                          <Input maxLength={80} value={card.title} 
                            onChange={(e) => {
                              const newCards = [...cards];
                              const idx = newCards.findIndex(c => c.id === card.id);
                              newCards[idx].title = e.target.value;
                              setCards(newCards);
                            }}
                            className="border-emerald-100 focus-visible:ring-emerald-500 font-bold" 
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-emerald-900/70 font-semibold text-[10px]">Descrição</Label>
                          <Textarea maxLength={300} value={card.desc} 
                            onChange={(e) => {
                              const newCards = [...cards];
                              const idx = newCards.findIndex(c => c.id === card.id);
                              newCards[idx].desc = e.target.value;
                              setCards(newCards);
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
          onClick={() => queryClient.invalidateQueries({ queryKey: ["main-services"] })}
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
