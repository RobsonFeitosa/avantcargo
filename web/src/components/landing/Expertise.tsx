import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BsFillPeopleFill } from "react-icons/bs";
import { CheckCircle2, Star, TrendingUp, Globe, Handshake, Scale, Award, Users } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export const Expertise = () => {
  const leftItems = [
    {
      icon: Award,
      title: "98% de aprovação no MDIC",
      desc: "Taxa de sucesso em processos de Ex-Tarifário",
      iconColor: "text-orange-500"
    },
    {
      icon: Handshake,
      title: "Atendimento personalizado",
      desc: "Especialistas dedicados para cada cliente",
      iconColor: "text-orange-500"
    },
    {
      icon: Scale,
      title: "Conformidade regulatória total",
      desc: "Processos 100% legais e auditáveis",
      iconColor: "text-orange-500"
    },
  ];

  const rightItems = [
    {
      icon: Star,
      title: "Ex-Tarifário",
      desc: "Redução de até 100% no II — alíquota 0%",
      iconColor: "text-orange-500"
    },
    {
      icon: TrendingUp,
      title: "R$ 480M+ economizados",
      desc: "Para os nossos clientes",
      iconColor: "text-orange-500"
    },
    {
      icon: Globe,
      title: "13+ setores",
      desc: "Indústria, Agro, Tech, Infraestrutura...",
      iconColor: "text-orange-500"
    },
  ];

  return (
    <section id="sobre" className="py-24 bg-[hsl(184_50%_4%)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-primary/5 pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-10">
            <div className="space-y-6">
              <Badge variant="outline" className="gap-2 text-orange-500 border-orange-500/30 bg-orange-500/10 uppercase tracking-widest px-4 py-1.5 rounded-full font-bold">
                <BsFillPeopleFill className="h-4 w-4" />
                Quem somos
              </Badge>
              <h2 className="text-4xl md:text-6xl font-bold leading-tight text-white">
                Mais de <span className="text-orange-500">20 anos</span> de expertise em Comércio Exterior
              </h2>
              <p className="text-lg text-emerald-100/60 leading-relaxed">
                Atuamos com excelência em todos os portos, aeroportos e fronteiras do Brasil, garantindo que sua carga chegue ao destino final sem imprevistos e com o melhor custo-benefício.
              </p>
            </div>

            <div className="space-y-4">
              {leftItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all group">
                  <div className={`h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center ${item.iconColor} group-hover:scale-110 transition-transform`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-white text-lg">{item.title}</h4>
                    <p className="text-sm text-emerald-100/40">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 h-16 rounded-full shadow-lg shadow-orange-500/20 transition-all hover:scale-105 text-lg">
                Conheça nossa história
              </Button>
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold px-10 h-16 rounded-full transition-all text-lg">
                Fale conosco
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {rightItems.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-white/[0.08] transition-all group relative overflow-hidden">
                <div className="flex items-center gap-6">
                  <div className={`h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center ${item.iconColor} group-hover:scale-110 transition-transform`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-lg text-white">{item.title}</h4>
                    <p className="text-sm text-emerald-100/40">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Founder Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/30 hover:border-primary/50 transition-all group relative overflow-hidden">
              <div className="flex items-center gap-6">
                <div className="h-12 w-12 rounded-full border-2 border-orange-500 p-1 group-hover:scale-110 transition-transform shrink-0">
                  <div className="h-full w-full rounded-full bg-white/10 flex items-center justify-center text-orange-500 font-bold text-sm">
                    MD
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-lg text-white">Matheus Diniz</h4>
                  <p className="text-sm text-emerald-100/40">Fundador & Especialista</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
