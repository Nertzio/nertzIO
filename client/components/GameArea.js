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
          this.rightColumnPlayers.push(num);
        } else {
          this.leftColumnPlayers.push(num);
        }
      } else {
        this.topRowPlayers.push(num);
      }
    })
  }

  componentWillMount () {
    const {game} = this.props;
    const gameRef = db.ref(`games/${this.props.match.params.gameId}`)
    if (!game.isInProgress) {

      tellReduxImLoading();
      return resetReduxForStartedDbGameInstance(gameRef)
      .then(() => tellReduxImDoneLoading())
    }
  }

  renderLeftColumnPlayers() {
    if (!this.leftColumnPlayers.length) return null;
    return this.leftColumnPlayers.map(playerNum => {
      return <PlayerArea key={playerNum} playerNum={playerNum} side="left" />
    })
  }

  renderRightColumnPlayers() {
    if (!this.rightColumnPlayers.length) return null;
    return this.leftColumnPlayers.map(playerNum => {
      return <PlayerArea key={playerNum} playerNum={playerNum} side="right" />
    })
  }

  renderTopRowPlayers() {
    if (!this.topRowPlayers.length) return null;
    return this.leftColumnPlayers.map(playerNum => {
      return <PlayerArea key={playerNum} playerNum={playerNum} side="top" />
    })
  }

  render() {

    return (
        <div>
        <BlurOnRoundOver >
          <h1>Game Area</h1>
          <div id="gameArea" className="game-area">

{/* ------------------ COLUMN ONE -------------------------- */}
            <div className="player-left-container">
              <div className="rotate-270">
                {this.renderLeftColumnPlayers()}
              </div>
            </div>

{/* ------------------- COLUMN TWO --------------------------- */}
            <div className="game-area-middle-column">

              <div className="player-top-container">
                {this.renderTopRowPlayers()}
              </div>

              <div className="game-field-container">
                <GameField />
              </div>

              <div className="player-bottom-container">
                <PlayerArea playerNum={this.props.userPlayerNum} side="bottom"/>
              </div>

            </div>

{/* --------------------- COLUMN THREE --------------------------- */}
            <div className="player-right-container">
              <div className="rotate-90">
               {this.renderRightColumnPlayers()}
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
    game: state.game,
    players: Object.keys(state.players),
    user: state.user,
    isRoundOver: state.game.isRoundOver,
    userPlayerNum: state.game.userPlayerNum,
  }
}


const reduxifiedGameArea = connect(mapStateToProps)(GameArea);
export default DragDropContext(HTML5Backend)(reduxifiedGameArea)


// ------------------ ORIGINAL GAME AREA --------------------
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

