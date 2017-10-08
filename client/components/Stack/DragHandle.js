import React from 'react';

const DragHandle = ({card, stackPosition}) => {
  const {
    textColor,
    displayName,
    symbol,
  } = card;

  return (
    <div style={{
      backgroundColor: '#E8E8E8',
      color: textColor,
      fontSize: '1.5vh',
      left: '0',
      position: 'absolute',
      top: `calc(1.5vh * ${stackPosition + 1})`,
    }}>
      {displayName}{symbol}
    </div>
  )
}

export default DragHandle;
