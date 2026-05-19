import type { Metadata } from "next";
import About from "@/views/About";

export const metadata: Metadata = {
  title: "Sobre a AvantCargo — Logística e Comércio Exterior",
  description: "Sua parceira estratégica em importação, exportação e assessoria aduaneira. Conectamos sua empresa com os principais mercados globais.",
};

export default function SobrePage() {
  return <About />;
}
