import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {startNewGame} from '../../firebase';

class GamePending extends Component {
  constructor(props){
    super(props)
    this.state = {
      shouldRedirectToGame: false,
      players: [
        {username: 'CoolPlayer1'},
        {username: 'WooHooPlayer1'},
        {username: 'CoolPlayer2'},
        // {username: 'WooHooPlayer2'}
      ]
    }
    this.gameKey = props.match.params.gameId;
    this.startGame = this.startGame.bind(this);
  }

  startGame(){
    startNewGame(this.gameKey);
    this.setState({
      shouldRedirectToGame: true
    })
  }

  render(){
    //TODO: get player info from auth or redux or firebase or elsewhere to pass in (rather than hard coded players) either to props or state (so that component will update render as new players added) AND find appropriate place to add current user info (from firebaseAuth?) to this list (perhaps upon pushing one of the buttons that brings one here-- or possibly component did mount):
    const players = this.state.players

    return (
      <div style={styles.GamePending}>
        <h1>Waiting for Four Players...</h1>
        <h3>Game Key: {this.gameKey}</h3>
        <div style={{borderStyle: 'solid'}}>
          {
            players.length === 4 ? this.startGame() :
            players.map((player, index) => (
              <h4 key={index} >{index + 1}. {player.username}</h4>
            ))
          }
        </div>
        {
          this.state.shouldRedirectToGame && <Redirect to={`/gamesInProgress/${this.gameKey}`} />
        }
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

export default GamePending;
