import API from "@/api/api";
import { toast } from "sonner";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { LayoutDashboard, CalendarCheck, Bed, UtensilsCrossed, Map, Image, Users, Star, UserCog, Receipt, BarChart3, Settings } from "lucide-react";
import { AuthProvider, useAuth } from "@/lib/auth";
import { DashboardShell, StatCard, DataTable, type SidebarItem } from "@/components/DashboardShell";
import { ROOMS, TOURISM, REVIEWS } from "@/lib/mockData";
import { Toaster } from "@/components/ui/sonner";




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
      {/* {active === "receptionists" && <Placeholder title="Manage Receptionists" desc="Manage receptionist accounts and permissions." />} */}
      {active === "receptionists" && <ReceptionistsView />}
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
// function RestaurantView() {
//   return <DataTable columns={["Item", "Category", "Price (₹)"]} rows={FOODS.map((f) => [f.name, f.category, f.price])} />;
// }

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
    const response = await API.get("/api/categories/");
    setCategories(response.data);
  } catch (error) {
    console.log(error);
  }
};

  const [image, setImage] = useState<File | null>(null);

  const fetchFoods = async () => {
    try {
      const response = await API.get("/api/foods/");
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

    await API.post("/api/foods/", data);

    toast.success("Food Added");

    setShowModal(false);

    fetchFoods();

  } catch (error) {
    console.log(error);
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
      `/api/foods/${id}/`
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
      `/api/foods/${editingFood.id}/`,
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
{/* <button
onClick={() => {

setEditingFood(null);

setFormData({
name:"",
category:"",
price:"",
description:"",
});

setShowModal(true);

}}
>
+ Add Food
</button> */}
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

            {/* Content */}
            {/* <div className="p-5"> */}
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

               {/* <button
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
>
Edit
</button> */}


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

                {/* <button
onClick={() =>
deleteFood(food.id)
}
>
Delete
</button> */}

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

{/* <input
type="file"
className="mb-4"
onChange={(e)=>
setImage(
e.target.files?.[0] || null
)
}

/> */}

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

{/* {
image && (
<img
src={URL.createObjectURL(image)}
alt="preview"
className="
mt-4
h-56
w-full
object-cover
rounded-3xl
shadow-md
"
/>
)
} */}

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

// function RestaurantView() {
//   const [foods, setFoods] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchFoods = async () => {
//     try {
//       const response = await API.get("/api/foods/");
//       setFoods(response.data);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFoods();
//   }, []);

//   if (loading) {
//     return <p>Loading foods...</p>;
//   }

//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full border-collapse">
//         <thead>
//           <tr>
//             <th>Image</th>
//             <th>Item</th>
//             <th>Category</th>
//             <th>Price</th>
//           </tr>
//         </thead>

//         <tbody>
//           {foods.map((food: any) => (
//             <tr key={food.id}>
//               <td>
//                 <img
//                   src={food.image_url}
//                   alt={food.name}
//                   className="w-20 h-20 object-cover rounded"
//                 />
//               </td>

//               <td>{food.name}</td>

//               <td>{food.category}</td>

//               <td>₹{food.price}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }






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

function ReceptionistsView() {
  const [form, setForm] = useState({
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  password: "",
});
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({
  first_name: "",
  email: "",
  phone_number: "",
  password: "",
});
const validate = () => {
  const newErrors = {
    first_name: "",
    email: "",
    phone_number: "",
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
  // const createReceptionist = async () => {
  // try {
  const createReceptionist = async () => {

  if (!validate()) {
    return;
  }

  try {
    const token = localStorage.getItem("access");

    await API.post(
      "/receptionists/create/",
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Receptionist created successfully");

    setShowForm(false);

    setForm({
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      password: "",
    });

  } catch (error: any) {
  console.log(error.response?.data);
  toast.error("Failed to create receptionist");
}
};

  return (
    <div className="rounded-2xl bg-card border border-border p-8 shadow-soft text-center">
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

</div>
);
}