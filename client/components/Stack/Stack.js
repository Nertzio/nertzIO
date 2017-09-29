import React from 'react'
import Card from './Card'

const Stack = ({cards}) => {
  return (
    <div>
      {cards.map((card, idx) => {
        return <Card key={idx} style={styles.card} {...card} />
      })}
    </div>
  )
}

const styles = {
      card: {
            border: '1px gray solid',
            position: 'absolute',
            width: '80px',
            height: '105px',
            margin: '0 auto',
            zIndex: 2,
      }
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
