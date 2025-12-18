let allJobs = [];

// Fetch jobs from API
async function loadJobs() {
    try {
        const response = await fetch('/api/jobs');
        allJobs = await response.json();
        displayJobs(allJobs);
    } catch (error) {
        console.error('Error loading jobs:', error);
    }
}

// Display jobs in the feed
function displayJobs(jobs) {
    const jobFeed = document.getElementById('jobFeed');
    
    if (jobs.length === 0) {
        jobFeed.innerHTML = '<p style="color: var(--text-dim);">No jobs found matching your criteria.</p>';
        return;
    }
    
    jobFeed.innerHTML = jobs.map(job => `
        <div class="job-card">
            <div class="job-info">
                <h3>${job.title}</h3>
                <p class="company">${job.company} • ${job.location}</p>
                <div class="tags">
                    <span>${job.type}</span>
                    <span>Posted ${job.posted}</span>
                </div>
            </div>
            <button class="btn-primary" onclick="applyForJob(${job.id})">Apply Now</button>
        </div>
    `).join('');
}

// Search functionality
function searchJobs() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filtered = allJobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm)
    );
    displayJobs(filtered);
}

// Filter functionality
function filterJobs() {
    let filtered = [...allJobs];
    
    // Get selected job types
    const selectedTypes = [];
    if (document.getElementById('ft').checked) selectedTypes.push('Full-time');
    if (document.getElementById('pt').checked) selectedTypes.push('Part-time');
    if (document.getElementById('ct').checked) selectedTypes.push('Contract');
    if (document.getElementById('rm').checked) selectedTypes.push('Remote');
    
    if (selectedTypes.length > 0) {
        filtered = filtered.filter(job => 
            selectedTypes.includes(job.type) || 
            (selectedTypes.includes('Remote') && job.location === 'Remote')
        );
    }
    
    displayJobs(filtered);
}

// Apply for job
async function applyForJob(jobId) {
    const applicantName = prompt('Enter your name:');
    const email = prompt('Enter your email:');
    
    if (!applicantName || !email) {
        alert('Application cancelled');
        return;
    }
    
    try {
        const response = await fetch('/api/apply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ jobId, applicantName, email })
        });
        
        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Error applying:', error);
        alert('Error submitting application');
    }
}

// Load jobs when page loads
document.addEventListener('DOMContentLoaded', loadJobs);