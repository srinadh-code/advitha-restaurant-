import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import API from "@/api/api";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/verify-otp")({
  component: VerifyOTPPage,
});

function VerifyOTPPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    otp: "",
  });

  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {
      email: "",
      otp: "",
    };

    let isValid = true;

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!otp.trim()) {
      newErrors.otp = "OTP is required";
      isValid = false;
    } else if (otp.length !== 6) {
      newErrors.otp = "OTP must be 6 digits";
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
        "/api/accounts/verify-otp/",
        {
          email,
          otp,
        }
      );

      toast.success(
        "OTP verified successfully"
      );

      navigate({
        to: "/reset-password",
      });

    } catch (error: any) {
      toast.error(
        error.response?.data?.error ||
        "Invalid OTP"
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
            Verify OTP
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Enter the OTP sent to your email.
          </p>

          <form
            onSubmit={submit}
            className="mt-6 space-y-4"
          >

            <div>
              <input
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);

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

            <div>
              <input
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);

                  setErrors({
                    ...errors,
                    otp: "",
                  });
                }}
              />

              {errors.otp && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.otp}
                </p>
              )}
            </div>

            <button
              disabled={loading}
              className="w-full rounded-md gradient-gold py-2.5 text-sm font-semibold text-gold-foreground shadow-soft"
            >
              {loading
                ? "Verifying..."
                : "Verify OTP"}
            </button>

          </form>
        </div>
      </section>
    </SiteLayout>
  );
}