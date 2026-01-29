const user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user) {
    location = "index.html";
}

document.getElementById("pname").value = user.name || "";
document.getElementById("pemail").value = user.email || "";

function saveProfile() {

    user.phone = document.getElementById("pphone").value;
    user.location = document.getElementById("plocation").value;
    user.education = document.getElementById("pedu").value;
    user.skills = document.getElementById("pskills").value;
    user.exp = document.getElementById("pexp").value;

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    alert("Profile Updated Successfully!");
}
