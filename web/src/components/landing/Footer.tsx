"use client";

import { Facebook, Instagram, Linkedin, Twitter, MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";

import * as LucideIcons from "lucide-react";

interface FooterProps {
  data?: {
    description: string;
    social_links: { icon: string; link: string }[];
    contact_info: { address: string; phone: string; email: string };
    footer_links: { title: string; links: { name: string; path: string }[] }[];
    copyrightText: string;
    termsLink: string;
    privacyLink: string;
  }
}

const SocialIcon = ({ name, className }: { name: string, className?: string }) => {
  const Icon = (LucideIcons as any)[name];
  return Icon ? <Icon className={className} /> : null;
};

export const Footer = ({ data }: FooterProps) => {
  const defaultSocial = [
    { icon: "Linkedin", link: "#" },
    { icon: "Instagram", link: "#" },
    { icon: "Facebook", link: "#" },
    { icon: "Twitter", link: "#" },
  ];

  const currentSocial = data?.social_links || defaultSocial;

  return (
    <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center gap-2">
              <Image src={logo} alt="AvantCargo Logo" className="h-16 w-auto object-contain" />
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              {data?.description || "AvantCargo - Logística e Serviços Aduaneiros. Referência em assessoria de comércio exterior, oferecendo soluções estratégicas e operacionais."}
            </p>
            <div className="flex gap-4">
              {currentSocial.map((item, idx) => (
                item.link && (
                  <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full border border-slate-300 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all text-slate-600">
                    <SocialIcon name={item.icon} className="h-5 w-5" />
                  </a>
                )
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-emerald-950">Institucional</h4>
            <ul className="space-y-4">
              {[
                { name: "Início", path: "/" },
                { name: "Quem Somos", path: "/quem-somos" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-sm text-slate-500 hover:text-primary transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-emerald-950">Áreas de Atuação</h4>
            <ul className="space-y-4">
              {[
                { name: "Representação", path: "/servicos/representacao" },
                { name: "Sistemas Comex", path: "/servicos/sistemas-comex" },
                { name: "Transportes", path: "/servicos/transporte" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-sm text-slate-500 hover:text-primary transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-emerald-950">Acesso Rápido</h4>
            <ul className="space-y-4">
              {[
                { name: "Áreas de Atuação", path: "/atuacao" },
                { name: "Contato", path: "/contato" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-sm text-slate-500 hover:text-primary transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-emerald-950">Contato</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-slate-600">
                <LucideIcons.MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>{data?.contact_info?.address || "Guarulhos - SP, Brasil"}</span>
              </li>
              <li className="flex gap-3 text-sm text-slate-600">
                <LucideIcons.Phone className="h-5 w-5 text-primary shrink-0" />
                <span>{data?.contact_info?.phone || "(11) 96450-3217"}</span>
              </li>
              <li className="flex gap-3 text-sm text-slate-600">
                <LucideIcons.Mail className="h-5 w-5 text-primary shrink-0" />
                <span>{data?.contact_info?.email || "comercial@avantcargo.com.br"}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-200 flex flex-col items-center justify-between gap-4">
          <p className="text-xs text-slate-400 text-center">
            {data?.copyrightText || "© 2026 AvantCargo - Logística e Serviços Aduaneiros. Todos os direitos reservados."}
          </p>
        </div>
      </div>
    </footer>
  );
};
