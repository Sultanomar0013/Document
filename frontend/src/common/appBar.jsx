import { useState, useEffect } from "react";
import { Box, Grid, AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { getMenuItemStyles } from "./theme/globalStyle";
import Avatar from '@mui/material/Avatar';

import { getMenuItems } from "./menuOption";

// import SearchComponent from "./baseComponent/searchBar";
// import logo from "../media/images/logo.png";


import { Brightness4, Brightness7, ColorLens, ExpandMore } from "@mui/icons-material";


const themeIcons = {
  light: <Brightness7 sx={{ color: '#000' }} />,
  dark: <Brightness4 />,
  green: <ColorLens sx={{ color: 'green' }} />,
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
  const menuItems = getMenuItems(location.pathname);


  const [themeanchorEl, setThemeAnchorEl] = useState(null);
  const themeopen = Boolean(themeanchorEl);
  const storeTheme = localStorage.getItem("customtheme");
  const [selectedTheme, setSelectedTheme] = useState(themeIcons[localStorage.getItem("customtheme")] || <Brightness7 sx={{ color: '#000' }} />);

  const handleThemeClick = (event) => {
    setThemeAnchorEl(event.currentTarget);
  };

  const handleSearch = (query) => {
    console.log("Search query:", query);
    // You can filter a list, fetch data, etc.
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
    <AppBar position="fixed" sx={{
      height: "60px",
      zIndex: (theme) => theme.zIndex.drawer + 1,
      backgroundColor: theme.palette.background.default,
      boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.1)", // remove default shadow
      // border: "2px solid rgba(0, 0, 0, 0.2)", // or your desired color
      // backdropFilter: "blur(6px)", // optional: adds blur for glass effect
      width: { xs: '100%', md: 'calc(100% - 240px)' },
      ml: { xs: 0, md: '240px' },

    }}>


      <Toolbar>

        <IconButton edge="start" color="inherit" onClick={toggleSidebar} sx={{ display: { xs: 'block', md: 'none' } }}>
          <MenuIcon sx={{ color: theme.palette.primary.main }} />
        </IconButton>
        {/* <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            height: 60,
            mr: 2,
          }}
        /> */}


        {/* <Grid2 style={{ width: "250px", }}>
          <SearchComponent menuItems={menuItems} sx={{ height: "10px" }} />
        </Grid2> */}

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