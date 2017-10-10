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

  constructor(props) {
    super(props)
    this.leftColumnPlayers = [];
    this.rightColumnPlayers = [];
    this.topRowPlayers = [];

    const {userPlayerNum, players} = this.props;
    const otherPlayerNums = players.filter(playerNum => +playerNum !== +userPlayerNum).map(num => +num);
    console.log('players', players, 'otherPlayerNums', otherPlayerNums);

    otherPlayerNums.forEach(num => {
      if (num % 2 === 0) {
        if (this.leftColumnPlayers.length > this.rightColumnPlayers.length) {
          this.rightColumnPlayers.push(<PlayerArea playerNum={num} side="right"/>)
        } else {
          this.leftColumnPlayers.push(<PlayerArea playerNum={num} side="left" />)
        }
      } else {
        this.topRowPlayers.push(<PlayerArea playerNum={num} side="top" />)
      }
    })
  }

  componentWillMount () {
    const gameRef = db.ref(`games/${this.props.match.params.gameId}`)
    resetReduxForStartedDbGameInstance(gameRef);
  }

  render() {

    return (
        <div>
        <BlurOnRoundOver >
          <h1>Game Area</h1>
          <div id="gameArea" className="game-area">

            <div className="player-left-container">
              <div className="rotate-270">
                {this.leftColumnPlayers}
              </div>
            </div>

            <div className="game-area-middle-column">

              <div className="player-top-container">
                {this.topRowPlayers}
              </div>

              <div className="game-field-container">
                <GameField />
              </div>

              <div className="player-bottom-container">
                <PlayerArea playerNum={this.props.userPlayerNum} side="bottom"/>
              </div>

            </div>

            <div className="player-right-container">
              <div className="rotate-90">
               {this.rightColumnPlayers}
              </div>
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

