import { useState } from "react";
import { Car, EyeIcon, EyeOffIcon, LoaderIcon, User } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import type { AuthUser, UserRole } from "../types";
import { CREDENTIALS } from "../lib/constants";
import { useAppDispatch } from "../store";

function LoginPage() {
  const [formData, setFormData] = useState<AuthUser>({
    email: "",
    password: "",
    role: "rider",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    await new Promise((r) => setTimeout(r, 400)); // simulate latency

    if (
      formData.email.trim() !== CREDENTIALS.email ||
      formData.password !== CREDENTIALS.password
    ) {
      toast.error("Invalid email or password.");
      setIsLoading(false);
      return;
    }

    dispatch(login(formData));
    setIsLoading(false);

    toast.success("Logged in successfully");
    navigate("/", { replace: true });
  };

  const roles: UserRole[] = ["rider", "driver"];

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl border border-gray-100 p-8">
        {/* Header */}
        <div className="flex flex-col w-full justify-center items-center">
          <img
            src="/logonobg.webp"
            alt="Company Logo"
            className="w-full max-w-36 h-auto object-cover"
          />
          <p className="text-sm text-gray-500">
            Sign in to continue your journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Email */}
          <div>
            <label className="text-xs font-semibold text-gray-700">Email</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-semibold text-gray-700">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-500 transition pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <EyeOffIcon className="size-5" />
                ) : (
                  <EyeIcon className="size-5" />
                )}
              </button>
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="text-xs font-semibold text-gray-700">
              Sign in as
            </label>

            <div className="grid grid-cols-2 gap-3">
              {roles.map((role) => {
                const selected = formData.role === role;

                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setFormData({ ...formData, role })}
                    className={`flex flex-col items-center justify-center gap-1 rounded-xl border px-4 py-4 transition
                      ${
                        selected
                          ? "border-sky-500 bg-sky-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                  >
                    {role === "rider" ? (
                      <User
                        className={`size-6 ${
                          selected ? "text-sky-600" : "text-gray-500"
                        }`}
                      />
                    ) : (
                      <Car
                        className={`size-6 ${
                          selected ? "text-orange-500" : "text-gray-500"
                        }`}
                      />
                    )}

                    <span className="text-sm font-medium capitalize">
                      {role}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-linear-to-r from-c1 via-c2 to-c3 border border-c6 text-white py-2.5 text-sm font-semibold hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center"
          >
            {isLoading ? (
              <LoaderIcon className="size-5 animate-spin" />
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="text-center text-xs text-slate-400 mt-4">
          Demo: intern@namlotech.com / namlo2026
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
