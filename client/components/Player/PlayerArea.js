import React from 'react';
import {
  StackSolitaire,
  StackBig,
  StackDrawn,
  StackLittle,
} from '../../components';

function PlayerArea({
  playerNum,
  // BigStack,
  // DrawnStack,
  // LittleStack,
  // Solitaire1Stack,
  // Solitaire2Stack,
  // Solitaire3Stack,
  // Solitaire4Stack,
}) {

  return (
    <section style={{
      alignItems: 'center', // sets vertical alignment
      backgroundColor: 'tomato',
      border: '1px solid gray', // TODO: remove later
      color: 'white',
      display: 'flex',
      flexGrow: 3,
      justifyContent: 'space-evenly',
      width: '100%',
    }}>
      <div className="stack-area"
        style={{
          alignItems: 'center',
          border: '1px solid white',
          display: 'flex',
          flex: '0 80%',
          height: '15vh',
          justifyContent: 'space-evenly',
      }}>
        <StackSolitaire stackKey={`p${playerNum}Solitaire1Stack`}  />
        <StackSolitaire stackKey={`p${playerNum}Solitaire2Stack`}  />
        <StackSolitaire stackKey={`p${playerNum}Solitaire3Stack`}  />
        <StackSolitaire stackKey={`p${playerNum}Solitaire4Stack`}  />
        <StackBig stackKey={`p${playerNum}BigStack`}  />
        <StackDrawn stackKey={`p${playerNum}DrawnStack`} />
        <StackLittle stackKey={`p${playerNum}LittleStack`}  />
      </div>
    </section>
  )
}

const cards = [
  {
  'belongsTo': 1, // player number
  'suit': 'diamond',
  'number': 5,
  'name': 5,
  'isFaceUp': true,
  'x': 0.3,
  'y': 0.725,
  },
  {
  'belongsTo': 2, // player number
  'suit': 'heart',
  'number': 1,
  'name': 'ace',
  'isFaceUp': true,
  'x': 0.3,
  'y': 0.725,
  },
  {
  'belongsTo': 3, // player number
  'suit': 'heart',
  'number': 2,
  'name': 2,
  'isFaceUp': true,
  'x': 0.3,
  'y': 0.725,
  },
]

export default PlayerArea;
