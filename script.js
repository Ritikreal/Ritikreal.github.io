// Dark/Light theme toggle
const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  toggleBtn.textContent =
    document.body.classList.contains("light-mode") ? "☀️" : "🌙";
});

// Auto-load all images from /images folder
const galleryGrid = document.getElementById("gallery-grid");
const imageCount = 6; // Change to however many images you have

for (let i = 1; i <= imageCount; i++) {
  const img = document.createElement("img");
  img.src = `images/photo${i}.jpg`; // Example: photo1.jpg, photo2.jpg, ...
  img.alt = `Photo ${i}`;
  galleryGrid.appendChild(img);
}
