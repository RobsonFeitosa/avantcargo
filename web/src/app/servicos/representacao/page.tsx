import type { Metadata } from "next";
import ServiceRepresentacao from "@/views/ServiceRepresentacao";

export const metadata: Metadata = {
  title: "Representação e Assessoria Aduaneira — AvantCargo",
  description: "Sua empresa legalmente representada perante a Receita Federal e demais órgãos anuentes. Consultoria aduaneira dedicada e especializada.",
};

export default function RepresentacaoPage() {
  return <ServiceRepresentacao />;
}
