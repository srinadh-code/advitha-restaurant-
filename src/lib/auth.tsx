import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DEMO_USERS } from "./mockData";

export type Role = "admin" | "receptionist" | "customer";
export type AuthUser = { email: string; name: string; role: Role };

type Ctx = {
  user: AuthUser | null;
  login: (email: string, password: string) => { ok: boolean; error?: string; role?: Role };
  signup: (name: string, email: string, password: string) => { ok: boolean };
  logout: () => void;
};

const AuthContext = createContext<Ctx | null>(null);
const KEY = "mulugu.auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const login: Ctx["login"] = (email, password) => {
    const found = DEMO_USERS.find((u) => u.email === email && u.password === password);
    if (!found) return { ok: false, error: "Invalid email or password" };
    const u: AuthUser = { email: found.email, name: found.name, role: found.role as Role };
    setUser(u);
    localStorage.setItem(KEY, JSON.stringify(u));
    return { ok: true, role: u.role };
  };

  const signup: Ctx["signup"] = (name, email) => {
    const u: AuthUser = { email, name, role: "customer" };
    setUser(u);
    localStorage.setItem(KEY, JSON.stringify(u));
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(KEY);
  };

  return <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}