import type { Metadata } from "next";
import AreasOfAction from "@/views/AreasOfAction";

export const metadata: Metadata = {
  title: "Áreas de Atuação — AvantCargo",
  description: "Nossa presença estratégica nos principais portos, aeroportos e fronteiras do Brasil. Logística internacional de ponta a ponta com alta performance.",
};

export default function AtuacaoPage() {
  return <AreasOfAction />;
}
