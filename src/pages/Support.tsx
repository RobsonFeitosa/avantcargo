import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MessageSquare, 
  LifeBuoy, 
  FileText, 
  ExternalLink, 
  Plus, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  Phone,
  Mail,
  Zap
} from "lucide-react";

const tickets = [
  {
    id: "SUP-8921",
    subject: "API Timeout on Batch Settlements",
    status: "in_progress",
    priority: "high",
    lastUpdate: "2 hours ago",
  },
  {
    id: "SUP-8915",
    subject: "New Entity Verification Status",
    status: "pending",
    priority: "normal",
    lastUpdate: "1 day ago",
  },
  {
    id: "SUP-8892",
    subject: "Custom Report Export Failure",
    status: "resolved",
    priority: "normal",
    lastUpdate: "3 days ago",
  },
];

const kbCategories = [
  { title: "Getting Started", count: 12, icon: Zap },
  { title: "API Documentation", count: 45, icon: FileText },
  { title: "Security & Compliance", count: 18, icon: LifeBuoy },
  { title: "Billing & Invoices", count: 8, icon: MessageSquare },
];

const statusStyle: Record<string, string> = {
  in_progress: "bg-info/10 text-info border-info/30",
  pending: "bg-warning/10 text-warning border-warning/30",
  resolved: "bg-success/10 text-success border-success/30",
};

import { toast } from "sonner";

export default function Support() {
  const handleFeatureUnderDevelopment = (feature: string) => {
    toast.info(`${feature} feature is currently under development as part of the backend integration phase.`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Support Center"
        description="Get help with your account, explore documentation, or contact our team."
        actions={
          <Button 
            className="bg-gradient-primary text-primary-foreground hover:opacity-90"
            onClick={() => handleFeatureUnderDevelopment("New Ticket")}
          >
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            New Ticket
          </Button>
        }
      />

      {/* Search Section */}
      <Card className="card-surface p-8 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-glow opacity-100" />
        <div className="relative max-w-2xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">How can we help you today?</h2>
          <p className="text-muted-foreground text-sm">
            Search our knowledge base for quick answers or browse categories below.
          </p>
          <div className="relative mt-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search documentation, tickets, FAQs..." 
              className="pl-12 h-14 bg-background/50 border-border text-lg rounded-xl focus:ring-primary shadow-xl"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleFeatureUnderDevelopment("Documentation Search");
              }}
            />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Tickets */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="card-surface p-5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Active Support Tickets
              </h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-primary"
                onClick={() => handleFeatureUnderDevelopment("Ticket History")}
              >
                View All
              </Button>
            </div>
            
            <div className="space-y-3">
              {tickets.map((ticket) => (
                <div 
                  key={ticket.id} 
                  className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors cursor-pointer group"
                  onClick={() => handleFeatureUnderDevelopment(`Ticket ${ticket.id}`)}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-muted-foreground">{ticket.id}</span>
                      <Badge variant="outline" className={`text-[10px] capitalize ${statusStyle[ticket.status]}`}>
                        {ticket.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">{ticket.subject}</p>
                    <p className="text-[11px] text-muted-foreground">Updated {ticket.lastUpdate}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card 
              className="card-surface p-5 hover:border-primary/30 transition-colors group cursor-pointer"
              onClick={() => handleFeatureUnderDevelopment("Live Chat")}
            >
              <div className="h-10 w-10 rounded-lg bg-info/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageSquare className="h-5 w-5 text-info" />
              </div>
              <h4 className="font-semibold mb-1">Live Chat</h4>
              <p className="text-xs text-muted-foreground mb-4">Average response time: 2 mins</p>
              <Button variant="outline" className="w-full text-xs h-8">Start Chat</Button>
            </Card>
            <Card 
              className="card-surface p-5 hover:border-primary/30 transition-colors group cursor-pointer"
              onClick={() => handleFeatureUnderDevelopment("Priority Phone")}
            >
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Phone className="h-5 w-5 text-success" />
              </div>
              <h4 className="font-semibold mb-1">Priority Phone</h4>
              <p className="text-xs text-muted-foreground mb-4">Available 24/7 for Premium accounts</p>
              <Button variant="outline" className="w-full text-xs h-8">Call Now</Button>
            </Card>
          </div>
        </div>

        {/* Right Column: KB Categories & More */}
        <div className="space-y-6">
          <Card className="card-surface p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Knowledge Base
            </h3>
            <div className="space-y-1">
              {kbCategories.map((cat) => (
                <button 
                  key={cat.title}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-secondary/40 transition-colors text-left group"
                  onClick={() => handleFeatureUnderDevelopment(`KB: ${cat.title}`)}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-background flex items-center justify-center border border-border group-hover:border-primary/30">
                      <cat.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-sm font-medium">{cat.title}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">{cat.count}</span>
                </button>
              ))}
            </div>
            <Button 
              variant="link" 
              className="w-full text-xs mt-4 text-primary"
              onClick={() => handleFeatureUnderDevelopment("Full Documentation")}
            >
              Browse All Documentation
              <ExternalLink className="h-3 w-3 ml-1.5" />
            </Button>
          </Card>

          <Card className="card-surface p-5 bg-primary/5 border-primary/20">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                <AlertCircle className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold">System Status</h4>
                <p className="text-[11px] text-muted-foreground">All systems operational. No major incidents reported in the last 24h.</p>
                <div className="flex items-center gap-1.5 pt-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                  <span className="text-[10px] font-medium text-success uppercase">Operational</span>
                </div>
              </div>
            </div>
          </Card>

          <Card 
            className="card-surface p-5 text-center space-y-3 cursor-pointer group hover:border-primary/30 transition-colors"
            onClick={() => handleFeatureUnderDevelopment("Email Support")}
          >
            <Mail className="h-8 w-8 text-muted-foreground mx-auto group-hover:text-primary transition-colors" />
            <h4 className="text-sm font-semibold">Email Support</h4>
            <p className="text-xs text-muted-foreground">Prefer email? Send us a message at support@financialflow.io</p>
            <Button variant="outline" size="sm" className="w-full">Send Email</Button>
          </Card>
        </div>
      </div>

      <p className="text-center text-[11px] text-muted-foreground mt-8 pt-6 border-t border-border">
        © 2026 FinCore Enterprise Systems. All support interactions are recorded for security and compliance.
      </p>
    </div>
  );
}
