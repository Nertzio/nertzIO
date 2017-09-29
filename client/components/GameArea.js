import React from 'react';
import {connect} from 'react-redux';
//import {UserInfo} from '../components';
import {Stack} from './Stack';

const cards = [
  {
  'belongsTo': 1, // player number
  'suit': 'diamond',
  'number': 5,
  'name': 5,
  'isFaceUp': true,
  'x': 0.3,
  'y': 0.725,
  },
  {
  'belongsTo': 2, // player number
  'suit': 'heart',
  'number': 1,
  'name': 'ace',
  'isFaceUp': true,
  'x': 0.3,
  'y': 0.725,
  },
  {
  'belongsTo': 3, // player number
  'suit': 'heart',
  'number': 2,
  'name': 2,
  'isFaceUp': true,
  'x': 0.3,
  'y': 0.725,
  },

]

const GameArea = (props) => {
  return (
    <div style={styles.gameArea}>
      <h1>'Game Area'</h1>
      <Stack cards={cards} />
    </div>
  )
}

const styles = {
  gameArea: {
    backgroundColor: '#ccc',
  }
}

export default GameArea;
