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




const FileShow = ({ attachments, setClipboard }) => {
  const [anchorEl, setAnchorEl] = useState();
  const [anchorElId, setAnchorElId] = useState(null);
  const [popoverState, setPopoverState] = useState({
    anchorEl: null,
    filleId: null,
  });



  const handleClick = (event, filleId) => {
    setPopoverState({
      anchorEl: event.currentTarget,
      filleId,
    });
  };
  const handleClose = () => {
    setPopoverState({
      anchorEl: null,
      filleId: null,
    });
  }
  const isPopoverOpen = (filleId) => popoverState.filleId === filleId;
  const id = open ? 'simple-popover' : undefined;


  const downloadfille = (url, name) => {
    const a = filleument.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
  };

  const openInNewTab = (url) => {
    window.open(url, "_blank");
  };

  const handleCut = (item) => {
    setClipboard({
      action: 'cut',
      item,
      type: 'file'  // or 'folder' depending on component
    });
    handleClose();
  };

  const handleCopy = (item) => {
    setClipboard({
      action: 'copy',
      item,
      type: 'file'
    });
    handleClose();
  };





  return (
    <>
      {attachments.map((fille) => {
        const fileUrl = `/uploads/${fille.file_path}`;
        const isPdf = fileUrl.endsWith(".pdf");

        return (
          <Grid item xs={12} sm={6} md={3} key={`fille-${fille.file_id}`}>
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
                    alt={fille.file_name}
                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                  />
                )}
              </Box>

              <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                <Typography variant="subtitle1" fontWeight="bold" noWrap>
                  {fille.file_name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {fille.details}
                </Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: "center", gap: 1 }}>
                <Button variant="contained" size="small" onClick={() => openInNewTab(fileUrl)}>
                  Open
                </Button>
                <Button variant="outlined" size="small" onClick={() => downloadfille(fileUrl, fille.file_name)}>
                  Download
                </Button>
                <Button aria-describedby={`popover-${fille.file_id}`}
                  variant="contained" onClick={(e) => handleClick(e, fille.file_id)}>
                  ...
                </Button>
                <Popover
                  id={`popover-${fille.file_id}`}
                  open={isPopoverOpen(fille.file_id)}
                  anchorEl={popoverState.anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                >
                  <Paper sx={{ width: 200 }}>
                    <MenuList>
                      <MenuItem onClick={() => handleCut(folder)}>
                        <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                        <ListItemText>Cut</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={() => handleCopy(folder)}>
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
                Uploaded by user ID: {fille.user_id}
              </Typography>
            </Card>
          </Grid>
        );
      })}

    </>

  )
}

export default FileShow;