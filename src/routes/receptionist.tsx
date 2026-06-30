import API from "@/api/api";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getBookings } from "@/api/api";
import axios from "axios";
import {
  LayoutDashboard,
  CalendarCheck,
  UtensilsCrossed,
  LogIn,
  LogOut,
  Bed,
  Users,
  MessageSquare,
} from "lucide-react";

import { useAuth } from "@/lib/auth";
import {
  DashboardShell,
  StatCard,
  DataTable,
  type SidebarItem,
} from "@/components/DashboardShell";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/receptionist")({
  head: () => ({
    meta: [
      {
        title: "Receptionist Dashboard — Mulugu Hotel",
      },
      {
        name: "description",
        content: "Front Desk Management Dashboard",
      },
    ],
  }),
  component: () => (
    <>
      <RecepGuard />
      <Toaster />
    </>
  ),
});


const items: SidebarItem[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },

  { key: "bookings", label: "Room Bookings", icon: CalendarCheck },

  { key: "check-in", label: "Check-In", icon: LogIn },

  { key: "check-out", label: "Check-Out", icon: LogOut },

  { key: "available-rooms", label: "Available Rooms", icon: Bed },

  { key: "customers", label: "Customers", icon: Users },
  {
  key: "event-bookings",
  label: "Event Bookings",
  icon: CalendarCheck,
},

  {
    key: "restaurant-reservations",
    label: "Restaurant Reservations",
    icon: UtensilsCrossed,
  },

  {
    key: "contact-enquiries",
    label: "Contact Enquiries",
    icon: MessageSquare,
  },
];







function RecepGuard() {

  const { user, authLoading } = useAuth();
  if (authLoading) {
  return (
    <div className="flex h-screen items-center justify-center">
      Loading...
    </div>
  );
}

  if (!user) return <Navigate to="/login" />;

  if (
    user.role !== "receptionist" &&
    user.role !== "admin"
  ) {
    return <Navigate to="/" />;
  }

  return <Inner />;
}

function Inner() {
  const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("all");
const [selectedBooking, setSelectedBooking] =
  useState<any>(null);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [active, setActive] = useState("dashboard");
  const [bookings, setBookings] = useState<any[]>([]);




const [replyForm, setReplyForm] = useState({
  subject: "",
  message: "",
});
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);
  const [checkIns, setCheckIns] = useState<any[]>([]);
  const [checkOuts, setCheckOuts] = useState<any[]>([]);

  const [eventBookings, setEventBookings] = useState<any[]>([]);





const fetchCheckIns = async () => {
  try {
  
    const res = await API.get("api/bookings/check-in/");

    setCheckIns(res.data);
  } catch (error) {
    console.error("Error fetching check-ins:", error);
  }
};
const fetchEventBookings = async () => {
  try {
    const response = await API.get(
      "/api/events/bookings/"
    );

    console.log(response.data); // debug
    setEventBookings(response.data);
  } catch (error) {
    console.error("Error loading event bookings:", error);
  }
};
const confirmEventBooking = async (id: number) => {
  try {
    await API.patch(`/api/events/bookings/${id}/`);
    fetchEventBookings(); // refresh table
  } catch (error) {
    console.error("Error confirming booking:", error);
  }
};

const handleCheckIn = async (id: number) => {
  try {
  
    await API.patch(`/api/bookings/checkin/${id}/`);

    localStorage.setItem(
      "dashboard_refresh",
      Date.now().toString()
    );

    fetchCheckIns();
    await fetchBookings();
  } catch (error) {
    console.error(error);
  }
};





useEffect(() => {
  fetchBookings();
  fetchEnquiries();
  fetchCheckIns();
  fetchCheckOuts();
  fetchEventBookings();

  

  const interval = setInterval(() => {
    fetchBookings();
    fetchCheckIns();
    fetchCheckOuts();
  }, 3000); // every 3 sec

  return () => clearInterval(interval);
}, []);
const replyToCustomer = async (
  enquiryId: number,
  subject: string,
  message: string
) => {
  try {
    const response = await API.post(
  `/api/contact/reply/${enquiryId}/`,
  {
    subject,
    message,
  }
);

const data = response.data;

    // alert(data.message);

    fetchEnquiries();
  } catch (error) {
    console.error(error);
  }
};


const fetchEnquiries = async () => {
  try {
    const response = await API.get("/api/contact/enquiries/");
    console.log("ENQUIRIES:", response.data);
    setEnquiries(response.data);
  } catch (error) {
    console.error(error);
  }
};






const fetchCheckOuts = async () => {
  try {
    const res = await axios.get(
      "http://127.0.0.1:8000/api/bookings/check-out/"
    );

    setCheckOuts(res.data);
  } catch (error) {
    console.error(error);
  }
};

const handleCheckOut = async (id: number) => {
  try {
    // await axios.patch(
    //   `http://127.0.0.1:8000/api/bookings/checkout/${id}/`
    // );
    await API.patch(`/api/bookings/checkout/${id}/`);

    localStorage.setItem(
      "dashboard_refresh",
      Date.now().toString()
    );

    fetchCheckOuts();
    await fetchBookings();
  } catch (error) {
    console.error(error);
  }
};

const fetchBookings = async () => {
  try {
    const data = await getBookings();
    setBookings(data);
  } catch (error) {
    console.error("Error loading bookings:", error);
  } finally {
    setLoading(false);
  }
};



const handleViewBooking = (booking: any) => {
  setSelectedBooking(booking);
};

const filteredBookings = bookings.filter((booking) => {
  const searchTerm = search.trim().toLowerCase();

  const matchesSearch =
    !searchTerm ||
    booking.full_name?.toLowerCase().includes(searchTerm) ||
    String(booking.phone).includes(searchTerm) ||
    String(booking.room_name || "")
      .toLowerCase()
      .includes(searchTerm);

  const matchesStatus =
    statusFilter === "all" ||
    booking.status === statusFilter;

  return matchesSearch && matchesStatus;
});

  return (
    <DashboardShell
      title="Front Desk"
      items={items}
      active={active}
      onChange={setActive}
    >
      {/* Dashboard */}

      {active === "dashboard" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard label="Today's Check-Ins" value={8} />
          <StatCard label="Today's Check-Outs" value={5} />
          <StatCard label="Occupied Rooms" value={18} />
          <StatCard label="Available Rooms" value={12} />
          <StatCard label="Active Bookings" value={4} />
          <StatCard label="Restaurant Reservations" value={9} />
        </div>
      )}



{/* Room Bookings */}
{active === "bookings" && (
  <>
    {/* Header */}
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      <h2 className="text-2xl font-bold">Room Bookings</h2>

     <button
  onClick={() =>
    alert(
      "Walk-in booking feature is not implemented yet."
    )
  }
  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
>
  + New Booking
</button>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-gray-500">Total Bookings</p>
        <h2 className="text-2xl font-bold">
          {bookings.length}
        </h2>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-gray-500">Booked</p>
        <h2 className="text-2xl font-bold text-blue-600">
          {
            bookings.filter(
              (b) => b.status === "booked"
            ).length
          }
        </h2>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-gray-500">Checked In</p>
        <h2 className="text-2xl font-bold text-green-600">
          {
            bookings.filter(
              (b) => b.status === "checked_in"
            ).length
          }
        </h2>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-gray-500">Checked Out</p>
        <h2 className="text-2xl font-bold text-gray-600">
          {
            bookings.filter(
              (b) => b.status === "checked_out"
            ).length
          }
        </h2>
      </div>
    </div>

    {/* Search + Filters */}
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <input
          type="text"
          placeholder="Search by Guest, Phone or Booking ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full md:w-96"
        />

        <div className="flex flex-wrap gap-2">
          {[
            { label: "All", value: "all" },
            { label: "Booked", value: "booked" },
            {
              label: "Checked In",
              value: "checked_in",
            },
            {
              label: "Checked Out",
              value: "checked_out",
            },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() =>
                setStatusFilter(filter.value)
              }
              className={`px-3 py-2 rounded-lg text-sm ${
                statusFilter === filter.value
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
    {selectedBooking && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">

      <h2 className="text-xl font-bold mb-4">
        Booking Details
      </h2>

      <div className="space-y-2">
        <p>
          <strong>Guest:</strong>{" "}
          {selectedBooking.full_name}
        </p>

        <p>
          <strong>Phone:</strong>{" "}
          {selectedBooking.phone}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {selectedBooking.email}
        </p>

        <p>
          <strong>Room:</strong>{" "}
          {selectedBooking.room_name}
        </p>

        <p>
          <strong>Check In:</strong>{" "}
          {selectedBooking.check_in}
        </p>

        <p>
          <strong>Check Out:</strong>{" "}
          {selectedBooking.check_out}
        </p>

        <p>
          <strong>Guests:</strong>{" "}
          {selectedBooking.guests}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {selectedBooking.status}
        </p>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setSelectedBooking(null)}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Close
        </button>
      </div>

    </div>
  </div>
    )}
    {loading ? (
      <div className="text-center py-10">
        Loading bookings...
      </div>
    ) : filteredBookings.length === 0 ? (
      <div className="bg-white p-10 rounded-lg shadow text-center">
        <h3 className="text-lg font-semibold mb-2">
          No bookings found
        </h3>
        <p className="text-gray-500">
          Try changing filters or create a new
          booking.
        </p>
      </div>
    ) : (
      <DataTable
        columns={[
          "Booking ID",
          "Guest Name",
          "Phone",
          "Room",
          "Check-In",
          "Check-Out",
          "Guests",
          "Status",
          "Actions",
        ]}
        rows={filteredBookings.map((booking) => [
          booking.id,
          booking.full_name,
          booking.phone,
          booking.room_name,
          booking.check_in,
          booking.check_out,
          booking.guests,

          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              booking.status === "booked"
                ? "bg-blue-100 text-blue-700"
                : booking.status ===
                  "checked_in"
                ? "bg-green-100 text-green-700"
                : booking.status ===
                  "checked_out"
                ? "bg-gray-100 text-gray-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {booking.status.replace("_", " ")}
          </span>,

          <div className="flex gap-2">
            <button
              onClick={() =>
                handleViewBooking(booking)
              }
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
            >
              View
            </button>

            {booking.status === "booked" && (
              <button
                onClick={() =>
                  handleCheckIn(booking.id)
                }
                className="px-3 py-1 bg-green-500 text-white rounded text-sm"
              >
                Check In
              </button>
            )}

            {booking.status ===
              "checked_in" && (
              <button
                onClick={() =>
                  handleCheckOut(booking.id)
                }
                className="px-3 py-1 bg-orange-500 text-white rounded text-sm"
              >
                Check Out
              </button>
            )}
          </div>,
        ])}
      />
    )}
  </>
)}
{active === "event-bookings" && (
  <DataTable
    columns={[
      "ID",
      "Name",
      "Phone",
      "Event Date",
      "Guests",
      "Category",
      "Status",
      "Action",
    ]}
    rows={eventBookings.map((booking) => [
      booking.id,
      booking.name,
      booking.phone,
      booking.event_date,
      booking.guests,
      booking.category,

      <span>
        {booking.status}
      </span>,

      booking.status === "pending" ? (
        <button
          onClick={() => confirmEventBooking(booking.id)}
          className="px-3 py-1 bg-green-600 text-white rounded"
        >
          Confirm
        </button>
      ) : (
        "-"
      ),
    ])}
  />
)}
    
      {/* Check Out */}

     {active === "check-in" && (
  <DataTable
    columns={[
      "Booking ID",
      "Guest",
      "Room",
      "Status",
      "Action",
    ]}
    rows={checkIns.map((booking) => [
      `#${booking.id}`,
      booking.full_name,
      booking.room_name,
      booking.status,
      <button
        key={booking.id}
        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={() => handleCheckIn(booking.id)}
      >
        Check-In
      </button>,
    ])}
    />
)}


      {/* Check Out */}
{active === "check-out" && (
  <DataTable
    columns={[
      "Booking ID",
      "Guest",
      "Room",
      "Status",
      "Action",
    ]}
    rows={checkOuts.map((booking) => [
      `#${booking.id}`,
      booking.full_name,
      booking.room_name,
      booking.status,
      <button
        key={booking.id}
        className="px-3 py-1 bg-red-600 text-white rounded"
        onClick={() => handleCheckOut(booking.id)}
      >
        Check-Out
      </button>,
    ])}
  />
)}
      {/* Available Rooms */}

      {/* {active === "available-rooms" && (
        <DataTable
          columns={[
            "Room Number",
            "Type",
            "Price",
            "Status",
          ]}
          rows={[
            [
              "101",
              "Deluxe",
              "₹2499",
              "Available",
            ],
            [
              "102",
              "Premium",
              "₹3499",
              "Occupied",
            ],
            [
              "201",
              "Suite",
              "₹5499",
              "Cleaning",
            ],
            [
              "305",
              "Executive",
              "₹4299",
              "Reserved",
            ],
          ]}
        />
      )} */}
      {active === "available-rooms" && (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
    {roomCategories.map((room) => (
      <div
        key={room.id}
        className="bg-white rounded-xl shadow overflow-hidden"
      >
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-52 object-cover"
        />

        <div className="p-4">
          <h2 className="text-xl font-bold">
            {room.name}
          </h2>

          <p className="text-gray-500 mt-1">
            Total Rooms: {room.totalRooms}
          </p>

          <p className="font-semibold mt-2">
            ₹{room.price}/Night
          </p>

          <div className="flex gap-2 mt-4">
            <button className="bg-green-600 text-white px-3 py-2 rounded-lg">
              Available ({room.availableRooms})
            </button>

            <button className="bg-red-600 text-white px-3 py-2 rounded-lg">
              Occupied (
              {room.totalRooms -
                room.availableRooms}
              )
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
)}

      {/* Customers */}

      {active === "customers" && (
        <DataTable
          columns={[
            "Name",
            "Phone",
            "Email",
            "Total Visits",
            "Last Stay",
          ]}
          rows={[
            [
              "Ramesh",
              "+91 9876543210",
              "ramesh@gmail.com",
              "3",
              "2026-06-01",
            ],
            [
              "Lakshmi",
              "+91 9876543211",
              "lakshmi@gmail.com",
              "5",
              "2026-05-20",
            ],
            [
              "Anitha",
              "+91 9876543212",
              "anitha@gmail.com",
              "2",
              "2026-04-18",
            ],
          ]}
        />
      )}

      {/* Restaurant Reservations */}

      {active === "restaurant-reservations" && (
        <DataTable
          columns={[
            "Guest",
            "Phone",
            "Date",
            "Time",
            "Guests",
            "Table",
            "Status",
          ]}
          rows={[
            [
              "Priya",
              "+91 9876543213",
              "2026-06-10",
              "7:30 PM",
              "4",
              "T4",
              "Confirmed",
            ],
            [
              "Karthik",
              "+91 9876543214",
              "2026-06-10",
              "8:00 PM",
              "2",
              "T9",
              "Pending",
            ],
            [
              "Vamsi",
              "+91 9876543215",
              "2026-06-11",
              "1:00 PM",
              "6",
              "T2",
              "Completed",
            ],
          ]}
        />
      )}

      {/* Contact Enquiries */}

      {active === "contact-enquiries" && (
  <DataTable
    columns={[
      "Name",
      "Phone",
      "Email",
      "Message",
      "Date",
      "Status",
      "Action",
    ]}
    rows={enquiries.map((e) => [
      e.name,
      e.phone,
      e.email,
      e.message,
      new Date(e.created_at).toLocaleDateString(),
      e.status,

      <button
        key={e.id}
        className="rounded bg-blue-600 px-3 py-1 text-white"
        onClick={() => setSelectedEnquiry(e)}
      >
        Reply
      </button>,
    ])}
  />
)}
      {selectedEnquiry && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">

      <h2 className="mb-4 text-xl font-semibold">
        Reply to {selectedEnquiry.name}
      </h2>

      <input
        type="text"
        placeholder="Subject"
        value={replyForm.subject}
        onChange={(e) =>
          setReplyForm({
            ...replyForm,
            subject: e.target.value,
          })
        }
        className="mb-4 w-full rounded border p-3"
      />

      <textarea
        rows={6}
        placeholder="Write your reply..."
        value={replyForm.message}
        onChange={(e) =>
          setReplyForm({
            ...replyForm,
            message: e.target.value,
          })
        }
        className="mb-4 w-full rounded border p-3"
      />

      <div className="flex justify-end gap-3">
        <button
          className="rounded bg-gray-300 px-4 py-2"
          onClick={() => {
            setSelectedEnquiry(null);
            setReplyForm({
              subject: "",
              message: "",
            });
          }}
        >
          Cancel
        </button>

        <button
          className="rounded bg-green-600 px-4 py-2 text-white"
          onClick={async () => {
            await replyToCustomer(
              selectedEnquiry.id,
              replyForm.subject,
              replyForm.message
            );

            setSelectedEnquiry(null);

            setReplyForm({
              subject: "",
              message: "",
            });
          }}
        >
          Send Reply
        </button>
      </div>

    </div>
  </div>
)}
    </DashboardShell>
  );
}