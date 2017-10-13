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
        <h1 style={{marginTop: '60px', fontSize: '70px', textShadow: '3px 3px 4px rgba(150, 150, 150, 3)'}}>Waiting for Four Players...</h1>
        <h3 style={{color: 'rgb(72, 72, 72)', fontSize: '40px'}}>Game Key: {this.gameKey}</h3>
        <div>
          {
            playerKeys.length === 4 ?
              this.startNewGame() :
              playerKeys.map((playerKey, index) => (
              <h4 key={playerKey} style={{fontSize: '35px', color: 'white'}}>
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
    backgroundColor: '#63A2A7',
    alignContent: 'center',
    textAlign: 'center',
    color: 'rgb(255, 157, 0)',
    position: 'fixed',
    height: '100%',
    width: '100%',
  }
}

function mapStateToProps (state) {
  return {
    players: state.players
  }
}

export default connect(mapStateToProps)(GamePending);
