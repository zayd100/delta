import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/genechart.css';

const GeneChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/data');
      setData(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          <p className="tooltip-value">
            Employees: {payload[0].value.toLocaleString()}
          </p>
          {payload[0].payload.industry && (
            <p className="tooltip-industry">Industry: {payload[0].payload.industry}</p>
          )}
        </div>
      );
    }
    return null;
  };

  const formatXAxisLabel = (tickItem) => {
    if (tickItem.length > 12) {
      return tickItem.substring(0, 12) + '...';
    }
    return tickItem;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <span className="loading-text">Loading chart data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <svg className="error-icon" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span className="error-message">{error}</span>
        </div>
        <button 
          onClick={fetchData}
          className="retry-button"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="chart-wrapper">
      <div className="chart-header">
        <h2 className="chart-title">
          Company Employee Distribution
        </h2>
        <p className="chart-subtitle">
          Number of employees across different organizations
        </p>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 80,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12, fill: '#666' }}
              tickFormatter={formatXAxisLabel}
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#666' }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="number_of_employees" 
              fill="#3b82f6"
              name="Number of Employees"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-footer">
        Total Companies: {data.length} | 
        Total Employees: {data.reduce((sum, item) => sum + item.number_of_employees, 0).toLocaleString()}
      </div>
    </div>
  );
};

export default GeneChart;