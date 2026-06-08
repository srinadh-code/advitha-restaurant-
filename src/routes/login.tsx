// import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
// import { useState } from "react";
// import { toast } from "sonner";
// import { SiteLayout } from "@/components/layout/SiteLayout";
// import { useAuth } from "@/lib/auth";
// import { DEMO_USERS } from "@/lib/mockData";
// import { GoogleLogin } from "@react-oauth/google";
// import API from "@/api/api";
// export const Route = createFileRoute("/login")({
//   head: () => ({ meta: [{ title: "Login — Mulugu Hotel" }, { name: "description", content: "Login to your Mulugu Hotel account." }]}),
//   component: LoginPage,
// });

// function LoginPage() {
//   return (
//     <SiteLayout>
//       <Inner />
//     </SiteLayout>
//   );
// }

// function Inner() {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const submit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   const r = await login(email, password);

//   if (!r.ok) {
//     toast.error(r.error || "Login failed");
//     return;
//   }

//   toast.success("Welcome back!");

//   if (r.role === "admin") {
//     navigate({ to: "/admin" });
//   } else if (r.role === "receptionist") {
//     navigate({ to: "/receptionist" });
//   } else {
//     navigate({ to: "/" });
//   }
// };

//   return (
//     <section className="container mx-auto grid place-items-center px-4 py-20">
//       <div className="w-full max-w-md rounded-2xl bg-card border border-border p-8 shadow-luxury">
//         <h1 className="font-display text-3xl font-bold">Welcome Back</h1>
//         <p className="mt-1 text-sm text-muted-foreground">Login to your account</p>
//         <form onSubmit={submit} className="mt-6 space-y-4">
//           <input className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//           <input className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//           <button className="w-full rounded-md gradient-gold py-2.5 text-sm font-semibold text-gold-foreground shadow-soft">Login</button>
//         </form>
//         <div className="mt-4 flex justify-between text-sm">
//           <Link to="/forgot-password" className="text-primary hover:underline">Forgot password?</Link>
//           <Link to="/signup" className="text-primary hover:underline">Create account</Link>
//         </div>
     
//       </div>
//     </section>
//   );
// }



import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";

import { SiteLayout } from "@/components/layout/SiteLayout";
import { useAuth } from "@/lib/auth";
import API from "@/api/api";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — Mulugu Hotel" },
      {
        name: "description",
        content: "Login to your Mulugu Hotel account.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <SiteLayout>
      <Inner />
    </SiteLayout>
  );
}

function Inner() {
  const { login, setUser } = useAuth();
  // const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const r = await login(email, password);

    if (!r.ok) {
      toast.error(r.error || "Login failed");
      return;
    }

    toast.success("Welcome back!");

    if (r.role === "admin") {
      navigate({ to: "/admin" });
    } else if (r.role === "receptionist") {
      navigate({ to: "/receptionist" });
    } else {
      navigate({ to: "/" });
    }
  };

  const handleGoogleLogin = async (
    credentialResponse: any
  ) => {
    try {
      const response = await API.post(
        "/google-login/",
        {
          token: credentialResponse.credential,
        }
      );

      localStorage.setItem(
        "access",
        response.data.access
      );

      localStorage.setItem(
        "refresh",
        response.data.refresh
      );

      localStorage.setItem(
        "mulugu.auth",
        JSON.stringify(response.data.user)
      );
      // window.location.reload();

      toast.success(
        `Welcome ${response.data.user.first_name || ""}`
      );

      if (response.data.user.role === "admin") {
        navigate({ to: "/admin" });
      } else if (
        response.data.user.role === "receptionist"
      ) {
        navigate({ to: "/receptionist" });
      } else {
        navigate({ to: "/" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Google Login Failed");
    }
  };

  return (
    <section className="container mx-auto grid place-items-center px-4 py-20">
      <div className="w-full max-w-md rounded-2xl bg-card border border-border p-8 shadow-luxury">
        <h1 className="font-display text-3xl font-bold">
          Welcome Back
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Login to your account
        </p>

        <form
          onSubmit={submit}
          className="mt-6 space-y-4"
        >
          <input
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button className="w-full rounded-md gradient-gold py-2.5 text-sm font-semibold text-gold-foreground shadow-soft">
            Login
          </button>
        </form>

        <div className="my-6 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
              toast.error(
                "Google Login Failed"
              );
            }}
          />
        </div>

        <div className="mt-4 flex justify-between text-sm">
          <Link
            to="/forgot-password"
            className="text-primary hover:underline"
          >
            Forgot password?
          </Link>

          <Link
            to="/signup"
            className="text-primary hover:underline"
          >
            Create account
          </Link>
        </div>
      </div>
    </section>
  );
}