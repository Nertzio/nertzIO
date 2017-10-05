import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {startNewGame} from '../../firebase';

class GamePending extends Component {
  constructor(props){
    super(props)
    this.state = {
      shouldRedirectToGame: false,
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

function mapStateToProps (state) {
  return {
    players: state.players
  }
}

export default connect(mapStateToProps)(GamePending)
