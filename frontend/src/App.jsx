import React from 'react';
import FileUpload from './components/FileUpload';
import GeneChart from './components/Genechart';
import './index.css';
import './styles/fileupload.css';
import BusinessAnalyticsDashboard from './components/ba'
import './styles/dash.css'
function App() {
  return (
    <div>
      <h1>Custom Data Visualize Dashboard</h1>
      <FileUpload />
      <GeneChart />
      <BusinessAnalyticsDashboard/>
    </div>
  );
}

export default App;