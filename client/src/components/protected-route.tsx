import { useAuth } from "@/hooks/use-auth";
import { Redirect, Route } from "wouter";

interface ProtectedRouteProps {
  path: string;
  component: React.ComponentType<any>;
}

export function ProtectedRoute({ path, component: Component }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  return (
    <Route path={path}>
      {() => {
        if (isLoading) {
          return (
            <div className="min-h-screen flex items-center justify-center bg-background">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          );
        }

        if (!user) {
          return <Redirect to="/login" />;
        }

        return <Component />;
      }}
    </Route>
  );
}
