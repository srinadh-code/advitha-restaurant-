import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionHeading } from "@/components/SectionHeading";
import hotelExterior from "@/assets/hotel-exterior.jpg";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About Us — Mulugu Hotel & Restaurant" },
    { name: "description", content: "Our story, mission and facilities at Mulugu Hotel & Restaurant." },
    { property: "og:title", content: "About Mulugu Hotel & Restaurant" },
    { property: "og:description", content: "Our story, mission and facilities." },
  ]}),
  component: AboutPage,
});

function AboutPage() {
  const facilities = ["48 Luxury Rooms", "Family Restaurant", "Party Hall & Conference", "Spa & Wellness", "24/7 Room Service", "Secure Parking"];
  return (
    <SiteLayout>
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <img src={hotelExterior} alt="Hotel" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 container mx-auto h-full flex flex-col items-center justify-center px-4 text-center text-white">
          <p className="text-xs uppercase tracking-[0.4em] text-gold">About Us</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold">Heritage. Hospitality. Home.</h1>
        </div>
      </section>

      <section className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-2 items-center">
        <img src={hotelExterior} alt="Hotel" className="rounded-2xl shadow-luxury aspect-[4/5] object-cover" />
        <div>
          <SectionHeading eyebrow="Our Story" title="A decade of luxury in Mulugu" />
          <p className="mt-5 text-muted-foreground leading-relaxed">
            What began as a humble family-run inn has grown into one of Mulugu's most loved luxury hotels.
            Today, Mulugu Hotel & Restaurant blends timeless Telangana hospitality with modern amenities,
            curated dining and unforgettable tourism experiences.
          </p>
        </div>
      </section>

      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto grid gap-10 px-4 md:grid-cols-2">
          <div className="rounded-2xl bg-card border border-border p-8 shadow-soft">
            <h3 className="font-display text-2xl font-bold text-gradient-gold">Our Mission</h3>
            <p className="mt-3 text-muted-foreground">
              To deliver heartfelt hospitality with world-class comfort, helping every guest discover
              the soul of Mulugu and Telangana.
            </p>
          </div>
          <div className="rounded-2xl bg-card border border-border p-8 shadow-soft">
            <h3 className="font-display text-2xl font-bold text-gradient-gold">Our Vision</h3>
            <p className="mt-3 text-muted-foreground">
              To be Telangana's most trusted destination hotel — celebrated for elegance, ethical service,
              and unforgettable journeys.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <SectionHeading eyebrow="What We Offer" title="Facilities & Services" />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((f) => (
            <div key={f} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-soft">
              <CheckCircle2 className="h-5 w-5 text-gold" />
              <span className="font-medium">{f}</span>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/book" className="rounded-md gradient-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-soft">Book Your Stay</Link>
        </div>
      </section>
    </SiteLayout>
  );
}