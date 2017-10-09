import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {
  addUserToCurrentGame,
  getGameRefByKey,
  postUserToGameAsPlayerAndUpdateReduxAsPlayersJoin,
  startGame,
} from '../../firebase';
import {
  getCurrentUserInRedux,
  getPlayersInRedux,
  setGameRefInRedux,
  tellReduxImLoading,
  tellReduxImDoneLoading,
} from '../../redux/reduxUtils';
import {
  checkIfUserIsAmongPlayers,
  thereAreNo,
} from '../../vanillaUtils';

class GamePending extends Component {
  constructor(props){
    super(props)
     this.gameKey = props.match.params.gameId;
  }

  componentWillMount() {
    this.initializePendingGame()
  }

  componentDidMount() {
    const playerCount = Object.values(this.props.players).length;
    if (playerCount === 4) {
      setTimeout(() => this.props.history.push(`/play/${this.gameKey}`), 1000);
    }
  }

  componentDidUpdate() {
    const playerCount = Object.values(this.props.players).length;
    if (playerCount === 4) {
      setTimeout(() => this.props.history.push(`/play/${this.gameKey}`), 1000);
    }
  }

  startNewGame(){
    startGame(this.gameKey);
    this.setState({
      shouldRedirectToGame: true
    })
  }

  initializePendingGame() {
    setGameRefInRedux(getGameRefByKey(this.gameKey))
    const playersInRedux = this.props.players;

    // either you're 1st or firebase is still loading
    if (thereAreNo(playersInRedux)) {
      tellReduxImLoading()
      return addUserToCurrentGame()
      .then(() => setTimeout(() => tellReduxImDoneLoading(), 1000))
      .catch(console.error.bind(console));

    } else { // there are players in Redux
      const userIsAlreadyInGame = checkIfUserIsAmongPlayers(playersInRedux);
      // don't add player if already added
      if (userIsAlreadyInGame) return;

      tellReduxImLoading()
      return addUserToCurrentGame()
        .then(() => setTimeout(() => tellReduxImDoneLoading(), 1000))
        .catch(console.error.bind(console));
    }
  }

  render(){
    const players = Object.values(this.props.players);

    return (
      <div style={styles.GamePending}>

        <h1>Waiting for Four Players...</h1>

        <h3>Game Key: {this.gameKey}</h3>

        <div style={{borderStyle: 'solid'}}>

          {players.map((player, idx) => (
            <h4 key={player.uid}>
              {idx + 1}) {players[idx].displayName}
            </h4>
          ))}

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
    currentUser: state.user,
    players: state.players, // incoming as object
  }
}

export default connect(mapStateToProps)(GamePending);
