//main Dependencies
import { Routes, Route } from "react-router-dom";
import { Box, CssBaseline, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";

//for theme
import { ThemeProvider } from "@mui/material";
import getTheme from '../common/theme/theme.jsx';

//common layput
import NavBar from "../common/appBar";
import SideBar from "../common/sideBar";
import { useTheme } from "@mui/material/styles";

//component Layout
// import Dashboard from "../components/dashboard/dashboard4";
// import ProfilePanel from "../components/profileComponent/myProfile"
// import MemberReport from "../components/member_basic/memberReport.jsx"
// import NoticeReport from "../components/notice/notice.jsx"
// import AttendanceComponent from '../components/attendance/attendance.jsx';
// import DocAtt from '../components/docAttacment/docAtt.jsx';
// import DocType from '../components/docAttacment/docType.jsx';
// import MeetLocate from '../components/meeting/meetLocation.jsx';
// import MeetSchedule from '../components/meeting/meetingSchedule.jsx';
// import ItSupport from '../components/itSupport/itSupport.jsx';
// import ItRequestStatus from '../components/itSupport/itRequeststatus.jsx';
// import HrRequest from '../components/hrRequest/hrRequestList.jsx';



const MainHome = () => {

    const theme = useTheme();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    useEffect(() => {
        if (isSmallScreen == true) {
            setSidebarOpen(false);
        }else {
            setSidebarOpen(true);
        }
    }, [isSmallScreen])



    const [customTheme, setCustomTheme] = useState(localStorage.getItem("customtheme") ? localStorage.getItem("customtheme")  : "light");

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
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <NavBar toggleSidebar={toggleSidebar} mode={customTheme} toggleTheme={toggleTheme} />
                <SideBar open={sidebarOpen} toggleSidebar={toggleSidebar} />

                {/* Main content area */}
                <Box
                    component="main"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        p: 3,
                        mt: 8,
                        transition: "margin 0.3s",
                        overflow: 'scroll',
                    }}
                >
                    <Box sx={{  maxWidth: '1440px',
                                display: 'flex',

                                flexGrow: 1,
                                }}>
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            {/* <Route path="dashboard" element={<Dashboard />} />
                            <Route path="ProfilePanel" element={<ProfilePanel />} />
                            <Route path="MemberReport" element={<MemberReport />} />
                            <Route path="NoticeReport" element={<NoticeReport />} />
                            <Route path="Attendance" element={<AttendanceComponent />} />
                            <Route path="DocAtt" element={<DocAtt />} />
                            <Route path="DocType" element={<DocType />} />
                            <Route path="MeetLocate" element={<MeetLocate />} />
                            <Route path="MeetSchedule" element={<MeetSchedule />} />
                            <Route path="ItRequestStatus" element={<ItRequestStatus />} />
                            <Route path="ItSupport" element={<ItSupport />} />
                            <Route path="HrRequest" element={<HrRequest />} /> */}
                        </Routes>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>

    );
};

export default MainHome;
