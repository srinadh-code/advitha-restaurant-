import { createFileRoute } from "@tanstack/react-router";
import birthdayImage from "@/assets/bi.webp";
import funnnImage from "@/assets/funnn.png";
import enjoyImg from "@/assets/enjoy.jpeg";
import settingImg from "@/assets/setting.avif";

// import engagementImg from "@/assets/engagement.jpeg";
// import anniversaryImg from "@/assets/anniversery.jpg";
// import getTogetherImg from "@/assets/get.jpg";
// import familyImg from "@/assets/family.jpg";
// import partyImg from "@/assets/party.webp";
import { SiteLayout } from "@/components/layout/SiteLayout";

import { useState, useEffect } from "react";
import API from "@/api/api";


export const Route = createFileRoute("/events")({
  component: EventsPage,
});

function EventsPage() {


const [formData, setFormData] = useState({
  name: "",
  phone: "",
  event_date: "",
  guests: "",
  category: "",
});
const [categories, setCategories] = useState<any[]>([]);
const [loading, setLoading] = useState(false);
useEffect(() => {
  fetchCategories();
}, []);

const fetchCategories = async () => {
  try {
    const response = await API.get(
      "/api/events/categories/"
    );

    setCategories(response.data);
  } catch (error) {
    console.error("Category load failed", error);
  }
};
const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  try {
    setLoading(true);

    await API.post(
      "/api/events/bookings/",
      {
        name: formData.name,
        phone: formData.phone,
        event_date: formData.event_date,
        guests: Number(formData.guests),
        category: Number(formData.category),
      }
    );

    alert("Event booked successfully!");

    setFormData({
      name: "",
      phone: "",
      event_date: "",
      guests: "",
      category: "",
    });



  } catch (error: any) {
  console.log("FULL ERROR:", error.response?.data);

  const backendError = error.response?.data;

  if (backendError?.error) {
    alert(backendError.error);
  } else {
    alert(JSON.stringify(backendError, null, 2));
  }

}finally {
    setLoading(false);
  }
};
  const packages = [
    { name: "Basic", price: "₹5,000" },
    { name: "Silver", price: "₹15,000" },
    { name: "Gold", price: "₹30,000" },
    { name: "Premium", price: "₹50,000" },
  ];

  const eventTypes = [
    "Birthday Party",
    "Engagement",
    "Anniversary",
    "Baby Shower",
    "Corporate Meeting",
  ];

  return (
  <SiteLayout>
    <div className="min-h-screen bg-[#f7f2e8]">
      {/* Hero */}
      {/* HERO SECTION */}
<section className="relative h-[85vh] overflow-hidden">

  <img
  src={funnnImage}
  alt="Events"
  className="absolute inset-0 h-full w-full object-cover"
/>

  <div className="absolute inset-0 bg-black/20" />

  <div className="relative z-10 flex h-full items-center justify-center">
    <div className="max-w-4xl text-center text-white">

      <p className="text-sm uppercase tracking-[0.4em] text-yellow-400">
        ADVITHA EVENTS
      </p>

      <h1 className="mt-6 font-display text-6xl font-bold leading-tight md:text-7xl">
        Celebrate Every
        <span className="block text-yellow-400">
          Special Moment
        </span>
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
        Premium Birthday Parties, Engagements,
        Family Gatherings, Corporate Meetings and
        Memorable Celebrations at Advitha Hotel.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">

        <button
  onClick={() => {
    document
      .getElementById("booking")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }}
  className="rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-4 font-semibold text-white shadow-xl"
>
  Book Event
</button>

        <button
  onClick={() => {
    document
      .getElementById("plans")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }}
  className="rounded-xl border border-white/30 bg-white/10 px-8 py-4 font-semibold backdrop-blur"
>
  View Plans
</button>

      </div>

    </div>
  </div>

</section>

  
{/* EVENT TYPES */}
<section id="plans" className="container mx-auto px-4 py-24">
  <div className="text-center">
    <h2 className="font-display text-5xl font-bold">
      Event Categories
    </h2>

    <p className="mt-4 text-muted-foreground">
      Beautifully crafted celebrations for every occasion
    </p>
  </div>

  <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

    {categories.map((event) => (
      <div
        key={event.id}
        className="group overflow-hidden rounded-3xl bg-white shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
      >
        <div className="overflow-hidden">
          <img
            src={`http://127.0.0.1:8000${event.image}`}
            alt={event.title}
            className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
          />
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold text-[#2D1B0F]">
            {event.title}
          </h3>

          <p className="mt-2 text-lg font-semibold text-yellow-600">
            Starting ₹{event.starting_price}
          </p>

          <p className="mt-3 text-sm text-muted-foreground">
            {event.description}
          </p>

          <button className="mt-5 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 px-5 py-2 text-sm font-semibold text-white">
            Explore Package
          </button>
        </div>
      </div>
    ))}

  </div>
</section>

      {/* Packages
      <section id="packages" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center text-4xl font-bold">
            Event Packages
          </h2>

          <div className="grid gap-6 md:grid-cols-4">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className="rounded-2xl border p-6 text-center shadow"
              >
                <h3 className="text-2xl font-bold">
                  {pkg.name}
                </h3>

                <p className="mt-4 text-3xl text-yellow-600">
                  {pkg.price}
                </p>

                <button className="mt-6 rounded-lg bg-yellow-500 px-6 py-2 text-white">
                  Select
                </button>
              </div>
            ))}
          </div>
        </div>
      </section> */}

     {/* Our Beautiful Ambience */}
<section className="container mx-auto px-4 py-20">

  <div className="mb-12 text-center">
    <h2 className="font-display text-5xl font-bold text-gold">
      Our Beautiful Ambience
    </h2>

    <p className="mt-4 text-lg text-muted-foreground">
      Elegant spaces crafted for unforgettable celebrations,
      family gatherings and special occasions.
    </p>
  </div>

  <div className="grid gap-6 md:grid-cols-3">
  <img
  src={settingImg}
  alt="Luxury Event Setup"
  className="h-72 w-full rounded-2xl object-cover shadow-lg transition duration-300 hover:scale-105"
/>

<img
  src={enjoyImg}
  alt="Friends Celebration"
  className="h-72 w-full rounded-2xl object-cover shadow-lg transition duration-300 hover:scale-105"
/>

<img
  src={birthdayImage}
  alt="Birthday Celebration"
  className="h-72 w-full rounded-2xl object-cover shadow-lg transition duration-300 hover:scale-105"
/>
</div>
      </section>

      {/* Booking Form */}
      <section id="booking" className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-8 text-center text-4xl font-bold">
            Book Your Event
          </h2>

          <form
  onSubmit={handleSubmit}
  className="space-y-4"
>
  <input
    type="text"
    placeholder="Name"
    value={formData.name}
    onChange={(e) =>
      setFormData({
        ...formData,
        name: e.target.value,
      })
    }
    className="w-full rounded-lg border p-3"
  />

  <input
    type="text"
    placeholder="Phone"
    value={formData.phone}
    onChange={(e) =>
      setFormData({
        ...formData,
        phone: e.target.value,
      })
    }
    className="w-full rounded-lg border p-3"
  />

  <input
    type="date"
    value={formData.event_date}
    onChange={(e) =>
      setFormData({
        ...formData,
        event_date: e.target.value,
      })
    }
    className="w-full rounded-lg border p-3"
  />

  <input
    type="number"
    placeholder="Guests"
    value={formData.guests}
    onChange={(e) =>
      setFormData({
        ...formData,
        guests: e.target.value,
      })
    }
    className="w-full rounded-lg border p-3"
  />

  <select
  value={formData.category}
  onChange={(e) =>
    setFormData({
      ...formData,
      category: e.target.value,
    })
  }
  className="w-full rounded-lg border p-3"
>
  <option value="">Select Event</option>

  {categories.map((cat) => (
    <option key={cat.id} value={cat.id}>
      {cat.title}
    </option>
  ))}
</select>

  <button
    type="submit"
    disabled={loading}
    className="w-full rounded-lg bg-yellow-500 py-3 text-white"
  >
    {loading
      ? "Submitting..."
      : "Submit Booking"}
  </button>
</form>
        </div>
      </section>
        </div>
  </SiteLayout>
);}