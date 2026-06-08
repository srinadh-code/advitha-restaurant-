// import { createFileRoute, Navigate } from "@tanstack/react-router";
// import { useState } from "react";
// import { LayoutDashboard, CalendarCheck, UtensilsCrossed, LogIn, LogOut, Bed, Users } from "lucide-react";
// import { useAuth } from "@/lib/auth";
// import { DashboardShell, StatCard, DataTable, type SidebarItem } from "@/components/DashboardShell";
// import { ROOMS } from "@/lib/mockData";
// import { Toaster } from "@/components/ui/sonner";

// export const Route = createFileRoute("/receptionist")({
//   head: () => ({ meta: [{ title: "Receptionist Dashboard — Mulugu Hotel" }, { name: "description", content: "Front desk dashboard." }]}),
//   component: () => (
//   <>
//     <RecepGuard />
//     <Toaster />
//   </>
// ),
// });

// const items: SidebarItem[] = [
//   { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
//   { key: "room-bookings", label: "Room Bookings", icon: CalendarCheck },
//   { key: "table-reservations", label: "Table Reservations", icon: UtensilsCrossed },
//   { key: "check-in", label: "Check-In", icon: LogIn },
//   { key: "check-out", label: "Check-Out", icon: LogOut },
//   { key: "available-rooms", label: "Available Rooms", icon: Bed },
//   { key: "customers", label: "Customers", icon: Users },
// ];

// function RecepGuard() {
//   const { user } = useAuth();
//   if (!user) return <Navigate to="/login" />;
//   if (user.role !== "receptionist" && user.role !== "admin") return <Navigate to="/" />;
//   return <Inner />;
// }

// function Inner() {
//   const [active, setActive] = useState("dashboard");
//   return (
//     <DashboardShell title="Front Desk" items={items} active={active} onChange={setActive}>
//       {active === "dashboard" && (
//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//           <StatCard label="Today's Check-Ins" value={9} accent="text-gradient-gold" />
//           <StatCard label="Today's Check-Outs" value={6} />
//           <StatCard label="Available Rooms" value={22} />
//           <StatCard label="Table Reservations" value={14} />
//         </div>
//       )}
//       {active === "room-bookings" && (
//         <DataTable columns={["Guest", "Room", "Check-In", "Check-Out", "Status"]} rows={[
//           ["Ramesh K.", "Deluxe 201", "2026-05-30", "2026-06-01", "Confirmed"],
//           ["Sneha V.", "Premium 305", "2026-05-31", "2026-06-02", "Pending"],
//         ]} />
//       )}
//       {active === "table-reservations" && (
//         <DataTable columns={["Guest", "Table", "Time", "Guests"]} rows={[
//           ["Priya", "T4", "7:30 PM", 4],
//           ["Karthik", "T9", "8:00 PM", 2],
//         ]} />
//       )}
//       {active === "check-in" && (
//         <DataTable columns={["Guest", "Room", "Action"]} rows={[
//           ["Ramesh K.", "Deluxe 201", "Check-In"],
//           ["Sneha V.", "Premium 305", "Check-In"],
//         ]} />
//       )}
//       {active === "check-out" && (
//         <DataTable columns={["Guest", "Room", "Bill (₹)"]} rows={[
//           ["Lakshmi P.", "Family Suite 401", 16200],
//           ["Arjun M.", "Executive 207", 8600],
//         ]} />
//       )}
//       {active === "available-rooms" && (
//         <DataTable columns={["Room", "Category", "Price (₹)", "Status"]} rows={ROOMS.map((r) => [r.name, r.category, r.price, "Available"])} />
//       )}
//       {active === "customers" && (
//         <DataTable columns={["Name", "Phone", "Email"]} rows={[
//           ["Ramesh K.", "+91 9000000001", "ramesh@x.com"],
//           ["Lakshmi P.", "+91 9000000002", "lakshmi@x.com"],
//         ]} />
//       )}
//     </DashboardShell>
//   );
// }





import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getBookings } from "@/api/api";
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
  const { user } = useAuth();

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
  const [active, setActive] = useState("dashboard");
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  fetchBookings();
}, []);

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

      {/* Check In */}

      {active === "check-in" && (
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
      )}

      {/* Check Out */}

      {active === "check-out" && (
        <DataTable
          columns={[
            "Booking ID",
            "Guest",
            "Room",
            "Check-In",
            "Bill",
            "Action",
          ]}
          rows={[
            [
              "#100",
              "Lakshmi",
              "401",
              "2026-06-05",
              "₹16,200",
              "Check-Out",
            ],
            [
              "#101",
              "Arjun",
              "207",
              "2026-06-06",
              "₹8,600",
              "Check-Out",
            ],
          ]}
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
          ]}
          rows={[
            [
              "Mahesh",
              "+91 9876543216",
              "mahesh@gmail.com",
              "Need room availability",
              "2026-06-08",
              "Pending",
            ],
            [
              "Anitha",
              "+91 9876543217",
              "anitha@gmail.com",
              "Restaurant enquiry",
              "2026-06-08",
              "Resolved",
            ],
          ]}
        />
      )}
    </DashboardShell>
  );
}