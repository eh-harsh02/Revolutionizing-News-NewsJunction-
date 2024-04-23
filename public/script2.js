// Sidebar hamburger menu
const sideBar = document.querySelector(".menu-list");
const menu = document.querySelector("#hamburger");
menu.onclick = (e) => {
  sideBar.classList.toggle("active");
  e.preventDefault();
};

// If click outside sidebar and hamburger icons
document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !sideBar.contains(e.target)) {
    sideBar.classList.remove("active");
  }
});
