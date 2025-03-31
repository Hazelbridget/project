const express = require('express');
const pool = require('./db'); // Import the database connection

const router = express.Router();

// Get student details by registration number
router.get('/student/:regNo', async (req, res) => {
    const { regNo } = req.params;
    try {
        const [rows] = await pool.query('SELECT name, class FROM students WHERE reg_no = ?', [regNo]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        console.error('Error fetching student details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get marks for a specific subject by registration number
router.get('/marks/:regNo/:subject', async (req, res) => {
    const { regNo, subject } = req.params;
    try {
        const [rows] = await pool.query(
            'SELECT test_date, topic, marks, total_marks FROM marks WHERE reg_no = ? AND subject = ?',
            [regNo, subject]
        );

        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.status(404).json({ error: 'Marks not found' });
        }
    } catch (error) {
        console.error('Error fetching marks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get overall report by registration number
router.get('/report/:regNo', async (req, res) => {
    const { regNo } = req.params;
    try {
        const [results] = await pool.query(
            'SELECT subject, SUM(marks) AS total_marks FROM marks WHERE reg_no = ? GROUP BY subject',
            [regNo]
        );
        if (results.length === 0) {
            return res.json([]); // Handle empty response properly
        }
        res.json(results);
    } catch (error) {
        console.error('Error fetching report:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
