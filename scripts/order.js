document
  .getElementById("submitOrder")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevents the form from submitting
    window.location.href = "recipt.html"; // Redirects to the cart page
  });

document
  .getElementById("reviewOrder")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission

    let orderform = document.querySelector(".order-section");

    // Get the selected coffee, tea, or food options
    let coffeeOptions = [];
    let teaOptions = [];
    let pastryOptions = [];
    let customOptions = [];
    let total = 0;

    // *** REQUIRED ORDER FUNCTIONS ***

    // Coffee
    let coffeeItems = orderform.querySelectorAll(
      ".pre-options .p-option:nth-child(1) input[type='checkbox']"
    );
    coffeeItems.forEach((item) => {
      if (item.checked) {
        coffeeOptions.push(item.closest("li").childNodes[1].textContent.trim());
        let price = parseFloat(item.dataset.price) || 0; // Get price with decimals
        total += price; // Accumulate total with decimal price
      }
    });

    // Teas & Other Drinks
    let teaItems = orderform.querySelectorAll(
      ".pre-options .p-option:nth-child(2) input[type='checkbox']"
    );
    teaItems.forEach((item) => {
      if (item.checked) {
        teaOptions.push(item.closest("li").childNodes[1].textContent.trim());
        let price = parseFloat(item.dataset.price) || 0; // Get price with decimals
        total += price; // Accumulate total with decimal price
      }
    });

    // Pastries & Food
    let pastryItems = orderform.querySelectorAll(
      ".pre-options .p-option:nth-child(3) input[type='checkbox']"
    );
    pastryItems.forEach((item) => {
      if (item.checked) {
        pastryOptions.push(item.closest("li").childNodes[1].textContent.trim());
        let price = parseFloat(item.dataset.price) || 0; // Get price with decimals
        total += price; // Accumulate total with decimal price
      }
    });

    // *** ADDED FEATURE ***
    // Custom Options (Create Your Own Section)
    let customSections = orderform.querySelectorAll(
      ".custom-options .p-option"
    );
    customSections.forEach((section) => {
      let items = section.querySelectorAll("li");
      items.forEach((item) => {
        let checkbox = item.querySelector("input[type='checkbox']");
        let select = item.querySelector("select");

        if (checkbox && checkbox.checked) {
          if (select) {
            let selectedText = select.options[select.selectedIndex].text;
            let price = parseFloat(select.dataset.price) || 0; // Get price with decimals
            customOptions.push(`${selectedText} - $${price.toFixed(2)}`);
            total += price; // Accumulate total with decimal price
          } else {
            customOptions.push(item.textContent.trim());
            let price = parseFloat(item.dataset.price) || 0;
            total += price; // Accumulate total with decimal price
          }
        }
      });
    });

    // Validate Input
    if (
      coffeeOptions.length === 0 &&
      teaOptions.length === 0 &&
      pastryOptions.length === 0 &&
      customOptions.length === 0
    ) {
      alert("Please select at least one item to order!");
      return;
    }

    // Order Summary
    let orderSummary = "";

    if (coffeeOptions.length > 0) {
      orderSummary += `You have ordered the following coffee options: ${coffeeOptions.join(
        ", "
      )}.\n`;
    }
    if (teaOptions.length > 0) {
      orderSummary += `You have ordered the following tea options: ${teaOptions.join(
        ", "
      )}.\n`;
    }
    if (pastryOptions.length > 0) {
      orderSummary += `You have ordered the following pastries/food items: ${pastryOptions.join(
        ", "
      )}.\n`;
    }
    if (customOptions.length > 0) {
      orderSummary += `Your custom options include: ${customOptions.join(
        ", "
      )}.\n`;
    }

    // Add total with decimal precision
    if (total > 0) {
      orderSummary += `Your total will be: $${total.toFixed(2)}`;
    }

    alert(orderSummary);
    let submitOrder = document.getElementById("submitOrder");
    submitOrder.style.display = "block";
  });
