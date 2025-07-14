import React from 'react';
import FileUpload from './components/FileUpload';
import GeneChart from './components/GeneChart';
import './index.css';
import './styles/FileUpload.css';

function App() {
  return (
    <div>
      <h1>Custom Data Visualize Dashboard</h1>
      <FileUpload />
      <GeneChart />
    </div>
  );
}

export default App;