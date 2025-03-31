import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OverallReport = ({ regNo }) => {
    const [totals, setTotals] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (regNo) {
            console.log(`Fetching report for regNo: ${regNo}`);
            setLoading(true);
            setError(null);

            axios.get(`http://localhost:3000/report/${regNo}`)
                .then(response => {
                    console.log("API Response:", response.data);

                    if (!Array.isArray(response.data) || response.data.length === 0) {
                        setError("No data available for this student.");
                        setTotals({});
                        return;
                    }

                    const subjectTotals = response.data.reduce((acc, mark) => {
                        acc[mark.subject] = mark.total_marks ?? mark.marks ?? 0; // Fixed the key reference
                        return acc;
                    }, {});

                    setTotals(subjectTotals);
                })
                .catch(error => {
                    console.error("Error fetching report:", error);
                    setError("Failed to fetch report.");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [regNo]);

    return (
        <div className="result">
            <h2>Overall Report</h2>

            {loading && <p>Loading report...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!loading && !error && Object.keys(totals).length > 0 ? (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Total Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(totals).map(([subject, total]) => (
                            <tr key={subject}>
                                <td>{subject}</td>
                                <td>{total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (!loading && !error) ? (
                <p>No report available.</p>
            ) : null}
        </div>
    );
};

export default OverallReport;
