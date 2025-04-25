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
} from '@mui/material';

const FileUploadForm = () => {
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
        setCategories(res.data); // Assuming your backend sends an array of { id, name }
      } catch (err) {
        console.error('Failed to load categories', err);
        setMessage('Failed to load categories, please try again later.');
      }
    };
console.log('hello:', categories);

    fetchCategories();
  }, []);

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
    formData.append('categoryId', category); // sending category ID

    try {
      setUploading(true);
      const res = await axios.post(`${backendUrl}uploadDoc`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(res.data.message || 'File uploaded successfully!');
    } catch (err) {
      setMessage('Upload failed');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 500,
        mx: 'auto',
        mt: 5,
        p: 4,
        borderRadius: 2,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
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
              {cat.categoryName}
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
  );
};

export default FileUploadForm;