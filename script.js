const API_URL = "https://v13rxnxr2m.execute-api.us-east-1.amazonaws.com/prod";
  const COOKIE_NAME = "visitor_tracked";
  const COOKIE_DURATION_MINUTES = 1440;
  
  // Set cookie that expires in () minutes
  function setVisitorCookie(name, minutes) {
  const date = new Date();
  date.setTime(date.getTime() + (minutes * 60 * 1000));
  document.cookie = `${name}=true; expires=${date.toUTCString()}; path=/`;
  }
  
  // Read cookie by name
  function hasVisitorCookie(name) {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
  if (cookie.trim().startsWith(`${name}=`)) {
  return true;
  }
  }
  return false;
  }
  
  // Main function to update count
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
  
  // ✅ FIXED THIS LINE: Use the correct key and ensure it's treated as a number
  if (data && !isNaN(Number(data.visitorCount))) {
  document.getElementById("visitor-count").textContent = Number(data.visitorCount);
  console.log("Visitor counted and updated to:", Number(data.visitorCount));
  } else {
  console.warn("Unexpected API response format:", data);
  }
  
  setVisitorCookie(COOKIE_NAME, COOKIE_DURATION_MINUTES);
  } catch (err) {
  console.error("Failed to fetch visitor count:", err);
  }
  }
  
  // Run after DOM loads
  document.addEventListener("DOMContentLoaded", updateVisitorCount);
