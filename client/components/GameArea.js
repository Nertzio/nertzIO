import React, {Component} from 'react';
import {connect} from 'react-redux';
import {GameField, PlayerArea, Stack} from '../components';
import { DragDropContext } from 'react-dnd'
import {getUserPlayerNum} from '../vanillaUtils'
import HTML5Backend from 'react-dnd-html5-backend'
import { resetReduxForStartedDbGameInstance } from '../firebase'
import firebase from 'firebase'
const db = firebase.database()


class  GameArea extends Component {

  componentDidMount () {
    const gameRef = db.ref(`games/${this.props.match.params.gameId}`)
    resetReduxForStartedDbGameInstance(gameRef);
  }

  render() {
    const {user, players} = this.props;
    const currentUserPlayerNum = getUserPlayerNum(user, players);
    const otherPlayerNums = Object.keys(players).filter(playerNum => playerNum !== currentUserPlayerNum);
    console.log('players', players, 'otherPlayerNums', otherPlayerNums);

    return (
      <div >
        <h1>Game Area</h1>
        <div id="gameArea" >
          <div id="firstRow" className="container">
            <PlayerArea playerNum={1} />
          </div>
          <div id="secondRow" className="container">
            <PlayerArea
              style={{transform: 'rotate(270deg)'}}
              playerNum={2} />
            <GameField />
            <PlayerArea
              style={{transform: 'rotate(90deg)'}}
              playerNum={3} />
          </div>
          <div id="thirdRow" className="container">
           <PlayerArea playerNum={4} />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    players: state.players,
    user: state.meReducer
  }
}

const dragContextGameArea = DragDropContext(HTML5Backend)(GameArea)

export default connect(mapStateToProps)(dragContextGameArea);
