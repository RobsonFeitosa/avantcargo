"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import * as LucideIcons from "lucide-react";
import { 
  Save, 
  Layout, 
  Component, 
  GripVertical,
  ExternalLink
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

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

const DynamicIcon = ({ name, className, size = 20 }: { name: string, className?: string, size?: number }) => {
  const Icon = (LucideIcons as any)[name];
  return Icon ? <Icon className={className} size={size} /> : <LucideIcons.HelpCircle className={className} size={size} />;
};

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
      className={`group flex items-center gap-3 p-3 rounded-xl border border-transparent transition-all ${
        isDragging ? "bg-emerald-50 border-emerald-200 shadow-lg scale-[1.02]" : "hover:border-emerald-50 hover:bg-emerald-50/30"
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-emerald-900/20 group-hover:text-emerald-600 transition-colors"
      >
        <GripVertical size={20} />
      </div>
      <div className="flex-1 w-full">
        {children}
      </div>
    </div>
  );
}

export default function SectorsConfig() {
  const [sectors, setSectors] = useState([
    { id: "sec-1", title: "AGENTES DE CARGA", icon: "Users" },
    { id: "sec-2", title: "COMISSÁRIAS", icon: "Shield" },
    { id: "sec-3", title: "CARGAS AÉREAS", icon: "Globe" },
    { id: "sec-4", title: "CARGAS PERIGOSAS", icon: "Zap" },
    { id: "sec-5", title: "CARGAS URGENTES", icon: "Clock" },
    { id: "sec-6", title: "CARGAS DE PROJETO", icon: "Box" },
    { id: "sec-7", title: "IMPORTADORES", icon: "Building" },
    { id: "sec-8", title: "EXPORTADORES", icon: "Truck" },
    { id: "sec-9", title: "GRU AIRPORT", icon: "Target" },
    { id: "sec-10", title: "VIRACOPOS (VCP)", icon: "Target" },
    { id: "sec-11", title: "OPERAÇÕES COMPLEXAS", icon: "Hammer" },
    { id: "sec-12", title: "LOGÍSTICA REVERSA", icon: "RefreshCw" },
    { id: "sec-13", title: "PHARMA", icon: "Pill" },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEndSectors = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setSectors((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-emerald-950">Setores</h1>
        <p className="text-emerald-900/60 font-medium">
          Configure a seção de segmentos e setores atendidos da página inicial.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-8">
          {/* Cabeçalho da Seção */}
          <Card className="border-none shadow-sm overflow-hidden h-fit">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <Layout className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Cabeçalho da Seção</CardTitle>
              </div>
              <CardDescription className="text-emerald-800/60 font-medium">
                Textos introdutórios exibidos acima do grid de setores.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Badge Superior</Label>
                <Input maxLength={80} defaultValue="SEGMENTOS" className="border-emerald-100 focus-visible:ring-emerald-500" />
              </div>
              
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Título Principal</Label>
                <Input maxLength={80} defaultValue="Setores que atendemos" className="border-emerald-100 focus-visible:ring-emerald-500 text-lg font-semibold" />
              </div>

              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Subtítulo / Descrição</Label>
                <Textarea maxLength={250} defaultValue="Soluções logísticas integradas e personalizadas para as demandas mais exigentes do mercado global." className="min-h-[100px] border-emerald-100 focus-visible:ring-emerald-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Lista de Setores */}
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Component className="w-5 h-5 text-emerald-600" />
                  <CardTitle className="text-lg font-bold text-emerald-950">Grid de Setores</CardTitle>
                </div>
                <a 
                  href="https://lucide.dev/icons" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 hover:text-emerald-700 hover:underline bg-emerald-100/50 px-2 py-1 rounded-md transition-colors"
                >
                  <ExternalLink size={12} />
                  Consultar Ícones
                </a>
              </div>
              <CardDescription className="text-emerald-800/60 font-medium">
                Edite os nomes dos setores e o ícone correspondente. O ícone será atualizado em tempo real.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-1">
              <DndContext id="dnd-sectors" sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndSectors}>
                <SortableContext items={sectors} strategy={verticalListSortingStrategy}>
                  {sectors.map((sector) => (
                    <SortableItem key={sector.id} id={sector.id}>
                      <div className="flex gap-3 bg-white p-2 border border-emerald-50 rounded-lg shadow-sm items-center">
                        <div className="w-8 h-8 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                          <DynamicIcon name={sector.icon} size={18} />
                        </div>
                        <Input maxLength={80} value={sector.title} 
                          onChange={(e) => {
                            const newSectors = [...sectors];
                            const idx = newSectors.findIndex(s => s.id === sector.id);
                            newSectors[idx].title = e.target.value;
                            setSectors(newSectors);
                          }}
                          placeholder="Nome do Setor"
                          className="border-emerald-100 focus-visible:ring-emerald-500 font-bold flex-1" 
                        />
                        <Input maxLength={80} value={sector.icon} 
                          onChange={(e) => {
                            const newSectors = [...sectors];
                            const idx = newSectors.findIndex(s => s.id === sector.id);
                            newSectors[idx].icon = e.target.value;
                            setSectors(newSectors);
                          }}
                          placeholder="Ex: Users"
                          className="border-emerald-100 focus-visible:ring-emerald-500 text-xs w-32" 
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
