import React from 'react'
const Stack = ({cards}) => {
  return (
    <div>
      {cards.map((card, idx) => {
        <Card key={idx} style={{zIndex: idx}} {...card} />
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
