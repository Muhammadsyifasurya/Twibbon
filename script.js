const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const upload = document.getElementById("upload");
const templateSelector = document.getElementById("template");
const twibbonImage = new Image();
let userImage = new Image();
let isDragging = false;
let offsetX, offsetY;
let originalImageData = {};
let userImageData = { x: 0, y: 0, width: 0, height: 0 };

// Load initial template
function loadTemplate() {
  const currentTemplateSrc = templateSelector.value;
  twibbonImage.src = `assets/templates/${currentTemplateSrc}`;
}

// Load initial template when the page is loaded
loadTemplate();

twibbonImage.onload = () => {
  drawCanvas(); // Draw Twibbon design once it's loaded
};

// Handle file upload
upload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (event) => {
    userImage.src = event.target.result;
    userImage.onload = () => {
      originalImageData = { width: userImage.width, height: userImage.height };
      userImageData = {
        x: (canvas.width - userImage.width) / 2,
        y: (canvas.height - userImage.height) / 2,
        width: userImage.width,
        height: userImage.height,
      };
      drawCanvas();
    };
  };
  reader.readAsDataURL(file);
});

// Handle template change
templateSelector.addEventListener("change", () => {
  loadTemplate();
  twibbonImage.onload = () => {
    drawCanvas();
  };
});

function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (userImage.src) {
    ctx.drawImage(
      userImage,
      userImageData.x,
      userImageData.y,
      userImageData.width,
      userImageData.height
    );
  }
  if (twibbonImage.src) {
    ctx.drawImage(twibbonImage, 0, 0, canvas.width, canvas.height);
  }
}

// Handle mouse and touch events for dragging
function startDragging(e) {
  const x =
    e.offsetX || e.touches[0].clientX - canvas.getBoundingClientRect().left;
  const y =
    e.offsetY || e.touches[0].clientY - canvas.getBoundingClientRect().top;

  if (
    x >= userImageData.x &&
    x <= userImageData.x + userImageData.width &&
    y >= userImageData.y &&
    y <= userImageData.y + userImageData.height
  ) {
    isDragging = true;
    offsetX = x - userImageData.x;
    offsetY = y - userImageData.y;
  }
}

function dragImage(e) {
  if (isDragging) {
    const x =
      e.offsetX || e.touches[0].clientX - canvas.getBoundingClientRect().left;
    const y =
      e.offsetY || e.touches[0].clientY - canvas.getBoundingClientRect().top;

    userImageData.x = x - offsetX;
    userImageData.y = y - offsetY;
    drawCanvas();
  }
}

function stopDragging() {
  isDragging = false;
}

canvas.addEventListener("mousedown", startDragging);
canvas.addEventListener("mousemove", dragImage);
canvas.addEventListener("mouseup", stopDragging);
canvas.addEventListener("mouseleave", stopDragging); // Stop dragging if the mouse leaves the canvas

canvas.addEventListener("touchstart", startDragging);
canvas.addEventListener("touchmove", dragImage);
canvas.addEventListener("touchend", stopDragging);
canvas.addEventListener("touchcancel", stopDragging); // Stop dragging if the touch is canceled

function updateSize() {
  const size = parseFloat(document.getElementById("size").value) / 100;
  userImageData.width = originalImageData.width * size;
  userImageData.height = originalImageData.height * size;
  userImageData.x = (canvas.width - userImageData.width) / 2;
  userImageData.y = (canvas.height - userImageData.height) / 2;
  drawCanvas();
  document.getElementById("sizeValue").textContent =
    document.getElementById("size").value;
}

function resetSize() {
  document.getElementById("size").value = 100;
  updateSize();
}

function downloadImage() {
  const quality = parseFloat(document.getElementById("quality").value);
  const link = document.createElement("a");
  link.download = "twibbon-result.png";
  link.href = canvas.toDataURL("image/png", quality);
  link.click();
}

document.getElementById("size").addEventListener("input", updateSize);
window.addEventListener("load", updateSize); // Set initial size

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
