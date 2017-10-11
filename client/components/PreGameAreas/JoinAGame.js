import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {addNewGame, addPlayerToGame} from '../../firebase';
import firebase from 'firebase'
const db = firebase.database();

class JoinAGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameKeyInput: '',
      redirect: false,
      gameId: '',
      showJoinGameError: false
    }
    this.handleChange = this
      .handleChange
      .bind(this);
    this.joinPrivateGame = this
      .joinPrivateGame
      .bind(this);
    this.joinPublicGame = this
      .joinPublicGame
      .bind(this);
    this.startGame = this
      .startGame
      .bind(this);
  }

  handleChange(event) {
    this.setState({showJoinGameError: false, gameKeyInput: event.target.value});
  }

  joinPrivateGame(event) {
    event.preventDefault();
    const gameKey = this.state.gameKeyInput
      let gameExists,
        playersNeeded;
      const privateGameRef = db.ref(`games/${gameKey}`);
      privateGameRef
        .once('value')
        .then((gameSnapshot) => {
          gameExists = gameSnapshot.exists();
          playersNeeded = gameSnapshot
            .child('players')
            .numChildren() < 4;
          if (gameExists && playersNeeded) {
            addPlayerToGame(this.props.me, privateGameRef);
            // TODO: Check to see if .then should be on this line after addPlayerToGame call
            // for rest of functionality
            this.setState({gameId: gameKey, redirect: true})
          } else {
            this.setState({showJoinGameError: true})
          }
        })
    }

    joinPublicGame() {
      /* TODO HERE: find random public game (ie private attribute set to
      false) in Firebase DB that has less than 4 'players', and
      set gameId in state to that game's key (and publicGameRef in
      following function's argument to that game's ref)
    */
      db.ref('games')
      addPlayerToGame(this.props.me, publicGameRef);
      // TODO: Check to see if .then should be on this line after addPlayerToGame call
      // for rest of functionality
      this.setState({redirect: true})
    }

    startGame(event) {
      const isPrivateGame = event.target.name === 'startPrivateGame';
      let gameRef
      Promise.resolve(addNewGame())
        .then(currentGameRef => {
          gameRef = currentGameRef;
          addPlayerToGame(this.props.me, gameRef)
        })
        .then(() => {
          gameRef.child('private').set(isPrivateGame)
        })
        .then(() => {
          let gameKey = gameRef.key;
          this.setState({gameId: gameKey, redirect: true})
        })
    }

    render() {
      console.log(this.props, 'AND', this.props.me)
      return (
        <div style={styles.JoinAGame}>
          {this.state.redirect && <Redirect to={`/pendingGames/${this.state.gameId}`}/>
}
          <h1>Join A Game!</h1>
          <div>
            <h3>Start New Game</h3>
            <button style={styles.button} name="startPublicGame" onClick={this.startGame}>Public</button>
            <button style={styles.button} name="startPrivateGame" onClick={this.startGame}>Private</button>
          </div>
          <div>
            <h3>Join Existing Game</h3>
            <button style={styles.button} onClick={this.joinPublicGame}>Join Random Game</button>
            <div>
              <form onSubmit={this.joinPrivateGame}>
                <input
                  placeholder="Game Key"
                  onChange={this.handleChange}
                  value={this.state.gameKeyValue}
                  autoFocus/>
                <button style={styles.button}>Join Private Game</button>
              </form>
              {this.state.showJoinGameError && <p>Game key provided does not match a playable game.</p>
}
            </div>
          </div>
        </div>
      )
    }
  }

  const styles = {
    JoinAGame: {
      alignContent: 'center',
      textAlign: 'center'
    },
    button: {
      margin: '10px'
    }
  }

  function mapStateToProps (state){
    return {
      me: state.user
    }
  }

  export default connect(mapStateToProps)(JoinAGame);
