import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  BlurOnRoundOver,
  GameEndModal,
  GameField,
  PlayerArea,
  Stack,
} from '../components';
import { DragDropContext } from 'react-dnd'
import {getUserPlayerNum} from '../vanillaUtils'
import HTML5Backend from 'react-dnd-html5-backend'
import { resetReduxForStartedDbGameInstance } from '../firebase'
import firebase from 'firebase'
const db = firebase.database()


class GameArea extends Component {

  componentDidMount () {
    const gameRef = db.ref(`games/${this.props.match.params.gameId}`)
    resetReduxForStartedDbGameInstance(gameRef);
  }

  render() {
    const {userPlayerNum, players} = this.props;
    const otherPlayerNums = players.filter(playerNum => +playerNum !== +userPlayerNum).map(num => +num);
    console.log('players', players, 'otherPlayerNums', otherPlayerNums);

    return (
        <div>
        <BlurOnRoundOver >
          <h1>Game Area</h1>
          <div id="gameArea" className="game-area">

            <div className="player-left-container">
              <PlayerArea playerNum={otherPlayerNums[0] || 1} />
            </div>

            <div className="game-area-middle-column">

              <div className="player-top-container">
                <PlayerArea playerNum={otherPlayerNums[1] || 2} />
              </div>

              <div className="game-field-container">
                <GameField />
              </div>

              <div className="player-bottom-container">
                <PlayerArea playerNum={userPlayerNum || 4} />
              </div>

            </div>

            <div className="player-right-container">
              <PlayerArea playerNum={otherPlayerNums[2] || 3} />
            </div>

          </div>
          </BlurOnRoundOver>
        <GameEndModal />
        </div>
      )
  }
}

function mapStateToProps (state) {
  return {
    players: Object.keys(state.players),
    user: state.user,
    isRoundOver: state.game.isRoundOver,
    userPlayerNum: state.game.userPlayerNum,
  }
}


const reduxifiedGameArea = connect(mapStateToProps)(GameArea);
export default DragDropContext(HTML5Backend)(reduxifiedGameArea)



{/* <div id="firstRow" className="container">
<PlayerArea playerNum={otherPlayerNums[0] || 1} />
</div>
<div id="secondRow" className="container">
<div style={{transform: 'rotate(270deg)'}}>
<PlayerArea
  playerNum={otherPlayerNums[1] || 2} />
  </div>
<GameField />
  <div style={{transform: 'rotate(90deg)'}}>
    <PlayerArea
      playerNum={otherPlayerNums[2] || 3} />
  </div>
</div>
<div id="thirdRow" className="container">
<PlayerArea playerNum={currentUserPlayerNum || 4} />
</div> */}
