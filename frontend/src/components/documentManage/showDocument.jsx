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
import ContextMenu from '../contextMenu/contextMenu';
import { useTheme } from '@mui/material/styles';

import FolderShow from './folderShow';
import FileShow from './fileShow';
import { useParams } from "react-router-dom";





const ShowAttachments = () => {
  const theme = useTheme();
  const backendUrl = import.meta.env.VITE_ADRESS;
  const [folders, setFolders] = useState([]);
  const [attachments, setAttachments] = useState([]); 
  const [menuPosition, setMenuPosition] = useState(null);
  // const [currentFolderId, setCurrentFolderId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [folderId, setFolderId] = useState(null);
  const [parentId, setParentId] = useState(null);
  const [folderPath, setFolderPath] = useState([]);

  const [clipboard, setClipboard] = useState({
    action: null, // 'cut' or 'copy'
    item: null,   // the folder/file object
    type: null,   // 'folder' or 'file'
  });
  const [oldPath, setOldpath] = useState([]); // to store old path for paste operation






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
        if (parentId === null || parentId === undefined) {
          setParentId(folderid);
          const homeFolder = { id: folderid, folder_name: 'Home' };
          setFolderPath([homeFolder]);
          // Reset folder path
        }
      } catch (err) {
        console.error("Failed to get user", err);
      }
    };

    fetchUserId();
  }, []);


  useEffect(() => {
    if (parentId && folderPath.length > 0) {
      fetchContents(parentId);
    }
  }, [parentId, folderPath]);

  const handleFolderClick = (folder) => {
    setParentId(folder.id);
    setFolderPath((prev) => [...prev, folder]); // push current folder to breadcrumb

    fetchContents(folder.id);
  };


  const fetchContents = useCallback(async (parentId) => {
    try {
      const res = await axios.get(`${backendUrl}document/showDoc/${parentId || 'null'}`, {
        folderId,
        withCredentials: true,
      });
      setFolders(res.data.folders);
      setAttachments(res.data.attachments);
      // setCurrentFolderId(id || null);

    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  }, [backendUrl]); // include stable deps





  const handleContextMenu = (event) => {
    event.preventDefault();
    setMenuPosition({ top: event.clientY - 4, left: event.clientX - 2 });
  };

  const handleContextMenuClose = () => {
    setMenuPosition(null);
  };


  const handlePaste = async (targetFolder) => {
    if (!clipboard.item || !clipboard.action || !clipboard.type) return;

    const endpoint = clipboard.action === 'cut'
      ? `${backendUrl}cutcopy/cut`
      : `${backendUrl}cutcopy/copy`;

    try {
      await axios.post(endpoint, {
        item_id: clipboard.item.id,        // backend must accept this
        item_type: clipboard.type,         // 'file' or 'folder'
        target_folder_id: targetFolder.id,  // folder to paste into
        path: folderPath.map(folder => folder.id).join('/'),
        oldPath: oldPath.map(folder => folder.id).join('/')
      }, {
        withCredentials: true,
      });


      // Clear clipboard and refresh data
      setClipboard({ action: null, item: null, type: null });
      // fetchData();  // Replace with your actual data refresh function
    } catch (err) {
      console.error("Paste failed", err);
    }
  };


  console.log("clipboard", clipboard);


  return (
    <Box sx={{ minHeight: "100vh" }} onContextMenu={handleContextMenu}>
      {menuPosition && (
        // <ContextMenu
        //   menuPosition={menuPosition}
        //   handleContextClose={handleContextMenuClose}
        //   path={folderPath}
        //   parent_id={parentId}
        // />

        // <ContextMenu
        //   clipboard={clipboard}
        //   menuPosition={menuPosition}
        //   handleContextClose={handleContextMenuClose}
        //   path={folderPath}
        //   parent_id={parentId}
        //   handlePaste={handlePaste}
        //   folder={folders}
        // />
        <ContextMenu
          menuPosition={menuPosition}
          handleContextClose={handleContextMenuClose}
          clipboard={clipboard}
          handlePaste={handlePaste}
          path={folderPath}
          parent_id={parentId}
          folder={folders}
        />

      )}


      <Breadcrumbs separator={<ArrowRightIcon fontSize="small" sx={{ color: theme.palette.seperator.main }} />} aria-label="breadcrumb">
        {folderPath.map((folder, index) => (
          <Button
            key={folder.id || index}
            onClick={() => {
              const newPath = folderPath.slice(0, index + 1);
              setFolderPath(newPath);
              setParentId(folder.id);
              fetchContents(folder.id);
            }}
          >
            {folder.folder_name}
          </Button>
        ))}
      </Breadcrumbs>




      <Grid container spacing={2} p={3}>
        {/* <FolderShow
          folders={folders}
          handleFolderClick={handleFolderClick}
          clipboard={clipboard}
          setClipboard={setClipboard}
        />
        <FileShow
          attachments={attachments}
          clipboard={clipboard}
          setClipboard={setClipboard}
        /> */}
        <FolderShow
          folders={folders}
          handleFolderClick={handleFolderClick}
          setClipboard={setClipboard}
          folderPath={folderPath}
          setOldpath={setOldpath}
        />

        <FileShow
          attachments={attachments}
          setClipboard={setClipboard}
        />



      </Grid>
    </Box>
  );
};

export default ShowAttachments;
