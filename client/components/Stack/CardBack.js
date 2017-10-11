// card pattern and player identifier
// design legible playing card


import React from 'react';

const CardBack = ({belongsTo, backgroundColor}) => {

  return (
    <div
      className="card-back"
      style={{
        backgroundColor: backgroundColor,
    }}>
        <p>P{belongsTo}</p>
    </div>
  )
}

export default CardBack;
