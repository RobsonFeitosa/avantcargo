"use client";

import { useState } from "react";
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
  MessageSquare
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
  const [differentials, setDifferentials] = useState([
    { id: "d-1", icon: "ShieldCheck", text: "Equipe dedicada 24 horas por 7 dias por semana." },
    { id: "d-2", icon: "ShieldCheck", text: "Know-How de excelência." },
    { id: "d-3", icon: "ShieldCheck", text: "Atendimento direto - sem burocracia." },
    { id: "d-4", icon: "ShieldCheck", text: "CCT Importação." },
    { id: "d-5", icon: "ShieldCheck", text: "MRUC nas exportações." },
    { id: "d-6", icon: "ShieldCheck", text: "CE Mercante (futuro CCT Marítimo)." },
    { id: "d-7", icon: "ShieldCheck", text: "Pucomex." },
    { id: "d-8", icon: "ShieldCheck", text: "Sistemas Aeroportuários." },
    { id: "d-9", icon: "ShieldCheck", text: "Follow-up automatizados." },
    { id: "d-10", icon: "ShieldCheck", text: "Acompanhamento em tempo real." },
    { id: "d-11", icon: "ShieldCheck", text: "Lançamentos ágeis." },
    { id: "d-12", icon: "ShieldCheck", text: "Envio de extratos atualizados." },
    { id: "d-13", icon: "ShieldCheck", text: "Bloqueio + Desbloqueio de cargas." },
    { id: "d-14", icon: "ShieldCheck", text: "Atualizações Sistemáticas." },
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
    setDifferentials([...differentials, { id: `d-${Date.now()}`, icon: "ShieldCheck", text: "" }]);
  };
  
  const removeDiff = (id: string) => {
    setDifferentials(differentials.filter(d => d.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-emerald-950">Sistemas Comex</h1>
        <p className="text-emerald-900/60 font-medium">
          Configure a página de Sistemas Comércio Exterior e seus diferenciais.
        </p>
      </div>

      <Tabs defaultValue="header" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-emerald-50/50 border border-emerald-100 p-1 rounded-xl h-auto mb-8">
          <TabsTrigger value="header" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-emerald-950 data-[state=active]:shadow-sm py-3 font-semibold text-emerald-800">Cabeçalho & Destaque</TabsTrigger>
          <TabsTrigger value="differentials" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-emerald-950 data-[state=active]:shadow-sm py-3 font-semibold text-emerald-800">Grid de Capacidades</TabsTrigger>
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
                <Input maxLength={40} defaultValue="TECNOLOGIA E CONFORMIDADE" className="border-emerald-100" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Título (Parte Escura)</Label>
                  <Input maxLength={60} defaultValue="Sistemas" className="border-emerald-100" />
                </div>
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Palavra em Destaque (Parte Verde)</Label>
                  <Input maxLength={40} defaultValue="Comex" className="border-emerald-100 text-emerald-600 font-bold" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Descrição</Label>
                <Textarea maxLength={250} defaultValue="A base sólida por trás dos líderes do mercado! Deixe a responsabilidade técnica conosco e foque no crescimento do seu negócio." className="min-h-[80px] border-emerald-100" />
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
                    <Input maxLength={100} defaultValue="Prioridade Máxima em Lançamentos" className="border-emerald-100 font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Texto Longo</Label>
                    <Textarea 
                      maxLength={800} 
                      defaultValue="Quando o assunto é impulsionar seu negócio através dos nossos serviços, tratamos com prioridade máxima. Deixar a responsabilidade de lançamentos com a Avant te garante tranquilidade e a certeza da excelência em cada etapa da operação.&#10;&#10;Nossa equipe dedicada 24x7 cuida de todo o processo com estratégia, precisão e compromisso com resultados, para que você possa focar no que realmente importa: crescer e escalar com segurança." 
                      className="min-h-[200px] border-emerald-100" 
                    />
                  </div>
                  <div className="space-y-2 pt-2">
                    <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" /> Configuração do Botão WhatsApp
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Input maxLength={30} defaultValue="Saiba Mais" placeholder="Texto do botão" className="border-emerald-100" />
                      <Input maxLength={100} defaultValue="https://wa.me/5511964503217" placeholder="Link do WhatsApp" className="border-emerald-100" />
                    </div>
                  </div>
                </div>

                {/* Coluna Direita */}
                <div className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <h3 className="font-bold text-emerald-950 border-b border-slate-200 pb-2">Card Escuro (Direita)</h3>
                  <div className="space-y-2">
                    <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Título do Card</Label>
                    <Input maxLength={50} defaultValue="Por que Avant?" className="border-slate-200 bg-white" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Tópicos com Check (1 por linha)</Label>
                    <Textarea 
                      maxLength={400} 
                      defaultValue="Atendimento direto - sem burocracia&#10;Precisão técnica em cada lançamento&#10;Escalabilidade com segurança operacional" 
                      className="min-h-[120px] border-slate-200 bg-white font-mono text-sm leading-relaxed" 
                    />
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
                  <Input maxLength={60} defaultValue="Diferenciais e Capacidades" className="border-emerald-100 font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Subtítulo da Seção</Label>
                  <Input maxLength={150} defaultValue="Excelência técnica e suporte contínuo para garantir a fluidez da sua operação internacional." className="border-emerald-100" />
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
      </Tabs>

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
