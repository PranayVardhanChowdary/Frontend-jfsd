function callApi(METHOD, URL, DATA, SUCCESS) {
  var xhttp = new XMLHttpRequest();
  xhttp.open(METHOD, URL, true);
  xhttp.setRequestHeader('Content-Type', 'application/json');

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        SUCCESS(this.responseText);
      } else {
        alert("HTTP " + this.status + ": Service unavailable");
      }
    }
  };

  xhttp.send(DATA);
}

function uploadFile() {
  var studentName = document.getElementById("studentName").value;
  var fileInput = document.getElementById("file");

  var formData = new FormData();
  formData.append("studentName", studentName);
  formData.append("file", fileInput.files[0]);

  callApi(
    "POST",
    "/resumes/upload",
    formData,
    function (response) {
      alert("Resume uploaded successfully");
    }
  );
}

var uploadButton = document.getElementById("uploadButton");
uploadButton.addEventListener("click", uploadFile);
