const apiURL = "https://v13rxnxr2m.execute-api.us-east-1.amazonaws.com/prod";

// Function to get cookie by name
function getCookie(name) {
const cookies = document.cookie.split("; ");
for (const cookie of cookies) {
const [key, value] = cookie.split("=");
if (key === name) {
return value;
}
}
return null;
}

// Function to update the live visitor count
async function updateVisitorCount() {
try {
const response = await fetch(apiURL, {
method: 'GET',
credentials: 'include' // send cookies
});

if (!response.ok) {
throw new Error(`HTTP error! Status: ${response.status}`);
}

const data = await response.json();

// Parse the visitor count as a number
const count = parseInt(data.visitorCount, 10);

document.getElementById("visitor-count").textContent = isNaN(count) ? 0 : count;

} catch (error) {
console.error("Failed to fetch visitor count:", error);
}
}

// Call the function on page load
updateVisitorCount();

//  Auto-refresh every 5 minutes (300,000 milliseconds)
setInterval(updateVisitorCount, 5 * 60 * 1000);
