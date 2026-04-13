import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { NavLink, useNavigate } from "react-router-dom";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SwipeRightIcon from '@mui/icons-material/SwipeRight';
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import GroupsIcon from '@mui/icons-material/Groups';
import { logout } from "../../services/authServices";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import BarChartIcon from '@mui/icons-material/BarChart';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

import { useState } from "react";

export default function Sidebar() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    const handleSignOut = () => {
        logout();
        navigate("/auth");
    }

    return (
        <div className={`sidebar z-101 max-w-[300px] w-[240px] fixed h-full flex flex-col top-0 -left-[240px] lg:left-0  duration-1000 pt-5 pb-6 pl-2 ${isSidebarOpen ? 'left-0' : ''}`} style={{ backgroundColor: colors.blueAccent[800] }}>
            <div className="close-icon lg:hidden bg-[#43afb7] rounded duration-300 hover:bg-[#4ccece] border border-[#43afb7] absolute top-3 -right-6 cursor-pointer" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                {
                    isSidebarOpen ? <ArrowBackIosNewIcon fontSize="medium" style={{ color: colors.grey[100] }} /> : <ArrowForwardIosIcon fontSize="small" style={{ color: colors.grey[100] }} />
                }
            </div>
            <h2 className="text-3xl font-medium mb-5">ADMINIS</h2>
            <div className="profile mt-5 flex gap-4 items-center">
                <img className="w-[70px] h-[70px] rounded-full" src="/assets/user.png" alt="profile image" />
                <div>
                    <h3 className="mt-2 font-medium text-xl">ED Roh</h3>
                    <p className="text-[#4cceac]" style={{ color: colors.greenAccent[500] }}>VP Fancy Admin</p>
                </div>
            </div>

            <div className="menu-items mt-8 md:max-h-80 sm:max-h-50  overflow-y-auto">
                <button 
                    onClick={() => setOpenMenu(!openMenu)} 
                    className={`py-2 mb-3 cursor-pointer flex justify-between ${theme.palette.mode} items-center gap-3 rounded text-start px-3 text-lg  tracking-[1px] w-[96%]`} 
                    style={{color: colors.grey[100]}}
                >
                    <div className="flex gap-4 items-center">
                        <FolderCopyIcon />Projects
                    </div>
                    <div className={`${openMenu ? "rotate-450" : "rotate-0"} transition-transform duration-200`}>
                        <ArrowForwardIosIcon fontSize="small" />
                    </div>
                </button>
                {
                    openMenu && (
                        <ul className="list-none p-0 mb-3">
                            <li onClick={() => setIsSidebarOpen(!isSidebarOpen)} data-aos-delay="0">
                                <NavLink style={{ color: colors.grey[100] }} className={theme.palette.mode === "dark" ? "dark" : "light"} to="/admin" end>
                                    <AccountTreeIcon />
                                    Similar Projects
                                </NavLink>
                            </li>
                            <li onClick={() => setIsSidebarOpen(!isSidebarOpen)} data-aos-delay="200" style={{ color: colors.grey[100] }}>
                                <NavLink style={{ color: colors.grey[100] }} className={theme.palette.mode === "dark" ? "dark" : "light"} to={'accepted-projects'}>
                                    <SwipeRightIcon />
                                    Accepted Projects
                                </NavLink>
                            </li>
                            <li onClick={() => setIsSidebarOpen(!isSidebarOpen)} data-aos-delay="400" style={{ color: colors.grey[100] }}>
                                <NavLink style={{ color: colors.grey[100] }} className={theme.palette.mode === "dark" ? "dark" : "light"} to={"rejected-projects"}>
                                    <HourglassDisabledIcon />
                                    Rejected Projects
                                </NavLink>
                            </li>
                            <li onClick={() => setIsSidebarOpen(!isSidebarOpen)} data-aos-delay="600" style={{ color: colors.grey[100] }}>
                                <NavLink style={{ color: colors.grey[100] }} className={theme.palette.mode === "dark" ? "dark" : "light"} to={"pending-projects"}>
                                    <PendingActionsIcon />
                                    Pending Projects
                                </NavLink>
                            </li>
                            <li onClick={() => setIsSidebarOpen(!isSidebarOpen)} data-aos-delay="600" style={{ color: colors.grey[100] }}>
                                <NavLink style={{ color: colors.grey[100] }} className={theme.palette.mode === "dark" ? "dark" : "light"} to={"evaluated-projects"}>
                                    <WorkspacePremiumIcon />
                                    Evaluated Projects
                                </NavLink>
                            </li>
                        </ul>
                    )
                }
                <ul>
                    <li onClick={() => setIsSidebarOpen(!isSidebarOpen)} data-aos="fade-right" data-aos-delay="800" style={{ color: colors.grey[100] }}>
                        <NavLink style={{ color: colors.grey[100] }} className={`${theme.palette.mode === "dark" ? "dark" : "light"} ml-[5px] mr-[5px] py-3.5`} to={'users'}>
                            <GroupsIcon />
                            Users
                        </NavLink>
                    </li>
                    <li onClick={() => setIsSidebarOpen(!isSidebarOpen)} data-aos="fade-right" data-aos-delay="1000" style={{ color: colors.grey[100] }}>
                        <NavLink style={{ color: colors.grey[100] }} className={`${theme.palette.mode === "dark" ? "dark" : "light"} ml-[5px] mr-[5px] py-3.5`} to={'manage-teams'}>
                            <GroupsIcon />
                            Manage Teams
                        </NavLink>
                    </li>
                    <li onClick={() => setIsSidebarOpen(!isSidebarOpen)} data-aos="fade-right" data-aos-delay="1200" style={{ color: colors.grey[100] }}>
                        <NavLink style={{ color: colors.grey[100] }} className={`${theme.palette.mode === "dark" ? "dark" : "light"} ml-[5px] mr-[5px] py-3.5`}  to={"historical-projects"}>
                            <MoveDownIcon />
                            Historical Projects
                        </NavLink>
                    </li>
                    <li onClick={() => setIsSidebarOpen(!isSidebarOpen)} data-aos="fade-right" data-aos-delay="1400" style={{ color: colors.grey[100] }}>
                        <NavLink style={{ color: colors.grey[100] }} className={`${theme.palette.mode === "dark" ? "dark" : "light"} ml-[5px] mr-[5px] py-3.5`}  to={"statistics"}>
                            <BarChartIcon />
                            Statistics
                        </NavLink>
                    </li>
                </ul>
            </div>

            <button onClick={handleSignOut} className={`tracking-[1.5px] font-[500] cursor-pointer absolute w-[90%] bottom-[40px] left-[5%] py-3 px-4 rounded-md border border-dashed border-[#4cceac] hover:bg-[#1bc698] transition-colors duration-500`}>
                Sign Out
            </button>
        </div>
    );
}


