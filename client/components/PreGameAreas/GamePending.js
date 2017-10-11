import React, {Component} from 'react';
import {connect} from 'react-redux';
import {startGame, resetReduxForPendingGameInstance} from '../../firebase';
import {
  tellReduxImLoading,
  tellReduxImDoneLoading,
} from '../../redux/reduxUtils';
import firebase from 'firebase'
const db = firebase.database()

class GamePending extends Component {
  constructor(props){
    super(props)
    this.gameKey = props.match.params.gameId;
    this.startNewGame = this.startNewGame.bind(this);
  }

  componentDidMount(){
    const gameRef = db.ref(`games/${this.props.match.params.gameId}`)
    resetReduxForPendingGameInstance(gameRef);
  }

  startNewGame(){
    tellReduxImLoading()
    startGame(this.gameKey)
      .then(() => tellReduxImDoneLoading());
    this.props.history.push(`/gamesInProgress/${this.gameKey}`)
  }

  render(){
    const playerKeys = Object.keys(this.props.players).sort();

    return (
      <div style={styles.GamePending}>

        <h1>Waiting for Four Players...</h1>
        <h3>Game Key: {this.gameKey}</h3>

        <div style={{borderStyle: 'solid'}}>
          {
            playerKeys.length === 4 ?
              this.startNewGame() :
              playerKeys.map((playerKey, index) => (

              <h4 key={playerKey} >
                Player {index + 1}. {this.props.players[playerKey].displayName}
              </h4>
            ))
          }
        </div>

      </div>
    )
  }
}

const styles = {
  GamePending: {
    backgroundColor: '#bbb',
    alignContent: 'center',
    textAlign: 'center'
  }
}

function mapStateToProps (state) {
  return {
    players: state.players
  }
}

export default connect(mapStateToProps)(GamePending);
