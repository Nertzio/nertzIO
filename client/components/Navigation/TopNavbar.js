import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {BarTop, BarBufferInPx} from '../Common';

const TopNavbar = ({userIsLoggedIn}) => {
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
      }}>
        <BarTop alignLeft>
          <Link to="/">Nertz.io</Link>
          <Link to="#">How To Play</Link>
          <Link to="#">Leaderboard</Link>
          <Link to="#">Other Useful Page</Link>
        </BarTop>

        <BarTop alignRight>
          {userIsLoggedIn && <Link to="/join">Play</Link>}
          {userIsLoggedIn && <Link to="/account">Account</Link>}
          {userIsLoggedIn && <Link to="/logout">Sign Out</Link>}
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
  userIsLoggedIn: state.user,
})

export default connect(mapState, null)(TopNavbar);
