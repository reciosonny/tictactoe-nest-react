import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import PlayerSelection from './PlayerSelection';
import GameBoard from './GameBoard';
import WinnerPanel from './WinnerPanel';

function App() {
  const [gameStart, setGameStart] = useState(false);
  const [hasWinner, setHasWinner] = useState(false);
  const [winnerPlayer, setWinnerPlayer] = useState('');

  useEffect(() => {
    return () => {};
  }, []);

  const onSelectPlayer = async (selected: string) => {
    if (selected === 'X') {
      await axios.post(`/api/session/players/selectcross`);
    } else {
      await axios.post(`/api/session/players/selectnaught`);
    }

    setGameStart(true);
  };

  const onExit = () => {
    setGameStart(false);
  };

  return (
    <div className="App">
      <div className="mobile-container">
        {!gameStart && !hasWinner && <PlayerSelection onSelect={onSelectPlayer} />}
        {gameStart && (
          <GameBoard
            onExit={onExit}
            onDeclareWinner={(val) => {
              setHasWinner(true);
              setGameStart(false);
              setWinnerPlayer(val);
            }}
            onDeclareDraw={() => {}}
          />
        )}
        {hasWinner && (
          <WinnerPanel
            playerWinner={winnerPlayer}
            onRestart={(val) => {
              setGameStart(val);
              setHasWinner(false);
              setWinnerPlayer('');
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
