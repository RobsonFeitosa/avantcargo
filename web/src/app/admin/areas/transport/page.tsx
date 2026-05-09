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
  Truck,
  LayoutGrid,
  Search,
  Upload,
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
      className={`group flex gap-4 p-4 rounded-xl border border-transparent transition-all w-full ${
        isDragging ? "bg-emerald-50 border-emerald-200 shadow-lg scale-[1.02]" : "hover:border-emerald-50 hover:bg-emerald-50/30"
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
  const [differentials, setDifferentials] = useState([
    { id: "t-1", icon: "CheckCircle2", text: "Transporte rodoviário especializado em Importações e Exportações Aéreas." },
    { id: "t-2", icon: "CheckCircle2", text: "Veículo dedicado à sua operação." },
    { id: "t-3", icon: "CheckCircle2", text: "Transportes urgentes, veículos despachados imediatamente." },
    { id: "t-4", icon: "CheckCircle2", text: "Preparação de cargas para Exportação." },
    { id: "t-5", icon: "CheckCircle2", text: "Repesagem e Fotografias." },
    { id: "t-6", icon: "CheckCircle2", text: "Follow-up Automatizados." },
    { id: "t-7", icon: "CheckCircle2", text: "Pré-cadastro e agendamentos nos aeroportos." },
    { id: "t-8", icon: "CheckCircle2", text: "Etiquetagem." },
    { id: "t-9", icon: "CheckCircle2", text: "Distribuição das Importações." },
    { id: "t-10", icon: "CheckCircle2", text: "Armazenagem." },
    { id: "t-11", icon: "CheckCircle2", text: "Reposição de gelo." },
    { id: "t-12", icon: "CheckCircle2", text: "Check-list completo de cargas especiais." },
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
    setDifferentials([...differentials, { id: `t-${Date.now()}`, icon: "CheckCircle2", text: "" }]);
  };
  
  const removeDiff = (id: string) => {
    setDifferentials(differentials.filter(d => d.id !== id));
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
                <Input maxLength={40} defaultValue="LOGÍSTICA NACIONAL E INTERNACIONAL" className="border-emerald-100" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Título (Parte Escura)</Label>
                  <Input maxLength={60} defaultValue="Transporte" className="border-emerald-100" />
                </div>
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Palavra em Destaque (Parte Verde)</Label>
                  <Input maxLength={40} defaultValue="Rodoviário" className="border-emerald-100 text-emerald-600 font-bold" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Descrição</Label>
                <Textarea maxLength={250} defaultValue="transporte nacional, cargas urgentes, transporte importação, transporte exportação.&#10;Soluções exclusivas para Agentes de Carga." className="min-h-[80px] border-emerald-100" />
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
                
                {/* Imagem (Esquerda) */}
                <div className="xl:col-span-4 space-y-2 shrink-0">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Imagem de Destaque</Label>
                  <div className="border-2 border-dashed border-emerald-100 rounded-xl p-4 text-center hover:bg-emerald-50 transition-colors cursor-pointer group flex flex-col items-center justify-center h-48">
                    <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                      <Upload className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="text-xs font-medium text-emerald-800 mt-2">Clique para alterar a imagem</span>
                  </div>
                </div>

                {/* Textos (Direita) */}
                <div className="xl:col-span-8 space-y-4">
                  <div className="space-y-2">
                    <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Título Principal</Label>
                    <Input maxLength={100} defaultValue="Estratégia e Crescimento para seu Negócio" className="border-emerald-100 font-bold" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Texto (Parte 1)</Label>
                    <Textarea 
                      maxLength={400} 
                      defaultValue="Entendendo a necessidade de nossos clientes, implantamos constantemente serviços estrategicamente desenvolvidos para auxiliar no crescimento da sua empresa através da Avant." 
                      className="min-h-[80px] border-emerald-100" 
                    />
                  </div>

                  <div className="space-y-2 bg-emerald-50/50 p-4 border-l-4 border-emerald-500 rounded-r-lg">
                    <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Frase em Destaque (Citação)</Label>
                    <Textarea 
                      maxLength={300} 
                      defaultValue="Ofereça soluções aos seus clientes totalmente personalizadas e diferenciadas de seus concorrentes no mercado interno." 
                      className="min-h-[60px] border-emerald-200 bg-white italic" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Texto (Parte 2)</Label>
                    <Textarea 
                      maxLength={400} 
                      defaultValue="Serviços exclusivos aos Agentes de Cargas e Comissarias de Despacho Aduaneiro." 
                      className="min-h-[60px] border-emerald-100" 
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
                  <Input maxLength={60} defaultValue="Diferenciais" className="border-emerald-100 font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Palavra em Destaque (Verde)</Label>
                  <Input maxLength={60} defaultValue="Logísticos" className="border-emerald-100 text-emerald-600 font-bold" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Descrição Abaixo do Título</Label>
                  <Input maxLength={150} defaultValue="Soluções completas de transporte e pré-embarque para garantir o sucesso da sua operação." className="border-emerald-100" />
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
