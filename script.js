document.getElementById('myLink').addEventListener('click', function(event) {
    event.preventDefault(); // prevent default link behavior
    // Replace this URL with your target website
    window.location.href = 'https://x.com/beng__g?s=21';
  });
   async function fetchVisitorCount() {
      try {
        const response = await fetch('https://8bvl8r4xn7.execute-api.us-east-1.amazonaws.com/production');  // Replace with your actual API URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        document.getElementById('counter').textContent = data.count;
      } catch (error) {
        console.error('Error fetching visitor count:', error);
        document.getElementById('counter').textContent = 'N/A';
      }
    }

    fetchVisitorCount();
