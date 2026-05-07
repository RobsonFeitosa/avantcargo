import { Badge } from "@/components/ui/badge";
import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Osvaldo Mendes",
      role: "CEO",
      text: "Atendimento personalizado, rápido, eficiente e proativo. Experiência positiva, recomendamos.",
      initials: "OM",
    },
    {
      name: "Hewerton Precioso",
      role: "Engenheiro Eletrônico — Especializado em Partes e Peças",
      text: "Grata surpresa com o atendimento e com os resultados do trabalho contratado. Alto nível moral e intelectual, rapidez e precisão nas respostas e disponibilidade para pesquisar dúvidas inerentes da dinâmica da legislação. Gratidão!",
      initials: "HP",
    },
    {
      name: "Diogo Fazolo",
      role: "Mestre em Direito — Especialista em Direito Aduaneiro",
      text: "Conheço a empresa já há alguns anos, atendimento excelente, muita competência e conhecimento da legislação aduaneira. Tenho plena confiança em indicar o trabalho do Sr. Lucas Echevengua.",
      initials: "DF",
    },
    {
      name: "Cleverson Martins Bassetto",
      role: "CEO — Empresa Multinacional",
      text: "Já somos clientes há 7 anos e não trocamos de assessoria devido à qualidade no serviço e atendimento tanto do Lucas como de toda a equipe. Alto nível técnico e prático, recomendo!",
      initials: "CB",
    },
    {
      name: "Carlos A A Oliveira",
      role: "Engenheiro Mecânico — Especializado em Projetos de Importação",
      text: "Fui atendido sempre de forma pronta e extremamente profissional nas importações que fizemos. Documentação sempre OK e conhecimento profundo das normas de importação/exportação internacionais. Nota 10, recomendo 100%.",
      initials: "CO",
    },
    {
      name: "Camila Rodrigues",
      role: "Gerente de Compras",
      text: "Ótima assessoria para importar seus produtos dentro da legalidade aduaneira, suporte para Radar e auxílio na classificação fiscal de todos os produtos. Lucas sempre rápido e solícito em todas as nossas dúvidas.",
      initials: "CR",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-32 bg-[hsl(184_50%_4%)] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.03),transparent_70%)] pointer-events-none" />

      <div className="container relative z-10">
        <div className="text-center space-y-6 mb-20   mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="gap-2 text-orange-500 border-orange-500/30 bg-orange-500/10 uppercase tracking-widest px-6 py-2 rounded-full font-bold">
              <Star className="h-4 w-4 fill-orange-500" />
              Depoimentos
            </Badge>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tight"
          >
            O que nossos <span className="text-orange-500">clientes dizem</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-emerald-100/60 text-lg"
          >
            Alguns depoimentos de pessoas e empresas que acreditam em nosso trabalho.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="p-8 md:p-10 rounded-[32px] bg-white/[0.03] border border-white/10 hover:border-orange-500/30 transition-all group relative flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-orange-500 text-orange-500" />
                  ))}
                </div>
                <Quote className="h-10 w-10 text-white/10 group-hover:text-orange-500/20 transition-colors" />
              </div>

              <p className="text-base md:text-lg text-emerald-100/70 italic leading-relaxed mb-10 flex-grow">
                "{t.text}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <div className="h-12 w-12 rounded-full bg-teal-600/40 border border-blue-400/30 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {t.initials}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm md:text-base leading-tight">{t.name}</h4>
                  <p className="text-[10px] md:text-xs text-emerald-100/40 font-medium uppercase tracking-wider mt-1">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
