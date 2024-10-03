function callApi(METHOD, URL, DATA, SUCCESS) {
    var xhttp = new XMLHttpRequest();
    xhttp.open(METHOD, URL, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200)
                SUCCESS(this.responseText);
            else
                alert("404: Service unavailable");
        }
    };

    xhttp.send(DATA);
}

function getCaptcha() {
    var url = "http://localhost:8080/captcha/getcaptcha/6";
    callApi("GET", url, "", loadCaptcha);
}

function loadCaptcha(res) {
    var captchaImage = document.getElementById("captchaImage");
    captchaImage.src = "data:image/png;base64," + res;
}

function validateCaptcha() {
    var captchaText = document.getElementById("captchaInput").value;

    if (captchaText.length === 0) {
        alert("Please enter the CAPTCHA.");
        return;
    }

    var url = "http://localhost:8080/captcha/validate/" + captchaText;
    callApi("GET", url, "", function (res) {
        var validationResult = document.getElementById("validationResult");
        validationResult.innerHTML = res;

        if (res === "Validation Success") {
            login();
        }
    });
}

function login() {
    var url = "http://localhost:8080/person/login";
    var username = document.getElementById("T1").value;
    var password = document.getElementById("T2").value;
    var userType = document.getElementById("userType").value; 

    var data = JSON.stringify({
        "username": username,
        "password": password,
    });

    callApi("POST", url, data, function (res) {
        alert(res);

        if (res === "Successfully logged in") {
            if (userType === "students") {
                window.location.href = "student.html";
            } else if (userType === "Admin") {
                window.location.href = "admin.html";
            } else if (userType === "company") {
                window.location.href = "company.html";
            } else if (userType === "university") {
                window.location.href = "university.html";
            } else {
                
                window.location.href = "admin.html";
            }
        } else {
            document.getElementById("T2").value = "";

            
        }
    });
}

function handleValidationResult(res) {
    var validationResult = document.getElementById("validationResult");
    validationResult.innerHTML = res;
}

window.onload = getCaptcha;
