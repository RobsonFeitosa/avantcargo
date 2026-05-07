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
import { Users, Monitor, Truck, ChevronDown } from "lucide-react";

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
    { name: "Áreas de Atuação", path: "/atuacao" },
    { name: "Contato", path: "/contato" },
  ];

  const servicesItems = [
    { name: "Representação", icon: Users, path: "/servicos/representacao" },
    { name: "Sistemas Comex", icon: Monitor, path: "/servicos/sistemas-comex" },
    { name: "Transportes", icon: Truck, path: "/servicos/transportes" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? "bg-white/80 backdrop-blur-md border-slate-200 py-2 shadow-sm" : "bg-transparent border-transparent py-4"}`}>
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

          {/* Serviços (Dropdown on Hover) */}
          <div
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <DropdownMenu open={isServicesOpen} onOpenChange={setIsServicesOpen} modal={false}>
              <DropdownMenuTrigger asChild>
                <div className={`text-sm font-bold tracking-tight transition-all duration-300 relative group flex items-center px-4 py-2 rounded-full outline-none cursor-pointer ${pathname.startsWith("/servicos") || isServicesOpen ? "text-primary bg-primary/10" : "text-slate-600 hover:text-primary hover:bg-slate-50"}`}>
                  Serviços <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                sideOffset={0}
                className="bg-white border-slate-200 rounded-2xl p-1 min-w-[240px] shadow-2xl animate-in fade-in zoom-in-95 duration-200 mt-2"
              >
                {servicesItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild className="p-0 focus:bg-transparent">
                    <Link
                      href={item.path}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-primary/5 transition-all group"
                    >
                      <div className="flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-semibold text-slate-700 group-hover:text-primary transition-colors">
                        {item.name}
                      </span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Other Items */}
          {navItems.slice(2).map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`text-sm font-bold tracking-tight transition-all duration-300 relative group flex items-center px-4 py-2 rounded-full ${pathname === item.path ? "text-primary bg-primary/10" : "text-slate-600 hover:text-primary hover:bg-slate-50"}`}
            >
              {item.name}
            </Link>
          ))}
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
