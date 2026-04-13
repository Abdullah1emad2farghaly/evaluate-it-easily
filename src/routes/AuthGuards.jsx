import { Navigate, Outlet } from "react-router-dom";
import { getToken, getUserRole } from "../services/authServices";

export default function AuthGuard() {

    const token = getToken();
    const role = getUserRole();

    if (token) {
        if (role === "Admin") {
            return <Navigate to="/admin" replace/>;
        }
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}