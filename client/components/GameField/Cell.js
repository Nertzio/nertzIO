import React from 'react';
import GameFieldStack from './GameFieldStack';

function Cell(props) {
  const {cellId} = props;
  return (
    <div style={{
      backgroundColor: 'green',
      border: '1px solid gray', // TODO: remove later
      color: 'white',
      display: 'flex',
      flexGrow: 1,
      height: '100%',
      width: '100%',
    }}>
      <GameFieldStack stackKey={`fieldStack${cellId}`}  />
    </div>
  )
}

export default Cell;
