document.getElementById("submitOrder").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default form submission

  let selectedItems = [];
  let total = 0;

  const groupedItems = {
    "Drink Base": { names: [], price: 0, charged: false },
    "Flavors": { names: [], price: 0 },
    "Add-Ons": { names: [], price: 0 },
  };

  // Process premade items
  const premadeCheckboxes = document.querySelectorAll(".pre-options .p-option input[type='checkbox']");
  premadeCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const itemName = checkbox.closest("li").childNodes[1].textContent.trim();
      const itemPrice = parseFloat(checkbox.dataset.price || 0);
      selectedItems.push({ name: itemName, price: itemPrice });
      total += itemPrice;
    }
  });

  // Process custom drink checkboxes and group items by category
  const customCheckboxes = document.querySelectorAll(".custom-options .p-option input[type='checkbox']");
  customCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const itemName = checkbox.closest("li").childNodes[1].textContent.trim();
      const itemPrice = parseFloat(checkbox.dataset.price || 0);

      // Deduplicate Drink Base
      if (checkbox.closest(".p-option").querySelector("h3").textContent.includes("Drink Bases")) {
        if (!groupedItems["Drink Base"].charged) {
          groupedItems["Drink Base"].price += 5; // Charge only once for base
          groupedItems["Drink Base"].charged = true;
        }
        if (!groupedItems["Drink Base"].names.includes(itemName)) {
          groupedItems["Drink Base"].names.push(itemName); // Add base if not already added
        }
      }

      // Deduplicate Flavors
      if (checkbox.closest(".p-option").querySelector("h3").textContent.includes("Flavors")) {
        if (!groupedItems["Flavors"].names.includes(itemName)) {
          groupedItems["Flavors"].names.push(itemName);
          groupedItems["Flavors"].price += itemPrice;
        }
      }

      // Deduplicate Add-Ons
      if (checkbox.closest(".p-option").querySelector("h3").textContent.includes("Drink Add-ons")) {
        if (!groupedItems["Add-Ons"].names.includes(itemName)) {
          groupedItems["Add-Ons"].names.push(itemName);
          groupedItems["Add-Ons"].price += itemPrice;
        }
      }
    }
  });

  // Process custom drink options (like syrups, milk, etc.)
  const selects = document.querySelectorAll(".custom-options select");
  selects.forEach((select) => {
    const checkbox = select.closest("li").querySelector("input[type='checkbox']");
    if (checkbox && checkbox.checked) {
      const optionName = select.options[select.selectedIndex].text;
      const optionPrice = parseFloat(select.dataset.price || 0);

      if (select.name === "milk-base") {
        if (!groupedItems["Drink Base"].names.includes(optionName)) {
          groupedItems["Drink Base"].names.push(optionName); // Add to Drink Base
        }
      } else if (select.name.includes("syrups") || select.name.includes("flavors")) {
        if (!groupedItems["Flavors"].names.includes(optionName)) {
          groupedItems["Flavors"].names.push(optionName); // Add to Flavors
          groupedItems["Flavors"].price += optionPrice;
        }
      } else {
        if (!groupedItems["Add-Ons"].names.includes(optionName)) {
          groupedItems["Add-Ons"].names.push(optionName); // Add to Add-Ons
          groupedItems["Add-Ons"].price += optionPrice;
        }
      }
    }
  });

  // Add grouped custom items to the selectedItems array

  if (groupedItems["Drink Base"].names.length > 0) {
    selectedItems.push({
      name: `Drink Base: ${[...new Set(groupedItems["Drink Base"].names)].join(", ")}`,
      price: groupedItems["Drink Base"].price,
    });
    total += groupedItems["Drink Base"].price;
  }

  if (groupedItems["Flavors"].names.length > 0) {
    selectedItems.push({
      name: `Flavors: ${[...new Set(groupedItems["Flavors"].names)].join(", ")}`,
      price: groupedItems["Flavors"].price,
    });
    total += groupedItems["Flavors"].price;
  }

  if (groupedItems["Add-Ons"].names.length > 0) {
    selectedItems.push({
      name: `Add-Ons: ${[...new Set(groupedItems["Add-Ons"].names)].join(", ")}`,
      price: groupedItems["Add-Ons"].price,
    });
    total += groupedItems["Add-Ons"].price;
  }

  // Remove unnecessary blank rows or empty items
  selectedItems = selectedItems.filter((item) => item.name.trim() !== "");

  // Generate order number and date
  const orderNumber = Math.floor(100000 + Math.random() * 900000);
  const currentDate = new Date().toLocaleDateString();

  // Mock logged-in customer data
  const customerName = "John Doe";
  const customerAddress = "1234 Customer St, Customer Town, ST 12345";

  // Save order details to localStorage
  localStorage.setItem("orderDetails", JSON.stringify(selectedItems));
  localStorage.setItem("totalAmount", total.toFixed(2));
  localStorage.setItem("orderNumber", orderNumber);
  localStorage.setItem("orderDate", currentDate);
  localStorage.setItem("customerName", customerName);
  localStorage.setItem("customerAddress", customerAddress);

  // Redirect to receipt page
  window.location.href = "recipt.html";
});


document
  .getElementById("reviewOrder")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission

    let orderform = document.querySelector(".order-section");

    // Initialize arrays for each category
    let coffeeOptions = [];
    let teaOptions = [];
    let pastryOptions = [];
    let customOptions = [];
    let total = 0;

    // Process coffee options
    let coffeeItems = orderform.querySelectorAll(
      ".pre-options .p-option:nth-child(1) input[type='checkbox']"
    );
    coffeeItems.forEach((item) => {
      if (item.checked) {
        const itemName = item.closest("li").childNodes[1].textContent.trim();
        if (!coffeeOptions.includes(itemName)) { // Avoid duplicates
          coffeeOptions.push(itemName);
          total += parseFloat(item.dataset.price) || 0;
        }
      }
    });

    // Process tea options
    let teaItems = orderform.querySelectorAll(
      ".pre-options .p-option:nth-child(2) input[type='checkbox']"
    );
    teaItems.forEach((item) => {
      if (item.checked) {
        const itemName = item.closest("li").childNodes[1].textContent.trim();
        if (!teaOptions.includes(itemName)) { // Avoid duplicates
          teaOptions.push(itemName);
          total += parseFloat(item.dataset.price) || 0;
        }
      }
    });

    // Process pastry options
    let pastryItems = orderform.querySelectorAll(
      ".pre-options .p-option:nth-child(3) input[type='checkbox']"
    );
    pastryItems.forEach((item) => {
      if (item.checked) {
        const itemName = item.closest("li").childNodes[1].textContent.trim();
        if (!pastryOptions.includes(itemName)) { // Avoid duplicates
          pastryOptions.push(itemName);
          total += parseFloat(item.dataset.price) || 0;
        }
      }
    });

    // Process custom options
    let customSections = orderform.querySelectorAll(".custom-options .p-option");
    customSections.forEach((section) => {
      let items = section.querySelectorAll("li");
      items.forEach((item) => {
        let checkbox = item.querySelector("input[type='checkbox']");
        let select = item.querySelector("select");

        if (checkbox && checkbox.checked) {
          if (select) {
            const selectedText = select.options[select.selectedIndex].text;
            const price = parseFloat(select.dataset.price) || 0;
            if (!customOptions.includes(`${selectedText} - $${price.toFixed(2)}`)) { // Avoid duplicates
              customOptions.push(`${selectedText} - $${price.toFixed(2)}`);
              total += price;
            }
          } else {
            const itemName = item.textContent.trim();
            const price = parseFloat(item.dataset.price) || 0;
            if (!customOptions.includes(`${itemName} - $${price.toFixed(2)}`)) { // Avoid duplicates
              customOptions.push(`${itemName} - $${price.toFixed(2)}`);
              total += price;
            }
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

    // Generate Order Summary
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

    // Display the order summary in an alert
    alert(orderSummary);

    // Display submit order button
    let submitOrder = document.getElementById("submitOrder");
    submitOrder.style.display = "block";
  });
