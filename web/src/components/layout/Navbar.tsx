"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { FaWhatsapp } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Monitor, Truck, ChevronDown, Radar, Box } from "lucide-react";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Início", path: "/" },
    { name: "Quem Somos", path: "/quem-somos" },
    { name: "Contato", path: "/contato" },
  ];

  const servicesItems = [
    { name: "Representação", icon: Radar, path: "/servicos/representacao" },
    { name: "Sistemas Comex", icon: Monitor, path: "/servicos/sistemas-comex" },
    { name: "Transportes", icon: Truck, path: "/servicos/transporte" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm transition-all duration-300">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Image src={logo} alt="AvantCargo Logo" className="h-14 w-auto object-contain" priority />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {/* Início */}
          <Link
            href="/"
            className={`text-sm font-bold tracking-tight transition-all duration-300 relative group flex items-center px-4 py-2 rounded-full ${pathname === "/" ? "text-primary bg-primary/10" : "text-slate-600 hover:text-primary hover:bg-slate-50"}`}
          >
            Início
          </Link>

          {/* Quem Somos */}
          <Link
            href="/quem-somos"
            className={`text-sm font-bold tracking-tight transition-all duration-300 relative group flex items-center px-4 py-2 rounded-full ${pathname === "/quem-somos" ? "text-primary bg-primary/10" : "text-slate-600 hover:text-primary hover:bg-slate-50"}`}
          >
            Quem Somos
          </Link>

          {/* Áreas de Atuação (Dropdown on Hover) */}
          <div
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <DropdownMenu open={isServicesOpen} onOpenChange={setIsServicesOpen} modal={false}>
              <DropdownMenuTrigger asChild>
                <button 
                  id="services-dropdown-trigger"
                  className={`text-sm font-bold tracking-tight transition-all duration-300 relative group flex items-center gap-1.5 px-4 py-2 rounded-full cursor-pointer border-none bg-transparent ${pathname.startsWith("/servicos") ? "text-primary bg-primary/10" : "text-slate-600 hover:text-primary hover:bg-slate-50"}`}
                >
                  Áreas de Atuação
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="w-56 p-2 bg-white/95 backdrop-blur-lg border-slate-200 shadow-xl rounded-2xl animate-in fade-in zoom-in duration-200"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                {servicesItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      href={item.path}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 hover:bg-primary/5 group/item"
                    >
                      <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover/item:bg-primary/10 group-hover/item:text-primary transition-colors">
                        <item.icon className="h-4.5 w-4.5" />
                      </div>
                      <span className="text-sm font-semibold text-slate-600 group-hover/item:text-primary transition-colors">
                        {item.name}
                      </span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Contato */}
          <Link
            href="/contato"
            className={`text-sm font-bold tracking-tight transition-all duration-300 relative group flex items-center px-4 py-2 rounded-full ${pathname === "/contato" ? "text-primary bg-primary/10" : "text-slate-600 hover:text-primary hover:bg-slate-50"}`}
          >
            Contato
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button className="bg-primary hover:bg-emerald-700 text-white font-bold shadow-lg shadow-primary/10 hover:scale-105 transition-transform px-8 rounded-full h-11" size="sm">
            <FaWhatsapp className="mr-2 h-4 w-4" />
            Whatsapp
          </Button>
        </div>
      </div>
    </nav>
  );
};
