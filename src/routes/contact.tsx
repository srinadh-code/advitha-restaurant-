


// import { createFileRoute } from "@tanstack/react-router";
// import { useState, useEffect } from "react";
// import { z } from "zod";
// import { toast } from "sonner";
// import HotelMap from "../components/HotelMap";
// import API from "@/api/api";

// import { SiteLayout } from "@/components/layout/SiteLayout";
// import { SectionHeading } from "@/components/SectionHeading";
// import { HOTEL } from "@/lib/mockData";

// import { Phone, Mail, MapPin } from "lucide-react";

// const schema = z.object({
//   name: z.string().trim().min(2, "Enter your name").max(80),
//   email: z.string().trim().email("Invalid email").max(120),
//   phone: z.string().trim().min(7, "Enter a valid phone").max(20),
//   message: z.string().trim().min(5, "Message too short").max(800),
// });

// export const Route = createFileRoute("/contact")({
//   head: () => ({
//     meta: [
//       { title: "Contact — Mulugu Hotel & Restaurant" },
//       {
//         name: "description",
//         content:
//           "Reach out to Mulugu Hotel & Restaurant — phone, email and address.",
//       },
//     ],
//   }),
//   component: ContactPage,
// });

// function ContactPage() {
//   const [loading, setLoading] = useState(false);
//   const [receptionist, setReceptionist] = useState<any>(null);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   useEffect(() => {
//   const fetchReceptionist = async () => {
//     try {
//       const res = await API.get(
//         "/api/contact/receptionist/"
//       );

//       setReceptionist(res.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   fetchReceptionist();
// }, []);

//   const onSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const res = schema.safeParse(form);

//     if (!res.success) {
//       toast.error(res.error.issues[0].message);
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await API.post("/api/contact/", {
//         name: form.name,
//         email: form.email,
//         phone: form.phone,
//         message: form.message,
//       });

//       toast.success(
//         response.data.message ||
//           "Message sent successfully"
//       );

//       setForm({
//         name: "",
//         email: "",
//         phone: "",
//         message: "",
//       });
//     } catch (error: any) {
//       console.error(error);

//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to send message"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SiteLayout>
//       <section className="container mx-auto px-4 py-14">
//         <SectionHeading
//           eyebrow="Get In Touch"
//           title="Contact Us"
//           sub="We'd love to hear from you. Reach out anytime."
//         />

//         <div className="mt-12 grid gap-10 lg:grid-cols-2">
//           {/* Contact Details */}
//           <div className="space-y-4">
//             <div className="rounded-2xl bg-card border border-border p-5 shadow-soft flex items-center gap-4">
//               <span className="grid h-10 w-10 place-items-center rounded-full gradient-gold text-gold-foreground">
//                 <Phone className="h-5 w-5" />
//               </span>

//               <div>
//                 <p className="text-xs text-muted-foreground">
//                   Phone
//                 </p>

//                 <a
//                   className="font-semibold"
//                   href={`tel:${receptionist?.phone_number || ""}`}
// >
// {receptionist?.phone_number || "Not Available"}
//                 </a>
//               </div>
//             </div>

//             <div className="rounded-2xl bg-card border border-border p-5 shadow-soft flex items-center gap-4">
//               <span className="grid h-10 w-10 place-items-center rounded-full gradient-gold text-gold-foreground">
//                 <Mail className="h-5 w-5" />
//               </span>

//               <div>
//                 <p className="text-xs text-muted-foreground">
//                   Email
//                 </p>

//                 <a
//                   className="font-semibold"
//                   href={`mailto:${receptionist?.email || ""}`}
// >
// {receptionist?.email || "Not Available"}
//                 </a>
//               </div>
//             </div>

//             <div className="rounded-2xl bg-card border border-border p-5 shadow-soft flex items-center gap-4">
//               <span className="grid h-10 w-10 place-items-center rounded-full gradient-gold text-gold-foreground">
//                 <MapPin className="h-5 w-5" />
//               </span>

//               <div>
//                 <p className="text-xs text-muted-foreground">
//                   Address
//                 </p>

//                 <p className="font-semibold">
//                   {HOTEL.address}
//                 </p>
//               </div>
//             </div>


//             <div className="h-72 w-full rounded-2xl overflow-hidden border border-border shadow-soft">
//   <HotelMap />
// </div>
//           </div>

//           {/* Contact Form */}
//           <form
//             onSubmit={onSubmit}
//             className="rounded-2xl bg-card border border-border p-6 shadow-soft space-y-4"
//           >
//             <h3 className="font-display text-2xl font-bold">
//               Send us a message
//             </h3>

//             <div>
//               <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
//                 Name
//               </label>

//               <input
//                 type="text"
//                 value={form.name}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     name: e.target.value,
//                   })
//                 }
//                 className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
//               />
//             </div>

//             <div>
//               <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
//                 Email
//               </label>

//               <input
//                 type="email"
//                 value={form.email}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     email: e.target.value,
//                   })
//                 }
//                 className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
//               />
//             </div>

//             <div>
//               <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
//                 Phone
//               </label>

//               <input
//                 type="text"
//                 value={form.phone}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     phone: e.target.value,
//                   })
//                 }
//                 className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
//               />
//             </div>

//             <div>
//               <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
//                 Message
//               </label>

//               <textarea
//                 rows={5}
//                 value={form.message}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     message: e.target.value,
//                   })
//                 }
//                 className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="rounded-md gradient-gold px-6 py-2.5 text-sm font-semibold text-gold-foreground shadow-soft disabled:opacity-50"
//             >
//               {loading ? "Sending..." : "Send Message"}
//             </button>
//           </form>
//         </div>
//       </section>
//     </SiteLayout>
//   );
// }





import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { toast } from "sonner";
import HotelMap from "../components/HotelMap";
import API from "@/api/api";

import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { HOTEL } from "@/lib/mockData";

import { Phone, Mail, MapPin } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().email("Invalid email").max(120),
  phone: z.string().trim().min(7, "Enter a valid phone").max(20),
  message: z.string().trim().min(5, "Message too short").max(800),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Mulugu Hotel & Restaurant" },
      {
        name: "description",
        content:
          "Reach out to Mulugu Hotel & Restaurant — phone, email and address.",
      },
    ],
  }),
  component: ContactPage,
});

interface Receptionist {
  phone_number: string;
  email: string;
}
function ContactPage() {
  const [loading, setLoading] = useState(false);
  // const [receptionist, setReceptionist] = useState<any>(null);
  const [receptionist, setReceptionist] =
  useState<Receptionist | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
  const fetchReceptionist = async () => {
    try {
      const res = await API.get(
        "/api/contact/receptionist/"
      );

      setReceptionist(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchReceptionist();
}, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = schema.safeParse(form);

    if (!res.success) {
      toast.error(res.error.issues[0].message);
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/api/contact/", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
      });

      toast.success(
        response.data.message ||
          "Message sent successfully"
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to send message"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-14">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Contact Us"
          sub="We'd love to hear from you. Reach out anytime."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {/* Contact Details */}
          <div className="space-y-4">
            <div className="rounded-2xl bg-card border border-border p-5 shadow-soft flex items-center gap-4">
              <span className="grid h-10 w-10 place-items-center rounded-full gradient-gold text-gold-foreground">
                <Phone className="h-5 w-5" />
              </span>

              <div>
                <p className="text-xs text-muted-foreground">
                  Phone
                </p>

                {/* <a
                  className="font-semibold"
                  href={`tel:${receptionist?.phone_number || "Not Available"}`}
>
{receptionist?.phone_number || "Not Available"}
                </a> */}
                <a
              className="font-semibold"
              href={`tel:${receptionist?.phone_number || HOTEL.phone}`}
              >
            {receptionist?.phone_number || HOTEL.phone}
            </a>
              </div>
            </div>

            <div className="rounded-2xl bg-card border border-border p-5 shadow-soft flex items-center gap-4">
              <span className="grid h-10 w-10 place-items-center rounded-full gradient-gold text-gold-foreground">
                <Mail className="h-5 w-5" />
              </span>

              <div>
                <p className="text-xs text-muted-foreground">
                  Email
                </p>

                {/* <a
                  className="font-semibold"
                  href={`mailto:${receptionist?.email || ""}`}
>
{receptionist?.email || "Not Available"}
                </a> */}
                <a
  className="font-semibold"
  href={`mailto:${receptionist?.email || HOTEL.email}`}
>
  {receptionist?.email || HOTEL.email}
</a>
              </div>
            </div>

            <div className="rounded-2xl bg-card border border-border p-5 shadow-soft flex items-center gap-4">
              <span className="grid h-10 w-10 place-items-center rounded-full gradient-gold text-gold-foreground">
                <MapPin className="h-5 w-5" />
              </span>

              <div>
                <p className="text-xs text-muted-foreground">
                  Address
                </p>

                <p className="font-semibold">
                  {HOTEL.address}
                </p>
              </div>
            </div>


            <div className="h-72 w-full rounded-2xl overflow-hidden border border-border shadow-soft">
  <HotelMap />
</div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={onSubmit}
            className="rounded-2xl bg-card border border-border p-6 shadow-soft space-y-4"
          >
            <h3 className="font-display text-2xl font-bold">
              Send us a message
            </h3>

            <div>
              
              <label
  htmlFor="name"
  className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
>
  Name
</label>

              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>

              <label
  htmlFor="email"
  className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
>
  Email
</label>


              <input
              id="email"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label htmlFor="phone" 
               className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Phone
              </label>

              <input
                id="phone"
                type="text"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label htmlFor="message" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Message
              </label>

              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) =>
                  setForm({
                    ...form,
                    message: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="rounded-md gradient-gold px-6 py-2.5 text-sm font-semibold text-gold-foreground shadow-soft disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}