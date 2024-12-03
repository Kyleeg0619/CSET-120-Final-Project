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
    let cartContainer= document.querySelector(".cart-items-container");
    cartContainer.innerHTML='';

    // Get the selected coffee, tea, or food options
    // let coffeeOptions = [];
    // let teaOptions = [];
    // let pastryOptions = [];
    // let customOptions = [];
    let total = 0;
    let cartItems=[];

    // *** REQUIRED ORDER FUNCTIONS ***

    // Coffee
    let coffeeItems = orderform.querySelectorAll(
      ".pre-options .p-option:nth-child(1) input[type='checkbox']"
    );
    coffeeItems.forEach((item) => {
      if (item.checked) {
        // coffeeOptions.push(item.closest("li").childNodes[1].textContent.trim());
        let itemName=item.closest("li").childNodes[1].textContent.trim()
        let price = parseFloat(item.dataset.price) || 0; // Get price with decimals
        total += price; // Accumulate total with decimal price
        cartItems.push({name: itemName, price:price});
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
        cartItems.push({name: itemName, price:price});
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
        cartItems.push({name: itemName, price:price});
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
          let itemName = item.textContent.trim();
          let price = 0;
          if (select) {
            let selectedText = select.options[select.selectedIndex].text;
            price = parseFloat(select.dataset.price) || 0;
            // customOptions.push(`${selectedText} - $${price.toFixed(2)}`);
          } else {
            // customOptions.push(itemName);
            price = parseFloat(item.dataset.price) || 0;
          }
          total += price;
          cartItems.push({ name: itemName, price: price });
        }
      });
    });


    // Validate Input
    if (
      // coffeeOptions.length === 0 &&
      // teaOptions.length === 0 &&
      // pastryOptions.length === 0 &&
      // customOptions.length === 0 &&
      cartItems.length===0
    ) {
      alert("Please select at least one item to order!");
      return;
    }
    // add cart items
    cartItems.forEach(item => {
      let cartItemDiv= document.createElement('div');
      cartItemDiv.classList.add("cart-item");

      let cartItemContent= `
         <img src="https://via.placeholder.com/100" alt="item image" class="item-img">
          <div class="item-info">
              <h2 class="item-name">${item.name}</h2>
              <p class="item-price">$${item.price.toFixed(2)}</p>
          </div>
          <div class="quantity">
              <label for="qty">Quantity:</label>
              <input type="number" class="item-qty" value="1" min="1">
          </div>
          <button class="remove-item">Remove</button>
      `;
      cartItemDiv.innerHTML=cartItemContent;
      cartContainer.appendChild(cartItemDiv);

      // remoce button query
      cartItemDiv.querySelector(".remove-item").addEventListener("click",function(){

        cartItemDiv.remove();

        total-=(item.price * item.quantity);
        document.getElementById("total-price").textContent = total.toFixed(2);
        // if (cartContainer.querySelectorAll(".cart-item").length === 0) {
        //   let submitOrderButton = document.getElementById("submitOrder");
        //   submitOrderButton.style.display = "none";
        // }
      });
      cartItemDiv.querySelector(".item-qty").addEventListener("input", function (event) {
        let newQuantity = parseInt(event.target.value);
        if (newQuantity > 0) {
          item.quantity = newQuantity;
          total = 0;
          cartItems.forEach(cartItem => {
            total += (cartItem.price * cartItem.quantity);
          });
          document.getElementById("total-price").textContent = total.toFixed(2);
        }
      });
    });
    // Order Summary
    // let orderSummary = "";

    // if (coffeeOptions.length > 0) {
    //   orderSummary += `You have ordered the following coffee options: ${coffeeOptions.join(
    //     ", "
    //   )}.\n`;
    // }
    // if (teaOptions.length > 0) {
    //   orderSummary += `You have ordered the following tea options: ${teaOptions.join(
    //     ", "
    //   )}.\n`;
    // }
    // if (pastryOptions.length > 0) {
    //   orderSummary += `You have ordered the following pastries/food items: ${pastryOptions.join(
    //     ", "
    //   )}.\n`;
    // }
    // if (customOptions.length > 0) {
    //   orderSummary += `Your custom options include: ${customOptions.join(
    //     ", "
    //   )}.\n`;
    // }
    //total price
    document.getElementById("total-price").textContent = total.toFixed(2);
    // Add total with decimal precision
    // if (total > 0) {
    //   orderSummary += `Your total will be: $${total.toFixed(2)}`;
    // }

    // alert(orderSummary);
    // let submitOrder = document.getElementById("submitOrder");
    // submitOrder.style.display = "block";
    //show submit btn
    let submitOrderButton= document.getElementById("submitOrder");
    submitOrderButton.style.display="block";
  });
