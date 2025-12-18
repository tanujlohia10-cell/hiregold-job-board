const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to handle data sent from forms
app.use(express.json());
app.use(express.static('public'));

// Mock Database of Jobs
const jobs = [
    { id: 1, title: 'Senior UX Designer', company: 'Goldman Creative', location: 'New York, NY', type: 'Full-time', posted: '2h ago' },
    { id: 2, title: 'Backend Developer', company: 'TechFlow Systems', location: 'Remote', type: 'Contract', posted: '5h ago' },
    { id: 3, title: 'Product Manager', company: 'InnovateCo', location: 'San Francisco, CA', type: 'Full-time', posted: '1d ago' },
    { id: 4, title: 'Frontend Developer', company: 'WebCraft Studios', location: 'Remote', type: 'Full-time', posted: '3d ago' },
    { id: 5, title: 'Data Scientist', company: 'Analytics Pro', location: 'Boston, MA', type: 'Full-time', posted: '1w ago' }
];

// API: Get all jobs
app.get('/api/jobs', (req, res) => {
    res.json(jobs);
});

// API: Handle Application Submission
app.post('/api/apply', (req, res) => {
    const { jobId, applicantName, email } = req.body;
    
    // In a real app, you'd save this to a database like MongoDB
    console.log(`New Application for Job ${jobId}: ${applicantName} (${email})`);
    
    res.status(200).json({ message: "Application received successfully!" });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});