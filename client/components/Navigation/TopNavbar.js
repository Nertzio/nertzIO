import React from 'react';
import { connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {BarTop, BarBufferInPx} from '../Common';
import {getUserPlayerNum} from '../../vanillaUtils'
import {
  // roundIsOverInRedux,
  // setRoundOverInRedux,
  // startNewRoundInRedux,
  getStackInStoreByKey,
} from '../../redux/reduxUtils';
import {updateDbWithNertzCall,
  updateDbWithPlayerScores,
  markGameAsNotInProgress,
  // updateDbWithPauseStatus,
} from '../../firebase'

const TopNavbar = ({userIsLoggedIn, currentUser, players, game, history}) => {
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

  // const reshuffle = () => {
  //   //TODO: add functionality to reshuffle
  // }

// //PAUSE BUTTON ON PAUSE
//   const pause = () => {
//     updateDbWithPauseStatus()
//   }

  const ableToCallNertz = () => {
    const nertzPile = getStackInStoreByKey(`p${playerNum}LittleStack`);
    return nertzPile && !nertzPile.length;
  }

  const handleSignOutOrQuitGame = () => {
    if (game.isInProgress) {
      Promise.resolve(markGameAsNotInProgress())
      .then(() => history.push('/signout'))
    } else {
      history.push('/signout')
    }
  }

  const handlePlayOrNewGame = () => {
    if (game.isInProgress) {
      Promise.resolve(markGameAsNotInProgress())
      .then(() => history.push('/join'))
    } else {
      history.push('/join')
    }
  }

  const signOutOrQuitGameLabel = game.isInProgress ? 'Quit Game' : 'Sign Out'
  const playOrNewGameLabel = game.isInProgress ? 'New Game' : 'Play'

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

          <Link className="NavBtn" to="/">NertzIO</Link>
          <Link className="NavBtn" to="/about">About</Link>
          {/*<Link to="#">Leaderboard</Link>*/}
          <a className="NavBtn" href="//github.com/Nertzio/nertz.io">View on GitHub</a>

        </BarTop>

        <BarTop alignRight>
          {game.isInProgress && ableToCallNertz() && <button className="NavBtn" id="nertzBtn" onClick={callNertz}>CALL NERTZ!!</button>}
          {/*{game.isInProgress && <button onClick={pause}>Pause</button>}*/}
          {/*{game.isInProgress && <button onClick={reshuffle}>Reshuffle Cards</button>}*/}
          {userIsLoggedIn && <button className="NavBtn" onClick={handlePlayOrNewGame}>{playOrNewGameLabel}</button>}
          {userIsLoggedIn && <button className="NavBtn" onClick={handleSignOutOrQuitGame}>{signOutOrQuitGameLabel}</button>}
          {/*{userIsLoggedIn && <Link to="/account">Account</Link>}*/}
          {!userIsLoggedIn && <Link className="NavBtn" to="/signin">Sign In</Link>}
          {!userIsLoggedIn && <Link className="NavBtn" to="/signup">Sign Up</Link>}
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

export default withRouter(connect(mapState, null)(TopNavbar));
