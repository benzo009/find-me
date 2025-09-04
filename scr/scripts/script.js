function redirectTo(url) {
window.open(url, "_blank");
}

const API_URL = "https://v13rxnxr2m.execute-api.us-east-1.amazonaws.com/prod";
const COOKIE_NAME = "visitor_tracked";
const COOKIE_DURATION_MINUTES = 1440;

// Set cookie with expiration
function setVisitorCookie(name, minutes) {
  const date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000);
  document.cookie = `${name}=true; expires=${date.toUTCString()}; path=/; Secure; SameSite=None`;
}

// Read cookie by name
function hasVisitorCookie(name) {
  return document.cookie.split(";").some((cookie) => cookie.trim().startsWith(`${name}=`));
}

// Fetch visitor count 
async function fetchVisitorCount(incrementIfNeeded = false) {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      credentials: "include", // allows cookies
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data && typeof data.count === "number") {
      document.getElementById("visitor-count").textContent = data.count;
    }
  } catch (err) {
    console.error("Failed to fetch visitor count:", err);
  }
}

// Update visitor count
async function updateVisitorCount() {
  if (!hasVisitorCookie(COOKIE_NAME)) {
    await fetchVisitorCount(true);
    setVisitorCookie(COOKIE_NAME, COOKIE_DURATION_MINUTES);
  } else {
    await fetchVisitorCount(false);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateVisitorCount(); // Initial load
  setInterval(() => fetchVisitorCount(false), 86400000); // Every 24 hours
});

