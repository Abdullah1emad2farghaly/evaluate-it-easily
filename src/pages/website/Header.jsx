import { NavLink } from 'react-router-dom'
import { logout } from '../../services/authServices';
import LogoutIcon from '@mui/icons-material/Logout';
import { ColorModeContext, tokens } from '../../theme';
import { useContext } from 'react';
import { useTheme } from '@emotion/react';
import { IconButton } from '@mui/material';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";


export default function Header({ classes, bg }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const handleSignOut = () => {
        logout();
    }

    return (
        <header className={classes} style={{ backgroundColor: bg }}>
            <nav className="w-full h-full max-w-[98%] mr-1 sm:max-w-[80%] sm:mx-auto flex justify-between items-center">
                <img src="/assets/logo1.png" className=" h-[30px] sm:h-[40px]" alt="logo" />
                <ul className="flex sm:space-x-3 space-x-1 items-center">
                    
                    <li> 
                        <NavLink to={'/dashboard'} title="student dashboard" className={"hover:bg-green-500 transition-colors duration-500 px-3 py-2 text-white"} >Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={handleSignOut} to={"/auth"} title="Logout" className={"bg-red-600 px-[10px] hover:bg-red-500 py-2 text-white transition-colors duration-500"}>
                            <LogoutIcon />
                        </NavLink>
                    </li>
                    <li>
                        <button 
                            className='cursor-pointer rounded px-2 py-1'  
                            onClick={()=>{
                                colorMode.toggleColorMode()
                                localStorage.setItem("theme", theme.palette.mode === "light" ? "dark" : "light");
                            }} 
                            style={{backgroundColor: colors.grey[700]}}>
                            {theme.palette.mode === "dark" ? (
                                <LightModeOutlinedIcon />
                            ) : (
                                <DarkModeOutlinedIcon />
                            )}
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
