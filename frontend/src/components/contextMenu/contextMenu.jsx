import React, { useState } from 'react';
import {
  Grid, Menu, MenuItem, Divider, Modal, Box, Typography, TextField, Button
} from '@mui/material';
import axios from 'axios';

function ContextMenu({ handleContextClose, menuPosition, path, parent_id }) {
  const [createFolderModal, setCreateFolderModal] = useState(false);
  const [folderName, setFolderName] = useState("");

  // Open Modal with clean input
  const handleCreateFolder = () => {
    setFolderName("");
    setCreateFolderModal(true);
  };

  const handleCreateFolderClose = () => {
    setCreateFolderModal(false);
  };

  const handleCreateFolderSubmit = async (e) => {

    e.preventDefault();
    console.log("Form Submitted");
    try {
      if (!folderName.trim()) return alert("Folder name is required");
      await axios.post(`${import.meta.env.VITE_ADRESS}folder/create`, {
        folder_name: folderName,
        path,
        parent_id,
      }, {
        withCredentials: true,
      });

      handleCreateFolderClose();
      handleContextClose();
    } catch (err) {
      console.error('Error creating folder:', err);
    }
  };

  const handleUploadDocument = () => {
    alert('Upload Document clicked');
    handleContextClose();
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Menu
        open={Boolean(menuPosition)}
        onClose={handleContextClose}
        anchorReference="anchorPosition"
        anchorPosition={
          menuPosition ? { top: menuPosition.top, left: menuPosition.left } : undefined
        }
      >
        <MenuItem onClick={handleCreateFolder}>Create Folder</MenuItem>
        <Divider />
        <MenuItem onClick={handleUploadDocument}>Upload Document</MenuItem>
      </Menu>

      <Modal open={createFolderModal} onClose={handleCreateFolderClose}>
        <Box sx={style}>
          <form onSubmit={handleCreateFolderSubmit}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Create Folder
            </Typography>
            <TextField
              fullWidth
              label="Folder Name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default ContextMenu;
