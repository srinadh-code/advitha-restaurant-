import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionHeading } from "@/components/SectionHeading";
import API from "@/api/api";



interface Food {
  id: number;
  name: string;
  category: number;
  category_name: string;
  price: string;
  description: string;
  image_url: string;
}

export const Route = createFileRoute("/restaurant")({
  head: () => ({
    meta: [
      { title: "Restaurant — Mulugu Hotel" },
      {
        name: "description",
        content:
          "Multi-cuisine restaurant menu — Veg, Non Veg, Starters, Drinks, Ice Creams and Restaurant Specials.",
      },
    ],
  }),
  component: RestaurantPage,
});


interface Category {
  id: number;
  name: string;
}

function RestaurantPage() {
  const [tab, setTab] = useState("All");

  const [foods, setFoods] = useState<Food[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetchFoods();
  fetchCategories();
}, []);

  const fetchFoods = async () => {
    try {
      const response = await API.get("/api/food/foods/");
      setFoods(response.data);
    } catch (error) {
      console.error("Error fetching foods:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchCategories = async () => {
  try {
    const response = await API.get("/api/food/categories/");
    setCategories(response.data);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

 const items =
  tab === "All"
    ? foods
    : foods.filter(
        (food) =>
          food.category_name.toLowerCase() ===
          tab.toLowerCase()
      );

  const chefSpecials = foods.filter(
  (food) =>
    food.category_name === "Restaurant Specials"
);

  return (
    <SiteLayout>
     


      {/* Menu Section */}

      <section className="container mx-auto px-4 py-14">
        <SectionHeading
          eyebrow="The Menu"
          title="Browse By Category"
        />

        <div className="mt-8 flex flex-wrap justify-center gap-3">

  <button
    onClick={() => setTab("All")}
    className={`rounded-full px-5 py-3 font-medium transition-all ${
      tab === "All"
        ? "bg-amber-500 text-white"
        : "bg-white border border-gray-200 hover:bg-gray-50"
    }`}
  >
    All
  </button>

  {categories.map((category) => (
    <button
      key={category.id}
      onClick={() => setTab(category.name)}
      className={`rounded-full px-5 py-3 font-medium transition-all ${
        tab === category.name
          ? "bg-amber-500 text-white"
          : "bg-white border border-gray-200 hover:bg-gray-50"
      }`}
    >
      {category.name}
    </button>
  ))}

</div>

      

        {loading ? (
          <div className="text-center py-20">
            Loading Menu...
          </div>
        ) : (
          <div
            layout
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {items.map((food, i) => (
              <article
                key={food.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="overflow-hidden rounded-2xl bg-card border border-border shadow-soft hover:shadow-luxury transition"
              >
                <img
                  src={food.image_url}
                  alt={food.name}
                  className="h-52 w-full object-cover"
                />

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg font-bold leading-tight">
                      {food.name}
                    </h3>

                    <span className="text-lg font-display font-bold text-gold">
                      ₹{food.price}
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] uppercase tracking-widest text-gold font-semibold">
                    {food.category_name}
                  </p>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {food.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Chef Specials */}

      {chefSpecials.length > 0 && (
        <section className="bg-secondary/50 py-16">
          <div className="container mx-auto px-4">
            <SectionHeading
              eyebrow="Chef's Picks"
              title="Restaurant Specials"
            />

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {chefSpecials.map((food) => (
                <div
                  key={food.id}
                  className="overflow-hidden rounded-2xl bg-card border border-border shadow-soft"
                >
                  <img
                    src={food.image_url}
                    alt={food.name}
                    // className="h-56 w-full object-cover"
                    className="h-28 w-full object-cover"
                  />

                  <div className="p-5">
                    <h3 className="font-display text-xl font-bold">
                      {food.name}
                    </h3>

                    <p className="mt-2 text-muted-foreground">
                      {food.description}
                    </p>

                    <p className="mt-3 text-gold font-bold">
                      ₹{food.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}











