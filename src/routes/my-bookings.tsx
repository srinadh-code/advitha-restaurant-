// import { createFileRoute } from '@tanstack/react-router'

// export const Route = createFileRoute('/my-bookings')({
//   component: RouteComponent,
// })

// function RouteComponent() {
//   return <div>Hello "/my-bookings"!</div>
// }



import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionHeading } from "@/components/SectionHeading";

export const Route = createFileRoute("/my-bookings")({
  component: MyBookingsPage,
});

interface Booking {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  room: number;
  room_name: string;
  check_in: string;
  check_out: string;
  guests: number;
  status: string;
  created_at: string;
}

function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const token = localStorage.getItem("access");

    if (!token) {
      toast.error("Please login first.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/bookings/my/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        toast.error(data.message || "Unable to load bookings.");
        return;
      }

      setBookings(data);
    } catch (error) {
      console.error(error);
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id: number) => {
    if (!confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    const token = localStorage.getItem("access");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/bookings/cancel/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Booking cancelled");
        fetchBookings();
      } else {
        toast.error(data.message || "Unable to cancel booking.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error");
    }
  };

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-14">

        <SectionHeading
          eyebrow="Bookings"
          title="My Booking History"
          sub="View and manage your hotel bookings."
        />

        {loading ? (
          <div className="mt-10 text-center">
            Loading bookings...
          </div>
        ) : bookings.length === 0 ? (
          <div className="mt-10 rounded-xl border border-border bg-card p-10 text-center">
            <h2 className="text-xl font-semibold">
              No Bookings Found
            </h2>

            <p className="mt-2 text-muted-foreground">
              You haven't booked any rooms yet.
            </p>
          </div>
        ) : (
          <div className="mt-10 overflow-x-auto rounded-xl border border-border bg-card">

            <table className="w-full">

              <thead className="bg-secondary">
                <tr>
                  <th className="p-3 text-left">Room</th>
                  <th className="p-3 text-left">Check-In</th>
                  <th className="p-3 text-left">Check-Out</th>
                  <th className="p-3 text-left">Guests</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Booked On</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-t border-border"
                  >
                    <td className="p-3 font-medium">
                      {booking.room_name}
                    </td>

                    <td className="p-3">
                      {booking.check_in}
                    </td>

                    <td className="p-3">
                      {booking.check_out}
                    </td>

                    <td className="p-3">
                      {booking.guests}
                    </td>

                    <td className="p-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold
                        ${
                          booking.status === "booked"
                            ? "bg-blue-100 text-blue-700"
                            : booking.status === "checked_in"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "checked_out"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {booking.status.replace("_", " ")}
                      </span>
                    </td>

                    <td className="p-3">
                      {new Date(
                        booking.created_at
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-3 text-center">
                      {booking.status === "booked" ? (
                        <button
                          onClick={() =>
                            cancelBooking(booking.id)
                          }
                          className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                        >
                          Cancel
                        </button>
                      ) : (
                        <span className="text-gray-500">
                          —
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}
      </section>
    </SiteLayout>
  );
}