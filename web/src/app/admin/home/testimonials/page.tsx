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
  MessageSquareQuote, 
  GripVertical,
  Trash2,
  Plus
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
      className={`group flex items-start gap-3 p-4 rounded-xl border border-transparent transition-all ${
        isDragging ? "bg-emerald-50 border-emerald-200 shadow-lg scale-[1.02]" : "hover:border-emerald-50 hover:bg-emerald-50/30"
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="mt-2 cursor-grab active:cursor-grabbing text-emerald-900/20 group-hover:text-emerald-600 transition-colors"
      >
        <GripVertical size={20} />
      </div>
      <div className="flex-1 w-full">
        {children}
      </div>
    </div>
  );
}

export default function TestimonialsConfig() {
  const [testimonials, setTestimonials] = useState([
    { 
      id: "test-1", 
      name: "Osvaldo Mendes", 
      role: "CEO",
      stars: 5,
      message: "Atendimento personalizado, rápido, eficiente e proativo. Experiência positiva, recomendamos." 
    },
    { 
      id: "test-2", 
      name: "Hewerton Precioso", 
      role: "Engenheiro Eletrônico — Especializado em partes e peças",
      stars: 5,
      message: "Grata surpresa com o atendimento e com os resultados do trabalho contratado. Alto nível moral e intelectual, rapidez e precisão nas respostas e disponibilidade para pesquisar dúvidas inerentes da dinâmica da legislação. Gratidão!" 
    },
    { 
      id: "test-3", 
      name: "Diogo Fazolo", 
      role: "Mestre em Direito — Especialista em Direito Aduaneiro",
      stars: 5,
      message: "Conheço a empresa já há alguns anos, atendimento excelente, muita competência e conhecimento da legislação aduaneira. Tenho plena confiança em indicar o trabalho do Sr. Matheus Diniz." 
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setTestimonials((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addTestimonial = () => {
    const newId = `test-${Date.now()}`;
    setTestimonials([
      ...testimonials, 
      { id: newId, name: "", role: "", stars: 5, message: "" }
    ]);
  };

  const removeTestimonial = (idToRemove: string) => {
    setTestimonials(testimonials.filter(t => t.id !== idToRemove));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-emerald-950">Depoimentos</h1>
        <p className="text-emerald-900/60 font-medium">
          Configure a seção de depoimentos de clientes (carrossel) exibida na página inicial.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <div className="w-full max-w-4xl">
          {/* Cabeçalho da Seção */}
          <Card className="border-none shadow-sm overflow-hidden h-fit">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <Layout className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-lg font-bold text-emerald-950">Cabeçalho da Seção</CardTitle>
              </div>
              <CardDescription className="text-emerald-800/60 font-medium">
                Textos introdutórios exibidos acima do carrossel de depoimentos.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Badge Superior</Label>
                <Input maxLength={80} defaultValue="DEPOIMENTOS" className="border-emerald-100 focus-visible:ring-emerald-500" />
              </div>
              
              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Título Principal</Label>
                <Input maxLength={80} defaultValue="O que nossos clientes dizem" className="border-emerald-100 focus-visible:ring-emerald-500 text-lg font-semibold" />
              </div>

              <div className="space-y-2">
                <Label className="text-emerald-900/70 font-semibold uppercase text-[10px] tracking-wider">Subtítulo / Descrição</Label>
                <Textarea maxLength={250} defaultValue="Alguns depoimentos de pessoas e empresas que acreditam em nosso trabalho." className="min-h-[80px] border-emerald-100 focus-visible:ring-emerald-500" />
              </div>

              <div className="flex justify-end gap-4 pt-4 mt-2 border-t border-emerald-50">
                <Button variant="outline" className="border-emerald-100 text-emerald-700 hover:bg-emerald-50 px-8">
                  Descartar
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 px-10">
                  <Save className="w-4 h-4 mr-2" />
                  Salvar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full">
          {/* Lista de Depoimentos */}
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <MessageSquareQuote className="w-5 h-5 text-emerald-600" />
                    <CardTitle className="text-lg font-bold text-emerald-950">Lista de Depoimentos</CardTitle>
                  </div>
                  <CardDescription className="text-emerald-800/60 font-medium mt-1">
                    Adicione, remova ou reordene os depoimentos do carrossel.
                  </CardDescription>
                </div>
                <Button onClick={addTestimonial} size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 shrink-0">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Depoimento
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-1">
              {testimonials.length === 0 && (
                <div className="text-center py-8 text-emerald-900/40 font-medium text-sm border-2 border-dashed border-emerald-100 rounded-lg">
                  Nenhum depoimento cadastrado. Clique no botão acima para adicionar.
                </div>
              )}
              
              <DndContext id="dnd-testimonials" sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={testimonials} strategy={verticalListSortingStrategy}>
                  {testimonials.map((testimonial, index) => (
                    <SortableItem key={testimonial.id} id={testimonial.id}>
                      <div className="flex flex-col gap-3 bg-white p-4 border border-emerald-50 rounded-lg shadow-sm relative group/item">
                        
                        <Button 
                          onClick={() => removeTestimonial(testimonial.id)}
                          variant="ghost" 
                          size="icon" 
                          className="absolute right-2 top-2 text-red-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover/item:opacity-100 transition-opacity"
                        >
                          <Trash2 size={16} />
                        </Button>

                        <div className="flex items-center gap-2 pr-10">
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">#{index + 1}</span>
                          <div className="flex-1">
                            <Label className="text-emerald-900/70 font-semibold text-[10px]">Nome do Cliente</Label>
                            <Input maxLength={80} value={testimonial.name} 
                              onChange={(e) => {
                                const newItems = [...testimonials];
                                const idx = newItems.findIndex(t => t.id === testimonial.id);
                                newItems[idx].name = e.target.value;
                                setTestimonials(newItems);
                              }}
                              placeholder="Ex: Osvaldo Mendes"
                              className="border-emerald-100 focus-visible:ring-emerald-500 font-bold h-8" 
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-3">
                          <div className="col-span-3 space-y-1">
                            <Label className="text-emerald-900/70 font-semibold text-[10px]">Cargo / Função</Label>
                            <Input maxLength={80} value={testimonial.role} 
                              onChange={(e) => {
                                const newItems = [...testimonials];
                                const idx = newItems.findIndex(t => t.id === testimonial.id);
                                newItems[idx].role = e.target.value;
                                setTestimonials(newItems);
                              }}
                              placeholder="Ex: CEO"
                              className="border-emerald-100 focus-visible:ring-emerald-500 text-xs h-8" 
                            />
                          </div>
                          <div className="col-span-1 space-y-1">
                            <Label className="text-emerald-900/70 font-semibold text-[10px]">Estrelas (1-5)</Label>
                            <Input maxLength={5} type="number"
                              min="1"
                              max="5"
                              value={testimonial.stars} 
                              onChange={(e) => {
                                const newItems = [...testimonials];
                                const idx = newItems.findIndex(t => t.id === testimonial.id);
                                newItems[idx].stars = Number(e.target.value) || 5;
                                setTestimonials(newItems);
                              }}
                              className="border-emerald-100 focus-visible:ring-emerald-500 text-center h-8" 
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <Label className="text-emerald-900/70 font-semibold text-[10px]">Mensagem</Label>
                          <Textarea maxLength={300} value={testimonial.message} 
                            onChange={(e) => {
                              const newItems = [...testimonials];
                              const idx = newItems.findIndex(t => t.id === testimonial.id);
                              newItems[idx].message = e.target.value;
                              setTestimonials(newItems);
                            }}
                            placeholder="Depoimento..."
                            className="min-h-[80px] border-emerald-100 focus-visible:ring-emerald-500 text-sm resize-none" 
                          />
                        </div>
                      </div>
                    </SortableItem>
                  ))}
                </SortableContext>
              </DndContext>

              {testimonials.length > 0 && (
                <div className="flex items-center justify-between pt-4 border-t border-emerald-50 mt-4">
                  <p className="text-xs text-emerald-900/60 font-medium">
                    Mostrando {testimonials.length} depoimentos
                  </p>
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-emerald-100 text-emerald-700" disabled>
                      {"<"}
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-emerald-50 border-emerald-200 text-emerald-800">
                      1
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-emerald-100 text-emerald-700">
                      2
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-emerald-100 text-emerald-700">
                      {">"}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  );
}
