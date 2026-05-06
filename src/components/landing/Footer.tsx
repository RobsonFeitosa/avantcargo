import { Facebook, Instagram, Linkedin, Twitter, MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-secondary/10 pt-20 pb-10 border-t border-border">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img src={logo} alt="AvantCargo Logo" className="h-16 w-auto object-contain" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AvantCargo - Logística e Serviços Aduaneiros. Referência em assessoria de comércio exterior, oferecendo soluções estratégicas e operacionais.
            </p>
            <div className="flex gap-4">
              {[Linkedin, Instagram, Facebook, Twitter].map((Icon, idx) => (
                <a key={idx} href="#" className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Institucional</h4>
            <ul className="space-y-4">
              {[
                { name: "Início", path: "/" },
                { name: "Sobre", path: "/sobre" },
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Acesso Rápido</h4>
            <ul className="space-y-4">
              {[
                { name: "Áreas de Atuação", path: "/atuacao" },
                { name: "Contato", path: "/contato" },
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Contato</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>Av. Faria Lima, 1234 - 10º andar<br />São Paulo - SP, Brasil</span>
              </li>
              <li className="flex gap-3 text-sm text-muted-foreground">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+55 (11) 4003-1234</span>
              </li>
              <li className="flex gap-3 text-sm text-muted-foreground">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>contato@avantcargo.com.br</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-border flex flex-col md:row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 AvantCargo - Logística e Serviços Aduaneiros. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary">Termos de Uso</a>
            <a href="#" className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
