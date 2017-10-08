import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {
  startGame,
  addPlayerToGame,
} from '../../firebase';
import {
  getCurrentUserInRedux,
  getPlayersInStore,
  tellReduxImLoading,
  tellReduxImDoneLoading,
} from '../../redux/reduxUtils';

class GamePending extends Component {
  constructor(props){
    super(props)
    this.state = {
      shouldRedirectToGame: false,
    }
    this.gameKey = props.match.params.gameId;
    this.players = Object.values(this.props.players); // make array
  }

  componentWillMount() {
    const currentUser = getCurrentUserInRedux();
    const {players} = this;
    // don't add player if already added
    if (players.some(({uid}) => uid === currentUser.uid)) return;
    if (!currentUser) return
    tellReduxImLoading()
    addPlayerToGame(currentUser, this.gameKey)
      .then(() => setTimeout(() => tellReduxImDoneLoading(), 1000))
      .catch(console.error.bind(console));
  }

  componentDidMount() {
    const playerCount = this.players.length;
    if (playerCount === 4) {
      setTimeout(() => this.props.history.push(`/play/${this.gameKey}`), 1000);
    }
  }

  componentWillUpdate() {
    const currentUser = getCurrentUserInRedux();
    const {players} = this;
    // don't add player if already added
    if (players.some(({uid}) => uid === currentUser.uid)) return;
    if (!currentUser) return
    tellReduxImLoading()
    console.log(this.gameKey);
    addPlayerToGame(currentUser, this.gameKey)
      .then(() => setTimeout(() => tellReduxImDoneLoading(), 1000))
      .catch(console.error.bind(console));
  }

  componentWillUnmount() {

  }

  startNewGame(){
    startGame(this.gameKey);
    this.setState({
      shouldRedirectToGame: true
    })
  }

  render(){
    const {players} = this;

    return (
      <div style={styles.GamePending}>

        <h1>Waiting for Four Players...</h1>

        <h3>Game Key: {this.gameKey}</h3>

        <div style={{borderStyle: 'solid'}}>

          {players.map((player, idx) => (
            <h4 key={player.uid}>
              {idx + 1}) {players[idx].displayName}
            </h4>
          ))}

        </div>

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
    players: state.players, // incoming as object
  }
}

export default connect(mapStateToProps)(GamePending);
