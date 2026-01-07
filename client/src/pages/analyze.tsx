import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAnalyzeAgreement, analysisRequestSchema, type AnalysisRequest, type AnalysisResponse } from "@/hooks/use-analysis";
import { useToast } from "@/hooks/use-toast";
import { Loader2, AlertTriangle, CheckCircle2, Info, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnalyzePage() {
  const { toast } = useToast();
  const mutation = useAnalyzeAgreement();
  const [result, setResult] = useState<AnalysisResponse | null>(null);

  const form = useForm<AnalysisRequest>({
    resolver: zodResolver(analysisRequestSchema),
    defaultValues: {
      text: "",
      environment: "Calm"
    }
  });

  const onSubmit = (data: AnalysisRequest) => {
    mutation.mutate(data, {
      onSuccess: (response) => {
        setResult(response);
        toast({
          title: "Analysis Complete",
          description: `Detected ${response.riskLevel} risk level.`,
        });
        // Scroll to results
        setTimeout(() => {
          document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      },
      onError: (error) => {
        toast({
          title: "Analysis Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    });
  };

  const getRiskColor = (level: string) => {
    switch(level) {
      case "High": return "text-red-600 border-red-200 bg-red-50";
      case "Medium": return "text-amber-600 border-amber-200 bg-amber-50";
      case "Low": return "text-emerald-600 border-emerald-200 bg-emerald-50";
      default: return "text-slate-600 border-slate-200 bg-slate-50";
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-secondary">Analyze Agreement</h1>
          <p className="text-muted-foreground mt-2">
            Paste the text of any contract, email, or message to detect hidden risks and coercive language.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/60 shadow-lg">
              <CardHeader>
                <CardTitle>Agreement Details</CardTitle>
                <CardDescription>
                  Provide the text and your current context for better accuracy.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="environment">Current Environment</Label>
                    <Select 
                      onValueChange={(val) => form.setValue("environment", val as any)}
                      defaultValue={form.getValues("environment")}
                    >
                      <SelectTrigger className="w-full bg-slate-50/50">
                        <SelectValue placeholder="Select environment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Calm">Calm (Neutral setting)</SelectItem>
                        <SelectItem value="Stressed">Stressed (Time pressure)</SelectItem>
                        <SelectItem value="Overwhelmed">Overwhelmed (High cognitive load)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      We adjust risk thresholds based on your cognitive load.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="text">Agreement Text</Label>
                    <Textarea
                      id="text"
                      placeholder="Paste contract text, email content, or message history here..."
                      className="min-h-[300px] font-mono text-sm leading-relaxed bg-slate-50/50 focus:bg-white transition-colors p-4 resize-none"
                      {...form.register("text")}
                    />
                    {form.formState.errors.text && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        {form.formState.errors.text.message}
                      </p>
                    )}
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>Min. 50 characters</span>
                      <span>{form.watch("text").length} characters</span>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                    disabled={mutation.isPending || !form.formState.isValid}
                  >
                    {mutation.isPending ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Analyzing with AI...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Analyze Safety
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar / Tips */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <Info className="w-5 h-5" />
                  Did you know?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-blue-800 space-y-4">
                <p>
                  When you are <strong>stressed</strong>, you are 40% more likely to miss critical negative clauses in contracts.
                </p>
                <div className="h-px bg-blue-200" />
                <p>
                  NeuroSafe uses sentiment analysis to detect <strong>urgency tactics</strong> often used in predatory agreements.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Analysis History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your recent analyses will appear in the dashboard. We store them locally for your privacy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {result && (
            <motion.div
              id="results-section"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="mt-12"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-blue-500/5 to-indigo-500/5 rounded-3xl blur-xl" />
                <Card className="relative border-2 border-primary/10 overflow-hidden shadow-2xl">
                  <div className={`h-2 w-full ${result.riskLevel === 'High' ? 'bg-red-500' : result.riskLevel === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                  
                  <CardHeader className="pb-8 border-b border-border/40">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-2xl font-display mb-2">Analysis Results</CardTitle>
                        <CardDescription>
                          Here is what our AI detected in your text.
                        </CardDescription>
                      </div>
                      <div className={`px-6 py-2 rounded-full border text-lg font-bold flex items-center gap-2 ${getRiskColor(result.riskLevel)}`}>
                        {result.riskLevel === 'High' && <AlertTriangle className="w-6 h-6" />}
                        {result.riskLevel === 'Medium' && <Info className="w-6 h-6" />}
                        {result.riskLevel === 'Low' && <CheckCircle2 className="w-6 h-6" />}
                        {result.riskLevel} Risk Detected
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-8 grid md:grid-cols-2 gap-12">
                    <div>
                      <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                        Identified Risks
                      </h3>
                      <ul className="space-y-3">
                        {result.risks.map((risk, index) => (
                          <motion.li 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            key={index} 
                            className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-primary/20 transition-colors"
                          >
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold mt-0.5">
                              {index + 1}
                            </span>
                            <span className="text-slate-700">{risk}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                        <Info className="w-5 h-5 text-blue-500" />
                        AI Assessment
                      </h3>
                      <Alert className="mb-6 bg-blue-50/50 border-blue-100">
                        <Info className="h-4 w-4 text-blue-600" />
                        <AlertTitle className="text-blue-900 font-semibold mb-2">Overall Warning</AlertTitle>
                        <AlertDescription className="text-blue-800 leading-relaxed">
                          {result.warning}
                        </AlertDescription>
                      </Alert>

                      <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                        <h4 className="font-semibold text-sm text-slate-500 uppercase tracking-wider mb-4">Recommendation</h4>
                        <p className="text-secondary font-medium">
                          {result.riskLevel === "High" 
                            ? "Do NOT sign or agree to this without legal consultation. The detected risks are significant."
                            : result.riskLevel === "Medium"
                            ? "Proceed with caution. Clarify the ambiguous terms listed on the left before agreeing."
                            : "The text appears standard, but always read carefully before signing."
                          }
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
