import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Styles/Game.css';

const Game = () => {
  const { id } = useParams(); 
  const [game, setGame] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/games/${id}`);
        setGame(response.data);
      } catch (err) {
        console.error('Error fetching game details:', err);
        setError('Failed to fetch game details.');
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!game) return <div className="error">Game not found.</div>;

  return (
    <div className="game-details">
      <h1>{game.name}</h1>
      <img
        src={`http://localhost:5000/images/${game.image_url}`}
        alt={game.name}
        className="game-image"
      />
      <div className="game-info">
        <p><strong>Release Date:</strong> {game.release_date}</p>
        <p><strong>Developers:</strong> {game.developers}</p>
        <p><strong>Publishers:</strong> {game.publishers}</p>
        <p><strong>Genres:</strong> {game.genres}</p>
        <p><strong>Platforms:</strong> {game.platforms}</p>
        <p><strong>Multiplayer Modes:</strong> {game.multiplayer_modes}</p>
        <p><strong>Crossplay:</strong> {game.crossplay ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
};

export default Game;
