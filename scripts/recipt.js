// Retrieve order details from localStorage
const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
const totalAmount = localStorage.getItem("totalAmount");
const orderNumber = localStorage.getItem("orderNumber");
const orderDate = localStorage.getItem("orderDate");
const customerName = localStorage.getItem("customerName");
const customerAddress = localStorage.getItem("customerAddress");

// Populate receipt details
document.getElementById("customerName").textContent = customerName;
document.getElementById("customerAddress").textContent = customerAddress;
document.getElementById("orderNumber").textContent = orderNumber;
document.getElementById("orderDate").textContent = orderDate;
document.getElementById("totalAmount").textContent = totalAmount;

// Populate order items
const orderItemsContainer = document.getElementById("orderItems");
orderDetails.forEach((item) => {
  const row = document.createElement("tr");
  const nameCell = document.createElement("td");
  const priceCell = document.createElement("td");

  nameCell.textContent = item.name;
  priceCell.textContent = `$${item.price.toFixed(2)}`;

  row.appendChild(nameCell);
  row.appendChild(priceCell);
  orderItemsContainer.appendChild(row);
});
