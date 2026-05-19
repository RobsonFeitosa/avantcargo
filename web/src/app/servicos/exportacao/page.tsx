import type { Metadata } from "next";
import ServiceExport from "@/views/ServiceExport";

export const metadata: Metadata = {
  title: "Exportação Aérea Internacional — AvantCargo",
  description: "Soluções completas de exportação aérea com máxima agilidade e segurança. Despacho aduaneiro célere nos principais aeroportos do Brasil.",
};

export default function ExportacaoPage() {
  return <ServiceExport />;
}
