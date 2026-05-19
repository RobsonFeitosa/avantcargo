import type { Metadata } from "next";
import Contact from "@/views/Contact";

export const metadata: Metadata = {
  title: "Contato e Perguntas Frequentes (FAQ) — AvantCargo",
  description: "Fale com nossos especialistas em comércio exterior. Tire suas dúvidas sobre exportação, importação, despacho aduaneiro e logística de alta performance no nosso FAQ.",
};

export default function ContatoPage() {
  return <Contact />;
}
