
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
  Truck,
  LayoutGrid,
  Search,
  Upload,
  MessageSquare,
  Loader2,
  ImageIcon,
  MonitorSmartphone,
  ListOrdered,
  MapPin
} from "lucide-react";

import { formatPhoneNumber } from "@/admin/utils/formatMask";

import { regionsActions } from "@/admin/actions/home-sections.actions";
import { uploadActions } from "@/admin/actions/upload.actions";

const getImageUrl = (url: any) => {
  if (!url) return "";
  if (typeof url !== "string") return url;
  if (url.includes("/api/files/")) return url;
  if (url.includes("/files/")) {
    return url.replace("/files/", "/api/files/");
  }
  return url;
};

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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { transportActions } from "@/admin/actions/transport.actions";
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
      className={`group flex gap-4 p-4 rounded-xl border border-transparent transition-all w-full ${isDragging ? "bg-emerald-50 border-emerald-200 shadow-lg scale-[1.02]" : "hover:border-emerald-50 hover:bg-emerald-50/30"
        }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-emerald-900/20 group-hover:text-emerald-600 transition-colors mt-2 shrink-0"
      >
        <GripVertical size={20} />
      </div>
      <div className="flex-1 w-full">
        {children}
      </div>
    </div>
  );
}

export default function TransportConfig() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [headerConfig, setHeaderConfig] = useState({
    headerBadge: "",
    headerTitleDark: "",
    headerTitleHighlight: "",
    headerDescription: "",
    highlightImage: "",
    priorityTitle: "",
    priorityText: "",
    cardTitle: "",
    cardTopics: "",
    priorityButtonText: "",
    priorityButtonLink: "",
    highlightTitle: "",
    highlightText1: "",
    highlightQuote: "",
    buttonLink: "",
    diffsSectionTitle: "",
    diffsSectionHighlight: "",
    diffsSectionDescription: "",
    highlightMediaType: "image",
    highlightVideoIframe: ""
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
    footerMessageLink: "",
    workStepsBadge: "",
    workStepsTitle: "",
    workStepsDescription: "",
    workStepsCtaText: "",
    workStepsCtaLink: ""
  });

  const [differentials, setDifferentials] = useState<any[]>([]);
  const [workSteps, setWorkSteps] = useState<any[]>([]);

  const [regionsConfig, setRegionsConfig] = useState({
    title: "",
    description: "",
    mapImageUrl: ""
  });
  const [localPreviewRegions, setLocalPreviewRegions] = useState<string | null>(null);
  const [isUploadingRegions, setIsUploadingRegions] = useState(false);

  const { data: configData, isLoading } = useQuery({
    queryKey: ["transport-config"],
    queryFn: () => transportActions.get(),
    enabled: !!user,
  });

  const { data: regionsData, isLoading: isLoadingRegions } = useQuery({
    queryKey: ["regions", "transport"],
    queryFn: () => regionsActions.get("transport"),
    enabled: !!user,
  });


  useEffect(() => {
    if (configData?.result) {
      const { result } = configData;
      setHeaderConfig({
        headerBadge: result.headerBadge || "LOGÍSTICA NACIONAL E INTERNACIONAL",
        headerTitleDark: result.headerTitleDark || "Transporte",
        headerTitleHighlight: result.headerTitleHighlight || "Rodoviário",
        headerDescription: result.headerDescription || "transporte nacional, cargas urgentes, transporte importação, transporte exportação.\nSoluções exclusivas para Agentes de Carga.",
        highlightImage: result.highlightImage || "",
        priorityTitle: result.priorityTitle || "Prioridade Máxima em Lançamentos",
        priorityText: result.priorityText || "Quando o assunto é impulsionar seu negócio através dos nossos serviços, tratamos com prioridade máxima.",
        cardTitle: result.cardTitle || "Por que Avant?",
        cardTopics: result.cardTopics || "Atendimento direto - sem burocracia\nPrecisão técnica em cada lançamento\nEscalabilidade com segurança operacional",
        priorityButtonText: result.priorityButtonText || "Saiba Mais",
        priorityButtonLink: result.priorityButtonLink || "",
        highlightTitle: result.highlightTitle || "Estratégia e Crescimento para seu Negócio",
        highlightText1: result.highlightText1 || "Entendendo a necessidade de nossos clientes...",
        highlightQuote: result.highlightQuote || "Ofereça soluções aos seus clientes...",
        buttonLink: result.buttonLink || "",
        diffsSectionTitle: result.diffsSectionTitle || "Diferenciais",
        diffsSectionHighlight: result.diffsSectionHighlight || "Logísticos",
        diffsSectionDescription: result.diffsSectionDescription || "Soluções completas de transporte e pré-embarque para garantir o sucesso da sua operação.",
        highlightMediaType: result.highlightMediaType || "image",
        highlightVideoIframe: result.highlightVideoIframe || ""
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
        footerMessageLink: result.footerMessageLink || "",
        workStepsBadge: result.workStepsBadge || "Como Trabalhamos",
        workStepsTitle: result.workStepsTitle || "Nossa abordagem em etapas",
        workStepsDescription: result.workStepsDescription || "Um fluxo de trabalho transparente e eficiente...",
        workStepsCtaText: result.workStepsCtaText || "Falar com um especialista",
        workStepsCtaLink: result.workStepsCtaLink || ""
      });
      if (result.differentials && result.differentials.length > 0) {
        setDifferentials(result.differentials);
      } else {
        setDifferentials([
          { id: "t-1", icon: "CheckCircle2", text: "Transporte rodoviário especializado em Importações e Exportações Aéreas." },
          { id: "t-2", icon: "CheckCircle2", text: "Veículo dedicado à sua operação." },
        ]);
      }
      setWorkSteps(result.workSteps || [
        { id: "ws-1", title: "Coleta e Recebimento", desc: "Coletamos sua carga com agilidade..." },
        { id: "ws-2", title: "Preparação e Conferência", desc: "Verificamos cada detalhe..." }
      ]);
    }
  }, [configData]);

  useEffect(() => {
    if (regionsData?.result) {
      setRegionsConfig({
        title: regionsData.result.title || "",
        description: regionsData.result.description || "",
        mapImageUrl: regionsData.result.mapImageUrl || ""
      });
      setLocalPreviewRegions(null);
    }
  }, [regionsData]);

  const updateMutation = useMutation({
    mutationFn: (data: any) => transportActions.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transport-config"] });
      toast.success("Configurações salvas com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao salvar configurações.");
    }
  });

  const updateRegionsMutation = useMutation({
    mutationFn: (data: any) => regionsActions.update("transport", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["regions", "transport"] });
    }
  });

  const uploadMutation = useMutation({
    mutationFn: (file: File) => transportActions.uploadImage(file),
    onSuccess: (data) => {
      const fileName = data.result ? data.result.fileName : data.fileName;
      const updatedConfig = { ...headerConfig, highlightImage: fileName };
      setHeaderConfig(updatedConfig);
      updateMutation.mutate({
        ...updatedConfig,
        ...ctaConfig,
        differentials
      });
      toast.success("Imagem vinculada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao enviar imagem.");
    }
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("A imagem não pode ultrapassar 5MB");
      return;
    }

    uploadMutation.mutate(file);
  };

  const handleRegionsImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("A imagem não pode ultrapassar 5MB");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setLocalPreviewRegions(previewUrl);

    try {
      setIsUploadingRegions(true);
      const res = await uploadActions.upload(file);
      const url = res?.url || res?.result?.url || res?.data?.url;

      if (url) {
        setRegionsConfig(prev => ({ ...prev, mapImageUrl: url }));
        toast.success("Imagem enviada com sucesso!");
      } else {
        throw new Error("URL não encontrada na resposta");
      }
    } catch (error) {
      toast.error("Erro ao enviar imagem.");
    } finally {
      setIsUploadingRegions(false);
    }
  };

  const handleRemoveRegionsImage = () => {
    setRegionsConfig(prev => ({ ...prev, mapImageUrl: "" }));
    setLocalPreviewRegions(null);
  };

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
    setDifferentials([...differentials, { id: `t-${Date.now()}`, icon: "CheckCircle2", text: "" }]);
  };

  const removeDiff = (id: string) => {
    setDifferentials(differentials.filter(d => d.id !== id));
  };

  const handleDragEndWorkSteps = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setWorkSteps((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addWorkStep = () => {
    setWorkSteps([...workSteps, { id: `ws-${Date.now()}`, title: "", desc: "" }]);
  };

  const removeWorkStep = (id: string) => {
    setWorkSteps(workSteps.filter(ws => ws.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-emerald-950">Transportes</h1>
        <p className="text-emerald-900/60 font-medium">
          Configure a página de Transporte Rodoviário e seus diferenciais logísticos.
        </p>
      </div>

      <Tabs defaultValue="header" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-emerald-50/50 border border-emerald-100 p-1 rounded-xl h-auto mb-8">
          <TabsTrigger value="header" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-emerald-950 data-[state=active]:shadow-sm py-3 font-semibold text-emerald-800">Cabeçalho & Destaque</TabsTrigger>
          <TabsTrigger value="differentials" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-emerald-950 data-[state=active]:shadow-sm py-3 font-semibold text-emerald-800">Grid de Capacidades</TabsTrigger>
          <TabsTrigger value="regions" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-emerald-950 data-[state=active]:shadow-sm py-3 font-semibold text-emerald-800">Regiões de Atuação</TabsTrigger>
          <TabsTrigger value="work-steps" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-emerald-950 data-[state=active]:shadow-sm py-3 font-semibold text-emerald-800">Etapas de Trabalho</TabsTrigger>
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
                <Input maxLength={40} value={headerConfig.headerBadge} onChange={e => setHeaderConfig({ ...headerConfig, headerBadge: e.target.value })} className="border-emerald-100" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Título (Parte Escura)</Label>
                  <Input maxLength={60} value={headerConfig.headerTitleDark} onChange={e => setHeaderConfig({ ...headerConfig, headerTitleDark: e.target.value })} className="border-emerald-100" />
                </div>
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Palavra em Destaque (Parte Verde)</Label>
                  <Input maxLength={40} value={headerConfig.headerTitleHighlight} onChange={e => setHeaderConfig({ ...headerConfig, headerTitleHighlight: e.target.value })} className="border-emerald-100 text-emerald-600 font-bold" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Descrição</Label>
                <Textarea maxLength={250} value={headerConfig.headerDescription} onChange={e => setHeaderConfig({ ...headerConfig, headerDescription: e.target.value })} className="min-h-[80px] border-emerald-100" />
              </div>
            </CardContent>
          </Card>
          
          {/* Prioridade Máxima */}
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
                    <Input maxLength={100} value={headerConfig.priorityTitle} onChange={e => setHeaderConfig({ ...headerConfig, priorityTitle: e.target.value })} className="border-emerald-100 font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Texto Longo</Label>
                    <Textarea
                      maxLength={800}
                      value={headerConfig.priorityText}
                      onChange={e => setHeaderConfig({ ...headerConfig, priorityText: e.target.value })}
                      className="min-h-[200px] border-emerald-100"
                    />
                  </div>
                  <div className="space-y-2 pt-2">
                    <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" /> Configuração do Botão WhatsApp
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Input maxLength={30} value={headerConfig.priorityButtonText} onChange={e => setHeaderConfig({ ...headerConfig, priorityButtonText: e.target.value })} placeholder="Texto do botão" className="border-emerald-100" />
                      <Input maxLength={100} value={headerConfig.priorityButtonLink} onChange={e => setHeaderConfig({ ...headerConfig, priorityButtonLink: formatPhoneNumber(e.target.value) })} placeholder="Numero do WhatsApp" className="border-emerald-100" />
                    </div>
                  </div>
                </div>

                {/* Coluna Direita */}
                <div className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <h3 className="font-bold text-emerald-950 border-b border-slate-200 pb-2">Card Escuro (Direita)</h3>
                  <div className="space-y-2">
                    <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Título do Card</Label>
                    <Input maxLength={50} value={headerConfig.cardTitle} onChange={e => setHeaderConfig({ ...headerConfig, cardTitle: e.target.value })} className="border-slate-200 bg-white" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Tópicos com Check (1 por linha)</Label>
                    <Textarea
                      maxLength={400}
                      value={headerConfig.cardTopics}
                      onChange={e => setHeaderConfig({ ...headerConfig, cardTopics: e.target.value })}
                      className="min-h-[120px] border-slate-200 bg-white font-mono text-sm leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Destaque */}
          <Card className="border-none shadow-sm h-fit">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Seção de Destaque (Estratégia e Crescimento)</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

                {/* Mídia (Esquerda) */}
                <div className="xl:col-span-4 space-y-4 shrink-0">
                  <div className="space-y-2">
                    <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Tipo de Mídia (Destaque)</Label>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant={headerConfig.highlightMediaType === 'image' ? 'default' : 'outline'}
                        onClick={() => setHeaderConfig({ ...headerConfig, highlightMediaType: 'image' })}
                        className={`flex-1 ${headerConfig.highlightMediaType === 'image' ? 'bg-emerald-600 text-white' : 'text-emerald-700 border-emerald-200'}`}
                        size="sm"
                      >
                        Imagem
                      </Button>
                      <Button
                        type="button"
                        variant={headerConfig.highlightMediaType === 'video' ? 'default' : 'outline'}
                        onClick={() => setHeaderConfig({ ...headerConfig, highlightMediaType: 'video' })}
                        className={`flex-1 ${headerConfig.highlightMediaType === 'video' ? 'bg-emerald-600 text-white' : 'text-emerald-700 border-emerald-200'}`}
                        size="sm"
                      >
                        Vídeo (iframe)
                      </Button>
                    </div>
                  </div>

                  {headerConfig.highlightMediaType === 'image' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Imagem de Destaque</Label>
                        {headerConfig.highlightImage && (
                          <button
                            type="button"
                            onClick={() => {
                              const updated = { ...headerConfig, highlightImage: "" };
                              setHeaderConfig(updated);
                              updateMutation.mutate({ ...updated, ...ctaConfig, differentials });
                            }}
                            className="text-[10px] text-red-500 hover:text-red-700 hover:underline"
                          >
                            Remover
                          </button>
                        )}
                      </div>
                      <div
                        onClick={() => document.getElementById('highlight-image')?.click()}
                        className="relative border-2 border-dashed border-emerald-100 rounded-xl p-4 text-center hover:bg-emerald-50 transition-colors cursor-pointer group flex flex-col items-center justify-center h-48 overflow-hidden"
                      >
                        {headerConfig.highlightImage ? (
                          <div className="absolute inset-0">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_API_URL}/files/${headerConfig.highlightImage}`}
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
                            <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                              <Upload className="w-5 h-5 text-emerald-600" />
                            </div>
                            <span className="text-xs font-medium text-emerald-800 mt-2">Clique para alterar a imagem</span>
                          </>
                        )}
                        <input
                          type="file"
                          id="highlight-image"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </div>
                    </div>
                  )}

                  {headerConfig.highlightMediaType === 'video' && (
                    <div className="space-y-2">
                      <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Código de Incorporação (iframe do Vídeo)</Label>
                      <Textarea
                        value={headerConfig.highlightVideoIframe}
                        onChange={(e) => setHeaderConfig({ ...headerConfig, highlightVideoIframe: e.target.value })}
                        placeholder='<iframe src="..."></iframe> ou Link'
                        className="min-h-[160px] border-emerald-100 font-mono text-sm"
                      />
                    </div>
                  )}
                </div>

                {/* Textos (Direita) */}
                <div className="xl:col-span-8 space-y-4">
                  <div className="space-y-2">
                    <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Título Principal</Label>
                    <Input maxLength={100} value={headerConfig.highlightTitle} onChange={e => setHeaderConfig({ ...headerConfig, highlightTitle: e.target.value })} className="border-emerald-100 font-bold" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Texto (Parte 1)</Label>
                    <Textarea
                      maxLength={400}
                      value={headerConfig.highlightText1}
                      onChange={e => setHeaderConfig({ ...headerConfig, highlightText1: e.target.value })}
                      className="min-h-[80px] border-emerald-100"
                    />
                  </div>

                  <div className="space-y-2 bg-emerald-50/50 p-4 border-l-4 border-emerald-500 rounded-r-lg">
                    <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Frase em Destaque (Citação)</Label>
                    <Textarea
                      maxLength={300}
                      value={headerConfig.highlightQuote}
                      onChange={e => setHeaderConfig({ ...headerConfig, highlightQuote: e.target.value })}
                      className="min-h-[60px] border-emerald-200 bg-white italic"
                    />
                  </div>

                  <div className="space-y-2 pt-2">
                    <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" /> Configuração do Botão WhatsApp
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Input maxLength={30} value={headerConfig.buttonText} onChange={e => setHeaderConfig({ ...headerConfig, buttonText: e.target.value })} placeholder="Texto do botão" className="border-emerald-100" />
                      <Input maxLength={100} value={headerConfig.buttonLink} onChange={e => setHeaderConfig({ ...headerConfig, buttonLink: formatPhoneNumber(e.target.value) })} placeholder="Numero do WhatsApp" className="border-emerald-100" />
                    </div>
                  </div>
                </div>

              </div>
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
                    <CardTitle className="text-lg font-bold text-emerald-950">Diferenciais Logísticos</CardTitle>
                  </div>
                  <CardDescription className="text-emerald-800/60 font-medium mt-1">
                    Gerencie a lista de diferenciais do Transporte Rodoviário.
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
                  <Input maxLength={60} value={headerConfig.diffsSectionTitle} onChange={e => setHeaderConfig({ ...headerConfig, diffsSectionTitle: e.target.value })} className="border-emerald-100 font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Palavra em Destaque (Verde)</Label>
                  <Input maxLength={60} value={headerConfig.diffsSectionHighlight} onChange={e => setHeaderConfig({ ...headerConfig, diffsSectionHighlight: e.target.value })} className="border-emerald-100 text-emerald-600 font-bold" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Descrição Abaixo do Título</Label>
                  <Input maxLength={150} value={headerConfig.diffsSectionDescription} onChange={e => setHeaderConfig({ ...headerConfig, diffsSectionDescription: e.target.value })} className="border-emerald-100" />
                </div>
              </div>

              <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-100">
                <DndContext id="dnd-transport-diffs" sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndDiff}>
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
                                  const rawValue = e.target.value;

                                  // Transforma align-horizontal-space-around -> AlignHorizontalSpaceAround
                                  const formattedValue = rawValue
                                    .replace(/(^\w|-\w)/g, (match) => match.replace(/-/, "").toUpperCase());

                                  const newItems = [...differentials];
                                  const idx = newItems.findIndex(i => i.id === item.id);
                                  newItems[idx].icon = formattedValue;
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

        <TabsContent value="regions" className="space-y-8 focus-visible:outline-none focus-visible:ring-0 mt-0">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-8">
              <Card className="border-none shadow-sm overflow-hidden h-fit">
                <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                    <CardTitle className="text-lg font-bold text-emerald-950">Textos da Seção</CardTitle>
                  </div>
                  <CardDescription className="text-emerald-800/60 font-medium">
                    Edite o título e a descrição. Use **texto** para negrito.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">
                      Título Principal
                    </Label>
                    <Textarea
                      value={regionsConfig.title}
                      onChange={(e) => setRegionsConfig({ ...regionsConfig, title: e.target.value })}
                      className="min-h-[100px] border-emerald-100 focus-visible:ring-emerald-500 font-semibold"
                      placeholder="Ex: Nossa atuação se concentra nas principais regiões..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">
                      Descrição / Detalhes
                    </Label>
                    <Textarea
                      value={regionsConfig.description}
                      onChange={(e) => setRegionsConfig({ ...regionsConfig, description: e.target.value })}
                      className="min-h-[150px] border-emerald-100 focus-visible:ring-emerald-500"
                      placeholder="Ex: Essas regiões representam muito mais do que pontos no mapa..."
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="border-none shadow-sm overflow-hidden h-fit">
                <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-emerald-600" />
                      <CardTitle className="text-lg font-bold text-emerald-950">Mapa Ilustrativo</CardTitle>
                    </div>
                    {(regionsConfig.mapImageUrl || localPreviewRegions) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={handleRemoveRegionsImage}
                      >
                        <Trash2 size={14} className="mr-1" /> Remover
                      </Button>
                    )}
                  </div>
                  <CardDescription className="text-emerald-800/60 font-medium">
                    Upload da imagem do mapa (PNG preferencialmente).
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-emerald-100 rounded-xl p-8 bg-emerald-50/10 gap-4">
                    {regionsConfig.mapImageUrl || localPreviewRegions ? (
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-emerald-100 bg-white">
                        <img
                          src={localPreviewRegions || getImageUrl(regionsConfig.mapImageUrl)}
                          alt="Preview do Mapa"
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Label
                            htmlFor="regions-map-upload"
                            className="cursor-pointer bg-white text-emerald-600 px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg"
                          >
                            <Upload size={16} /> Alterar Imagem
                          </Label>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 py-8 text-emerald-900/40">
                        <ImageIcon size={48} strokeWidth={1} />
                        <p className="font-medium">Nenhuma imagem selecionada</p>
                        <Label htmlFor="regions-map-upload" className="mt-2 cursor-pointer bg-emerald-600 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg hover:bg-emerald-700 transition-colors">
                          <Upload size={16} /> Escolher Arquivo
                        </Label>
                      </div>
                    )}
                    <input
                      id="regions-map-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleRegionsImageUpload}
                      className="hidden"
                      disabled={isUploadingRegions}
                    />
                    {isUploadingRegions && (
                      <div className="flex items-center gap-2 text-emerald-600 font-medium animate-pulse">
                        <Loader2 size={16} className="animate-spin" />
                        Enviando imagem...
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="work-steps" className="space-y-8 focus-visible:outline-none focus-visible:ring-0 mt-0">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-8">
              <Card className="border-none shadow-sm overflow-hidden h-fit">
                <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
                  <div className="flex items-center gap-2">
                    <Layout className="w-5 h-5 text-emerald-600" />
                    <CardTitle className="text-lg font-bold text-emerald-950">Cabeçalho da Seção</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Badge Superior</Label>
                    <Input maxLength={80} value={ctaConfig.workStepsBadge} onChange={(e) => setCtaConfig({ ...ctaConfig, workStepsBadge: e.target.value })} className="border-emerald-100" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Título Principal</Label>
                    <Input maxLength={80} value={ctaConfig.workStepsTitle} onChange={(e) => setCtaConfig({ ...ctaConfig, workStepsTitle: e.target.value })} className="border-emerald-100 text-lg font-semibold" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Subtítulo / Descrição</Label>
                    <Textarea maxLength={250} value={ctaConfig.workStepsDescription} onChange={(e) => setCtaConfig({ ...ctaConfig, workStepsDescription: e.target.value })} className="min-h-[80px] border-emerald-100" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="space-y-2">
                      <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Texto do Botão</Label>
                      <Input maxLength={40} value={ctaConfig.workStepsCtaText} onChange={(e) => setCtaConfig({ ...ctaConfig, workStepsCtaText: e.target.value })} className="border-emerald-100" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">WhatsApp Link</Label>
                      <Input maxLength={15} value={ctaConfig.workStepsCtaLink} onChange={(e) => setCtaConfig({ ...ctaConfig, workStepsCtaLink: formatPhoneNumber(e.target.value) })} className="border-emerald-100" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="border-none shadow-sm overflow-hidden">
                <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <ListOrdered className="w-5 h-5 text-emerald-600" />
                      <CardTitle className="text-lg font-bold text-emerald-950">Passo a Passo</CardTitle>
                    </div>
                    <Button onClick={addWorkStep} size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 shrink-0">
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Passo
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-1">
                  <DndContext id="dnd-work-steps" sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndWorkSteps}>
                    <SortableContext items={workSteps} strategy={verticalListSortingStrategy}>
                      {workSteps.map((step, index) => (
                        <SortableItem key={step.id} id={step.id}>
                          <div className="flex flex-col gap-3 bg-white p-4 border border-emerald-50 rounded-lg shadow-sm relative group/step">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                                {String(index + 1).padStart(2, '0')}
                              </div>
                              <Input maxLength={80} value={step.title}
                                onChange={(e) => {
                                  const newSteps = [...workSteps];
                                  const idx = newSteps.findIndex(s => s.id === step.id);
                                  newSteps[idx].title = e.target.value;
                                  setWorkSteps(newSteps);
                                }}
                                className="border-emerald-100 focus-visible:ring-emerald-500 font-bold flex-1"
                              />
                            </div>
                            <div className="space-y-2 pl-11">
                              <Textarea maxLength={300} value={step.desc}
                                onChange={(e) => {
                                  const newSteps = [...workSteps];
                                  const idx = newSteps.findIndex(s => s.id === step.id);
                                  newSteps[idx].desc = e.target.value;
                                  setWorkSteps(newSteps);
                                }}
                                className="min-h-[80px] border-emerald-100 text-sm resize-none"
                              />
                            </div>
                            <Button
                              onClick={() => removeWorkStep(step.id)}
                              variant="ghost"
                              size="icon"
                              className="absolute -right-2 -top-2 text-red-400 hover:text-red-600 hover:bg-red-50 bg-white border border-red-100 shadow-sm opacity-0 group-hover/step:opacity-100 transition-opacity h-6 w-6 rounded-full"
                            >
                              <Trash2 size={12} />
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
        <Button variant="outline" onClick={() => queryClient.invalidateQueries({ queryKey: ["transport-config"] })} className="border-emerald-100 text-emerald-700 hover:bg-emerald-50 px-8">
          Descartar
        </Button>
        <Button
          onClick={() => {
            updateMutation.mutate({
              ...headerConfig,
              ...ctaConfig,
              differentials,
              workSteps
            });
            updateRegionsMutation.mutate(regionsConfig);
          }}
          disabled={updateMutation.isPending || updateRegionsMutation.isPending || isUploadingRegions}
          className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 px-10"
        >
          {(updateMutation.isPending || updateRegionsMutation.isPending) ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
}
