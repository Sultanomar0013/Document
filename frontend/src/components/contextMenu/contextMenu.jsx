import React, { useState } from 'react';
import { Grid, Menu, MenuItem, Divider, Modal, Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

function ContextMenu({ handleContextClose, menuPosition }) {
  const [createFolderModal, setCreateFolderModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditing, setIsEditing] = useState(false);



  const handleCreateFolder = () =>{ setCreateFolderModal(true)};
  const handleCreateFolderClose = () => setCreateFolderModal(false);
  const handleCreateFolderSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_ADRESS}folder/create`, selectedRow, {
        withCredentials: true,
      });
      handleCreateFolderClose();
      handleContextClose();
    } catch (err) {
      console.error('Error creating folder:', err);
    }
  };
  const handlEditFolder = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_ADRESS}category/${selectedRow.id}`, selectedRow, {
        withCredentials: true,
      });
      handleCreateFolderClose();
    } catch (err) {
      console.error('Error updating folder:', err);
    }
  };


  const handleUploadDocument = () => alert('Upload Document clicked');


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
    <Grid >
      <Menu
        open={menuPosition !== null}
        onClose={handleContextClose}
        anchorReference="anchorPosition"
        anchorPosition={
          menuPosition !== null
            ? { top: menuPosition.top, left: menuPosition.left }
            : undefined
        }
      >
        <MenuItem
          onClick={() => {
            // handleContextClose();
            handleCreateFolder();
          }}
        >
          Create Folder
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleContextClose();
            handleUploadDocument();
          }}
        >
          Upload Document
        </MenuItem>
      </Menu>
      <Modal open={createFolderModal} onClose={handleCreateFolderClose}>
        <Box sx={style}>
          <form onSubmit={isEditing ? handlEditFolder : handleCreateFolderSubmit}>
            <Typography variant="h6" sx={{ p: 1 }} gutterBottom>
              {isEditing ? 'Edit Folder' : 'Create Folder'}
            </Typography>
            <Grid container spacing={2}>
              <Grid item sx={{ p: 1, width: '100%' }}>

                <TextField
                  fullWidth
                  label="Folder Name"
                  value={selectedRow?.folder_name || ''}
                  onChange={(e) => setSelectedRow({ ...selectedRow, folder_name: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12} sx={{ p: 1 }}>
                <Button type="submit" variant="contained" fullWidth>
                  {isEditing ? 'Update' : 'Submit'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>

    </Grid>
  );
}

export default ContextMenu;
