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
import {updateDbWithNertzCall, updateDbWithPlayerScores} from '../../firebase'

const TopNavbar = ({userIsLoggedIn, currentUser, players}) => {
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

  const ableToCallNertz = () => {
    const nertzPile = getStackInStoreByKey(`p${playerNum}LittleStack`);
    return nertzPile && !nertzPile.length;
  }

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
          <Link to="/">NertzIO</Link>
          <Link to="#">How To Play</Link>
          <Link to="#">Leaderboard</Link>
          <Link to="#">Other Useful Page</Link>
        </BarTop>

        <BarTop alignRight>
        {
          ableToCallNertz() &&
          <button onClick={callNertz}>CALL NERTZ!!</button>
        }
        {/* TODO: remove this after testing modal */}
          {/*<button onClick={() => toggleRound()}>Toggle Round</button>
          */}
          {userIsLoggedIn && <Link to="/join">Play</Link>}
          {userIsLoggedIn && <Link to="/account">Account</Link>}
          {userIsLoggedIn && <Link to="/signout">Sign Out</Link>}
          {!userIsLoggedIn && <Link to="/sigin">Sign In</Link>}
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
  players: state.players
})

export default connect(mapState, null)(TopNavbar);
