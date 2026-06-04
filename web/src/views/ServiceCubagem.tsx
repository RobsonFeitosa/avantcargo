"use client";

import { LandingLayout } from "@/components/layout/LandingLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Plus, Trash2, Loader2, Mail } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { cubageCalculationActions } from "@/admin/actions/cubage-calculation.actions";
import cubageIllustration from "@/assets/cubage_illustration.png";

interface CalcRow {
  id: string;
  volumes: string;
  height: string;
  width: string;
  depth: string;
}

export default function ServiceCubagem() {
  const { data: configData, isLoading } = useQuery({
    queryKey: ["cubage-calculation-config"],
    queryFn: () => cubageCalculationActions.get(),
  });

  const [rows, setRows] = useState<CalcRow[]>([
    { id: "1", volumes: "", height: "", width: "", depth: "" }
  ]);

  if (isLoading) {
    return (
      <LandingLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      </LandingLayout>
    );
  }

  const config = configData?.result || {
    title: "Cálculo de Cubagem",
    description: "Cubagem é a relação entre o peso e o volume da carga a ser transportada. Para calcular a cubagem, é utilizada a fórmula:\nAltura x largura x profundidade x fator de cubagem. No caso do transporte rodoviário, o fator de cubagem padrão corresponde a 300.\n\nNo formulário abaixo você pode calcular a cubagem de sua carga.\n\n* No caso de o Peso Cubado ser maior que o Peso Real, consideramos o Peso Cubado."
  };

  const parseValue = (val: string): number => {
    if (!val) return 0;
    const normalized = val.replace(",", ".");
    const parsed = parseFloat(normalized);
    return isNaN(parsed) ? 0 : parsed;
  };

  const calculateRowCubage = (row: CalcRow): number => {
    const vols = parseValue(row.volumes);
    const h = parseValue(row.height);
    const w = parseValue(row.width);
    const d = parseValue(row.depth);
    return vols * h * w * d;
  };

  const calculateRowWeight = (row: CalcRow): number => {
    const cubage = calculateRowCubage(row);
    return cubage * 300;
  };

  const handleInputChange = (id: string, field: keyof CalcRow, value: string) => {
    setRows(prev => prev.map(row => row.id === id ? { ...row, [field]: value } : row));
  };

  const addRow = () => {
    setRows(prev => [...prev, { id: Date.now().toString(), volumes: "", height: "", width: "", depth: "" }]);
  };

  const deleteRow = (id: string) => {
    if (rows.length === 1) {
      setRows([{ id: "1", volumes: "", height: "", width: "", depth: "" }]);
      return;
    }
    setRows(prev => prev.filter(row => row.id !== id));
  };

  const totalCubage = rows.reduce((acc, row) => acc + calculateRowCubage(row), 0);
  const totalWeight = rows.reduce((acc, row) => acc + calculateRowWeight(row), 0);

  const formatCubage = (val: number): string => {
    return val.toLocaleString("pt-BR", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4
    });
  };

  const formatWeight = (val: number): string => {
    return val.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <LandingLayout>
      <div className="bg-white min-h-screen">
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden relative border-b-[#009485] border-b-2">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.2),transparent_100%)] pointer-events-none" />
          
          <div className="container relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 space-y-6">
                <ScrollReveal>
                  <Badge variant="outline" className="px-4 py-1.5 border-primary/30 bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase mb-4">
                    Ferramentas de Planejamento
                  </Badge>
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight text-emerald-950 mb-6 whitespace-pre-line">
                    {config.title}
                  </h1>
                  <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {config.description}
                  </p>
                </ScrollReveal>
              </div>
              
              <div className="flex-1 w-full max-w-md lg:max-w-none flex justify-center">
                <ScrollReveal direction="right">
                  <div className="relative w-80 h-80 md:w-96 md:h-96">
                    <Image
                      src={cubageIllustration}
                      alt="Cálculo de Cubagem"
                      fill
                      priority
                      className="object-contain"
                    />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50/50">
          <div className="container">
            <ScrollReveal>
              <Card className="border-none shadow-xl bg-white rounded-3xl overflow-hidden">
                <CardContent className="p-6 md:p-10 space-y-6">
                  <div className="overflow-x-auto">
                    <Table className="min-w-[900px]">
                      <TableHeader>
                        <TableRow className="hover:bg-transparent border-slate-100">
                          <TableHead className="w-[18%] text-emerald-950 font-bold uppercase text-[10px] tracking-wider">Qtd. Volumes</TableHead>
                          <TableHead className="w-[18%] text-emerald-950 font-bold uppercase text-[10px] tracking-wider">Altura (M)</TableHead>
                          <TableHead className="w-[18%] text-emerald-950 font-bold uppercase text-[10px] tracking-wider">Largura (M)</TableHead>
                          <TableHead className="w-[18%] text-emerald-950 font-bold uppercase text-[10px] tracking-wider">Profundidade (M)</TableHead>
                          <TableHead className="w-[13%] text-emerald-950 font-bold uppercase text-[10px] tracking-wider text-right">Cubagem (M³)</TableHead>
                          <TableHead className="w-[13%] text-emerald-950 font-bold uppercase text-[10px] tracking-wider text-right">Peso Cubado (KG)</TableHead>
                          <TableHead className="w-[2%] hover:bg-transparent"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow key={row.id} className="hover:bg-slate-50/30 border-slate-100 group">
                            <TableCell className="py-3">
                              <Input
                                type="text"
                                placeholder="0"
                                value={row.volumes}
                                onChange={(e) => handleInputChange(row.id, "volumes", e.target.value)}
                                className="h-10 text-center font-semibold text-emerald-950 border-emerald-100 focus-visible:ring-emerald-500"
                              />
                            </TableCell>
                            <TableCell className="py-3">
                              <Input
                                type="text"
                                placeholder="0,00"
                                value={row.height}
                                onChange={(e) => handleInputChange(row.id, "height", e.target.value)}
                                className="h-10 text-center font-semibold text-emerald-950 border-emerald-100 focus-visible:ring-emerald-500"
                              />
                            </TableCell>
                            <TableCell className="py-3">
                              <Input
                                type="text"
                                placeholder="0,00"
                                value={row.width}
                                onChange={(e) => handleInputChange(row.id, "width", e.target.value)}
                                className="h-10 text-center font-semibold text-emerald-950 border-emerald-100 focus-visible:ring-emerald-500"
                              />
                            </TableCell>
                            <TableCell className="py-3">
                              <Input
                                type="text"
                                placeholder="0,00"
                                value={row.depth}
                                onChange={(e) => handleInputChange(row.id, "depth", e.target.value)}
                                className="h-10 text-center font-semibold text-emerald-950 border-emerald-100 focus-visible:ring-emerald-500"
                              />
                            </TableCell>
                            <TableCell className="py-3 text-right">
                              <Input
                                disabled
                                type="text"
                                value={formatCubage(calculateRowCubage(row))}
                                className="h-10 text-right font-bold text-slate-500 bg-slate-50/50 border-emerald-50 cursor-not-allowed select-none"
                              />
                            </TableCell>
                            <TableCell className="py-3 text-right">
                              <Input
                                disabled
                                type="text"
                                value={formatWeight(calculateRowWeight(row))}
                                className="h-10 text-right font-bold text-slate-500 bg-slate-50/50 border-emerald-50 cursor-not-allowed select-none"
                              />
                            </TableCell>
                            <TableCell className="py-3 text-center">
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => deleteRow(row.id)}
                                className="h-9 w-9 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}

                        <TableRow className="hover:bg-transparent border-t border-slate-200">
                          <TableCell colSpan={4} className="py-6 font-bold text-emerald-950 uppercase text-xs tracking-wider">
                            Total
                          </TableCell>
                          <TableCell className="py-3 text-right">
                            <Input
                              disabled
                              type="text"
                              value={formatCubage(totalCubage)}
                              className="h-12 text-right font-black text-emerald-900 bg-emerald-50/20 border-emerald-100 cursor-not-allowed select-none text-base shadow-sm"
                            />
                          </TableCell>
                          <TableCell className="py-3 text-right">
                            <Input
                              disabled
                              type="text"
                              value={formatWeight(totalWeight)}
                              className="h-12 text-right font-black text-emerald-900 bg-emerald-50/20 border-emerald-100 cursor-not-allowed select-none text-base shadow-sm"
                            />
                          </TableCell>
                          <TableCell className="py-3"></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex justify-start pt-4 border-t border-slate-100">
                    <Button
                      onClick={addRow}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 h-12 rounded-full shadow-lg shadow-emerald-600/20 transition-all hover:scale-105"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Adicionar Linha
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-24 border-t border-slate-100">
          <div className="container">
            <div className="p-6 md:p-16 rounded-3xl md:rounded-[48px] bg-gradient-to-br from-primary/5 to-orange-500/5 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 text-center md:text-left">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-950 tracking-tight leading-tight">
                  Cálculo Preciso para sua <span className="text-orange-500">Operação</span>
                </h2>
                <p className="text-slate-600 max-w-xl text-lg whitespace-pre-wrap">
                  Nossa equipe de especialistas está pronta para orientar sobre a melhor estratégia de transporte e otimização de espaço para suas cargas.
                </p>
              </div>
              <div className="flex flex-col gap-4 w-full md:w-auto">
                <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white font-bold h-auto min-h-[56px] py-3 px-6 md:px-10 rounded-full shadow-lg shadow-orange-500/20 text-base md:text-lg gap-2 whitespace-normal text-center leading-tight w-full md:w-auto cursor-pointer">
                  <a href="https://wa.me/5511964503217" target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp className="w-5 h-5 shrink-0" />
                    <span>Falar com especialista</span>
                  </a>
                </Button>
                <Button asChild variant="outline" className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50 h-auto min-h-[56px] py-3 px-6 md:px-10 rounded-full text-base md:text-lg gap-2 whitespace-normal text-center leading-tight w-full md:w-auto cursor-pointer">
                  <a href="/contato">
                    <Mail className="h-4 w-4 text-primary shrink-0" />
                    <span>Agendar uma reunião</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}
