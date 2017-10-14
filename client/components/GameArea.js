import firebase from 'firebase'
import {connect} from 'react-redux';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import React, {Component} from 'react';

import {
  BlurOnGamePaused,
  BlurOnRoundOver,
  GameEndModal,
  GameField,
  PauseModal,
  PlayerArea,
} from '../components';
import {
  tellReduxImLoading,
  tellReduxImDoneLoading,
} from '../redux/reduxUtils';
import { resetReduxForStartedDbGameInstance } from '../firebase'
const db = firebase.database()


class GameArea extends Component {

  componentWillMount () {
    const {game} = this.props;
    const gameRef = db.ref(`games/${this.props.match.params.gameId}`)
    if (!game.isInProgress) {
      tellReduxImLoading();
      return Promise.resolve(resetReduxForStartedDbGameInstance(gameRef))
      .then(() => setTimeout(tellReduxImDoneLoading(), 0))
      .catch(console.error.bind(console));
    }
  }

  renderOtherPlayersByNum(playerNums) {
    if (!playerNums.length) return null;
    return playerNums.map(playerNum => {
      return (
        <div key={playerNum} className="player-area-stacked-container">
          <PlayerArea key={playerNum} playerNum={playerNum} />
        </div>
      )
    })
  }

  render() {
    const {userPlayerNum, otherPlayerNums} = this.props;
    if (!otherPlayerNums.length) return null;


    return (
        <div className="game-area-wrapper">
        <BlurOnRoundOver >

          <div id="gameArea" className="game-area">

            {this.renderOtherPlayersByNum(otherPlayerNums)}

            <div className="game-field-stacked-container">

              <div className="game-field-container">
                <GameField />
              </div>

            </div>

            <div className="player-area-stacked-container">
              <PlayerArea playerNum={userPlayerNum} isCurrentUser side="bottom" />
            </div>

          </div>
        </BlurOnRoundOver>
        <GameEndModal />
        <PauseModal />
        </div>
      )
  }
}

function mapStateToProps (state) {
  return {
    game: state.game,
    user: state.user,
    userPlayerNum: state.game.userPlayerNum,
    otherPlayerNums: Object.keys(state.players).filter(num => +num !== +state.game.userPlayerNum).map(num => +num),
    isRoundOver: state.game.isNertzCalled,
    isGamePaused: state.game.isGamePaused
  }
}


const reduxifiedGameArea = connect(mapStateToProps)(GameArea);
export default DragDropContext(HTML5Backend)(reduxifiedGameArea)

