import type { Metadata } from "next";
import About from "@/views/About";

export const metadata: Metadata = {
  title: "Quem Somos — AvantCargo",
  description: "Conheça a história, missão e valores da AvantCargo. Somos especialistas em transporte aéreo internacional, despacho aduaneiro e logística de alta performance.",
};

export default function QuemSomosPage() {
  return <About />;
}
