

  } catch (error) {
    console.error("Error fetching visitor count:", error);
    document.getElementById('counter').textContent = 'N/A';
  }
}
