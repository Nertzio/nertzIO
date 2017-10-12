import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  StackSolitaire,
  StackBig,
  StackDrawn,
  StackLittle,
} from '../../components';

const PlayerArea = ({playerNum, side}) => {

  const className = side === 'bottom' ?
  'stack-area user-stack-area' :
  'stack-area';

  return (
      <section className="player-area-container">

        <div className={className}>
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

function mapStateToProps (state) {
  return {
    players: state.players
  }
}

export default connect(mapStateToProps)(PlayerArea);
