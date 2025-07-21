async function fetchVisitorCount() {
  try {
    const response = await fetch('https://8bvl8r4xn7.execute-api.us-east-1.amazonaws.com/production', {
      method: 'GET',
      credentials: 'include'  // Allow browser to send and receive cookies
    });

    const data = await response.json();
    document.getElementById('counter').textContent = data.count;
  } catch (error) {
    console.error("Error fetching visitor count:", error);
    document.getElementById('counter').textContent = 'N/A';
  }
}

