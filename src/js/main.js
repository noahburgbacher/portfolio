// Function to synchronize videos
function syncVideos() {
  const video1 = document.getElementById("video1");
  const video2 = document.getElementById("video2");
  const video3 = document.getElementById("video3");

  // Check if videos are not synced
  const timeDifference1 = Math.abs(video1.currentTime - video2.currentTime);
  const timeDifference2 = Math.abs(video1.currentTime - video3.currentTime);

  const syncThreshold = 0.05; // 50 milliseconds threshold

  if (timeDifference1 > syncThreshold || timeDifference2 > syncThreshold) {
    // Set the current time of all videos to the first video
    const currentTime = video1.currentTime;

    video2.currentTime = currentTime;
    video3.currentTime = currentTime;
  }

  // Request the next frame to check again
  requestAnimationFrame(syncVideos);
}

// Start syncing videos when the first video is loaded
document.getElementById("video1").addEventListener("loadedmetadata", () => {
  syncVideos();
});

// document height
function updateCSSVariable() {
  const totalHeight = document.body.scrollHeight;
  document.documentElement.style.setProperty(
    "--total-height",
    `${totalHeight}px`
  );
}

// Initial update
updateCSSVariable();

// Update on window resize
window.addEventListener("resize", updateCSSVariable);

// Fix firefox

if (navigator.userAgent.includes("Firefox")) {
  const brokenByFirefox = document.querySelectorAll(".firefox-broke-it");
  console.warn("Warning: This website might break when using Firefox.");
  brokenByFirefox.forEach((firefox) => {
    firefox.classList.add("is-firefox");
  });
  const FirefoxWarning = document.querySelector(".warning-firefox");
  const closeFirefoxWarning = document.querySelector(".warning-firefox-close");
  closeFirefoxWarning.addEventListener("click", function () {
    // Remove the class 'is-active' from the element
    FirefoxWarning.classList.remove("is-firefox");
  });
  setTimeout(() => {
    FirefoxWarning.classList.remove("is-firefox");
  }, 10000);
}

// particles
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Particle properties

const particles = [];
const particleCount = 500; // Adjust for more or less particles

for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 5 + 0.5,
    alpha: Math.random() * 0.05,
    speed: Math.random() * 0.3,
    direction: Math.random() * 2 - 1, // Random direction for turbulence
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
    ctx.fill();
    ctx.closePath();

    // Update particle position with turbulence
    p.y -= p.speed;
    p.x += p.direction * 0.5; // Add horizontal turbulence

    // Wrap particles around
    if (p.y < 0) {
      p.y = canvas.height;
      p.x = Math.random() * canvas.width;
    }

    // Keep particles within the canvas
    if (p.x < 0 || p.x > canvas.width) {
      p.direction *= -1; // Reverse direction if out of bounds
    }
  });
  requestAnimationFrame(drawParticles);
}

drawParticles();

// reload page when resized

window.addEventListener("resize", function () {
  setTimeout(() => {
    location.reload();
  }, 200);
});
