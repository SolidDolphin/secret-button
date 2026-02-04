const container = document.getElementById("heart-container");
const heartFiles = [
  "img/heart.png",
  "img/Heart_Eyes_Emoji.webp",
  "img/Kiss_Emoji.webp",
];

// Configuration
const GENERATION_RATE = 10; // Generate a new heart every 100ms

// Added "spawnAnywhere" parameter to allow filling the screen instantly
function createHeart(spawnAnywhere = true) {
  const heart = document.createElement("img");
  const randomAsset = heartFiles[Math.floor(Math.random() * heartFiles.length)];

  heart.src = randomAsset;
  heart.classList.add("heart-asset");

  const isEmoji = randomAsset.includes("Emoji");
  const size = isEmoji
    ? Math.floor(Math.random() * 40) + 40
    : Math.floor(Math.random() * 50) + 20;

  const leftPos = Math.random() * 100;

  // Decrease duration to make hearts move faster
  const duration = Math.random() * 3 + 2;
  const horizontalSway = (Math.random() - 0.5) * 200;

  heart.style.width = `${size}px`;
  heart.style.height = "auto";
  heart.style.left = `${leftPos}%`;

  // NEW LOGIC: If it's the start, pick a random vertical spot on screen
  if (spawnAnywhere) {
    heart.style.bottom = `${Math.random() * 100}%`;
  } else {
    // Otherwise, start below the screen as normal
    heart.style.bottom = "-100px";
  }

  heart.style.setProperty("--sway", `${horizontalSway}px`);
  heart.style.animation = `floatUp ${duration}s ease-in forwards`;

  const initialRotation = isEmoji ? (Math.random() - 0.5) * 40 : 0;
  heart.style.transform = `rotate(${initialRotation}deg)`;

  container.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

// Initialization
// No delay: Run immediately
(function startBackground() {
  // 1. Burst: Create 30 hearts spread all over the screen instantly
  for (let i = 0; i < 30; i++) {
    createHeart(true); // true = spawn anywhere on screen
  }

  // 2. Start the continuous flow from the bottom
  setInterval(() => createHeart(false), GENERATION_RATE);
})();
