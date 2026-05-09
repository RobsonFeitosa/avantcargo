"use client";

import { 
  Bell, 
  Mail, 
  Clock, 
  ExternalLink,
  Inbox
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { contactMessagesActions } from "@/admin/actions/contact-messages.actions";
import { useAuth } from "@/admin/hooks_generic/providers/auth";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export function NotificationBell() {
  const { user } = useAuth();

  const { data: messagesResponse } = useQuery({
    queryKey: ["contact-messages"],
    queryFn: () => contactMessagesActions.list(),
    enabled: !!user,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const messages = messagesResponse?.result || [];
  const unreadMessages = messages.filter((m: any) => !m.read);
  const hasUnread = unreadMessages.length > 0;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative h-9 w-9 text-emerald-900/60 hover:bg-emerald-50 hover:text-emerald-700 transition-colors rounded-full"
        >
          <Bell size={20} />
          {hasUnread && (
            <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white"></span>
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 border-none shadow-2xl rounded-2xl overflow-hidden" align="end" sideOffset={8}>
        <div className="bg-emerald-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm">Notificações</h3>
            {hasUnread && (
              <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none text-[10px] font-black uppercase tracking-wider">
                {unreadMessages.length} NOVAS
              </Badge>
            )}
          </div>
        </div>
        
        <ScrollArea className="h-[350px]">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-slate-400 gap-2">
              <Inbox size={32} strokeWidth={1.5} />
              <p className="text-xs font-medium">Nenhuma mensagem por aqui</p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-slate-100">
              {messages.slice(0, 10).map((msg: any) => (
                <Link 
                  key={msg.id}
                  href="/admin/contact/messages"
                  className={`p-4 hover:bg-slate-50 transition-colors flex gap-3 group ${!msg.read ? 'bg-emerald-50/30' : ''}`}
                >
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${!msg.read ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                    <Mail size={16} />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className={`text-[13px] truncate ${!msg.read ? 'font-bold text-emerald-950' : 'font-medium text-slate-600'}`}>
                      {msg.name}
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                      <Clock size={10} />
                      <span>{formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true, locale: ptBR })}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-1.5 line-clamp-1">
                      {msg.message}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                       <Badge variant="outline" className="text-[9px] h-4 px-1.5 border-emerald-100 text-emerald-700 bg-emerald-50 uppercase font-black tracking-tighter">
                         {msg.service}
                       </Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </ScrollArea>
        
        <Link 
          href="/admin/contact/messages"
          className="flex items-center justify-center p-3 bg-slate-50 text-emerald-700 text-xs font-bold hover:bg-emerald-50 transition-colors border-t border-slate-100"
        >
          Ver todas as mensagens
          <ExternalLink size={12} className="ml-2" />
        </Link>
      </PopoverContent>
    </Popover>
  );
}
