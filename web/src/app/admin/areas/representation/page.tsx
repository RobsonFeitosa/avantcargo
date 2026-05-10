"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Save, 
  Layout, 
  GripVertical,
  Plus,
  Trash2,
  Search,
  Upload,
  PlaneLanding,
  PlaneTakeoff,
  Loader2,
  Image as ImageIcon
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { airRepresentationActions } from "@/admin/actions/air-representation.actions";
import { toast } from "sonner";
import { useAuth } from "@/admin/hooks_generic/providers/auth";
import Image from "next/image";

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

export default function RepresentationConfig() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [headerConfig, setHeaderConfig] = useState({
    headerBadge: "",
    headerTitleDark: "",
    headerTitleHighlight: "",
    headerDescription: ""
  });

  const [imports, setImports] = useState<any[]>([]);
  const [exports, setExports] = useState<any[]>([]);

  const { data: configData, isLoading } = useQuery({
    queryKey: ["air-representation-config"],
    queryFn: () => airRepresentationActions.get(),
    enabled: !!user,
  });

  useEffect(() => {
    if (configData?.result) {
      const { result } = configData;
      setHeaderConfig({
        headerBadge: result.headerBadge || "",
        headerTitleDark: result.headerTitleDark || "",
        headerTitleHighlight: result.headerTitleHighlight || "",
        headerDescription: result.headerDescription || ""
      });
      setImports(result.importSections || []);
      setExports(result.exportSections || []);
    }
  }, [configData]);

  const updateMutation = useMutation({
    mutationFn: (data: any) => airRepresentationActions.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["air-representation-config"] });
      toast.success("Configurações salvas com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao salvar configurações.");
    }
  });

  const uploadMutation = useMutation({
    mutationFn: ({ file, section, id }: { file: File, section: 'imports' | 'exports', id: string }) => 
      airRepresentationActions.uploadImage(file),
    onSuccess: (data, variables) => {
      const { section, id } = variables;
      const fileName = data.result ? data.result.fileName : data.fileName;
      
      let updatedImports = imports;
      let updatedExports = exports;

      if (section === 'imports') {
        updatedImports = imports.map(item => item.id === id ? { ...item, image: fileName } : item);
        setImports(updatedImports);
      } else {
        updatedExports = exports.map(item => item.id === id ? { ...item, image: fileName } : item);
        setExports(updatedExports);
      }
      
      updateMutation.mutate({
        ...headerConfig,
        importSections: updatedImports,
        exportSections: updatedExports
      });

      toast.success("Imagem vinculada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao enviar imagem.");
    }
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, section: 'imports' | 'exports', id: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("A imagem não pode ultrapassar 2MB");
      return;
    }

    const img = new (window as any).Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (img.width > 800 || img.height > 800) {
        toast.error("A imagem deve ter no máximo 800x800 pixels.");
        return;
      }
      uploadMutation.mutate({ file, section, id });
    };
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEndImports = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setImports((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDragEndExports = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setExports((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addImport = () => {
    setImports([...imports, { id: `imp-${Date.now()}`, icon: "CheckCircle", title: "", desc: "", topics: "" }]);
  };
  const removeImport = (id: string) => setImports(imports.filter(i => i.id !== id));

  const addExport = () => {
    setExports([...exports, { id: `exp-${Date.now()}`, icon: "CheckCircle", title: "", desc: "", topics: "" }]);
  };
  const removeExport = (id: string) => setExports(exports.filter(i => i.id !== id));

  const handleSave = () => {
    updateMutation.mutate({
      ...headerConfig,
      importSections: imports,
      exportSections: exports
    });
  };

  const renderBlockEditor = (
    items: any[], 
    setItems: any, 
    sectionKey: 'imports' | 'exports',
    dndId: string, 
    handleDragEnd: any,
    addFunc: () => void,
    removeFunc: (id: string) => void,
    title: string,
    icon: React.ReactNode
  ) => (
    <Card className="border-none shadow-sm overflow-hidden h-fit">
      <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle className="text-lg font-bold text-emerald-950">{title}</CardTitle>
          </div>
          <Button onClick={addFunc} size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 shrink-0">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Bloco
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-2">
        <DndContext id={dndId} sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id}>
                <div className="flex flex-col xl:flex-row gap-6 bg-white p-6 border border-emerald-50 rounded-xl shadow-sm relative group/item">
                  
                  {/* Image Upload Area */}
                  <div className="xl:w-64 space-y-2 shrink-0">
                    <div className="flex items-center justify-between">
                      <Label className="text-emerald-900/70 font-semibold text-[10px]">Imagem do Bloco</Label>
                      {item.image && (
                        <button
                          type="button"
                          onClick={() => {
                            let updatedImports = imports;
                            let updatedExports = exports;
                            if (sectionKey === 'imports') {
                              updatedImports = imports.map(i => i.id === item.id ? { ...i, image: undefined } : i);
                              setImports(updatedImports);
                            } else {
                              updatedExports = exports.map(i => i.id === item.id ? { ...i, image: undefined } : i);
                              setExports(updatedExports);
                            }
                            updateMutation.mutate({
                              ...headerConfig,
                              importSections: updatedImports,
                              exportSections: updatedExports
                            });
                          }}
                          className="text-[10px] text-red-500 hover:text-red-700 hover:underline"
                        >
                          Remover
                        </button>
                      )}
                    </div>
                    <div 
                      onClick={() => document.getElementById(`file-${item.id}`)?.click()}
                      className="relative border-2 border-dashed border-emerald-100 rounded-xl p-4 text-center hover:bg-emerald-50 transition-colors cursor-pointer group flex flex-col items-center justify-center h-32 overflow-hidden"
                    >
                      {item.image ? (
                        <div className="absolute inset-0">
                          <Image 
                            src={`${process.env.NEXT_PUBLIC_API_URL}/files/${item.image}`} 
                            alt="Preview" 
                            fill 
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-emerald-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                            <ImageIcon className="text-white w-6 h-6" />
                            <span className="text-[10px] text-white font-medium bg-emerald-950/50 px-2 py-1 rounded-full">Trocar Imagem</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="p-2 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                            <Upload className="w-4 h-4 text-emerald-600" />
                          </div>
                          <span className="text-xs font-medium text-emerald-800 mt-2">Clique para alterar</span>
                        </>
                      )}
                      <input 
                        type="file" 
                        id={`file-${item.id}`} 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, sectionKey, item.id)}
                      />
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center h-4">
                          <Label className="text-emerald-900/70 font-semibold text-[10px]">Título do Bloco</Label>
                        </div>
                        <Input 
                          maxLength={60}
                          value={item.title} 
                          onChange={(e) => {
                            const newItems = [...items];
                            const idx = newItems.findIndex(i => i.id === item.id);
                            newItems[idx].title = e.target.value;
                            setItems(newItems);
                          }}
                          className="border-emerald-100 font-bold text-emerald-950" 
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between h-4">
                          <Label className="text-emerald-900/70 font-semibold text-[10px]">Nome do Ícone</Label>
                          <a href="https://lucide.dev/icons" target="_blank" rel="noopener noreferrer" className="text-[9px] text-emerald-600 hover:underline flex items-center gap-1">
                            <Search size={10} /> Consultar
                          </a>
                        </div>
                        <Input 
                          maxLength={30}
                          value={item.icon} 
                          onChange={(e) => {
                            const newItems = [...items];
                            const idx = newItems.findIndex(i => i.id === item.id);
                            newItems[idx].icon = e.target.value;
                            setItems(newItems);
                          }}
                          className="border-emerald-100" 
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-emerald-900/70 font-semibold text-[10px]">Descrição Longa</Label>
                      <Textarea 
                        maxLength={300}
                        value={item.desc} 
                        onChange={(e) => {
                          const newItems = [...items];
                          const idx = newItems.findIndex(i => i.id === item.id);
                          newItems[idx].desc = e.target.value;
                          setItems(newItems);
                        }}
                        className="min-h-[80px] border-emerald-100" 
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-emerald-900/70 font-semibold text-[10px]">Tópicos (1 por linha)</Label>
                      <Textarea 
                        maxLength={600}
                        value={item.topics} 
                        onChange={(e) => {
                          const newItems = [...items];
                          const idx = newItems.findIndex(i => i.id === item.id);
                          newItems[idx].topics = e.target.value;
                          setItems(newItems);
                        }}
                        placeholder="Soluções ágeis...&#10;Vasto conhecimento..."
                        className="min-h-[100px] border-emerald-100 font-mono text-sm leading-relaxed" 
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={() => removeFunc(item.id)}
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
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-emerald-950">Representação</h1>
        <p className="text-emerald-900/60 font-medium">
          Configure as áreas de atuação para Representações Aéreas (Importação e Exportação).
        </p>
      </div>

      <Tabs defaultValue="header" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-emerald-50/50 border border-emerald-100 p-1 rounded-xl h-auto mb-8">
          <TabsTrigger value="header" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-emerald-950 data-[state=active]:shadow-sm py-3 font-semibold text-emerald-800">Cabeçalho</TabsTrigger>
          <TabsTrigger value="imports" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-emerald-950 data-[state=active]:shadow-sm py-3 font-semibold text-emerald-800">Importações Aéreas</TabsTrigger>
          <TabsTrigger value="exports" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-emerald-950 data-[state=active]:shadow-sm py-3 font-semibold text-emerald-800">Exportações Aéreas</TabsTrigger>
        </TabsList>

        <TabsContent value="header" className="space-y-8 focus-visible:outline-none focus-visible:ring-0 mt-0">
          <Card className="border-none shadow-sm h-fit">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <Layout className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Banner Principal</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2 max-w-xl">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Badge (Pílula)</Label>
                <Input 
                  maxLength={40} 
                  value={headerConfig.headerBadge}
                  onChange={(e) => setHeaderConfig({ ...headerConfig, headerBadge: e.target.value })}
                  className="border-emerald-100" 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Título (Parte Escura)</Label>
                  <Input 
                    maxLength={60} 
                    value={headerConfig.headerTitleDark}
                    onChange={(e) => setHeaderConfig({ ...headerConfig, headerTitleDark: e.target.value })}
                    className="border-emerald-100" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Palavra em Destaque (Parte Verde)</Label>
                  <Input 
                    maxLength={40} 
                    value={headerConfig.headerTitleHighlight}
                    onChange={(e) => setHeaderConfig({ ...headerConfig, headerTitleHighlight: e.target.value })}
                    className="border-emerald-100 text-emerald-600 font-bold" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Descrição</Label>
                <Textarea 
                  maxLength={250} 
                  value={headerConfig.headerDescription}
                  onChange={(e) => setHeaderConfig({ ...headerConfig, headerDescription: e.target.value })}
                  className="min-h-[100px] border-emerald-100" 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="imports" className="space-y-8 focus-visible:outline-none focus-visible:ring-0 mt-0">
          {renderBlockEditor(
            imports,
            setImports,
            'imports',
            "dnd-imports",
            handleDragEndImports,
            addImport,
            removeImport,
            "Blocos de Importação",
            <PlaneLanding className="w-5 h-5 text-emerald-600" />
          )}
        </TabsContent>

        <TabsContent value="exports" className="space-y-8 focus-visible:outline-none focus-visible:ring-0 mt-0">
          {renderBlockEditor(
            exports,
            setExports,
            'exports',
            "dnd-exports",
            handleDragEndExports,
            addExport,
            removeExport,
            "Blocos de Exportação",
            <PlaneTakeoff className="w-5 h-5 text-emerald-600" />
          )}
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4 border-t border-emerald-50 pt-8 mt-4">
        <Button 
          variant="outline" 
          onClick={() => queryClient.invalidateQueries({ queryKey: ["air-representation-config"] })}
          className="border-emerald-100 text-emerald-700 hover:bg-emerald-50 px-8"
        >
          Descartar
        </Button>
        <Button 
          onClick={handleSave}
          disabled={updateMutation.isPending}
          className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 px-10"
        >
          {updateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
}
