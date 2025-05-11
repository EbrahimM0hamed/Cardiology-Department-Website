// Our Java Script code and any backend will be here
window.addEventListener('scroll', () => {
    const headerName = document.querySelector('.name');
    if (window.scrollY > 50) { // Change styles after 50px scroll
        headerName.classList.add('name-scroll');
    } else {
        headerName.classList.remove('name-scroll');
    }
});

document.addEventListener("DOMContentLoaded", () => {
 const signInButton = document.querySelector(".submit button");

    signInButton.addEventListener("click", () => {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        
        if (username === "doctor" && password === "2028") {
            username = document.getElementById("successful");
            username.classList.add("successful-msg");
            alert("Sign in successful!");
            // You can redirect the user if needed:
            // window.location.href = "dashboard.html";
        } else {
            alert("Invalid username or password.");
        }
    });
});