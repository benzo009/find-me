function redirectTo(url) {
window.open(url, "_blank");
}

const API_URL = "https://v13rxnxr2m.execute-api.us-east-1.amazonaws.com/prod";
const COOKIE_NAME = "visitor_tracked";
const COOKIE_DURATION_MINUTES = 1440;

// Set cookie that expires in (minutes) — keep your visitor_tracked cookie, but include SameSite & Secure
function setVisitorCookie(name, minutes) {
const date = new Date();
date.setTime(date.getTime() + (minutes * 60 * 1000));
// add SameSite=None and Secure so modern browsers accept it for cross-site contexts
document.cookie = `${name}=true; expires=${date.toUTCString()}; path=/; SameSite=None; Secure`;
}

// Read cookie by name (unchanged)
function hasVisitorCookie(name) {
const cookies = document.cookie.split(';');
for (let cookie of cookies) {
if (cookie.trim().startsWith(`${name}=`)) {
return true;
}
}
return false;
}

// Fetch count from API (minimal additions: cache-busting, mode:cors, cache:no-store, send X-Visited)
async function fetchVisitorCount(incrementIfNeeded = false) {
try {
// cache-busting timestamp to avoid stale responses (helps Safari caching behavior)
const sep = API_URL.includes('?') ? '&' : '?';
const url = `${API_URL}${sep}_=${Date.now()}`;

// send X-Visited header based on your visitor_tracked cookie (helps Lambda for Safari)
const visitedHeaderValue = hasVisitorCookie(COOKIE_NAME) ? "true" : "false";

const response = await fetch(url, {
method: "GET",
mode: "cors",
credentials: "include", // important to send/receive cookies
cache: "no-store",
headers: {
"X-Visited": visitedHeaderValue
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

// Main function to update and set cookie if needed (unchanged flow)
async function updateVisitorCount() {
if (!hasVisitorCookie(COOKIE_NAME)) {
await fetchVisitorCount(true);
setVisitorCookie(COOKIE_NAME, COOKIE_DURATION_MINUTES);
} else {
await fetchVisitorCount(false);
}
}

// Run after DOM loads
document.addEventListener("DOMContentLoaded", () => {
updateVisitorCount(); // Initial load
setInterval(() => fetchVisitorCount(false), 300000); // interval unchanged (300000 ms as in your original)
});
