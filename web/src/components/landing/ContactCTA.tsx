import { Button } from "@/components/ui/button";
import { Phone, CheckCircle2 } from "lucide-react";
import { FaWhatsapp, FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";

export const ContactCTA = () => {
  return (
    <section className="py-24 bg-emerald-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(249,115,22,0.05),transparent_50%)] pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 items-center">
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="text-4xl font-bold leading-tight text-white tracking-tight">
                Precisa de assessoria em{" "}
                <span className="text-orange-500">Comércio Exterior?</span>
              </h2>
              <p className="text-lg text-emerald-100/60 max-w-xl">
                Fale agora com um especialista AVANTCARGO. Atendemos empresas de todo o Brasil com agilidade, competência e mais de 20 anos de experiência.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 gap-y-4"
            >
              {[
                "Importação e Exportação",
                "Ex-Tarifários — alíquota pode chegar a 0%",
                "Drawback e Radar Siscomex",
                "Gestão Aduaneira completa",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 group">
                  <div className="h-5 w-5 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-orange-500 h-3.5 w-3.5" />
                  </div>
                  <span className="text-white/80 font-medium">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center lg:items-end gap-6 w-full lg:w-auto"
          >
            <div className="flex flex-col items-center lg:items-end gap-4 w-full">
              <Button
                size="lg"
                className="w-full sm:w-[340px] bg-orange-500 hover:bg-orange-600 text-white font-bold h-16 rounded-full shadow-lg shadow-orange-500/20 text-lg group"
              >
                <FaWhatsapp className="mr-2 !h-6 !w-6 group-hover:scale-110 transition-transform" />
                Falar no WhatsApp
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-[280px] bg-white/5 border-white/20 text-white hover:bg-white/10 h-16 rounded-full font-bold text-lg"
              >
                <Phone className="mr-2 h-5 w-5" />
                (41) 3311-2890
              </Button>
            </div>

            <button className="text-white/40 hover:text-white transition-colors text-sm flex items-center gap-2 underline underline-offset-4 decoration-white/20">
              Ou envie uma mensagem <FaArrowRightLong className="h-3 w-3" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
