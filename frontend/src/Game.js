import React from 'react';
import { useParams } from 'react-router-dom';

function Game() {
    const { id } = useParams(); 

    return (
        <div>
            <h1>Game Details for Game ID: {id}</h1>
            <p>Here you can view and review the game.</p>
        </div>
    );
}

export default Game;
