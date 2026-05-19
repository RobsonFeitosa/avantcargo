import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://avantcargo.com.br";
  const routes = [
    "",
    "/atuacao",
    "/contato",
    "/quem-somos",
    "/quem-somos/carreiras",
    "/sobre",
    "/servicos/exportacao",
    "/servicos/importacao",
    "/servicos/representacao",
    "/servicos/sistemas-comex",
    "/servicos/transporte",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
