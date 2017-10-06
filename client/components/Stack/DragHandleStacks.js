import React from 'react'
import Card from './Card'
import PropTypes from 'prop-types';

const DragHandleStacks = ({cards, firebaseStackRef, currentStackPosition}) => {

  // const renderCards = () => {
  //   return cards.map((cardData, idx) => {
  //     return <Card key={idx} ownStack={cards} stackPosition={idx} firebaseStackRef={firebaseStackRef} {...cardData} />
  //   })
  // }

  // const renderCards = () => {
  //   return cards.map((cardData, idx) => {
  //    return <DragHandleStack baseCard={idx} remainingCards={cards.}
  //   })
  // }
  const stackPosition = currentStackPosition || 0;
  const currentCard = cards[stackPosition];
  const thereAreMoreCards = stackPosition < cards.length - 1;
  const cssPosition = stackPosition ? 'absolute' : 'relative';
  return (
    <div style={{
      // alignContent: 'center',
      // alignItems: 'center',
      // display: 'flex',
      height: 'calc(15vh)',
      // justifyContent: 'center',
      margin: '0 auto',
      maxWidth: 'calc(100vw / 10)',
      position: cssPosition, // 'relative parent required for absolute stacking'
      width: 'calc(10vh)',
      zIndex: stackPosition,
    }}>
      <Card ownStack={cards} stackPosition={stackPosition} firebaseStackRef={firebaseStackRef} {...currentCard} />
      {thereAreMoreCards &&
        <DragHandleStacks cards={cards} currentStackPosition={stackPosition + 1} firebaseStackRef={firebaseStackRef} />
      }
    </div>
  )
}


export default DragHandleStacks;
