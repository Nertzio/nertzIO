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

    return (
      <div>
        <BlurOnRoundOver >
          <div style={styles.gameArea}>

              <h1>Game Area</h1>
              <PlayerArea playerNum={1} />
              <GameField />
              <PlayerArea playerNum={2} />
              <PlayerArea playerNum={3} />
              <PlayerArea playerNum={4} />

          </div>
        </BlurOnRoundOver>
        <GameEndModal />
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
  isRoundOver: state.game.isRoundOver,
})

const reduxifiedGameArea = connect(mapState)(GameArea);
export default DragDropContext(HTML5Backend)(reduxifiedGameArea)
