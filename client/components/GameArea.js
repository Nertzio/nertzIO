import firebase from 'firebase'
import {connect} from 'react-redux';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import React, {Component} from 'react';
import {getUserPlayerNum} from '../vanillaUtils'
import {
  BlurOnRoundOver,
  GameEndModal,
  GameField,
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
      return resetReduxForStartedDbGameInstance(gameRef)
      .then(() => tellReduxImDoneLoading())
    }
  }

  render() {
    const {user, players} = this.props;
    const currentUserPlayerNum = getUserPlayerNum(user, players);
    const otherPlayerNums = Object.keys(players).filter(playerNum => +playerNum !== +currentUserPlayerNum).map(num => +num);
    console.log('players', players, 'otherPlayerNums', otherPlayerNums);
      return (
        <div>
        <BlurOnRoundOver >
          <h1>Game Area</h1>
          <div id="gameArea" >
            <div id="firstRow" className="container">
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
    game: state.game,
    players: state.players,
    user: state.user,
    isRoundOver: state.game.isNertzCalled,
  }
}


const reduxifiedGameArea = connect(mapStateToProps)(GameArea);
export default DragDropContext(HTML5Backend)(reduxifiedGameArea)
