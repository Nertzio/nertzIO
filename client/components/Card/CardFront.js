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
    <div
      className="card-front"
      style={{
        color: textColor,
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
