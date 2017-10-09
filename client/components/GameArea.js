import React, {Component} from 'react';
import {connect} from 'react-redux';
import {GameField, PlayerArea, Stack} from '../components';
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
      <div >
        <h1>Game Area</h1>
        <div id="gameArea" >
          <div id="firstRow" className="container">
            <PlayerArea playerNum={1} />
          </div>
          <div id="secondRow" className="container">
            <PlayerArea playerNum={2} />
            <GameField />
            <PlayerArea playerNum={3} />
          </div>
          <div id="thirdRow" className="container">
           <PlayerArea playerNum={4} />
          </div>
        </div>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(GameArea)
