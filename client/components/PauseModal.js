import React from 'react';
import {connect} from 'react-redux';
import {Modal} from './Common';
import {updateDbWithPauseStatus} from '../firebase';

const PauseModal = ({isGamePaused}) => {

  const unpause = () => {
    updateDbWithPauseStatus()
  }

  // -------------- COMPONENT --------------------

  return (
    <Modal shouldShow={isGamePaused}>

      <div>
        <h1>Game Paused</h1>
        <button onClick={unpause}>Unpause Game</button>
      </div>

    </Modal>
  )
}

const mapState = state => ({
  isGamePaused: state.game.isGamePaused,
  // players: state.players,
  // playerNumWhoCalledNertz: state.game.playerNumWhoCalledNertz,
})

export default connect(mapState)(PauseModal);
