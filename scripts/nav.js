// *** OPEN MOBILE MENU ***
// Define Variables
const hamburger = document.querySelector(".hamburger"); // access via selector/class
const navList = document.querySelector(".nav-list");

// event listener is a function that waits for a specific event to occur on an HTML element, and then executes a specified action
// when event occurs, click, function is called
hamburger.addEventListener("click", mobileMenu);

// defines function
function mobileMenu() {
    // activates/assigns active class
    hamburger.classList.toggle("active");
    navList.classList.toggle("active");
}

// *** CLOSE MOBILE MENU ***
const navLink = document.querySelectorAll(".nav-item");

// when a nav item, which ever nav item, is clicked the menu disappears
navLink.forEach(n => n.addEventListener("click", closeMenu));

// defines function
function closeMenu() {
    // removes active class
    hamburger.classList.remove("active");
    navList.classList.remove("active");
}