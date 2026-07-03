import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign Up — Mulugu Hotel" }, { name: "description", content: "Create your Mulugu Hotel account." }]}),
  component: SignupPage,
});

function SignupPage() {
  return <SiteLayout><Inner /></SiteLayout>;
}

function Inner() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [f, setF] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  
const [loading, setLoading] = useState(false);
  const validate = () => {
    const newErrors = {
      name: "",
      email: "",
      password: "",
    };

    let isValid = true;

    if (!f.name.trim()) {
      newErrors.name = "Full name is required";
      isValid = false;
    } else if (f.name.trim().length < 3) {
      newErrors.name = "Full name must be at least 3 characters";
      isValid = false;
    }

    if (!f.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)
    ) {
      newErrors.email = "Enter a valid email address";
      isValid = false;
    }

if (!f.password) {
  newErrors.password = "Password is required";
  isValid = false;
} else if (
  !/^(?=.*[^A-Za-z])(?=.{8,})/.test(f.password)
) {
  newErrors.password =
    "Password must be at least 8 characters and contain at least one non-letter character.";
  isValid = false;
}

    setErrors(newErrors);
    return isValid;
  };

  const submit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (loading) return;

  if (!validate()) return;

  setLoading(true);

  try {
    const r = await signup(
      f.name,
      f.email,
      f.password
    );

    if (!r.ok) {
      toast.error(r.error || "Signup failed");
      return;
    }

    toast.success("Account created!");
    navigate({ to: "/login" });
  } finally {
    setLoading(false);
  }
};
   

  return (
    <section className="container mx-auto grid place-items-center px-4 py-20">
      <div className="w-full max-w-md rounded-2xl bg-card border border-border p-8 shadow-luxury">
        <h1 className="font-display text-3xl font-bold">
          Create Account
        </h1>

        <form
          onSubmit={submit}
          className="mt-6 space-y-4"
        >
          {/* Full Name */}
          <div>
            <label
    htmlFor="name"
    className="mb-1 block text-sm font-medium"
  >
    Full Name
  </label>
            <input
              id="name"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="user name"
              value={f.name}
              onChange={(e) => {
                setF({
                  ...f,
                  name: e.target.value,
                });

                setErrors({
                  ...errors,
                  name: "",
                });
              }}
            />

            {errors.name && (
              <p className="mt-1 text-xs text-red-500">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
    htmlFor="email"
    className="mb-1 block text-sm font-medium"
  >
    Email
  </label>
            <input
              id="email"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="abc@gmail.com"
              type="email"
              value={f.email}
              onChange={(e) => {
                setF({
                  ...f,
                  email: e.target.value,
                });

                setErrors({
                  ...errors,
                  email: "",
                });
              }}
            />

            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
    htmlFor="password"
    className="mb-1 block text-sm font-medium"
  >
    Password
  </label>
            <input
              id="password"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="abcde@123"
              type="password"
              value={f.password}
              onChange={(e) => {
                setF({
                  ...f,
                  password: e.target.value,
                });

                setErrors({
                  ...errors,
                  password: "",
                });
              }}
            />

            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password}
              </p>
            )}
          </div>

          <button
  type="submit"
  disabled={loading}
  className="w-full rounded-md gradient-gold py-2.5 text-sm font-semibold text-gold-foreground shadow-soft disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading ? "Signing Up..." : "Sign Up"}
</button>
        </form>

        <p className="mt-4 text-center text-sm">
          Have an account?{" "}
          <Link
            to="/login"
            className="text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}