import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaBriefcase } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";


import { Box, FileCheck, Landmark, Truck, Radar, FileSearch } from "lucide-react";

export const Services = () => {
  const services = [
    {
      title: "Logística Eficiente",
      desc: "Representação real de GRU a VCP para quem não pode esperar. Soluções ágeis e controle total.",
      icon: Truck,
      featured: true,
    },
    {
      title: "Exportação Aérea",
      desc: "Seu parceiro estratégico com expertise em cargas perigosas e operações de alta complexidade.",
      icon: Box,
    },
    {
      title: "Desembaraço Aduaneiro",
      desc: "Terceirização especializada em aeroportos que acelera o desembaraço e reduz custos operacionais.",
      icon: FileCheck,
    },
    {
      title: "Inteligência Artificial",
      desc: "Uso de IA para otimizar estoques, reduzir desperdícios e prever sazonalidade nos fretes.",
      icon: Landmark,
    },
    {
      title: "Habilitação Radar",
      desc: "Processo completo para habilitar sua empresa a operar legalmente no comércio exterior.",
      icon: Radar,
    },
    {
      title: "Consultoria Técnica",
      desc: "Análise de impacto de condições climáticas e sazonalidade nos custos de frete internacional.",
      icon: FileSearch,
    },
  ];

  return (
    <section id="servicos" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10">
        <div className="text-center space-y-4 mb-20 max-w-2xl mx-auto">
          <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 uppercase tracking-widest px-4 py-1 gap-2 rounded-full">
            <FaBriefcase />
            <span>O que fazemos</span>
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-950">Principais <span className="text-primary">Serviços</span></h2>
          <p className="text-slate-600 text-lg">
            Oferecemos soluções completas para integrar sua empresa ao mercado internacional com eficiência e segurança.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, idx) => (
            <Card
              key={idx}
              className={`p-10 border-slate-200 bg-white group hover:border-primary/50 transition-all duration-500 relative overflow-hidden flex flex-col h-full hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 ${s.featured ? "border-orange-500/30 shadow-xl shadow-orange-500/5 ring-1 ring-orange-500/5" : "shadow-sm"}`}
            >
              <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {s.featured && (
                <div className="mb-6">
                  <Badge variant="outline" className="bg-orange-500 text-white border-none text-[10px] uppercase font-bold px-4 py-1 rounded-full tracking-widest shadow-lg">
                    Mais popular
                  </Badge>
                </div>
              )}

              <div className="h-16 w-16 rounded-[20px] bg-slate-50 border border-slate-100 flex items-center justify-center mb-10 group-hover:scale-110 transition-all duration-500">
                <s.icon className="h-8 w-8 text-primary group-hover:text-orange-500 group-hover:-rotate-12 transition-all duration-500" />
              </div>

              <h3 className="text-2xl font-bold mb-4 text-emerald-900 group-hover:text-primary transition-colors duration-300">{s.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-10 flex-grow">
                {s.desc}
              </p>

              <button className="text-sm font-bold text-primary flex items-center gap-2 group/btn hover:translate-x-1 transition-all duration-300">
                Saiba mais <FaArrowRightLong className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
