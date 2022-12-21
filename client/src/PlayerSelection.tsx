import React from 'react';



const PlayerSelection = ({ onSelect }: { onSelect: (selected: string) => void }) => {


  return (
    <div className="player-select">
      <span className="player-select__title">Player selection</span>
      <span className="player-select__desc">Which one would you choose?</span>

      <div className="player-select__options-container">
        <span className="player-select__options color--secondary" onClick={() => onSelect('X')}>X</span>
        <span className="player-select__options color--primary" onClick={() => onSelect('O')}>O</span>
      </div>
    </div>
  );
};

export default PlayerSelection;
