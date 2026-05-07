import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wallet, ArrowDownLeft, ArrowUpRight, TrendingUp, TrendingDown, Download, Plus, MoreHorizontal, Cloud, Building, CreditCard, X, Check } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Line, LineChart } from "recharts";

const cashflow = [
  { m: "Aug", actual: 3.8, projected: 3.6 },
  { m: "Sep", actual: 4.2, projected: 4.0 },
  { m: "Oct", actual: 4.0, projected: 4.1 },
  { m: "Nov", actual: 4.6, projected: 4.4 },
  { m: "Dec", actual: 5.4, projected: 4.9 },
  { m: "Jan", actual: 6.2, projected: 5.4 },
];

const kpis = [
  { label: "Available Cash", value: "$4,923,820.50", delta: "+2.4%", up: true, icon: Wallet },
  { label: "Accounts Receivable", value: "$1,240,500.00", delta: "+12.1%", up: true, icon: ArrowDownLeft },
  { label: "Accounts Payable", value: "$842,100.25", delta: "-4.2%", up: false, icon: ArrowUpRight },
];

const activity = [
  { name: "AWS Services", desc: "Cloud Infrastructure", amount: "-$12,450.00", time: "Today, 2:45 PM", icon: Cloud, neg: true },
  { name: "Client Payment", desc: "Acme Corp Invoice #892", amount: "+$45,000.00", time: "Yesterday", icon: Building, neg: false },
  { name: "Stripe Payout", desc: "Settlement", amount: "+$18,230.50", time: "Jul 26", icon: CreditCard, neg: false },
];

const approvals = [
  { name: "KPMG Consulting", desc: "Audit Services Q2", amount: "$24,500.00", due: "Today", urgent: true },
  { name: "WeWork", desc: "Office Lease - NY", amount: "$15,200.00", due: "Aug 02", urgent: false },
];

const integrations = [
  { name: "J.P. Morgan API", desc: "Last sync: 2 mins ago", tag: "Webhooks", status: "200 OK", initials: "JPM", color: "bg-info/20 text-info" },
  { name: "Oracle ERP", desc: "Last sync: 15 mins ago", tag: "Batch Sync", status: "Active", initials: "NS", color: "bg-destructive/20 text-destructive" },
];

import { toast } from "sonner";

export default function Overview() {
  const handleExport = () => {
    toast.info("Export feature is currently under development. Data extraction will be available in the next release.");
  };

  const handleNewTransfer = () => {
    toast.info("Transfer feature is currently under development as part of the backend integration phase.");
  };

  return (
    <div>
      <PageHeader
        title="Total Liquidity"
        description="Consolidated balance across all connected accounts."
        actions={
          <>
            <Button variant="outline" size="sm" onClick={handleExport}><Download className="h-3.5 w-3.5 mr-1.5" />Export</Button>
            <Button size="sm" className="bg-gradient-primary text-primary-foreground hover:opacity-90" onClick={handleNewTransfer}><Plus className="h-3.5 w-3.5 mr-1.5" />New Transfer</Button>
          </>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {kpis.map((k) => (
          <Card key={k.label} className="card-surface p-5 relative overflow-hidden group hover:border-primary/30 transition-colors">
            <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="flex items-start justify-between mb-6">
                <div className="h-9 w-9 rounded-lg bg-secondary border border-border flex items-center justify-center">
                  <k.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <Badge variant="outline" className={`text-[10px] gap-1 font-mono ${k.up ? "border-success/30 text-success bg-success/5" : "border-destructive/30 text-destructive bg-destructive/5"}`}>
                  {k.up ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}{k.delta}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-1.5">{k.label}</p>
              <p className="text-2xl lg:text-3xl font-semibold tracking-tight">{k.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Chart + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <Card className="card-surface p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">3-Month Cash Flow Projection</h3>
            <div className="flex rounded-md border border-border bg-secondary/40 p-0.5 text-xs">
              <button className="px-2.5 py-1 rounded text-muted-foreground hover:text-foreground transition-colors">Weekly</button>
              <button className="px-2.5 py-1 rounded bg-secondary text-foreground">Monthly</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={cashflow} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
              <defs>
                <linearGradient id="gActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="m" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}M`} />
              <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="actual" stroke="hsl(var(--primary))" fill="url(#gActual)" strokeWidth={2.5} />
              <Area type="monotone" dataKey="projected" stroke="hsl(var(--muted-foreground))" fill="transparent" strokeWidth={1.5} strokeDasharray="4 4" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="card-surface p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Activity</h3>
            <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
          </div>
          <div className="space-y-4">
            {activity.map((a) => (
              <div key={a.name} className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-secondary border border-border flex items-center justify-center shrink-0">
                  <a.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{a.name}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{a.desc}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-mono font-semibold ${a.neg ? "text-destructive" : "text-success"}`}>{a.amount}</p>
                  <p className="text-[10px] text-muted-foreground">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Approvals + Integrations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="card-surface p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Pending Approvals</h3>
              <Badge variant="outline" className="text-[10px] border-destructive/30 text-destructive bg-destructive/10">Action Req</Badge>
            </div>
            <Button variant="link" size="sm" className="text-primary h-auto p-0">View All</Button>
          </div>
          <div className="grid grid-cols-12 text-[10px] uppercase tracking-wider text-muted-foreground pb-2 border-b border-border">
            <div className="col-span-5">Beneficiary</div>
            <div className="col-span-3">Amount</div>
            <div className="col-span-2">Due Date</div>
            <div className="col-span-2 text-right">Action</div>
          </div>
          <div className="divide-y divide-border">
            {approvals.map((a) => (
              <div key={a.name} className="grid grid-cols-12 py-3 items-center text-sm">
                <div className="col-span-5">
                  <p className="font-medium">{a.name}</p>
                  <p className="text-[11px] text-muted-foreground">{a.desc}</p>
                </div>
                <div className="col-span-3 font-mono">{a.amount}</div>
                <div className={`col-span-2 text-xs ${a.urgent ? "text-destructive font-medium" : "text-muted-foreground"}`}>{a.due}</div>
                <div className="col-span-2 flex items-center justify-end gap-1.5">
                  <Button size="icon" variant="outline" className="h-7 w-7 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"><X className="h-3.5 w-3.5" /></Button>
                  <Button size="icon" className="h-7 w-7 bg-success text-success-foreground hover:bg-success/90"><Check className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="card-surface p-5">
          <h3 className="font-semibold mb-4">Integration Hub Status</h3>
          <div className="space-y-3">
            {integrations.map((i) => (
              <div key={i.name} className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center text-[10px] font-bold ${i.color}`}>{i.initials}</div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium flex items-center gap-2">{i.name}<span className="status-dot bg-success animate-pulse-glow" /></p>
                  <p className="text-[11px] text-muted-foreground">{i.desc}</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-muted-foreground">{i.tag}</p>
                  <Badge variant="outline" className="text-[10px] mt-1 border-success/30 text-success bg-success/5">{i.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <p className="text-center text-[11px] text-muted-foreground mt-8 pt-6 border-t border-border">
        © 2026 FinCore Enterprise Systems. Secure SSL Connection.
      </p>
    </div>
  );
}
