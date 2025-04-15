import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import DescriptionIcon from "@mui/icons-material/Description";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import GroupIcon from "@mui/icons-material/Group";
import NotificationsIcon from "@mui/icons-material/Notifications";
import TodayIcon from "@mui/icons-material/Today";
import WorkIcon from "@mui/icons-material/Work";

import SecurityIcon from "@mui/icons-material/Security";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import DevicesIcon from "@mui/icons-material/Devices";
import ComputerIcon from "@mui/icons-material/Computer";
import AppIcon from "@mui/icons-material/Apps";
import SyncIcon from "@mui/icons-material/Sync";
import CloudIcon from "@mui/icons-material/Cloud";
import WifiIcon from "@mui/icons-material/Wifi";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import StorageIcon from "@mui/icons-material/Storage";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BugReportIcon from "@mui/icons-material/BugReport";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ShieldIcon from "@mui/icons-material/Shield";
import HistoryIcon from "@mui/icons-material/History";
import BuildIcon from "@mui/icons-material/Build";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import SystemUpdateIcon from "@mui/icons-material/SystemUpdate";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ReceiptIcon from "@mui/icons-material/Receipt";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import BrushIcon from "@mui/icons-material/Brush";
import ApiIcon from "@mui/icons-material/Api";
import BarChartIcon from "@mui/icons-material/BarChart";
import AssessmentIcon from "@mui/icons-material/Assessment";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import PersonIcon from "@mui/icons-material/Person";
import CodeIcon from "@mui/icons-material/Code";



import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PaymentIcon from "@mui/icons-material/Payment";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SchoolIcon from "@mui/icons-material/School";
import AnnouncementIcon from "@mui/icons-material/Announcement";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TimerIcon from "@mui/icons-material/Timer";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import EventNoteIcon from "@mui/icons-material/EventNote";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";




// User Module
const userMenuItems = [
  { segment: "dashboard", title: "Dashboard", icon: <DashboardIcon />, path: "/docMod/home/Dashboard" },
  { segment: "user_access", title: "User Access", icon: <PeopleIcon />, path: "/docMod/home/UserAccess" },
  {
    segment: "my_account",
    title: "My Account",
    icon: <AccountCircleIcon />,
    children: [
      { segment: "profile", title: "My Profile", path: "/docMod/home/ProfilePanel", icon: <AccountCircleIcon /> },
      { segment: "update_profile", title: "Update Profile", path: "/docMod/home/UpdateProfile", icon: <EditIcon /> },
    ],
  },
  { segment: "notice", title: "Notice", icon: <NotificationsIcon />, path: "/docMod/home/NoticeReport" },
  { segment: "attendance", title: "Attendance", icon: <TodayIcon />, path: "/docMod/home/Attendance" },
  {
    segment: "document",
    title: "Document",
    icon: <DescriptionIcon />,
    children: [
      { segment: "doc_type", title: "Document Type", path: "/docMod/home/DocType", icon: <ListAltIcon /> },
      { segment: "doc_list", title: "Document List", path: "/docMod/home/DocAtt", icon: <ListAltIcon /> },
    ],
  },
  {
    segment: "meeting",
    title: "Meeting Schedule",
    icon: <EventIcon />,
    children: [
      { segment: "meet_location", title: "Meeting Location", path: "/docMod/home/MeetLocate", icon: <LocationOnIcon /> },
      { segment: "meet_schedule", title: "Create Schedule", path: "/docMod/home/MeetSchedule", icon: <EventIcon /> },
    ],
  },
  {
    segment: "it_support",
    title: "IT Support",
    icon: <SupportAgentIcon />,
    children: [
      { segment: "it_request", title: "IT Request Status", path: "/docMod/home/ItRequestStatus", icon: <AssignmentTurnedInIcon /> },
      { segment: "it_list", title: "IT Support List", path: "/docMod/home/ItSupport", icon: <SupportAgentIcon /> },
    ],
  },
  { segment: "hr_support", title: "HR & Admin Support", icon: <WorkIcon />, path: "/docMod/home/HrRequest" },
];







// It menus
const itMenuItems = [
  { segment: "dashboard", title: "Dashboard", icon: <DashboardIcon />, path: "/itMod/home/Dashboard" },
  {
    segment: "user_access",
    title: "User & Access Management",
    icon: <SecurityIcon />,
    children: [
      { segment: "user_roles", title: "User Roles & Permissions", path: "/itMod/home/UserRoles", icon: <PersonIcon /> },
      { segment: "access_control", title: "Access Control List (ACL)", path: "/itMod/home/AccessControl", icon: <LockIcon /> },
      { segment: "sso", title: "Single Sign-On (SSO)", path: "/itMod/home/SSOConfig", icon: <VpnKeyIcon /> },
    ],
  },
  {
    segment: "it_assets",
    title: "IT Asset Management",
    icon: <DevicesIcon />,
    children: [
      { segment: "hardware", title: "Hardware Inventory", path: "/itMod/home/HardwareInventory", icon: <ComputerIcon /> },
      { segment: "software", title: "Software Licenses", path: "/itMod/home/SoftwareLicenses", icon: <AppIcon /> },
      { segment: "lifecycle", title: "IT Asset Lifecycle", path: "/itMod/home/AssetLifecycle", icon: <SyncIcon /> },
    ],
  },
  {
    segment: "infrastructure",
    title: "Infrastructure Management",
    icon: <CloudIcon />,
    children: [
      { segment: "network_monitor", title: "Server & Network Monitoring", path: "/itMod/home/NetworkMonitor", icon: <WifiIcon /> },
      { segment: "cloud_services", title: "Cloud Service Management", path: "/itMod/home/CloudServices", icon: <CloudQueueIcon /> },
      { segment: "backup", title: "Backup & Disaster Recovery", path: "/itMod/home/BackupRecovery", icon: <StorageIcon /> },
    ],
  },
  {
    segment: "help_desk",
    title: "Help Desk & Support",
    icon: <SupportAgentIcon />,
    children: [
      { segment: "tickets", title: "Ticket Management", path: "/itMod/home/Tickets", icon: <AssignmentIcon /> },
      { segment: "incidents", title: "Incident Tracking", path: "/itMod/home/Incidents", icon: <BugReportIcon /> },
      { segment: "knowledge_base", title: "Knowledge Base", path: "/itMod/home/KnowledgeBase", icon: <LibraryBooksIcon /> },
    ],
  },
  {
    segment: "security",
    title: "Security & Compliance",
    icon: <ShieldIcon />,
    children: [
      { segment: "firewall", title: "Firewall & Security Policies", path: "/itMod/home/SecurityPolicies", icon: <SecurityIcon /> },
      { segment: "audit_logs", title: "Audit Logs & Compliance", path: "/itMod/home/AuditLogs", icon: <HistoryIcon /> },
      { segment: "data_protection", title: "Data Encryption & Access Logs", path: "/itMod/home/DataProtection", icon: <LockIcon /> },
    ],
  },
  {
    segment: "software_management",
    title: "Software Management",
    icon: <BuildIcon />,
    children: [
      { segment: "app_deployment", title: "Application Deployment", path: "/itMod/home/AppDeployment", icon: <SettingsApplicationsIcon /> },
      { segment: "patch_management", title: "Patch Management", path: "/itMod/home/PatchManagement", icon: <SystemUpdateIcon /> },
      { segment: "api_integration", title: "API & Integration Hub", path: "/itMod/home/APIIntegration", icon: <CodeIcon /> },
    ],
  },
  {
    segment: "it_procurement",
    title: "IT Procurement & Vendor Management",
    icon: <ShoppingCartIcon />,
    children: [
      { segment: "purchase_requests", title: "IT Purchase Requests", path: "/itMod/home/PurchaseRequests", icon: <ShoppingBasketIcon /> },
      { segment: "vendor_contracts", title: "Vendor Contracts & Agreements", path: "/itMod/home/VendorContracts", icon: <ReceiptIcon /> },
      { segment: "budget_analysis", title: "Budget & Cost Analysis", path: "/itMod/home/BudgetAnalysis", icon: <MonetizationOnIcon /> },
    ],
  },
  {
    segment: "development",
    title: "Development & Customization",
    icon: <CodeIcon />,
    children: [
      { segment: "erp_customization", title: "ERP Customization Tools", path: "/itMod/home/ERPCustomization", icon: <BrushIcon /> },
      { segment: "api_development", title: "API Development & Webhooks", path: "/itMod/home/APIDevelopment", icon: <ApiIcon /> },
      { segment: "devops", title: "DevOps & CI/CD Pipeline", path: "/itMod/home/DevOps", icon: <BuildIcon /> },
    ],
  },
  {
    segment: "reports",
    title: "Reports & Analytics",
    icon: <BarChartIcon />,
    children: [
      { segment: "performance", title: "IT Performance Reports", path: "/itMod/home/PerformanceReports", icon: <AssessmentIcon /> },
      { segment: "audit_reports", title: "Security Audit Reports", path: "/itMod/home/AuditReports", icon: <FindInPageIcon /> },
      { segment: "utilization", title: "Software & Hardware Utilization", path: "/itMod/home/Utilization", icon: <StorageIcon /> },
    ],
  },
];




const hrMenuItems = [
  { segment: "hr_dashboard", title: "HR Dashboard", icon: <WorkIcon />, path: "/hrMod/dashboard" },

  { segment: "employee_management", title: "Employee Management", icon: <PeopleIcon />, path: "/hrMod/employees" },

  {
    segment: "attendance", title: "Attendance Management", icon: <EventAvailableIcon />,
    children: [
      { title: "Daily Attendance", path: "/hrMod/attendance/daily", icon: <CalendarTodayIcon /> },
      { title: "Overtime Tracking", path: "/hrMod/attendance/overtime", icon: <TimerIcon /> },
      { title: "Late/Early Tracking", path: "/hrMod/attendance/late-early", icon: <AccessTimeIcon /> },
    ]
  },

  {
    segment: "leave", title: "Leave Management", icon: <EventAvailableIcon />, path: "/hrMod/leave",
    children: [
      { title: "Leave Requests", path: "/hrMod/leave/requests", icon: <EventNoteIcon /> },
      { title: "Leave Balances", path: "/hrMod/leave/balance", icon: <AccountBalanceWalletIcon /> },
      { title: "Holiday Calendar", path: "/hrMod/leave/calendar", icon: <TodayIcon /> },
    ]
  },

  { segment: "payroll", title: "Payroll Management", icon: <PaymentIcon />, path: "/hrMod/payroll" },

  {
    segment: "recruitment", title: "Recruitment & Hiring", icon: <BusinessCenterIcon />,
    children: [
      { title: "Job Openings", path: "/hrMod/recruitment/jobs", icon: <WorkOutlineIcon /> },
      { title: "Applications", path: "/hrMod/recruitment/applications", icon: <AssignmentIcon /> },
      { title: "Interviews", path: "/hrMod/recruitment/interviews", icon: <QuestionAnswerIcon /> },
    ]
  },

  { segment: "performance", title: "Performance Management", icon: <AssessmentIcon />, path: "/hrMod/performance" },

  {
    segment: "training", title: "Training & Development", icon: <SchoolIcon />,
    children: [
      { title: "Job Openings", path: "/hrMod/recruitment/jobs", icon: <WorkOutlineIcon /> },
      { title: "Applications", path: "/hrMod/recruitment/applications", icon: <AssignmentIcon /> },
      { title: "Interviews", path: "/hrMod/recruitment/interviews", icon: <QuestionAnswerIcon /> },
    ]
  },

  { segment: "documents", title: "Document Management", icon: <DescriptionIcon />, path: "/hrMod/documents" },

  { segment: "assets", title: "Asset Management", icon: <DevicesIcon />, path: "/hrMod/assets" },

  { segment: "self_service", title: "Employee Self-Service", icon: <AccountCircleIcon />, path: "/hrMod/self-service" },

  { segment: "announcements", title: "Company Policies & Announcements", icon: <AnnouncementIcon />, path: "/hrMod/announcements" },
];



// Function to get filtered menu items based on location
export const getMenuItems = (pathname) => {

  if (pathname.startsWith("/docMod")) {
    return userMenuItems;
  } else if (pathname.startsWith("/itMod")) {
    return itMenuItems;
  } else if (pathname.startsWith("/hrMod")) {
    return hrMenuItems;
  }
};

const MyComponent = () => {
  const location = useLocation();
  console.log(location.pathname);

  // Get filtered menu items
  const menuItems = getMenuItems(location.pathname);

  return null; // No UI is returned as per your request
};

export default MyComponent;
