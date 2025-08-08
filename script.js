function redirectTo(url) {
  window.open(url, "_blank");
  }
  
  const API_URL = "https://v13rxnxr2m.execute-api.us-east-1.amazonaws.com/prod"; // API GATEWAY
  const COOKIE_NAME = "visitor_tracked";
  const COOKIE_DURATION_MINUTES = 1,440;
  
  // ✅ Set cookie that expires in () minutes
  function setVisitorCookie(name, minutes) {
  const date = new Date();
  date.setTime(date.getTime() + (minutes * 60 * 1000));
  document.cookie = `${name}=true; expires=${date.toUTCString()}; path=/`;
  }
  
  // ✅ Read cookie by name
  function hasVisitorCookie(name) {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
  if (cookie.trim().startsWith(`${name}=`)) {
  return true;
  }
  }
  return false;
  }
  
  // ✅ Main function to update count
  async function updateVisitorCount() {
  if (hasVisitorCookie(COOKIE_NAME)) {
  console.log("Visitor recently tracked. Skipping API call.");
  return;
  }
  
  try {
  const response = await fetch(API_URL, {
  method: "GET",
  credentials: "include"
  });
  
  if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  
  // ✅ Make sure "data.count" is valid
  if (data && typeof data.count === "number") {
  document.getElementById("visitor-count").textContent = data.count;
  console.log("Visitor counted and updated to:", data.count);
  } else {
  console.warn("Unexpected API response format:", data);
  }
  
  setVisitorCookie(COOKIE_NAME, COOKIE_DURATION_MINUTES);
  } catch (err) {
  console.error("Failed to fetch visitor count:", err);
  }
  }
  
  // ✅ Run after DOM loads
  document.addEventListener("DOMContentLoaded", updateVisitorCount);
  
  // ✅ Log cookies for debugging
  console.log("All cookies:", document.cookie);
