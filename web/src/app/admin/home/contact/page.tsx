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
  CheckCircle2, 
  MousePointerClick,
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

export default function ContactCTAConfig() {
  const [features, setFeatures] = useState([
    { id: "feat-1", text: "Importação e Exportação" },
    { id: "feat-2", text: "Ex-Tarifários — alíquota pode chegar a 0%" },
    { id: "feat-3", text: "Drawback e Radar Siscomex" },
    { id: "feat-4", text: "Gestão Aduaneira completa" },
  ]);

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

  const addFeature = () => {
    const newId = `feat-${Date.now()}`;
    setFeatures([...features, { id: newId, text: "" }]);
  };

  const removeFeature = (idToRemove: string) => {
    setFeatures(features.filter(f => f.id !== idToRemove));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-emerald-950">Chamada para Ação (Contato)</h1>
        <p className="text-emerald-900/60 font-medium">
          Configure a seção final da página inicial que convida o usuário a entrar em contato.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-8">
          
          {/* Cabeçalho da Seção */}
          <Card className="border-none shadow-sm overflow-hidden h-fit">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <Layout className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Conteúdo Principal</CardTitle>
              </div>
              <CardDescription className="text-emerald-800/60 font-medium">
                Título e descrição exibidos no topo da seção de contato.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Título Principal</Label>
                <Input maxLength={120} defaultValue="Precisa de assessoria em Comércio Exterior?" className="border-emerald-100 focus-visible:ring-emerald-500 text-lg font-semibold" />
              </div>

              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Descrição</Label>
                <Textarea maxLength={300} defaultValue="Fale agora com um especialista AVANTCARGO. Atendemos empresas de todo o Brasil com agilidade, competência e mais de 20 anos de experiência." className="min-h-[100px] border-emerald-100 focus-visible:ring-emerald-500" />
              </div>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <Card className="border-none shadow-sm overflow-hidden h-fit">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <MousePointerClick className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Botões e Links</CardTitle>
              </div>
              <CardDescription className="text-emerald-800/60 font-medium">
                Configure os textos e links dos botões de contato.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  <Label className="font-bold text-emerald-950">Botão Principal (WhatsApp)</Label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-emerald-900/70 font-semibold text-[10px]">Texto do Botão</Label>
                    <Input maxLength={40} defaultValue="Falar no WhatsApp" className="border-emerald-100 focus-visible:ring-emerald-500" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-emerald-900/70 font-semibold text-[10px]">Link (URL ou Número)</Label>
                    <Input maxLength={100} defaultValue="https://wa.me/5511964503217" className="border-emerald-100 focus-visible:ring-emerald-500" />
                  </div>
                </div>
              </div>

              <Separator className="bg-emerald-50" />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-600" />
                  <Label className="font-bold text-emerald-950">Botão Secundário (Telefone)</Label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-emerald-900/70 font-semibold text-[10px]">Texto do Botão</Label>
                    <Input maxLength={40} defaultValue="(11) 96450-3217" className="border-emerald-100 focus-visible:ring-emerald-500" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-emerald-900/70 font-semibold text-[10px]">Link (tel:)</Label>
                    <Input maxLength={100} defaultValue="tel:+5511964503217" className="border-emerald-100 focus-visible:ring-emerald-500" />
                  </div>
                </div>
              </div>

              <Separator className="bg-emerald-50" />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Label className="font-bold text-emerald-950">Link de Texto Inferior</Label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-emerald-900/70 font-semibold text-[10px]">Texto do Link</Label>
                    <Input maxLength={60} defaultValue="Ou envie uma mensagem" className="border-emerald-100 focus-visible:ring-emerald-500" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-emerald-900/70 font-semibold text-[10px]">Link de Destino</Label>
                    <Input maxLength={100} defaultValue="/contato" className="border-emerald-100 focus-visible:ring-emerald-500" />
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Lista de Tópicos (Checkmarks) */}
          <Card className="border-none shadow-sm overflow-hidden h-fit">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <CardTitle className="text-lg font-bold text-emerald-950">Tópicos de Destaque</CardTitle>
                  </div>
                  <CardDescription className="text-emerald-800/60 font-medium mt-1">
                    Lista de benefícios ou serviços exibidos abaixo da descrição.
                  </CardDescription>
                </div>
                <Button onClick={addFeature} size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 shrink-0">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Tópico
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-1">
              <DndContext id="dnd-contact-features" sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndFeatures}>
                <SortableContext items={features} strategy={verticalListSortingStrategy}>
                  {features.map((feature) => (
                    <SortableItem key={feature.id} id={feature.id}>
                      <div className="flex gap-2 bg-white p-2 border border-emerald-50 rounded-lg shadow-sm items-center relative group/item">
                        <Input 
                          maxLength={100}
                          value={feature.text} 
                          onChange={(e) => {
                            const newFeatures = [...features];
                            const idx = newFeatures.findIndex(f => f.id === feature.id);
                            newFeatures[idx].text = e.target.value;
                            setFeatures(newFeatures);
                          }}
                          placeholder="Texto do tópico..."
                          className="border-emerald-100 focus-visible:ring-emerald-500 font-medium flex-1 pr-10" 
                        />
                        <Button 
                          onClick={() => removeFeature(feature.id)}
                          variant="ghost" 
                          size="icon" 
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-red-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover/item:opacity-100 transition-opacity h-8 w-8"
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
