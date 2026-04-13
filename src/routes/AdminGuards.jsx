import { Navigate, Outlet } from "react-router-dom";
import { getToken, getUserRole } from "../services/authServices";

export default function AdminGuard() {

    const token = getToken();
    const role = getUserRole();

    if (!token) {
        return <Navigate to="/auth" replace />;
    }

    if (role !== "Admin") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}