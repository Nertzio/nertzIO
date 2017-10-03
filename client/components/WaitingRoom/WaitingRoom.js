import React from 'react';
import {connect} from 'react-redux';

const WaitingRoom = (props) => {
  return (
    <div className={styles.waitingRoom}>
      <h1>'Waiting Room'</h1>
      <input />
    </div>
  )
}

const styles = {
  waitingRoom: {
    backgroundColor: '#bbb',
  }
}

export default WaitingRoom;
