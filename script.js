document.getElementById('resumeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get the username
    const username = document.getElementById('username').value;
    if (!username) {
        alert('Please enter a username');
        return;
    }

    // Generate the unique URL
    const resumeUrl = `https://${username}.vercel.app/resume`;
    document.getElementById('resumeUrl').textContent = resumeUrl;
    
    // Show the result section
    document.getElementById('result').classList.remove('hidden');

    // Copy Link Functionality
    document.getElementById('copyLink').addEventListener('click', function() {
        navigator.clipboard.writeText(resumeUrl)
            .then(() => alert('Resume URL copied to clipboard!'))
            .catch(() => alert('Failed to copy URL'));
    });

    // Download PDF Functionality
    document.getElementById('downloadPdf').addEventListener('click', function() {
        const element = document.createElement('a');
        const content = `Resume for ${username}\nYour unique resume URL: ${resumeUrl}`;
        const blob = new Blob([content], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        element.href = url;
        element.download = `${username}_resume.pdf`;
        document.body.appendChild(element);
        element.click();
        
        // Clean up
        document.body.removeChild(element);
        URL.revokeObjectURL(url);
    });
});
