import { Box, IconButton, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import { useContext } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";

export default function TopBar({setIsSidebarOpen, isSidebarOpen, notifications}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate();

    return (
        <div className="topbar w-full px-4 py-2.5 z-10 top-0 text-[#404040b3] border-b left-0 " style={{borderColor: colors.grey[900], backgroundColor: colors.blueAccent[800]}}>
            <div className="flex justify-between">
                {/* BAR icon */}
                <button 
                    className="px-2 rounded border cursor-pointer" 
                    style={{backgroundColor: colors.grey[900], borderColor: colors.grey[700], color: colors.grey[200]}}
                    onClick={()=>setIsSidebarOpen(!isSidebarOpen)}
                >
                    <MenuIcon fontSize="medium" className="hidden" />
                </button>
                {/* ICONS */}
                <div display="flex">
                    <IconButton onClick={() => {
                        colorMode.toggleColorMode();
                        localStorage.setItem("theme", theme.palette.mode === "light" ? "dark" : "light");
                    }}>
                        {theme.palette.mode === "dark" ? (
                            <LightModeOutlinedIcon />
                        ) : (
                            <DarkModeOutlinedIcon />
                        )}
                    </IconButton>
                    <IconButton>
                        <NotificationsOutlinedIcon />
                        {notifications?.length > 0 && (
                            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                                {notifications?.length}
                            </span>
                        )}
                    </IconButton>
                    <button onClick={()=> navigate("/")} className="px-4 ml-3 border border-green-500 text-green-500 hover:bg-green-500 hover:text-white cursor-pointer duration-300 py-1 rounded" >
                        Home
                    </button>
                </div>
            </div>
        </div>
    );
}
