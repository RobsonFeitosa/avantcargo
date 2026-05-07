import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, ChevronRight, Download, Filter, Search, RefreshCw } from "lucide-react";

type Tx = {
  id: string;
  ts: string;
  entity: string;
  channel: string;
  amount: number;
  currency: string;
  status: "settled" | "pending" | "failed" | "review";
  meta: Record<string, unknown>;
};

const ENTITIES = ["Acme BR S/A", "Northwind LTDA", "Iberia Holdings", "Vortex Capital", "Kepler MEI"];
const CHANNELS = ["PIX", "TED", "Boleto", "Card", "Wire"];
const STATUSES: Tx["status"][] = ["settled", "pending", "failed", "review"];

function rand<T>(a: T[]) { return a[Math.floor(Math.random() * a.length)]; }
const SEED = Array.from({ length: 42 }).map((_, i): Tx => {
  const status = rand(STATUSES);
  const amount = +(Math.random() * 2_000_000 - 200_000).toFixed(2);
  return {
    id: `TX-${(98220 - i).toString()}`,
    ts: new Date(Date.now() - i * 3_600_000 * 2).toISOString(),
    entity: rand(ENTITIES),
    channel: rand(CHANNELS),
    amount,
    currency: "BRL",
    status,
    meta: {
      request_id: `req_${Math.random().toString(36).slice(2, 12)}`,
      origin_account: `0001-${Math.floor(10000 + Math.random() * 89999)}`,
      destination: { bank: "341", branch: "0421", account: `${Math.floor(10000 + Math.random() * 89999)}-${Math.floor(Math.random() * 9)}` },
      processor: { vendor: "stripe-treasury", latency_ms: Math.floor(50 + Math.random() * 600), retries: Math.floor(Math.random() * 3) },
      audit: { actor: "service:nest-payments", trace_id: `tr_${Math.random().toString(36).slice(2, 14)}`, signed: true },
      compliance: { kyc: "approved", aml_score: +(Math.random() * 0.9).toFixed(3), flags: [] },
    },
  };
});

const statusStyle: Record<Tx["status"], string> = {
  settled: "bg-success/10 text-success border-success/30",
  pending: "bg-warning/10 text-warning border-warning/30",
  failed: "bg-destructive/10 text-destructive border-destructive/30",
  review: "bg-info/10 text-info border-info/30",
};

import { toast } from "sonner";

export default function Transactions() {
  const [q, setQ] = useState("");
  const [entity, setEntity] = useState("all");
  const [status, setStatus] = useState("all");
  const [days, setDays] = useState("30");
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const handleExport = () => {
    toast.info("Export feature is currently under development. CSV generation will be available soon.");
  };

  const filtered = useMemo(() => {
    const cutoff = Date.now() - parseInt(days) * 86_400_000;
    return SEED.filter((t) =>
      (entity === "all" || t.entity === entity) &&
      (status === "all" || t.status === status) &&
      new Date(t.ts).getTime() >= cutoff &&
      (q === "" || t.id.toLowerCase().includes(q.toLowerCase()) || t.entity.toLowerCase().includes(q.toLowerCase()))
    );
  }, [q, entity, status, days]);

  return (
    <div>
      <PageHeader
        eyebrow="Audit · Immutable"
        title="Transactions & Audit Log"
        description="Every operation is signed, persisted in PostgreSQL and replicated for compliance. Expand any row to inspect the raw NestJS payload."
        actions={
          <>
            <Button variant="outline" size="sm"><RefreshCw className="h-3.5 w-3.5 mr-1.5" />Refresh</Button>
            <Button variant="outline" size="sm" onClick={handleExport}><Download className="h-3.5 w-3.5 mr-1.5" />Export CSV</Button>
          </>
        }
      />

      <Card className="card-surface p-4 mb-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by TX id or entity..." className="pl-9 h-9 bg-secondary/50 border-border" />
          </div>
          <Select value={entity} onValueChange={setEntity}>
            <SelectTrigger className="h-9 w-[180px] bg-secondary/50"><SelectValue placeholder="Entity" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All entities</SelectItem>
              {ENTITIES.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="h-9 w-[150px] bg-secondary/50"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {STATUSES.map((s) => <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={days} onValueChange={setDays}>
            <SelectTrigger className="h-9 w-[140px] bg-secondary/50"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="outline" className="font-mono text-[10px] gap-1.5"><Filter className="h-3 w-3" />{filtered.length} results</Badge>
        </div>
      </Card>

      <Card className="card-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/40 border-b border-border">
              <tr className="text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="w-8 px-3 py-2.5"></th>
                <th className="text-left px-3 py-2.5 font-medium">Transaction</th>
                <th className="text-left px-3 py-2.5 font-medium">Timestamp</th>
                <th className="text-left px-3 py-2.5 font-medium">Entity</th>
                <th className="text-left px-3 py-2.5 font-medium">Channel</th>
                <th className="text-right px-3 py-2.5 font-medium">Amount</th>
                <th className="text-center px-3 py-2.5 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => {
                const isOpen = !!open[t.id];
                return (
                  <>
                    <tr key={t.id} className="border-b border-border/60 hover:bg-secondary/20 cursor-pointer transition-colors" onClick={() => setOpen((o) => ({ ...o, [t.id]: !o[t.id] }))}>
                      <td className="px-3 py-3">
                        {isOpen ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
                      </td>
                      <td className="px-3 py-3 font-mono text-xs">{t.id}</td>
                      <td className="px-3 py-3 font-mono text-xs text-muted-foreground">{new Date(t.ts).toISOString().replace("T", " ").slice(0, 19)}</td>
                      <td className="px-3 py-3">{t.entity}</td>
                      <td className="px-3 py-3"><Badge variant="outline" className="text-[10px]">{t.channel}</Badge></td>
                      <td className={`px-3 py-3 text-right font-mono ${t.amount >= 0 ? "text-success" : "text-destructive"}`}>
                        {t.amount.toLocaleString("pt-BR", { style: "currency", currency: t.currency })}
                      </td>
                      <td className="px-3 py-3 text-center">
                        <Badge variant="outline" className={`text-[10px] capitalize ${statusStyle[t.status]}`}>{t.status}</Badge>
                      </td>
                    </tr>
                    {isOpen && (
                      <tr key={t.id + "x"} className="bg-background/60">
                        <td></td>
                        <td colSpan={6} className="px-3 py-4">
                          <div className="rounded-lg border border-border bg-secondary/30 overflow-hidden">
                            <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-background/50">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">GET /v1/transactions/{t.id}/audit</span>
                              <Badge variant="outline" className="text-[10px] font-mono border-success/30 text-success">200 OK · 84ms</Badge>
                            </div>
                            <pre className="p-4 text-xs font-mono leading-relaxed text-foreground/90 overflow-x-auto">
{JSON.stringify({ id: t.id, timestamp: t.ts, entity: t.entity, channel: t.channel, amount: t.amount, currency: t.currency, status: t.status, ...t.meta }, null, 2)}
                            </pre>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
