import { Outlet } from "react-router-dom";
import SideBar from "../components/website/SideBar";
import '../styles/studentDashboard.css';
import MenuIcon from '@mui/icons-material/Menu';
import TopBar from "../components/admin/TopBar";
import { Fragment, useEffect, useState } from "react";
import { HandleErrors } from "../utils/HandleErrors";
import { getNotifications } from "../services/notificationServices";
export default function DashboardLayout() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await getNotifications();
                setNotifications(response.filter(notification => !notification.isRead));
            } catch (error) {
                HandleErrors(error?.errors);
            }
        };

        fetchNotifications();
    }, []);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <Fragment>
            <TopBar setIsSidebarOpen={setIsSidebarOpen} notifications={notifications} isSidebarOpen={isSidebarOpen} />
            <div className='flex lg:gap-4'>
                <div className="h-screen lg:min-w-60 min-w-0 max-w-60 z-200 relative left-0  duration-1000">
                    <SideBar setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
                </div>
                <main className='relative w-full h-[85vh] mt-3'>
                    <Outlet setNotification={setNotifications} />
                </main>
            </div>
        </Fragment>
    )
}
