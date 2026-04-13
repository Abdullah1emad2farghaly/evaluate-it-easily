import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import AdminRoutes from "./routes/AdminRoutes";
import WebsiteRoutes from "./routes/WebsiteRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setNavigator } from "./services/navigationService";


function App() {
  const [theme, colorMode] = useMode();
    const navigate = useNavigate();
  
    useEffect(() => {
        setNavigator(navigate);
    }, [navigate]);


  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
    });
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* auth routes */}
          <AuthRoutes />
        {/* admin routes */}
          <AdminRoutes />
        {/* website routes */}
          <WebsiteRoutes />

          <ToastContainer
            position="top-right"
            autoClose={3000}
            theme="dark"
          />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;