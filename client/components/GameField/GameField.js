import React from 'react';
// import {connect} from 'react-redux';
import Grid from './Grid';

function GameField(props) {
  // const {userCount} = props; // coming in from connect()
  const userCount = 4; // remove this after component connected to store
  return (
    <section style={{
      backgroundColor: 'purple',
      border: '1px solid gray', // TODO: remove later
      color: 'white',
      display: 'flex',
      flexGrow: 1,
      minHeight: `calc(15vh * ${userCount})`,
      width: 'calc(100vh)%',
    }}>
      <Grid cellCount={userCount * 4} />
    </section>
  )
}

export default GameField;

// TODO: CONNECT TO STORE WHEN PLAYERS ARE ADDED
// const mapState = state => ({
// // the number of fieldStacks depends on number of players
//   userCount: Object.keys(state.players).length,
// })

// export default connect(mapState, null)(GameField);
