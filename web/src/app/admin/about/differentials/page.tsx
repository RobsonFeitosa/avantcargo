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
  Star,
  GripVertical,
  Plus,
  Trash2,
  Search
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
      className={`group flex gap-4 p-5 rounded-xl border border-transparent transition-all ${
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

export default function AboutDifferentialsConfig() {
  const [differentials, setDifferentials] = useState([
    { id: "d-1", icon: "Star", title: "Especialistas em Ex-Tarifário", desc: "Somos referência nacional no mecanismo do Ex-Tarifário." },
    { id: "d-2", icon: "Users", title: "Equipe multidisciplinar", desc: "Advogados tributaristas, especialistas em comércio exterior, trabalhando em conjunto." },
    { id: "d-3", icon: "MapPin", title: "Presença nacional", desc: "Sediada em Curitiba, atendemos empresas em todo o território nacional." },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEndDiff = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setDifferentials((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addDiff = () => {
    const newId = `d-${Date.now()}`;
    setDifferentials([...differentials, { id: newId, icon: "CheckCircle2", title: "", desc: "" }]);
  };

  const removeDiff = (idToRemove: string) => {
    setDifferentials(differentials.filter(d => d.id !== idToRemove));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-emerald-950">Nossos Diferenciais</h1>
        <p className="text-emerald-900/60 font-medium">
          Gerencie os diferenciais competitivos da AvantCargo exibidos no site.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Textos Principais */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="border-none shadow-sm h-fit">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <Layout className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Textos do Bloco</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Badge (Pílula)</Label>
                <Input maxLength={40} defaultValue="Por que a AVANTCARGO?" className="border-emerald-100" />
              </div>
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Título (Parte 1)</Label>
                <Input maxLength={60} defaultValue="Nossos" className="border-emerald-100" />
              </div>
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Palavra em Destaque (Parte 2)</Label>
                <Input maxLength={40} defaultValue="diferenciais" className="border-emerald-100 text-emerald-600 font-bold" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Diferenciais */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="border-none shadow-sm overflow-hidden flex-1 flex flex-col h-full">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-emerald-600" />
                  <CardTitle className="text-lg font-bold text-emerald-950">Grid de Diferenciais</CardTitle>
                </div>
                <Button onClick={addDiff} size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 shrink-0">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Diferencial
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-2">
              <DndContext id="dnd-diffs" sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndDiff}>
                <SortableContext items={differentials} strategy={verticalListSortingStrategy}>
                  {differentials.map((item, index) => (
                    <SortableItem key={item.id} id={item.id}>
                      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 border border-emerald-50 rounded-xl shadow-sm relative group/item">
                        <div className="sm:w-20 flex flex-col items-center justify-center bg-slate-50 rounded-lg p-2 border border-slate-100 shrink-0">
                          <span className="text-xs font-bold text-slate-400 uppercase">Posição</span>
                          <span className="text-2xl font-black text-slate-300">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <div className="sm:w-32 space-y-1 shrink-0">
                          <div className="flex items-center justify-between">
                            <Label className="text-emerald-900/70 font-semibold text-[10px]">Nome do Ícone</Label>
                            <a href="https://lucide.dev/icons" target="_blank" rel="noopener noreferrer" className="text-[9px] text-emerald-600 hover:underline flex items-center gap-1">
                              <Search size={10} /> Consultar
                            </a>
                          </div>
                          <Input 
                            maxLength={30}
                            value={item.icon} 
                            onChange={(e) => {
                              const newItems = [...differentials];
                              const idx = newItems.findIndex(i => i.id === item.id);
                              newItems[idx].icon = e.target.value;
                              setDifferentials(newItems);
                            }}
                            placeholder="Ex: Star"
                            className="border-emerald-100" 
                          />
                        </div>
                        <div className="flex-1 space-y-4">
                          <div className="space-y-1">
                            <Label className="text-emerald-900/70 font-semibold text-[10px]">Título do Diferencial</Label>
                            <Input 
                              maxLength={50}
                              value={item.title} 
                              onChange={(e) => {
                                const newItems = [...differentials];
                                const idx = newItems.findIndex(i => i.id === item.id);
                                newItems[idx].title = e.target.value;
                                setDifferentials(newItems);
                              }}
                              className="border-emerald-100 font-bold text-emerald-950" 
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-emerald-900/70 font-semibold text-[10px]">Descrição Curta</Label>
                            <Textarea 
                              maxLength={160}
                              value={item.desc} 
                              onChange={(e) => {
                                const newItems = [...differentials];
                                const idx = newItems.findIndex(i => i.id === item.id);
                                newItems[idx].desc = e.target.value;
                                setDifferentials(newItems);
                              }}
                              className="min-h-[80px] border-emerald-100" 
                            />
                          </div>
                        </div>
                        <Button 
                          onClick={() => removeDiff(item.id)}
                          variant="ghost" 
                          size="icon" 
                          className="absolute -right-3 -top-3 text-red-400 hover:text-red-600 hover:bg-red-50 bg-white border border-red-100 shadow-sm opacity-0 group-hover/item:opacity-100 transition-opacity h-8 w-8 rounded-full z-10"
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

      <div className="flex justify-end gap-4 border-t border-emerald-50 pt-8 mt-4">
        <Button variant="outline" className="border-emerald-100 text-emerald-700 hover:bg-emerald-50 px-8">
          Descartar
        </Button>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 px-10">
          <Save className="w-4 h-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
}
