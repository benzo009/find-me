async function fetchVisitorCount() {
  const alreadyCounted = localStorage.getItem("hasVisited");

  try {
    // Always fetch the current count to display it
    const response = await fetch('https://your-api-url');
    const data = await response.json();
    document.getElementById('counter').textContent = data.count;

    // If not yet counted, mark as visited
    if (!alreadyCounted) {
      localStorage.setItem("hasVisited", true);
    }

  } catch (error) {
    console.error("Error fetching visitor count:", error);
    document.getElementById('counter').textContent = 'N/A';
  }
}
