import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { useAuth } from "@/hooks/use-auth";
import { useAnalysisHistory } from "@/hooks/use-analysis";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Clock, FileText, ChevronRight, AlertTriangle, ShieldCheck, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { user } = useAuth();
  const history = useAnalysisHistory();

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const getRiskBadge = (level: string) => {
    switch(level) {
      case "High": return <Badge variant="destructive" className="bg-red-500/10 text-red-600 hover:bg-red-500/20 border-red-200">High Risk</Badge>;
      case "Medium": return <Badge variant="secondary" className="bg-amber-500/10 text-amber-700 hover:bg-amber-500/20 border-amber-200">Medium Risk</Badge>;
      case "Low": return <Badge variant="default" className="bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 border-emerald-200">Safe</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-secondary">
              Welcome back, {user?.name.split(' ')[0]}
            </h1>
            <p className="text-muted-foreground mt-1">
              Here is your recent activity and safety analysis overview.
            </p>
          </div>
          <Link href="/analyze">
            <Button size="lg" className="shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
              <Plus className="mr-2 h-5 w-5" />
              Analyze New Agreement
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-border/60 bg-white/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Analyzed</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-display">{history.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Documents processed</p>
            </CardContent>
          </Card>
          <Card className="border-border/60 bg-white/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">High Risk Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-display text-red-600">
                {history.filter(h => h.riskLevel === "High").length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Requiring immediate attention</p>
            </CardContent>
          </Card>
          <Card className="border-border/60 bg-white/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Safety Score</CardTitle>
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-display text-emerald-600">92%</div>
              <p className="text-xs text-muted-foreground mt-1">Based on accepted terms</p>
            </CardContent>
          </Card>
        </div>

        {/* History List */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-xl font-bold text-secondary">Recent History</h2>
          </div>

          {history.length === 0 ? (
            <div className="bg-white border border-dashed border-border/80 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-2">No analyses yet</h3>
              <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                Upload your first contract or agreement text to get AI-powered safety insights.
              </p>
              <Link href="/analyze">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                  Start Analysis
                </Button>
              </Link>
            </div>
          ) : (
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              {history.map((entry) => (
                <motion.div variants={item} key={entry.id}>
                  <Card className="group hover:shadow-md transition-all duration-300 border-border/60 overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-6 p-6">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between md:justify-start gap-4 mb-2">
                          {getRiskBadge(entry.riskLevel)}
                          <span className="text-xs text-muted-foreground font-medium bg-slate-100 px-2 py-1 rounded">
                            {format(new Date(entry.date), "MMM d, yyyy • h:mm a")}
                          </span>
                        </div>
                        <p className="text-sm text-secondary/80 font-medium line-clamp-2 leading-relaxed">
                          "{entry.preview}"
                        </p>
                        
                        {entry.warning && (
                          <div className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-100 mt-3">
                            <Info className="w-4 h-4 shrink-0 mt-0.5" />
                            {entry.warning}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col justify-center items-end border-t md:border-t-0 md:border-l border-border/50 pt-4 md:pt-0 md:pl-6 gap-2 min-w-[140px]">
                        <div className="text-right w-full">
                          <span className="text-xs text-muted-foreground block mb-1">Risk Factors</span>
                          <span className="font-bold font-display text-xl text-secondary">{entry.risks.length}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="w-full text-primary hover:text-primary hover:bg-primary/5 group-hover:translate-x-1 transition-all">
                          View Details <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}
