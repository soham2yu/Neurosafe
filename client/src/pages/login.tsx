import { useState } from "react";
import { useAuth, type UserRole } from "@/hooks/use-auth";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrainCircuit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function LoginPage() {
  const { login } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role) {
      toast({
        title: "Validation Error",
        description: "Please enter your name and select a role.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    // Simulate network delay for realistic feel
    setTimeout(() => {
      login(name, role as UserRole);
      toast({
        title: "Welcome back!",
        description: `Logged in as ${name}`,
      });
    }, 800);
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <Card className="border-border/50 shadow-2xl overflow-hidden backdrop-blur-sm bg-white/90">
            <div className="h-2 bg-gradient-to-r from-primary to-blue-600" />
            <CardHeader className="text-center pb-2">
              <div className="mx-auto bg-primary/10 p-3 rounded-xl w-fit mb-4">
                <BrainCircuit className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-display font-bold">Sign In</CardTitle>
              <CardDescription>Enter your details to access your workspace</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="e.g. Alex Chen" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 rounded-lg border-border/60 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Your Role</Label>
                  <Select value={role} onValueChange={(val) => setRole(val as UserRole)}>
                    <SelectTrigger className="h-11 rounded-lg border-border/60 focus:ring-primary/20 focus:border-primary">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Student">Student</SelectItem>
                      <SelectItem value="Freelancer">Freelancer</SelectItem>
                      <SelectItem value="Founder">Founder</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Analysis will be tailored to your specific role.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="pt-2 pb-8">
                <Button 
                  type="submit" 
                  className="w-full h-11 text-base font-semibold shadow-lg shadow-primary/20"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </span>
                  ) : (
                    "Continue to Dashboard"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
          <p className="text-center text-sm text-muted-foreground mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </motion.div>
      </div>
    </Layout>
  );
}
