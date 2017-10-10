import React from 'react';
import {connect} from 'react-redux';
import {Blur} from '../Common';

const BlurWhenActionRequired = ({ children, userActionIsRequired }) => {

  return (
    <Blur isActive={userActionIsRequired} strength={4}>
      {() => children()}
    </Blur>
  )
}

const mapState = state => ({
  userActionIsRequired: state.app.userActionIsRequired,
})

export default connect(mapState)(BlurWhenActionRequired);
