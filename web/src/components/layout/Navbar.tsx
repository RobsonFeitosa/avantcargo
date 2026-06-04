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
import { Monitor, Truck, ChevronDown, Radar, Box, Menu, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Navbar = ({ footerData }: { footerData?: any }) => {
  const phone = footerData?.contact_info?.phone;
  const [scrolled, setScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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
    <nav className={`fixed top-0 left-0 w-full z-50 border-b border-slate-200 py-3 shadow-sm transition-all duration-300 ${isOpen ? "bg-white" : "bg-white/95 backdrop-blur-md"}`}>
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Image src={logo} alt="AvantCargo Logo" className="h-14 w-auto object-contain" priority />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-bold tracking-tight transition-all duration-300 relative group flex items-center px-4 py-2 rounded-full ${pathname === "/" ? "text-primary bg-primary/10" : "text-slate-600 hover:text-primary hover:bg-slate-50"}`}
          >
            Início
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setIsAboutOpen(true)}
            onMouseLeave={() => setIsAboutOpen(false)}
          >
            <DropdownMenu open={isAboutOpen} onOpenChange={setIsAboutOpen} modal={false}>
              <DropdownMenuTrigger asChild>
                <button
                  suppressHydrationWarning
                  className={`text-sm font-bold tracking-tight transition-all duration-300 relative group flex items-center gap-1.5 px-4 py-2 rounded-full cursor-pointer border-none bg-transparent ${pathname.startsWith("/quem-somos") ? "text-primary bg-primary/10" : "text-slate-600 hover:text-primary hover:bg-slate-50"}`}
                >
                  Quem Somos
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isAboutOpen ? "rotate-180" : ""}`} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="w-56 p-2 bg-white/95 backdrop-blur-lg border-slate-200 shadow-xl rounded-2xl animate-in fade-in zoom-in duration-200"
                onMouseEnter={() => setIsAboutOpen(true)}
                onMouseLeave={() => setIsAboutOpen(false)}
              >
                <DropdownMenuItem asChild>
                  <Link
                    href="/quem-somos"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 hover:bg-primary/5 group/item"
                  >
                    <span className="text-sm font-semibold text-slate-600 group-hover/item:text-primary transition-colors">
                      A Empresa
                    </span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/quem-somos/carreiras"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 hover:bg-primary/5 group/item"
                  >
                    <span className="text-sm font-semibold text-slate-600 group-hover/item:text-primary transition-colors">
                      Carreiras / Talentos
                    </span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <DropdownMenu open={isServicesOpen} onOpenChange={setIsServicesOpen} modal={false}>
              <DropdownMenuTrigger asChild>
                <button
                  id="services-dropdown-trigger"
                  suppressHydrationWarning
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

          <Link
            href="/calculo-cubagem"
            className={`text-sm font-bold tracking-tight transition-all duration-300 relative group flex items-center px-4 py-2 rounded-full ${pathname === "/calculo-cubagem" ? "text-primary bg-primary/10" : "text-slate-600 hover:text-primary hover:bg-slate-50"}`}
          >
            Cálculo de Cubagem
          </Link>

          <Link
            href="/rastreamento-de-carga"
            className={`text-sm font-bold tracking-tight transition-all duration-300 relative group flex items-center px-4 py-2 rounded-full ${pathname === "/rastreamento-de-carga" ? "text-primary bg-primary/10" : "text-slate-600 hover:text-primary hover:bg-slate-50"}`}
          >
            Rastreamento de Carga
          </Link>

          <Link
            href="/contato"
            className={`text-sm font-bold tracking-tight transition-all duration-300 relative group flex items-center px-4 py-2 rounded-full ${pathname === "/contato" ? "text-primary bg-primary/10" : "text-slate-600 hover:text-primary hover:bg-slate-50"}`}
          >
            Contato
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {phone && (
            <Button
              asChild
              className="hidden md:flex bg-primary hover:bg-emerald-700 text-white font-bold shadow-lg shadow-primary/10 hover:scale-105 transition-transform px-8 rounded-full h-11"
              size="sm"
            >
              <Link
                href={`https://wa.me/55${phone.replace(/\D/g, "")}`}
                target="_blank"
              >
                <FaWhatsapp className="mr-2 h-4 w-4" />
                Whatsapp
              </Link>
            </Button>
          )}

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="bg-transparent hover:bg-transparent text-primary h-16 w-16 transition-all active:scale-95 border-none shadow-none"
            >
              {isOpen ? <X className="!h-10 !w-10" /> : <Menu className="!h-10 !w-10" />}
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-2xl transition-all duration-300 ease-in-out transform origin-top ${isOpen ? "opacity-100 translate-y-0 scale-y-100" : "opacity-0 -translate-y-4 scale-y-95 pointer-events-none"}`}
        style={{ maxHeight: "calc(100vh - 80px)" }}
      >
        <div className="container py-8 flex flex-col gap-8 overflow-y-auto max-h-[inherit]">
          <nav className="flex flex-col gap-2">
            <Link
              href="/"
              className={`text-lg font-bold p-4 rounded-2xl transition-all ${pathname === "/" ? "bg-primary/5 text-primary" : "text-slate-600 hover:bg-slate-50"}`}
              onClick={() => setIsOpen(false)}
            >
              Início
            </Link>

            <Accordion type="single" collapsible className="w-full" suppressHydrationWarning>
              <AccordionItem value="about" className="border-none" suppressHydrationWarning>
                <AccordionTrigger 
                  suppressHydrationWarning
                  className={`text-lg font-bold px-4 py-4 rounded-2xl hover:no-underline transition-all ${pathname.startsWith("/quem-somos") ? "text-primary" : "text-slate-600 hover:bg-slate-50"}`}
                >
                  Quem Somos
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-1 px-4 pb-4" suppressHydrationWarning>
                  <Link
                    href="/quem-somos"
                    className={`text-base font-semibold p-3 rounded-xl transition-all ${pathname === "/quem-somos" ? "text-primary bg-primary/5" : "text-slate-500 hover:text-primary hover:bg-slate-50"}`}
                    onClick={() => setIsOpen(false)}
                  >
                    A Empresa
                  </Link>
                  <Link
                    href="/quem-somos/carreiras"
                    className={`text-base font-semibold p-3 rounded-xl transition-all ${pathname === "/quem-somos/carreiras" ? "text-primary bg-primary/5" : "text-slate-500 hover:text-primary hover:bg-slate-50"}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Carreiras / Talentos
                  </Link>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="services" className="border-none" suppressHydrationWarning>
                <AccordionTrigger 
                  suppressHydrationWarning
                  className={`text-lg font-bold px-4 py-4 rounded-2xl hover:no-underline transition-all ${pathname.startsWith("/servicos") ? "text-primary" : "text-slate-600 hover:bg-slate-50"}`}
                >
                  Áreas de Atuação
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-1 px-4 pb-4" suppressHydrationWarning>
                  {servicesItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`text-base font-semibold p-3 rounded-xl transition-all ${pathname === item.path ? "text-primary bg-primary/5" : "text-slate-500 hover:text-primary hover:bg-slate-50"}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Link
              href="/calculo-cubagem"
              className={`text-lg font-bold p-4 rounded-2xl transition-all ${pathname === "/calculo-cubagem" ? "bg-primary/5 text-primary" : "text-slate-600 hover:bg-slate-50"}`}
              onClick={() => setIsOpen(false)}
            >
              Cálculo de Cubagem
            </Link>

            <Link
              href="/rastreamento-de-carga"
              className={`text-lg font-bold p-4 rounded-2xl transition-all ${pathname === "/rastreamento-de-carga" ? "bg-primary/5 text-primary" : "text-slate-600 hover:bg-slate-50"}`}
              onClick={() => setIsOpen(false)}
            >
              Rastreamento de Carga
            </Link>

            <Link
              href="/contato"
              className={`text-lg font-bold p-4 rounded-2xl transition-all ${pathname === "/contato" ? "bg-primary/5 text-primary" : "text-slate-600 hover:bg-slate-50"}`}
              onClick={() => setIsOpen(false)}
            >
              Contato
            </Link>
          </nav>

          {phone && (
            <div className="pt-6 border-t border-slate-50">
              <Button
                asChild
                className="w-full bg-primary hover:bg-emerald-700 text-white font-bold h-14 rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
              >
                <Link href={`https://wa.me/55${phone.replace(/\D/g, "")}`} target="_blank">
                  <FaWhatsapp className="mr-2 h-5 w-5" />
                  Falar no WhatsApp
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
