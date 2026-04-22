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
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import BarChartIcon from '@mui/icons-material/BarChart';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CloseIcon from '@mui/icons-material/Close';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { useState } from "react";

export default function Sidebar({ setIsSidebarOpen, isSidebarOpen }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const [openMenu, setOpenMenu] = useState(false);
    const [width, setWidth] = useState("full");

    const handleSignOut = () => {
        logout();
        navigate("/auth");
    }
    const onCloseMenu = () => {
        setOpenMenu(false);
    }

    return (
        <div
            className={`bg-[#0000004d] backdrop-blur-xs w-${isSidebarOpen ? width : "0"} lg:w-0 h-full top-0 fixed`}
            onClick={(e) => {
                if (e.target == e.currentTarget) {
                    setIsSidebarOpen(!isSidebarOpen)
                }
            }}
        >
            <div className={`sidebar z-101 max-w-75 w-60 fixed min-h-screen flex flex-col top-0 -translate-x-full lg:translate-0 transition-transform  duration-1000  pb-6 pl-2 ${isSidebarOpen ? 'translate-x-0' : ''}`} style={{ backgroundColor: colors.blueAccent[800] }}>
                <div
                    className="close-icon lg:hidden p-1 rounded duration-300 border  absolute top-4 right-4 cursor-pointer"
                    style={{ backgroundColor: colors.grey[900], borderColor: colors.grey[700], color: colors.grey[200] }}
                    onClick={() => {
                        setIsSidebarOpen(!isSidebarOpen)
                        setWidth("full")
                    }}
                >
                    <CloseIcon fontSize="medium" />
                </div>
                <div className="profile flex flex-row gap-6 mt-5 px-2 items-center justify-center mb-5">
                    <div className="w-12.5 h-12.5 text-white bg-[#2da5bd] flex justify-center items-center rounded ">
                        <SchoolIcon fontSize="large" />
                    </div>
                    <p className="text-lg font-bold" style={{ color: colors.grey[300] }}>ADMINS PORTAL</p>
                </div>

                <div className="menu-items mt-4 md:mt-5 max-h-[60vh]  overflow-y-auto">
                    <button
                        onClick={() => setOpenMenu(!openMenu)}
                        className={`py-2 mb-3 cursor-pointer flex justify-between ${theme.palette.mode} items-center gap-3 rounded text-start px-3 text-lg  tracking-[1px] w-[96%]`}
                        style={{ color: colors.grey[100] }}
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
                                <li onClick={() => {
                                    setIsSidebarOpen(!isSidebarOpen)

                                }} style={{ color: colors.grey[100] }}>
                                    <NavLink style={{ color: colors.grey[100] }} className={theme.palette.mode === "dark" ? "dark" : "light"} to={"/admin"} end>
                                        <PendingActionsIcon />
                                        New Proposals
                                    </NavLink>
                                </li>
                                <li onClick={() => {
                                    setIsSidebarOpen(!isSidebarOpen)

                                }}>
                                    <NavLink style={{ color: colors.grey[100] }} className={theme.palette.mode === "dark" ? "dark" : "light"} to="indecided-proposals" end>
                                        <AccountTreeIcon />
                                        Indecided Proposals
                                    </NavLink>
                                </li>
                                
                                <li onClick={() => {
                                    setIsSidebarOpen(!isSidebarOpen)

                                }} style={{ color: colors.grey[100] }}>
                                    <NavLink style={{ color: colors.grey[100] }} className={theme.palette.mode === "dark" ? "dark" : "light"} to={'accepted-projects'}>
                                        <SwipeRightIcon />
                                        Accepted Projects
                                    </NavLink>
                                </li>
                                <li onClick={() => {
                                    setIsSidebarOpen(!isSidebarOpen)

                                }} style={{ color: colors.grey[100] }}>
                                    <NavLink style={{ color: colors.grey[100] }} className={theme.palette.mode === "dark" ? "dark" : "light"} to={"rejected-projects"}>
                                        <HourglassDisabledIcon />
                                        Rejected Projects
                                    </NavLink>
                                </li>
                                <li onClick={() => {
                                    setIsSidebarOpen(!isSidebarOpen)

                                }} style={{ color: colors.grey[100] }}>
                                    <NavLink style={{ color: colors.grey[100] }} className={theme.palette.mode === "dark" ? "dark" : "light"} to={"evaluated-projects"}>
                                        <WorkspacePremiumIcon />
                                        Evaluated Projects
                                    </NavLink>
                                </li>
                                <li onClick={() => {
                                    setIsSidebarOpen(!isSidebarOpen)

                                }} style={{ color: colors.grey[100] }}>
                                    <NavLink style={{ color: colors.grey[100] }} className={`${theme.palette.mode === "dark" ? "dark" : "light"}`} to={"historical-projects"}>
                                        <MoveDownIcon />
                                        Historical Projects
                                    </NavLink>
                                </li>
                            </ul>
                        )
                    }
                    <ul>
                        <li onClick={() => {
                            setIsSidebarOpen(!isSidebarOpen)
                            onCloseMenu()
                        }} data-aos="fade-right" data-aos-delay="800" style={{ color: colors.grey[100] }}>
                            <NavLink style={{ color: colors.grey[100] }} className={`${theme.palette.mode === "dark" ? "dark" : "light"} ml-1.5 mr-1.5 py-3.5`} to={'users'}>
                                <GroupsIcon />
                                Users
                            </NavLink>
                        </li>
                        <li onClick={() => {
                            setIsSidebarOpen(!isSidebarOpen)
                            onCloseMenu()
                        }} data-aos="fade-right" data-aos-delay="1000" style={{ color: colors.grey[100] }}>
                            <NavLink style={{ color: colors.grey[100] }} className={`${theme.palette.mode === "dark" ? "dark" : "light"} ml-1.5 mr-1.5 py-3.5`} to={'manage-teams'}>
                                <GroupsIcon />
                                Manage Teams
                            </NavLink>
                        </li>
                        <li onClick={() => {
                            setIsSidebarOpen(!isSidebarOpen)
                            onCloseMenu()
                        }} data-aos="fade-right" data-aos-delay="1400" style={{ color: colors.grey[100] }}>
                            <NavLink style={{ color: colors.grey[100] }} className={`${theme.palette.mode === "dark" ? "dark" : "light"} ml-1.5 mr-1.5 py-3.5`} to={"submission-periods"}>
                                <AccessTimeIcon />
                                Submission Periods
                            </NavLink>
                        </li>
                        <li onClick={() => {
                            setIsSidebarOpen(!isSidebarOpen)
                            onCloseMenu()
                        }} data-aos="fade-right" data-aos-delay="1400" style={{ color: colors.grey[100] }}>
                            <NavLink style={{ color: colors.grey[100] }} className={`${theme.palette.mode === "dark" ? "dark" : "light"} ml-1.5 mr-1.5 py-3.5`} to={"statistics"}>
                                <BarChartIcon />
                                Statistics
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <button onClick={handleSignOut} className={`tracking-[1.5px] font-medium cursor-pointer absolute w-[90%] bottom-3 sm:bottom-10 left-[5%] py-3 px-4 rounded-md border border-dashed border-[#4cceac] hover:bg-[#1bc698] transition-colors duration-500`}>
                    Sign Out
                </button>
            </div>
        </div>
    );
}


