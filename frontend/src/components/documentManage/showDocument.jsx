import React, { useEffect, useState } from "react";
import { Card, CardContent, CardActions, Button, Typography, Box, Collapse, TextField, MenuItem } from "@mui/material";
import axios from "axios";

const ShowAttachments = () => {
  const backendUrl = import.meta.env.VITE_ADRESS;
  const [attachments, setAttachments] = useState([]);
  const [showFields, setShowFields] = useState(false);
  const [email, setEmail] = useState("");
  const [shareType, setShareType] = useState("");
  const [docId, setDocId] = useState("");
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetchAttachments();
  }, []);

  const fetchAttachments = async () => {
    try {
      const res = await axios.get(`${backendUrl}document/showDoc`, {
        withCredentials: true,

      });
      setAttachments(res.data.attachments);
    } catch (error) {
      console.error("Failed to fetch attachments", error);
    }
  };

  const downloadDoc = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const openInNewTab = (url) => {
    window.open(url, "_blank");
  };

  // const handleShare = async () => {
  //   setLoading(true);
  //   setError('');

  //   if (!docId || !shareType) {
  //     setError('All fields are required');
  //     setLoading(false);
  //     return;
  //   }
  //   try {
  //     const response = await axios.post(`${backendUrl}share/document`, {
  //       docId,
  //       email,
  //       shareType,
  //     }, {
  //       withCredentials: true
  //     });

  //     const data = response.data;

  //     if (data.success) {
  //       console.log('Share successful:', data);
  //       setLoading(false);
  //     } else {
  //       setError(data.message || 'Share failed. Please try again.');
  //     }
  //   } catch (err) {
  //     console.error('Share error:', err);
  //     setError('Error during Share. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        p: 3,
      }}
    >
      {attachments.map((doc, idx) => (
        <Card key={idx} sx={{ width: 250, display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative" }}>
          {/* doc Preview */}
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

          {/* doc Name */}
          <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
            <Typography variant="subtitle1" fontWeight="bold" noWrap>
              {doc.originalName}
            </Typography>
          </CardContent>

          {/* Buttons */}
          <CardActions sx={{ justifyContent: "center", gap: 1 }}>
            <Button variant="contained" size="small" onClick={() => openInNewTab(doc.url)}>
              Open
            </Button>
            <Button variant="outlined" size="small" onClick={() => downloadDoc(doc.url, doc.originalname)}
            >
              Download
            </Button>

            <Button aria-describedby={id} variant="contained" onClick={handleClick}>
          Open Popover
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
        </Popover>

            {/* <Button
              variant="outlined"
              size="small"
              onClick={() => setShowFields(!showFields)}
              onChange={(e) => setDocId(doc.id)}
            >
              Share
            </Button> */}
          </CardActions>

          {/* Shareing option */}
          {/* <Collapse in={showFields} timeout="auto" unmountOnExit>
            <Box mt={2} display="flex" flexDirection="column" gap={1}>
              <TextField
                label="Email"
                variant="outlined"
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                select
                label="Type"
                variant="outlined"
                size="small"
                value={shareType}
                onChange={(e) => setShareType(e.target.value)}
              >
                <MenuItem value={2}>read</MenuItem>
                <MenuItem value={3}>update</MenuItem>
              </TextField>
              <Button variant="contained" size="small" onClick={handleShare}>
                Update
              </Button>
            </Box>
          </Collapse> */}

          {/* doc Size at Bottom-Right */}
          <Typography
            variant="caption"
            sx={{
              //position: "absolute",
              bottom: 8,
              right: 0,
              color: "gray",
              fontSize: "11px",
            }}
          >
            {doc.size}KB
          </Typography>
        </Card>
      ))}
    </Box>
  );
};

export default ShowAttachments;
