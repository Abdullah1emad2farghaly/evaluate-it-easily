import { Box, IconButton, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import { useContext } from "react";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

export default function TopBar() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    return (
        <div className="topbar w-full lg:px-0 px-2">
            <Box
                display="flex"
                justifyContent="space-between"
                py={2}
            >
                {/* SEARCH BAR */}
                <Box
                display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="3px"
                >
                    <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                    <IconButton type="button" sx={{ p: 1 }}>
                        <SearchIcon />
                    </IconButton>
                </Box>
                {/* ICONS */}
                <Box display="flex">
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
                </Box>
            </Box>
        </div>
    );
}
