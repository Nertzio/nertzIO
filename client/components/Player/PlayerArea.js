import React from 'react';
import {
  StackSolitaire,
  StackBig,
  StackDrawn,
  StackLittle,
} from '../../components';

function PlayerArea({
  playerNum,
}) {
  console.log('PLAYER AREA STACK KEY=', playerNum); //SARA
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
        <StackSolitaire stackKey={`p${playerNum}SolitaireStack1`}  />
        <StackSolitaire stackKey={`p${playerNum}SolitaireStack2`}  />
        <StackSolitaire stackKey={`p${playerNum}SolitaireStack3`}  />
        <StackSolitaire stackKey={`p${playerNum}SolitaireStack4`}  />
        <StackBig stackKey={`p${playerNum}BigStack`}  />
        <StackDrawn stackKey={`p${playerNum}DrawnStack`} />
        <StackLittle stackKey={`p${playerNum}LittleStack`}  />
      </div>
    </section>
  )
}

export default PlayerArea;
