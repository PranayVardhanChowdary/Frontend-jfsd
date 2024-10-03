



no need of student.js javascript written in html itself

function getAllJobPostings() {
    var url = "http://localhost:8080/jobs/all";

    callApi("GET", url, null, displayJobPostings);
}

function displayJobPostings(response) {
    var jobList = JSON.parse(response);

    var jobListElement = document.getElementById("jobList");
    jobListElement.innerHTML = "";

    for (var i = 0; i < jobList.length; i++) {
        var job = jobList[i];
        var listItem = document.createElement("li");
        listItem.textContent = "Job Name: " + job.jobname + ", Location: " + job.joblocation + ", Description: " + job.jobdrecption;
        jobListElement.appendChild(listItem);
    }
}

function callApi(METHOD, URL, DATA, SUCCESS) {
    var xhttp = new XMLHttpRequest();
    xhttp.open(METHOD, URL, true);

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                SUCCESS(this.responseText);
            } else {
                alert("HTTP status " + this.status + ": Service unavailable");
            }
        }
    };

    if (METHOD === "POST") {
        xhttp.setRequestHeader('Content-Type', 'application/json');
    }

    xhttp.send(DATA);
}

// Automatically call getAllJobPostings when the page is loaded
window.onload = getAllJobPostings;
