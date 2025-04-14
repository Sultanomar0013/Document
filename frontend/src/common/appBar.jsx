import { useState, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Dark mode icon
import Brightness7Icon from "@mui/icons-material/Brightness7"; // Light mode icon
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { getMenuItemStyles } from "./theme/globalStyle";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


import { Brightness4, Brightness7, ColorLens, ExpandMore } from "@mui/icons-material";


const themeIcons = {
  light: <Brightness7 />,
  dark: <Brightness4 />,
  green: <ColorLens />,
};


const NavBar = ({ toggleSidebar, mode, toggleTheme }) => {

  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };



  const [themeanchorEl, setThemeAnchorEl] = useState(null);
  const themeopen = Boolean(themeanchorEl);
  const storeTheme = localStorage.getItem("customtheme");
  const [selectedTheme, setSelectedTheme] = useState(themeIcons[localStorage.getItem("customtheme")] || <Brightness7 />);

  const handleThemeClick = (event) => {
    setThemeAnchorEl(event.currentTarget);
  };



  const handleThemeClose = (theme) => {

    if (localStorage.getItem("customtheme") !== theme && theme != null) {
      localStorage.setItem("customtheme", theme);
      setSelectedTheme(themeIcons[theme]);
      toggleTheme(theme);
    }
    setThemeAnchorEl(null);
  };





  const [selectedItem, setSelectedItem] = useState("User Module");

  useEffect(() => {
    if (location.pathname.startsWith("/userMod")) {
      setSelectedItem("User Module");
    } else if (location.pathname.startsWith("/itMod")) {
      setSelectedItem("It Module");
    } else if (location.pathname.startsWith("/accMod")) {
      setSelectedItem("Acc Module");
    } else if (location.pathname.startsWith("/hrMod")) {
      setSelectedItem("HR Module");
    }
  }, [])
  const handleClose = (mod) => {
    setAnchorEl(null);
    if (mod === 'userMod') {
      navigate('/userMod/home');
    } else if (mod === 'itMod') {
      navigate('/itMod/home');
    } else if (mod === 'accMod') {
      navigate('/accMod/home');
    } else if (mod === 'hrMod') {
      navigate('/hrMod/home');
    }

  };


  return (
    <AppBar position="fixed" sx={{ height: "64px", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>

        <Button
          variant="contained"
          onClick={handleClick}
          sx={{ marginLeft: 'auto' }}
        >
          {selectedItem}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleClose('userMod')} sx={getMenuItemStyles(theme)}>User Module</MenuItem>
          <MenuItem onClick={() => handleClose('itMod')} sx={getMenuItemStyles(theme)}>It Module</MenuItem>
          <MenuItem onClick={() => handleClose('hrMod')} sx={getMenuItemStyles(theme)}>HR Module</MenuItem>
          <MenuItem onClick={() => handleClose('accMod')} sx={getMenuItemStyles(theme)}>Accounts Module</MenuItem>
        </Menu>

        <IconButton color="inherit" onClick={handleThemeClick}>
          {selectedTheme}
        </IconButton>

        <Menu anchorEl={themeanchorEl} open={themeopen} onClose={() => handleThemeClose(null)}>
          <MenuItem onClick={() => handleThemeClose("dark")}>
            <Brightness4 style={{ marginRight: 8 }} />
            Dark
          </MenuItem>
          <MenuItem onClick={() => handleThemeClose("light")}>
            <Brightness7 style={{ marginRight: 8 }} />
            Light
          </MenuItem>
          <MenuItem onClick={() => handleThemeClose("green")}>
            <ColorLens style={{ marginRight: 8, color: "green" }} />
            Green
          </MenuItem>
        </Menu>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />

      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
