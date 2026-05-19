import type { Metadata } from "next";
import ServiceComex from "@/views/ServiceComex";

export const metadata: Metadata = {
  title: "Sistemas e Consultoria Comex — AvantCargo",
  description: "Otimização de processos e compliance em comércio exterior. Soluções inteligentes para controle aduaneiro e gestão logística de alta performance.",
};

export default function SistemasComexPage() {
  return <ServiceComex />;
}
