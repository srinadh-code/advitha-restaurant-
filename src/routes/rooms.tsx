import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { ROOMS } from "@/lib/mockData";
import { Check, Users } from "lucide-react";

export const Route = createFileRoute("/rooms")({
  head: () => ({ meta: [
    { title: "Rooms — Mulugu Hotel & Restaurant" },
    { name: "description", content: "Deluxe, Premium, Family Suites and Executive rooms at Mulugu Hotel." },
    { property: "og:title", content: "Our Rooms — Mulugu Hotel" },
    { property: "og:description", content: "Choose from Deluxe, Premium, Family Suite and Executive rooms." },
  ]}),
  component: RoomsPage,
});

function RoomsPage() {
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 pt-16 pb-10">
        <SectionHeading eyebrow="Stay In Style" title="Our Rooms & Suites" sub="Crafted for comfort, designed for elegance." />
      </section>
      <section className="container mx-auto px-4 pb-20 grid gap-8 md:grid-cols-2">
        {ROOMS.map((r) => (
          <article key={r.id} className="overflow-hidden rounded-2xl bg-card border border-border shadow-soft hover:shadow-luxury transition">
            <div className="relative h-64 overflow-hidden">
              <img src={r.image} alt={r.name} className="h-full w-full object-cover" />
              <span className="absolute top-3 left-3 rounded-full bg-foreground/80 text-background px-3 py-1 text-xs uppercase tracking-wider">{r.category}</span>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-2xl font-bold">{r.name}</h3>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><Users className="h-3.5 w-3.5" /> {r.capacity}</p>
                </div>
                <p className="text-right"><span className="text-2xl font-display font-bold text-gradient-gold">₹{r.price}</span><span className="block text-xs text-muted-foreground">/ night</span></p>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{r.description}</p>
              <ul className="mt-4 grid grid-cols-2 gap-2 text-xs">
                {r.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-gold" />{a}</li>
                ))}
              </ul>
              <Link to="/book" className="mt-5 inline-block rounded-md gradient-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground shadow-soft">
                Book Now
              </Link>
            </div>
          </article>
        ))}
      </section>
    </SiteLayout>
  );
}