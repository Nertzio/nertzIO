import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  StackSolitaire,
  StackBig,
  StackDrawn,
  StackLittle,
} from '../../components';

const PlayerArea = ({playerNum, isCurrentUser}) => {

  const className = isCurrentUser ?
  'stack-area user-stack-area' :
  'stack-area';

  return (
      <section className="player-area-container">

        <div className={className}>
          <StackSolitaire
            {...{isCurrentUser}}
            stackKey={`p${playerNum}SolitaireStack1`}
          />
          <StackSolitaire
            {...{isCurrentUser}}
            stackKey={`p${playerNum}SolitaireStack2`}
          />
          <StackSolitaire
            {...{isCurrentUser}}
            stackKey={`p${playerNum}SolitaireStack3`}
          />
          <StackSolitaire
            {...{isCurrentUser}}
            stackKey={`p${playerNum}SolitaireStack4`}
          />
          <StackBig {...{isCurrentUser}} stackKey={`p${playerNum}BigStack`}  />
          <StackDrawn {...{isCurrentUser}} stackKey={`p${playerNum}DrawnStack`} />
          <StackLittle {...{isCurrentUser}} stackKey={`p${playerNum}LittleStack`}  />
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
