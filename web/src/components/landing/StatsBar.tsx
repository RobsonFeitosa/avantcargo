import { CountUp } from "@/components/animations/CountUp";

interface StatsBarProps {
  stats?: { id: string; value: string; label: string }[];
}

import { ScrollReveal } from "@/components/animations/ScrollReveal";

export const StatsBar = ({ stats }: StatsBarProps) => {
  const defaultStats = [
    { value: "20+", label: "Anos de experiência no mercado" },
    { value: "500+", label: "Clientes atendidos" },
    { value: "98%", label: "Taxa de retenção e fidelidade" },
    { value: "100%", label: "Segurança jurídica" },
  ];

  const currentStats = stats || defaultStats;

  return (
    <div className="py-12 border-y border-border/50 border-t-[#009485] border-t-2 bg-secondary/20 !rounded-lg  ">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 bg-white/50 !rounded-lg divide-x divide-border/80">
          {currentStats.map((stat, idx) => (
            <ScrollReveal key={idx} direction="up" delay={0.1 * (idx + 1)}>
              <div className="text-center space-y-2 group py-6 px-4">
                <p className="text-3xl md:text-4xl font-bold text-foreground group-hover:text-primary transition-colors">
                  <CountUp value={stat.value} />
                </p>
                <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider font-medium   mx-auto">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};
