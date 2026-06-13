import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { logout } from "../store/authSlice";
import toast from "react-hot-toast";

export const Navbar: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
    navigate("/login", { replace: true });
  };

  const currentPath = location.pathname;

  return (
    <nav className="sticky top-0 z-50 border-b border-c6 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 group">
          <div className="flex size-10 items-center justify-center overflow-hidden">
            <img
              src="/onlylogo.png"
              alt="Namlo-Rides Logo"
              className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </div>
          <span className="tracking-tighter text-2xl font-black bg-linear-to-r from-c1 via-c2 to-c3 text-transparent bg-clip-text">
            Namlo-Rides
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-1 rounded-full border border-c6 bg-c4/40 p-1 shadow-xs">
          <Link
            to="/"
            className={`text-xs sm:text-sm text-center font-semibold transition-all px-4 py-1.5 rounded-full ${
              currentPath === "/"
                ? "bg-c2 text-white shadow-xs pointer-events-none"
                : "text-c3 hover:bg-c5 hover:text-c2"
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/history"
            className={`text-xs sm:text-sm text-center font-semibold transition-all px-4 py-1.5 rounded-full ${
              currentPath === "/history"
                ? "bg-c2 text-white shadow-xs pointer-events-none"
                : "text-c3 hover:bg-c5 hover:text-c2"
            }`}
          >
            History
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {/* Role */}
          {user?.role && (
            <div
              className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-sm font-semibold capitalize tracking-wide transition-all ${
                user.role === "rider"
                  ? "border-c1/30 bg-c4 text-c1"
                  : "border-orange-100 bg-orange-50/60 text-orange-700"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  user.role === "rider" ? "bg-c1" : "bg-orange-500"
                } animate-pulse`}
              />
              {user.role}
            </div>
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="text-sm font-semibold text-slate-500 hover:text-red-500 cursor-pointer transition-colors px-2.5 py-1 rounded-full hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
});
