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
  MonitorSmartphone,
  LayoutGrid,
  Search,
  MessageSquare,
  Loader2,
  Upload,
  Image as ImageIcon,
  Layers
} from "lucide-react";

import { formatPhoneNumber } from "@/admin/utils/formatMask";

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
import { comexSystemsActions } from "@/admin/actions/comex-systems.actions";
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
      className={`group flex gap-4 p-4 rounded-xl border border-transparent transition-all ${
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

export default function ComexSystemsConfig() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [headerConfig, setHeaderConfig] = useState({
    headerBadge: "",
    headerTitleDark: "",
    headerTitleHighlight: "",
    headerDescription: "",
    highlightTitle: "",
    highlightText: "",
    buttonText: "",
    buttonLink: "",
    cardTitle: "",
    cardTopics: "",
    diffsSectionTitle: "",
    diffsSectionSubtitle: ""
  });

  const [ctaConfig, setCtaConfig] = useState({
    heroWhatsappText: "",
    heroWhatsappNumber: "",
    heroMessageText: "",
    heroMessageLink: "",
    footerCtaTitleDark: "",
    footerCtaTitleHighlight: "",
    footerCtaDescription: "",
    footerWhatsappText: "",
    footerWhatsappNumber: "",
    footerMessageText: "",
    footerMessageLink: ""
  });

  const [differentials, setDifferentials] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);

  const { data: configData, isLoading } = useQuery({
    queryKey: ["comex-systems-config"],
    queryFn: () => comexSystemsActions.get(),
    enabled: !!user,
  });

  useEffect(() => {
    if (configData?.result) {
      const { result } = configData;
      setHeaderConfig({
        headerBadge: result.headerBadge || "TECNOLOGIA E CONFORMIDADE",
        headerTitleDark: result.headerTitleDark || "Sistemas",
        headerTitleHighlight: result.headerTitleHighlight || "Comex",
        headerDescription: result.headerDescription || "A base sólida por trás dos líderes do mercado! Deixe a responsabilidade técnica conosco e foque no crescimento do seu negócio.",
        highlightTitle: result.highlightTitle || "Prioridade Máxima em Lançamentos",
        highlightText: result.highlightText || "Quando o assunto é impulsionar seu negócio através dos nossos serviços...",
        buttonText: result.buttonText || "Saiba Mais",
        buttonLink: result.buttonLink || "https://wa.me/5511964503217",
        cardTitle: result.cardTitle || "Por que Avant?",
        cardTopics: result.cardTopics || "Atendimento direto - sem burocracia\nPrecisão técnica...",
        diffsSectionTitle: result.diffsSectionTitle || "Diferenciais e Capacidades",
        diffsSectionSubtitle: result.diffsSectionSubtitle || "Excelência técnica e suporte contínuo para garantir a fluidez da sua operação internacional."
      });
      setCtaConfig({
        heroWhatsappText: result.heroWhatsappText || "",
        heroWhatsappNumber: result.heroWhatsappNumber || "",
        heroMessageText: result.heroMessageText || "",
        heroMessageLink: result.heroMessageLink || "",
        footerCtaTitleDark: result.footerCtaTitleDark || "",
        footerCtaTitleHighlight: result.footerCtaTitleHighlight || "",
        footerCtaDescription: result.footerCtaDescription || "",
        footerWhatsappText: result.footerWhatsappText || "",
        footerWhatsappNumber: result.footerWhatsappNumber || "",
        footerMessageText: result.footerMessageText || "",
        footerMessageLink: result.footerMessageLink || ""
      });
      if (result.differentials && result.differentials.length > 0) {
        setDifferentials(result.differentials);
      } else {
        setDifferentials([
          { id: "d-1", icon: "ShieldCheck", text: "Equipe dedicada 24 horas por 7 dias por semana." },
          { id: "d-2", icon: "ShieldCheck", text: "Know-How de excelência." },
        ]);
      }
      setSections(result.sections || []);
    }
  }, [configData]);

  const updateMutation = useMutation({
    mutationFn: (data: any) => comexSystemsActions.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comex-systems-config"] });
      toast.success("Configurações salvas com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao salvar configurações.");
    }
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const uploadMutation = useMutation({
    mutationFn: ({ file, id }: { file: File; id: string }) =>
      comexSystemsActions.uploadImage(file),
    onSuccess: (data, variables) => {
      const fileName = data.result ? data.result.fileName : data.fileName;
      const updated = sections.map(s =>
        s.id === variables.id ? { ...s, image: fileName } : s
      );
      setSections(updated);
      updateMutation.mutate({
        ...headerConfig,
        ...ctaConfig,
        differentials,
        sections: updated,
      });
      toast.success("Imagem vinculada com sucesso!");
    },
    onError: () => toast.error("Erro ao enviar imagem."),
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("A imagem não pode ultrapassar 5MB");
      return;
    }
    uploadMutation.mutate({ file, id });
  };

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
    setDifferentials([...differentials, { id: `d-${Date.now()}`, icon: "ShieldCheck", text: "" }]);
  };
  
  const removeDiff = (id: string) => {
    setDifferentials(differentials.filter(d => d.id !== id));
  };

  const handleDragEndSections = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addSection = () => {
    setSections([...sections, { id: `sec-${Date.now()}`, icon: "CheckCircle", title: "", desc: "", topics: "" }]);
  };

  const removeSection = (id: string) => setSections(sections.filter(s => s.id !== id));

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-emerald-950">Sistemas Comex</h1>
        <p className="text-emerald-900/60 font-medium">
          Configure a página de Sistemas Comércio Exterior e seus diferenciais.
        </p>
      </div>

      <Tabs defaultValue="header" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-emerald-50/50 border border-emerald-100 p-1 rounded-xl h-auto mb-8">
          <TabsTrigger value="header" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-emerald-950 data-[state=active]:shadow-sm py-3 font-semibold text-emerald-800">Cabeçalho & Destaque</TabsTrigger>
          <TabsTrigger value="sections" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-emerald-950 data-[state=active]:shadow-sm py-3 font-semibold text-emerald-800">Blocos de Conteúdo</TabsTrigger>
          <TabsTrigger value="differentials" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-emerald-950 data-[state=active]:shadow-sm py-3 font-semibold text-emerald-800">Grid de Capacidades</TabsTrigger>
          <TabsTrigger value="cta" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-emerald-950 data-[state=active]:shadow-sm py-3 font-semibold text-emerald-800">Botões e CTAs</TabsTrigger>
        </TabsList>

        <TabsContent value="header" className="space-y-8 focus-visible:outline-none focus-visible:ring-0 mt-0">
          
          {/* Banner Principal */}
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
                <Input maxLength={40} value={headerConfig.headerBadge} onChange={e => setHeaderConfig({...headerConfig, headerBadge: e.target.value})} className="border-emerald-100" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Título (Parte Escura)</Label>
                  <Input maxLength={60} value={headerConfig.headerTitleDark} onChange={e => setHeaderConfig({...headerConfig, headerTitleDark: e.target.value})} className="border-emerald-100" />
                </div>
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Palavra em Destaque (Parte Verde)</Label>
                  <Input maxLength={40} value={headerConfig.headerTitleHighlight} onChange={e => setHeaderConfig({...headerConfig, headerTitleHighlight: e.target.value})} className="border-emerald-100 text-emerald-600 font-bold" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Descrição</Label>
                <Textarea maxLength={250} value={headerConfig.headerDescription} onChange={e => setHeaderConfig({...headerConfig, headerDescription: e.target.value})} className="min-h-[80px] border-emerald-100" />
              </div>
            </CardContent>
          </Card>

          {/* Destaque */}
          <Card className="border-none shadow-sm h-fit">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <MonitorSmartphone className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Seção de Destaque (Prioridade Máxima)</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Coluna Esquerda */}
                <div className="space-y-4">
                  <h3 className="font-bold text-emerald-950 border-b border-emerald-50 pb-2">Coluna de Texto (Esquerda)</h3>
                  <div className="space-y-2">
                    <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Título Principal</Label>
                    <Input maxLength={100} value={headerConfig.highlightTitle} onChange={e => setHeaderConfig({...headerConfig, highlightTitle: e.target.value})} className="border-emerald-100 font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Texto Longo</Label>
                    <Textarea 
                      maxLength={800} 
                      value={headerConfig.highlightText}
                      onChange={e => setHeaderConfig({...headerConfig, highlightText: e.target.value})}
                      className="min-h-[200px] border-emerald-100" 
                    />
                  </div>
                  <div className="space-y-2 pt-2">
                    <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" /> Configuração do Botão WhatsApp
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Input maxLength={30} value={headerConfig.buttonText} onChange={e => setHeaderConfig({...headerConfig, buttonText: e.target.value})} placeholder="Texto do botão" className="border-emerald-100" />
                      <Input maxLength={15} value={headerConfig.buttonLink} onChange={e => setHeaderConfig({...headerConfig, buttonLink: formatPhoneNumber(e.target.value)})} placeholder="(11) 96450-3217" className="border-emerald-100" />
                    </div>
                  </div>
                </div>

                {/* Coluna Direita */}
                <div className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <h3 className="font-bold text-emerald-950 border-b border-slate-200 pb-2">Card Escuro (Direita)</h3>
                  <div className="space-y-2">
                    <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Título do Card</Label>
                    <Input maxLength={50} value={headerConfig.cardTitle} onChange={e => setHeaderConfig({...headerConfig, cardTitle: e.target.value})} className="border-slate-200 bg-white" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Tópicos com Check (1 por linha)</Label>
                    <Textarea 
                      maxLength={400} 
                      value={headerConfig.cardTopics}
                      onChange={e => setHeaderConfig({...headerConfig, cardTopics: e.target.value})}
                      className="min-h-[120px] border-slate-200 bg-white font-mono text-sm leading-relaxed" 
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </TabsContent>

        <TabsContent value="sections" className="space-y-8 focus-visible:outline-none focus-visible:ring-0 mt-0">
          <Card className="border-none shadow-sm overflow-hidden h-fit">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-emerald-600" />
                  <CardTitle className="text-lg font-bold text-emerald-950">Blocos de Conteúdo</CardTitle>
                </div>
                <Button onClick={addSection} size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 shrink-0">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Bloco
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-2">
              <DndContext id="dnd-comex-sections" sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndSections}>
                <SortableContext items={sections} strategy={verticalListSortingStrategy}>
                  {sections.map((item) => (
                    <SortableItem key={item.id} id={item.id}>
                      <div className="flex flex-col xl:flex-row gap-6 bg-white p-6 border border-emerald-50 rounded-xl shadow-sm relative group/item">

                        <div className="xl:w-64 space-y-2 shrink-0">
                          <div className="flex items-center justify-between">
                            <Label className="text-emerald-900/70 font-semibold text-[10px]">Imagem do Bloco</Label>
                            {item.image && (
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = sections.map(s => s.id === item.id ? { ...s, image: undefined } : s);
                                  setSections(updated);
                                  updateMutation.mutate({ ...headerConfig, ...ctaConfig, differentials, sections: updated });
                                }}
                                className="text-[10px] text-red-500 hover:text-red-700 hover:underline"
                              >
                                Remover
                              </button>
                            )}
                          </div>
                          <div
                            onClick={() => document.getElementById(`file-sec-${item.id}`)?.click()}
                            className="relative border-2 border-dashed border-emerald-100 rounded-xl p-4 text-center hover:bg-emerald-50 transition-colors cursor-pointer group flex flex-col items-center justify-center h-32 overflow-hidden"
                          >
                            {item.image ? (
                              <div className="absolute inset-0">
                                <Image src={`${process.env.NEXT_PUBLIC_API_URL}/files/${item.image}`} alt="Preview" fill className="object-cover" />
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
                              id={`file-sec-${item.id}`}
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, item.id)}
                            />
                          </div>
                        </div>

                        <div className="flex-1 space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <Label className="text-emerald-900/70 font-semibold text-[10px]">Título do Bloco</Label>
                              <Input
                                maxLength={60}
                                value={item.title}
                                onChange={(e) => {
                                  const updated = sections.map(s => s.id === item.id ? { ...s, title: e.target.value } : s);
                                  setSections(updated);
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
                                  const updated = sections.map(s => s.id === item.id ? { ...s, icon: e.target.value } : s);
                                  setSections(updated);
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
                                const updated = sections.map(s => s.id === item.id ? { ...s, desc: e.target.value } : s);
                                setSections(updated);
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
                                const updated = sections.map(s => s.id === item.id ? { ...s, topics: e.target.value } : s);
                                setSections(updated);
                              }}
                              placeholder="Solução ágil...&#10;Atendimento exclusivo..."
                              className="min-h-[100px] border-emerald-100 font-mono text-sm leading-relaxed"
                            />
                          </div>
                        </div>

                        <Button
                          onClick={() => removeSection(item.id)}
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
        </TabsContent>

        <TabsContent value="differentials" className="space-y-8 focus-visible:outline-none focus-visible:ring-0 mt-0">
          
          <Card className="border-none shadow-sm overflow-hidden h-full flex flex-col">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <LayoutGrid className="w-5 h-5 text-emerald-600" />
                    <CardTitle className="text-lg font-bold text-emerald-950">Diferenciais e Capacidades</CardTitle>
                  </div>
                  <CardDescription className="text-emerald-800/60 font-medium mt-1">
                    Gerencie a grande lista de capacidades do Sistemas Comex.
                  </CardDescription>
                </div>
                <Button onClick={addDiff} size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 shrink-0">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Item
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-emerald-50">
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Título da Seção</Label>
                  <Input maxLength={60} value={headerConfig.diffsSectionTitle} onChange={e => setHeaderConfig({...headerConfig, diffsSectionTitle: e.target.value})} className="border-emerald-100 font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Subtítulo da Seção</Label>
                  <Input maxLength={150} value={headerConfig.diffsSectionSubtitle} onChange={e => setHeaderConfig({...headerConfig, diffsSectionSubtitle: e.target.value})} className="border-emerald-100" />
                </div>
              </div>

              <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-100">
                <DndContext id="dnd-comex-diffs" sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndDiff}>
                  <SortableContext items={differentials} strategy={verticalListSortingStrategy}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                      {differentials.map((item) => (
                        <SortableItem key={item.id} id={item.id}>
                          <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 border border-emerald-50 rounded-lg shadow-sm relative group/item w-full">
                            <div className="sm:w-32 shrink-0 space-y-1">
                              <div className="flex items-center justify-between">
                                <Label className="text-emerald-900/70 font-semibold text-[9px]">Ícone</Label>
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
                                className="border-emerald-100" 
                              />
                            </div>
                            <div className="flex-1 space-y-1">
                              <Label className="text-emerald-900/70 font-semibold text-[9px]">Texto do Diferencial</Label>
                              <Textarea 
                                maxLength={100}
                                value={item.text} 
                                onChange={(e) => {
                                  const newItems = [...differentials];
                                  const idx = newItems.findIndex(i => i.id === item.id);
                                  newItems[idx].text = e.target.value;
                                  setDifferentials(newItems);
                                }}
                                className="min-h-[60px] text-sm font-medium border-emerald-100" 
                              />
                            </div>
                            <Button 
                              onClick={() => removeDiff(item.id)}
                              variant="ghost" 
                              size="icon" 
                              className="absolute -right-2 -top-2 text-red-400 hover:text-red-600 hover:bg-red-50 bg-white border border-red-100 shadow-sm opacity-0 group-hover/item:opacity-100 transition-opacity h-6 w-6 rounded-full"
                            >
                              <Trash2 size={12} />
                            </Button>
                          </div>
                        </SortableItem>
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              </div>

            </CardContent>
          </Card>

        </TabsContent>

        <TabsContent value="cta" className="space-y-8 focus-visible:outline-none focus-visible:ring-0 mt-0">
          <Card className="border-none shadow-sm h-fit">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Botões do Cabeçalho</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Botão WhatsApp - Texto</Label>
                  <Input maxLength={40} placeholder="Ex: Falar com especialista" value={ctaConfig.heroWhatsappText} onChange={(e) => setCtaConfig({ ...ctaConfig, heroWhatsappText: e.target.value })} className="border-emerald-100" />
                </div>
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Botão WhatsApp - Número</Label>
                  <Input maxLength={15} placeholder="Ex: (11) 96450-3217" value={ctaConfig.heroWhatsappNumber} onChange={(e) => setCtaConfig({ ...ctaConfig, heroWhatsappNumber: formatPhoneNumber(e.target.value) })} className="border-emerald-100" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Botão Secundário - Texto</Label>
                  <Input maxLength={40} placeholder="Ex: Enviar mensagem" value={ctaConfig.heroMessageText} onChange={(e) => setCtaConfig({ ...ctaConfig, heroMessageText: e.target.value })} className="border-emerald-100" />
                </div>
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Botão Secundário - Link</Label>
                  <Input maxLength={100} placeholder="Ex: /contato" value={ctaConfig.heroMessageLink} onChange={(e) => setCtaConfig({ ...ctaConfig, heroMessageLink: e.target.value })} className="border-emerald-100" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm h-fit">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <Layout className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Chamada para Ação (Rodapé)</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Título (Parte Escura)</Label>
                  <Input maxLength={60} placeholder="Ex: Operação Urgente?" value={ctaConfig.footerCtaTitleDark} onChange={(e) => setCtaConfig({ ...ctaConfig, footerCtaTitleDark: e.target.value })} className="border-emerald-100" />
                </div>
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Palavra em Destaque (Laranja)</Label>
                  <Input maxLength={40} placeholder="Ex: Nós cuidamos!" value={ctaConfig.footerCtaTitleHighlight} onChange={(e) => setCtaConfig({ ...ctaConfig, footerCtaTitleHighlight: e.target.value })} className="border-emerald-100" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Descrição</Label>
                <Textarea maxLength={250} placeholder="Texto de apoio da chamada..." value={ctaConfig.footerCtaDescription} onChange={(e) => setCtaConfig({ ...ctaConfig, footerCtaDescription: e.target.value })} className="min-h-[80px] border-emerald-100" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Botão WhatsApp - Texto</Label>
                  <Input maxLength={40} placeholder="Ex: Falar no WhatsApp" value={ctaConfig.footerWhatsappText} onChange={(e) => setCtaConfig({ ...ctaConfig, footerWhatsappText: e.target.value })} className="border-emerald-100" />
                </div>
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Botão WhatsApp - Número</Label>
                  <Input maxLength={15} placeholder="Ex: (11) 96450-3217" value={ctaConfig.footerWhatsappNumber} onChange={(e) => setCtaConfig({ ...ctaConfig, footerWhatsappNumber: formatPhoneNumber(e.target.value) })} className="border-emerald-100" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Botão Secundário - Texto</Label>
                  <Input maxLength={40} placeholder="Ex: Enviar mensagem" value={ctaConfig.footerMessageText} onChange={(e) => setCtaConfig({ ...ctaConfig, footerMessageText: e.target.value })} className="border-emerald-100" />
                </div>
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Botão Secundário - Link</Label>
                  <Input maxLength={100} placeholder="Ex: /contato" value={ctaConfig.footerMessageLink} onChange={(e) => setCtaConfig({ ...ctaConfig, footerMessageLink: e.target.value })} className="border-emerald-100" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4 border-t border-emerald-50 pt-8 mt-4">
        <Button variant="outline" onClick={() => queryClient.invalidateQueries({ queryKey: ["comex-systems-config"] })} className="border-emerald-100 text-emerald-700 hover:bg-emerald-50 px-8">
          Descartar
        </Button>
        <Button 
          onClick={() => {
            updateMutation.mutate({
              ...headerConfig,
              ...ctaConfig,
              differentials,
              sections,
            });
          }}
          disabled={updateMutation.isPending}
          className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 px-10"
        >
          {updateMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
}
