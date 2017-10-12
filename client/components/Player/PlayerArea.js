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
          <StackSolitaire
            {...{side}}
            stackKey={`p${playerNum}SolitaireStack1`}
          />
          <StackSolitaire
            {...{side}}
            stackKey={`p${playerNum}SolitaireStack2`}
          />
          <StackSolitaire
            {...{side}}
            stackKey={`p${playerNum}SolitaireStack3`}
          />
          <StackSolitaire
            {...{side}}
            stackKey={`p${playerNum}SolitaireStack4`}
          />
          <StackBig {...{side}} stackKey={`p${playerNum}BigStack`}  />
          <StackDrawn {...{side}} stackKey={`p${playerNum}DrawnStack`} />
          <StackLittle {...{side}} stackKey={`p${playerNum}LittleStack`}  />
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
