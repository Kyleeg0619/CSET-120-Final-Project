document.addEventListener("DOMContentLoaded", () => {
    const dropdownLabel = document.querySelector(".dropdown > label");
    const dropdownMenu = document.querySelector(".dropdown > ul");
  
    //opens dropdown on click
    dropdownLabel.addEventListener("click", () => {
      dropdownMenu.classList.toggle("visible");
    });
    //closes dropdown on click
    document.addEventListener("click", (event) => {
      if (!dropdownLabel.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove("visible");
      }
    });
  });