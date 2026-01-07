import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Zap, Lock } from "lucide-react";
import { Layout } from "@/components/layout";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <Layout>
      <div className="relative overflow-hidden pb-16">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />
          <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[120px]" />
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-20 pb-16 text-center lg:pt-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 border border-primary/20">
              <Zap className="w-4 h-4 fill-current" />
              AI-Powered Protection
            </span>
            <h1 className="text-5xl lg:text-7xl font-display font-extrabold text-secondary tracking-tight mb-6">
              Decision Safety for <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                High-Risk Agreements
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              NeuroSafe AI analyzes your digital contracts and communications to detect hidden risks, 
              coercive language, and unfavorable terms before you agree.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/login">
                <Button size="lg" className="h-12 px-8 text-lg rounded-xl shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-1">
                  Try Demo Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a href="#how-it-works" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
                How does it work?
              </a>
            </div>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="container mx-auto px-4 py-16" id="how-it-works">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ShieldCheck className="w-8 h-8 text-primary" />}
              title="Risk Detection"
              description="Instantly identifies ambiguous clauses and high-risk terms in any text."
              delay={0.1}
            />
            <FeatureCard 
              icon={<BrainCircuit className="w-8 h-8 text-blue-600" />} // BrainCircuit imported locally here just for icon
              title="Context Aware"
              description="Adapts analysis based on your emotional state and environmental pressure."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Lock className="w-8 h-8 text-indigo-600" />}
              title="Privacy First"
              description="Your data is analyzed securely and never used to train public models."
              delay={0.3}
            />
          </div>
        </div>

        {/* Example Scenario */}
        <div className="container mx-auto px-4 py-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-border/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-blue-500 to-indigo-600" />
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-display font-bold mb-4 text-secondary">See it in action</h3>
                <p className="text-muted-foreground mb-6 text-lg">
                  Imagine receiving a freelancer contract that looks standard but hides predatory IP transfer clauses.
                </p>
                <ul className="space-y-4 mb-8">
                  <ListItem text="Detects 'Work for Hire' traps" />
                  <ListItem text="Flags unlimited liability clauses" />
                  <ListItem text="Warns about vague payment terms" />
                </ul>
                <Link href="/login">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                    Analyze Your Contract Now
                  </Button>
                </Link>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 border border-border/60 font-mono text-sm relative shadow-inner">
                <div className="absolute top-4 right-4 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-red-200">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  High Risk
                </div>
                <div className="space-y-4 opacity-80">
                  <p className="text-slate-400">Analysis Result:</p>
                  <p className="text-slate-800 font-semibold">⚠️ Critical Warning Detected</p>
                  <div className="space-y-2 pl-4 border-l-2 border-red-300">
                    <p className="text-slate-600">
                      "Clause 4.2 transfers <span className="bg-red-100 text-red-900 px-1 rounded">irrevocable rights</span> to all your past and future inventions, not just work created for this project."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white p-8 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300"
    >
      <div className="mb-6 bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center border border-slate-100">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-secondary">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}

function ListItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3">
      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <span className="text-secondary font-medium">{text}</span>
    </li>
  );
}

// Re-importing locally to avoid circular dependencies or missing icons in small components
import { BrainCircuit } from "lucide-react";
