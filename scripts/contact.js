document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
  
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const formStatus = document.getElementById('form-status');
  
    // Validation for contact form 
    if (!name) {
      formStatus.textContent = 'Please enter your name.';
      formStatus.style.color = 'red';
      return;
    }
  
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      formStatus.textContent = 'Please enter a valid email address.';
      formStatus.style.color = 'red';
      return;
    }
  
    if (!message) {
      formStatus.textContent = 'Please enter your message.';
      formStatus.style.color = 'red';
      return;
    }
  
    // form submission
    formStatus.textContent = 'Thank you! Your message has been sent.';
    formStatus.style.color = 'green';
  
    // Clear form fields so you can resubmit the form.
    document.getElementById('contact-form').reset();
  });
  