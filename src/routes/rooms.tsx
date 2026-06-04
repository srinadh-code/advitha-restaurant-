// import { createFileRoute, Link } from "@tanstack/react-router";
// import { SiteLayout } from "@/components/layout/SiteLayout";
// import { SectionHeading } from "@/components/SectionHeading";
// import { ROOMS } from "@/lib/mockData";
// import { Check, Users } from "lucide-react";

// export const Route = createFileRoute("/rooms")({
//   head: () => ({ meta: [
//     { title: "Rooms — Mulugu Hotel & Restaurant" },
//     { name: "description", content: "Deluxe, Premium, Family Suites and Executive rooms at Mulugu Hotel." },
//     { property: "og:title", content: "Our Rooms — Mulugu Hotel" },
//     { property: "og:description", content: "Choose from Deluxe, Premium, Family Suite and Executive rooms." },
//   ]}),
//   component: RoomsPage,
// });

// function RoomsPage() {
//   return (
//     <SiteLayout>
//       <section className="container mx-auto px-4 pt-16 pb-10">
//         <SectionHeading eyebrow="Stay In Style" title="Our Rooms & Suites" sub="Crafted for comfort, designed for elegance." />
//       </section>
//       <section className="container mx-auto px-4 pb-20 grid gap-8 md:grid-cols-2">
//         {ROOMS.map((r) => (
//           <article key={r.id} className="overflow-hidden rounded-2xl bg-card border border-border shadow-soft hover:shadow-luxury transition">
//             <div className="relative h-64 overflow-hidden">
//               <img src={r.image} alt={r.name} className="h-full w-full object-cover" />
//               <span className="absolute top-3 left-3 rounded-full bg-foreground/80 text-background px-3 py-1 text-xs uppercase tracking-wider">{r.category}</span>
//             </div>
//             <div className="p-6">
//               <div className="flex items-start justify-between gap-3">
//                 <div>
//                   <h3 className="font-display text-2xl font-bold">{r.name}</h3>
//                   <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><Users className="h-3.5 w-3.5" /> {r.capacity}</p>
//                 </div>
//                 <p className="text-right"><span className="text-2xl font-display font-bold text-gradient-gold">₹{r.price}</span><span className="block text-xs text-muted-foreground">/ night</span></p>
//               </div>
//               <p className="mt-3 text-sm text-muted-foreground">{r.description}</p>
//               <ul className="mt-4 grid grid-cols-2 gap-2 text-xs">
//                 {r.amenities.map((a) => (
//                   <li key={a} className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-gold" />{a}</li>
//                 ))}
//               </ul>
//               <Link to="/book" className="mt-5 inline-block rounded-md gradient-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground shadow-soft">
//                 Book Now
//               </Link>
//             </div>
//           </article>
//         ))}
//       </section>
//     </SiteLayout>
//   );
// }


















import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { useEffect, useState } from "react";
import { Check, Users } from "lucide-react";

export const Route = createFileRoute("/rooms")({
  head: () => ({
    meta: [
      {
        title: "Rooms — Mulugu Hotel & Restaurant",
      },
      {
        name: "description",
        content:
          "Deluxe, Premium, Family Suites and Executive rooms at Mulugu Hotel.",
      },
    ],
  }),
  component: RoomsPage,
});

interface Room {
  id: number;
  title: string;
  room_type: string;
  image: string;
  description: string;
  price: string;
  adults: number;
  children: number;
  feature1: string;
  feature2: string;
  feature3: string;
  feature4: string;
}

function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/rooms/"
      );

      const data = await response.json();

      console.log(data);

      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 pt-16 pb-10">
        <SectionHeading
          eyebrow="Stay In Style"
          title="Our Rooms & Suites"
          sub="Crafted for comfort, designed for elegance."
        />
      </section>

      <section className="container mx-auto px-4 pb-20 grid gap-8 md:grid-cols-2">

        {loading && (
          <p className="text-center col-span-2">
            Loading Rooms...
          </p>
        )}

        {!loading &&
          rooms.map((room) => (
            <article
              key={room.id}
              className="overflow-hidden rounded-2xl bg-card border border-border shadow-soft hover:shadow-luxury transition"
            >
              <div className="relative h-[320px] overflow-hidden">
  <img
    src={`http://127.0.0.1:8000${room.image}`}
    alt={room.title}
    className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
  />

  <span className="absolute top-3 left-3 rounded-full bg-foreground/80 text-background px-3 py-1 text-xs uppercase tracking-wider">
    {room.room_type}
  </span>
</div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-2xl font-bold">
                      {room.title}
                    </h3>

                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3.5 w-3.5" />
                      {room.adults} Adults
                      {room.children > 0 &&
                        ` + ${room.children} Child`}
                    </p>
                  </div>

                  <p className="text-right">
                    <span className="text-2xl font-display font-bold text-gradient-gold">
                      ₹{room.price}
                    </span>

                    <span className="block text-xs text-muted-foreground">
                      / night
                    </span>
                  </p>
                </div>

                <p className="mt-3 text-sm text-muted-foreground">
                  {room.description}
                </p>

                <ul className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  {[
                    room.feature1,
                    room.feature2,
                    room.feature3,
                    room.feature4,
                  ]
                    .filter(Boolean)
                    .map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-1.5"
                      >
                        <Check className="h-3.5 w-3.5 text-gold" />
                        {feature}
                      </li>
                    ))}
                </ul>

                <Link
                  to="/book"
                  className="mt-5 inline-block rounded-md gradient-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground shadow-soft"
                >
                  Book Now
                </Link>
              </div>
            </article>
          ))}
      </section>
    </SiteLayout>
  );
}

