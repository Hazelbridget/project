import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/hod.css';

const HodDashboard = () => {
  const navigate = useNavigate();

  const handleViewReport = () => {
    navigate('/classes');
  };

  const handleLogout = () => {
    // Handle logout logic here
    alert('Logged out');
    navigate('/');
  };

  return (
    <div className="hod-dashboard">
      <h1>HOD Dashboard</h1>
      <button onClick={handleViewReport}>View Report</button>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default HodDashboard;