"use client";

import { useEffect, useState } from "react";
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
  Phone,
  MessageSquare,
  HelpCircle,
  MapPin,
  Clock,
  Loader2
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { generalContactActions } from "@/admin/actions/general-contact.actions";
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

export default function ContactConfig() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [headerTitleDark, setHeaderTitleDark] = useState("");
  const [headerTitleHighlight, setHeaderTitleHighlight] = useState("");
  const [headerDescription, setHeaderDescription] = useState("");
  
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");

  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [whatsappSubtitle, setWhatsappSubtitle] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  
  const [email, setEmail] = useState("");
  const [emailSubtitle, setEmailSubtitle] = useState("");
  
  const [instagramUser, setInstagramUser] = useState("");
  const [instagramSubtitle, setInstagramSubtitle] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");

  const [address, setAddress] = useState("");
  const [addressCnpj, setAddressCnpj] = useState("");
  const [addressMapsUrl, setAddressMapsUrl] = useState("");

  const [hoursMonFri, setHoursMonFri] = useState("");
  const [hoursSat, setHoursSat] = useState("");
  const [hoursSun, setHoursSun] = useState("");

  const [faqBadge, setFaqBadge] = useState("");
  const [faqTitle, setFaqTitle] = useState("");

  const [faqs, setFaqs] = useState<{ id: string; q: string; a: string }[]>([]);

  const { data: configData, isLoading } = useQuery({
    queryKey: ["general-contact"],
    queryFn: () => generalContactActions.get(),
    enabled: !!user,
  });

  useEffect(() => {
    if (configData?.result) {
      const { result } = configData;
      setHeaderTitleDark(result.headerTitleDark || "");
      setHeaderTitleHighlight(result.headerTitleHighlight || "");
      setHeaderDescription(result.headerDescription || "");
      setFormTitle(result.formTitle || "");
      setFormDescription(result.formDescription || "");
      setWhatsappNumber(result.whatsappNumber || "");
      setWhatsappSubtitle(result.whatsappSubtitle || "");
      setWhatsappUrl(result.whatsappUrl || "");
      setEmail(result.email || "");
      setEmailSubtitle(result.emailSubtitle || "");
      setInstagramUser(result.instagramUser || "");
      setInstagramSubtitle(result.instagramSubtitle || "");
      setInstagramUrl(result.instagramUrl || "");
      setAddress(result.address || "");
      setAddressCnpj(result.addressCnpj || "");
      setAddressMapsUrl(result.addressMapsUrl || "");
      setHoursMonFri(result.hoursMonFri || "");
      setHoursSat(result.hoursSat || "");
      setHoursSun(result.hoursSun || "");
      setFaqBadge(result.faqBadge || "");
      setFaqTitle(result.faqTitle || "");
      setFaqs(result.faqs || []);
    }
  }, [configData]);

  const mutation = useMutation({
    mutationFn: (data: any) => generalContactActions.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["general-contact"] });
      toast.success("Configurações salvas com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao salvar configurações.");
    }
  });

  const handleSave = () => {
    mutation.mutate({
      headerTitleDark,
      headerTitleHighlight,
      headerDescription,
      formTitle,
      formDescription,
      whatsappNumber,
      whatsappSubtitle,
      whatsappUrl,
      email,
      emailSubtitle,
      instagramUser,
      instagramSubtitle,
      instagramUrl,
      address,
      addressCnpj,
      addressMapsUrl,
      hoursMonFri,
      hoursSat,
      hoursSun,
      faqBadge,
      faqTitle,
      faqs
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEndFaq = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setFaqs((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addFaq = () => {
    setFaqs([...faqs, { id: `faq-${Date.now()}`, q: "", a: "" }]);
  };
  
  const removeFaq = (id: string) => {
    setFaqs(faqs.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-emerald-950">Contato Geral</h1>
        <p className="text-emerald-900/60 font-medium">
          Configure as informações de contato, o cabeçalho da página e as perguntas frequentes.
        </p>
      </div>

      <Tabs defaultValue="header" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-emerald-50/50 border border-emerald-100 p-1 rounded-xl h-auto mb-8">
          <TabsTrigger value="header" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-emerald-950 data-[state=active]:shadow-sm py-3 font-semibold text-emerald-800">Página & Formulário</TabsTrigger>
          <TabsTrigger value="info" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-emerald-950 data-[state=active]:shadow-sm py-3 font-semibold text-emerald-800">Informações de Contato</TabsTrigger>
          <TabsTrigger value="faq" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-emerald-950 data-[state=active]:shadow-sm py-3 font-semibold text-emerald-800">Perguntas Frequentes (FAQ)</TabsTrigger>
        </TabsList>

        {/* Tab 1: Header e Formulário */}
        <TabsContent value="header" className="space-y-8 focus-visible:outline-none focus-visible:ring-0 mt-0">
          <Card className="border-none shadow-sm h-fit">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <Layout className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Cabeçalho da Página</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Título (Parte Escura)</Label>
                  <Input 
                    maxLength={60} 
                    value={headerTitleDark} 
                    onChange={(e) => setHeaderTitleDark(e.target.value)}
                    className="border-emerald-100" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Palavra em Destaque (Laranja)</Label>
                  <Input 
                    maxLength={40} 
                    value={headerTitleHighlight} 
                    onChange={(e) => setHeaderTitleHighlight(e.target.value)}
                    className="border-emerald-100 text-orange-600 font-bold" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Descrição</Label>
                <Textarea 
                  maxLength={250} 
                  value={headerDescription} 
                  onChange={(e) => setHeaderDescription(e.target.value)}
                  className="min-h-[80px] border-emerald-100" 
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm h-fit">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Textos do Formulário</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Título do Formulário</Label>
                <Input 
                  maxLength={60} 
                  value={formTitle} 
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="border-emerald-100 font-bold" 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Descrição do Formulário</Label>
                <Input 
                  maxLength={150} 
                  value={formDescription} 
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="border-emerald-100" 
                />
              </div>
              <p className="text-xs text-emerald-600/70 font-medium italic mt-2">
                * Os campos do formulário (Nome, Email, Telefone, etc) são fixos e não podem ser alterados para garantir o funcionamento do envio.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Informações de Contato */}
        <TabsContent value="info" className="space-y-8 focus-visible:outline-none focus-visible:ring-0 mt-0">
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <Card className="border-none shadow-sm h-fit">
              <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-emerald-600" />
                  <CardTitle className="text-lg font-bold text-emerald-950">Meios de Contato</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                
                <div className="space-y-4 border-b border-emerald-50 pb-4">
                  <Label className="text-emerald-900 font-bold flex items-center gap-2">1. WhatsApp</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-emerald-900/70 font-semibold text-[10px]">Número (Visível)</Label>
                      <Input 
                        value={whatsappNumber} 
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        className="border-emerald-100" 
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-emerald-900/70 font-semibold text-[10px]">Subtítulo</Label>
                      <Input 
                        value={whatsappSubtitle} 
                        onChange={(e) => setWhatsappSubtitle(e.target.value)}
                        className="border-emerald-100" 
                      />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <Label className="text-emerald-900/70 font-semibold text-[10px]">Link do WhatsApp (URL)</Label>
                      <Input 
                        value={whatsappUrl} 
                        onChange={(e) => setWhatsappUrl(e.target.value)}
                        className="border-emerald-100" 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 border-b border-emerald-50 pb-4">
                  <Label className="text-emerald-900 font-bold flex items-center gap-2">2. E-mail</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-emerald-900/70 font-semibold text-[10px]">Endereço de E-mail</Label>
                      <Input 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-emerald-100" 
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-emerald-900/70 font-semibold text-[10px]">Subtítulo</Label>
                      <Input 
                        value={emailSubtitle} 
                        onChange={(e) => setEmailSubtitle(e.target.value)}
                        className="border-emerald-100" 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-emerald-900 font-bold flex items-center gap-2">3. Instagram</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-emerald-900/70 font-semibold text-[10px]">Usuário (@)</Label>
                      <Input 
                        value={instagramUser} 
                        onChange={(e) => setInstagramUser(e.target.value)}
                        className="border-emerald-100" 
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-emerald-900/70 font-semibold text-[10px]">Subtítulo</Label>
                      <Input 
                        value={instagramSubtitle} 
                        onChange={(e) => setInstagramSubtitle(e.target.value)}
                        className="border-emerald-100" 
                      />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <Label className="text-emerald-900/70 font-semibold text-[10px]">Link do Perfil (URL)</Label>
                      <Input 
                        value={instagramUrl} 
                        onChange={(e) => setInstagramUrl(e.target.value)}
                        className="border-emerald-100" 
                      />
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card className="border-none shadow-sm h-fit">
                <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                    <CardTitle className="text-lg font-bold text-emerald-950">Nosso Endereço</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Endereço Completo</Label>
                    <Textarea 
                      value={address} 
                      onChange={(e) => setAddress(e.target.value)}
                      className="min-h-[80px] border-emerald-100" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Informação Adicional (Ex: CNPJ)</Label>
                    <Input 
                      value={addressCnpj} 
                      onChange={(e) => setAddressCnpj(e.target.value)}
                      className="border-emerald-100" 
                    />
                  </div>
                  <div className="space-y-2 pt-2 border-t border-emerald-50">
                    <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Link para o Google Maps (Popup)</Label>
                    <Input 
                      value={addressMapsUrl} 
                      onChange={(e) => setAddressMapsUrl(e.target.value)}
                      placeholder="URL para o iframe ou mapa" className="border-emerald-100" 
                    />
                    <p className="text-[10px] text-emerald-600/70 font-medium">
                      Este link será aberto em um popup quando o usuário clicar em "Ver no mapa".
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm h-fit">
                <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-emerald-600" />
                    <CardTitle className="text-lg font-bold text-emerald-950">Horário de Atendimento</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-3">
                  <div className="grid grid-cols-2 gap-4 items-center">
                    <Label className="text-sm font-medium">Segunda — Sexta</Label>
                    <Input 
                      value={hoursMonFri} 
                      onChange={(e) => setHoursMonFri(e.target.value)}
                      className="border-emerald-100 font-bold text-emerald-700" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 items-center">
                    <Label className="text-sm font-medium">Sábado</Label>
                    <Input 
                      value={hoursSat} 
                      onChange={(e) => setHoursSat(e.target.value)}
                      className="border-emerald-100 font-bold text-orange-600" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 items-center">
                    <Label className="text-sm font-medium">Domingo</Label>
                    <Input 
                      value={hoursSun} 
                      onChange={(e) => setHoursSun(e.target.value)}
                      className="border-emerald-100 font-bold text-orange-600" 
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

        </TabsContent>

        {/* Tab 3: FAQ */}
        <TabsContent value="faq" className="space-y-8 focus-visible:outline-none focus-visible:ring-0 mt-0">
          
          <Card className="border-none shadow-sm overflow-hidden h-full flex flex-col">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-emerald-600" />
                    <CardTitle className="text-lg font-bold text-emerald-950">Perguntas Frequentes</CardTitle>
                  </div>
                  <CardDescription className="text-emerald-800/60 font-medium mt-1">
                    Cadastre as perguntas e respostas que aparecerão no final da página de contato.
                  </CardDescription>
                </div>
                <Button onClick={addFaq} size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 shrink-0">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Pergunta
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-emerald-50">
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Badge (Pílula)</Label>
                  <Input 
                    maxLength={40} 
                    value={faqBadge} 
                    onChange={(e) => setFaqBadge(e.target.value)}
                    className="border-emerald-100" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Título da Seção</Label>
                  <Input 
                    maxLength={60} 
                    value={faqTitle} 
                    onChange={(e) => setFaqTitle(e.target.value)}
                    className="border-emerald-100 font-bold" 
                  />
                </div>
              </div>

              <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-100">
                <DndContext id="dnd-contact-faq" sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndFaq}>
                  <SortableContext items={faqs} strategy={verticalListSortingStrategy}>
                    <div className="grid grid-cols-1 gap-3">
                      {faqs.map((item) => (
                        <SortableItem key={item.id} id={item.id}>
                          <div className="flex flex-col gap-4 bg-white p-4 border border-emerald-50 rounded-lg shadow-sm relative group/item w-full">
                            <div className="space-y-1">
                              <Label className="text-emerald-900/70 font-semibold text-[9px] uppercase tracking-wider">Pergunta</Label>
                              <Input 
                                maxLength={100}
                                value={item.q} 
                                onChange={(e) => {
                                  const newItems = [...faqs];
                                  const idx = newItems.findIndex(i => i.id === item.id);
                                  newItems[idx].q = e.target.value;
                                  setFaqs(newItems);
                                }}
                                className="font-bold text-emerald-950 border-emerald-100" 
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-emerald-900/70 font-semibold text-[9px] uppercase tracking-wider">Resposta</Label>
                              <Textarea 
                                maxLength={500}
                                value={item.a} 
                                onChange={(e) => {
                                  const newItems = [...faqs];
                                  const idx = newItems.findIndex(i => i.id === item.id);
                                  newItems[idx].a = e.target.value;
                                  setFaqs(newItems);
                                }}
                                className="min-h-[80px] text-sm border-emerald-100" 
                              />
                            </div>
                            <Button 
                              onClick={() => removeFaq(item.id)}
                              variant="ghost" 
                              size="icon" 
                              className="absolute -right-2 -top-2 text-red-400 hover:text-red-600 hover:bg-red-50 bg-white border border-red-100 shadow-sm opacity-0 group-hover/item:opacity-100 transition-opacity h-8 w-8 rounded-full"
                            >
                              <Trash2 size={14} />
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
        <Button 
          variant="outline" 
          className="border-emerald-100 text-emerald-700 hover:bg-emerald-50 px-8"
          onClick={() => queryClient.invalidateQueries({ queryKey: ["general-contact"] })}
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
