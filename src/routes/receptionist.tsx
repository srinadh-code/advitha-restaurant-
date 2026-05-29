import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { LayoutDashboard, CalendarCheck, UtensilsCrossed, LogIn, LogOut, Bed, Users } from "lucide-react";
import { AuthProvider, useAuth } from "@/lib/auth";
import { DashboardShell, StatCard, DataTable, type SidebarItem } from "@/components/DashboardShell";
import { ROOMS } from "@/lib/mockData";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/receptionist")({
  head: () => ({ meta: [{ title: "Receptionist Dashboard — Mulugu Hotel" }, { name: "description", content: "Front desk dashboard." }]}),
  component: () => <AuthProvider><RecepGuard /><Toaster /></AuthProvider>,
});

const items: SidebarItem[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "room-bookings", label: "Room Bookings", icon: CalendarCheck },
  { key: "table-reservations", label: "Table Reservations", icon: UtensilsCrossed },
  { key: "check-in", label: "Check-In", icon: LogIn },
  { key: "check-out", label: "Check-Out", icon: LogOut },
  { key: "available-rooms", label: "Available Rooms", icon: Bed },
  { key: "customers", label: "Customers", icon: Users },
];

function RecepGuard() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "receptionist" && user.role !== "admin") return <Navigate to="/" />;
  return <Inner />;
}

function Inner() {
  const [active, setActive] = useState("dashboard");
  return (
    <DashboardShell title="Front Desk" items={items} active={active} onChange={setActive}>
      {active === "dashboard" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Today's Check-Ins" value={9} accent="text-gradient-gold" />
          <StatCard label="Today's Check-Outs" value={6} />
          <StatCard label="Available Rooms" value={22} />
          <StatCard label="Table Reservations" value={14} />
        </div>
      )}
      {active === "room-bookings" && (
        <DataTable columns={["Guest", "Room", "Check-In", "Check-Out", "Status"]} rows={[
          ["Ramesh K.", "Deluxe 201", "2026-05-30", "2026-06-01", "Confirmed"],
          ["Sneha V.", "Premium 305", "2026-05-31", "2026-06-02", "Pending"],
        ]} />
      )}
      {active === "table-reservations" && (
        <DataTable columns={["Guest", "Table", "Time", "Guests"]} rows={[
          ["Priya", "T4", "7:30 PM", 4],
          ["Karthik", "T9", "8:00 PM", 2],
        ]} />
      )}
      {active === "check-in" && (
        <DataTable columns={["Guest", "Room", "Action"]} rows={[
          ["Ramesh K.", "Deluxe 201", "Check-In"],
          ["Sneha V.", "Premium 305", "Check-In"],
        ]} />
      )}
      {active === "check-out" && (
        <DataTable columns={["Guest", "Room", "Bill (₹)"]} rows={[
          ["Lakshmi P.", "Family Suite 401", 16200],
          ["Arjun M.", "Executive 207", 8600],
        ]} />
      )}
      {active === "available-rooms" && (
        <DataTable columns={["Room", "Category", "Price (₹)", "Status"]} rows={ROOMS.map((r) => [r.name, r.category, r.price, "Available"])} />
      )}
      {active === "customers" && (
        <DataTable columns={["Name", "Phone", "Email"]} rows={[
          ["Ramesh K.", "+91 9000000001", "ramesh@x.com"],
          ["Lakshmi P.", "+91 9000000002", "lakshmi@x.com"],
        ]} />
      )}
    </DashboardShell>
  );
}