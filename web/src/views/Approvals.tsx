import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Clock, FileText, ArrowRight, ShieldCheck, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Step = { actor: string; role: string; action: string; ts: string; status: "done" | "pending" | "current" };
type Approval = {
  id: string;
  title: string;
  type: "Wire transfer" | "Vendor payment" | "FX operation" | "Refund";
  amount: number;
  entity: string;
  requested_by: string;
  requested_at: string;
  priority: "low" | "normal" | "high" | "critical";
  timeline: Step[];
};

const seed: Approval[] = [
  {
    id: "AP-2041", title: "Q2 vendor batch · AWS infra", type: "Vendor payment", amount: 184_320, entity: "Acme BR S/A",
    requested_by: "Matheus Pereira", requested_at: "2026-05-04 14:22", priority: "high",
    timeline: [
      { actor: "Matheus Pereira", role: "Finance Analyst", action: "Created request", ts: "May 4 · 14:22", status: "done" },
      { actor: "Marina Costa", role: "Head of Finance", action: "Reviewed & endorsed", ts: "May 4 · 18:05", status: "done" },
      { actor: "You · Renata Alves", role: "CFO", action: "Awaiting authorization", ts: "—", status: "current" },
      { actor: "Treasury Bot", role: "Automation", action: "Will execute via NestJS", ts: "—", status: "pending" },
    ],
  },
  {
    id: "AP-2040", title: "FX hedge USD/BRL · 500k notional", type: "FX operation", amount: 2_580_000, entity: "Iberia Holdings",
    requested_by: "Diego Ramos", requested_at: "2026-05-04 11:08", priority: "critical",
    timeline: [
      { actor: "Diego Ramos", role: "Treasury Ops", action: "Created request", ts: "May 4 · 11:08", status: "done" },
      { actor: "You · Renata Alves", role: "CFO", action: "Awaiting authorization", ts: "—", status: "current" },
      { actor: "Compliance Bot", role: "Automation", action: "Pending sign-off", ts: "—", status: "pending" },
    ],
  },
  {
    id: "AP-2039", title: "Refund · order #88241", type: "Refund", amount: 4_280, entity: "Northwind LTDA",
    requested_by: "Ana Souza", requested_at: "2026-05-04 09:51", priority: "low",
    timeline: [
      { actor: "Ana Souza", role: "CX Manager", action: "Created request", ts: "May 4 · 09:51", status: "done" },
      { actor: "You · Renata Alves", role: "CFO", action: "Awaiting authorization", ts: "—", status: "current" },
    ],
  },
];

const priorityStyle: Record<Approval["priority"], string> = {
  low: "bg-muted text-muted-foreground border-border",
  normal: "bg-info/10 text-info border-info/30",
  high: "bg-warning/10 text-warning border-warning/30",
  critical: "bg-destructive/10 text-destructive border-destructive/30",
};

export default function Approvals() {
  const [items, setItems] = useState(seed);
  const [active, setActive] = useState<string>(seed[0].id);
  const { toast } = useToast();

  const current = items.find((i) => i.id === active) ?? items[0];

  const decide = (decision: "approve" | "reject") => {
    setItems((arr) => arr.filter((i) => i.id !== current.id));
    const next = items.find((i) => i.id !== current.id);
    if (next) setActive(next.id);
    toast({
      title: decision === "approve" ? "Operation approved" : "Operation rejected",
      description: `${current.id} · ${current.title}`,
    });
  };

  return (
    <div>
      <PageHeader
        eyebrow="Governance · Maker-Checker"
        title="Pending approvals"
        description="Dual-control workflow for sensitive financial operations. Every decision is logged and signed."
        actions={<Badge variant="outline" className="gap-1.5"><Clock className="h-3 w-3" />{items.length} awaiting you</Badge>}
      />

      {items.length === 0 ? (
        <Card className="card-surface p-12 text-center">
          <ShieldCheck className="h-10 w-10 text-success mx-auto mb-3" />
          <h3 className="text-lg font-semibold">All caught up</h3>
          <p className="text-sm text-muted-foreground">No pending operations require your authorization.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <Card className="card-surface p-2 lg:col-span-2 self-start">
            <div className="space-y-1">
              {items.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setActive(a.id)}
                  className={`w-full text-left rounded-lg p-3 transition-colors border ${active === a.id ? "border-primary/40 bg-primary/5" : "border-transparent hover:bg-secondary/40"}`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-[10px] text-muted-foreground">{a.id}</span>
                    <Badge variant="outline" className={`text-[10px] capitalize ${priorityStyle[a.priority]}`}>{a.priority}</Badge>
                  </div>
                  <p className="text-sm font-medium leading-tight mb-1.5 truncate">{a.title}</p>
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>{a.entity}</span>
                    <span className="font-mono text-foreground">{a.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })}</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <Card className="card-surface p-6 lg:col-span-3">
            <div className="flex items-start justify-between gap-3 mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-[10px] text-muted-foreground">{current.id}</span>
                  <Badge variant="outline" className="text-[10px]">{current.type}</Badge>
                  <Badge variant="outline" className={`text-[10px] capitalize ${priorityStyle[current.priority]}`}>{current.priority}</Badge>
                </div>
                <h2 className="text-xl font-semibold">{current.title}</h2>
                <p className="text-xs text-muted-foreground mt-1">Requested by {current.requested_by} · {current.requested_at}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Amount</p>
                <p className="text-2xl font-mono font-semibold">{current.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{current.entity}</p>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-secondary/30 p-4 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Approval timeline</span>
              </div>
              <ol className="relative space-y-4">
                {current.timeline.map((s, i) => (
                  <li key={i} className="flex gap-3 relative">
                    <div className="flex flex-col items-center">
                      <div className={`h-7 w-7 rounded-full border flex items-center justify-center shrink-0 ${s.status === "done" ? "bg-success/20 border-success/40 text-success" :
                          s.status === "current" ? "bg-primary/20 border-primary/40 text-primary animate-pulse-glow" :
                            "bg-secondary border-border text-muted-foreground"
                        }`}>
                        {s.status === "done" ? <Check className="h-3.5 w-3.5" /> : s.status === "current" ? <Clock className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                      </div>
                      {i < current.timeline.length - 1 && <div className="w-px flex-1 bg-border my-1 min-h-[24px]" />}
                    </div>
                    <div className="flex-1 pb-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium">{s.actor}</p>
                        <span className="text-[10px] font-mono text-muted-foreground">{s.ts}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{s.role} · {s.action}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={() => decide("reject")} variant="outline" className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive flex-1">
                <X className="h-4 w-4 mr-1.5" />Reject
              </Button>
              <Button onClick={() => decide("approve")} className="bg-gradient-primary text-primary-foreground hover:opacity-90 flex-1">
                <Check className="h-4 w-4 mr-1.5" />Approve & sign
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
