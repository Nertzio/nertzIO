import React from 'react'
import Card from './Card'
import PropTypes from 'prop-types';

const Stack = ({cards, firebaseStackRef}) => {

  const renderCards = () => {
    return cards.map((cardData, idx) => {
      return <Card key={idx} stackPosition={idx} firebaseStackRef={firebaseStackRef} {...cardData} />
    })
  }

  return (
    <div style={{
      height: '100%',
      position: 'relative', // so absolute-positioned cards will stack
      width: '100%',
    }}>
      {renderCards()}
    </div>
  )
}


export default Stack;
