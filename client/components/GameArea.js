import React from 'react';
import {connect} from 'react-redux';
import {UserInfo} from '../components';

const GameArea = (props) => {
  return (
    <div className={styles.gameArea}>
      <h1>'Game Area'</h1>
      <UserInfo />
    </div>
  )
}

const styles = {
  gameArea: {
    backgroundColor: 'yellow',
  }
}

export default GameArea;
