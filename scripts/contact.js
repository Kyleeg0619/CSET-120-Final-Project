
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  // Declare variables to store input data
  let feedbackName = "";
  let feedbackEmail = "";
  let feedbackMessage = "";

  form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent actual form submission

  // Assign input values to variables
  feedbackName = document.getElementById("name").value.trim();
  feedbackEmail = document.getElementById("email").value.trim();
  feedbackMessage = document.getElementById("message").value.trim();

  if (feedbackName && feedbackEmail && feedbackMessage) {
    console.log("Feedback Data:");
    console.log("Name:", feedbackName);
    console.log("Email:", feedbackEmail);
    console.log("Message:", feedbackMessage);

    form.reset(); // Clear the form
    formMessage.classList.remove("hidden"); // Show the success message

    // Optionally hide the success message after a few seconds
    setTimeout(() => {
        formMessage.classList.add("hidden");
    }, 3000);
} else {
    alert("Please fill out all fields before submitting.");
}
});
});

  // Simulate form submission logic
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

      if (name && email && message) {
          form.reset(); // Clear the form
          formMessage.classList.remove("hidden"); // Show the success message

          // Optionally hide the success message after a few seconds
          setTimeout(() => {
              formMessage.classList.add("hidden");
          }, 3000);
      }


