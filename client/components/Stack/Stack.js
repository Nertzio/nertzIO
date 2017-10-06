import React from 'react'
import Card from './Card'
import PropTypes from 'prop-types';

const Stack = ({cards, firebaseStackRef}) => {

  const renderCards = () => {
    return cards.map((cardData, idx) => {
      return <Card key={idx} ownStack={cards} stackPosition={idx} firebaseStackRef={firebaseStackRef} {...cardData} />
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
      {renderCards()}
    </div>
  )
}


export default Stack;
