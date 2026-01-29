const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(
            u => u.email === email.value && u.password === password.value
        );

        if (user) {
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            location = "dashboard.html";
        } else {
            alert("Invalid Login");
        }
    });
}

if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.some(u => u.email === email.value)) {
            alert("User already exists!");
            return;
        }

        users.push({
            name: name.value,
            email: email.value,
            password: password.value,
            role: role.value
        });

        localStorage.setItem("users", JSON.stringify(users));
        location = "index.html";
    });
}
