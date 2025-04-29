import React, { useEffect, useState } from "react";
import { Card, CardContent, CardActions, Button, Typography, Box } from "@mui/material";
import axios from "axios";

const ShowAttachments = () => {
  const backendUrl = import.meta.env.VITE_ADRESS;
  const [attachments, setAttachments] = useState([]);

  useEffect(() => {
    fetchAttachments();
  }, []);

  const fetchAttachments = async () => {
    try {
      const res = await axios.get(`${backendUrl}document/showDoc` , {
        withCredentials: true,

      });
      setAttachments(res.data.attachments);
      console.log("Fetched attachments:", res.data.attachments);
    } catch (error) {
      console.error("Failed to fetch attachments", error);
    }
  };

  const downloadFile = (url, filename) => {
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

  return (
    <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: 3,
      p: 3,
    }}
  >
    {attachments.map((file, idx) => (
      <Card key={idx} sx={{ width: 250, display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative" }}>
        {/* File Preview */}
        <Box sx={{ height: 150, backgroundColor: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {file.url.endsWith(".pdf") ? (
            <Typography variant="subtitle2">PDF Preview</Typography>
          ) : (
            <img
              src={file.url}
              alt={file.originalName}
              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            />
          )}
        </Box>

        {/* File Name */}
        <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
          <Typography variant="subtitle1" fontWeight="bold" noWrap>
            {file.originalName}
          </Typography>
        </CardContent>

        {/* Buttons */}
        <CardActions sx={{ justifyContent: "center", gap: 1 }}>
          <Button variant="contained" size="small" onClick={() => openInNewTab(file.url)}>
            Open
          </Button>
          <Button variant="outlined" size="small" onClick={() => downloadFile(file.url, file.originalname)}
          >
            Download
          </Button>
        </CardActions>

        {/* File Size at Bottom-Right */}
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
          {file.size}KB
        </Typography>
      </Card>
    ))}
  </Box>
);
};

export default ShowAttachments;
