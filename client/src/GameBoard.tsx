import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { MdExitToApp, MdRestartAlt } from 'react-icons/md';

interface Props {
  onDeclareWinner: (winner: string) => void;
  onDeclareDraw: () => void;
  onExit: () => void;
}

const GameBoard = (props: Props) => {
  const [board, setBoard] = useState<any[]>([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [boardSection, setboardSection] = useState<[][]>([]);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);

  useEffect(() => {
    const dividedSections = board.reduce((init, val, idx) => {
      var arrIdx = Math.floor(idx / 3);

      if (!init[arrIdx]) init[arrIdx] = [];
      init[arrIdx] = [
        ...init[arrIdx],
        { idx, hovered: idx === hoveredIdx, val },
      ];

      return init;
    }, new Array(3));

    setboardSection(dividedSections);

    return () => {};
  }, [board, hoveredIdx]);

  useEffect(() => {
    
    startSession();
    return () => {
      
    }
  }, [])
  

  const startSession = async () => {
    
    const currentSession = await axios.get('/api/session/currentsession');

    setSelectedPlayer(currentSession.data.currentPlayer);
  }

  const onSelectedBoard = async (selectedIdx: number) => {
    const updatedBoard = board.map((val, idx) => {
      if (idx === selectedIdx) return selectedPlayer;
      return val;
    });

    setBoard(updatedBoard);

    await axios.post(`/api/session/players/addtoboard/${selectedIdx}`); //set to other player turn

    const currentSession = await axios.get('/api/session/currentsession');

    const { hasWinner, playerWinner } = currentSession.data;

    if (hasWinner) {
      // alert('We have a winner! Winner: '+playerWinner);
      props.onDeclareWinner(playerWinner);
      return;
    }

    const playerTurn = await axios.post(`/api/session/players/setotherplayerturn`); //set to other player turn


    setSelectedPlayer(playerTurn.data.currentPlayer);
    setIsPlayerOneTurn(!isPlayerOneTurn);
  };

  return (
    <div>
      <div className="scoreboard">
        <div className="scoreboard__content color--primary">
          <span className="label--player">O</span>
          <span className="label">4 wins</span>
        </div>
        <div className="scoreboard__content color--secondary">
          <span className="label--player">X</span>
          <span className="label">1 win</span>
        </div>
        <div className="scoreboard__content color--tertiary">
          <span className="label--player">-</span>
          <span className="label">2 draws</span>
        </div>
      </div>
      <div
        className="tictactoe-board"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        {boardSection.map((section, rootIdx) => (
          <div className="board-section">
            {section.map((content) => {
              return (
                <React.Fragment>
                  {/* @ts-ignore */}
                  {content.val === 'X' && (
                    <span className="color--secondary">
                      <span>X</span>
                    </span>
                  )}
                  {/* @ts-ignore */}
                  {content.val === 'O' && (
                    <span className="color--primary">
                      <span>O</span>
                    </span>
                  )}
                  {/* @ts-ignore */}
                  {content.val !== 'O' && content.val !== 'X' && (
                    <span
                      // @ts-ignore
                      onMouseEnter={() => setHoveredIdx(content.idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      // @ts-ignore
                      onClick={() => onSelectedBoard(content.idx)}
                    >
                      {/* @ts-ignore */}
                      <span className={content.hovered && 'fade'}>
                        {/* @ts-ignore */}
                        {content.hovered && selectedPlayer}
                      </span>
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        ))}
      </div>

      <div className="footer-content">
        <div className="player-turn-indicator">
          <span className={`color--primary ${selectedPlayer === 'O' && 'bg--tertiary'}`}>O</span>
          <span className={`color--secondary ${selectedPlayer === 'X' && 'bg--tertiary'}`}>X</span>
        </div>

        <div className="game-controls">
          <div className="game-controls__control">
            <MdRestartAlt />
          </div>
          <div className="game-controls__player-turn">Player {isPlayerOneTurn ? '1' : '2'} turn</div>
          <div className="game-controls__control">
            <MdExitToApp />
          </div>
        </div>

      </div>
    </div>
  );
};

export default GameBoard;
