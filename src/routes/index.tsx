import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Bed, UtensilsCrossed, Wifi, Car, ConciergeBell, PartyPopper, Star, ArrowRight, MapPin } from "lucide-react";
// import hotelExterior from "@/assets/hotel-exterior.jpg";
import hotelExterior from "@/assets/advitha.png";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { REVIEWS, HOTEL } from "@/lib/mockData";
import { useEffect, useState } from "react";
import API from "@/api/api";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ADVITHA Hotel & Restaurant — Mulugu" },
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
interface Food {
  id: number;
  name: string;
  category: number;
  category_name: string;
  price: string;
  description: string;
  image_url: string;
}

interface Room {
  id: number;
  title: string;
  room_type: string;
  image: string;
  image_url: string;
  description: string;
  price: string;
}
interface TourismPlace {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  image_url: string;
  distance: string;
}

function Index() {
  // const featuredRooms = ROOMS.slice(0, 3);
  
  const [featuredRooms, setFeaturedRooms] = useState<Room[]>([]);
  const [featuredFoods, setFeaturedFoods] = useState<Food[]>([]);
  const [featuredTourism, setFeaturedTourism] =
  useState<TourismPlace[]>([]);

useEffect(() => {
  fetchFoods();
  fetchRooms();
  fetchTourismPlaces();
}, []);


const fetchFoods = async () => {
  try {
    const response = await API.get("/api/food/foods/");
    const foods = response.data;

    const veg = foods
      .filter(
        (f: Food) =>
          f.category_name.toLowerCase().trim() === "veg"
      )
      .slice(0, 3);

    const nonVeg = foods
      .filter(
        (f: Food) =>
          f.category_name.toLowerCase().trim() === "non-veg"
      )
      .slice(0, 3);

    const iceCream = foods
      .filter(
        (f: Food) =>
          f.category_name.toLowerCase().trim() === "ice creams"
      )
      .slice(0, 3);

    setFeaturedFoods([
      ...veg,
      ...nonVeg,
      ...iceCream,
    ]);
  } catch (error) {
    console.error("Error fetching foods:", error);
  }
};


const fetchRooms = async () => {
  try {
    const response = await API.get("/api/rooms/");
    setFeaturedRooms(response.data.slice(0, 3));
  } catch (error) {
    console.error("Error fetching rooms:", error);
  }
};

const fetchTourismPlaces = async () => {
  try {
    const response = await API.get(
      "/api/tourism/places/"
    );

    const places = response.data;

    const featured = [
      places.find(
        (p: TourismPlace) =>
          p.category === "Temples"
      ),

      places.find(
        (p: TourismPlace) =>
          p.category === "Waterfalls"
      ),

      places.find(
        (p: TourismPlace) =>
          p.category === "Historical Places"
      ),

      places.find(
        (p: TourismPlace) =>
          p.category === "Parks"
      ),
    ].filter(Boolean);

    setFeaturedTourism(featured);

  } catch (error) {
    console.error(
      "Error fetching tourism places:",
      error
    );
  }
};
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
<img
  src={hotelExterior}
  alt="Mulugu Hotel exterior at dusk"
  className="absolute inset-0 h-full w-full object-cover"
  style={{ objectPosition: "center 30%" }}
/>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        <div className="relative z-10 container mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-xs uppercase tracking-[0.4em] text-gold">Welcome to {HOTEL.name.split(" & ")[0]}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mt-4 font-display text-3xl md:text-5xl font-medium leading-tight max-w-4xl">
            Where Luxury Meets <span className="text-gradient-silver">Telangana Hospitality</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="mt-5 max-w-2xl text-base md:text-lg text-white/85">
            
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
              {/* <img src={f.image_url} alt={f.name} className="h-24 w-28 flex-none rounded-xl object-cover" /> */}
              <motion.img
  src={f.image_url}
  alt={f.name}
  initial={{
    opacity: 0,
    filter: "blur(8px)",
    scale: 1.03,
  }}
  whileInView={{
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
  }}
  viewport={{ once: true }}
  transition={{
    duration: 1,
    ease: "easeOut",
    delay: i * 0.1,
  }}
  className="h-24 w-28 flex-none rounded-xl object-cover"
/>
              <div className="flex flex-col justify-center">
                <span className="text-[10px] uppercase tracking-widest text-gold font-semibold">{f.category_name}</span>
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
    <motion.div
      key={r.id}
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay: i * 0.12,
      }}
      className="group overflow-hidden rounded-2xl bg-card border border-border shadow-soft hover:shadow-luxury hover:-translate-y-1 transition-all duration-500"
    >
      {/* Room Image */}
      <div className="relative h-56 overflow-hidden">
        <motion.img
  src={r.image_url}
  alt={r.title}
          initial={{
            opacity: 0,
            y: 15,
            scale: 1.08,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
        />

        {/* Luxury Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

        {/* Room Label */}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-xl font-bold line-clamp-1">
          {r.title}
        </h3>

        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
          {r.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-medium text-gold">
            Comfortable Stay
          </span>

          <Link
            to="/rooms"
            className="text-sm font-semibold text-primary hover:text-gold transition"
          >
            View Details →
          </Link>
        </div>
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

    {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-10">
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
      ))} */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mt-12">
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
  ].map((s, i) => (
    <motion.div
      key={s.title}
      initial={{
        opacity: 0,
        y: 40,
        scale: 0.92,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay: i * 0.12,
        ease: "easeOut",
      }}
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft transition"
    >
      {/* Gold Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

      {/* Icon */}
      <div className="relative flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10 group-hover:bg-gold/20 transition">
          <s.icon className="h-8 w-8 text-gold" />
        </div>
      </div>

      {/* Title */}
      <h3 className="relative mt-4 text-center font-display text-lg font-bold">
        {s.title}
      </h3>

      {/* Description */}
      <p className="relative mt-2 text-center text-sm text-muted-foreground leading-relaxed">
        {s.desc}
      </p>
    </motion.div>
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
      {/* <section className="bg-secondary/50 py-20">
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
      </section> */}


      {/* TOURISM PREVIEW */}
<section className="bg-secondary/50 py-20">
  <div className="container mx-auto px-4">
    <SectionHeading
      eyebrow="Explore Around"
      title="Tourism near Mulugu"
      sub="Temples, waterfalls and wild places — all minutes away."
    />

    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {featuredTourism.map((t, i) => (
        <motion.div
          key={t.id}
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: i * 0.12,
          }}
          className="group overflow-hidden rounded-2xl bg-card border border-border shadow-soft hover:shadow-luxury hover:-translate-y-1 transition-all duration-500"
        >
          {/* Image */}
          <div className="relative h-44 overflow-hidden">
            <motion.img
  src={t.image_url}
  alt={t.name}
              initial={{
                opacity: 0,
                y: 15,
                scale: 1.08,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
            />

            {/* Luxury Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-display text-lg font-bold line-clamp-1">
              {t.name}
            </h3>

            <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
              {t.description}
            </p>

            <div className="mt-3 flex items-center justify-between">
              <p className="flex items-center gap-1 text-xs text-gold">
                <MapPin className="h-3 w-3" />
                {t.distance}
              </p>

              <span className="text-xs font-medium text-muted-foreground group-hover:text-gold transition">
                Explore →
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="mt-10 text-center">
      <Link
        to="/tourism"
        className="rounded-md gradient-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-soft hover:scale-105 transition"
      >
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
<section className="container mx-auto px-4 py-24 overflow-hidden">
  <div className="grid items-center gap-14 lg:grid-cols-2">

    {/* LEFT CONTENT */}
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <p className="text-xs uppercase tracking-[0.35em] text-gold font-semibold">
        About The Hotel
      </p>

      <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold leading-tight">
        A Landmark Of Elegance
        <span className="block text-gold">
          In The Heart Of Mulugu
        </span>
      </h2>

      <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
        From beautifully designed rooms and exceptional dining
        experiences to curated tourism adventures,{" "}
        {HOTEL.name} combines luxury, comfort, and genuine
        Telangana hospitality to create unforgettable stays.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h3 className="text-3xl font-bold text-gold">
            10+
          </h3>
          <p className="text-sm text-muted-foreground">
            Years of Hospitality
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h3 className="text-3xl font-bold text-gold">
            1000+
          </h3>
          <p className="text-sm text-muted-foreground">
            Happy Guests
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          to="/about"
          className="inline-flex items-center gap-2 rounded-xl gradient-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-soft"
        >
          Discover More
          <ArrowRight className="h-4 w-4" />
        </Link>

        <Link
          to="/gallery"
          className="inline-flex items-center rounded-xl border border-border px-6 py-3 text-sm font-semibold hover:bg-secondary transition"
        >
          View Gallery
        </Link>
      </div>
    </motion.div>

    {/* RIGHT IMAGE */}
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      className="relative"
    >
      <div className="overflow-hidden rounded-3xl shadow-luxury border border-border">

        <motion.img
          src={hotelExterior}
          alt="Advitha Hotel"
          initial={{
            opacity: 0,
            y: 30,
            scale: 1.05,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
          className="h-[650px] w-full object-cover object-center hover:scale-105 transition duration-1000"
        />

      </div>

      {/* Bottom Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          delay: 0.5,
        }}
        className="absolute -bottom-6 -left-6 hidden md:block rounded-2xl bg-card border border-border p-6 shadow-luxury"
      >
        <p className="text-3xl font-bold text-gold">
          10+
        </p>

        <p className="text-sm text-muted-foreground">
          Years Of Trusted Hospitality
        </p>
      </motion.div>

      {/* Top Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          delay: 0.7,
        }}
        className="absolute -top-5 -right-5 hidden md:block rounded-2xl bg-card border border-border p-5 shadow-luxury"
      >
        <p className="text-xl font-bold text-gold">
          ★ 4.8
        </p>

        <p className="text-xs text-muted-foreground">
          Guest Rating
        </p>
      </motion.div>
    </motion.div>

  </div>
</section>

    </SiteLayout>





  );
}
