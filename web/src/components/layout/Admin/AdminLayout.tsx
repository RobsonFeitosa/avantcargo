"use client";

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { useAuth } from "@/admin/hooks_generic/providers/auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
    }
  }, [user]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-emerald-50/20">
        <AdminSidebar />
        <SidebarInset className="flex flex-col">
          <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b bg-white/80 px-6 backdrop-blur-md transition-[width,height] ease-linear">
            <SidebarTrigger className="-ml-1" />
            <div className="ml-auto flex items-center gap-4">
              <a 
                href="/" 
                target="_blank" 
                className="text-sm font-medium text-emerald-900/60 hover:text-emerald-900 transition-colors"
              >
                Acessar site
              </a>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20">
                <Plus size={16} className="mr-2" />
                Novo serviço
              </Button>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">
            <div className="mx-auto w-full max-w-7xl">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
