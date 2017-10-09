import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {clearPlayersInStore} from '../../redux/reduxUtils';
import {
  postNewPrivateGameStoreInRedux,
  addUserToCurrentGame
} from '../../firebase';
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

  componentWillMount() {
    // important for GamePending to determine if current user is new player
    return clearPlayersInStore();
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
            addUserToCurrentGame(this.props.me, privateGameRef);
            // TODO: Check to see if .then should be on this line after addUserToCurrentGame call
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
      addUserToCurrentGame(this.props.me, publicGameRef);
      // TODO: Check to see if .then should be on this line after addUserToCurrentGame call
      // for rest of functionality
      this.setState({redirect: true})
    }

    startGame(event) {
      const isPrivateGame = event.target.name === 'startPrivateGame';
      const gameRef = postNewGameStoreInRedux();
      let gameKey = gameRef.key;
      addUserToCurrentGame(this.props.me, gameRef).then(() => {
        gameRef
          .child('private')
          .set(isPrivateGame)
          .then(() => {
            this.setState({gameId: gameKey, redirect: true})
          })
      })
    }

    startNewPrivateGame() {
      console.log('JoinAGame - startNewPrivateGame()')
      const gameKey = postNewPrivateGameStoreInRedux().key;
      this.props.history.push(`/pending-game/${gameKey}`)
    }

    render() {
      return (
        <div style={styles.JoinAGame}>
          {this.state.redirect && <Redirect to={`/pending-game/${this.state.gameId}`}/>
}
          <h1>Let's Play Nertz!</h1>

          <div>
            <h3>Start An Invite-Only Game</h3>

            <button
              style={styles.button}
              name="startPrivateGame"
              onClick={() => this.startNewPrivateGame()}
            >
              Start
            </button>

          </div>

          <div>
            <h3>Join A Public Game</h3>

            <button style={styles.button}
              onClick={this.joinPublicGame}
            >
              Join
            </button>

            <h3>Join Your Friends!</h3>

            <div>
              <form onSubmit={this.joinPrivateGame}>
                <input
                  placeholder="Game Key"
                  onChange={this.handleChange}
                  value={this.state.gameKeyValue}
                  autoFocus
                />

                <button style={styles.button}>Join</button>

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
      me: state.user,
    }
  }

  export default connect(mapStateToProps)(JoinAGame);
