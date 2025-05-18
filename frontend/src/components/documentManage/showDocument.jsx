import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Card, CardContent, CardActions, Button,
  Typography, Box, Popover, Paper,
  MenuList, ListItemText, ListItemIcon,
  Grid
} from "@mui/material";
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ShareIcon from '@mui/icons-material/Share';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import axios from "axios";
import ContextMenu from '../contextMenu/contextMenu';


const ShowAttachments = () => {
  const backendUrl = import.meta.env.VITE_ADRESS;
  const [folders, setFolders] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [menuPosition, setMenuPosition] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [parentId, setParentId] = useState(null);


console.log("Full URL:", `${import.meta.env.VITE_ADRESS}user/getUserId`);


useEffect(() => {
  const fetchUserId = async () => {
    try {
      const res = await axios.get(`${backendUrl}user/getUserId`, {
        withCredentials: true,
      });
      const id = res.data.userId;
      setUserId(id);
      setParentId(id);
      fetchContents(id); // Pass userId directly
      console.log('userId:',userId,':',parentId)
      console.log("Parent ID set from userId:", id);
    } catch (err) {
      console.error("Failed to get user", err);
    }
  };

  fetchUserId();
}, []);


const fetchContents = useCallback(async (id) => {
  try {
    const res = await axios.get(`${backendUrl}document/showDoc/${id || 'null'}`, {
      withCredentials: true,
    });
    setFolders(res.data.folders);
    setAttachments(res.data.attachments);
    setCurrentFolderId(id || null);
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
}, [backendUrl]); // include stable deps

// useEffect(() => {
//   if (parentId) {
//     fetchContents();
//   }
// }, [fetchContents, parentId]);

  const openInNewTab = (url) => {
    window.open(url, "_blank");
  };

  const downloadDoc = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    setMenuPosition({ top: event.clientY - 4, left: event.clientX - 2 });
  };

  const handleContextMenuClose = () => {
    setMenuPosition(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box sx={{ minHeight: "100vh" }} onContextMenu={handleContextMenu}>
      {menuPosition && (
        <ContextMenu
          menuPosition={menuPosition}
          handleClose={handleContextMenuClose}
        />
      )}

      <Grid container spacing={2} p={3}>
        {/* FOLDERS */}
        {folders.map((folder) => (
          <Card key={folder.id} sx={{ width: 250, cursor: 'pointer' }} onClick={() => handleFolderClick(folder.id)}>
            <Box sx={{ height: 150, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FolderIcon sx={{ fontSize: 80, color: "#1976d2" }} />
            </Box>
            <CardContent>
              <Typography variant="subtitle1" align="center" noWrap>
                {folder.folder_name}
              </Typography>
            </CardContent>
          </Card>
        ))}


        {attachments.map((doc) => (
          <Grid item xs={12} sm={6} md={3} key={`doc-${doc.id}`}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Box sx={{ height: 150, backgroundColor: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {doc.url.endsWith(".pdf") ? (
                  <Typography variant="subtitle2">PDF Preview</Typography>
                ) : (
                  <img
                    src={doc.url}
                    alt={doc.originalName}
                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                  />
                )}
              </Box>

              <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                <Typography variant="subtitle1" fontWeight="bold" noWrap>
                  {doc.originalName}
                </Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: "center", gap: 1 }}>
                <Button variant="contained" size="small" onClick={() => openInNewTab(doc.url)}>
                  Open
                </Button>
                <Button variant="outlined" size="small" onClick={() => downloadDoc(doc.url, doc.originalName)}>
                  Download
                </Button>
                <Button aria-describedby={id} variant="contained" onClick={handleClick}>...</Button>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                >
                  <Paper sx={{ width: 320 }}>
                    <MenuList>
                      <MenuItem>
                        <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                        <ListItemText>Cut</ListItemText>
                      </MenuItem>
                      <MenuItem>
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
              </CardActions>

              <Typography variant="caption" sx={{ textAlign: "right", p: 1, fontSize: '11px', color: 'gray' }}>
                {doc.size}KB
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ShowAttachments;