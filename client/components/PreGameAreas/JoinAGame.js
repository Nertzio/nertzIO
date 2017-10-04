import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {initNewGame, initExistingGameByKey} from '../../firebase';
import firebase from 'firebase';

//TO DO: Make sure initNewGame & initExistingGameByKey adds current users' info to game as a player
class JoinAGame extends Component {
  constructor(props){
    super(props)
    this.state = {
      gameKeyInput: '',
      redirect: false,
      gameId: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.joinPrivateGame = this.joinPrivateGame.bind(this);
    this.joinPublicGame = this.joinPublicGame.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  handleChange (event) {
    this.setState({
      gameKeyInput: event.target.value
    });
  }

  joinPrivateGame (event){
    //TO DO HERE: check to see if game has less than 4 players. If so follow code below. Else give client error msg "Game full"
    this.setState({
      gameId: this.state.gameKeyInput
    })
    initExistingGameByKey(this.state.gameKeyInput)
    this.setState({
      redirect: true
    })
  }

  joinPublicGame (event){
    //TODO HERE: find random public game (private attribute set to false) with less than 4 players and change gameId in state to the selected game's key/id
    initExistingGameByKey(this.state.gameKeyInput);
    this.setState({
      redirect: true
    })
  }

  startGame(event){
    let gameKey;
    const isPrivateGame = event.target.name === 'startPrivateGame';
    const gameRef = initNewGame();
    gameRef.once('value')
      .then(gameSnapshot => {
        gameKey = gameSnapshot.key;
        gameSnapshot.private = isPrivateGame;
      })
      .then(() => {
        this.setState({
          gameId: gameKey,
          redirect: true
        })
      })
  }

  render(){
    return (
      this.state.redirect ? <Redirect to={`/pendingGames/${this.state.gameId}`} /> :

      <div className={styles.JoinAGame}>
        <h1>Join A Game!</h1>
        <div>
          <h3>Start New Game</h3>
          <button name='startPublicGame' onClick={this.startGame} >Public</button>
          <button name='startPrivateGame' onClick={this.startGame} >Private</button>
        </div>
        <div>
          <h3>Join Existing Game</h3>
          <button onClick={this.joinPublicGame}>Join Random Game</button>
          <form onSubmit={this.joinPrivateGame}>
            <input placeholder="Game Key" onChange={this.handleChange}>{this.state.gameKeyValue}</input>
            <button>Join Private Game</button>
          </form>
        </div>
      </div>
    )
  }
}

const styles = {
  JoinAGame: {
    backgroundColor: '#bbb',
    alignContent: 'center',
    textAlign: 'center'
  }
}


export default JoinAGame;

