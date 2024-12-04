function storeSelectedValue() {
    // Get all radio buttons with the name "options"
    const radios = document.getElementsByName('pay-opt');
    
    // Iterate through radio buttons to find the selected one
    for (let radio of radios) {
      if (radio.checked) {
        // Store the selected value in localStorage
        localStorage.setItem('selectedOption', radio.value);
        alert(`Selected value "${radio.value}" stored locally!`);
        window.location.href = "receipt.html";
      }
    }
  }
  