import React from 'react';
import GameFieldStack from './GameFieldStack';

function Cell(props) {
  const {cellId} = props;
  return (
    <div className="grid-cell-component">
      <GameFieldStack stackKey={`fieldStack${cellId}`}  />
    </div>
  )
}

export default Cell;
