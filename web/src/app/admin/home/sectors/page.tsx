"use client";

import { useEffect, useState } from "react";
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
  ExternalLink,
  Loader2,
  Plus,
  Trash2,
  Search,
  Users,
  Shield,
  Globe,
  Zap,
  Clock,
  Box,
  Building,
  Truck,
  Target,
  Hammer,
  RefreshCw,
  Pill,
  HelpCircle
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { sectorsActions } from "@/admin/actions/home-sections.actions";
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
      className={`group flex items-center gap-3 p-3 rounded-xl border border-transparent transition-all ${isDragging ? "bg-emerald-50 border-emerald-200 shadow-lg scale-[1.02]" : "hover:border-emerald-50 hover:bg-emerald-50/30"
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
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [headerBadge, setHeaderBadge] = useState("");
  const [headerTitle, setHeaderTitle] = useState("");
  const [headerDescription, setHeaderDescription] = useState("");

  const [sectors, setSectors] = useState([]);

  const { data: configData, isLoading } = useQuery({
    queryKey: ["sectors"],
    queryFn: () => sectorsActions.get(),
    enabled: !!user,
  });

  useEffect(() => {
    if (configData?.result) {
      const { result } = configData;
      setHeaderBadge(result.headerBadge || "");
      setHeaderTitle(result.headerTitle || "");
      setHeaderDescription(result.headerDescription || "");
      setSectors(result.sectors || []);
    }
  }, [configData]);

  const mutation = useMutation({
    mutationFn: (data: any) => sectorsActions.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sectors"] });
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
      sectors
    });
  };

  const addSector = () => {
    // Usando crypto.randomUUID() ou um timestamp mais preciso para o ID
    const newId = Date.now().toString(36) + Math.random().toString(36).substring(2);
    setSectors([...sectors, {
      id: newId,
      title: "NOVO SETOR",
      iconName: "Box",
      desc: ""
    }]);

    toast.info("Novo setor adicionado ao final da lista");
  };

  const removeSector = (id: string) => {
    setSectors(sectors.filter(s => s.id !== id));
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
        <h1 className="text-3xl font-bold tracking-tight text-emerald-950">Setores</h1>
        <p className="text-emerald-900/60 font-medium">
          Configure a seção de segmentos e setores atendidos da página inicial.
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
                Textos introdutórios exibidos acima do grid de setores.
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Component className="w-5 h-5 text-emerald-600" />
                  <CardTitle className="text-lg font-bold text-emerald-950">Grid de Setores</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={addSector}
                    size="sm"
                    variant="outline"
                    className="h-8 border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    <Plus size={14} className="mr-1" /> Adicionar
                  </Button>
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
                        <IconPicker
                          currentIcon={sector.iconName}
                          onSelect={(newIcon) => {
                            const newSectors = [...sectors];
                            const idx = newSectors.findIndex(s => s.id === sector.id);
                            newSectors[idx].iconName = newIcon;
                            setSectors(newSectors);
                          }}
                        />
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
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-300 hover:text-red-500 hover:bg-red-50"
                          onClick={() => removeSector(sector.id)}
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
          onClick={() => queryClient.invalidateQueries({ queryKey: ["sectors"] })}
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
