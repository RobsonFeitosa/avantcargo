import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Copy, Eye, EyeOff, KeyRound, Plus, RefreshCw, Trash2, Webhook, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const keys = [
  { id: "k1", label: "Production · Backend", token: "sk_live_************************b4c5", created: "2026-02-14", lastUsed: "12s ago", scope: "read,write" },
  { id: "k2", label: "Reporting · Read-only", token: "sk_live_************************c5d6", created: "2026-01-08", lastUsed: "3h ago", scope: "read" },
  { id: "k3", label: "Sandbox", token: "sk_test_************************d6e7", created: "2025-12-22", lastUsed: "2d ago", scope: "read,write" },
];

const services = [
  { name: "Stripe Treasury", url: "api.stripe.com", status: "operational", latency: 142, uptime: 99.99 },
  { name: "Banco Itaú · Open Finance", url: "openbanking.itau.com.br", status: "operational", latency: 318, uptime: 99.92 },
  { name: "Banco do Brasil · STR", url: "str.bb.com.br", status: "degraded", latency: 1240, uptime: 98.71 },
  { name: "Receita Federal · CNPJ", url: "receita.economia.gov.br", status: "operational", latency: 580, uptime: 99.41 },
  { name: "PIX · Bacen DICT", url: "dict.pi.rsfn.net.br", status: "operational", latency: 88, uptime: 99.97 },
  { name: "Plaid · Cross-border", url: "production.plaid.com", status: "outage", latency: 0, uptime: 95.20 },
];

const statusStyle: Record<string, string> = {
  operational: "bg-success/10 text-success border-success/30",
  degraded: "bg-warning/10 text-warning border-warning/30",
  outage: "bg-destructive/10 text-destructive border-destructive/30",
};

import { toast } from "sonner";

export default function ApiSettings() {
  const [reveal, setReveal] = useState<Record<string, boolean>>({});
  const [webhookUrl, setWebhookUrl] = useState("https://api.acme.io/v1/veltrix/webhooks");
  const [retries, setRetries] = useState(true);
  const [signing, setSigning] = useState(true);

  const handleFeatureUnderDevelopment = (feature: string) => {
    toast.info(`${feature} feature is currently under development as part of the backend integration phase.`);
  };

  const copy = (v: string) => { 
    navigator.clipboard.writeText(v); 
    toast.success("Value copied to clipboard."); 
  };

  return (
    <div>
      <PageHeader
        eyebrow="Platform · Integrations"
        title="API & Webhook configuration"
        description="Manage authentication, outbound webhooks and monitor third-party connectivity in real time."
        actions={<Button size="sm" className="bg-gradient-primary text-primary-foreground hover:opacity-90" onClick={() => handleFeatureUnderDevelopment("New API Key")}><Plus className="h-3.5 w-3.5 mr-1.5" />New API key</Button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="card-surface p-5 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <KeyRound className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">API Keys</h3>
            <Badge variant="outline" className="ml-auto text-[10px] font-mono">v2 · HS256</Badge>
          </div>
          <div className="space-y-2">
            {keys.map((k) => (
              <div key={k.id} className="rounded-lg border border-border bg-secondary/30 p-3 hover:border-primary/30 transition-colors">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div>
                    <p className="text-sm font-medium">{k.label}</p>
                    <p className="text-[10px] text-muted-foreground">Created {k.created} · Scopes: {k.scope}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px] font-mono">used {k.lastUsed}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 font-mono text-xs bg-background/60 border border-border rounded px-2.5 py-1.5 truncate">
                    {reveal[k.id] ? k.token : k.token.replace(/.(?=.{4})/g, "•")}
                  </code>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setReveal((r) => ({ ...r, [k.id]: !r[k.id] }))}>
                    {reveal[k.id] ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copy(k.token)}><Copy className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleFeatureUnderDevelopment("Delete API Key")}><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-border">
            <div className="flex items-center gap-2 mb-4">
              <Webhook className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Webhook endpoint</h3>
            </div>
            <Label className="text-xs">Callback URL</Label>
            <div className="flex gap-2 mt-1.5">
              <Input value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} className="bg-secondary/50 font-mono text-xs" />
              <Button variant="outline" size="sm" onClick={() => handleFeatureUnderDevelopment("Webhook Testing")}>Test</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <div className="flex items-center justify-between rounded-lg border border-border p-3 bg-secondary/30">
                <div>
                  <p className="text-sm font-medium">Auto retry</p>
                  <p className="text-[11px] text-muted-foreground">Exponential backoff up to 24h</p>
                </div>
                <Switch checked={retries} onCheckedChange={setRetries} />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3 bg-secondary/30">
                <div>
                  <p className="text-sm font-medium">HMAC signing</p>
                  <p className="text-[11px] text-muted-foreground">X-Veltrix-Signature header</p>
                </div>
                <Switch checked={signing} onCheckedChange={setSigning} />
              </div>
            </div>
          </div>
        </Card>

        <Card className="card-surface p-5">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">Health check</h3>
            <Button variant="ghost" size="icon" className="ml-auto h-7 w-7" onClick={() => handleFeatureUnderDevelopment("Health Check Refresh")}><RefreshCw className="h-3.5 w-3.5" /></Button>
          </div>
          <div className="space-y-2">
            {services.map((s) => (
              <div key={s.name} className="rounded-lg border border-border bg-secondary/30 p-3">
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{s.name}</p>
                    <p className="text-[10px] font-mono text-muted-foreground truncate">{s.url}</p>
                  </div>
                  <Badge variant="outline" className={`text-[10px] capitalize gap-1.5 ${statusStyle[s.status]}`}>
                    <span className={`status-dot ${s.status === "operational" ? "bg-success animate-pulse-glow" : s.status === "degraded" ? "bg-warning" : "bg-destructive"}`} />
                    {s.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between mt-2 text-[10px] font-mono text-muted-foreground">
                  <span>p95 {s.latency}ms</span>
                  <span>uptime {s.uptime}%</span>
                </div>
                <div className="mt-1.5 h-1 rounded-full bg-background overflow-hidden">
                  <div
                    className={`h-full ${s.uptime > 99.5 ? "bg-success" : s.uptime > 98 ? "bg-warning" : "bg-destructive"}`}
                    style={{ width: `${s.uptime}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
