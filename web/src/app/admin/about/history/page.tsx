"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Save, 
  Layout, 
  History,
  GripVertical,
  Plus,
  Trash2
} from "lucide-react";

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
import { Separator } from "@/components/ui/separator";

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
      className={`group flex gap-3 p-4 rounded-xl border border-transparent transition-all ${
        isDragging ? "bg-emerald-50 border-emerald-200 shadow-lg scale-[1.02]" : "hover:border-emerald-50 hover:bg-emerald-50/30"
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-emerald-900/20 group-hover:text-emerald-600 transition-colors mt-2"
      >
        <GripVertical size={20} />
      </div>
      <div className="flex-1 w-full">
        {children}
      </div>
    </div>
  );
}

export default function AboutHistoryConfig() {
  const [timeline, setTimeline] = useState([
    { id: "t-1", year: "2003", text: "Fundação da AVANTCARGO em Curitiba por especialistas do setor." },
    { id: "t-2", year: "2008", text: "Expansão para atendimento nacional com equipe especializada." },
    { id: "t-3", year: "2015", text: "Marca de 200+ processos de Ex-Tarifário aprovados no MDIC." },
    { id: "t-4", year: "2020", text: "R$ 300M+ em economia gerada para clientes." },
    { id: "t-5", year: "Hoje", text: "500+ processos aprovados / R$ 480M+ economizados / 98% aprovação." },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEndTimeline = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setTimeline((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addTimelineItem = () => {
    const newId = `t-${Date.now()}`;
    setTimeline([...timeline, { id: newId, year: "", text: "" }]);
  };

  const removeTimelineItem = (idToRemove: string) => {
    setTimeline(timeline.filter(t => t.id !== idToRemove));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-emerald-950">Introdução & História</h1>
        <p className="text-emerald-900/60 font-medium">
          Configure a chamada principal (Hero) e a linha do tempo da página Quem Somos.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-8 flex flex-col">
          
          {/* Cabeçalho Hero */}
          <Card className="border-none shadow-sm overflow-hidden h-fit">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <Layout className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Banner Principal (Hero)</CardTitle>
              </div>
              <CardDescription className="text-emerald-800/60 font-medium">
                Textos apresentados logo no topo da página.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Título (Parte Escura)</Label>
                <Input maxLength={60} defaultValue="Conheça a" className="border-emerald-100 focus-visible:ring-emerald-500 font-semibold" />
              </div>
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Título (Parte Laranja)</Label>
                <Input maxLength={60} defaultValue="AvantCargo" className="border-emerald-100 focus-visible:ring-emerald-500 font-semibold text-orange-600" />
              </div>

              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Descrição Abaixo do Título</Label>
                <Textarea maxLength={300} defaultValue="Mais de 20 anos de expertise em comércio exterior, ajudando empresas brasileiras a crescer de forma inteligente e competitiva no mercado global." className="min-h-[100px] border-emerald-100 focus-visible:ring-emerald-500" />
              </div>

              <Separator className="bg-emerald-50" />

              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider text-orange-600">Título: Nossa História</Label>
                <Input maxLength={120} defaultValue="Duas décadas de excelência em Comércio Exterior" className="border-emerald-100 focus-visible:ring-emerald-500" />
              </div>

              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Textos sobre a história (Parágrafos)</Label>
                <Textarea maxLength={800} defaultValue="A AVANTCARGO nasceu em Curitiba, no Paraná, com uma missão clara: tornar o comércio exterior mais acessível, inteligente e rentável para as empresas brasileiras. Desde 2003, nossa assessoria vem construindo um histórico de resultados sólidos e relacionamentos de longo prazo com nossos clientes." className="min-h-[200px] border-emerald-100 focus-visible:ring-emerald-500" />
              </div>

              <div className="flex justify-end gap-4 pt-4 mt-2 border-t border-emerald-50">
                <Button variant="outline" className="border-emerald-100 text-emerald-700 hover:bg-emerald-50 px-8">
                  Descartar
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 px-10">
                  <Save className="w-4 h-4 mr-2" />
                  Salvar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8 flex flex-col">
          {/* Linha do Tempo */}
          <Card className="border-none shadow-sm overflow-hidden flex-1 flex flex-col">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <History className="w-5 h-5 text-emerald-600" />
                    <CardTitle className="text-lg font-bold text-emerald-950">Linha do Tempo (Timeline)</CardTitle>
                  </div>
                  <CardDescription className="text-emerald-800/60 font-medium mt-1">
                    Lista incremental de anos e marcos históricos.
                  </CardDescription>
                </div>
                <Button onClick={addTimelineItem} size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 shrink-0">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Marco
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-1 flex-1">
              <DndContext id="dnd-about-history" sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndTimeline}>
                <SortableContext items={timeline} strategy={verticalListSortingStrategy}>
                  {timeline.map((item) => (
                    <SortableItem key={item.id} id={item.id}>
                      <div className="flex gap-4 bg-white p-4 border border-emerald-50 rounded-lg shadow-sm relative group/item">
                        <div className="w-32 space-y-1 shrink-0">
                          <Label className="text-emerald-900/70 font-semibold text-[10px]">Ano / Título</Label>
                          <Input 
                            maxLength={20}
                            hideCounter={true}
                            value={item.year} 
                            onChange={(e) => {
                              const newItems = [...timeline];
                              const idx = newItems.findIndex(i => i.id === item.id);
                              newItems[idx].year = e.target.value;
                              setTimeline(newItems);
                            }}
                            placeholder="Ex: 2003"
                            className="border-emerald-100 focus-visible:ring-emerald-500 font-bold" 
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <Label className="text-emerald-900/70 font-semibold text-[10px]">Descrição do Marco</Label>
                          <Textarea 
                            maxLength={150}
                            value={item.text} 
                            onChange={(e) => {
                              const newItems = [...timeline];
                              const idx = newItems.findIndex(i => i.id === item.id);
                              newItems[idx].text = e.target.value;
                              setTimeline(newItems);
                            }}
                            placeholder="Descreva o que aconteceu..."
                            className="min-h-[60px] border-emerald-100 focus-visible:ring-emerald-500" 
                          />
                        </div>
                        <Button 
                          onClick={() => removeTimelineItem(item.id)}
                          variant="ghost" 
                          size="icon" 
                          className="absolute -right-2 -top-2 text-red-400 hover:text-red-600 hover:bg-red-50 bg-white border border-red-100 shadow-sm opacity-0 group-hover/item:opacity-100 transition-opacity h-8 w-8 rounded-full"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </SortableItem>
                  ))}
                </SortableContext>
              </DndContext>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
