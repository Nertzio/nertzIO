import React, {Component} from 'react';
import {connect} from 'react-redux';
import {GameField, PlayerArea, Stack} from '../components';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import {
  registerUpdateHandlersOnGameRef,
  startGame,
} from '../firebase';
import {
  findCurrentUserInPlayers,
  getUserPlayerNum,
} from '../vanillaUtils';
import {
  tellReduxImDoneLoading,
  tellReduxImLoading
} from '../redux/reduxUtils';
class  GameArea extends Component {

  componentWillMount() {
    const {user, players} = this.props;
    const userAsPlayer = findCurrentUserInPlayers(user, players);
    // short circuit if already registered listeners
    if (userAsPlayer.isListeningForUpdates) return;

    tellReduxImLoading();
    return registerUpdateHandlersOnGameRef()
      .then(() => tellReduxImDoneLoading());
  }

  componentDidMount() {
    return this.startGameIfReady();
  }

  componentDidUpdate() {
    return this.startGameIfReady();
  }

  startGameIfReady() {
    const {user, players, game} = this.props;
    const userIsPlayer1 = getUserPlayerNum(user, players) === 1;
    const everyoneIsListening = players.every(({isListeningForUpdates}) => isListeningForUpdates)

    if (!game.isInProgress && userIsPlayer1 && everyoneIsListening) {
      // only let player 1 populate GameArea with cards etc.
      return startGame();
    }
  }

  render() {
    const {user, players} = this.props;
    const myPlayerNum = getUserPlayerNum(user, players);

    return (
      <div style={styles.gameArea}>
        <h1>Game Area</h1>
        <GameField />
        <PlayerArea playerNum={myPlayerNum} />
      </div>
    )
  }
}

const styles = {
  gameArea: {
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'space-evenly',
    margin: '0 auto',
    width: '90%',
  }
}

const mapState = state => ({
  game: state.game,
  players: Object.values(state.players),
  user: state.user,
})

const ReduxifiedGameArea = connect(mapState)(GameArea);
export default DragDropContext(HTML5Backend)(ReduxifiedGameArea)
