import React from "react";

const Sidebar = ({ setView }) => {
    return (
        <div className="admin-sidebar">
            <h2>Admin Panel</h2>
            <ul>
                <li onClick={() => setView("adminDashboard")}>Dashboard</li>
                <li onClick={() => setView("facultyManagement")}>Manage Faculty</li>
                <li onClick={() => setView("studentManagement")}>Manage Students</li>
            </ul>
        </div>
    );
};

export default Sidebar;