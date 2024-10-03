// Function to fetch student and company counts and update the HTML
function fetchCounts() {
    // AJAX request to get student count
    fetch('/person/countStudents')
        .then(response => response.json())
        .then(data => {
            document.getElementById('studentCount').textContent = data;
        })
        .catch(error => {
            console.error('Error fetching student count:', error);
        });

    // AJAX request to get company count
    fetch('/person/countCompanies')
        .then(response => response.json())
        .then(data => {
            document.getElementById('companyCount').textContent = data;
        })
        .catch(error => {
            console.error('Error fetching company count:', error);
        });
}

// Call the function to fetch and display counts on page load
fetchCounts();
