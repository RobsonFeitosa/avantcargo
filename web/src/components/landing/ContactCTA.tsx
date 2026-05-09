import { Button } from "@/components/ui/button";
import { Phone, CheckCircle2 } from "lucide-react";
import { FaWhatsapp, FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import Link from "next/link";

interface ContactCTAProps {
  data?: {
    headerTitle: string;
    headerDescription: string;
    features: { id: string; text: string }[];
    primaryButton: { text: string; link: string };
    secondaryButton: { text: string; link: string };
    textLink: { text: string; link: string };
  }
}

export const ContactCTA = ({ data }: ContactCTAProps) => {
  const defaultFeatures = [
    "Importação e Exportação",
    "Ex-Tarifários — alíquota pode chegar a 0%",
    "Drawback e Radar Siscomex",
    "Gestão Aduaneira completa",
  ];

  const currentFeatures = data?.features?.map(f => f.text) || defaultFeatures;

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(249,115,22,0.03),transparent_50%)] pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 items-center">
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="text-4xl font-bold leading-tight text-emerald-950 tracking-tight">
                {data?.headerTitle ? (
                  data.headerTitle.split(" ").map((word, i) => {
                    const isOrange = word.toLowerCase().includes("comércio") || word.toLowerCase().includes("exterior");
                    return (
                      <span key={i} className={isOrange ? "text-orange-500" : ""}>
                        {i > 0 && " "}
                        {word}
                      </span>
                    )
                  })
                ) : (
                  <>Precisa de assessoria em <span className="text-orange-500">Comércio Exterior?</span></>
                )}
              </h2>
              <p className="text-lg text-slate-600 max-w-xl">
                {data?.headerDescription || "Fale agora com um especialista AVANTCARGO. Atendemos empresas de todo o Brasil com agilidade, competência e mais de 20 anos de experiência."}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 gap-y-4"
            >
              {currentFeatures.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 group">
                  <div className="h-5 w-5 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-orange-600 h-3.5 w-3.5" />
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
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
                asChild
                size="lg"
                className="w-full sm:w-[340px] bg-orange-500 hover:bg-orange-600 text-white font-bold h-16 rounded-full shadow-xl shadow-orange-500/20 text-lg group"
              >
                <a href={data?.primaryButton?.link || "https://wa.me/5511964503217"} target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="mr-2 !h-6 !w-6 group-hover:scale-110 transition-transform" />
                  {data?.primaryButton?.text || "Falar no WhatsApp"}
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-[280px] bg-white border-slate-200 text-slate-700 hover:bg-slate-50 h-16 rounded-full font-bold text-lg shadow-sm"
              >
                <a href={data?.secondaryButton?.link || "tel:+5511964503217"}>
                  <Phone className="mr-2 h-5 w-5 text-primary" />
                  {data?.secondaryButton?.text || "(11) 96450-3217"}
                </a>
              </Button>
            </div>

            <Link href={data?.textLink?.link || "/contato"} className="text-slate-400 hover:text-primary transition-colors text-sm flex items-center gap-2 underline underline-offset-4 decoration-slate-200">
              {data?.textLink?.text || "Ou envie uma mensagem"} <FaArrowRightLong className="h-3 w-3" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
