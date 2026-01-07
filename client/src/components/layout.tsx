import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { BrainCircuit, LogOut, LayoutDashboard, FileText } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [location] = useLocation();

  if (!user) {
    // Minimal layout for public pages
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="py-4 px-6 md:px-8 flex justify-between items-center border-b border-border/40 bg-white/50 backdrop-blur-md sticky top-0 z-50">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                <BrainCircuit className="w-6 h-6 text-primary" />
              </div>
              <span className="font-display font-bold text-xl text-secondary">NeuroSafe AI</span>
            </div>
          </Link>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost" className="font-medium text-muted-foreground hover:text-primary">
                Log In
              </Button>
            </Link>
            <Link href="/login">
              <Button className="font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30">
                Get Started
              </Button>
            </Link>
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
      </div>
    );
  }

  // Dashboard layout
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-border/60 flex flex-col sticky top-0 md:h-screen z-40">
        <div className="p-6 border-b border-border/40">
          <Link href="/dashboard">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="bg-primary/10 p-2 rounded-lg">
                <BrainCircuit className="w-6 h-6 text-primary" />
              </div>
              <span className="font-display font-bold text-xl text-secondary">NeuroSafe</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard">
            <Button 
              variant={location === "/dashboard" ? "secondary" : "ghost"} 
              className={`w-full justify-start gap-3 ${location === "/dashboard" ? "bg-primary/10 text-primary hover:bg-primary/15" : "text-muted-foreground"}`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/analyze">
            <Button 
              variant={location === "/analyze" ? "secondary" : "ghost"} 
              className={`w-full justify-start gap-3 ${location === "/analyze" ? "bg-primary/10 text-primary hover:bg-primary/15" : "text-muted-foreground"}`}
            >
              <FileText className="w-4 h-4" />
              Analyze
            </Button>
          </Link>
        </nav>

        <div className="p-4 border-t border-border/40 bg-muted/20">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-sm">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold truncate text-secondary">{user.name}</span>
              <span className="text-xs text-muted-foreground truncate">{user.role}</span>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full gap-2 border-primary/20 text-primary hover:bg-primary/5 hover:text-primary"
            onClick={logout}
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8 max-w-7xl mx-auto animate-in-fade">
          {children}
        </div>
      </main>
    </div>
  );
}
