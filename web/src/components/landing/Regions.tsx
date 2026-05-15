import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Image from "next/image";
import mapaImg from "@/assets/mapa.png";

interface RegionsProps {
  data?: {
    title: string;
    description: string;
    mapImageUrl: string;
  }
}

const getImageUrl = (url: any) => {
  if (!url) return mapaImg;
  if (typeof url !== "string") return url;
  if (url.includes("/api/files/")) return url;
  if (url.includes("/files/")) {
    return url.replace("/files/", "/api/files/");
  }
  return url;
};

const formatText = (text: string) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <span key={i} className="text-white font-bold">
          {part.slice(2, -2)}
        </span>
      );
    }
    return part;
  });
};

export const Regions = ({ data }: RegionsProps) => {
  const displayTitle =
    data?.title ||
    "";
  const displayDescription =
    data?.description ||
    "";
  const displayImage = getImageUrl(data?.mapImageUrl);

  return (
    <section className="py-32 bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/grid.svg')] bg-center opacity-[0.03] pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div className="max-w-xl space-y-8">
              <h2 className="text-2xl md:text-3xl font-medium leading-relaxed text-slate-200">
                {formatText(displayTitle)}
              </h2>

              <p className="text-slate-400 text-lg leading-relaxed">{formatText(displayDescription)}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[700px]">
              <Image
                src={displayImage}
                alt="Mapa de Atuação AvantCargo"
                width={800}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
