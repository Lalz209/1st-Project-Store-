import React, { useState } from 'react';
import './Styles/UploadGame.css';
import axios from 'axios';

function UploadGame() {
  const [name, setName] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [platforms, setPlatforms] = useState([]);
  const [genres, setGenres] = useState([]);
  const [multiplayerModes, setMultiplayerModes] = useState([]);
  const [image, setImage] = useState(null);
  const [developers, setDevelopers] = useState('');
  const [publishers, setPublishers] = useState('');

  const [modalOptions, setModalOptions] = useState([]);
  const [modalType, setModalType] = useState('');
  const [showModal, setShowModal] = useState(false);

  const allPlatforms = ["PC", "PlayStation 1", "PlayStation 2", "PlayStation 3", "PlayStation 4", "PlayStation 5", "Xbox", "Xbox 360", "Xbox One", "Xbox Series S", "Xbox Series x", "Nintendo Switch"];
  const allGenres = ["Action", "Adventure", "RPG", "Shooter", "Strategy", "MOBA", "Survival", "Open World", "Cozy", "Fighting", "Dance", "Horror", "Battle Royale"];
  const allMultiplayerModes = ["Multiplayer", "Co-op", "Local", "LAN", "Multiplayer Competitive", "Single Player", "MMO"];

  const handleOpenModal = (type) => {
    setModalType(type);
    switch (type) {
      case 'Platforms':
        setModalOptions(allPlatforms);
        break;
      case 'Genres':
        setModalOptions(allGenres);
        break;
      case 'MultiplayerModes':
        setModalOptions(allMultiplayerModes);
        break;
      default:
        break;
    }
    setShowModal(true);
  };

  const handleSubmitModal = (selectedOptions) => {
    setShowModal(false);
    switch (modalType) {
      case 'Platforms':
        setPlatforms(selectedOptions);
        break;
      case 'Genres':
        setGenres(selectedOptions);
        break;
      case 'MultiplayerModes':
        setMultiplayerModes(selectedOptions);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('release_date', releaseDate);
    formData.append('platforms', platforms);
    formData.append('genres', genres);
    formData.append('multiplayer_modes', multiplayerModes);
    formData.append('image', image);
    formData.append('developers', developers);
    formData.append('publishers', publishers);

    try {
      const response = await axios.post('http://localhost:5000/main/upload_game', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('Game uploaded successfully!');
      } else {
        alert(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error uploading game:', error);
      alert('There was an error uploading the game.');
    }
  };

  return (
    <div className="upload-game">
      <h1>Upload New Game</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Game Name:</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <h2>Release Date:</h2>
          <input
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
        </div>
        <div>
          <h2>Platforms:</h2>
          <button type="button" onClick={() => handleOpenModal('Platforms')}>
            Select
          </button>
          <span>{platforms.join(', ')}</span>
        </div>
        <div>
          <h2>Genres:</h2>
          <button type="button" onClick={() => handleOpenModal('Genres')}>
            Select
          </button>
          <span>{genres.join(', ')}</span>
        </div>
        <div>
          <h2>Multiplayer Modes:</h2>
          <button type="button" onClick={() => handleOpenModal('MultiplayerModes')}>
            Select
          </button>
          <span>{multiplayerModes.join(', ')}</span>
        </div>
        <div>
          <h2>Developers:</h2>
          <input
            type="text"
            value={developers}
            onChange={(e) => setDevelopers(e.target.value)}
          />
        </div>
        <div>
          <h2>Publishers:</h2>
          <input
            type="text"
            value={publishers}
            onChange={(e) => setPublishers(e.target.value)}
          />
        </div>
        <div>
          <h2>Upload Image:</h2>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {showModal && (
        <Modal
          options={modalOptions}
          selectedOptions={
            modalType === 'Platforms'
              ? platforms
              : modalType === 'Genres'
              ? genres
              : multiplayerModes
          }
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmitModal}
        />
      )}
    </div>
  );
}

function Modal({ options, selectedOptions, onClose, onSubmit }) {
  const [selected, setSelected] = useState(selectedOptions || []);

  const toggleSelection = (option) => {
    if (selected.includes(option)) {
      setSelected(selected.filter((item) => item !== option));
    } else {
      setSelected([...selected, option]);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Select Options</h3>
        <ul className="modal-options">
          {options.map((option) => (
            <li key={option}>
              <label>
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => toggleSelection(option)}
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
        <div className="modal-buttons">
          <button onClick={() => onSubmit(selected)}>Submit</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default UploadGame;

