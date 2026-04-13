import { Outlet } from "react-router-dom";
import SideBar from "../components/website/SideBar";
import '../styles/studentDashboard.css';
import MenuIcon from '@mui/icons-material/Menu';
export default function DashboardLayout() {
    return (
        <div className='grid grid-cols-16 relative gap-5 pt-0'>
            <div className="lg:col-span-3 lg:block hidden relative ">
            </div>
            <SideBar />
            <main className='relative col-span-16 lg:col-span-13 p-0 m-0'>
                <Outlet />
            </main>
        </div>
    )
}
