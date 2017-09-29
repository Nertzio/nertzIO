// import CardFront and CardBack
/* if card.isFaceUp
      then render CardFront
   else
      render CardBack
 */

import React from 'react';
import { CardFront, CardBack } from '../Stack';

const Card = (props) => {
  const {
    suit,
    name,
    number,
    isFaceUp,
    belongsTo,
    dynamicStyles,
    x, y, z
      } = props;


  // const toggleListenForDragCard = function (event, on){
  //   if (on){

  //   } else {

  //   }
  // }
  // const listenForDragCard = (event) => {
  //   const handleMouseMove = (evt) => {
  //     event.target.style[left] = evt.screenX;
  //     event.target.style[top] = evt.screenY;
  //   }
  //   window.addEventListener('mousemove', handleMouseMove, true);
  // }

  // const stopListeningForDragCard = () => {
  //   window.removeEventListener('mousemove', handleMouseMove)
  // }

  return (
    <div style={{ ...styles.card, ...dynamicStyles }}>
      {isFaceUp
        ? <CardFront {...props} />
        : <CardBack {...props} />
      }
    </div>
  )
}

const styles = {
  card: {
    border: '1px gray solid',
    position: 'absolute',
    width: '80px',
    height: '105px',
    margin: '0 auto'
  }
}


// const styles = {
//  card: {
//  border: '1px gray solid',
//  width: '75px',
//  height: '105px',
//  margin: '0 auto',
//  }
// }

export default Card;
