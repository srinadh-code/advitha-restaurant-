import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset Password — Mulugu Hotel" }, { name: "description", content: "Reset your password." }]}),
  component: Page,
});

function Page() {
  const [email, setEmail] = useState("");
  return (
    <SiteLayout>
      <section className="container mx-auto grid place-items-center px-4 py-20">
        <div className="w-full max-w-md rounded-2xl bg-card border border-border p-8 shadow-luxury">
          <h1 className="font-display text-3xl font-bold">Reset Password</h1>
          <p className="mt-1 text-sm text-muted-foreground">We'll send a reset link to your email.</p>
          <form onSubmit={(e) => { e.preventDefault(); if (!email) return; toast.success("Reset link sent (demo)"); }} className="mt-6 space-y-4">
            <input className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button className="w-full rounded-md gradient-gold py-2.5 text-sm font-semibold text-gold-foreground shadow-soft">Send Reset Link</button>
          </form>
          <p className="mt-4 text-sm text-center"><Link to="/login" className="text-primary hover:underline">Back to login</Link></p>
        </div>
      </section>
    </SiteLayout>
  );
}