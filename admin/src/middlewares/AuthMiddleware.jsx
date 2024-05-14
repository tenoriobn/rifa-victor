import { Outlet, Navigate, useLocation } from "react-router-dom";

export default function AuthMiddleware() {
  const isAdmin = localStorage.getItem("adminUser");
  const isAdminToken = localStorage.getItem("adminToken");

  const location = useLocation().pathname;

  if ((!isAdmin || !isAdminToken) && location != "/login") {
    localStorage.clear();
    return <Navigate to="/login" />;
  }

  if (isAdmin && isAdminToken && location === "/login") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
