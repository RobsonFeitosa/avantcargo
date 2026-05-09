"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Package, 
  Users, 
  CircleDollarSign, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  MoreVertical,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { formatValueForHundred } from "@/admin/utils/formatValue";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total de Pedidos",
      value: "1,284",
      change: "+12.5%",
      trend: "up",
      icon: Package,
      color: "bg-emerald-500",
    },
    {
      title: "Novos Clientes",
      value: "142",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Receita Mensal",
      value: formatValueForHundred(4528000),
      change: "-2.4%",
      trend: "down",
      icon: CircleDollarSign,
      color: "bg-amber-500",
    },
    {
      title: "Agenda Semanal",
      value: "28",
      change: "4 pendentes",
      trend: "neutral",
      icon: Calendar,
      color: "bg-purple-500",
    },
  ];

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "Logix Transports",
      date: "08/05/2026",
      amount: formatValueForHundred(125000),
      status: "Concluído",
    },
    {
      id: "ORD-002",
      customer: "Global Cargo",
      date: "08/05/2026",
      amount: formatValueForHundred(85000),
      status: "Em Processamento",
    },
    {
      id: "ORD-003",
      customer: "FastLine S.A.",
      date: "07/05/2026",
      amount: formatValueForHundred(240000),
      status: "Concluído",
    },
    {
      id: "ORD-004",
      customer: "Importa Express",
      date: "07/05/2026",
      amount: formatValueForHundred(42000),
      status: "Cancelado",
    },
    {
      id: "ORD-005",
      customer: "Rio Cargo Ltd",
      date: "06/05/2026",
      amount: formatValueForHundred(110000),
      status: "Concluído",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-emerald-950">Dashboard</h1>
        <p className="text-emerald-900/60 font-medium">
          Bem-vindo de volta! Aqui está o resumo das operações de hoje.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-emerald-900/60 uppercase tracking-wider">
                {stat.title}
              </CardTitle>
              <div className={`${stat.color} p-2 rounded-lg text-white shadow-lg shadow-current/10`}>
                <stat.icon size={20} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-950">{stat.value}</div>
              <p className="mt-1 flex items-center text-xs font-medium">
                {stat.trend === "up" && <TrendingUp className="mr-1 text-emerald-600" />}
                {stat.trend === "down" && <TrendingDown className="mr-1 text-red-600" />}
                <span className={stat.trend === "up" ? "text-emerald-600" : stat.trend === "down" ? "text-red-600" : "text-emerald-900/40"}>
                  {stat.change}
                </span>
                <span className="ml-1 text-emerald-900/40">em relação ao mês anterior</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-emerald-50 pb-6">
            <div>
              <CardTitle className="text-lg font-bold text-emerald-950">Pedidos Recentes</CardTitle>
              <p className="text-sm text-emerald-900/40 font-medium mt-1">Últimas movimentações registradas no sistema.</p>
            </div>
            <Button variant="outline" size="sm" className="border-emerald-100 text-emerald-700 hover:bg-emerald-50">
              Ver todos
              <ArrowRight size={14} className="ml-2" />
            </Button>
          </CardHeader>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-emerald-50">
                  <TableHead className="font-semibold text-emerald-900/40 uppercase text-[10px] tracking-wider">ID</TableHead>
                  <TableHead className="font-semibold text-emerald-900/40 uppercase text-[10px] tracking-wider">Cliente</TableHead>
                  <TableHead className="font-semibold text-emerald-900/40 uppercase text-[10px] tracking-wider">Valor</TableHead>
                  <TableHead className="font-semibold text-emerald-900/40 uppercase text-[10px] tracking-wider text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-emerald-50/30 border-emerald-50 transition-colors">
                    <TableCell className="font-bold text-emerald-950">{order.id}</TableCell>
                    <TableCell className="font-medium text-emerald-900/70">{order.customer}</TableCell>
                    <TableCell className="font-bold text-emerald-950">{order.amount}</TableCell>
                    <TableCell className="text-right">
                      <Badge 
                        variant="secondary" 
                        className={
                          order.status === "Concluído" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" :
                          order.status === "Em Processamento" ? "bg-blue-100 text-blue-700 hover:bg-blue-100" :
                          "bg-red-100 text-red-700 hover:bg-red-100"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-none shadow-sm overflow-hidden bg-emerald-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold text-white">Atalhos Rápidos</CardTitle>
            <p className="text-sm text-emerald-100/60 font-medium">Ações frequentes para agilizar seu trabalho.</p>
          </CardHeader>
          <CardContent className="grid gap-4 pt-4">
            <div className="flex items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border border-white/5 group">
               <div className="bg-emerald-500/20 p-2 rounded-lg mr-4">
                 <Package size={24} className="text-emerald-400" />
               </div>
               <div className="flex-1">
                 <h4 className="text-sm font-bold text-white">Novo Produto</h4>
                 <p className="text-xs text-emerald-100/40">Cadastrar novo item no estoque</p>
               </div>
               <ArrowRight size={16} className="text-white/20 group-hover:text-white transition-colors" />
            </div>
            
            <div className="flex items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border border-white/5 group">
               <div className="bg-blue-500/20 p-2 rounded-lg mr-4">
                 <Users size={24} className="text-blue-400" />
               </div>
               <div className="flex-1">
                 <h4 className="text-sm font-bold text-white">Gestão de Clientes</h4>
                 <p className="text-xs text-emerald-100/40">Visualizar base de parceiros</p>
               </div>
               <ArrowRight size={16} className="text-white/20 group-hover:text-white transition-colors" />
            </div>

            <div className="flex items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border border-white/5 group">
               <div className="bg-purple-500/20 p-2 rounded-lg mr-4">
                 <Calendar size={24} className="text-purple-400" />
               </div>
               <div className="flex-1">
                 <h4 className="text-sm font-bold text-white">Agenda Operacional</h4>
                 <p className="text-xs text-emerald-100/40">Verificar escala da semana</p>
               </div>
               <ArrowRight size={16} className="text-white/20 group-hover:text-white transition-colors" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
