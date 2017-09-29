import React from 'react'
import Card from './Card'

const Stack = ({cards}) => {



  return (
    <div>
      {cards.map((card, idx) => {
        const cardStyle = {
          zIndex: idx,
          transform: `translate(${idx * 15}px, ${idx * 15}px)`
        }
        return <Card key={idx} dynamicStyles={cardStyle} {...card} />
      })}
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
