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
  HeartHandshake,
  GripVertical,
  Plus,
  Trash2,
  Shield,
  Search,
  Handshake,
  Zap,
  Lightbulb,
  MessageSquare,
  Loader2,
  HelpCircle
} from "lucide-react";
import * as LucideIcons from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { aboutUsActions } from "@/admin/actions/about-us.actions";
import { useAuth } from "@/admin/hooks_generic/providers/auth";
import { toast } from "sonner";

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

export default function AboutValuesConfig() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [valuesBadge, setValuesBadge] = useState("");
  const [valuesTitle1, setValuesTitle1] = useState("");
  const [valuesTitleHighlight, setValuesTitleHighlight] = useState("");

  const [values, setValues] = useState<{ id: string; icon: string; title: string; desc: string }[]>([]);

  const { data: configData, isLoading } = useQuery({
    queryKey: ["about-us-values"],
    queryFn: () => aboutUsActions.get(),
    enabled: !!user,
  });

  useEffect(() => {
    if (configData?.result) {
      const { result } = configData;
      setValuesBadge(result.valuesBadge || "");
      setValuesTitle1(result.valuesTitle1 || "");
      setValuesTitleHighlight(result.valuesTitleHighlight || "");
      setValues(result.valuesList || []);
    }
  }, [configData]);

  const mutation = useMutation({
    mutationFn: (data: any) => aboutUsActions.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about-us-values"] });
      toast.success("Configurações salvas com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao salvar configurações.");
    }
  });

  const handleSave = () => {
    mutation.mutate({
      valuesBadge,
      valuesTitle1,
      valuesTitleHighlight,
      valuesList: values
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEndValues = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setValues((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addValue = () => {
    const newId = `v-${Date.now()}`;
    setValues([...values, { id: newId, icon: "Star", title: "", desc: "" }]);
  };

  const removeValue = (idToRemove: string) => {
    setValues(values.filter(v => v.id !== idToRemove));
  };

  const availableIcons = Object.keys(LucideIcons).filter(key => 
    /^[A-Z][a-zA-Z0-9]+$/.test(key) && 
    key !== "LucideProps" && 
    key !== "Icon" && 
    key !== "Icons" &&
    key !== "createLucideIcon" &&
    key !== "default" &&
    !key.endsWith("Icon")
  );

  const IconPicker = ({ currentIcon, onSelect }: { currentIcon: string, onSelect: (icon: string) => void }) => {
    const IconComponent = (LucideIcons as any)[currentIcon] || HelpCircle;
    const [search, setSearch] = useState("");

    const filteredIcons = availableIcons.filter(icon => icon.toLowerCase().includes(search.toLowerCase()));
    const displayIcons = filteredIcons.slice(0, 100);

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="w-10 h-10 border-emerald-100 text-emerald-600 shrink-0">
            <IconComponent size={20} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-2 flex flex-col gap-2">
          <Input 
            placeholder="Pesquisar ícone..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="h-8 text-xs border-emerald-100"
          />
          <div className="max-h-64 overflow-y-auto pr-1">
            <div className="grid grid-cols-6 gap-2">
              {displayIcons.map((iconName) => {
                const Icon = (LucideIcons as any)[iconName];
                if (!Icon) return null;
                return (
                  <Button
                    key={iconName}
                    variant="ghost"
                    size="icon"
                    onClick={() => { onSelect(iconName); setSearch(""); }}
                    className={currentIcon === iconName ? "bg-emerald-50 text-emerald-600" : ""}
                    title={iconName}
                  >
                    <Icon size={18} />
                  </Button>
                );
              })}
            </div>
            {filteredIcons.length > 100 && (
              <p className="text-[10px] text-center text-emerald-600/60 mt-3 pb-1">
                +{filteredIcons.length - 100} ícones. Continue digitando...
              </p>
            )}
            {filteredIcons.length === 0 && (
              <p className="text-[10px] text-center text-emerald-600/60 mt-3 pb-1">
                Nenhum ícone encontrado.
              </p>
            )}
          </div>
        </PopoverContent>
      </Popover>
    );
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
        <h1 className="text-3xl font-bold tracking-tight text-emerald-950">Nossos Valores</h1>
        <p className="text-emerald-900/60 font-medium">
          Gerencie os pilares que guiam a empresa (Grid de ícones na página Quem Somos).
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
                <Input 
                  maxLength={40} 
                  value={valuesBadge} 
                  onChange={(e) => setValuesBadge(e.target.value)}
                  className="border-emerald-100" 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Título (Parte 1)</Label>
                <Input 
                  maxLength={60} 
                  value={valuesTitle1} 
                  onChange={(e) => setValuesTitle1(e.target.value)}
                  className="border-emerald-100" 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Palavra em Destaque (Parte 2)</Label>
                <Input 
                  maxLength={40} 
                  value={valuesTitleHighlight} 
                  onChange={(e) => setValuesTitleHighlight(e.target.value)}
                  className="border-emerald-100 text-emerald-600 font-bold" 
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Valores */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="border-none shadow-sm overflow-hidden flex-1 flex flex-col h-full">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 text-emerald-600" />
                  <CardTitle className="text-lg font-bold text-emerald-950">Grid de Valores (Cards)</CardTitle>
                </div>
                <Button onClick={addValue} size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 shrink-0">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Valor
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-2">
              <DndContext id="dnd-values" sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndValues}>
                <SortableContext items={values} strategy={verticalListSortingStrategy}>
                  {values.map((item) => (
                    <SortableItem key={item.id} id={item.id}>
                      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 border border-emerald-50 rounded-xl shadow-sm relative group/item">
                        <div className="sm:w-32 space-y-1 shrink-0">
                          <div className="flex items-center justify-between">
                            <Label className="text-emerald-900/70 font-semibold text-[10px]">Nome do Ícone</Label>
                          </div>
                          <IconPicker 
                            currentIcon={item.icon}
                            onSelect={(newIcon) => {
                              const newItems = [...values];
                              const idx = newItems.findIndex(i => i.id === item.id);
                              newItems[idx].icon = newIcon;
                              setValues(newItems);
                            }}
                          />
                        </div>
                        <div className="flex-1 space-y-4">
                          <div className="space-y-1">
                            <Label className="text-emerald-900/70 font-semibold text-[10px]">Título do Valor</Label>
                            <Input 
                              maxLength={50}
                              value={item.title} 
                              onChange={(e) => {
                                const newItems = [...values];
                                const idx = newItems.findIndex(i => i.id === item.id);
                                newItems[idx].title = e.target.value;
                                setValues(newItems);
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
                                const newItems = [...values];
                                const idx = newItems.findIndex(i => i.id === item.id);
                                newItems[idx].desc = e.target.value;
                                setValues(newItems);
                              }}
                              className="min-h-[80px] border-emerald-100" 
                            />
                          </div>
                        </div>
                        <Button 
                          onClick={() => removeValue(item.id)}
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
        <Button 
          variant="outline" 
          className="border-emerald-100 text-emerald-700 hover:bg-emerald-50 px-8"
          onClick={() => queryClient.invalidateQueries({ queryKey: ["about-us-values"] })}
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
