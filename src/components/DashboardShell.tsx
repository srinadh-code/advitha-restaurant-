import { useState, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { Menu, X, LogOut, Crown } from "lucide-react";

export type SidebarItem = { key: string; label: string; icon: React.ComponentType<{ className?: string }> };

export function DashboardShell({
  title,
  items,
  active,
  onChange,
  children,
}: {
  title: string;
  items: SidebarItem[];
  active: string;
  onChange: (key: string) => void;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-secondary/40">
      {/* Sidebar */}
      <aside className={`fixed lg:static z-40 inset-y-0 left-0 w-64 bg-sidebar text-sidebar-foreground transform transition-transform ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="flex items-center gap-2 px-5 py-5 border-b border-sidebar-border">
          <span className="grid h-9 w-9 place-items-center rounded-full gradient-gold text-gold-foreground"><Crown className="h-5 w-5" /></span>
          <div className="leading-tight">
            <p className="font-display font-bold">Mulugu</p>
            <p className="text-xs text-sidebar-primary">{title}</p>
          </div>
        </div>
        <nav className="px-3 py-4 space-y-1">
          {items.map((it) => (
            <button key={it.key} onClick={() => { onChange(it.key); setOpen(false); }}
              className={`w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm transition ${active === it.key ? "bg-sidebar-primary text-sidebar-primary-foreground" : "hover:bg-sidebar-accent text-sidebar-foreground/80"}`}>
              <it.icon className="h-4 w-4" /> {it.label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-4 left-0 right-0 px-3 space-y-2">
          <div className="rounded-md bg-sidebar-accent p-3 text-xs">
            <p className="font-semibold">{user?.name}</p>
            <p className="text-sidebar-foreground/70">{user?.email}</p>
          </div>
          <button onClick={() => { logout(); navigate({ to: "/" }); }} className="w-full flex items-center gap-2 rounded-md bg-sidebar-accent px-3 py-2 text-sm hover:bg-sidebar-border">
            <LogOut className="h-4 w-4" /> Logout
          </button>
          <Link to="/" className="block w-full text-center text-xs text-sidebar-primary hover:underline">← Back to site</Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 bg-card border-b border-border px-4 py-3">
          <button className="lg:hidden p-2" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
          <h1 className="font-display text-lg font-bold flex-1 capitalize">{active.replace(/-/g, " ")}</h1>
          <span className="hidden md:inline rounded-full bg-secondary px-3 py-1 text-xs font-medium">{title}</span>
        </header>
        <main className="p-4 md:p-6 flex-1">{children}</main>
      </div>

      {open && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setOpen(false)} aria-hidden />}
      <button className="lg:hidden fixed top-3 right-3 z-50 p-2 bg-card rounded-md border border-border" onClick={() => setOpen(false)} hidden={!open} aria-label="Close"><X /></button>
    </div>
  );
}


export function StatCard({
  label,
  value,
  accent,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  accent?: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-2xl bg-card border border-border p-5 shadow-soft hover:shadow-lg transition relative">
      
      {/* Small Icon Top Right */}
      {Icon && (
        <div className="absolute top-4 right-4 rounded-full bg-yellow-100 p-2">
          <Icon className="h-4 w-4 text-yellow-600" />
        </div>
      )}

      <p className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </p>

      <p
        className={`mt-3 font-display text-3xl font-bold ${
          accent ?? "text-foreground"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
export function DataTable({ columns, rows }: { columns: string[]; rows: (string | number)[][] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
      <table className="w-full text-sm">
        <thead className="bg-secondary/50 text-left">
          <tr>{columns.map((c) => <th key={c} className="px-4 py-3 font-semibold">{c}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-border hover:bg-secondary/30">
              {r.map((cell, j) => <td key={j} className="px-4 py-3">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}