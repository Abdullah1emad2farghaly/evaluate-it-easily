import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { NavLink } from "react-router-dom";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SwipeRightIcon from '@mui/icons-material/SwipeRight';
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import GroupsIcon from '@mui/icons-material/Groups';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import BarChartIcon from '@mui/icons-material/BarChart';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CloseIcon from '@mui/icons-material/Close';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { useState } from "react";
import Profile from '../admin/Profile';

export default function SideBar({ setIsSidebarOpen, isSidebarOpen }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [width, setWidth] = useState("full");

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
                    <p className="text-lg font-bold" style={{ color: colors.grey[300] }}>STUDDENT PORTAL</p>
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
                            <NavLink style={{ color: colors.grey[100] }} className={theme.palette.mode === "dark" ? "dark" : "light"} to={'proposal'}>
                                <SwipeRightIcon />
                                My Proposal
                            </NavLink>
                        </li>
                        <li onClick={() => setIsSidebarOpen(!isSidebarOpen)} data-aos="fade-right" data-aos-delay="600" style={{ color: colors.grey[100] }}>
                            <NavLink style={{ color: colors.grey[100] }} className={theme.palette.mode === "dark" ? "dark" : "light"} to={"similarity"}>
                                <MoveDownIcon />
                                Similar Projects
                            </NavLink>
                        </li>
                        <li onClick={() => setIsSidebarOpen(!isSidebarOpen)} data-aos="fade-right" data-aos-delay="800" style={{ color: colors.grey[100] }}>
                            <NavLink style={{ color: colors.grey[100] }} className={theme.palette.mode === "dark" ? "dark" : "light"} to={'group-invitations'}>
                                <InsertInvitationIcon />
                                Group Invitations
                            </NavLink>
                        </li>
                        <li onClick={() => setIsSidebarOpen(!isSidebarOpen)} data-aos="fade-right" data-aos-delay="800" style={{ color: colors.grey[100] }}>
                            <NavLink style={{ color: colors.grey[100] }} className={theme.palette.mode === "dark" ? "dark" : "light"} to={'my-invitations'}>
                                <PersonAddAltIcon />
                                My Invitations
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

                <div className={`font-medium cursor-pointer overflow-hidden relative w-[90%] -bottom-45 sm:-bottom-50 left-[5%] py-3 px-3 rounded-md border border-dashed border-green-500 transition-colors duration-500`}>
                    <Profile />
                </div>
            </div>
        </div>
    );
}
