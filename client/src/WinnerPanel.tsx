import React from 'react';






const WinnerPanel = (props: {
  playerWinner: string;
  onRestart: (shouldRestart: boolean) => void;
}) => {



  return (
    <div className="player-select">
      <span className="player-select__title">Winner: {props.playerWinner}</span>
      <span className="player-select__desc">Rematch?</span>

      <div className="player-select__options-container">
        <span
          className="player-select__options color--secondary"
          onClick={() => props.onRestart(false)}
        >
          X
        </span>
        <span
          className="player-select__options color--primary"
          onClick={() => props.onRestart(true)}
        >
          O
        </span>
      </div>
    </div>
  );
};

export default WinnerPanel;
