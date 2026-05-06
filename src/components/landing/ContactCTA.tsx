import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, CheckCircle2 } from "lucide-react";

export const ContactCTA = () => {
  return (
    <section className="py-24 container">
      <div className="card-surface p-8 md:p-16 relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[120px] -mr-32 -mt-32 rounded-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 blur-[120px] -ml-32 -mb-32 rounded-full" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Fale com nossos <br />
              <span className="text-primary">especialistas</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Soluções ágeis para agentes de carga e comissárias. Controle sua informação e otimize seus resultados hoje mesmo.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Atendimento 24/7",
                "Consultoria personalizada",
                "Orçamento rápido",
                "Suporte especializado",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="text-primary h-5 w-5" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
            <Button size="xl" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-10 h-16 text-lg shadow-glow">
              <MessageSquare className="mr-2 h-5 w-5" /> Fale com um especialista
            </Button>
            <Button size="xl" variant="outline" className="border-border hover:bg-secondary h-16 px-10 font-bold text-lg">
              <Phone className="mr-2 h-5 w-5" /> Ligue agora
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
