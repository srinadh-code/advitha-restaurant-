import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { LayoutDashboard, CalendarCheck, Bed, UtensilsCrossed, Map, Image, Users, Star, UserCog, Receipt, BarChart3, Settings } from "lucide-react";
import { AuthProvider, useAuth } from "@/lib/auth";
import { DashboardShell, StatCard, DataTable, type SidebarItem } from "@/components/DashboardShell";
import { ROOMS, FOODS, TOURISM, REVIEWS } from "@/lib/mockData";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Mulugu Hotel" }, { name: "description", content: "Mulugu Hotel admin dashboard." }]}),
  component: () => <AuthProvider><AdminGuard /><Toaster /></AuthProvider>,
});

const items: SidebarItem[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "bookings", label: "Bookings", icon: CalendarCheck },
  { key: "rooms", label: "Rooms", icon: Bed },
  { key: "restaurant", label: "Restaurant", icon: UtensilsCrossed },
  { key: "tourism", label: "Tourism", icon: Map },
  { key: "gallery", label: "Gallery", icon: Image },
  { key: "customers", label: "Customers", icon: Users },
  { key: "reviews", label: "Reviews", icon: Star },
  { key: "staff", label: "Staff", icon: UserCog },
  { key: "receptionists", label: "Receptionists", icon: UserCog },
  { key: "reports", label: "Reports", icon: BarChart3 },
  { key: "settings", label: "Settings", icon: Settings },
];

function AdminGuard() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "admin") return <Navigate to="/" />;
  return <AdminInner />;
}

function AdminInner() {
  const [active, setActive] = useState("dashboard");
  return (
    <DashboardShell title="Admin Panel" items={items} active={active} onChange={setActive}>
      {active === "dashboard" && <DashboardView />}
      {active === "bookings" && <BookingsView />}
      {active === "rooms" && <RoomsView />}
      {active === "restaurant" && <RestaurantView />}
      {active === "tourism" && <TourismView />}
      {active === "gallery" && <Placeholder title="Manage Gallery" desc="Add, edit and remove photos across all categories." />}
      {active === "customers" && <CustomersView />}
      {active === "reviews" && <ReviewsView />}
      {active === "staff" && <Placeholder title="Manage Staff" desc="Add/edit hotel staff records and roles." />}
      {active === "receptionists" && <Placeholder title="Manage Receptionists" desc="Manage receptionist accounts and permissions." />}
      {active === "reports" && <ReportsView />}
      {active === "settings" && <Placeholder title="System Settings" desc="Property settings, taxes, payment options and content." />}
    </DashboardShell>
  );
}

function DashboardView() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Total Bookings" value={128} accent="text-gradient-gold" />
        <StatCard label="Available Rooms" value={22} />
        <StatCard label="Occupied Rooms" value={26} />
        <StatCard label="Restaurant Reservations" value={47} />
        <StatCard label="Total Customers" value={"2,415"} />
        <StatCard label="Revenue (₹)" value={"4.8 L"} accent="text-gradient-gold" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-card border border-border p-5 shadow-soft">
          <h3 className="font-display text-lg font-bold mb-3">Recent Bookings</h3>
          <DataTable columns={["Guest", "Room", "Check-In", "Status"]} rows={[
            ["Ramesh K.", "Deluxe", "2026-05-30", "Confirmed"],
            ["Lakshmi P.", "Family Suite", "2026-05-31", "Pending"],
            ["Arjun M.", "Executive", "2026-06-02", "Confirmed"],
          ]} />
        </div>
        <div className="rounded-2xl bg-card border border-border p-5 shadow-soft">
          <h3 className="font-display text-lg font-bold mb-3">Revenue This Week</h3>
          <div className="flex h-48 items-end gap-3">
            {[40, 65, 55, 80, 70, 90, 60].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-md gradient-gold" style={{ height: `${h}%` }} title={`Day ${i + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function BookingsView() {
  return <DataTable columns={["ID", "Guest", "Email", "Room", "Check-In", "Check-Out", "Status"]} rows={[
    ["#B001", "Ramesh K.", "ramesh@x.com", "Deluxe", "2026-05-30", "2026-06-01", "Confirmed"],
    ["#B002", "Lakshmi P.", "lakshmi@x.com", "Family Suite", "2026-05-31", "2026-06-03", "Pending"],
    ["#B003", "Arjun M.", "arjun@x.com", "Executive", "2026-06-02", "2026-06-04", "Confirmed"],
    ["#B004", "Sneha V.", "sneha@x.com", "Premium", "2026-06-05", "2026-06-07", "Cancelled"],
  ]} />;
}
function RoomsView() {
  return <DataTable columns={["Room", "Category", "Price (₹)", "Capacity", "Status"]}
    rows={ROOMS.map((r) => [r.name, r.category, r.price, r.capacity, "Available"])} />;
}
function RestaurantView() {
  return <DataTable columns={["Item", "Category", "Price (₹)"]} rows={FOODS.map((f) => [f.name, f.category, f.price])} />;
}
function TourismView() {
  return <DataTable columns={["Place", "Category", "Distance", "Hours"]} rows={TOURISM.map((t) => [t.name, t.category, t.distance, t.hours])} />;
}
function CustomersView() {
  return <DataTable columns={["Name", "Email", "Bookings"]} rows={[
    ["Ramesh K.", "ramesh@x.com", 3],
    ["Lakshmi P.", "lakshmi@x.com", 1],
    ["Arjun M.", "arjun@x.com", 2],
    ["Sneha V.", "sneha@x.com", 4],
  ]} />;
}
function ReviewsView() {
  return <div className="grid gap-4 md:grid-cols-2">
    {REVIEWS.map((r) => (
      <div key={r.name} className="rounded-2xl bg-card border border-border p-5 shadow-soft">
        <p className="font-semibold">{r.name} <span className="text-gold">★ {r.rating}</span></p>
        <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
      </div>
    ))}
  </div>;
}
function ReportsView() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Bookings (MTD)" value={84} />
      <StatCard label="Revenue (MTD)" value="₹3.2 L" accent="text-gradient-gold" />
      <StatCard label="Avg. Daily Rate" value="₹3,250" />
      <StatCard label="Occupancy" value="72%" />
    </div>
  );
}
function Placeholder({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl bg-card border border-border p-8 shadow-soft text-center">
      <h3 className="font-display text-2xl font-bold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
      <button className="mt-4 rounded-md gradient-gold px-5 py-2 text-sm font-semibold text-gold-foreground">+ Add New</button>
    </div>
  );
}