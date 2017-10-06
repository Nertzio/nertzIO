import React, {Component} from 'react';
import {connect} from 'react-redux';
import {GameField, PlayerArea, Stack} from '../components';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
// import {setGameRefInRedux} from '../redux'
import { registerUpdateHandlersOnGameRef, updateReduxWhenPlayersJoinGame } from '../firebase'
import firebase from 'firebase'
const db = firebase.database()


class  GameArea extends Component {

  componentDidMount () {
    const gameRef = db.ref(`games/${this.props.match.params.gameId}`)
    // setGameRefForUtils(gameRef)
    // setGameRefInRedux(gameRef)
    updateReduxWhenPlayersJoinGame(gameRef)
    registerUpdateHandlersOnGameRef(gameRef)
  }

  render() {
    return (
      <div style={styles.gameArea}>
        <h1>Game Area</h1>
        <PlayerArea playerNum={1} />
        <GameField />
        <PlayerArea playerNum={2} />
        <PlayerArea playerNum={3} />
        <PlayerArea playerNum={4} />
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

export default DragDropContext(HTML5Backend)(GameArea)
