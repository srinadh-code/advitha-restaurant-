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
  const facilities = ["48 Luxury Rooms", "Family Restaurant", "Party Hall & Conference", "Wellness", "24/7 Room Service", "Secure Parking"];
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 pt-16 text-center">

  <h1 className="mt-3 font-display text-4xl font-bold">
    Welcome to Mulugu Hotel & Restaurant
  </h1>

  <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
    Experience luxury hospitality, delicious dining, and memorable stays in the heart of Mulugu.
  </p>
</section>


     <section className="container mx-auto grid gap-10 px-4 pt-16 pb-16 md:grid-cols-2 items-center">
        <img src={hotelExterior} alt="Hotel" className="rounded-2xl shadow-luxury aspect-[4/5] object-cover" />
        <div>
  <div>
  <p className="text-xs uppercase tracking-[0.4em] font-bold text-black">
    Our Story
  </p>

  <h2 className="mt-3 font-display text-4xl font-bold text-gold">
    A decade of luxury in Mulugu
  </h2>
</div>

  <p className="mt-5 text-muted-foreground leading-relaxed">
    What began as a humble family-run inn has grown into one of
    Mulugu's most loved luxury hotels. Today, Mulugu Hotel &
    Restaurant blends timeless Telangana hospitality with modern
    amenities, curated dining and unforgettable tourism experiences.
  </p>

  <div className="mt-8 grid grid-cols-2 gap-4">
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <h3 className="text-3xl font-bold text-black">10+</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Years of Hospitality
      </p>
    </div>

    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <h3 className="text-3xl font-bold text-black">48</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Luxury Rooms
      </p>
    </div>

    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <h3 className="text-3xl font-bold text-black">5000+</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Happy Guests
      </p>
    </div>

    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <h3 className="text-3xl font-bold text-black">24/7</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Guest Support
      </p>
    </div>
  </div>
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