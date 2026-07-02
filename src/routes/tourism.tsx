

// import { createFileRoute } from "@tanstack/react-router";
// import { useEffect, useState } from "react";
// import { SiteLayout } from "@/components/layout/SiteLayout";
// import { SectionHeading } from "@/components/SectionHeading";
// import { Clock, MapPin } from "lucide-react";
// import API from "@/api/api";

// const CATS = [
//   "All",
//   "Temples",
//   "Waterfalls",
//   "Historical Places",
//   "Parks",
//   // "Adventure Spots",
//   // "View Points",
// ] as const;

// interface TourismPlace {
//   id: number;
//   name: string;
//   category: string;
//   description: string;
//   image: string;
//   image_url: string; 
//   distance: string;
//   hours: string;
//   latitude: number | null;
//   longitude: number | null;
// }

// export const Route = createFileRoute("/tourism")({
//   head: () => ({
//     meta: [
//       {
//         title: "Tourism near Mulugu — Temples, Waterfalls & More",
//       },
//       {
//         name: "description",
//         content:
//           "Explore temples, waterfalls, historical places and forests near Mulugu Hotel.",
//       },
//       {
//         property: "og:title",
//         content: "Tourism near Mulugu Hotel",
//       },
//       {
//         property: "og:description",
//         content:
//           "Top temples, waterfalls and forests near the hotel.",
//       },
//     ],
//   }),
//   component: TourismPage,
// });

// function TourismPage() {
//   const [cat, setCat] =
//     useState<(typeof CATS)[number]>("All");

//   const [places, setPlaces] = useState<TourismPlace[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchPlaces();
//   }, []);

//   const fetchPlaces = async () => {
//     try {
//       const response = await API.get(
//         "/api/tourism/places/"
//       );

//       setPlaces(response.data);
//     } catch (error) {
//       console.error("Failed to fetch tourism places", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredPlaces =
//     cat === "All"
//       ? places
//       : places.filter(
//           (place) => place.category === cat
//         );

//   return (
//     <SiteLayout>
//       <section className="container mx-auto px-4 pt-14 pb-8">
//         <SectionHeading
//           eyebrow="Explore"
//           title="Tourism Places Near Us"
//           sub="From sacred temples to thundering waterfalls — Mulugu is a gateway."
//         />

//         <div className="mt-8 flex flex-wrap justify-center gap-2">
//           {CATS.map((c) => (
//             <button
//               key={c}
//               onClick={() => setCat(c)}
//               className={`rounded-full px-4 py-2 text-sm font-medium transition border ${
//                 cat === c
//                   ? "gradient-gold text-gold-foreground border-transparent shadow-soft"
//                   : "bg-card border-border hover:bg-secondary"
//               }`}
//             >
//               {c}
//             </button>
//           ))}
//         </div>
//       </section>

//       <section className="container mx-auto px-4 pb-20">
//         {loading ? (
//           <div className="text-center py-10">
//             Loading tourism places...
//           </div>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {filteredPlaces.map((t) => (
//               <article
//                 key={t.id}
//                 className="overflow-hidden rounded-2xl bg-card border border-border shadow-soft hover:shadow-luxury transition"
//               >
//                 <div className="h-52 overflow-hidden">
//                   <img
//                     src={t.image_url}
//                     alt={t.name}
//                     className="h-full w-full object-cover hover:scale-105 transition"
//                   />
//                 </div>

//                 <div className="p-5">
//                   <span className="text-[10px] uppercase tracking-widest text-gold font-semibold">
//                     {t.category}
//                   </span>

//                   <h3 className="font-display text-xl font-bold">
//                     {t.name}
//                   </h3>

//                   <p className="mt-2 text-sm text-muted-foreground">
//                     {t.description}
//                   </p>

//                   <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
//                     <span className="flex items-center gap-1">
//                       <MapPin className="h-3.5 w-3.5 text-gold" />
//                       {t.distance}
//                     </span>

//                     <span className="flex items-center gap-1">
//                       <Clock className="h-3.5 w-3.5 text-gold" />
//                       {t.hours}
//                     </span>
//                   </div>
//                   <button
//   onClick={() => {
//     if (t.latitude && t.longitude) {
//       window.open(
//         `https://www.google.com/maps/dir/?api=1&destination=${t.latitude},${t.longitude}`,
//         "_blank"
//       );
//     } else {
//       alert("Location coordinates not available");
//     }
//   }}
//   className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
// >
//   Get Directions
// </button>
//                 </div>
//               </article>
//             ))}
//           </div>
//         )}
//       </section>
//     </SiteLayout>
//   );
// }

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { Clock, MapPin } from "lucide-react";
import API from "@/api/api";

const CATS = [
  "All",
  "Temples",
  "Waterfalls",
  "Historical Places",
  "Parks",
] as const;

interface TourismPlace {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  image_url: string; 
  distance: string;
  hours: string;
  latitude: number | null;
  longitude: number | null;
}

export const Route = createFileRoute("/tourism")({
  head: () => ({
    meta: [
      {
        title: "Tourism near Mulugu — Temples, Waterfalls & More",
      },
      {
        name: "description",
        content:
          "Explore temples, waterfalls, historical places and forests near Mulugu Hotel.",
      },
      {
        property: "og:title",
        content: "Tourism near Mulugu Hotel",
      },
      {
        property: "og:description",
        content:
          "Top temples, waterfalls and forests near the hotel.",
      },
    ],
  }),
  component: TourismPage,
});

function TourismPage() {
  const [cat, setCat] =
    useState<(typeof CATS)[number]>("All");

  const [places, setPlaces] = useState<TourismPlace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const response = await API.get(
        "/api/tourism/places/"
      );

      setPlaces(response.data);
    } catch (error) {
      console.error("Failed to fetch tourism places", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPlaces =
    cat === "All"
      ? places
      : places.filter(
          (place) => place.category === cat
        );

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 pt-14 pb-8">
        <SectionHeading
          eyebrow="Explore"
          title="Tourism Places Near Us"
          sub="From sacred temples to thundering waterfalls — Mulugu is a gateway."
        />

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition border ${
                cat === c
                  ? "gradient-gold text-gold-foreground border-transparent shadow-soft"
                  : "bg-card border-border hover:bg-secondary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        {loading ? (
          <div className="text-center py-10">
            Loading tourism places...
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPlaces.map((t) => (
              <article
                key={t.id}
                className="overflow-hidden rounded-2xl bg-card border border-border shadow-soft hover:shadow-luxury transition"
              >
                <div className="h-52 overflow-hidden">
                  <img
                    src={t.image_url}
                    alt={t.name}
                    className="h-full w-full object-cover hover:scale-105 transition"
                  />
                </div>

                <div className="p-5">
                  <span className="text-[10px] uppercase tracking-widest text-gold font-semibold">
                    {t.category}
                  </span>

                  <h3 className="font-display text-xl font-bold">
                    {t.name}
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {t.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-gold" />
                      {t.distance}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-gold" />
                      {t.hours}
                    </span>
                  </div>

<button
  disabled={t.latitude === null || t.longitude === null}
  title={
    t.latitude === null || t.longitude === null
      ? "Location not available"
      : ""
  }
  onClick={() => {
    if (t.latitude !== null && t.longitude !== null) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${t.latitude},${t.longitude}`,
        "_blank"
      );
    }
  }}
  className={`mt-4 w-full rounded-lg px-4 py-2 text-white ${
    t.latitude !== null && t.longitude !== null
      ? "bg-blue-600 hover:bg-blue-700"
      : "bg-gray-400 cursor-not-allowed"
  }`}
>
  Get Directions
</button>

                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}