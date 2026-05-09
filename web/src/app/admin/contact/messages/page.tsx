"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Trash2, 
  Eye, 
  Mail, 
  Phone, 
  Building, 
  Clock, 
  Loader2,
  Inbox
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { contactMessagesActions } from "@/admin/actions/contact-messages.actions";
import { useAuth } from "@/admin/hooks_generic/providers/auth";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function ContactMessagesPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const { data: messagesResponse, isLoading } = useQuery({
    queryKey: ["contact-messages"],
    queryFn: () => contactMessagesActions.list(),
    enabled: !!user,
  });

  const messages = messagesResponse?.result || [];

  const deleteMutation = useMutation({
    mutationFn: (id: string) => contactMessagesActions.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-messages"] });
      toast.success("Mensagem excluída com sucesso!");
      setIsDetailOpen(false);
    },
    onError: () => {
      toast.error("Erro ao excluir mensagem.");
    }
  });

  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => contactMessagesActions.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-messages"] });
    }
  });

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta mensagem?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleViewDetails = (message: any) => {
    setSelectedMessage(message);
    setIsDetailOpen(true);
    if (!message.read) {
      markAsReadMutation.mutate(message.id);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-emerald-950">Mensagens de Contato</h1>
        <p className="text-emerald-900/60 font-medium">
          Visualize e gerencie as mensagens enviadas pelos clientes através do formulário de contato.
        </p>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
          <div className="flex items-center gap-2">
            <Inbox className="w-5 h-5 text-emerald-600" />
            <CardTitle className="text-lg font-bold text-emerald-950">Caixa de Entrada</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent border-emerald-100/50">
                <TableHead className="w-[150px] font-bold text-emerald-900">Data</TableHead>
                <TableHead className="font-bold text-emerald-900">Nome</TableHead>
                <TableHead className="font-bold text-emerald-900">Serviço</TableHead>
                <TableHead className="font-bold text-emerald-900">E-mail / Telefone</TableHead>
                <TableHead className="w-[120px] text-right font-bold text-emerald-900">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="border-emerald-100/30">
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : messages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-emerald-900/40 font-medium">
                    Nenhuma mensagem recebida ainda.
                  </TableCell>
                </TableRow>
              ) : (
                messages.map((msg: any) => (
                  <TableRow 
                    key={msg.id} 
                    className={`hover:bg-emerald-50/20 border-emerald-100/30 transition-colors group ${!msg.read ? 'bg-emerald-50/40' : ''}`}
                  >
                    <TableCell className="text-emerald-900/70 text-xs font-medium">
                      {format(new Date(msg.createdAt), "dd MMM, yyyy HH:mm", { locale: ptBR })}
                    </TableCell>
                    <TableCell className="font-bold text-emerald-950">
                      <div className="flex flex-col">
                        <span>{msg.name}</span>
                        {msg.company && <span className="text-[10px] text-emerald-600/60 font-normal">{msg.company}</span>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 text-[10px] font-bold uppercase">
                        {msg.service || "Não informado"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-emerald-900/60">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5">
                          <Mail size={12} className="text-emerald-400" />
                          <span>{msg.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone size={12} className="text-emerald-400" />
                          <span>{msg.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleViewDetails(msg)}
                          className="h-8 w-8 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 rounded-lg"
                        >
                          <Eye size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDelete(msg.id)}
                          className="h-8 w-8 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-[600px] border-none rounded-[32px] overflow-hidden p-0">
          <DialogHeader className="bg-emerald-50/50 p-8 border-b border-emerald-100">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/20">
                <Mail size={24} />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-emerald-950">Detalhes da Mensagem</DialogTitle>
                <p className="text-emerald-900/60 text-sm font-medium">Enviada em {selectedMessage && format(new Date(selectedMessage.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}</p>
              </div>
            </div>
          </DialogHeader>
          
          {selectedMessage && (
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-emerald-900/40 uppercase tracking-widest">Remetente</label>
                  <p className="font-bold text-emerald-950 text-lg">{selectedMessage.name}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-emerald-900/40 uppercase tracking-widest">Empresa</label>
                  <p className="font-bold text-emerald-950 flex items-center gap-2">
                    <Building size={16} className="text-emerald-600" />
                    {selectedMessage.company || "Não informado"}
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-emerald-900/40 uppercase tracking-widest">E-mail</label>
                  <p className="font-medium text-emerald-700 flex items-center gap-2">
                    <Mail size={16} />
                    {selectedMessage.email}
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-emerald-900/40 uppercase tracking-widest">Telefone</label>
                  <p className="font-medium text-emerald-700 flex items-center gap-2">
                    <Phone size={16} />
                    {selectedMessage.phone}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-emerald-900/40 uppercase tracking-widest">Serviço de Interesse</label>
                <div>
                  <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-none px-4 py-1 rounded-full font-bold uppercase text-[11px] tracking-wider">
                    {selectedMessage.service}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <label className="text-[10px] font-black text-emerald-900/40 uppercase tracking-widest flex items-center gap-2">
                  <Inbox size={14} />
                  Conteúdo da Mensagem
                </label>
                <p className="text-emerald-950 leading-relaxed whitespace-pre-wrap font-medium">
                  {selectedMessage.message}
                </p>
              </div>
            </div>
          )}

          <DialogFooter className="bg-slate-50/50 p-6 border-t border-emerald-50">
            <Button 
              variant="outline" 
              onClick={() => setIsDetailOpen(false)}
              className="border-emerald-100 text-emerald-700 hover:bg-emerald-100/50 px-6"
            >
              Fechar
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => handleDelete(selectedMessage.id)}
              disabled={deleteMutation.isPending}
              className="bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20 px-6"
            >
              {deleteMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4 mr-2" />}
              Excluir Mensagem
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
