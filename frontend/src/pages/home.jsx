//main Dependencies
import { Routes, Route } from "react-router-dom";
import { Box, CssBaseline, useMediaQuery, Grid, Menu, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//for theme
import { ThemeProvider } from "@mui/material";
import getTheme from '../common/theme/theme.jsx';

//common layput
import NavBar from "../common/appBar";
import SideBar from "../common/sideBar";
import { useTheme } from "@mui/material/styles";

//component Layout
import Dashboard from "../components/dashboard/dashboard1";
import AddCategory from "../components/categoryAdd/add_category";
import ShowAttachments from "../components/documentManage/showDocument.jsx";

import ContextMenu from "../components/contextMenu/contextMenu.jsx";

const MainHome = () => {

    const theme = useTheme();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
    const backendUrl = import.meta.env.VITE_ADRESS;
    const navigate = useNavigate();



    useEffect(() => {
        if (isSmallScreen == true) {
            setSidebarOpen(false);
        } else {
            setSidebarOpen(true);
        }
    }, [isSmallScreen])


    const [customTheme, setCustomTheme] = useState(localStorage.getItem("customtheme") ? localStorage.getItem("customtheme") : "light");

    const toggleTheme = (newTheme) => {
        setCustomTheme(newTheme);
        localStorage.setItem("customtheme", newTheme);
    };

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === "customtheme") {
                setCustomTheme(event.newValue || "light");
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (

        <ThemeProvider theme={getTheme(customTheme)}>
            <CssBaseline />
            <Box sx={{ display: "flex" }} >
                <CssBaseline />
                <NavBar toggleSidebar={toggleSidebar} mode={customTheme} toggleTheme={toggleTheme} />
                <SideBar open={sidebarOpen} toggleSidebar={toggleSidebar} />

                {/* Main content area */}
                <Box
                    component="main"
                    sx={{
                        justifyContent: 'center',
                        width: '100%',
                        p: 3,
                        mt: 8,
                        transition: "margin 0.3s",
                        overflow: 'scroll',
                        minHeight: '100vh',

                    }}


                >
                    {/* Context menu state */}




                    <Box sx={{
                        maxWidth: '1440px',
                        flexGrow: 1,
                    }}>



                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/category" element={<AddCategory />} />
                            <Route path="/showDocument" element={<ShowAttachments />} />
                            {/* Add more routes as needed */}
                        </Routes>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>

    );
};

export default MainHome;
