// function to show the selected section and hide others
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
}

// toggle the mobile menu
function toggleMenu() {
    const navList = document.querySelector('.nav-list');
    const hamburger = document.querySelector('.hamburger');
    navList.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Sign out (redirect to login page)
function signOut() {
    window.location.href = 'signup-login.html';  // Redirect to login page
}

// Default menu items
const defaultMenuItems = [
    { name: "Celestial Stack", price: 6.85 },
    { name: "Enchanted Moon Cookies", price: 2.75 },
    { name: "Mystic Herb & Veggie Wrap", price: 6.55 },
    { name: "Potion of Prosperity", price: 4.85 },
    { name: "The Witch's Spiral", price: 3.75 },
    { name: "Spellbound Muffins", price: 2.15 },
    { name: "Herbal Spell Toast", price: 3.15 },
    { name: "Starry Night Cocoa", price: 3.55 },
    { name: "Cinnamon Spell", price: 5.75 },
    { name: "Potion of the Forest", price: 6.1 },
    { name: "Moonbeam Tea", price: 4.1 },
    { name: "Witch's Orchard", price: 5.85 },
    { name: "Starlight Pearls", price: 6.25 },
    { name: "Lavender Moon", price: 5.8 },
    { name: "Sunrise Ritual", price: 4.35 },
    { name: "Moonlit Elixir", price: 5.2 },
    { name: "Midnight Brew", price: 5.35 },
    { name: "Sunset Latte", price: 6.0 },
    { name: "Witch's Brew", price: 4.95 },
    { name: "Dark Arts Espresso", price: 5.95 },
];

// Get menu items from localStorage or use defaults
let menuItems = JSON.parse(localStorage.getItem("menuItems")) || defaultMenuItems;

// Save menu items to localStorage
function saveMenu() {
    localStorage.setItem("menuItems", JSON.stringify(menuItems));
}

// Display menu items dynamically in the manager interface
function displayMenu() {
    const menuList = document.getElementById("menu-list");
    menuList.innerHTML = ""; // Clear the list before rendering

    menuItems.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.className = "menu-item";
        listItem.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)}</span>
            <button onclick="updateMenuItem(${index})">Edit</button>
            <button onclick="deleteMenuItem(${index})">Delete</button>
        `;
        menuList.appendChild(listItem);
    });
}

// // Add or update a menu item
// function addMenuItem() {
//     const itemName = document.getElementById("item-name").value.trim();
//     const itemPrice = parseFloat(document.getElementById("item-price").value);

//     if (itemName && !isNaN(itemPrice)) {
//         const existingItemIndex = menuItems.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase());
//         if (existingItemIndex !== -1) {
//             // Update price if item exists
//             menuItems[existingItemIndex].price = itemPrice;
//             alert(`Updated price of "${itemName}" to $${itemPrice.toFixed(2)}`);
//         } else {
//             // Add new item
//             menuItems.push({ name: itemName, price: itemPrice });
//             alert(`Added "${itemName}" to the menu at $${itemPrice.toFixed(2)}`);
//         }
//         saveMenu(); // Save changes to localStorage
//         displayMenu();
//         document.getElementById("item-name").value = "";
//         document.getElementById("item-price").value = "";
//     } else {
//         alert("Please enter a valid item name and price.");
//     }
// }


// Update a menu item's price
function updateMenuItem(index) {
    const itemToEdit = menuItems[index];
    const newPrice = prompt(`Enter a new price for "${itemToEdit.name}" (current price: $${itemToEdit.price.toFixed(2)}):`);

    if (newPrice && !isNaN(parseFloat(newPrice))) {
        menuItems[index].price = parseFloat(newPrice);
        alert(`Updated price of "${itemToEdit.name}" to $${parseFloat(newPrice).toFixed(2)}`);
        saveMenu(); // Save changes to localStorage
        displayMenu();
    } else {
        alert("Invalid price entered.");
    }
}

// Initialize the page by displaying the preloaded menu
document.addEventListener("DOMContentLoaded", () => {
    displayMenu();
});

// *** Feedback ***
function feedbackInfo() {
    const fdName = localStorage.getItem("name");
    const fdEmail = localStorage.getItem("email");
    const fdMessage = localStorage.getItem("message");

    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let message = document.getElementById('message');

    name.innerText = 'Name: ' + fdName;
    email.innerText = 'Email: ' + fdEmail;
    message.innerText = 'Feedback Message: ' + fdMessage;
}

feedbackInfo();

// ***Receipt***
let receipt = localStorage.getItem("Receipt");
if (receipt) {
    let receiptManager = document.getElementById("receiptFeedback");
    receiptManager.innerHTML = receipt;
}

// Delete a menu item
function deleteMenuItem(index) {
    const deletedItem = menuItems.splice(index, 1); // Remove the item from the array
    alert(`You have deleted "${deletedItem[0].name}" from the menu.`);

    // Save changes to localStorage
    saveMenu();
    displayMenu();

    // Update the order page by hiding the deleted item
    const deletedItemName = deletedItem[0].name; 
    localStorage.setItem(`hide-${deletedItemName}`, true); // Store a flag for this item
}

// Add or update a menu item
function addMenuItem() {
    const itemName = document.getElementById("item-name").value.trim();
    const itemPrice = parseFloat(document.getElementById("item-price").value);

    if (itemName && !isNaN(itemPrice)) {
        // Check if the item was previously deleted
        if (localStorage.getItem(`hide-${itemName}`) === "true") {
            // Re-add the deleted item
            menuItems.push({ name: itemName, price: itemPrice });
            localStorage.removeItem(`hide-${itemName}`); // Remove the hide flag
            alert(`Re-added "${itemName}" to the menu at $${itemPrice.toFixed(2)}`);
        } else {
            // Check if the item already exists
            const existingItemIndex = menuItems.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase());
            if (existingItemIndex !== -1) {
                // Update price if item exists
                menuItems[existingItemIndex].price = itemPrice;
                alert(`Updated price of "${itemName}" to $${itemPrice.toFixed(2)}`);
            } else {
                // Add new item
                menuItems.push({ name: itemName, price: itemPrice });
                alert(`Added "${itemName}" to the menu at $${itemPrice.toFixed(2)}`);
            }
        }
        saveMenu(); // Save changes to localStorage
        displayMenu();
        document.getElementById("item-name").value = "";
        document.getElementById("item-price").value = "";
    } else {
        alert("Please enter a valid item name and price.");
    }
}
