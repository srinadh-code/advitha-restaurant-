import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign Up — Mulugu Hotel" }, { name: "description", content: "Create your Mulugu Hotel account." }]}),
  component: SignupPage,
});

function SignupPage() {
  return <SiteLayout><Inner /></SiteLayout>;
}
function Inner() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [f, setF] = useState({ name: "", email: "", password: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name || !f.email || f.password.length < 6) { toast.error("Fill all fields (password 6+ chars)"); return; }
    signup(f.name, f.email, f.password);
    toast.success("Account created!");
    navigate({ to: "/" });
  };
  return (
    <section className="container mx-auto grid place-items-center px-4 py-20">
      <div className="w-full max-w-md rounded-2xl bg-card border border-border p-8 shadow-luxury">
        <h1 className="font-display text-3xl font-bold">Create Account</h1>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <input className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Full Name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
          <input className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Email" type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
          <input className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Password" type="password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} />
          <button className="w-full rounded-md gradient-gold py-2.5 text-sm font-semibold text-gold-foreground shadow-soft">Sign Up</button>
        </form>
        <p className="mt-4 text-sm text-center">Have an account? <Link to="/login" className="text-primary hover:underline">Login</Link></p>
      </div>
    </section>
  );
}