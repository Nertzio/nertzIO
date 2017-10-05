import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {startGame} from '../../firebase';

class GamePending extends Component {
  constructor(props){
    super(props)
    this.state = {
      shouldRedirectToGame: false,
    }
    this.gameKey = props.match.params.gameId;
    this.startNewGame = this.startNewGame.bind(this);
  }

  startNewGame(){
    startGame(this.gameKey);
    this.setState({
      shouldRedirectToGame: true
    })
  }

  render(){
    console.log(this.props, 'and', this.props.players)
    const playerKeys = Object.keys(this.props.players).sort();

    return (
      <div style={styles.GamePending}>
        <h1>Waiting for Four Players...</h1>
        <h3>Game Key: {this.gameKey}</h3>
        <div style={{borderStyle: 'solid'}}>
          {
            playerKeys.length === 4 ? this.startNewGame() :
            playerKeys.map((playerKey, index) => (
              <h4 key={playerKey} >Player {index + 1}. {this.props.players[playerKey].username}</h4>
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

export default connect(mapStateToProps)(GamePending);
