// import { createFileRoute, Link } from "@tanstack/react-router";
// import { SiteLayout } from "@/components/layout/SiteLayout";
// import { SectionHeading } from "@/components/SectionHeading";
// import hotelExterior from "@/assets/hotel-exterior.jpg";
// import { CheckCircle2 } from "lucide-react";
// import { motion } from "framer-motion";
// export const Route = createFileRoute("/about")({
//   head: () => ({ meta: [
//     { title: "About Us — Mulugu Hotel & Restaurant" },
//     { name: "description", content: "Our story, mission and facilities at Mulugu Hotel & Restaurant." },
//     { property: "og:title", content: "About Mulugu Hotel & Restaurant" },
//     { property: "og:description", content: "Our story, mission and facilities." },
//   ]}),
//   component: AboutPage,
// });

// function AboutPage() {
//   const facilities = ["48 Luxury Rooms", "Family Restaurant", "Party Hall & Conference", "Wellness", "24/7 Room Service", "Secure Parking"];
//   return (
//     <SiteLayout>
//       <section className="container mx-auto px-4 pt-16 text-center">

//   <h1 className="mt-3 font-display text-4xl font-bold">
//     Welcome to Advitha Hotel & Restaurant
//   </h1>

//   <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
//     Experience luxury hospitality, delicious dining, and memorable stays in the heart of Mulugu.
//   </p>
// </section>


//      <section className="container mx-auto grid gap-10 px-4 pt-16 pb-16 md:grid-cols-2 items-center">
//         <motion.div
//   initial={{ opacity: 0, x: -40 }}
//   whileInView={{ opacity: 1, x: 0 }}
//   viewport={{ once: true }}
//   transition={{ duration: 0.8 }}
//   className="group overflow-hidden rounded-3xl shadow-luxury"
// >
//   <img
//     src={hotelExterior}
//     alt="Hotel"
//     loading="lazy"
//     className="aspect-[4/5] w-full object-cover transition-all duration-1000 group-hover:scale-105"
//   />
// </motion.div>
//         <div>
//   <div>
//   <p className="text-xs uppercase tracking-[0.4em] font-bold text-black">
//     Our Story
//   </p>

//   <h2 className="mt-3 font-display text-4xl font-bold text-gold">
//     A decade of luxury in Mulugu
//   </h2>
// </div>

//   <p className="mt-5 text-muted-foreground leading-relaxed">
//     What began as a humble family-run inn has grown into one of
//     Mulugu's most loved luxury hotels. Today, Mulugu Hotel &
//     Restaurant blends timeless Telangana hospitality with modern
//     amenities, curated dining and unforgettable tourism experiences.
//   </p>

//   <div className="mt-8 grid grid-cols-2 gap-4">
//     <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
//       <h3 className="text-3xl font-bold text-black">10+</h3>
//       <p className="mt-2 text-sm text-muted-foreground">
//         Years of Hospitality
//       </p>
//     </div>

//     <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
//       <h3 className="text-3xl font-bold text-black">48</h3>
//       <p className="mt-2 text-sm text-muted-foreground">
//         Luxury Rooms
//       </p>
//     </div>

//     <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
//       <h3 className="text-3xl font-bold text-black">5000+</h3>
//       <p className="mt-2 text-sm text-muted-foreground">
//         Happy Guests
//       </p>
//     </div>

//     <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
//       <h3 className="text-3xl font-bold text-black">24/7</h3>
//       <p className="mt-2 text-sm text-muted-foreground">
//         Guest Support
//       </p>
//     </div>
//   </div>
// </div>

    
//       </section>

//       <section className="bg-secondary/50 py-16">
//         <div className="container mx-auto grid gap-10 px-4 md:grid-cols-2">
//           <div className="rounded-2xl bg-card border border-border p-8 shadow-soft">
//             <h3 className="font-display text-2xl font-bold text-gradient-gold">Our Mission</h3>
//             <p className="mt-3 text-muted-foreground">
//               To deliver heartfelt hospitality with world-class comfort, helping every guest discover
//               the soul of Mulugu and Telangana.
//             </p>
//           </div>
//           <div className="rounded-2xl bg-card border border-border p-8 shadow-soft">
//             <h3 className="font-display text-2xl font-bold text-gradient-gold">Our Vision</h3>
//             <p className="mt-3 text-muted-foreground">
//               To be Telangana's most trusted destination hotel — celebrated for elegance, ethical service,
//               and unforgettable journeys.
//             </p>
//           </div>
//         </div>
//       </section>

//       <section className="container mx-auto px-4 py-16">
//         <SectionHeading eyebrow="What We Offer" title="Facilities & Services" />
//         <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
//           {facilities.map((f) => (
//             <div key={f} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-soft">
//               <CheckCircle2 className="h-5 w-5 text-gold" />
//               <span className="font-medium">{f}</span>
//             </div>
//           ))}
//         </div>
//         <div className="mt-10 text-center">
//           <Link to="/book" className="rounded-md gradient-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-soft">Book Your Stay</Link>
//         </div>
//       </section>
//     </SiteLayout>
//   );
// }

import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionHeading } from "@/components/SectionHeading";
import hotelExterior from "@/assets/hotel-exterior.jpg";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title: "About Us — Advitha Hotel & Restaurant",
      },
      {
        name: "description",
        content:
          "Our story, mission and facilities at Advitha Hotel & Restaurant.",
      },
      {
        property: "og:title",
        content: "About Advitha Hotel & Restaurant",
      },
      {
        property: "og:description",
        content: "Our story, mission and facilities.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const facilities = [
    "48 Luxury Rooms",
    "Family Restaurant",
    "Party Hall & Conference",
    "Wellness",
    "24/7 Room Service",
    "Secure Parking",
  ];

  const stats = [
    { value: "10+", label: "Years of Hospitality" },
    { value: "48", label: "Luxury Rooms" },
    { value: "5000+", label: "Happy Guests" },
    { value: "24/7", label: "Guest Support" },
  ];

  return (
    <SiteLayout>
      {/* HEADER */}
      <section className="container mx-auto px-4 pt-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-3 font-display text-4xl md:text-5xl font-bold"
        >
          Welcome to Advitha Hotel & Restaurant
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="mt-4 text-muted-foreground max-w-2xl mx-auto"
        >
          Experience luxury hospitality, delicious dining, and memorable stays
          in the heart of Mulugu.
        </motion.p>
      </section>

      {/* STORY SECTION */}
      <section className="container mx-auto grid gap-10 px-4 pt-16 pb-16 md:grid-cols-2 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="group overflow-hidden rounded-3xl shadow-luxury"
        >
          <img
            src={hotelExterior}
            alt="Hotel"
            loading="lazy"
            className="aspect-[4/5] w-full object-cover transition-all duration-1000 group-hover:scale-105"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs uppercase tracking-[0.4em] font-bold text-black">
            Our Story
          </p>

          <h2 className="mt-3 font-display text-4xl font-bold text-gold">
            A decade of luxury in Mulugu
          </h2>

          <p className="mt-5 text-muted-foreground leading-relaxed">
            What began as a humble family-run inn has grown into one of
            Mulugu's most loved luxury hotels. Today, Advitha Hotel &
            Restaurant blends timeless Telangana hospitality with modern
            amenities, curated dining and unforgettable tourism experiences.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                }}
                className="group rounded-3xl border border-gold/10 bg-card p-5 shadow-soft hover:shadow-luxury hover:-translate-y-2 transition-all duration-500"
              >
                <h3 className="text-4xl font-bold text-gold">
                  {stat.value}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* MISSION & VISION */}
      <section className="relative bg-secondary/50 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent pointer-events-none" />

        <div className="container mx-auto grid gap-10 px-4 md:grid-cols-2 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl bg-card border border-gold/10 p-8 shadow-soft hover:shadow-luxury hover:-translate-y-2 transition-all duration-500"
          >
            <h3 className="font-display text-2xl font-bold text-gold">
              Our Mission
            </h3>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              To deliver heartfelt hospitality with world-class comfort,
              helping every guest discover the soul of Mulugu and Telangana.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-3xl bg-card border border-gold/10 p-8 shadow-soft hover:shadow-luxury hover:-translate-y-2 transition-all duration-500"
          >
            <h3 className="font-display text-2xl font-bold text-gold">
              Our Vision
            </h3>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              To be Telangana's most trusted destination hotel —
              celebrated for elegance, ethical service and unforgettable
              journeys.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FACILITIES */}
      <section className="container mx-auto px-4 py-16">
        <SectionHeading
          eyebrow="What We Offer"
          title="Facilities & Services"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((f, i) => (
            <motion.div
              key={f}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: i * 0.08,
              }}
              className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-luxury hover:-translate-y-1 transition-all duration-500"
            >
              <CheckCircle2 className="h-5 w-5 text-gold group-hover:scale-110 transition" />

              <span className="font-medium">{f}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/book"
            className="rounded-xl gradient-gold px-8 py-4 text-sm font-semibold text-gold-foreground shadow-luxury hover:scale-105 transition-all duration-300"
          >
            Book Your Stay
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}