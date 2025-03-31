import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Facultydashboard.css'
const FacultyDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title home-animate">Lab Performance System</h1>
      <button 
        className="home-btn home-btn-primary home-animate" 
        onClick={() => navigate('/marks-entry')}
        style={{ animationDelay: '0.2s' }}
      >
        Marks Entry
      </button>
      <button 
        className="home-btn home-btn-secondary home-animate"
        onClick={() => navigate('/generate-report')}
        style={{ animationDelay: '0.4s' }}
      >
        Generate Report
      </button>
    </div>
  );
};

export default FacultyDashboard;



