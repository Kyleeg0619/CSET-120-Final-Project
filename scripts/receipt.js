// Retrieve HTML
// Get the stored cart items from localStorage
let savedCartItems = localStorage.getItem("cartItems");

// Check if there are saved items, then populate the cart
if (savedCartItems) {
  let cart = document.getElementById("cart");
  cart.innerHTML = savedCartItems;
  orderInfo();
  storeReceipt();
}

// Order Number Generation
function orderInfo() {
  const orderNumber = Math.floor(100000 + Math.random() * 900000);
  const currentDate = new Date().toLocaleDateString();
  const customerName = localStorage.getItem("orderName");
  const paymentMethod = localStorage.getItem("selectedOption");

  console.log(orderNumber, currentDate, customerName);

  let orderNum = document.getElementById("orderNumber");
  let orderDate = document.getElementById("orderDate");
  let customerNam = document.getElementById("orderName");
  let payMethod = document.getElementById("paymentMethod");

  orderNum.innerText = "#" + orderNumber;
  orderDate.innerText = currentDate;
  customerNam.innerText = customerName;
  payMethod.innerText = "Payment: " + paymentMethod;
}

function storeReceipt() {
  let receipt = document.getElementById("receipt");
  let receiptItems = receipt.innerHTML;
  console.log(receiptItems);

  localStorage.setItem("Receipt", receiptItems);
  console.log("Cart Successfully Stored!");
}
