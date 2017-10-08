// card pattern and player identifier
// design legible playing card


import React from 'react';

const CardBack = ({belongsTo, backgroundColor}) => {

  return (
    <div style={{
      alignItems: 'center',
      backgroundColor: backgroundColor,
      borderRadius: '2px',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      fontSize: 'calc(2.5vh)',
      height: '100%',
      justifyContent: 'space-around',
    }}>
        <p>P{belongsTo}</p>
    </div>
  )
}

export default CardBack;
