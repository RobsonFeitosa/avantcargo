import type { Metadata } from "next";
import ServiceTransport from "@/views/ServiceTransport";

export const metadata: Metadata = {
  title: "Transporte Nacional e Internacional — AvantCargo",
  description: "Logística rodoviária integrada para portos, aeroportos e EADI. Segurança e precisão no transporte de suas cargas internacionais com a AvantCargo.",
};

export default function TransportePage() {
  return <ServiceTransport />;
}
