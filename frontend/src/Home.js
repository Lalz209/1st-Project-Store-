import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styles/Home.css';

const Home = () => {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchGames();
  }, [currentPage]);

  const fetchGames = async () => {
    try {
      const response = await axios.get('http://localhost:5000/games', {
        params: { page: currentPage, per_page: 18 }, // 3 columnas x 6 filas
      });
      setGames(response.data.games);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  return (
    <div className="home-container">
      <div className="games-grid">
        {games.map((game) => (
          <div key={game.id} className="game-card">
            <a href={`/game/${game.id}`}>
              <img src={`http://localhost:5000/${game.image_url}`} alt={game.name} />
            </a>
            <h4>{game.name}</h4>
          </div>
        ))}
      </div>

      <footer className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </footer>
    </div>
  );
};

export default Home;
