const nav = document.getElementById("navActions");
const user = JSON.parse(localStorage.getItem("loggedInUser"));

if (nav) {
    if (user) {
        nav.innerHTML = `
            <a href="profile.html" class="nav-btn">Profile</a>
            <a href="post-job.html" class="nav-btn">Post Job</a>
            <button class="logout-btn" onclick="logout()">Logout</button>
        `;
    } else {
        nav.innerHTML = `
            <a href="index.html" class="nav-btn">Login</a>
            <a href="register.html" class="nav-btn">Register</a>
        `;
    }
}

function logout() {
    localStorage.removeItem("loggedInUser");
    location.href = "index.html";
}
