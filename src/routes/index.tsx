import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Bed, UtensilsCrossed, Wifi, Car, ConciergeBell, PartyPopper, Star, ArrowRight, MapPin } from "lucide-react";
import hotelExterior from "@/assets/hotel-exterior.jpg";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { ROOMS, FOODS, TOURISM, REVIEWS, HOTEL } from "@/lib/mockData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ADVITHA Hotel & Restaurant — Luxury Stay in Telangana" },
      { name: "description", content: "Premium luxury hotel, family restaurant and tourism gateway in Mulugu, Telangana." },
      { property: "og:title", content: "Mulugu Hotel & Restaurant" },
      { property: "og:description", content: "Premium luxury hotel, family restaurant and tourism gateway in Mulugu." },
    ],
  }),
  component: Index,
});

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Bed, UtensilsCrossed, Wifi, Car, ConciergeBell, PartyPopper,
};

function Index() {
  const featuredRooms = ROOMS.slice(0, 3);
  const featuredFoods = FOODS.slice(0, 6);
  const featuredTourism = TOURISM.slice(0, 4);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
        <img src={hotelExterior} alt="Mulugu Hotel exterior at dusk" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        <div className="relative z-10 container mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-xs uppercase tracking-[0.4em] text-gold">Welcome to {HOTEL.name.split(" & ")[0]}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mt-4 font-display text-4xl md:text-6xl font-bold leading-tight max-w-4xl">
            Where Luxury Meets <span className="text-gradient-gold">Telangana Hospitality</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="mt-5 max-w-2xl text-base md:text-lg text-white/85">
            Premium rooms, an award-winning family restaurant, and a perfect gateway to the temples, waterfalls and forests of Mulugu.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/book" className="rounded-md gradient-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-luxury hover:opacity-90">
              Book Room
            </Link>
            <Link to="/restaurant" className="rounded-md border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/20">
              Explore Restaurant
            </Link>
          </motion.div>
        </div>
      </section>




            {/* FEATURED FOOD */}
      <section className="container mx-auto px-4 py-20">
        <SectionHeading eyebrow="Taste of Mulugu" title="Featured Cuisine" sub="From street-style starters to royal thalis." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredFoods.map((f, i) => (
            <motion.div key={f.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="group flex gap-4 overflow-hidden rounded-2xl bg-card border border-border p-3 shadow-soft hover:shadow-luxury transition">
              <img src={f.image} alt={f.name} className="h-24 w-28 flex-none rounded-xl object-cover" />
              <div className="flex flex-col justify-center">
                <span className="text-[10px] uppercase tracking-widest text-gold font-semibold">{f.category}</span>
                <h3 className="font-display text-lg font-bold leading-tight">{f.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{f.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/restaurant" className="rounded-md gradient-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-soft">
            View Full Menu
          </Link>
        </div>
      </section>
      

    

      {/* FEATURED ROOMS */}
      <section className="bg-secondary/50 py-20">
        <div className="container mx-auto px-4">
          <SectionHeading eyebrow="Stay With Us" title="Featured Rooms" sub="Hand-picked rooms for every kind of stay." />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featuredRooms.map((r, i) => (
              <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group overflow-hidden rounded-2xl bg-card border border-border shadow-soft hover:shadow-luxury transition">
                <div className="relative h-56 overflow-hidden">
                  <img src={r.image} alt={r.name} className="h-full w-full object-cover transition group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-bold">{r.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{r.description}</p>
                  <Link to="/rooms" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                    View Details <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/rooms" className="rounded-md gradient-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-soft">
              View All Rooms
            </Link>
          </div>
        </div>
      </section>




      {/* Services Section */}
<section className="bg-gold-soft/40 py-14">
  <div className="container mx-auto px-4">
    <div className="text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-gold font-semibold">
        Premium Services
      </p>

      <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">
        Everything You Need, Beautifully Done
      </h2>

      <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
        Experience luxury hospitality with premium facilities designed for
        comfort, convenience, and memorable stays.
      </p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-10">
      {[
        {
          icon: Bed,
          title: "Luxury Rooms",
          desc: "Elegant rooms with modern amenities",
        },
        {
          icon: UtensilsCrossed,
          title: "Family Dining",
          desc: "Multi-cuisine restaurant experience",
        },
        {
          icon: Wifi,
          title: "Free WiFi",
          desc: "High-speed internet access",
        },
        {
          icon: Car,
          title: "Parking",
          desc: "Spacious and secure parking",
        },
        {
          icon: ConciergeBell,
          title: "Room Service",
          desc: "24/7 hospitality support",
        },
        {
          icon: PartyPopper,
          title: "Event Hall",
          desc: "Perfect for celebrations & events",
        },
      ].map((s) => (
        <div
          key={s.title}
          className="bg-card rounded-2xl shadow-sm border border-border p-5 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex justify-center">
            <s.icon className="h-10 w-10 text-primary" />
          </div>

          <h3 className="font-semibold mt-3 text-sm md:text-base">
            {s.title}
          </h3>

          <p className="text-xs text-muted-foreground mt-2">
            {s.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>





      {/* REVIEWS */}
      <section className="container mx-auto px-4 py-20">
        <SectionHeading eyebrow="Guest Stories" title="What our guests say" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r) => (
            <div key={r.name} className="rounded-2xl bg-card border border-border p-5 shadow-soft">
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">“{r.text}”</p>
              <p className="mt-4 font-semibold text-sm">{r.name}</p>
              <p className="text-xs text-muted-foreground">{r.role}</p>
            </div>
          ))}
        </div>
      </section>


            {/* TOURISM PREVIEW */}
      <section className="bg-secondary/50 py-20">
        <div className="container mx-auto px-4">
          <SectionHeading eyebrow="Explore Around" title="Tourism near Mulugu" sub="Temples, waterfalls and wild places — all minutes away." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTourism.map((t) => (
              <div key={t.id} className="group overflow-hidden rounded-2xl bg-card border border-border shadow-soft hover:shadow-luxury transition">
                <div className="h-44 overflow-hidden">
                  <img src={t.image} alt={t.name} className="h-full w-full object-cover transition group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-lg font-bold">{t.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{t.description}</p>
                  <p className="mt-2 flex items-center gap-1 text-xs text-gold"><MapPin className="h-3 w-3" /> {t.distance}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/tourism" className="rounded-md gradient-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-soft">
              View All Tourism Places
            </Link>
          </div>
        </div>
      </section>


                  {/* SERVICES */}
      {/* <section className="bg-foreground text-background py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gold font-semibold">Special Services</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">Everything you need, beautifully done</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Bed, title: "Luxury Rooms", desc: "Elegant rooms with modern amenities." },
              { icon: UtensilsCrossed, title: "Family Dining", desc: "Multi-cuisine restaurant for all guests." },
              { icon: Wifi, title: "Free WiFi", desc: "High-speed internet across the property." },
              { icon: Car, title: "Parking", desc: "Spacious secure parking on-site." },
              { icon: ConciergeBell, title: "Room Service", desc: "24/7 in-room dining and concierge." },
              { icon: PartyPopper, title: "Event Hall", desc: "Party hall for functions and gatherings." },
            ].map((s) => (
              <div key={s.title} className="rounded-2xl border border-background/10 bg-background/5 p-6 hover:bg-background/10 transition">
                <s.icon className="h-8 w-8 text-gold" />
                <h3 className="mt-4 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-background/70">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      



        {/* OVERVIEW */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold font-semibold">About the Hotel</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">A landmark of elegance in the heart of Mulugu</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              From beautifully appointed rooms to a vibrant family restaurant and curated tourism experiences,
              {" "}{HOTEL.name} brings together luxury, comfort and warm Telangana hospitality.
            </p>
            <div className="mt-6 flex gap-3">
              <Link to="/about" className="inline-flex items-center gap-2 rounded-md gradient-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground">
                Discover More <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/gallery" className="inline-flex items-center rounded-md border border-border px-5 py-2.5 text-sm font-semibold hover:bg-secondary">
                Gallery
              </Link>
            </div>
          </div>
          <div className="relative">
            <img src={hotelExterior} alt="Hotel" className="rounded-2xl shadow-luxury aspect-[4/5] object-cover" />
            <div className="absolute -bottom-5 -left-5 hidden sm:block rounded-2xl bg-card p-5 shadow-luxury border border-border">
              <p className="text-2xl font-display font-bold text-gradient-gold">10+ Years</p>
              <p className="text-xs text-muted-foreground">of trusted hospitality</p>
            </div>
          </div>
        </div>
      </section>


    </SiteLayout>





  );
}
