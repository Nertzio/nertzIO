// design legible playing card
/* coming in on props:
            'suit': 'heart',
            'number': 2,
            'name': 'ace',
*/

import React from 'react';

const CardFront = (props) => {
  const {
    displayName,
    textColor,
    symbol,
  } = props;

  return (
    <div style={{
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: '2px',
      color: textColor,
      display: 'flex',
      flexDirection: 'column',
      fontSize: 'calc(2.5vh)',
      height: '100%',
      justifyContent: 'space-around',
    }}>
      <p>{displayName} {symbol}</p>

      <p style={{
        transform: 'rotate(180deg)'
      }}>
        {displayName} {symbol}
      </p>

    </div>
  )
}


export default CardFront;
