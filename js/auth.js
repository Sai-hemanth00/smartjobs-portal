const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(e){
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        const users = JSON.parse(localStorage.getItem("users")) || [];

        if(users.length === 0){
            alert("No account found. Please register first.");
            return;
        }

        const userByEmail = users.find(u => u.email === email);

        if(!userByEmail){
            alert("Account not found. Please register first.");
            return;
        }

        if(userByEmail.password !== password){
            alert("Invalid email or password");
            return;
        }

        localStorage.setItem("loggedInUser", JSON.stringify(userByEmail));

        if(userByEmail.role === "user"){
            window.location.href = "dashboard.html";
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
