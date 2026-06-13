import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "./store";
import LoginPage from "./pages/LoginPage";
import ProtectedLayout from "./components/ProtectedLayout";

export default function App() {
  const user = useAppSelector((s) => s.auth.user);
  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <LoginPage />}
      />
      <Route path="/*" element={<ProtectedLayout />} />
    </Routes>
  );
}
