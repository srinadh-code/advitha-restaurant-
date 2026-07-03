import hotelExterior from "@/assets/hotel-exterior.jpg";
import {
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import {
  createFileRoute,
  Link,
  useNavigate,
  Navigate,
} from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";


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
  const { login, user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    if (user.role === "admin") {
      return <Navigate to="/admin" />;
    }

    if (user.role === "receptionist") {
      return <Navigate to="/receptionist" />;
    }

    return <Navigate to="/" />;
  }
  


  const submit = async (e: React.FormEvent) => {
  e.preventDefault();

  setLoading(true);

  try {
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
  } finally {
    setLoading(false);
  }
};

  const handleGoogleLogin = async (
  credentialResponse: CredentialResponse
) => {
    try {
      const response = await API.post(
        "/api/accounts/google-login/",
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

      const loggedUser = {
        id: response.data.user.id,
        email: response.data.user.email,
        first_name: response.data.user.first_name,
        last_name: response.data.user.last_name,
        role: response.data.user.role,
      };

      updateUser(loggedUser);
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
  <section className="relative min-h-screen overflow-hidden bg-[#f7f2e8]">

    {/* Background Decoration */}
    <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-yellow-400/10 blur-[120px]" />
    <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-orange-400/10 blur-[120px]" />

    <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-10">

      <div className="w-full max-w-5xl overflow-hidden rounded-[32px] border border-gold/20 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.12)]">

        <div className="grid lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div className="p-10 lg:p-14">

            <span className="rounded-full bg-gold/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Member Access
            </span>

            <h1 className="mt-6 font-display text-5xl font-bold leading-tight">
              Welcome
              <span className="block text-gold">
                Back
              </span>
            </h1>

            <p className="mt-4 text-muted-foreground">
              Login to manage bookings, explore premium rooms,
              restaurant services and tourism experiences.
            </p>

            {loading && (
              <div className="mt-5 rounded-xl border border-gold/20 bg-gold/10 px-4 py-3 text-center text-sm text-gold animate-pulse">
                Verifying credentials...
              </div>
            )}

            <form
              onSubmit={submit}
              className="mt-8 space-y-4"
            >
              <label
  htmlFor="email"
  className="mb-2 block text-sm font-medium text-foreground"
>
  Email Address
</label>

<input
  id="email"
  type="email"
  placeholder="Email Address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-gold"
/>
<label
  htmlFor="password"
  className="mb-2 block text-sm font-medium text-foreground"
>
  Password
</label>

<input
  id="password"
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-gold"
/>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Logging In...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <div className="my-6 flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() =>
                  toast.error("Google Login Failed")
                }
              />
            </div>

            <div className="flex justify-between text-sm">
              <Link
                to="/forgot-password"
                className="text-gold hover:underline"
              >
                Forgot password?
              </Link>

              <Link
                to="/signup"
                className="text-gold hover:underline"
              >
                Create account
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE */}
<div className="flex items-center justify-center bg-[#F8F3E9] p-10">

  <div className="w-full max-w-md">

    <div className="overflow-hidden rounded-3xl border border-gold/20 bg-white p-3 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
      <img
  src={hotelExterior}
  alt="Advitha Hotel"
  className="h-[500px] w-full rounded-2xl object-cover"
/>
    </div>

    <div className="mt-6 text-center">
      <p className="text-xs uppercase tracking-[0.4em] text-gold">
        Luxury Hotel & Restaurant
      </p>

      <h2 className="mt-3 font-display text-4xl font-bold text-[#2D1B0F]">
        Advitha Hotel
      </h2>

      <p className="mt-2 text-muted-foreground">
        Mulugu, Telangana
      </p>
    </div>

  </div>

</div>
          </div>

        </div>

      </div>

    
  </section>
);}

