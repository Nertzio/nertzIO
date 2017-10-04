import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CardField, PlayerArea, Stack} from '../components';
import {initNewGame, initExistingGameByKey} from '../firebase';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class  GameArea extends Component {


  componentDidMount() { //currently defaults to existing game
    if (true){  // TODO: CREATE THIS PROP
      initNewGame();
    } else {
      initExistingGameByKey('-Kva1DwbJeviihgttvHA');
    }
  }

  render() {
    return (
      <div style={styles.gameArea}>
        <h1>Game Area</h1>
        <CardField />
        <PlayerArea playerNum={1} />
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
