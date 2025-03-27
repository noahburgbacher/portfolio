// Function to synchronize videos
function syncVideos() {
  const video1 = document.getElementById("video1");
  const video2 = document.getElementById("video2");
  const video3 = document.getElementById("video3");

  // Check if videos are not synced
  const timeDifference1 = Math.abs(video1.currentTime - video2.currentTime);
  const timeDifference2 = Math.abs(video1.currentTime - video3.currentTime);

  const syncThreshold = 0.1; // 100 milliseconds threshold

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
}
