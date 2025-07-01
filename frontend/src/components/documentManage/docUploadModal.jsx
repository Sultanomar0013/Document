import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  Modal,
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

const FileUploadModal = ({ open, handleClose, parent_id, path }) => {
  const backendUrl = import.meta.env.VITE_ADRESS;
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [details, setDetails] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${backendUrl}category`, {
          withCredentials: true,
        });
        setCategories(res.data);
      } catch (err) {
        console.error('Failed to load categories', err);
        setMessage('Failed to load categories, please try again later.');
      }
    };

    if (open) {
      fetchCategories();
    }
  }, [open]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !fileName || !category) {
      setMessage('Please fill out all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('details', details);
    formData.append('categoryId', category);
    formData.append('parent_id', parent_id);
    formData.append('uploadPath', path.map(path => path.id).join('/')); // Assuming path is an array of objects with an 'id' property

    console.log("Form Data:", formData);
    // console.log("path:", path);
    try {
      setUploading(true);
      const res = await axios.post(`${backendUrl}document/uploadDoc`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(res.data.message || 'File uploaded successfully!');
      handleClose(); // Close modal on success
    } catch (err) {
      setMessage('Upload failed');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  // console.log("Modal Open:", open);



  return (
    <Modal open={open} onClose={handleClose}>
      <Box component="form" onSubmit={handleSubmit} sx={style}>
        <Typography variant="h5" align="center" gutterBottom>
          Upload File
        </Typography>

        <TextField
          label="File Name"
          variant="outlined"
          fullWidth
          required
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />

        <TextField
          label="Details"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />

        <FormControl fullWidth required>
          <InputLabel>File Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.category_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="outlined" component="label">
          Choose File
          <input type="file" hidden onChange={handleFileChange} />
        </Button>

        {file && (
          <Typography variant="body2" color="textSecondary">
            Selected: {file.name}
          </Typography>
        )}

        <Button type="submit" variant="contained" disabled={uploading}>
          {uploading ? <CircularProgress size={24} /> : 'Upload'}
        </Button>

        {message && (
          <Typography variant="body2" color="primary" align="center">
            {message}
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default FileUploadModal;