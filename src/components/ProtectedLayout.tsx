import { useFirebaseSync } from "../hooks/useFirebaseSync";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "../store";
import { Navbar } from "./Navbar";
import DashboardPage from "../pages/DashboardPage";
import HistoryPage from "../pages/HistoryPage";

export default function ProtectedLayout() {
  const user = useAppSelector((s) => s.auth.user);

  useFirebaseSync(!!user);
  if (!user) return <Navigate to="/login" replace />;
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </div>
  );
}
