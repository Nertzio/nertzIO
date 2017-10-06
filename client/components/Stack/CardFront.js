// design legible playing card
/* coming in on props:
            'suit': 'heart',
            'number': 2,
            'name': 'ace',
*/

import React from 'react';

const CardFront = (props) => {
  const {
    suit,
    name,
    number,
  } = props;

  const textColor = ['spade', 'club'].includes(suit) ? 'black' : 'red';
  const symbols = ['♥️', '♦️', '♠️', '♣️']
  const suits = ['heart', 'diamond', 'spade', 'club']
  const cardSymbol = symbols[suits.indexOf(suit)]
  const formattedName = name.toString().length > 2 ?
    name[0].toUpperCase() :
    name.toString()

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
      <p>{formattedName} {cardSymbol}</p>

      <p style={{
        transform: 'rotate(180deg)'
      }}>
        {formattedName} {cardSymbol}
      </p>

    </div>
  )
}


export default CardFront;
