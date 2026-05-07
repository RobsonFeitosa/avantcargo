import { Badge } from "@/components/ui/badge";
import { Users, Shield, Globe, Zap, Clock, Box, Landmark, Truck, Radar, Pickaxe, Sparkles, Pill } from "lucide-react";

export const Sectors = () => {
  const sectors = [
    { name: "Agentes de Carga", icon: Users },
    { name: "Comissárias", icon: Shield },
    { name: "Cargas Aéreas", icon: Globe },
    { name: "Cargas Perigosas", icon: Zap },
    { name: "Cargas Urgentes", icon: Clock },
    { name: "Cargas de Projeto", icon: Box },
    { name: "Importadores", icon: Landmark },
    { name: "Exportadores", icon: Truck },
    { name: "GRU Airport", icon: Radar },
    { name: "Viracopos (VCP)", icon: Radar },
    { name: "Operações Complexas", icon: Pickaxe },
    { name: "Logística Reversa", icon: Sparkles },
    { name: "Pharma", icon: Pill },
  ];

  return (
    <section className="py-24 bg-secondary/5">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 uppercase tracking-widest px-4 py-1">
            Segmentos
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold">Setores que <span className="text-primary">atendemos</span></h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {sectors.map((sector, idx) => (
            <div key={idx} className={`card-surface p-6 flex flex-col items-center justify-center gap-4 hover:border-primary/40 hover:bg-primary/5 transition-all group`}>
              <div className="h-12 w-12 rounded-full bg-secondary border border-border flex items-center justify-center group-hover:text-primary transition-colors">
                <sector.icon className="h-6 w-6" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-center group-hover:text-foreground transition-colors">
                {sector.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
