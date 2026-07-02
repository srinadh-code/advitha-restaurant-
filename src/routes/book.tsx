
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { CheckCircle2, X } from "lucide-react";
import API from "@/api/api";


const schema = z
  .object({
    name: z.string().trim().min(2).max(80),
    email: z.string().trim().email().max(120),
    phone: z.string().trim().min(7).max(20),
    roomType: z.string().min(1, "Please select a room"),
    checkIn: z.string().min(1),
    checkOut: z.string().min(1),
    guests: z.number().min(1).max(10),
  })
  .refine(
    (data) => data.checkOut > data.checkIn,
    {
      message: "Check-out must be after check-in",
      path: ["checkOut"],
    }
  );

const initial = {
  name: "",
  email: "",
  phone: "",
  roomType: "",
  checkIn: "",
  checkOut: "",
  guests: 1,
};

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      {
        title: "Book Now — Mulugu Hotel & Restaurant",
      },
      {
        name: "description",
        content:
          "Reserve your stay at Mulugu Hotel & Restaurant.",
      },
      {
        property: "og:title",
        content: "Book Your Stay",
      },
      {
        property: "og:description",
        content: "Reserve a room online.",
      },
    ],
  }),
  component: BookPage,
});
interface Room {
  id: number;
  title: string;
  price: number;
}
function BookPage() {
  const [form, setForm] = useState(initial);
  const [rooms, setRooms] = useState<Room[]>([]);

  const [confirm, setConfirm] =
    useState<typeof initial | null>(null);

useEffect(() => {
  const fetchRooms = async () => {
    try {
      const response = await API.get("/api/rooms/");
      setRooms(response.data);
    } catch {
      toast.error("Failed to load rooms.");
    }
  };

  fetchRooms();
}, []);

  const submit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    const token = localStorage.getItem("access");

  if (!token) {
    toast.error("Please login to book a room.");
    return;
  }

    const res = schema.safeParse(form);

    if (!res.success) {
      toast.error(
        res.error.issues[0].message
      );
      return;
    }


const bookingData = {
  full_name: form.name,
  email: form.email,
  phone: form.phone,
  room: Number(form.roomType),
  check_in: form.checkIn,
  check_out: form.checkOut,
  guests: form.guests,
};


try {
  const response = await API.post(
    "/api/bookings/",
    bookingData
  );

  toast.success("Booking Submitted Successfully");

  setConfirm(form);
  setForm(initial);


} catch (error: any) {

  if (error.response?.status === 401) {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    toast.error("Your session has expired. Please login again.");
    return;
  }

  toast.error(
    error.response?.data?.message ||
    Object.values(error.response?.data || {})
      .flat()
      .join(", ") ||
    "Booking Failed"
  );
}
};


  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-14">
        <SectionHeading
          eyebrow="Reserve"
          title="Book Your Stay"
          sub="A few details and your luxury stay is confirmed."
        />

        <form
          onSubmit={submit}
          className="mx-auto mt-10 max-w-3xl rounded-2xl bg-card border border-border p-6 shadow-soft grid gap-4 md:grid-cols-2"
        >
          <Field label="Full Name">
            <input
              className={inp}
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
          </Field>

          <Field label="Email">
            <input
              type="email"
              className={inp}
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />
          </Field>

          <Field label="Phone Number">
            <input
              className={inp}
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
            />
          </Field>

          <Field label="Room Type">
            <select
              className={inp}
              value={form.roomType}
              onChange={(e) =>
                setForm({
                  ...form,
                  roomType:
                    e.target.value,
                })
              }
            >
              <option value="">
                Select Room
              </option>

              {rooms.map((room) => (
  <option
    key={room.id}
    value={room.id}
  >
    {room.title} — ₹{room.price}/night
  </option>
))}
            </select>
          </Field>

          <Field label="Check-In Date">
  <input
    type="date"
    className={inp}
    min={new Date().toISOString().split("T")[0]}
    value={form.checkIn}
    onChange={(e) =>
      setForm({
        ...form,
        checkIn: e.target.value,
      })
    }
  />
</Field>

          <Field label="Check-Out Date">
            <input
              type="date"
              className={inp}
              value={form.checkOut}
              onChange={(e) =>
                setForm({
                  ...form,
                  checkOut:
                    e.target.value,
                })
              }
            />
          </Field>

          <Field label="Number of Guests">
            <input
              type="number"
              min={1}
              max={10}
              className={inp}
              value={form.guests}
              onChange={(e) =>
                setForm({
                  ...form,
                  guests: Number(
                    e.target.value
                  ),
                })
              }
            />
          </Field>

          <div className="md:col-span-2 mt-2 flex gap-3">
            <button
              type="submit"
              className="rounded-md gradient-gold px-6 py-2.5 text-sm font-semibold text-gold-foreground shadow-soft"
            >
              Submit Booking
            </button>

            <button
              type="button"
              onClick={() =>
                setForm(initial)
              }
              className="rounded-md border border-border px-6 py-2.5 text-sm font-semibold hover:bg-secondary"
            >
              Reset
            </button>
          </div>
        </form>
      </section>

      {confirm && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-black/60 p-4"
          onClick={() =>
            setConfirm(null)
          }
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-card border border-border p-6 shadow-luxury"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              onClick={() =>
                setConfirm(null)
              }
              className="absolute top-3 right-3 text-muted-foreground"
            >
              <X />
            </button>

            <CheckCircle2 className="h-12 w-12 text-gold" />

            <h3 className="mt-3 font-display text-2xl font-bold">
              Booking Confirmed!
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Thank you {confirm.name},
              your booking has been
              submitted successfully.
            </p>

            <button
              onClick={() => {
                setConfirm(null);
                toast.success(
                  "Booking saved"
                );
              }}
              className="mt-5 w-full rounded-md gradient-gold py-2.5 text-sm font-semibold text-gold-foreground"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}

const inp =
  "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}