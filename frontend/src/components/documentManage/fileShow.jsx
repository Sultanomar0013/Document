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




const FileShow = ({ attachments }) => {
  const [anchorEl, setAnchorEl] = useState();
  const [anchorElId, setAnchorElId] = useState(null);
  const [popoverState, setPopoverState] = useState({
    anchorEl: null,
    docId: null,
  });


  const handleClick = (event, docId) => {
    setPopoverState({
      anchorEl: event.currentTarget,
      docId,
    });
  };
  const handleClose = () => {
    setPopoverState({
      anchorEl: null,
      docId: null,
    });
  }
  const isPopoverOpen = (docId) => popoverState.docId === docId;
  const id = open ? 'simple-popover' : undefined;


  const downloadDoc = (url, name) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
  };

  const openInNewTab = (url) => {
    window.open(url, "_blank");
  };




  return (
    <>
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
                <Button aria-describedby={`popover-${doc.file_id}`}
                  variant="contained" onClick={(e) => handleClick(e, doc.file_id)}>
                  ...
                </Button>
                <Popover
                  id={`popover-${doc.file_id}`}
                  open={isPopoverOpen(doc.file_id)}
                  anchorEl={popoverState.anchorEl}
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

    </>

  )
}

export default FileShow;