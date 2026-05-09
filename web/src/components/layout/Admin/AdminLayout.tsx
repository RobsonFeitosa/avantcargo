"use client";

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { useAuth } from "@/admin/hooks_generic/providers/auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

import { Login } from "@/components/admin/Login";
import { NotificationBell } from "./NotificationBell";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user } = useAuth();

  if (!user?.id) {
    return <Login />;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-emerald-50/20">
        <AdminSidebar />
        <SidebarInset className="flex flex-col">
          <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b bg-white/80 px-6 backdrop-blur-md transition-[width,height] ease-linear">
            <SidebarTrigger className="-ml-1" />
            <div className="ml-auto flex items-center gap-4">
              <NotificationBell />
              <a 
                href="/" 
                target="_blank" 
                className="text-sm font-medium text-emerald-900/60 hover:text-emerald-900 transition-colors"
              >
                Acessar site
              </a>
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
