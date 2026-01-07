import { useState, useEffect } from "react";
import { useLocation } from "wouter";

export type UserRole = "Student" | "Freelancer" | "Founder";

export interface User {
  name: string;
  role: UserRole;
}

const STORAGE_KEY = "neurosafe_user";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Check local storage on mount
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse user from storage", e);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (name: string, role: UserRole) => {
    const newUser = { name, role };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
    setLocation("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setLocation("/login");
  };

  return { user, isLoading, login, logout };
}
