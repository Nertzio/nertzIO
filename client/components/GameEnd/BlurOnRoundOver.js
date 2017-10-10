import React from 'react';
import {connect} from 'react-redux';
import {Blur} from '../Common';

const BlurOnRoundOver = ({ children, isRoundOver }) => {

  return (
    <Blur isActive={isRoundOver} strength={4}>
      {() => children}
    </Blur>
  )
}

const mapState = state => ({
  isRoundOver: state.game.isRoundOver,
})

export default connect(mapState)(BlurOnRoundOver);
