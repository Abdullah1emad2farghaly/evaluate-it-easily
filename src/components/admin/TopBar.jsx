import { Box, IconButton, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import { useContext } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuIcon from '@mui/icons-material/Menu';

export default function TopBar({setIsSidebarOpen, isSidebarOpen}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    return (
        <div className="topbar w-full px-4 py-1.5 z-10 top-0 text-[#404040b3] border-b left-0 " style={{borderColor: colors.grey[800], backgroundColor: colors.blueAccent[800]}}>
            <div className="flex justify-between">
                {/* BAR icon */}
                <button 
                    className="px-2 rounded border cursor-pointer" 
                    style={{backgroundColor: colors.grey[900], borderColor: colors.grey[700], color: colors.grey[200]}}
                    onClick={()=>setIsSidebarOpen(!isSidebarOpen)}
                >
                    <MenuIcon fontSize="medium" />
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
                    </IconButton>
                    <IconButton>
                        <SettingsOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <PersonOutlinedIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}
