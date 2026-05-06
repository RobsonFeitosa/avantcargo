import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-xl border-b border-primary/20 py-0 shadow-lg" : "bg-transparent py-6"}`}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt="AvantCargo Logo" className="h-24 w-auto object-contain brightness-0 invert" />
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-sm font-bold tracking-tight transition-all duration-300 relative group flex items-center ${location.pathname === item.path ? "text-primary" : "text-foreground/90 hover:text-primary"}`}
            >
              {item.name === "Início" && <span className="mr-2 text-foreground/40 font-normal">─</span>}
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden sm:flex font-bold uppercase text-[10px] tracking-widest hover:text-primary hover:bg-primary/10">Login</Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-glow hover:scale-105 transition-transform px-8">
            Falar Agora
          </Button>
        </div>
      </div>
    </nav>
  );
};
