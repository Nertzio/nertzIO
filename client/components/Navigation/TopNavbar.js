import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {BarTop, BarBufferInPx} from '../Common';
import {getUserPlayerNum} from '../../vanillaUtils'
import {
  // roundIsOverInRedux,
  // setRoundOverInRedux,
  // startNewRoundInRedux,
  getStackInStoreByKey,
} from '../../redux/reduxUtils';
import {updateDbWithNertzCall, updateDbWithPlayerScores,
  updateDbWithPauseStatus} from '../../firebase'

const TopNavbar = ({userIsLoggedIn, currentUser, players, game}) => {
  // Replaced this functionality with combination of callNertz button and firebase/redux utils for isNertzCalled

  // TODO: remove when done testing modal
  // const toggleRound = () => {
  //   if (roundIsOverInRedux()) return startNewRoundInRedux();
  //   else return setRoundOverInRedux();
  // }

  const playerNum = getUserPlayerNum(currentUser, players);

  const callNertz = () => {
    updateDbWithNertzCall(playerNum);
    updateDbWithPlayerScores()
  }

  const reshuffle = () => {
    //TODO: add functionality to reshuffle
  }

  const pause = () => {
    updateDbWithPauseStatus()
  }

  const ableToCallNertz = () => {
    const nertzPile = getStackInStoreByKey(`p${playerNum}LittleStack`);
    return nertzPile && !nertzPile.length;
  }

  const signOutOrLeaveGame = game.isInProgress ? 'Quit Game' : 'Sign Out'
  const playOrNewGame = game.isInProgress ? 'New Game' : 'Play'

  return (
    <div>
      <div style={{
        boxShadow: `3px 3px 5px rgba(0, 0, 0, 0.4)`,
        display: 'flex',
        justifyContent: 'space-between',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 100 * 1000,
      }}>
        <BarTop alignLeft>
          <Link to="/">Nertz.io</Link>
          <Link to="/about">About</Link>
          {/*<Link to="#">Leaderboard</Link>*/}
          <a href="//github.com/Nertzio/nertz.io">View on GitHub</a>
        </BarTop>

        <BarTop alignRight>
          {game.isInProgress && ableToCallNertz() && <button onClick={callNertz}>CALL NERTZ!!</button>}
          {game.isInProgress && <button onClick={pause}>Pause</button>}
          {game.isInProgress && <button onClick={reshuffle}>Reshuffle Cards</button>}
          {userIsLoggedIn && <Link to="/join">{playOrNewGame}</Link>}
          {/*{userIsLoggedIn && <Link to="/account">Account</Link>}*/}
          {userIsLoggedIn && <Link to="/signout">{signOutOrLeaveGame}</Link>}
          {!userIsLoggedIn && <Link to="/signin">Sign In</Link>}
          {!userIsLoggedIn && <Link to="/signup">Sign Up</Link>}
        </BarTop>

      {/* this hides under the absolute positioned bar to keep things from getting hidden under the Bar */}

    </div>
      <BarBufferInPx height={50} />
    </div>
  )
}

const mapState = state => ({
  userIsLoggedIn: state.user.email,
  currentUser: state.user,
  players: state.players,
  game: state.game
})

export default connect(mapState, null)(TopNavbar);
