import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import API from "@/api/api";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/reset-password")({
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    otp: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {
      email: "",
      otp: "",
      password: "",
    };

    let isValid = true;

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!otp.trim()) {
      newErrors.otp = "OTP is required";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 4) {
      newErrors.password =
        "Password must be more than 3 characters";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const submit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      await API.post(
        "/reset-password/",
        {
          email,
          otp,
          password,
        }
      );

      toast.success(
        "Password reset successfully"
      );

      navigate({
        to: "/login",
      });

    } catch (error: any) {
      toast.error(
        error.response?.data?.error ||
        "Failed to reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout>
      <section className="container mx-auto grid place-items-center px-4 py-20">
        <div className="w-full max-w-md rounded-2xl bg-card border border-border p-8 shadow-luxury">

          <h1 className="font-display text-3xl font-bold">
            Reset Password
          </h1>

          <form
            onSubmit={submit}
            className="mt-6 space-y-4"
          >

            <div>
              <input
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <input
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value)
                }
              />

              {errors.otp && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.otp}
                </p>
              )}
            </div>

            <div>
              <input
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="New Password"
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              disabled={loading}
              className="w-full rounded-md gradient-gold py-2.5 text-sm font-semibold text-gold-foreground shadow-soft"
            >
              {loading
                ? "Resetting..."
                : "Reset Password"}
            </button>

          </form>

        </div>
      </section>
    </SiteLayout>
  );
}