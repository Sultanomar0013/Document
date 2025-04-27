import React, { useEffect, useState } from "react";
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
    } catch (error) {
      console.error("Failed to fetch attachments", error);
    }
  };

  const openInNewTab = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", padding: "20px" }}>
      {attachments.map((file, idx) => (
        <div
          key={idx}
          style={{
            width: "200px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            textAlign: "center"
          }}
        >
          <p style={{ fontWeight: "bold", fontSize: "14px" }}>{file.originalname}</p>
          <button
            onClick={() => openInNewTab(file.url)}
            style={{
              marginTop: "10px",
              padding: "8px 12px",
              border: "none",
              backgroundColor: "#1976d2",
              color: "white",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Open File
          </button>
        </div>
      ))}
    </div>
  );
};

export default ShowAttachments;
