import type { Metadata } from "next";
import ServiceCubagem from "@/views/ServiceCubagem";

export const metadata: Metadata = {
  title: "Cálculo de Cubagem — AvantCargo",
  description: "Calcule a cubagem e o peso cubado de sua carga com facilidade. Ferramenta para transporte e otimização logística.",
};

export default function CalculoCubagemPage() {
  return <ServiceCubagem />;
}
