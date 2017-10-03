import React from 'react'
import {connect} from 'react-redux';
import {Stack} from '../../components';
import PropTypes from 'prop-types';

const StackBig =  ({cards, firebaseRef}) => {

  return (
    <div style={{
      border: '1px solid gray',
      height: '100%',
      flex: '1 10%'
    }}>
      <Stack cards={cards}/>
    </div>
  )
}

const mapState = (state, {stackKey}) => ({
  cards: state[stackKey],
  firebaseRef: state.firebaseRefs[stackKey],
})

const connectedStackBig = connect(mapState, null)(StackBig);


export default connectedStackBig;
