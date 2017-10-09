import React from 'react'
import Card from './Card'
import PropTypes from 'prop-types';

const DraggableStacks = ({cards, firebaseStackRef}) => {

  // const renderCards = () => {
  //   return cards.map((cardData, idx) => {
  //     return <Card key={idx} ownStack={cards} stackPosition={idx} firebaseStackRef={firebaseStackRef} {...cardData} />
  //   })
  // }

  const renderCards = () => {
    return cards.map((cardData, idx) => {
     return <DragHandleStack baseCard={idx} remainingCards={cards}
    })
  }

  return (
    <div style={{
      // alignContent: 'center',
      // alignItems: 'center',
      // display: 'flex',
      height: 'calc(15vh)',
      // justifyContent: 'center',
      margin: '0 auto',
      maxWidth: 'calc(100vw / 10)',
      position: 'relative', // so absolute-positioned cards will stack
      width: 'calc(10vh)',
    }}>
      <DragHandleStacks cards={cards} firebaseStackRef={firebaseStackRef} />
    </div>
  )
}


export default DraggableStacks;
