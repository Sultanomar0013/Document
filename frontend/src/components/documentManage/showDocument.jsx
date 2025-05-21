import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Card, CardContent, CardActions, Button,
  Typography, Box, Popover, Paper,
  MenuList, ListItemText, ListItemIcon,
  Grid, MenuItem
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
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [folderId, setFolderId] = useState(null);
  const [parentId, setParentId] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElId, setAnchorElId] = useState(null);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setAnchorElId(id);
  };

  // const handleClose = () => {
  //   setAnchorEl(null);
  //   setAnchorElId(null);
  // };

  const downloadDoc = (url, name) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
  };



  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await axios.get(`${backendUrl}user/getUserId`, {
          withCredentials: true,
        });
        const userid = res.data.userId;
        const folderid = res.data.folderId;
        setUserId(userid);
        setFolderId(folderid);
        setParentId(folderid);
        fetchContents(userid); // Pass userId directly
      } catch (err) {
        console.error("Failed to get user", err);
      }
    };

    fetchUserId();
  }, []);


  const fetchContents = useCallback(async (parentId) => {
    try {
      const res = await axios.get(`${backendUrl}document/showDoc/${parentId || 'null'}`, {
        withCredentials: true,
      });
      setFolders(res.data.folders);
      console.log("Fetched folders:", res.data.folders);
      setAttachments(res.data.attachments);
      setCurrentFolderId(id || null);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  }, [backendUrl]); // include stable deps


  const openInNewTab = (url) => {
    window.open(url, "_blank");
  };


  const handleContextMenu = (event) => {
    event.preventDefault();
    setMenuPosition({ top: event.clientY - 4, left: event.clientX - 2 });
  };

  const handleContextMenuClose = () => {
    setMenuPosition(null);
  };

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFolderClick = async (id) => {
    // setParentId(id);
    // try {
    //   const res = await axios.get(`${backendUrl}document/showDoc/${id}`, {
    //     withCredentials: true,
    //   });
    //   setFolders(res.data.folders);
    //   console.log("Fetched folders:", res.data.folders);
    //   setAttachments(res.data.attachments);
    //   setCurrentFolderId(id || null);
    // } catch (error) {
    //   console.error("Failed to fetch data", error);
    // }
  }

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


        {attachments.map((doc) => {
          const fileUrl = `/uploads/${doc.file_path}`;
          const isPdf = fileUrl.endsWith(".pdf");

          return (
            <Grid item xs={12} sm={6} md={3} key={`doc-${doc.file_id}`}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box
                  sx={{
                    height: 150,
                    backgroundColor: "#f5f5f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {isPdf ? (
                    <Typography variant="subtitle2">PDF Preview</Typography>
                  ) : (
                    <img
                      src={fileUrl}
                      alt={doc.file_name}
                      style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                    />
                  )}
                </Box>

                <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                  <Typography variant="subtitle1" fontWeight="bold" noWrap>
                    {doc.file_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {doc.details}
                  </Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: "center", gap: 1 }}>
                  <Button variant="contained" size="small" onClick={() => openInNewTab(fileUrl)}>
                    Open
                  </Button>
                  <Button variant="outlined" size="small" onClick={() => downloadDoc(fileUrl, doc.file_name)}>
                    Download
                  </Button>
                  <Button aria-describedby={`popover-${doc.file_id}`} variant="contained" onClick={(e) => handleClick(e, doc.file_id)}>
                    ...
                  </Button>
                  <Popover
                    id={`popover-${doc.file_id}`}
                    open={anchorElId === doc.file_id}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  >
                    <Paper sx={{ width: 200 }}>
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
                  {/* Optional: If you want to calculate file size or created date */}
                  Uploaded by user ID: {doc.user_id}
                </Typography>
              </Card>
            </Grid>
          );
        })}

      </Grid>
    </Box>
  );
};

export default ShowAttachments;