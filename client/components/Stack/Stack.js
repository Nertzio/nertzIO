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
    <div className="stack-component">
      {renderCards()}
    </div>
  )
}


export default Stack;
