"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { FaWhatsapp } from "react-icons/fa";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
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
    { name: "Sobre", path: "/sobre" },
    { name: "Áreas de Atuação", path: "/atuacao" },
    { name: "Contato", path: "/contato" },
  ];

  return (
    <nav className={`fixed border-b-4 top-0 left-0 w-full z-50 py-2 transition-all bg-white duration-300 ${scrolled ? "bg-white" : "bg-white"}`}>
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Image src={logo} alt="AvantCargo Logo" className="h-14 w-auto object-contain" priority />
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`text-sm font-bold tracking-tight transition-all duration-300 relative group flex items-center px-4 py-2 rounded-sm ${pathname === item.path ? "text-primary bg-primary/10" : "text-foreground/90 hover:text-primary hover:bg-primary/5"}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-glow hover:scale-105 transition-transform px-8 rounded-full" size="sm">
            <FaWhatsapp />
            Falar Agora
          </Button>
        </div>
      </div>
    </nav>
  );
};
