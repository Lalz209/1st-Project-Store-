import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Styles/Home.css';


const Home = () => {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchGames = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/games', {
        params: { page: currentPage, per_page: 18 }, 
      });
      setGames(response.data.games);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);


  return (
    <div className="home-container">
      <div className="games-grid">
        {games.map((game) => (
          <div key={game.id} className="game-card">
            <a href={`/game/${game.id}`}>
            <img src={`http://localhost:5000/images/${game.image_url}`} alt={game.name} />
            </a>
          </div>
        ))}
      </div>

      <footer className="pagination">
        <button className='Arrows'
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
