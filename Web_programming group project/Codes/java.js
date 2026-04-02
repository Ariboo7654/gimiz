const VALID_USERNAME = "admin";
const VALID_PASSWORD = "password123";
let attempts = 0;

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let errorMsg = document.getElementById("error-msg");

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        window.location.href = "products.html";
    } else {
        attempts++;
        errorMsg.textContent = "Invalid login. Attempts left: " + (3 - attempts);
        if (attempts >= 3) {
            window.location.href = "failed.html";
        }
    }
});