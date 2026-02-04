const btn = document.getElementById("escape-btn");

btn.addEventListener("mouseenter", () => {
  btn.textContent = "ALSO YES";
});

btn.addEventListener("mouseleave", () => {
  btn.textContent = "NO";
});

// --- BUTTON LOGIC (Keep this exactly as we fixed it) ---
function initButton() {
  const rect = btn.getBoundingClientRect();
  btn.style.position = "fixed";
  btn.style.left = rect.left + "px";
  btn.style.top = rect.top + "px";
  btn.style.margin = "0";
}

// Initialize layout
setTimeout(initButton, 100);

// Movement Logic
const radius = 150;
const pushDist = 10;

window.addEventListener("mousemove", (e) => {
  const rect = btn.getBoundingClientRect();
  const btnX = rect.left + rect.width / 2;
  const btnY = rect.top + rect.height / 2;

  const diffX = btnX - e.clientX;
  const diffY = btnY - e.clientY;
  const distance = Math.sqrt(diffX * diffX + diffY * diffY);

  if (distance < radius) {
    const moveX = (diffX / distance) * pushDist;
    const moveY = (diffY / distance) * pushDist;

    let newX = rect.left + moveX;
    let newY = rect.top + moveY;

    newX = Math.max(10, Math.min(newX, window.innerWidth - rect.width - 10));
    newY = Math.max(10, Math.min(newY, window.innerHeight - rect.height - 10));

    btn.style.left = `${newX}px`;
    btn.style.top = `${newY}px`;
  }
});

// --- BACKGROUND HEART LOGIC (Updated for Speed) ---

const container = document.getElementById("heart-container");
const heartFiles = [
  "img/heart.png",
  "img/Heart_Eyes_Emoji.webp",
  "img/Kiss_Emoji.webp",
];

// Configuration
const GENERATION_RATE = 100; // Generate a new heart every 100ms

// Added "spawnAnywhere" parameter to allow filling the screen instantly
function createHeart(spawnAnywhere = false) {
  const heart = document.createElement("img");
  const randomAsset = heartFiles[Math.floor(Math.random() * heartFiles.length)];

  heart.src = randomAsset;
  heart.classList.add("heart-asset");

  const isEmoji = randomAsset.includes("Emoji");
  const size = isEmoji
    ? Math.floor(Math.random() * 40) + 40
    : Math.floor(Math.random() * 50) + 20;

  const leftPos = Math.random() * 100;

  // Speed up the animation slightly (4s to 8s instead of 6s to 10s)
  const duration = Math.random() * 4 + 4;
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

// naam setup

const params = new URLSearchParams(window.location.search);

const naam = params.get("naam");

if (naam) {
  document.getElementById("naam-valentine").textContent = `Hey, ${naam} 😏`;
}
