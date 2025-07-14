import React, { useState } from 'react';
import axios from 'axios';
import '../styles/FileUpload.css';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post('http://localhost:5000/api/data/upload', formData);
      setMessage('File uploaded successfully');
    } catch (err) {
      setMessage('Error uploading file');
    }
  };

  return (
    <div className="file-upload-container">
      <form onSubmit={handleSubmit} className="upload-form">
        <input 
          type="file" 
          accept=".csv" 
          onChange={handleFileChange} 
          className="file-input" 
        />
        <button type="submit" className="upload-button">
          Upload CSV
        </button>
      </form>
      {message && <p className="message-text">{message}</p>}
    </div>
  );
};

export default FileUpload;