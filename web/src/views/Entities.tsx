import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Plus, MoreHorizontal, TrendingUp, TrendingDown, ShieldCheck, AlertTriangle, ExternalLink } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

type Entity = {
  id: string;
  name: string;
  cnpj: string;
  type: "Holding" | "Operadora" | "MEI" | "SPE";
  region: string;
  health: "healthy" | "attention" | "critical";
  balance: number;
  txMonth: number;
  trend: number;
};

const initial: Entity[] = [
  { id: "1", name: "Acme BR S/A", cnpj: "12.345.678/0001-90", type: "Holding", region: "São Paulo · BR", health: "healthy", balance: 12_450_000, txMonth: 1284, trend: 8.2 },
  { id: "2", name: "Northwind LTDA", cnpj: "23.456.789/0001-12", type: "Operadora", region: "Rio de Janeiro · BR", health: "attention", balance: 3_120_000, txMonth: 642, trend: -2.1 },
  { id: "3", name: "Iberia Holdings", cnpj: "34.567.890/0001-23", type: "Holding", region: "Lisbon · PT", health: "healthy", balance: 8_900_000, txMonth: 318, trend: 4.5 },
  { id: "4", name: "Vortex Capital", cnpj: "45.678.901/0001-34", type: "SPE", region: "Curitiba · BR", health: "critical", balance: 240_000, txMonth: 96, trend: -18.3 },
  { id: "5", name: "Kepler MEI", cnpj: "56.789.012/0001-45", type: "MEI", region: "Belo Horizonte · BR", health: "healthy", balance: 84_500, txMonth: 24, trend: 1.1 },
  { id: "6", name: "Helios Fintech", cnpj: "67.890.123/0001-56", type: "Operadora", region: "Recife · BR", health: "attention", balance: 1_640_000, txMonth: 412, trend: -0.8 },
];

const healthStyle = {
  healthy: { dot: "bg-success", text: "text-success", border: "border-success/30", label: "Healthy" },
  attention: { dot: "bg-warning", text: "text-warning", border: "border-warning/30", label: "Attention" },
  critical: { dot: "bg-destructive", text: "text-destructive", border: "border-destructive/30", label: "Critical" },
};

const schema = z.object({
  name: z.string().trim().min(2, "Name too short").max(80),
  cnpj: z.string().trim().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "Format: 00.000.000/0000-00"),
  type: z.enum(["Holding", "Operadora", "MEI", "SPE"]),
  region: z.string().trim().min(2, "Required").max(60),
});

export default function Entities() {
  const [list, setList] = useState(initial);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", cnpj: "", type: "Operadora", region: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const submit = () => {
    const r = schema.safeParse(form);
    if (!r.success) {
      const e: Record<string, string> = {};
      r.error.issues.forEach((i) => { e[i.path[0] as string] = i.message; });
      setErrors(e); return;
    }
    setErrors({});
    const newEntity: Entity = { id: String(Date.now()), name: r.data.name!, cnpj: r.data.cnpj!, type: r.data.type!, region: r.data.region!, health: "healthy", balance: 0, txMonth: 0, trend: 0 };
    setList((l) => [...l, newEntity]);
    setForm({ name: "", cnpj: "", type: "Operadora", region: "" });
    setOpen(false);
    toast({ title: "Entity provisioned", description: `${r.data.name} added to the workspace.` });
  };

  return (
    <div>
      <PageHeader
        eyebrow="Multi-tenant · CNPJ"
        title="Business units"
        description="Each entity is fully isolated at database level (row-level security) and reports independently to ledgers and tax authorities."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-gradient-primary text-primary-foreground hover:opacity-90"><Plus className="h-3.5 w-3.5 mr-1.5" />New entity</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Provision business unit</DialogTitle>
                <DialogDescription>A dedicated tenant with isolated ledger, keys and webhooks.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div>
                  <Label className="text-xs">Legal name</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5 bg-secondary/50" placeholder="Acme Brasil S/A" />
                  {errors.name && <p className="text-[11px] text-destructive mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label className="text-xs">CNPJ</Label>
                  <Input value={form.cnpj} onChange={(e) => setForm({ ...form, cnpj: e.target.value })} className="mt-1.5 bg-secondary/50 font-mono" placeholder="00.000.000/0000-00" />
                  {errors.cnpj && <p className="text-[11px] text-destructive mt-1">{errors.cnpj}</p>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Type</Label>
                    <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                      <SelectTrigger className="mt-1.5 bg-secondary/50"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["Holding", "Operadora", "MEI", "SPE"].map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs">Region</Label>
                    <Input value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} className="mt-1.5 bg-secondary/50" placeholder="São Paulo · BR" />
                    {errors.region && <p className="text-[11px] text-destructive mt-1">{errors.region}</p>}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={submit} className="bg-gradient-primary text-primary-foreground">Provision</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((e) => {
          const s = healthStyle[e.health];
          return (
            <Card key={e.id} className="card-surface p-5 group hover:border-primary/30 transition-colors relative overflow-hidden">
              <div className="absolute -top-20 -right-20 h-40 w-40 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-secondary border border-border flex items-center justify-center">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold leading-tight">{e.name}</h3>
                      <p className="text-[11px] font-mono text-muted-foreground">{e.cnpj}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="text-[10px]">{e.type}</Badge>
                  <Badge variant="outline" className={`text-[10px] gap-1.5 ${s.border} ${s.text}`}>
                    <span className={`status-dot ${s.dot}`} />{s.label}
                  </Badge>
                  <span className="text-[11px] text-muted-foreground ml-auto">{e.region}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Balance</p>
                    <p className="font-mono text-sm font-semibold">{e.balance.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">TX (30d)</p>
                    <p className="font-mono text-sm font-semibold flex items-center gap-1.5">
                      {e.txMonth.toLocaleString()}
                      <span className={`text-[10px] flex items-center ${e.trend >= 0 ? "text-success" : "text-destructive"}`}>
                        {e.trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {Math.abs(e.trend)}%
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    {e.health === "critical" ? <AlertTriangle className="h-3 w-3 text-destructive" /> : <ShieldCheck className="h-3 w-3 text-success" />}
                    KYC verified
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">Open <ExternalLink className="h-3 w-3 ml-1" /></Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
