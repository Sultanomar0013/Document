import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Card, CardContent, CardActions, Button,
  Typography, Box, Popover, Paper,
  MenuList, ListItemText, ListItemIcon,
  Grid, MenuItem, Breadcrumbs
} from "@mui/material";
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ShareIcon from '@mui/icons-material/Share';
import FolderIcon from '@mui/icons-material/Folder';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DescriptionIcon from '@mui/icons-material/Description';
import axios from "axios";


const FolderShow = ({ folders, handleFolderClick, setClipboard, folderPath, setOldpath }) => {
  const [folderData, setFolderData] = useState([]);
  const backendUrl = import.meta.env.VITE_ADRESS;
  const [folderAnchorEl, setfolderAnchorEl] = useState();
  const [folderPopoverState, setfolderPopoverState] = useState({
    folderAnchorEl: null,
    folderPopId: null,
  });


  const [selectedItem, setSelectedItem] = useState(null);

  const handleFolderbuttonClick = (event, folderPopId) => {
    setfolderPopoverState({
      folderAnchorEl: event.currentTarget,
      folderPopId,
    });
  };

  const handlePopverClose = () => {
    setfolderPopoverState({
      folderAnchorEl: null,
      folderPopId: null,
    });
  }


  const isFolderPopoverOpen = (folderPopId) => folderPopoverState.folderPopId === folderPopId;
  const f_id = open ? 'simple-popover' : undefined;

  const handleCut = (item) => {
    setClipboard({
      action: 'cut',
      item,
      type: 'folder'  // or 'folder' depending on component

    });
    setOldpath(folderPath);
    handlePopverClose();
    console.log("cut", item)
    console.log("item", item);
  };

  const handleCopy = (item) => {
    setClipboard({
      action: 'copy',
      item,
      type: 'folder'
    });
    handlePopverClose();
  };





  return (
    <>
      {folders.map((folder) => (
        <Card key={folder.id} align="center" sx={{ width: 250, cursor: 'pointer' }} >
          <Box sx={{ height: 150, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => handleFolderClick(folder)}>
            <FolderIcon sx={{ fontSize: 80, color: "#1976d2" }} />
          </Box>
          <CardContent>
            <Typography variant="subtitle1" align="center" noWrap>
              {folder.folder_name}
            </Typography>
          </CardContent>

          <Button aria-describedby={`popover-${folder.id}`}
            variant="contained" onClick={(e) => handleFolderbuttonClick(e, folder.id)}>
            ...
          </Button>
          <Popover
            id={`popover-${folder.id}`}
            open={isFolderPopoverOpen(folder.id)}
            anchorEl={folderPopoverState.folderAnchorEl}
            onClose={handlePopverClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            <Paper sx={{ width: 200 }}>
              <MenuList>
                <MenuItem onClick={() => handleCut(folder)}>
                  <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleCopy(folder)} >
                  <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><ShareIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Share</ListItemText>
                </MenuItem>
              </MenuList>
            </Paper>
          </Popover>
        </Card>
      ))}
    </>

  )

};

export default FolderShow;