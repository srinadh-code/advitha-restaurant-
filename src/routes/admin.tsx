import API from "@/api/api";
import { toast } from "sonner";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";

import { AuthProvider, useAuth } from "@/lib/auth";
import { DashboardShell, StatCard, DataTable, type SidebarItem } from "@/components/DashboardShell";
import { ROOMS, REVIEWS } from "@/lib/mockData";
import { Toaster } from "@/components/ui/sonner";
import {
  LayoutDashboard,
  CalendarCheck,
  Bed,
  UtensilsCrossed,
  Map,
  Image,
  Users,
  Star,
  UserCog,
  Receipt,
  BarChart3,
  Settings,
  Building2,
  BedDouble,
  Hotel,
  Headset,
  PartyPopper,
  Percent,
} from "lucide-react";


interface DashboardData {
  total_rooms: number;
  available_rooms: number;
  total_bookings: number;
  occupied_rooms: number;
  total_event_bookings: number;
  total_customers: number;
  total_staff: number;
  total_receptionists: number;
  restaurant_reservations: number;
  occupancy_rate: number;
  recent_bookings: {
    guest: string;
    room: string;
    check_in: string;
    status: string;
  }[];
  recent_event_bookings: {
    name: string;
    event_type: string;
    event_date: string;
    guests: number;
  }[];
}
interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  bookings: number;
  room_bookings_count: number;
  event_bookings_count: number;
}
interface CustomerDetail {
  id: number;
  name: string;
  email: string;
  phone: string;

  room_bookings_count: number;
  event_bookings_count: number;

  room_bookings: {
    id: number;
    room: string;
    check_in: string;
    check_out: string;
    guests: number;
    status: string;
  }[];

  event_bookings: {
    id: number;
    event: string;
    event_date: string;
    guests: number;
    status: string;
  }[];
}

interface Booking {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  room?: number;
  room_name?: string;
  check_in: string;
  check_out: string;
  guests: number;
}
interface Room {
  id?: number;
  title: string;
  price: string | number;
  room_type: string;
  description: string;
  adults: number;
  children: number;
  features: string[];
  image_url?: string;
}


export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Mulugu Hotel" },
      { name: "description", content: "Mulugu Hotel admin dashboard." }
    ]
  }),
  component: () => (
    <>
      <AdminGuard />
      <Toaster />
    </>
  ),
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
      {active === "gallery" && <GalleryView />}
      {active === "customers" && <CustomersView />}
      {active === "reviews" && <ReviewsView />}
      {active === "staff" && <StaffView />}
     
      {active === "receptionists" && <ReceptionistsView />}
      {active === "reports" && <ReportsView />}
      {active === "settings" && <Placeholder title="System Settings" desc="Property settings, taxes, payment options and content." />}
    </DashboardShell>
  );
}

function DashboardView() {
  const [dashboard, setDashboard] =
  useState<DashboardData | null>(null);

  const fetchDashboard = async () => {
  try {
    const res = await API.get("/api/dashboard/");
    setDashboard(res.data);
  } catch {
    toast.error("Failed to load dashboard");
  }
};

  useEffect(() => {
    fetchDashboard();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "dashboard_refresh") {
        fetchDashboard();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StatCard
  label="Total Rooms"
  value={dashboard?.total_rooms || 0}
  icon={Building2}
/>

<StatCard
  label="Available Rooms"
  value={dashboard?.available_rooms || 0}
  icon={BedDouble}
/>

<StatCard
  label="Total Bookings"
  value={dashboard?.total_bookings || 0}
  icon={CalendarCheck}
/>

<StatCard
  label="Occupied Rooms"
  value={dashboard?.occupied_rooms || 0}
  icon={Hotel}
/>
<StatCard
  label="Event Bookings"
  value={dashboard?.total_event_bookings || 0}
  icon={PartyPopper}
/>


<StatCard
  label="Total Customers"
  value={dashboard?.total_customers || 0}
  icon={Users}
/>

<StatCard
  label="Total Staff"
  value={dashboard?.total_staff || 0}
  icon={UserCog}
/>

<StatCard
  label="Receptionists"
  value={dashboard?.total_receptionists || 0}
  icon={Headset}
/>

<StatCard
  label="Restaurant Reservations"
  value={dashboard?.restaurant_reservations || 0}
  icon={UtensilsCrossed}
/>

<StatCard
  label="Occupancy Rate"
  value={`${dashboard?.occupancy_rate || 0}%`}
  icon={Percent}
/>

</div>
        {/* <StatCard label="Revenue (₹)" value={"4.8 L"} accent="text-gradient-gold" /> */}
      <div className="grid gap-6 lg:grid-cols-2">

  {/* LEFT SIDE */}
  <div className="rounded-2xl bg-card border border-border p-5 shadow-soft">
    <h3 className="font-display text-lg font-bold mb-3">
      Recent Bookings
    </h3>

    <DataTable
      columns={["Guest", "Room", "Check-In", "Status"]}
      rows={
        dashboard?.recent_bookings?.map((booking: any) => [
          booking.guest,
          booking.room,
          booking.check_in,
          booking.status,
        ]) || []
      }
    />
  </div>

  {/* RIGHT SIDE */}
  <div className="rounded-2xl bg-card border border-border p-5 shadow-soft">
    <h3 className="font-display text-lg font-bold mb-3">
      Recent Event Bookings
    </h3>

    <DataTable
      columns={["Name", "Event", "Date", "Guests"]}
      rows={
        dashboard?.recent_event_bookings?.map((booking: any) => [
          booking.name,
          booking.event_type,
          booking.event_date,
          booking.guests,
        ]) || []
      }
    />
  </div>

</div>
    </div>
  );
}

  
  
function BookingsView() {
  const [bookings, setBookings] =
  useState<Booking[]>([]);

useEffect(() => {
  const fetchBookings = async () => {
    try {
      const response = await API.get("/api/bookings/");
      setBookings(response.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  fetchBookings();
}, []);



  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-[#3E2414]">
          Booking Management
        </h2>

        <div className="bg-[#C69214] text-white px-4 py-2 rounded-xl">
          Total Bookings: {bookings.length}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-md border overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#F5E7C5]">

            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Guest</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Room</th>
              <th className="p-4 text-left">Check In</th>
              <th className="p-4 text-left">Check Out</th>
              <th className="p-4 text-left">Guests</th>
            </tr>

          </thead>

          <tbody>

            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  #{booking.id}
                </td>

                <td className="p-4 font-medium">
                  {booking.full_name}
                </td>

                <td className="p-4">
                  {booking.email}
                </td>

                <td className="p-4">
                  {booking.phone}
                </td>

                <td className="p-4">
                  {booking.room_name || booking.room}
                </td>

                <td className="p-4">
                  {booking.check_in}
                </td>

                <td className="p-4">
                  {booking.check_out}
                </td>

                <td className="p-4">
                  {booking.guests}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}




function RoomsView() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [selectedRoom, setSelectedRoom] =
  useState<Room | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await API.get("/api/rooms/");
      setRooms(response.data);
    } catch (error) {
      console.error(error);
    }
  };

const handleEdit = (room: any) => {
  setSelectedRoom({
    ...room,
    features: room.features || [],
  });

  setShowEditModal(true);
};

  const handleDelete = async (id: number) => {
    try {
      await API.delete(`/api/rooms/${id}/`);
      fetchRooms();
    } catch (error) {
      console.error(error);
    }
  };

const updateRoom = async () => {
  if (!selectedRoom) {
    toast.error("No room selected");
    return;
  }

  try {
    const data = new FormData();

    data.append("title", selectedRoom.title);
    data.append("price", String(selectedRoom.price));
    data.append("room_type", selectedRoom.room_type);
    data.append("description", selectedRoom.description);
    data.append("adults", String(selectedRoom.adults));
    data.append("children", String(selectedRoom.children));
    data.append(
      "features",
      JSON.stringify(selectedRoom.features)
    );
    if (image) {
      data.append("image", image);
    }

    await API.patch(
      `/api/rooms/${selectedRoom.id}/`,
      data
    );

    fetchRooms();
    setShowEditModal(false);

    toast.success("Room updated successfully");
  } catch (error) {
    
    toast.error("Failed to update room");
  }
};
const addRoom = async () => {
  if (!selectedRoom) {
    toast.error("No room selected");
    return;
  }

  try {
    const data = new FormData();

    data.append("title", selectedRoom.title);
    data.append("price", String(selectedRoom.price));
    data.append("room_type", selectedRoom.room_type);
    data.append("description", selectedRoom.description);
    data.append("adults", String(selectedRoom.adults));
    data.append("children", String(selectedRoom.children));
    data.append(
      "features",
      JSON.stringify(selectedRoom.features)
    );

    if (image) {
      data.append("image", image);
    }

  await API.post("/api/rooms/", data);

    fetchRooms();

    setShowEditModal(false);

    toast.success("Room added successfully");

  } catch (error) {
   

    toast.error("Failed to add room");
  }
};
return (
  <>
  <div className="mb-6 flex justify-end">
      <button
        onClick={() => {
          setSelectedRoom({
  title: "",
  room_type: "",
  description: "",
  price: "",
  adults: 1,
  children: 0,
  features:[],
});

          setImage(null);
          setShowEditModal(true);
        }}
        className="rounded-lg bg-yellow-500 px-5 py-2 text-white font-semibold"
      >
        + Add Room
      </button>
    </div>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {rooms.map((room) => (
        <div
          key={room.id}
          className="overflow-hidden rounded-2xl bg-card border border-border shadow-soft"
        >
          <div className="h-52 overflow-hidden">
            <img
              src={room.image_url}
              alt={room.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-bold">
                {room.title}
              </h3>

              <span className="text-xl font-bold text-gold">
                ₹{room.price}
              </span>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              {room.room_type}
            </p>

            <p className="mt-2 text-sm">
              Adults: {room.adults} | Children: {room.children}
            </p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => handleEdit(room)}
                className="flex-1 rounded-lg border border-gold px-4 py-2"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(room.id!)}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

    {showEditModal && selectedRoom && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
  <div className="bg-white w-full max-w-2xl rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">
  {selectedRoom?.id ? "Edit Room" : "Add Room"}
</h2>

          <input
            type="text"
            value={selectedRoom.title}
            onChange={(e) =>
              setSelectedRoom({
                ...selectedRoom,
                title: e.target.value,
              })
            }
            placeholder="Room Title"
            className="w-full border p-3 mb-3 rounded"
          />


<input
  type="number"
  value={selectedRoom.price}
  onChange={(e) =>
    setSelectedRoom({
      ...selectedRoom,
      price: e.target.value,
    })
  }
  placeholder="Price"
  className="w-full border p-3 mb-3 rounded"
/>



<select
  value={selectedRoom.room_type}
  onChange={(e) =>
    setSelectedRoom({
      ...selectedRoom,
      room_type: e.target.value,
    })
  }
  className="w-full border p-3 mb-3 rounded"
>
  <option value="">Select Room Type</option>
  <option value="DELUXE">Deluxe</option>
  <option value="PREMIUM">Premium</option>
  <option value="SUITE">Suite</option>
  <option value="EXECUTIVE">Executive</option>
</select>

<textarea
  value={selectedRoom.description}
  onChange={(e) =>
    setSelectedRoom({
      ...selectedRoom,
      description: e.target.value,
    })
  }
  placeholder="Description"
  className="w-full border p-3 mb-3 rounded"
/>

<input
  type="number"
  value={selectedRoom.adults}
  onChange={(e) =>
    setSelectedRoom({
  ...selectedRoom,
  adults: Number(e.target.value),
})
  }
  placeholder="Adults"
  className="w-full border p-3 mb-3 rounded"
/>

<input
  type="number"
  value={selectedRoom.children}
  onChange={(e) =>
    setSelectedRoom({
  ...selectedRoom,
  children: Number(e.target.value),
})
  }
  placeholder="Children"
  className="w-full border p-3 mb-3 rounded"
/>

<textarea
  value={selectedRoom.features?.join("\n") || ""}
  onChange={(e) =>
  setSelectedRoom({
    ...selectedRoom,
    features: e.target.value
      .split(/[\n,]+/)
      .map((feature) => feature.trim())
      .filter((feature) => feature !== ""),
  })
}
  placeholder={`Enter features separated by commas or new lines

Examples:
WiFi, TV, AC, Breakfast

or

WiFi
TV
AC
Breakfast`}className="w-full border p-3 mb-3 rounded"
  rows={6}
  />



<input
  type="file"
  className="w-full border p-3 mb-4 rounded"
  onChange={(e) =>
    setImage(e.target.files?.[0] || null)
  }
/>
          <div className="flex gap-3">
            <button
              onClick={() => setShowEditModal(false)}
              className="flex-1 bg-gray-300 py-3 rounded"
            >
              Cancel
            </button>

<button
  onClick={
    selectedRoom?.id
      ? updateRoom
      : addRoom
  }
  className="flex-1 bg-yellow-500 text-white py-3 rounded"
>
  Save
</button>
          </div>
        </div>
      </div>
    )}
  </>
);
}

function RestaurantView() {
  const [foods, setFoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingFood, setEditingFood] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });
  const fetchCategories = async () => {
  try {
    const response = await API.get("/api/food/categories/");
    setCategories(response.data);
  } catch (error) {
    toast.error("Failed to load categories");
  }
};

  const [image, setImage] = useState<File | null>(null);

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

  useEffect(() => {
  fetchFoods();
  fetchCategories();
}, []);
const addFood = async () => {
  try {
    const data = new FormData();

    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("description", formData.description);

    if (image) {
      data.append("image", image);
    }

    await API.post("/api/food/foods/", data);

    toast.success("Food Added");

    setShowModal(false);

    fetchFoods();

  } catch (error) {
  
    toast.error("Failed");
  }
};



const deleteFood = async (id:number) => {

  const ok = window.confirm(
    "Delete this food?"
  );

  if (!ok) return;

  try {

    await API.delete(
      `/api/food/foods/${id}/`
    );

    toast.success("Deleted");

    fetchFoods();

  } catch (error) {

    toast.error("Delete failed");

  }
};



const updateFood = async () => {
  try {

    const data = new FormData();

    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("description", formData.description);

    if (image) {
      data.append("image", image);
    }

    await API.put(
      `/api/food/foods/${editingFood.id}/`,
      data
    );

    toast.success("Updated");

    setShowModal(false);

    fetchFoods();

  } catch (error) {

    toast.error("Update failed");

  }
};


  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="text-lg font-semibold text-[#8A5A12]">
          Loading Restaurant Menu...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold text-[#3E2414]">
            Restaurant Menu
          </h2>

          <p className="text-sm text-[#7B6A58] mt-1">
            Manage food items, prices and menu categories
          </p>
        </div>
<button
onClick={() => {
  setEditingFood(null);

  setFormData({
    name: "",
    category: "",
    price: "",
    description: "",
  });

  setImage(null);
  setShowModal(true);
}}
className="
px-8
py-4
rounded-2xl
bg-gradient-to-r
from-[#C69214]
to-[#E3B341]
text-white
font-bold
shadow-xl
hover:scale-105
hover:shadow-2xl
transition-all
duration-300
"
>
+ Add Food
</button>

      </div>

      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-3xl bg-[#FFFDF8] border border-[#E4D4B5] p-6 shadow-sm">
          <p className="text-sm text-[#7B6A58]">
            Total Menu Items
          </p>

          <h3 className="text-3xl font-bold text-[#3E2414] mt-2">
            {foods.length}
          </h3>
        </div>

        <div className="rounded-3xl bg-[#FFFDF8] border border-[#E4D4B5] p-6 shadow-sm">
          <p className="text-sm text-[#7B6A58]">
            Categories
          </p>

          <h3 className="text-3xl font-bold text-[#3E2414] mt-2">
            {
              [...new Set(
                foods.map((food) => food.category)
              )].length
            }
          </h3>
        </div>

        <div className="rounded-3xl bg-[#FFFDF8] border border-[#E4D4B5] p-6 shadow-sm">
          <p className="text-sm text-[#7B6A58]">
            Food Images
          </p>

          <h3 className="text-3xl font-bold text-[#3E2414] mt-2">
            {foods.length}
          </h3>
        </div>
      </div>

      {/* Food Cards */}
      {/* <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"> */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {foods.map((food) => (
          <div
            key={food.id}
            className="
              group
              overflow-hidden
              rounded-3xl
              bg-gradient-to-b
              from-[#FFFDF8]
              to-[#F7EEDB]
              border
              border-[#D8BC84]
              shadow-md
              hover:shadow-xl
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >

            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={food.image_url}
                alt={food.name}
                className="
                  h-56
                  w-full
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-105
                "
              />
            </div>

            <div className="p-4">

              <div className="flex items-start justify-between">
                <h3 className="font-display text-xl font-bold text-[#3E2414]">
                  {food.name}
                </h3>

                <span className="text-xl font-bold text-[#C69214]">
                  ₹{food.price}
                </span>
              </div>

              <span
                className="
                  inline-block
                  mt-3
                  rounded-full
                  bg-[#E9D5AC]
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  text-[#8A5A12]
                "
              >
                {food.category_name}
              </span>

              <p className="mt-4 text-sm text-[#6B5A48] line-clamp-3">
                {food.description}
              </p>

              {/* Actions */}
              <div className="mt-6 flex gap-3">




<button
onClick={() => {
  setEditingFood(food);

  setFormData({
    name: food.name,
    category: food.category,
    price: food.price,
    description: food.description,
  });

  setShowModal(true);
}}
className="
flex-1
rounded-xl
border
border-[#C69214]
py-2.5
font-semibold
text-[#C69214]
hover:bg-[#C69214]
hover:text-white
transition
"
>
Edit
</button>

<button
onClick={() => deleteFood(food.id)}
className="
flex-1
rounded-xl
bg-[#5A2D0C]
py-2.5
font-semibold
text-white
hover:bg-red-600
transition
"
>
Delete
</button>



              </div>

            </div>

          </div>
        ))}

      </div>

      {/* Empty State */}
      {foods.length === 0 && (
        <div className="rounded-3xl bg-[#FFFDF8] border border-[#D8BC84] p-12 text-center">
          <h3 className="text-2xl font-bold text-[#3E2414]">
            No Food Items Found
          </h3>

          <p className="mt-2 text-[#7B6A58]">
            Add your first restaurant menu item.
          </p>
        </div>
      )}

      {
showModal && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

{/* <div className="bg-white rounded-3xl p-6 w-[500px]"> */}
<div
className="
bg-white
rounded-[32px]
p-8
w-[700px]
max-h-[90vh]
overflow-y-auto
shadow-[0_25px_80px_rgba(0,0,0,0.25)]
"
>
<h2 className="text-2xl font-bold mb-4">

{editingFood ? "Edit Food" : "Add Food"}

</h2>

<input
className="w-full border p-2 mb-3"
placeholder="Food Name"
value={formData.name}
onChange={(e)=>
setFormData({
...formData,
name:e.target.value
})
}
/>

<select
className="w-full border p-2 mb-3"
value={formData.category}
onChange={(e)=>
setFormData({
...formData,
category:e.target.value
})
}
>

<option value="">
Select Category
</option>

{
categories.map((cat)=>(
<option
key={cat.id}
value={cat.id}
>
{cat.name}
</option>
))
}

</select>

<input
className="w-full border p-2 mb-3"
placeholder="Price"
value={formData.price}
onChange={(e)=>
setFormData({
...formData,
price:e.target.value
})
}
/>

<textarea
className="w-full border p-2 mb-3"
placeholder="Description"
value={formData.description}
onChange={(e)=>
setFormData({
...formData,
description:e.target.value
})
}
/>



<label
className="
flex
flex-col
items-center
justify-center
h-44
border-2
border-dashed
border-[#D8BC84]
rounded-3xl
bg-[#FFFDF8]
cursor-pointer
hover:bg-[#FDF6E8]
transition
"
>

<span className="text-lg font-semibold text-[#3E2414]">
📸 Upload Food Image
</span>

<span className="text-sm text-gray-500 mt-2">
PNG, JPG, WEBP
</span>

<input
type="file"
className="hidden"
onChange={(e)=>
setImage(e.target.files?.[0] || null)
}
/>



</label>

<div className="flex gap-4 mt-8">

<button
className="flex-1 bg-gray-200 rounded-xl py-2"
onClick={() =>
setShowModal(false)
}
>
Cancel
</button>

<button
className="flex-1 bg-[#C69214] text-white rounded-xl py-2"
onClick={
editingFood
? updateFood
: addFood
}
>
Save
</button>

</div>

</div>

</div>

)
}

    </div>
  );
}





interface TourismPlace {
  id: number;
  name: string;
  category: string;
  description: string;
  distance: string;
  hours: string;
  image: string;
  image_url?: string;
}

function TourismView() {
  const [places, setPlaces] = useState<TourismPlace[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingPlace, setEditingPlace] =
    useState<TourismPlace | null>(null);

  const [image, setImage] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    distance: "",
    hours: "",
  });

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
      console.error(error);
      toast.error("Failed to load places");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      description: "",
      distance: "",
      hours: "",
    });

    setImage(null);
    setEditingPlace(null);
  };

  const addPlace = async () => {
    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("category", formData.category);
      data.append(
        "description",
        formData.description
      );
      data.append(
        "distance",
        formData.distance
      );
      data.append(
        "hours",
        formData.hours
      );

      if (image) {
        data.append("image", image);
      }

      await API.post(
        "/api/tourism/places/",
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      toast.success("Place Added");

      setShowModal(false);
      resetForm();

      fetchPlaces();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add place");
    }
  };

  const updatePlace = async () => {
    if (!editingPlace) return;

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("category", formData.category);
      data.append(
        "description",
        formData.description
      );
      data.append(
        "distance",
        formData.distance
      );
      data.append(
        "hours",
        formData.hours
      );

      if (image) {
        data.append("image", image);
      }

      await API.patch(
        `/api/tourism/places/${editingPlace.id}/`,
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      toast.success("Place Updated");

      setShowModal(false);
      resetForm();

      fetchPlaces();
    } catch (error) {
      console.error(error);
      toast.error("Update Failed");
    }
  };

  const deletePlace = async (
    id: number
  ) => {
    const ok = window.confirm(
      "Delete this tourism place?"
    );

    if (!ok) return;

    try {
      await API.delete(
        `/api/tourism/places/${id}/`
      );

      toast.success("Place Deleted");

      fetchPlaces();
    } catch (error) {
      console.error(error);
      toast.error("Delete Failed");
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading Tourism Places...
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-4xl font-bold text-[#3D210D]">
              Tourism Management
            </h2>

            <p className="text-gray-500 mt-2">
              Manage tourism places
            </p>
          </div>

          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="
            px-8
            py-4
            rounded-2xl
            bg-gradient-to-r
            from-[#C69214]
            to-[#E3B341]
            text-white
            font-bold
            shadow-lg
            "
          >
            + Add Place
          </button>

        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {places.map((place) => (

            <div
              key={place.id}
              className="
              bg-white
              rounded-3xl
              overflow-hidden
              border
              shadow-md
              "
            >

              <img
                src={
                  place.image_url ||
                  place.image
                }
                alt={place.name}
                className="
                h-56
                w-full
                object-cover
                "
              />

              <div className="p-5">

                <h3 className="text-2xl font-bold text-[#3D210D]">
                  {place.name}
                </h3>

                <span
                  className="
                  inline-block
                  mt-2
                  px-3
                  py-1
                  rounded-full
                  bg-yellow-100
                  text-[#8A5A00]
                  text-xs
                  font-semibold
                  "
                >
                  {place.category}
                </span>

                <p className="mt-3 text-sm">
                  📍 {place.distance}
                </p>

                <p className="text-sm">
                  🕒 {place.hours}
                </p>

                <p className="mt-3 text-sm text-gray-600">
                  {place.description}
                </p>

                <div className="flex gap-3 mt-5">

                  <button
                    onClick={() => {
                      setEditingPlace(place);

                      setFormData({
                        name: place.name,
                        category:
                          place.category,
                        description:
                          place.description,
                        distance:
                          place.distance,
                        hours:
                          place.hours,
                      });

                      setShowModal(true);
                    }}
                    className="
                    flex-1
                    py-3
                    rounded-xl
                    border
                    border-[#C69214]
                    text-[#C69214]
                    font-semibold
                    "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deletePlace(place.id)
                    }
                    className="
                    flex-1
                    py-3
                    rounded-xl
                    bg-red-500
                    text-white
                    font-semibold
                    "
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      {showModal && (
        <div
          className="
          fixed
          inset-0
          bg-black/50
          flex
          items-center
          justify-center
          z-50
          p-4
          "
        >
          <div
            className="
            bg-white
            rounded-3xl
            p-8
            w-full
            max-w-2xl
            "
          >
            <h2 className="text-3xl font-bold mb-6">
              {editingPlace
                ? "Edit Place"
                : "Add Place"}
            </h2>

            <div className="grid gap-4">

              <input
                placeholder="Place Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="border rounded-xl p-3"
              />

              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category:
                      e.target.value,
                  })
                }
                className="border rounded-xl p-3"
              >
                <option value="">
                  Select Category
                </option>

                <option>
                  Temples
                </option>

                <option>
                  Waterfalls
                </option>

                <option>
                  Historical Places
                </option>

                <option>
                  Parks
                </option>

                <option>
                  Adventure Spots
                </option>

                <option>
                  View Points
                </option>

              </select>

              <textarea
                rows={4}
                placeholder="Description"
                value={
                  formData.description
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description:
                      e.target.value,
                  })
                }
                className="border rounded-xl p-3"
              />

              <input
                placeholder="Distance"
                value={
                  formData.distance
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    distance:
                      e.target.value,
                  })
                }
                className="border rounded-xl p-3"
              />

              <input
                placeholder="Hours"
                value={formData.hours}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hours:
                      e.target.value,
                  })
                }
                className="border rounded-xl p-3"
              />

              <input
                type="file"
                onChange={(e) =>
                  setImage(
                    e.target.files?.[0] ||
                      null
                  )
                }
                className="border rounded-xl p-3"
              />

            </div>

            <div className="flex gap-4 mt-6">

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="
                flex-1
                py-3
                rounded-xl
                bg-gray-200
                "
              >
                Cancel
              </button>

              <button
                onClick={
                  editingPlace
                    ? updatePlace
                    : addPlace
                }
                className="
                flex-1
                py-3
                rounded-xl
                bg-[#C69214]
                text-white
                font-bold
                "
              >
                {editingPlace
                  ? "Update"
                  : "Save"}
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
}



// GalleryView//


interface GalleryImage {
  id: number;
  title: string;
  category: string;
  image: string;
  image_url: string;
}

function GalleryView() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [editingImage, setEditingImage] =
    useState<GalleryImage | null>(null);

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await API.get(
        "/api/gallery/images/"
      );

      setImages(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
    });

    setImageFile(null);
    setEditingImage(null);
  };

  const addImage = async () => {
    try {
      const data = new FormData();

      data.append(
        "title",
        formData.title
      );

      data.append(
        "category",
        formData.category
      );

      if (imageFile) {
        data.append(
          "image",
          imageFile
        );
      }

      await API.post(
        "/api/gallery/images/create/",
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      toast.success(
        "Image Added Successfully"
      );

      setShowModal(false);

      resetForm();

      fetchImages();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add image");
    }
  };

  const updateImage = async () => {
    if (!editingImage) return;

    try {
      const data = new FormData();

      data.append(
        "title",
        formData.title
      );

      data.append(
        "category",
        formData.category
      );

      if (imageFile) {
        data.append(
          "image",
          imageFile
        );
      }

      await API.patch(
        `/api/gallery/images/${editingImage.id}/`,
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      toast.success(
        "Image Updated Successfully"
      );

      setShowModal(false);

      resetForm();

      fetchImages();
    } catch (error) {
      console.error(error);
      toast.error("Update Failed");
    }
  };

  const deleteImage = async (
    id: number
  ) => {
    const ok = window.confirm(
      "Delete this image?"
    );

    if (!ok) return;

    try {
      await API.delete(
        `/api/gallery/images/${id}/`
      );

      toast.success(
        "Image Deleted"
      );

      fetchImages();
    } catch (error) {
      console.error(error);
      toast.error("Delete Failed");
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading Gallery...
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-4xl font-bold text-[#3D210D]">
              Gallery Management
            </h2>

            <p className="text-gray-500 mt-2">
              Manage hotel gallery images
            </p>
          </div>

          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="
            px-8
            py-4
            rounded-2xl
            bg-gradient-to-r
            from-[#C69214]
            to-[#E3B341]
            text-white
            font-bold
            shadow-lg
            "
          >
            + Add Image
          </button>

        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {images.map((img) => (

            <div
              key={img.id}
              className="
              bg-white
              rounded-3xl
              overflow-hidden
              border
              shadow-md
              "
            >

              <img
                src={img.image_url}
                alt={img.title}
                className="
                h-56
                w-full
                object-cover
                "
              />

              <div className="p-5">

                <h3 className="text-xl font-bold text-[#3D210D]">
                  {img.title}
                </h3>

                <span
                  className="
                  inline-block
                  mt-2
                  px-3
                  py-1
                  rounded-full
                  bg-yellow-100
                  text-[#8A5A00]
                  text-xs
                  font-semibold
                  "
                >
                  {img.category}
                </span>

                <div className="flex gap-3 mt-5">

                  <button
                    onClick={() => {

                      setEditingImage(img);

                      setFormData({
                        title: img.title,
                        category: img.category,
                      });

                      setShowModal(true);
                    }}
                    className="
                    flex-1
                    py-3
                    rounded-xl
                    border
                    border-[#C69214]
                    text-[#C69214]
                    font-semibold
                    "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteImage(img.id)
                    }
                    className="
                    flex-1
                    py-3
                    rounded-xl
                    bg-red-500
                    text-white
                    font-semibold
                    "
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      {showModal && (
        <div
          className="
          fixed
          inset-0
          bg-black/50
          flex
          items-center
          justify-center
          z-50
          p-4
          "
        >
          <div
            className="
            bg-white
            rounded-3xl
            p-8
            w-full
            max-w-2xl
            "
          >

            <h2 className="text-3xl font-bold mb-6">
              {
                editingImage
                  ? "Edit Image"
                  : "Add Image"
              }
            </h2>

            <div className="grid gap-4">

              <input
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                className="
                border
                rounded-xl
                p-3
                "
              />

              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category:
                      e.target.value,
                  })
                }
                className="
                border
                rounded-xl
                p-3
                "
              >
                <option value="">
                  Select Category
                </option>

                <option value="Hotel">
                  Hotel
                </option>

                <option value="Rooms">
                  Rooms
                </option>

                <option value="Restaurant">
                  Restaurant
                </option>

                <option value="Tourism">
                  Tourism
                </option>

                <option value="Customer Experiences">
                  Customer Experiences
                </option>

              </select>

              <input
                type="file"
                onChange={(e) =>
                  setImageFile(
                    e.target.files?.[0] ||
                      null
                  )
                }
                className="
                border
                rounded-xl
                p-3
                "
              />

            </div>

            <div className="flex gap-4 mt-6">

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="
                flex-1
                py-3
                rounded-xl
                bg-gray-200
                "
              >
                Cancel
              </button>

              <button
                onClick={
                  editingImage
                    ? updateImage
                    : addImage
                }
                className="
                flex-1
                py-3
                rounded-xl
                bg-[#C69214]
                text-white
                font-bold
                "
              >
                {
                  editingImage
                    ? "Update"
                    : "Save"
                }
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}






function CustomersView() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  


const [selectedCustomer, setSelectedCustomer] =
  useState<CustomerDetail | null>(null);

const [showModal, setShowModal] =
  useState(false);
  

  const fetchCustomers = async () => {
    try {
      const res = await API.get("/api/bookings/customers/");
      setCustomers(res.data);
    } catch {
      toast.error("Failed to load customers");
    }
  };
  const handleView = async (id: number) => {
  try {
    const res = await API.get(`/api/bookings/customers/${id}/`);

    console.log(res.data); // temporary

    setSelectedCustomer(res.data);
    setShowModal(true);

  } catch {
    toast.error("Failed to load customer details");
  }

  
};

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
  <div className="rounded-2xl bg-card border border-border p-6 shadow-soft">

    <h2 className="text-2xl font-bold mb-4">
      Customers
    </h2>

    <div className="overflow-x-auto">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Phone</th>
<th className="p-3 text-left">Room Bookings</th>
<th className="p-3 text-left">Event Bookings</th>
<th className="p-3 text-left">Action</th>
          </tr>

        </thead>

        <tbody>

          {customers.map((customer) => (

            <tr
              key={customer.id}
              className="border-t"
            >

              <td className="p-3">
                {customer.name}
              </td>

              <td className="p-3">
                {customer.email}
              </td>

              <td className="p-3">
  {customer.phone || "-"}
</td>

              <td className="p-3">
  {customer.room_bookings_count > 0
    ? customer.room_bookings_count
    : "-"}
</td>

<td className="p-3">
  {customer.event_bookings_count > 0
    ? customer.event_bookings_count
    : "-"}
</td>

              <td className="p-3">

                <button
  onClick={() => handleView(customer.id)}
  className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
>
  View
</button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
    {showModal && selectedCustomer && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

    <div className="w-full max-w-3xl rounded-xl bg-white p-6 shadow-xl">

      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">
          Customer Details
        </h2>

        <button
          onClick={() => setShowModal(false)}
          className="rounded bg-red-500 px-3 py-1 text-white"
        >
          Close
        </button>
      </div>

      <div className="space-y-2 mb-6">
        <p><strong>Name:</strong> {selectedCustomer.name}</p>
        <p><strong>Email:</strong> {selectedCustomer.email}</p>
        <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
        <p>
  <strong>Room Bookings:</strong>{" "}
  {selectedCustomer.room_bookings_count}
</p>

<p>
  <strong>Event Bookings:</strong>{" "}
  {selectedCustomer.event_bookings_count}
</p>
      </div>

<h3 className="text-xl font-semibold mb-3">
  Room Booking History
</h3>
      <h3 className="text-xl font-semibold mt-8 mb-3">
  Event Booking History
</h3>

      <table className="w-full border">

        <thead className="bg-gray-100">

          <tr>
            <th className="p-2">Room</th>
            <th className="p-2">Check In</th>
            <th className="p-2">Check Out</th>
            <th className="p-2">Guests</th>
            <th className="p-2">Status</th>
          </tr>

        </thead>

        <tbody>

          {selectedCustomer.room_bookings.map((booking) => (

            <tr
              key={booking.id}
              className="border-t"
            >
              <td className="p-2">{booking.room}</td>
              <td className="p-2">{booking.check_in}</td>
              <td className="p-2">{booking.check_out}</td>
              <td className="p-2">{booking.guests}</td>
              <td className="p-2">{booking.status}</td>
            </tr>

          ))}

        </tbody>

      </table>
      <h3 className="text-xl font-semibold mt-8 mb-3">
  Event Booking History
</h3>

<table className="w-full border">

  <thead className="bg-gray-100">
    <tr>
      <th className="p-2">Event</th>
      <th className="p-2">Event Date</th>
      <th className="p-2">Guests</th>
      <th className="p-2">Status</th>
    </tr>
  </thead>

  <tbody>

    {selectedCustomer.event_bookings.length > 0 ? (

      selectedCustomer.event_bookings.map((event) => (

        <tr
          key={event.id}
          className="border-t"
        >
          <td className="p-2">
            {event.event}
          </td>

          <td className="p-2">
            {event.event_date}
          </td>

          <td className="p-2">
            {event.guests}
          </td>

          <td className="p-2">
            {event.status}
          </td>
        </tr>

      ))

    ) : (

      <tr>
        <td
          colSpan={4}
          className="p-4 text-center text-gray-500"
        >
          No event bookings
        </td>
      </tr>

    )}

  </tbody>

</table>

    </div>

  </div>
)}

  </div>
  
);
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



function StaffView() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    salary: "",
    password: "",
  });

  const [showForm, setShowForm] = useState(false);

  const [staff, setStaff] = useState<any[]>([]);

  const [errors, setErrors] = useState({
    first_name: "",
    email: "",
    phone_number: "",
    salary: "",
    password: "",
  });

  const validate = () => {
    const newErrors = {
      first_name: "",
      email: "",
      phone_number: "",
      salary: "",
      password: "",
    };

    let isValid = true;

    if (!form.first_name.trim()) {
      newErrors.first_name = "First name is required";
      isValid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = "Enter valid email";
      isValid = false;
    }

    if (!form.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(form.phone_number)) {
      newErrors.phone_number = "Phone number must be 10 digits";
      isValid = false;
    }

    if (!form.salary.trim()) {
      newErrors.salary = "Salary is required";
      isValid = false;
    } else if (isNaN(Number(form.salary))) {
      newErrors.salary = "Salary must be a number";
      isValid = false;
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (form.password.length < 4) {
      newErrors.password =
        "Password must be more than 3 characters";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const fetchStaff = async () => {
  try {
    const res = await API.get("/staff/");
    setStaff(res.data);
  } catch (error) {
    toast.error("Failed to load food categories");
  }
};

const createStaff = async () => {
  if (!validate()) return;

  try {
    await API.post("/staff/", form);

    toast.success("Staff created successfully");
    fetchStaff();
    setShowForm(false);

    setForm({
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      salary: "",
      password: "",
    });
  } catch (error: any) {
    
    toast.error("Failed to create staff");
  }
};

const deleteStaff = async (id: number) => {
  try {
    await API.delete(`/staff/${id}/`);

    toast.success("Staff deleted successfully");
    fetchStaff();
  } catch (error) {
   
    toast.error("Failed to delete staff");
  }
};
const totalSalary = staff.reduce(
  (sum, item) => sum + Number(item.salary || 0),
  0
);
  return (
<div className="rounded-2xl bg-card border border-border p-8 shadow-soft">

      <h3 className="font-display text-2xl font-bold">
        Manage Staff
      </h3>

      <p className="mt-2 text-sm text-muted-foreground">
        Manage hotel staff accounts.
      </p>

      <button
        onClick={() => setShowForm(true)}
        className="mt-4 rounded-md gradient-gold px-5 py-2 text-sm font-semibold text-gold-foreground"
      >
        + Add New
      </button>

      {showForm && (

        <div className="mt-6 space-y-3 max-w-md mx-auto">

          <input
            className="w-full border rounded p-2"
            placeholder="First Name"
            value={form.first_name}
            onChange={(e) =>
              setForm({
                ...form,
                first_name: e.target.value,
              })
            }
          />

          {errors.first_name && (
            <p className="text-red-500 text-xs text-left">
              {errors.first_name}
            </p>
          )}

          <input
            className="w-full border rounded p-2"
            placeholder="Last Name"
            value={form.last_name}
            onChange={(e) =>
              setForm({
                ...form,
                last_name: e.target.value,
              })
            }
          />

          <input
            className="w-full border rounded p-2"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          {errors.email && (
            <p className="text-red-500 text-xs text-left">
              {errors.email}
            </p>
          )}

          <input
            className="w-full border rounded p-2"
            placeholder="Phone Number"
            value={form.phone_number}
            onChange={(e) =>
              setForm({
                ...form,
                phone_number: e.target.value,
              })
            }
          />

          {errors.phone_number && (
            <p className="text-red-500 text-xs text-left">
              {errors.phone_number}
            </p>
          )}
          <input
  type="number"
  className="w-full border rounded p-2"
  placeholder="Salary"
  value={form.salary}
  onChange={(e) =>
    setForm({
      ...form,
      salary: e.target.value,
    })
  }
/>

{errors.salary && (
  <p className="text-red-500 text-xs text-left">
    {errors.salary}
  </p>
)}
          <input
            type="password"
            className="w-full border rounded p-2"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />

          {errors.password && (
            <p className="text-red-500 text-xs text-left">
              {errors.password}
            </p>
          )}

          <button
            onClick={createStaff}
            className="w-full rounded-md gradient-gold py-2"
          >
            Create Staff
          </button>

        </div>
      )}

      {staff.length > 0 ? (

         <div className="mt-4 overflow-hidden rounded-xl border">
           <div className="rounded-xl border bg-card p-4">

  <div className="flex justify-between items-center">
    
    <div>
      <p className="text-sm text-muted-foreground">
        Total Staff
      </p>

      <p className="text-2xl font-bold">
        {staff.length}
      </p>
    </div>

    <div className="text-right">
      <p className="text-sm text-muted-foreground">
        Total Salary
      </p>

      <p className="text-2xl font-bold text-green-600">
        ₹{totalSalary.toLocaleString()}
      </p>
    </div>

  </div>
</div>
          <table className="w-full">

            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">
                  Name
                </th>

                <th className="p-3 text-left">
                  Email
                </th>
                <th>Salary</th>
                <th className="p-3 text-left">
                  Phone
                </th>

                <th className="p-3 text-left">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>

              {staff.map((item: any) => (

                <tr
                  key={item.id}
                  className="border-t"
                >
                  <td className="p-3">
                    {item.first_name}{" "}
                    {item.last_name}
                  </td>

                  <td className="p-3">
                    {item.email}
                  </td>
                    <td>₹{item.salary}</td>
                  <td className="p-3">
                    {item.phone_number}
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() =>
                        deleteStaff(item.id)
                      }
                      className="rounded bg-red-500 px-3 py-1 text-white"
                    >
                      Delete
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      ) : (

        <div className="mt-8 rounded-xl border border-dashed p-8 text-center text-muted-foreground">
          No staff added yet
        </div>

      )}

    </div>
  );
}




function ReceptionistsView() {
   const [form, setForm] = useState({
   first_name: "",
   last_name: "",
   email: "",
   phone_number: "",
   salary: "",
   password: "",
 });
   const [showForm, setShowForm] = useState(false);
   const [receptionists, setReceptionists] = useState<any[]>([]);
   const [errors, setErrors] = useState({
   first_name: "",
   email: "",
   phone_number: "",
   salary: "",
   password: "",
 });
const validate = () => {
  const newErrors = {
    first_name: "",
    email: "",
    phone_number: "",
    salary: "",
    password: "",
  };

  let isValid = true;


  if (!form.salary.trim()) {
  newErrors.salary = "Salary is required";
  isValid = false;
}else if(isNaN(Number(form.salary))){
  newErrors.salary = "Salary must be a number";
  isValid = false;
}
  if (!form.first_name.trim()) {
    newErrors.first_name = "First name is required";
    isValid = false;
  }

  if (!form.email.trim()) {
    newErrors.email = "Email is required";
    isValid = false;
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
  ) {
    newErrors.email = "Enter valid email";
    isValid = false;
  }

  if (!form.phone_number.trim()) {
    newErrors.phone_number = "Phone number is required";
    isValid = false;
  } else if (!/^\d{10}$/.test(form.phone_number)) {
    newErrors.phone_number = "Phone number must be 10 digits";
    isValid = false;
  }

  if (!form.password.trim()) {
    newErrors.password = "Password is required";
    isValid = false;
  } else if (form.password.length < 4) {
    newErrors.password = "Password must be more than 3 characters";
    isValid = false;
 }

   setErrors(newErrors);
   return isValid;
 };

const fetchReceptionists = async () => {
  try {
    const token = localStorage.getItem("access");

    const res = await API.get(
      "/api/accounts/receptionists/create/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setReceptionists(res.data);
  } catch (error) {
     toast.error("Failed to load receptionists");
  }
 };
 useEffect(() => {
   fetchReceptionists();
 }, []);


const createReceptionist = async () => {

  if (!validate()) {
    return;
  }

  try {
    const token = localStorage.getItem("access");

    await API.post(
      "/api/accounts/receptionists/create/",
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Receptionist created successfully");

    fetchReceptionists();

    setShowForm(false);

    setForm({
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      salary: "",
      password: "",
    });

  } 
catch (error: any) {
  

  const errorData = error?.response?.data;

  const message =
    errorData?.message ||
    errorData?.error ||
    errorData?.email?.[0] ||
    errorData?.phone_number?.[0] ||
    "Failed to create receptionist";

  toast.error(message);
}
};
const deleteReceptionist = async (id: number) => {
  try {
    const token = localStorage.getItem("access");

    await API.delete(
      `/api/accounts/receptionists/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(
      "Receptionist deleted successfully"
    );

    fetchReceptionists();
  } catch (error) {

    toast.error(
      "Failed to delete receptionist"
    );
  }};

const totalReceptionistSalary = receptionists.reduce(
  (sum, item) => sum + Number(item.salary || 0),
  0
);
  return (
    <div className="rounded-2xl bg-card border border-border p-8 shadow-soft">
      <h3 className="font-display text-2xl font-bold">
        Manage Receptionists
      </h3>

      <p className="mt-2 text-sm text-muted-foreground">
        Manage receptionist accounts and permissions.
      </p>

    <button
         onClick={() => setShowForm(true)}
        className="mt-4 rounded-md gradient-gold px-5 py-2 text-sm font-semibold text-gold-foreground"
       >
         + Add New
       </button>

      {showForm && (
         <div className="mt-6 space-y-3 max-w-md mx-auto">

  {/* First Name */}
   <div>
     <input
       className="w-full border rounded p-2"
       placeholder="First Name"
       value={form.first_name}
       onChange={(e) => {
         setForm({
           ...form,
           first_name: e.target.value,
         });

         setErrors({
           ...errors,
           first_name: "",
         });
       }}
     />

     {errors.first_name && (
       <p className="text-red-500 text-xs mt-1 text-left">
         {errors.first_name}
       </p>
     )}
   </div>

   {/* Last Name */}
   <input
     className="w-full border rounded p-2"
    placeholder="Last Name"
    value={form.last_name}
    onChange={(e) =>
      setForm({
        ...form,
        last_name: e.target.value,
      })
    }
  />

  {/* Email */}
  <div>
    <input
      className="w-full border rounded p-2"
      placeholder="Email"
      value={form.email}
      onChange={(e) => {
        setForm({
          ...form,
          email: e.target.value,
        });

        setErrors({
          ...errors,
          email: "",
        });
      }}
    />

    {errors.email && (
      <p className="text-red-500 text-xs mt-1 text-left">
        {errors.email}
      </p>
    )}
  </div>
    <div>
  <input
    type="number"
    className="w-full border rounded p-2"
    placeholder="Salary"
    value={form.salary}
    onChange={(e) => {
      setForm({
        ...form,
        salary: e.target.value,
      });

      setErrors({
        ...errors,
        salary: "",
      });
    }}
  />

  {errors.salary && (
    <p className="text-red-500 text-xs mt-1 text-left">
      {errors.salary}
    </p>
  )}
</div>
  {/* Phone Number */}
  <div>
    <input
      className="w-full border rounded p-2"
      placeholder="Phone Number"
      value={form.phone_number}
      onChange={(e) => {
        setForm({
          ...form,
          phone_number: e.target.value,
        });

        setErrors({
          ...errors,
          phone_number: "",
        });
      }}
    />

    {errors.phone_number && (
      <p className="text-red-500 text-xs mt-1 text-left">
        {errors.phone_number}
      </p>
    )}
  </div>

  {/* Password */}
  <div>
    <input
      className="w-full border rounded p-2"
      placeholder="Password"
      type="password"
      value={form.password}
      onChange={(e) => {
        setForm({
          ...form,
          password: e.target.value,
        });

        setErrors({
          ...errors,
          password: "",
        });
      }}
    />

    {errors.password && (
      <p className="text-red-500 text-xs mt-1 text-left">
        {errors.password}
      </p>
    )}
  </div>

  <button
    onClick={createReceptionist}
    className="w-full rounded-md gradient-gold py-2"
  >
    Create Receptionist
  </button>

</div>
)}

{receptionists.length > 0 ? (
  

  <div className="mt-4 overflow-hidden rounded-xl border">

  <div className="rounded-xl border bg-card p-4">
  <div className="flex justify-between items-center">

    <div>
      <p className="text-sm text-muted-foreground">
        Total Receptionists
      </p>

      <p className="text-2xl font-bold">
        {receptionists.length}
      </p>
    </div>

    <div className="text-right">
      <p className="text-sm text-muted-foreground">
        Total Salary
      </p>

      <p className="text-2xl font-bold text-green-600">
        ₹{totalReceptionistSalary.toLocaleString()}
      </p>
    </div>

  </div>
</div>
    <table className="w-full table-fixed">
  <thead>
    <tr className="bg-gray-100">
      <th className="w-1/4 p-3 text-left">Name</th>
      <th className="w-1/4 p-3 text-left">Email</th>
      <th className="w-1/6 p-3 text-left">Salary</th>
      <th className="w-1/4 p-3 text-left">Phone</th>
      <th className="w-1/6 p-3 text-left">Action</th>
    </tr>
  </thead>

  <tbody>
    {receptionists.map((item: any) => (
      <tr key={item.id} className="border-t">
        <td className="p-3">
          {item.first_name} {item.last_name}
        </td>

        <td className="p-3">
          {item.email}
        </td>

        <td className="p-3">
          ₹{item.salary}
        </td>

        <td className="p-3">
          {item.phone_number}
        </td>

        <td className="p-3">
          <button
            onClick={() => deleteReceptionist(item.id)}
            className="rounded bg-red-500 px-3 py-1 text-white"
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
  </div>
) : (
  <div className="rounded-2xl bg-card border border-border p-8 shadow-soft">
    No receptionists added yet
  </div>
)}

</div>
);
 }