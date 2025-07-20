function redirectTo(url) {
  window.open(url, '_blank');
}
 async function fetchVisitorCount() {
  const alreadyCounted = localStorage.getItem("hasVisited");

  if (alreadyCounted) {
    console.log("Already visited. Skipping API call.");
    return;
  }

  try {
    const response = await fetch('https://your-api-url');
    const data = await response.json();
    document.getElementById('counter').textContent = data.count;
    localStorage.setItem("hasVisited", true);
  } catch (error) {
    console.error("Error fetching visitor count:", error);
    document.getElementById('counter').textContent = 'N/A';
  }
}
