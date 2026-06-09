"use client";

import { LandingLayout } from "@/components/layout/LandingLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Search, Loader2, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { cargoTrackingActions } from "@/admin/actions/cargo-tracking.actions";

export default function ServiceRastreamento() {
  const { data: configData, isLoading } = useQuery({
    queryKey: ["cargo-tracking-config"],
    queryFn: () => cargoTrackingActions.get(),
  });

  const [trackingCode, setTrackingCode] = useState("");

  const formatTrackingCode = (raw: string): string => {
    const digits = raw.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  };

  const getTrackingInfo = () => {
    const cleanDigits = trackingCode.replace(/\D/g, "");
    if (cleanDigits.length < 3) return null;

    const prefix = cleanDigits.slice(0, 3);
    const serial = cleanDigits.slice(3);

    const trackingUrls: Record<string, { name: string; url: string }> = {
      "001": { name: "American Airlines Cargo", url: `https://www.aacargo.com/mobile/tracking-details.html?awb=${prefix}${serial}` },
      "006": { name: "Delta Cargo", url: `https://www.deltacargo.com/Cargo/trackShipment?awbNumber=${prefix}${serial}` },
      "014": { name: "Air Canada Cargo", url: `https://www.aircanada.com/cargo/tracking?awbnb=${prefix}-${serial}` },
      "016": { name: "United Cargo", url: `https://www.unitedcargo.com/en/us/track/awb/${prefix}-${serial}` },
      "020": { name: "Lufthansa Cargo", url: `https://www.lufthansa-cargo.com/en/eservices/etracking/tracking/-/awb/${prefix}/${serial}?searchFilter=awb` },
      "172": { name: "Cargolux", url: `https://www.cargolux.com/track-and-Trace#numbers=${prefix}-${serial}` },
    };

    const carrier = trackingUrls[prefix];
    if (carrier) {
      return carrier;
    }
    return {
      name: "Outras Companhias (Buscador Universal)",
      url: `https://parcelsapp.com/en/tracking/${prefix}${serial}`,
    };
  };

  const handleTrack = () => {
    const info = getTrackingInfo();
    if (info) {
      window.open(info.url, "_blank", "noopener noreferrer");
    }
  };

  const isButtonDisabled = trackingCode.trim().length === 0;

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
    title: "Rastreamento de Carga",
    description: "Acompanhe em tempo real a localização e o status da sua carga. Utilize o campo abaixo para inserir o número de rastreamento e obter informações atualizadas sobre o seu envio.",
  };

  return (
    <LandingLayout>
      <div className="bg-white min-h-screen">
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden relative border-b-[#009485] border-b-2">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.15),transparent_70%)] pointer-events-none" />

          <div className="container relative z-10">
            <ScrollReveal>
              <div className="flex flex-col items-center text-center  mx-auto space-y-6">
                <Badge variant="outline" className="px-4 py-1.5 border-primary/30 bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase">
                  Ferramentas de Logística
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight text-emerald-950 whitespace-pre-line">
                  {config.title}
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-wrap  ">
                  {config.description}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 bg-slate-50/50">
          <div className="container">
            <ScrollReveal>
              <Card className="border-none shadow-xl bg-white rounded-3xl overflow-hidden max-w-3xl mx-auto">
                <CardContent className="p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h2 className="text-xl font-bold text-emerald-950">Consultar Rastreamento</h2>
                  </div>
                  <p className="text-slate-500 text-sm mb-8 ml-[52px]">
                    Insira o código de rastreamento da sua carga abaixo.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 flex flex-col">
                      <Input
                        id="tracking-code-input"
                        type="text"
                        placeholder="Digite o código de rastreamento..."
                        value={trackingCode}
                        onChange={(e) => setTrackingCode(e.target.value)}
                        className="w-full h-14 text-base border-emerald-100 focus-visible:ring-emerald-500 font-semibold text-emerald-950 placeholder:font-normal placeholder:text-slate-400 rounded-2xl px-5"
                      />
                      {trackingCode.trim().length >= 3 && (() => {
                        const info = getTrackingInfo();
                        if (!info) return null;
                        return (
                          <div className="mt-3 text-xs text-slate-500 font-medium ml-2">
                            Companhia identificada: <span className="text-emerald-700 font-bold">{info.name}</span>
                          </div>
                        );
                      })()}
                    </div>
                    <Button
                      id="tracking-submit-btn"
                      onClick={handleTrack}
                      disabled={isButtonDisabled}
                      className="h-14 px-8 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02] gap-2 whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      <Search className="w-5 h-5" />
                      Siga diretamente
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
                  Precisa de <span className="text-orange-500">ajuda</span> com sua carga?
                </h2>
                <p className="text-slate-600 max-w-xl text-lg whitespace-pre-wrap">
                  Nossa equipe de especialistas está disponível para auxiliar no acompanhamento e na gestão do seu transporte internacional ou nacional.
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
