import React, { useState, useEffect } from 'react';


function Home() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/auth/api/test')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setMessage(data.message))
      .catch(error => {
        console.error('Error:', error);
        setError('Failed to load message from server');
      });
  }, []);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {error ? (
        <p style={{ color: 'red' }}>hola</p>
      ) : (
        <p>hola{message}</p>
      )}
    </div>
  );
}

export default Home;