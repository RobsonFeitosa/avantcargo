import ServiceRastreamento from "@/views/ServiceRastreamento";

export const metadata = {
  title: "Rastreamento de Carga | AvantCargo",
  description: "Acompanhe em tempo real a localização e o status da sua carga. Rastreamento de cargas aéreas e terrestres.",
};

export default function RastreamentoDeCargaPage() {
  return <ServiceRastreamento />;
}
