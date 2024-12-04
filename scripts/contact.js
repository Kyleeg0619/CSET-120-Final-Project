
// document.addEventListener("DOMContentLoaded", () => {
    
// });

function storeContactItems() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("message", message);

    // when button is clicked, hide the user's inputs
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";

    alert("Stored Contact information");

    // displays the formMessage from contact.html
    let formMessage = document.getElementById("formMessage");
    formMessage.classList.remove("hidden");

    // message goes away after 3 seconds
    setTimeout(() => {
        formMessage.classList.add("hidden");
    }, 3000);
}



