function redirectTo(url) {
  window.open(url, '_blank');
}
window.onload = () => {
  fetchVisitorCount();
};
  

async function fetchVisitorCount() {
  try {
    const response = await fetch('https://8bvl8r4xn7.execute-api.us-east-1.amazonaws.com/production');  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json(); 
    const data = JSON.parse(result.body); 

    document.getElementById('counter').textContent = data.count;
  } catch (error) {
    console.error('Error fetching visitor count:', error);
    document.getElementById('counter').textContent = 'N/A';
  }
}
window.onload = () => {
  fetchVisitorCount();
  setInterval(fetchVisitorCount, 10000); // refresh every 10 seconds
};

