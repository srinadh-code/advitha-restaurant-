// import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
// import { useState } from "react";
// import { toast } from "sonner";

// import API from "@/api/api";
// import { SiteLayout } from "@/components/layout/SiteLayout";

// export const Route = createFileRoute("/forgot-password")({
//   head: () => ({
//     meta: [
//       {
//         title: "Forgot Password — Mulugu Hotel",
//       },
//       {
//         name: "description",
//         content: "Reset your password",
//       },
//     ],
//   }),

//   component: Page,
// });

// function Page() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [error, setError] = useState("");

//   const submit = async (
//     e: React.FormEvent
//   ) => {
//     e.preventDefault();

//     setError("");

//     if (!email.trim()) {
//       setError("Email is required");
//       return;
//     }

//     const emailRegex =
//       /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailRegex.test(email)) {
//       setError("Enter a valid email");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await API.post(
//         "/api/accounts/forgot-password/",
//         {
//           email,
//         }
//       );

//       toast.success(
//         response.data.message ||
//           "OTP sent successfully"
//       );

//       navigate({
//         to: "/verify-otp",
//         search: {
//           email,
//         },
//       });
//     } catch (error: any) {
//       toast.error(
//         error.response?.data?.error ||
//           "Failed to send OTP"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SiteLayout>
//       <section className="container mx-auto grid place-items-center px-4 py-20">
//         <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-luxury">
//           <h1 className="font-display text-3xl font-bold">
//             Forgot Password
//           </h1>

//           <p className="mt-1 text-sm text-muted-foreground">
//             Enter your email address to
//             receive an OTP.
//           </p>

//           <form
//             onSubmit={submit}
//             className="mt-6 space-y-4"
//           >
//             <div>
//               <input
//                 className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
//                 placeholder="Email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => {
//                   setEmail(
//                     e.target.value
//                   );
//                   setError("");
//                 }}
//               />

//               {error && (
//                 <p className="mt-1 text-xs text-red-500">
//                   {error}
//                 </p>
//               )}
//             </div>

//             <button
//               disabled={loading}
//               className="w-full rounded-md gradient-gold py-2.5 text-sm font-semibold text-gold-foreground shadow-soft"
//             >
//               {loading
//                 ? "Sending OTP..."
//                 : "Send OTP"}
//             </button>
//           </form>

//           <p className="mt-4 text-center text-sm">
//             <Link
//               to="/login"
//               className="text-primary hover:underline"
//             >
//               Back to Login
//             </Link>
//           </p>
//         </div>
//       </section>
//     </SiteLayout>
//   );
// }





import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import API from "@/api/api";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      {
        title: "Forgot Password — Mulugu Hotel",
      },
      {
        name: "description",
        content: "Reset your password",
      },
    ],
  }),

  component: Page,
});

function Page() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const submit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Enter a valid email");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post(
        "/api/accounts/forgot-password/",
        {
          email,
        }
      );

      toast.success(
        response.data.message ||
          "OTP sent successfully"
      );

      navigate({
        to: "/verify-otp",
        search: {
          email,
        },
      });
    } catch (error: any) {
      toast.error(
        error.response?.data?.error ||
          "Failed to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout>
      <section className="container mx-auto grid place-items-center px-4 py-20">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-luxury">
          <h1 className="font-display text-3xl font-bold">
            Forgot Password
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Enter your email address to
            receive an OTP.
          </p>

          <form
            onSubmit={submit}
            className="mt-6 space-y-4"
          >
            <div>
              <label
    htmlFor="email"
    className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
  >
    Email
  </label>
              <input
              id="email"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(
                    e.target.value
                  );
                  setError("");
                }}
              />

              {error && (
                <p className="mt-1 text-xs text-red-500">
                  {error}
                </p>
              )}
            </div>

            <button
              disabled={loading}
              className="w-full rounded-md gradient-gold py-2.5 text-sm font-semibold text-gold-foreground shadow-soft"
            >
              {loading
                ? "Sending OTP..."
                : "Send OTP"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            <Link
              to="/login"
              className="text-primary hover:underline"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}