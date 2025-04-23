import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import DescriptionIcon from '@mui/icons-material/Description';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FolderIcon from '@mui/icons-material/Folder';





// User Module
const docMenuItems = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
    children: [
      {
        segment: "dashboard",
        title: "Dashboard",
        icon: <DashboardIcon />,
        path: "/docMod/home/Dashboard"
      },
    ],
  },
  {
    segment: "category",
    title: "Doc Category",
    icon: <CategoryIcon />,
    children: [
      { segment: "new_category",title: "Add Category", icon: <NoteAddIcon />, path: "/docMod/home/Category" },
    ],
  },
  {
    segment: "document",
    title: "My Document",
    icon: <FolderIcon />,
    children: [
      { segment: "all_document", title: "All Document", icon: <DescriptionIcon />, path: "/docMod/home/allDocument"},
      { segment: "upload_document", title: "Upload Document", icon: <UploadFileIcon />, path: "/docMod/home/uploadDocument" },
    ],
  },
];







// It menus









// Function to get filtered menu items based on location
export const getMenuItems = (pathname) => {

  if (pathname.startsWith("/docMod")) {
    return docMenuItems;
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
