import React, { useState, useEffect } from 'react';

function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/test')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>Message from backend: {message}</p>
    </div>
  );
}

export default Home;
