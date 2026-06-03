// import { createFileRoute } from "@tanstack/react-router";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { SiteLayout } from "@/components/layout/SiteLayout";
// import { SectionHeading } from "@/components/SectionHeading";
// import { FOODS, GALLERY } from "@/lib/mockData";

// const TABS = ["All", "Veg", "Non Veg", "Starters", "Drinks", "Ice Creams", "Restaurant Specials"] as const;

// export const Route = createFileRoute("/restaurant")({
//   head: () => ({ meta: [
//     { title: "Restaurant — Mulugu Hotel" },
//     { name: "description", content: "Multi-cuisine restaurant menu — Veg, Non Veg, Starters, Drinks, Ice Creams and Chef's Specials." },
//     { property: "og:title", content: "Mulugu Restaurant Menu" },
//     { property: "og:description", content: "Multi-cuisine family restaurant in Mulugu, Telangana." },
//   ]}),
//   component: RestaurantPage,
// });

// function RestaurantPage() {
//   const [tab, setTab] = useState<(typeof TABS)[number]>("All");
//   const items = tab === "All" ? FOODS : FOODS.filter((f) => f.category === tab);

//   return (
//     <SiteLayout>
//       <section className="relative h-[42vh] min-h-[320px] overflow-hidden">
//         <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80" alt="Restaurant" className="absolute inset-0 h-full w-full object-cover" />
//         <div className="absolute inset-0 bg-black/55" />
//         <div className="relative z-10 container mx-auto h-full flex flex-col items-center justify-center px-4 text-center text-white">
//           <p className="text-xs uppercase tracking-[0.4em] text-gold">Our Restaurant</p>
//           <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold">A feast for every guest</h1>
//         </div>
//       </section>

//       <section className="container mx-auto px-4 py-14">
//         <SectionHeading eyebrow="The Menu" title="Browse by Category" />
//         <div className="mt-8 flex flex-wrap justify-center gap-2">
//           {TABS.map((t) => (
//             <button key={t} onClick={() => setTab(t)}
//               className={`rounded-full px-4 py-2 text-sm font-medium transition border ${tab === t ? "gradient-gold text-gold-foreground border-transparent shadow-soft" : "bg-card border-border hover:bg-secondary"}`}>
//               {t}
//             </button>
//           ))}
//         </div>

//         <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {items.map((f, i) => (
//             <motion.article key={f.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
//               className="overflow-hidden rounded-2xl bg-card border border-border shadow-soft hover:shadow-luxury transition">
//               <img src={f.image} alt={f.name} className="h-44 w-full object-cover" />
//               <div className="p-5">
//                 <div className="flex items-start justify-between gap-3">
//                   <h3 className="font-display text-lg font-bold leading-tight">{f.name}</h3>
//                   <span className="text-lg font-display font-bold text-gradient-gold">₹{f.price}</span>
//                 </div>
//                 <p className="mt-1 text-[11px] uppercase tracking-widest text-gold font-semibold">{f.category}</p>
//                 <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
//               </div>
//             </motion.article>
//           ))}
//         </motion.div>
//       </section>

//       <section className="bg-secondary/50 py-16">
//         <div className="container mx-auto px-4">
//           <SectionHeading eyebrow="Chef's Picks" title="Chef Specials" />
//           <div className="mt-10 grid gap-6 md:grid-cols-3">
//             {FOODS.filter((f) => f.category === "Restaurant Specials").map((f) => (
//               <div key={f.id} className="overflow-hidden rounded-2xl bg-card border border-border shadow-soft">
//                 <img src={f.image} alt={f.name} className="h-48 w-full object-cover" />
//                 <div className="p-5">
//                   <h3 className="font-display text-xl font-bold">{f.name}</h3>
//                   <p className="mt-1 text-sm text-muted-foreground">{f.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="container mx-auto px-4 py-16">
//         <SectionHeading eyebrow="Inside" title="Restaurant Gallery" />
//         <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
//           {GALLERY.Restaurant.map((src) => (
//             <img key={src} src={src} alt="Restaurant" className="h-56 w-full rounded-2xl object-cover shadow-soft hover:scale-[1.02] transition" />
//           ))}
//         </div>
//       </section>
//     </SiteLayout>
//   );
// }


import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { GALLERY } from "@/lib/mockData";

const TABS = [
  "All",
  "Veg",
  "Non Veg",
  "Starters",
  "Drinks",
  "Ice Creams",
] as const;



type Food = {
  id: number;
  name: string;
  category: string;
  price: string;
  image_url: string;
  description: string;
};

export const Route = createFileRoute("/restaurant")({
  head: () => ({
    meta: [
      { title: "Restaurant — Mulugu Hotel" },
      {
        name: "description",
        content:
          "Multi-cuisine restaurant menu — Veg, Non Veg, Starters, Drinks, Ice Creams and Chef's Specials.",
      },
      { property: "og:title", content: "Mulugu Restaurant Menu" },
      {
        property: "og:description",
        content: "Multi-cuisine family restaurant in Mulugu, Telangana.",
      },
    ],
  }),
  component: RestaurantPage,
});

function RestaurantPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const [items, setItems] = useState<Food[]>([]);
  const [chefSpecials, setChefSpecials] = useState<Food[]>([]);
  const [loading, setLoading] = useState(false);



  const fetchFoods = async () => {
  try {
    setLoading(true);

    const url =
      tab === "All"
        ? "http://127.0.0.1:8000/api/foods/"
        : `http://127.0.0.1:8000/api/foods/?category=${encodeURIComponent(
            tab
          )}`;

    const response = await fetch(url);
    const data = await response.json();

    if (tab === "All") {
      setItems(
        data.filter(
          (item: Food) =>
            item.category !== "Restaurant Specials"
        )
      );
    } else {
      setItems(data);
    }
  } catch (error) {
    console.error("Error fetching foods:", error);
  } finally {
    setLoading(false);
  }
};
const fetchChefSpecials = async () => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/foods/?category=Restaurant%20Specials"
    );

    const data = await response.json();
    setChefSpecials(data);
  } catch (error) {
    console.error("Error fetching chef specials:", error);
  }
};

useEffect(() => {
  fetchFoods();
  fetchChefSpecials();
}, [tab]);

  return (
    <SiteLayout>
      <section className="relative h-[42vh] min-h-[320px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80"
          alt="Restaurant"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 container mx-auto h-full flex flex-col items-center justify-center px-4 text-center text-white">
          <p className="text-xs uppercase tracking-[0.4em] text-gold">
            Our Restaurant
          </p>

          <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold">
            A feast for every guest
          </h1>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14">
        <SectionHeading eyebrow="The Menu" title="Browse by Category" />

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition border ${
                tab === t
                  ? "gradient-gold text-gold-foreground border-transparent shadow-soft"
                  : "bg-card border-border hover:bg-secondary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {items.length === 0 ? (
    <div className="col-span-full text-center py-10">
      <p className="text-lg text-muted-foreground">
        No foods available in this category.
      </p>
    </div>
  ) : (
    items.map((f, i) => (
      <motion.article
        key={f.id}
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.04 }}
        className="overflow-hidden rounded-2xl bg-card border border-border shadow-soft hover:shadow-luxury transition"
      >
        <img
  src={f.image_url}
  alt={f.name}
  className="w-full aspect-[4/3] object-cover"
/>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg font-bold leading-tight">
              {f.name}
            </h3>

            <span className="text-lg font-display font-bold text-gradient-gold">
              ₹{f.price}
            </span>
          </div>

          <p className="mt-1 text-[11px] uppercase tracking-widest text-gold font-semibold">
            {f.category}
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            {f.description}
          </p>
        </div>
      </motion.article>
    ))
  )}
</motion.div>
      </section>

      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto px-4">
          <SectionHeading eyebrow="Chef's Picks" title="Chef Specials" />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {chefSpecials.map((f) => (
              <div
                key={f.id}
                className="overflow-hidden rounded-2xl bg-card border border-border shadow-soft"
                >
                  <img
                    src={f.image_url}
                    alt={f.name}
                    className="h-48 w-full object-cover"
                  />

                  <div className="p-5">
                    <h3 className="font-display text-xl font-bold">
                      {f.name}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {f.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <SectionHeading eyebrow="Inside" title="Restaurant Gallery" />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {GALLERY.Restaurant.map((src) => (
            <img
              key={src}
              src={src}
              alt="Restaurant"
              className="h-56 w-full rounded-2xl object-cover shadow-soft hover:scale-[1.02] transition"
            />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}


