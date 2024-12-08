if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  document
    .getElementById("submitOrder")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Prevents the form from submitting
      storeCart();
      window.location.href = "payment.html";
    });

  var removeCartItemButtons = document.getElementsByClassName("btn-danger");
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var addToCartButtons = document.getElementsByClassName("shop-item-button");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchaseClicked);
}

function purchaseClicked() {
  alert("Thank you for your purchase");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This item is already added to the cart");
      return;
    }
  }
  var cartRowContents = `
      <div class="cart-item cart-column">
          <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
          <span class="cart-item-title">${title}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" type="number" value="1">
          <button class="btn btn-danger" type="button">REMOVE</button>
      </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

function calcCustomTotal() {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  const basePrice = 5; // Starting base price

  let totalPrice = basePrice;
  let selectedItems = ["Base Price ($5.00)"];

  // Iterate through each checkbox
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const price = parseFloat(checkbox.dataset.price || 0);
      totalPrice += price;

      const listItem = checkbox.closest("li");
      if (listItem) {
        const label = listItem.querySelector("label");
        const dropdown = listItem.querySelector("select");

        if (dropdown) {
          // If a dropdown exists, add the selected dropdown option
          const selectedOption = dropdown.options[dropdown.selectedIndex].text;
          const dropdownPrice = parseFloat(dropdown.dataset.price || 0);
          totalPrice += dropdownPrice;
          selectedItems.push(`${selectedOption} (${dropdownPrice})`);
        } else if (label) {
          // If no dropdown but a label exists, add the label text
          selectedItems.push(label.innerText.trim());
        } else {
          // If no dropdown or label, use the text content of the <li>
          selectedItems.push(listItem.textContent.trim());
        }
      }
    }
  });

  // Display the result
  // alert(
  //   `Your Custom Drink:\n${selectedItems.join(
  //     ", "
  //   )}\nTotal Price: $${totalPrice.toFixed(2)}`
  // );
  // addCustomToCart(selectedItems, totalPrice);
  // updateCartTotal();
}

function addCustomToCart(title, price) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This item is already added to the cart");
      return;
    }
  }
  var cartRowContents = `
      <div class="cart-item cart-column">
          <img class="cart-item-image" src="images/build-your-own-graphic.PNG" width="100" height="100">
          <span class="cart-item-title">${title}</span>
      </div>
      <span class="cart-price cart-column">$${price}</span>
      <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" type="number" value="1">
          <button class="btn btn-danger" type="button">REMOVE</button>
      </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}

// ***Retrieve Cart***
function storeCart() {
  let cart = document.getElementById("cart");
  let cartItems = cart.innerHTML;

  let customerName = document.getElementById("customerName").value;

  localStorage.setItem("orderName", customerName);
  localStorage.setItem("cartItems", cartItems);
  console.log("Cart Successfully Stored!");
}

// Function to hide deleted items
function hideDeletedItems() {
  const shopItems = document.querySelectorAll(".shop-item");
  shopItems.forEach((item) => {
    const itemName = item.querySelector(".shop-item-title").innerText;
    if (localStorage.getItem(`hide-${itemName}`) === "true") {
      item.style.display = "none";
    }
  });
}

// Function to hide deleted items and show re-added items
function updateOrderItems() {
  const shopItems = document.querySelectorAll(".shop-item");
  shopItems.forEach((item) => {
    const itemName = item.querySelector(".shop-item-title").innerText;
    if (localStorage.getItem(`hide-${itemName}`) === "true") {
      item.style.display = "none"; // Hide deleted items
    } else {
      item.style.display = "block"; // Show re-added items
    }
  });
}

// Run the function on page load
document.addEventListener("DOMContentLoaded", () => {
  updateOrderItems();
});

// Run the function on page load
document.addEventListener("DOMContentLoaded", () => {
  hideDeletedItems();
});
