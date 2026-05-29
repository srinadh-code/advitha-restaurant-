import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { HOTEL } from "@/lib/mockData";
import { Phone, Mail, MapPin } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().email("Invalid email").max(120),
  phone: z.string().trim().min(7, "Enter a valid phone").max(20),
  message: z.string().trim().min(5, "Message too short").max(800),
});

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact — Mulugu Hotel & Restaurant" },
    { name: "description", content: "Reach out to Mulugu Hotel & Restaurant — phone, email and address." },
    { property: "og:title", content: "Contact Mulugu Hotel" },
    { property: "og:description", content: "Phone, email, address and message form." },
  ]}),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = schema.safeParse(form);
    if (!res.success) { toast.error(res.error.issues[0].message); return; }
    toast.success("Message sent! We'll get back to you shortly.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-14">
        <SectionHeading eyebrow="Get In Touch" title="Contact Us" sub="We'd love to hear from you. Reach out anytime." />
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-2xl bg-card border border-border p-5 shadow-soft flex items-center gap-4">
              <span className="grid h-10 w-10 place-items-center rounded-full gradient-gold text-gold-foreground"><Phone className="h-5 w-5" /></span>
              <div><p className="text-xs text-muted-foreground">Phone</p><a className="font-semibold" href={`tel:${HOTEL.phone}`}>{HOTEL.phone}</a></div>
            </div>
            <div className="rounded-2xl bg-card border border-border p-5 shadow-soft flex items-center gap-4">
              <span className="grid h-10 w-10 place-items-center rounded-full gradient-gold text-gold-foreground"><Mail className="h-5 w-5" /></span>
              <div><p className="text-xs text-muted-foreground">Email</p><a className="font-semibold" href={`mailto:${HOTEL.email}`}>{HOTEL.email}</a></div>
            </div>
            <div className="rounded-2xl bg-card border border-border p-5 shadow-soft flex items-center gap-4">
              <span className="grid h-10 w-10 place-items-center rounded-full gradient-gold text-gold-foreground"><MapPin className="h-5 w-5" /></span>
              <div><p className="text-xs text-muted-foreground">Address</p><p className="font-semibold">{HOTEL.address}</p></div>
            </div>
            <iframe title="Map" src={HOTEL.mapsEmbed} loading="lazy" className="h-72 w-full rounded-2xl border border-border shadow-soft" />
          </div>

          <form onSubmit={onSubmit} className="rounded-2xl bg-card border border-border p-6 shadow-soft space-y-4">
            <h3 className="font-display text-2xl font-bold">Send us a message</h3>
            {(["name","email","phone"] as const).map((k) => (
              <div key={k}>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{k}</label>
                <input value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            ))}
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Message</label>
              <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <button type="submit" className="rounded-md gradient-gold px-6 py-2.5 text-sm font-semibold text-gold-foreground shadow-soft">Send Message</button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}