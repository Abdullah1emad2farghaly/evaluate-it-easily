import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { NavLink, useNavigate } from "react-router-dom";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SwipeRightIcon from '@mui/icons-material/SwipeRight';
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import GroupsIcon from '@mui/icons-material/Groups';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SchoolIcon from '@mui/icons-material/School';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; 
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useState } from "react";

export default function SideBar() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    return (
        <div className={`sidebar z-101 max-w-[300px] w-[240px] fixed h-full flex flex-col top-0 -left-[240px] lg:left-0  duration-1000 pt-5 pb-6 pl-2 ${isSidebarOpen ? 'left-0' : ''}`} style={{ backgroundColor: colors.blueAccent[800] }}>
            <div className="close-icon  lg:hidden bg-[#43afb7] rounded duration-300 hover:bg-[#4ccece] border border-[#43afb7] absolute top-3 -right-6 cursor-pointer" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                {
                    isSidebarOpen ? <ArrowBackIosNewIcon fontSize="medium" style={{ color: colors.grey[100] }} /> : <ArrowForwardIosIcon fontSize="small" style={{ color: colors.grey[100] }} />
                }
            </div>


            <div className="profile flex flex-row gap-6 mt-10 px-4 items-center justify-center mb-5">
                <div className="w-15 h-12.5 text-white bg-[#43afb7] flex justify-center items-center rounded ">
                    <SchoolIcon fontSize="large"/>
                </div>
                <p className="text-lg font-bold" style={{color: colors.grey[300]}}>STUDENT PORTAL</p>
            </div>

            <div className="menu-items">
                <ul className="list-none p-0 mt-8">
                    <li onClick={() => setIsSidebarOpen(!isSidebarOpen)} data-aos="fade-right" data-aos-delay="0">
                        <NavLink style={{ color: colors.grey[100] }} className={theme.palette.mode === "dark" ? "dark" : "light"} to="" end>
                            <GroupsIcon />
                            MY Group
                        </NavLink>
                    </li>
                    <li onClick={() => setIsSidebarOpen(!isSidebarOpen)} data-aos="fade-right" data-aos-delay="200" style={{ color: colors.grey[100] }}>
                        <NavLink style={{ color: colors.grey[100] }} className={theme.palette.mode === "dark" ? "dark" : "light"} to={'create-proposal'}>
                            <SwipeRightIcon />
                            Create Proposal
                        </NavLink>
                    </li>
                    <li onClick={() => setIsSidebarOpen(!isSidebarOpen)} data-aos="fade-right" data-aos-delay="600" style={{ color: colors.grey[100] }}>
                        <NavLink style={{ color: colors.grey[100] }} className={theme.palette.mode === "dark" ? "dark" : "light"} to={"similarity"}>
                            <MoveDownIcon />
                            Similar Projects
                        </NavLink>
                    </li>
                    <li onClick={() => setIsSidebarOpen(!isSidebarOpen)} data-aos="fade-right" data-aos-delay="800" style={{ color: colors.grey[100] }}>
                        <NavLink style={{ color: colors.grey[100] }} className={theme.palette.mode === "dark" ? "dark" : "light"} to={'notifications'}>
                            <NotificationsActiveIcon />
                            Notifications
                        </NavLink>
                    </li>
                    
                </ul>
            </div>
            <button onClick={()=>navigate('/')} className={`tracking-[1.5px] font-[500] cursor-pointer absolute w-[90%] bottom-[40px] left-[5%] py-3 px-4 rounded-md border border-dashed border-[#4cceac] hover:bg-[#1bc698] transition-colors duration-500`}>
                Home
            </button>
        </div>
    );
}