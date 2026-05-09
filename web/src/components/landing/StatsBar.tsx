import { useEffect, useState, useRef } from "react";
import { useInView, animate } from "framer-motion";

const CountUpValue = ({ value }: { value: string }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
      const suffix = value.replace(/[0-9]/g, "");
      const startValue = Math.max(0, numericValue - 30); // Starting with an offset of 30 as requested

      const controls = animate(startValue, numericValue, {
        duration: 2,
        ease: "easeOut",
        onUpdate(v) {
          setDisplayValue(Math.floor(v) + suffix);
        },
      });

      return () => controls.stop();
    }
  }, [value, isInView]);

  return <span ref={nodeRef}>{displayValue}</span>;
};

interface StatsBarProps {
  stats?: { id: string; value: string; label: string }[];
}

export const StatsBar = ({ stats }: StatsBarProps) => {
  const defaultStats = [
    { value: "20+", label: "Anos de experiência no mercado" },
    { value: "500+", label: "Clientes atendidos" },
    { value: "98%", label: "Taxa de retenção e fidelidade" },
    { value: "100%", label: "Segurança jurídica" },
  ];

  const currentStats = stats || defaultStats;

  return (
    <div className="py-12 border-y border-border/50 bg-secondary/20 !rounded-lg ">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 bg-white/50 !rounded-lg divide-x divide-border/80">
          {currentStats.map((stat, idx) => (
            <div key={idx} className="text-center space-y-2 group py-6 px-4">
              <p className="text-3xl md:text-4xl font-bold text-foreground group-hover:text-primary transition-colors">
                <CountUpValue value={stat.value} />
              </p>
              <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider font-medium   mx-auto">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
