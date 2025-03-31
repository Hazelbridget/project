import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import AdminDashboard from "./Components/AdminDashboard";
import FacultyDashboard from "./Components/FacultyDashboard";
import StudentDashboard from "./Components/StudentDashboard";
import HodDashboard from "./Components/HodDashboard";
import Classes from "./Components/Classes";
import MarksEntry from "./Components/MarksEntry";
import GenerateReport from "./Components/GenerateReport";
import MarksOverview from "./Components/MarksOverview";
import Overview from "./Components/Overview";
import FacultyDetailsForm from "./Components/FacultyDetailsForm";
import FacultyManagement from "./Components/FacultyManagement";
import Sidebar from "./Components/Sidebar";
import ViewFacultyProfile from "./Components/ViewFacultyProfile";
// Import student components
import StudentForm from "./Components/StudentForm";
import ManageStudents from "./Components/ManageStudents";
import ViewProfile from "./Components/ViewProfile";
import StudentDetails from "./Components/StudentDetails"; // Add this import
import SubjectMarks from "./Components/SubjectMarks";
import OverallReport from "./Components/OverallReport";
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Login />} />
        
        {/* Dashboard Routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/hod-dashboard" element={<HodDashboard />} />
        
        {/* Marks Management Routes */}
        <Route path="/classes" element={<Classes />} />
        <Route path="/marks-entry" element={<MarksEntry />} />
        <Route path="/marks-overview" element={<MarksOverview />} />
        <Route path="/generate-report" element={<GenerateReport />} />
        
        {/* Faculty Management Routes */}
        <Route path="/overview" element={<Overview />} />
        <Route path="/faculty-details-form" element={<FacultyDetailsForm />} />
        <Route path="/faculty-management" element={<FacultyManagement />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/view-faculty-profile" element={<ViewFacultyProfile />} />
        
        {/* Student Management Routes */}
        <Route path="/manage-students" element={<ManageStudents />} />
        <Route path="/student-form" element={<StudentForm />} />
        <Route path="/student-form/:regNo" element={<StudentForm editMode={true} />} />
        <Route path="/view-profile/:regNo" element={<ViewProfile />} />
        <Route path="/student-details" element={<StudentDetails />} /> {/* Add this route */}

        {/* Student Dashboard Routes */}
        <Route path="/subject-marks" element={<SubjectMarks />} />
        <Route path="/overall-report" element={<OverallReport />} />
      </Routes>
    </Router>
  );
};

export default App;