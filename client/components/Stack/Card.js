import React from 'react';
import { CardFront, CardBack } from '../Stack';

const Card = (props) => {
  const {
    suit,
    name,
    number,
    isFaceUp,
    belongsTo,
    stackPosition
   } = props;

  return (
    <div style={{
      border: '1px gray solid',
      position: 'absolute',
      height: '100%',
      margin: '0 auto',
      transform: `translate(0px, ${stackPosition * 1}px)`,
      width: '80%',
      zIndex: stackPosition,
    }}>
      {isFaceUp
        ? <CardFront {...props} />
        : <CardBack {...props} />
      }
    </div>
  )
}


export default Card;
