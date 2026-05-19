import type { Metadata } from "next";
import ServiceImport from "@/views/ServiceImport";

export const metadata: Metadata = {
  title: "Importação Aérea e Despacho Aduaneiro — AvantCargo",
  description: "Logística integrada e desembaraço de importação ágil e eficiente. Maximize a performance de sua cadeia de suprimentos global com nossos especialistas.",
};

export default function ImportacaoPage() {
  return <ServiceImport />;
}
