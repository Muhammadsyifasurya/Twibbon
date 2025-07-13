function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("show");
  const hamburger = document.querySelector(".hamburger");
  hamburger.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeBtn = document.querySelector(".close-btn");

  hamburger.addEventListener("click", function () {
    mobileMenu.classList.add("show");
  });

  closeBtn.addEventListener("click", function () {
    mobileMenu.classList.remove("show");
  });
});

document.getElementById("hamburger").addEventListener("click", function () {
  document.getElementById("mobileMenu").classList.add("show");
});

document.getElementById("closeMenu").addEventListener("click", function () {
  document.getElementById("mobileMenu").classList.remove("show");
});
