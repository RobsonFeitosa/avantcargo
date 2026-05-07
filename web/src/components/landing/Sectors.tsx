import { Badge } from "@/components/ui/badge";
import { Users, Shield, Globe, Zap, Clock, Box, Landmark, Truck, Radar, Pickaxe, Sparkles, Pill } from "lucide-react";
import { FaIndustry } from "react-icons/fa";
import { motion } from "framer-motion";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-32 bg-emerald-50/10 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="text-center space-y-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="gap-2 text-orange-600 border-orange-500/20 bg-orange-500/5 uppercase tracking-widest px-6 py-2 rounded-full font-bold">
              <FaIndustry className="h-4 w-4" />
              Segmentos
            </Badge>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-emerald-950 tracking-tight"
          >
            Setores que <span className="text-primary">atendemos</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 max-w-2xl mx-auto text-lg"
          >
            Soluções logísticas integradas e personalizadas para as demandas mais exigentes do mercado global.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6"
        >
          {sectors.map((sector, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-8 flex flex-col items-center justify-center gap-5 rounded-2xl bg-white border border-emerald-100 hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/5 transition-all group relative cursor-default"
            >
              <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />

              <sector.icon className="h-7 w-7 text-primary group-hover:text-orange-500 transition-colors" />
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-center text-slate-400 group-hover:text-emerald-900 transition-colors">
                {sector.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
