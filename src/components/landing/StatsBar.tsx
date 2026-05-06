export const StatsBar = () => {
  const stats = [
    { value: "20+", label: "Anos de experiência no mercado" },
    { value: "500+", label: "Clientes atendidos" },
    { value: "98%", label: "Taxa de retenção e fidelidade" },
    { value: "100%", label: "Segurança jurídica" },
  ];

  return (
    <div className="py-12 border-y border-border/50 bg-secondary/20">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center space-y-2 group">
              <p className="text-3xl md:text-4xl font-bold text-foreground group-hover:text-primary transition-colors">
                {stat.value}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider font-medium max-w-[150px] mx-auto">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
