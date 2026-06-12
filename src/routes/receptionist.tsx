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
  // const { user } = useAuth();
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
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [active, setActive] = useState("dashboard");
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);
  const [checkIns, setCheckIns] = useState<any[]>([]);
  const [checkOuts, setCheckOuts] = useState<any[]>([]);

  const [eventBookings, setEventBookings] = useState<any[]>([]);

const fetchCheckIns = async () => {
  try {
    const res = await axios.get(
      "http://127.0.0.1:8000/bookings/check-in/"
    );

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


const handleCheckIn = async (id: number) => {
  try {
    await axios.put(
      `http://127.0.0.1:8000/bookings/check-in/${id}/`
    );

    fetchCheckIns();
  } catch (error) {
    console.error("Check-in failed:", error);
  }
};

const [replyForm, setReplyForm] = useState({
  subject: "",
  message: "",
});


  useEffect(() => {
  fetchBookings();
  fetchEnquiries();
  fetchCheckIns();
  fetchCheckOuts();
  fetchEventBookings();
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
    const response = await API.get(
  "/api/contact/receptionist/"
);

const data = response.data;

setEnquiries(data);

    setEnquiries(data);
  } catch (error) {
    console.error("Error loading enquiries:", error);
  }
};


const fetchCheckOuts = async () => {
  try {
    const res = await axios.get(
      "http://127.0.0.1:8000/bookings/check-out/"
    );

    setCheckOuts(res.data);
  } catch (error) {
    console.error(error);
  }
};
const handleCheckOut = async (id: number) => {
  try {
    await axios.put(
      `http://127.0.0.1:8000/bookings/check-out/${id}/`
    );

    fetchCheckOuts();
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
    {loading ? (
      <div>Loading bookings...</div>
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
        ]}
        rows={bookings.map((booking) => [
          booking.id,
          booking.full_name,
          booking.phone,
          booking.room,
          booking.check_in,
          booking.check_out,
          booking.guests,
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
    ]}
    rows={eventBookings.map((booking) => [
      booking.id,
      booking.name,
      booking.phone,
      booking.event_date,
      booking.guests,
      booking.category,
      booking.status,
    ])}
  />
)}
      {/* Check In */}

      {/* {active === "check-in" && (
        <DataTable
          columns={[
            "Booking ID",
            "Guest",
            "Room",
            "Status",
            "Action",
          ]}
          rows={[
            [
              "#102",
              "Ramesh",
              "204",
              "Booked",
              "Check-In",
            ],
            [
              "#105",
              "Anitha",
              "305",
              "Booked",
              "Check-In",
            ],
          ]}
        />
      )} */}

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

      {active === "available-rooms" && (
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