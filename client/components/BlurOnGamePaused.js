import React from 'react';
import {connect} from 'react-redux';
import {Blur} from './Common';

const BlurOnGamePaused = ({ children, isGamePaused }) => {

  return (
    <Blur isActive={isGamePaused} strength={10}>
      {() => children}
    </Blur>
  )
}

const mapState = state => ({
  isGamePaused: state.game.isGamePaused,
})

export default connect(mapState)(BlurOnGamePaused);
