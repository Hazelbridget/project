import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubjectMarks from './SubjectMarks';
import OverallReport from './OverallReport';

const StudentDashboard = () => {
    const [regNo, setRegNo] = useState('');
    const [studentDetails, setStudentDetails] = useState(null);
    const [subject, setSubject] = useState('');
    const [view, setView] = useState('');

    useEffect(() => {
        if (regNo) {
            console.log(`Fetching details for regNo: ${regNo}`); 
            axios.get(`http://localhost:3000/student/${regNo}`)
                .then(response => {
                    console.log('Student details fetched successfully:', response.data);
                    setStudentDetails(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the student details!', error);
                    setStudentDetails(null);
                });
        }
    }, [regNo]);

    const handleViewMarks = () => regNo && setView('marks');
    const handleViewReport = () => regNo && setView('report');
    const handleBack = () => setView('');
    const handleClear = () => setSubject('');
    const handleLogout = () => console.log('User logged out');

    return (
        <div>
            {view === '' && (
                <form>
                    <div>
                        <label>Registration Number:</label>
                        <input 
                            type="text" 
                            value={regNo} 
                            onChange={e => setRegNo(e.target.value)} 
                        />
                    </div>
                    {studentDetails && (
                        <div className="student-info">
                            <p><strong>Name:</strong> {studentDetails.name}</p>
                            <p><strong>Class:</strong> {studentDetails.class}</p>
                        </div>
                    )}
                    <button type="button" onClick={handleViewMarks}>Next</button>
                    <button type="button" onClick={handleViewReport}>View Overall Report</button>
                </form>
            )}
            {view === 'marks' && (
                <>
                    <form>
                        <div>
                            <label>Subject:</label>
                            <select value={subject} onChange={e => setSubject(e.target.value)}>
                                <option value="">Select Subject</option>
                                <option value="Machine Learning">Machine Learning</option>
                                <option value="ADBMS">ADBMS</option>
                                <option value="Research Paper">Research Paper</option>
                                <option value="Natural Language Processing">NLP</option>
                            </select>
                        </div>
                        <button type="button" className="small-button" onClick={handleClear}>Clear</button>
                        <button type="button" className="small-button" onClick={handleBack}>Back</button>
                    </form>
                    {subject ? <SubjectMarks regNo={regNo} subject={subject} /> : <p>Please select a subject to view marks.</p>}
                </>
            )}
            {view === 'report' && (
                <>
                    <OverallReport regNo={regNo} />
                    <button type="button" className="small-button" onClick={handleBack}>Back</button>
                </>
            )}
            <div className="logout-button-container">
                <button type="button" className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default StudentDashboard;
