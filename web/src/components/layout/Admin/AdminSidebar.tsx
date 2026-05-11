"use client";

import {
  Calendar,
  ClipboardList,
  CreditCard,
  Settings,
  Package,
  Tag,
  Store,
  Users,
  LogOut,
  ChevronDown,
  PanelBottom,
  Briefcase,
  Phone
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { useAuth } from "@/admin/hooks_generic/providers/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Image from "next/image";
import logoImg from "@/assets/logo.png";

const adminNavItems = [
  {
    title: "Início",
    url: "/admin/home",
    icon: Package,
    items: [
      { title: "Banner principal", url: "/admin/home/main-banner" },
      { title: "Principais serviços", url: "/admin/home/main-services" },
      { title: "Etapas de trabalho", url: "/admin/home/work-steps" },
      { title: "Quem somos (Resumo)", url: "/admin/home/about-us" },
      { title: "Setores", url: "/admin/home/sectors" },
      { title: "Depoimentos", url: "/admin/home/testimonials" },
      { title: "Contato", url: "/admin/home/contact" },
    ],
  },
  {
    title: "Quem Somos",
    url: "/admin/about",
    icon: Users,
    items: [
      { title: "Introdução & História", url: "/admin/about/history" },
      { title: "Fundadores", url: "/admin/about/founders" },
      { title: "Valores", url: "/admin/about/values" },
      { title: "Diferenciais", url: "/admin/about/differentials" },
      { title: "Chamada para Ação", url: "/admin/about/cta" },
      { title: "Carreira / Talentos", url: "/admin/about/careers" },
    ],
  },
  {
    title: "Áreas de Atuação",
    url: "#",
    icon: Briefcase,
    items: [
      { title: "Representação", url: "/admin/areas/representation" },
      { title: "Sistemas Comex", url: "/admin/areas/comex-systems" },
      { title: "Transportes", url: "/admin/areas/transport" },
    ],
  },
  {
    title: "Contato",
    url: "/admin/contact",
    icon: Phone,
    items: [
      { title: "Configurações", url: "/admin/contact" },
      { title: "Mensagens", url: "/admin/contact/messages" },
    ],
  },
  {
    title: "Rodapé",
    url: "/admin/footer",
    icon: PanelBottom,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r border-emerald-900/10 bg-white">
      <SidebarHeader className="flex items-center justify-between px-6 py-8">
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Image
            src={logoImg}
            width={120}
            height={48}
            alt="AvantCargo"
            priority
            className="group-data-[collapsible=icon]:hidden"
          />
          <div className="hidden h-8 w-8 items-center justify-center rounded-lg bg-primary group-data-[collapsible=icon]:flex">
            <Package size={20} className="text-white" />
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs font-semibold uppercase tracking-wider text-emerald-900/40">
            Administração
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNavItems.map((item) => {
                const isActive = pathname === item.url || pathname.startsWith(item.url + "/");

                if (item.items) {
                  return (
                    <Collapsible key={item.title} asChild defaultOpen={isActive} className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title} className="hover:bg-emerald-50 hover:text-emerald-700 data-[active=true]:bg-emerald-600 data-[active=true]:text-white">
                            <item.icon size={22} />
                            <span className="flex-1">{item.title}</span>
                            <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                                  <Link href={subItem.url}>{subItem.title}</Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className="hover:bg-emerald-50 hover:text-emerald-700 data-[active=true]:bg-emerald-600 data-[active=true]:text-white"
                    >
                      <Link href={item.url}>
                        <item.icon size={22} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-emerald-900/5 p-4 bg-emerald-50/30">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
            <AvatarImage src={user?.avatar_url} />
            <AvatarFallback className="bg-emerald-600 text-white text-xs uppercase">
              {user?.name?.substring(0, 2) || "AD"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden group-data-[collapsible=icon]:hidden">
            <span className="truncate text-sm font-semibold text-emerald-900">{user?.name || "Administrador"}</span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 transition-colors hover:text-emerald-700"
            >
              <LogOut size={12} />
              Sair da conta
            </button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
