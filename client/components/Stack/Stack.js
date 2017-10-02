import React from 'react'
import Card from './Card'
import PropTypes from 'prop-types';

const Stack = ({cards}) => {

  const renderCards = () => {
    return cards.map((cardData, idx) => {
      return <Card key={idx} stackPosition={idx} {...cardData} />
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



{/*
  <Card
suit="heart"
number={5}
name={5}
isFaceUp={true}
belongsTo={1}
x={0}
y={0}
z={0}
/> */
}
