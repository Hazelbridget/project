import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubjectMarks = ({ regNo, subject }) => {
    const [marks, setMarks] = useState([]);
    const [totalMarks, setTotalMarks] = useState(0);
    const [marksAvailable, setMarksAvailable] = useState(true);

    useEffect(() => {
        if (regNo && subject) {
            axios.get(`http://localhost:3000/marks/${regNo}/${subject}`)
                .then(response => {
                    if (!Array.isArray(response.data) || response.data.length === 0) {
                        setMarksAvailable(false);
                    } else {
                        setMarks(response.data);
                        const total = response.data.reduce((acc, mark) => acc + (mark.marks ?? 0), 0);
                        setTotalMarks(total);
                        setMarksAvailable(true);
                    }
                })
                .catch(error => {
                    console.error('Error fetching marks:', error);
                    setMarksAvailable(false);
                });
        }
    }, [regNo, subject]);

    return (
        <div className="result">
            <h2>Marks for {subject}</h2>
            {marksAvailable ? (
                marks.length > 0 ? (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Topic</th>
                                    <th>Marks Obtained</th>
                                    <th>Total Marks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {marks.map(mark => (
                                    <tr key={mark.id}>
                                        <td>{mark.test_date}</td>
                                        <td>{mark.topic}</td>
                                        <td>{mark.marks ?? 0}</td>
                                        <td>{mark.total_marks ?? 0}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className="highlight"><strong>Total Marks for {subject}: {totalMarks}</strong></p>
                    </>
                ) : (
                    <p>No marks available for this subject.</p>
                )
            ) : (
                <p>Marks not available for the selected subject.</p>
            )}
        </div>
    );
};

export default SubjectMarks;
